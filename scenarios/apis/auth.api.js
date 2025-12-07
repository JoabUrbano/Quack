import http from 'k6/http';

/**
 * Realiza o login de um usuário.
 *
 * @param {Object} input - Dados de login.
 * @param {string} input.email - Email do usuário.
 * @param {string} input.password - Senha do usuário.
 *
 * @returns {Object} Retorno contendo o corpo da resposta e o status.
 * @returns {string} return.message - Mensagem retornada pelo login.
 * @returns {number} return.status - Status HTTP da resposta.
 */
export function login(input) {
  const loginRes = http.post(
    'http://localhost:8000/auth/login',
    JSON.stringify(input),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return { ...JSON.parse(loginRes.body), status: loginRes.status };
}
