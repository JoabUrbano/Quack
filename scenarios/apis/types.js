/**
 * @typedef {Object} Airport
 * @property {string} id - ID do aeroporto
 * @property {string} name - Nome do aeroporto
 * @property {string} city - Cidade
 * @property {string} country - País
 * @property {string} iata - Código IATA
 */

/**
 * @typedef {Object} Airplane
 * @property {string} id - ID do avião
 * @property {string} model - Modelo do avião
 * @property {number} capacity - Capacidade de passageiros
 */

/**
 * @typedef {Object} Airline
 * @property {string} id - ID da companhia aérea
 * @property {string} name - Nome da companhia aérea
 * @property {string} country - País da companhia aérea
 */

/**
 * @typedef {Object} Flight
 * @property {string} id - ID do voo
 * @property {number} value - Preço do voo
 * @property {number} flightNumber - Número do voo
 * @property {string} expectedDeparture - Data/hora esperada de partida
 * @property {string} expectedArrival - Data/hora esperada de chegada
 * @property {number} duration - Duração do voo em minutos
 * @property {string} terminal - Terminal de saída
 * @property {string} gate - Portão de saída
 * @property {string} status - Status do voo
 * @property {Airplane} airplane - Informações do avião
 * @property {Airport} departureAirport - Informações do aeroporto de partida
 * @property {Airport} arrivalAirport - Informações do aeroporto de chegada
 * @property {Airline} airline - Informações da companhia aérea
 */

export {};
