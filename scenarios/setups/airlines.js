import http from 'k6/http';

const airlines = [
  {
    name: 'TAP Air Portugal',
    country: 'Portugal',
  },
  {
    name: 'LATAM Airlines',
    country: 'Brasil',
  },
  {
    name: 'Lufthansa',
    country: 'Alemanha',
  },
];

export async function setupAirlines() {
  for (const airlinePayload of airlines) {
    try {
      await http.post(
        'http://localhost:8000/airlineshub/airlines',
        airlinePayload,
      );
    } catch (e) {
      // Ignore errors during airline creation
      console.log(
        'Setup de criação de companhia aérea falhou (possivelmente a companhia já existe): ' +
          e.message,
      );
    }
  }
}
