import {
  setupAirlines,
  setupAirplane,
  setupAirports,
  setupUsers,
  users,
} from './setups/index.js';
import { getFlights, login, buyTicket} from './apis/index.js';
import { check, sleep, group } from 'k6';
import http from 'k6/http';
import exec from 'k6/execution';
import { selectRandomFlight } from './utils/index.js';

export const options = {
  vus: 2,
  duration: '5s',
  thresholds: {
    http_req_duration: ['p(95)<350'],
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

  const loginRes = login(loginPayload);

  // Usuário consulta os tickets disponíveis
  const flights = await getFlights({});

  if (!flights || flights.length === 0) {
    exec.test.abort('Nenhum voo disponível para compra de ticket.');
  }

  // Usuario seleciona um voo aleatório e compra o ticket
  const selectedFlight = selectRandomFlight(flights);
  const day = new Date().toISOString().split('T')[0];

  const payload = {
    flight: selectedFlight.flightNumber,
    day,
    cf: false,
    ft: true,
  };

  const res = buyTicket(payload);

  console.log(`status: ${res.status}; body: ${JSON.stringify(res)}`);

  sleep(1);
}
