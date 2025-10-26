import { v4 as uuidv4 } from 'uuid';

export class FlightStatus {
  public value: string;

  constructor(value: string) {
    this.value = value;
  }

  private static SCHEDULE = new FlightStatus('SCHEDULE');
  private static DEPARTED = new FlightStatus('DEPARTED');
  private static ARRIVED = new FlightStatus('ARRIVED');
  private static DELAYED = new FlightStatus('DELAYED');
  private static CANCELED = new FlightStatus('CANCELED');

  static fromValue(value: string): FlightStatus {
    switch (value) {
      case 'SCHEDULE':
        return FlightStatus.SCHEDULE;
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
  flightNumber: number;
  expectedDeparture: Date;
  expectedArrival;
  duration: number;
  terminal: string;
  gate: string;
  airlineId: string;
  status: FlightStatus;
}

export class FlightEntity {
  public id: string;
  public flightNumber: number;
  public expectedDeparture: Date;
  public expectedArrival;
  public duration: number;
  public terminal: string;
  public gate: string;
  public airlineId: string;
  public status: FlightStatus;

  constructor(props: IFlightProps) {
    this.id = props.id;
    this.flightNumber = props.flightNumber;
    this.expectedDeparture = props.expectedDeparture;
    this.expectedArrival = props.expectedArrival;
    this.duration = props.duration;
    this.terminal = props.terminal;
    this.gate = props.gate;
    this.airlineId = props.airlineId;
    this.status = props.status;
  }

  static create(props: IFlightProps) {
    const id = props.id ?? uuidv4();

    return new FlightEntity({
      ...props,
      id,
    });
  }

  equals(other: unknown): boolean {
    if (!(other instanceof FlightEntity)) {
      return false;
    }

    if (other === this) {
      return true;
    }

    return this.id === other.id;
  }

  raw() {
    return {
      id: this.id,
      flightNumber: this.flightNumber,
      expectedDeparture: this.expectedDeparture,
      expectedArrival: this.expectedArrival,
      duration: this.duration,
      terminal: this.terminal,
      gate: this.gate,
      airlineId: this.airlineId,
      status: this.status.value,
    };
  }
}
