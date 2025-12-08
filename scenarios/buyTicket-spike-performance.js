import {
  setupAirlines,
  setupAirplane,
  setupAirports,
  setupUsers,
  users,
} from './setups/index.js';
import { getFlights, login, buyTicket } from './apis/index.js';
import { check, sleep, group } from 'k6';
import exec from 'k6/execution';
import { Rate, Trend, Counter } from 'k6/metrics';
import { selectRandomFlight } from './utils/index.js';

/**
 * Cenário 2: Teste de pico de estresse
 * - Simula padrão realista de tráfego com picos variáveis
 * - Objetivo: Validar comportamento do sistema sob variações abruptas de carga
 */

const ticketPurchaseTime = new Trend('ticket_purchase_time');
const failedRequests = new Rate('failed_requests');
const successfulRequests = new Rate('successful_requests');

export const options = {
  stages: [
    { duration: '5s', target: 5 },
    { duration: '10s', target: 25 },
    { duration: '20s', target: 625 },
    { duration: '30s', target: 800 },
    { duration: '30s', target: 1200 },
    { duration: '25s', target: 900 },
    { duration: '15s', target: 600 },
    { duration: '15s', target: 200 },
    { duration: '15s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<800', 'p(99)<2000'],
    http_req_failed: ['rate<0.1'],
    ticket_purchase_time: ['p(95)<5000'],
    failed_requests: ['rate<0.05'],
    successful_requests: ['rate>0.95'],
  },
  ext: {
    loadimpact: {
      name: 'IMDTravel - Teste de Pico de Estresse - Compra de Ticket',
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
      'login successful': (r) => r.status === 200 || r.status === 201,
    });
  });

  group('Get Available Flights', () => {
    const flights = getFlights({});

    if (!flights || flights.length === 0) {
      exec.test.abort('No flights available.');
    }

    const selectedFlight = selectRandomFlight(flights);
    const day = new Date().toISOString().split('T')[0];

    group('Buy Ticket', () => {
      const startTime = new Date();

      const payload = {
        flight: selectedFlight.flightNumber,
        day,
        cf: false,
        ft: true,
      };

      const res = buyTicket(payload);
      const elapsedTime = new Date() - startTime;

      ticketPurchaseTime.add(elapsedTime);

      const success = check(res, {
        'ticket purchased successfully': (r) => r.status === 201,
        'has valid transaction id': (r) => r.transactionId !== undefined,
      });

      if (success) {
        successfulRequests.add(1);
      } else {
        failedRequests.add(1);
      }
    });
  });

  sleep(1);
}
