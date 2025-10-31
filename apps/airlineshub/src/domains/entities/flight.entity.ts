import { v4 as uuidv4 } from 'uuid';
import { Entity } from '@airlineshub/domains/entities/entity';

export class FlightStatus {
  public value: string;

  constructor(value: string) {
    this.value = value;
  }

  public static SCHEDULED = new FlightStatus('SCHEDULED');
  public static DEPARTED = new FlightStatus('DEPARTED');
  public static ARRIVED = new FlightStatus('ARRIVED');
  public static DELAYED = new FlightStatus('DELAYED');
  public static CANCELED = new FlightStatus('CANCELED');

  static fromValue(value: string): FlightStatus {
    switch (value) {
      case 'SCHEDULED':
        return FlightStatus.SCHEDULED;
      case 'DEPARTED':
        return FlightStatus.DEPARTED;
      case 'ARRIVED':
        return FlightStatus.ARRIVED;
      case 'DELAYED':
        return FlightStatus.DELAYED;
      case 'CANCELED':
        return FlightStatus.CANCELED;
      default:
        throw new Error(`Invalid flight status: ${value}`);
    }
  }

  equals(other: unknown): boolean {
    if (!(other instanceof FlightStatus)) {
      return false;
    }

    return other === this;
  }
}

export interface IFlightProps {
  id: string;
  airplaneId: string;
  flightNumber?: number;
  expectedDeparture: Date;
  expectedArrival: Date;
  duration: number;
  departureAirportId: string;
  arrivalAirportId: string;
  terminal: string;
  gate: string;
  airlineId: string;
  value: number;
  status: FlightStatus;
}

export class FlightEntity extends Entity {
  public airplaneId: string;
  public flightNumber?: number;
  public expectedDeparture: Date;
  public expectedArrival: Date;
  public duration: number;
  public departureAirportId: string;
  public arrivalAirportId: string;
  public terminal: string;
  public gate: string;
  public airlineId: string;
  public value: number;
  public status: FlightStatus;

  constructor(props: IFlightProps) {
    super();
    this._id = props.id;
    this.airplaneId = props.airplaneId;
    this.flightNumber = props.flightNumber;
    this.expectedDeparture = props.expectedDeparture;
    this.expectedArrival = props.expectedArrival;
    this.duration = props.duration;
    this.departureAirportId = props.departureAirportId;
    this.arrivalAirportId = props.arrivalAirportId;
    this.terminal = props.terminal;
    this.gate = props.gate;
    this.airlineId = props.airlineId;
    this.value = props.value;
    this.status = props.status;
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
      id: this.id,
      airplaneId: this.airplaneId,
      flightNumber: this.flightNumber,
      expectedDeparture: this.expectedDeparture,
      expectedArrival: this.expectedArrival,
      duration: this.duration,
      departureAirportId: this.departureAirportId,
      arrivalAirportId: this.arrivalAirportId,
      terminal: this.terminal,
      gate: this.gate,
      airlineId: this.airlineId,
      value: this.value,
      status: this.status.value,
    };
  }

  static dummy() {
    return new FlightEntity({
      value: 10000,
      id: 'dummy-id',
      airplaneId: 'dummy-airplane-id',
      expectedDeparture: new Date(),
      expectedArrival: new Date(),
      duration: 120,
      departureAirportId: 'dummy-departure-airport-id',
      arrivalAirportId: 'dummy-arrival-airport-id',
      terminal: 'A',
      gate: '1',
      airlineId: 'dummy-airline-id',
      status: FlightStatus.SCHEDULED,
    });
  }
}
