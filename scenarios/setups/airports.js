import http from 'k6/http';

const airports = [
  {
    iata: 'LIS',
    name: 'Humberto Delgado Lisbon Airport',
    city: 'Lisboa',
    country: 'Portugal',
  },
  {
    iata: 'GIG',
    name: 'Rio de Janeiro International Airport',
    city: 'Rio de Janeiro',
    country: 'Brasil',
  },
  {
    iata: 'CGH',
    name: 'Congonhas Airport',
    city: 'São Paulo',
    country: 'Brasil',
  },
  {
    iata: 'FRA',
    name: 'Frankfurt Airport',
    city: 'Frankfurt',
    country: 'Alemanha',
  },
];

export async function setupAirports() {
  for (const airportPayload of airports) {
    try {
      await http.post(
        'http://localhost:8000/airlineshub/airports',
        airportPayload,
      );
    } catch (e) {
      // Ignore errors during airport creation
      console.log(
        'Setup de criação de aeroporto falhou (possivelmente o aeroporto já existe): ' +
          e.message,
      );
    }
  }
}
