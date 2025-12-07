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
  duration: '5s',
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

  console.log(
    `VU ID: ${exec.vu.idInTest}; Index: ${indexUser}; Usando usuário: ${user.email}`,
  );

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
    ft: true,
  });

  console.log(`status: ${loginRes.status}; body: ${loginRes.body}`);

  const headers = {
    'Content-Type': 'application/json',
  };

  const res = http.post(
    'http://localhost:8000/imdtravel/tickets/buyTicket',
    payload,
    { headers },
  );

  check(res, {
    'status == 201': (r) => r.status === 201,
  });

  sleep(1);
}
