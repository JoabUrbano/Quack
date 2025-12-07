import '../apis/types.js';

/**
 *
 * @param {Flight[]} flights
 * @returns {Flight} Voo selecionado aleatoriamente
 */
export function selectRandomFlight(flights) {
  const randomIndex = Math.floor(Math.random() * flights.length);

  const selectedFlight = flights[randomIndex];

  return selectedFlight;
}
