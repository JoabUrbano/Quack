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
 * Cenário 1: Teste de Tolerância a Falhas
 * - Simula falhas intencionais (cf: true) mas com mecanismo de tolerância ativado (ft: true)
 * - Objetivo: Validar que o sistema se recupera de falhas transitórias
 */

// Métricas customizadas
const failedRequests = new Rate('failed_requests');
const successfulRequests = new Rate('successful_requests');
const ticketPurchaseTime = new Trend('ticket_purchase_time');

export const options = {
  stages: [
    { duration: '30s', target: 5 }, // Ramp-up: 5 usuários
    { duration: '1m', target: 10 }, // Manter: 10 usuários
    { duration: '30s', target: 0 }, // Ramp-down
  ],
  thresholds: {
    'http_req_duration': ['p(95)<500', 'p(99)<1000'],
    'http_req_failed': ['rate<0.1'], // Aceita até 10% de falha
    'successful_requests': ['rate>0.9'], // Pelo menos 90% de sucesso
  },
  ext: {
    loadimpact: {
      name: 'IMDTravel - Tolerance to Failures',
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
      'login status is 200/201': (r) => r.status === 200 || r.status === 201,
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

    // Compra com tolerância a falhas ativada
    const selectedFlight = selectRandomFlight(flights);
    const day = new Date().toISOString().split('T')[0];

    group('Buy Ticket With Fault Tolerance', () => {
      const startTime = new Date();

      const payload = {
        flight: selectedFlight.flightNumber,
        day,
        cf: true,
        ft: true, 
      };

      const res = buyTicket(payload);
      const elapsedTime = new Date() - startTime;

      ticketPurchaseTime.add(elapsedTime);

      const success = check(res, {
        'ticket purchase succeeded': (r) => r.status === 201,
        'transaction id present': (r) => r.transactionId !== undefined,
        'response time acceptable': (r) => elapsedTime < 1000,
      });

      if (success) {
        successfulRequests.add(1);
      } else {
        failedRequests.add(1);
      }
    });
  });

  sleep(2);
}
