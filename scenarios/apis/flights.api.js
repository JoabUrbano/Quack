import http from 'k6/http';
import './types.js';

/**
 * Consulta os voos disponíveis.
 * @param {Object} input - Objeto de entrada contendo os parâmetros necessários.
 * @param {string} input.accessToken - Token de acesso do usuário.
 * @param {string} input.refreshToken - Token de atualização do usuário.
 * @param {number} input.limit - Número máximo de voos a serem retornados.
 * @param {number} input.page - Página dos resultados a serem retornados.
 * @returns {Flight[]} Array de voos disponíveis.
 */
export function getFlights(input) {
  const { accessToken, refreshToken, limit, page } = input || {};

  const url = `http://localhost:8000/airlineshub/flights`;

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.get(url, params);

  return JSON.parse(res.body);
}
