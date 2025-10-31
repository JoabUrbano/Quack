import { FlightEntity } from '@airlineshub/domains/entities/flight.entity';
import { AirplaneEntity } from '@airlineshub/domains/entities/airplane.entity';
import { AirlineEntity } from '@airlineshub/domains/entities/airline.entity';
import { AirportEntity } from '@airlineshub/domains/entities/airport.entity';
import { FlightDto } from '@app/shared/types/fligt.dto';

interface FlightDetailMapperDeps {
  flight: FlightEntity;
  airplane: AirplaneEntity | null;
  departureAirport: AirportEntity | null;
  arrivalAirport: AirportEntity | null;
  airline: AirlineEntity | null;
}

export class FlightDetailMapper {
  static toPresentationDTO({
    flight,
    airplane,
    departureAirport,
    arrivalAirport,
    airline,
  }: FlightDetailMapperDeps): FlightDto {
    return {
      id: flight.id,
      value: flight.value,
      flightNumber: flight.flightNumber,
      expectedDeparture: flight.expectedDeparture,
      expectedArrival: flight.expectedArrival,
      duration: flight.duration,
      terminal: flight.terminal,
      gate: flight.gate,
      status: flight.status.value,
      airplane: airplane ? airplane.raw() : null,
      departureAirport: departureAirport ? departureAirport.raw() : null,
      arrivalAirport: arrivalAirport ? arrivalAirport.raw() : null,
      airline: airline ? airline.raw() : null,
    };
  }
}
