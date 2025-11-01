import { FlightEntity } from '@airlineshub/domains/entities/flight.entity';
import { AirplaneEntity } from '@airlineshub/domains/entities/airplane.entity';
import { AirlineEntity } from '@airlineshub/domains/entities/airline.entity';
import { AirportEntity } from '@airlineshub/domains/entities/airport.entity';
import { FlightDto } from '@app/shared/types/fligt.dto';
import { FlightScheduleEntity } from '@airlineshub/domains/entities/flightSchedule.entity';

interface FlightDetailMapperDeps {
  flight: FlightEntity;
  airplane: AirplaneEntity | null;
  departureAirport: AirportEntity | null;
  arrivalAirport: AirportEntity | null;
  airline: AirlineEntity | null;
  flightSchedules: FlightScheduleEntity[];
}

export class FlightDetailMapper {
  static toPresentationDTO({
    flight,
    airplane,
    departureAirport,
    arrivalAirport,
    airline,
    flightSchedules
  }: FlightDetailMapperDeps): FlightDto {
    return {
      id: flight.id,
      flightNumber: flight.flightNumber,
      duration: flight.duration,
      terminal: flight.terminal,
      gate: flight.gate,
      airplane: airplane ? airplane.raw() : null,
      departureAirport: departureAirport ? departureAirport.raw() : null,
      arrivalAirport: arrivalAirport ? arrivalAirport.raw() : null,
      airline: airline ? airline.raw() : null,
      flightSchedules: flightSchedules.map(schedule => schedule.raw()),
    };
  }
}
