import {
  setupAirlines,
  setupAirplane,
  setupAirports,
  setupUsers,
  users,
} from './setups/index.js';
import { getFlights, login, buyTicket } from './apis/index.js';
import { check, sleep, group } from 'k6';
import http from 'k6/http';
import exec from 'k6/execution';
import { Rate, Trend } from 'k6/metrics';
import { selectRandomFlight } from './utils/index.js';

/**
 * Cenário 2: Teste SEM Tolerância a Falhas
 * - Simula falhas intencionais (cf: true) SEM mecanismo de tolerância (ft: false)
 * - Objetivo: Validar comportamento do sistema em modo "fail-fast"
 */

const failedRequests = new Rate('failed_requests');
const successfulRequests = new Rate('successful_requests');
const ticketPurchaseTime = new Trend('ticket_purchase_time');
const failureResponseTime = new Trend('failure_response_time');

export const options = {
  stages: [
    { duration: '30s', target: 8 },  
    { duration: '1m', target: 15 }, 
    { duration: '30s', target: 0 }, 
  ],
  thresholds: {
    'http_req_duration': ['p(95)<300'],
    'http_req_failed': ['rate<0.5'], 
    'failure_response_time': ['p(95)<500'], 
  },
  ext: {
    loadimpact: {
      name: 'IMDTravel - No Fault Tolerance',
    },
  },
};

export function setup() {
  setupAirlines();
  setupAirports();
  setupAirplane();
  setupUsers();
}

export default function () {
  const indexUser = exec.vu.idInTest % users.length;
  const user = users[indexUser];

  group('Login', () => {
    const loginPayload = {
      email: user.email,
      password: user.password,
    };

    const loginRes = login(loginPayload);
    check(loginRes, {
      'login status valid': (r) => r.status === 200 || r.status === 201,
    });
  });

  group('Get Available Flights', () => {
    const flights = getFlights({});
    check(flights, {
      'flights retrieved': (f) => f && f.length > 0,
    });

    if (!flights || flights.length === 0) {
      exec.test.abort('No flights available for purchase.');
    }

    const selectedFlight = selectRandomFlight(flights);
    const day = new Date().toISOString().split('T')[0];

    group('Buy Ticket Without Fault Tolerance', () => {
      const startTime = new Date();

      const payload = {
        flight: selectedFlight.flightNumber,
        day,
        cf: true, 
        ft: false,
      };

      const res = buyTicket(payload);
      const elapsedTime = new Date() - startTime;

      ticketPurchaseTime.add(elapsedTime);

      const success = check(res, {
        'ticket purchase succeeded or failed fast': (r) => 
          r.status === 201 || (r.status >= 400 && r.status < 600),
        'response is quick': (r) => elapsedTime < 500,
      });

      if (res.status === 201) {
        successfulRequests.add(1);
      } else {
        failedRequests.add(1);
        failureResponseTime.add(elapsedTime);
      }

      console.log(
        `[NO_FT] VU ${exec.vu.idInTest}: status=${res.status}, time=${elapsedTime}ms`
      );
    });
  });

  sleep(1.5);
}
