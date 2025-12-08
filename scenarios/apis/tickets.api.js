import http from 'k6/http';

/**
 * Compra um ticket de voo.
 *
 * @param {Object} input
 * @param {number} input.flight - Número do voo.
 * @param {string} input.day - Dia do voo no formato YYYY-MM-DD.
 * @param {boolean} input.cf - Se a API deve causar falhas simuladas.
 * @param {boolean} input.ft - Se a API deve ter falhas toleradas.
 *
 * @returns {Object} Retorno da API.
 * @returns {string} return.transactionId - ID da transação gerada pela compra.
 * @returns {number} return.status - Status HTTP da resposta.
 */

export function buyTicket(input) {
  const headers = {
    'Content-Type': 'application/json',
  };

  const body = JSON.stringify(input);

  const res = http.post(
    'http://localhost:8000/imdtravel/tickets/buyTicket',
    body,
    { headers },
  );

  return { ...JSON.parse(res.body), status: res.status };
}
