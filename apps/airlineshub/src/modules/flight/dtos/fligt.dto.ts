import { AirlineEntity } from '@airlineshub/domains/entities/airline.entity';
import { AirplaneEntity } from '@airlineshub/domains/entities/airplane.entity';
import { AirportEntity } from '@airlineshub/domains/entities/airport.entity';

export class FlightDto {
  id: string;
  flightNumber?: number;
  expectedDeparture: Date;
  expectedArrival: Date;
  duration: number;
  terminal: string;
  gate: string;
  status: string;
  airplane: ReturnType<AirplaneEntity['raw']>;
  departureAirport: ReturnType<AirportEntity['raw']> | null;
  arrivalAirport: ReturnType<AirportEntity['raw']> | null;
  airline: ReturnType<AirlineEntity['raw']> | null;
}
