import { expect } from 'https://jslib.k6.io/k6-testing/0.6.1/index.js';


import http from 'k6/http';
import { check } from 'k6';

const users = [
  {
    name: 'luiz gustavo',
    email: 'luizgustavooumbelino@gmail.com',
    password: '123123',
  },
  {
    name: 'john doe',
    email: 'johndoe@example.com',
    password: 'password123',
  }
];

export const options = {
  vus: 2,
  iterations: 5,
};

export async function setup() {
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

export default async function () {
  await setup();

  for (const loginPayload of users) {
    const res = http.post('http://localhost:8000/auth/login', {
      email: loginPayload.email,
      password: loginPayload.password,
    });

    // check(res, {
    //   'is status 201': (r) => r.status === 201,
    //   'has token': (r) => {
    //     // check if has token in cookies
    //     const accessToken = r.cookies['accessToken'];
    //     const refereshToken = r.cookies['refreshToken'];

    //     const accessTokenData = accessToken ? accessToken[0].value : null;
    //     const refreshTokenData = refereshToken ? refereshToken[0].value : null;

    //     if (!accessTokenData || !refreshTokenData) {
    //       return false;
    //     }

    //     return true;
    //   },
    // });

    expect(res.status).toEqual(201);

    const accessToken = res.cookies['accessToken'];
    const refreshToken = res.cookies['refreshToken'];

    const accessTokenData = accessToken ? accessToken[0].value : null;
    const refreshTokenData = refreshToken ? refreshToken[0].value : null;

    expect(accessTokenData).not.toBeNull();
    expect(refreshTokenData).not.toBeNull();


  }
}
