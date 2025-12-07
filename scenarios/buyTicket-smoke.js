import { check, sleep } from 'k6';
import http from 'k6/http';
import exec from 'k6/execution';

export const options = {
  vus: 2,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(95)<300'],
    http_req_failed: ['rate<0.01'],
  },
};

const users = [
  {
    name: 'luiz gustavo',
    email: 'luizgustavooumbelino@gmail.com',
    password: '123123',
  },
];


export async function createUsers() {
  for (const loginPayload of users) {
    try {
      await http.post('http://localhost:8000/auth/register', loginPayload);
    } catch (e) {
      // Ignore errors during registration
      console.log(
        'Setup registration error (possibly user already exists): ' + e.message,
      );
    }
  }
}

export async function createFlights() {

}

export async function setup() {
    await createUsers();
}

export default async function () {
  const jar = http.cookieJar();
  jar.set('http://localhost:8000', 'accessToken', '');
  jar.set('http://localhost:8000', 'refreshToken', '');

  const loginPayload = {
    email: 'luizgustavooumbelino@gmail.com',
    password: '123123',
  };

  const loginRes = await http.post(
    'http://localhost:8000/auth/login',
    JSON.stringify(loginPayload),
    {
      headers: {
        'Content-Type': 'application/json',
      },
      cookies: jar.cookiesForURL('http://localhost:8000'),
    },
  );

  const payload = JSON.stringify({
    flight: 1,
    day: '2025-11-02',
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
      cookies: jar.cookiesForURL('http://localhost:8000'),
    },
  );

  console.log('res => ', res.body);

  console.log(`VU: ${exec.vu.idInInstance} - Status: ${res.status}`);

  check(res, {
    'status == 200': (r) => r.status === 200,
    'response has ticketId': (r) => r.body.includes('ticketId'),
  });

  sleep(1);
}
