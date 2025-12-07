import http from 'k6/http';

const users = [
  {
    name: 'Luiz Gustavo',
    email: 'luizgustavooumbelino@email.com',
    password: '123123',
  },
  {
    name: 'João Silva',
    email: 'joao.silva@email.com',
    password: '123123',
  },
  {
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    password: '123123',
  },
  {
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@email.com',
    password: '123123',
  },
  {
    name: 'Ana Costa',
    email: 'ana.costa@email.com',
    password: '123123',
  },
  {
    name: 'Gibeon Aquino',
    email: 'gibeon.aquino@email.com',
    password: '123123',
  },
  {
    name: 'Joab Urbano',
    email: 'joab.urbano@email.com',
    password: '123123',
  }
];

export async function setupUsers() {
  for (const loginPayload of users) {
    try {
      await http.post('http://localhost:8000/auth/register', loginPayload);
    } catch (e) {
      // Ignore errors during registration
      console.log(
        'Setup de registro de usuário falhou (possivelmente o usuário já existe): ' +
          e.message,
      );
    }
  }
}
