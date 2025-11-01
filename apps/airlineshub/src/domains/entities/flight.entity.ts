import { v4 as uuidv4 } from 'uuid';
import { Entity } from '@airlineshub/domains/entities/entity';

export interface IFlightProps {
  id: string;
  airplaneId: string;
  flightNumber?: number;
  duration: number;
  departureAirportId: string;
  arrivalAirportId: string;
  terminal: string;
  gate: string;
  airlineId: string;
}

export class FlightEntity extends Entity {
  public airplaneId: string;
  public flightNumber?: number;
  public duration: number;
  public departureAirportId: string;
  public arrivalAirportId: string;
  public terminal: string;
  public gate: string;
  public airlineId: string;

  constructor(props: IFlightProps) {
    super();
    this._id = props.id;
    this.airplaneId = props.airplaneId;
    this.flightNumber = props.flightNumber;
    this.duration = props.duration;
    this.departureAirportId = props.departureAirportId;
    this.arrivalAirportId = props.arrivalAirportId;
    this.terminal = props.terminal;
    this.gate = props.gate;
    this.airlineId = props.airlineId;
  }

  static create(props: Omit<IFlightProps, 'id' | 'flightNumber'>) {
    const id = uuidv4();

    return new FlightEntity({
      ...props,
      id,
    });
  }

  raw() {
    return {
      id: this._id,
      airplaneId: this.airplaneId,
      flightNumber: this.flightNumber,
      duration: this.duration,
      departureAirportId: this.departureAirportId,
      arrivalAirportId: this.arrivalAirportId,
      terminal: this.terminal,
      gate: this.gate,
      airlineId: this.airlineId,
    };
  }

  static dummy() {
    return new FlightEntity({
      id: 'dummy-id',
      airplaneId: 'dummy-airplane-id',
      flightNumber: 1234,
      duration: 180,
      departureAirportId: 'dummy-departure-airport-id',
      arrivalAirportId: 'dummy-arrival-airport-id',
      terminal: 'A',
      gate: '1',
      airlineId: 'dummy-airline-id',
    });
  }
}
