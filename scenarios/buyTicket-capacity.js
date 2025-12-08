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
import { Rate, Trend } from 'k6/metrics';
import { selectRandomFlight } from './utils/index.js';

/**
 * Cenário 3: Teste de Capacidade
 * Objetivo: Avaliar a capacidade máxima do sistema em termos de usuários simultâneos
 */

const ticketPurchaseTime = new Trend('ticket_purchase_time');
const failedRequests = new Rate('failed_requests');
const successfulRequests = new Rate('successful_requests');

export const options = {
  scenarios: {
    capacity_test: {
      executor: 'ramping-vus',
      startVUs: 1,
      stages: [
        { duration: '30s', target: 10 },
        { duration: '30s', target: 50 },
        { duration: '30s', target: 100 },
        { duration: '30s', target: 250 },
        { duration: '30s', target: 500 },
        { duration: '30s', target: 750 },
        { duration: '30s', target: 1000 },
        { duration: '30s', target: 1500 },
        { duration: '30s', target: 2000 },
      ],
      gracefulStop: '10s',
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    ticket_purchase_time: ['p(95)<5000'],
    failed_requests: ['rate<0.05'],
    successful_requests: ['rate>0.95'],
  },
  ext: {
    loadimpact: {
      name: 'IMDTravel - Teste de Capacidade - Compra de Ticket',
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
    const loginRes = login({
      email: user.email,
      password: user.password,
    });

    check(loginRes, {
      'login ok': (r) => r.status === 200 || r.status === 201,
    });
  });

  group('Get Flights', () => {
    const flights = getFlights({});

    check(flights, {
      'tem voos': (f) => f && f.length > 0,
    });

    if (!flights || flights.length === 0) exec.test.abort();
    const selected = selectRandomFlight(flights);
    const day = new Date().toISOString().split('T')[0];

    group('Buy Ticket', () => {
      const start = Date.now();

      const res = buyTicket({
        flight: selected.flightNumber,
        day,
        cf: false,
        ft: true,
      });

      ticketPurchaseTime.add(Date.now() - start);

      const success = check(res, {
        'ticket criado': (r) => r.status === 201,
      });

      if (success) successfulRequests.add(1);
      else failedRequests.add(1);
    });
  });

  sleep(1);
}
