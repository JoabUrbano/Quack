import {
  setupAirlines,
  setupAirplane,
  setupAirports,
  setupUsers,
  users,
} from './setups/index.js';
import { getFlights } from './apis/index.js';
import { check, sleep, group } from 'k6';
import http from 'k6/http';
import exec from 'k6/execution';
import { selectRandomFlight } from './utils/index.js';

export const options = {
  vus: 2,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(95)<300'],
    http_req_failed: ['rate<0.01'],
  },
};

export function setup() {
  setupAirlines();
  setupAirports();
  setupAirplane();
  setupUsers();
}

export default async function () {
  // Usuário faz login

  const indexUser = exec.vu.idInTest % users.length;
  const user = users[indexUser];

  console.log(`VU ID: ${exec.vu.idInTest}; Usando usuário: ${user.email}`);

  console.log('indexUser => ', indexUser);

  const loginPayload = {
    email: user.email,
    password: user.password,
  };

  const loginRes = await http.post(
    'http://localhost:8000/auth/login',
    JSON.stringify(loginPayload),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  // Usuário consulta os tickets disponíveis
  const flights = await getFlights({});

  if (!flights || flights.length === 0) {
    exec.test.abort('Nenhum voo disponível para compra de ticket.');
  }

  const selectedFlight = selectRandomFlight(flights);
  const day = new Date().toISOString().split('T')[0];

  const payload = JSON.stringify({
    flight: selectedFlight.flightNumber,
    day,
    ft: false,
  });

  const headers = {
    'Content-Type': 'application/json',
  };

  const res = http.post(
    'http://localhost:8000/imdtravel/tickets/buyTicket',
    payload,
    {
      headers,
    },
  );

  console.log('res => ', res.body);

  check(res, {
    'status == 200': (r) => r.status === 200,
    'response has ticketId': (r) => r.body.includes('ticketId'),
  });

  sleep(1);
}
