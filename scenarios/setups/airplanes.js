import http from 'k6/http';

const airplanes = [
  {
    model: 'Boeing 787 Dreamliner',
    capacity: 242,
  },
  {
    model: 'Airbus A320',
    capacity: 194,
  },
  {
    model: 'Airbus A380',
    capacity: 555,
  },
];

export async function setupAirplane() {
  for (const airplaneModelPayload of airplanes) {
    try {
      await http.post(
        'http://localhost:8000/airlineshub/airplanes',
        airplaneModelPayload,
      );
    } catch (e) {
      // Ignore errors during airplane model creation
      console.log(
        'Setup de criação de modelo de avião falhou (possivelmente o modelo já existe): ' +
          e.message,
      );
    }
  }
}
