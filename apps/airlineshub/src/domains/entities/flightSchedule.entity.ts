import { v4 as uuidv4 } from 'uuid';
import { Entity } from '@airlineshub/domains/entities/entity';

export class FlightScheduleStatus {
  public value: string;

  constructor(value: string) {
    this.value = value;
  }

  public static SCHEDULED = new FlightScheduleStatus('SCHEDULED');
  public static DEPARTED = new FlightScheduleStatus('DEPARTED');
  public static ARRIVED = new FlightScheduleStatus('ARRIVED');
  public static DELAYED = new FlightScheduleStatus('DELAYED');
  public static CANCELED = new FlightScheduleStatus('CANCELED');

  static fromValue(value: string): FlightScheduleStatus {
    switch (value) {
      case 'SCHEDULED':
        return FlightScheduleStatus.SCHEDULED;
      case 'DEPARTED':
        return FlightScheduleStatus.DEPARTED;
      case 'ARRIVED':
        return FlightScheduleStatus.ARRIVED;
      case 'DELAYED':
        return FlightScheduleStatus.DELAYED;
      case 'CANCELED':
        return FlightScheduleStatus.CANCELED;
      default:
        throw new Error(`Invalid flight status: ${value}`);
    }
  }

  equals(other: unknown): boolean {
    if (!(other instanceof FlightScheduleStatus)) {
      return false;
    }

    return other === this;
  }
}

export interface IFlightScheduleProps {
  id: string;
  flightId: string;
  expectedDeparture: Date;
  expectedArrival: Date;
  value: number;
  status: FlightScheduleStatus;
}

export class FlightScheduleEntity extends Entity {
  public expectedDeparture: Date;
  public expectedArrival: Date;
  public flightId: string;
  public value: number;
  public status: FlightScheduleStatus;

  constructor(props: IFlightScheduleProps) {
    super();
    this._id = props.id;
    this.flightId = props.flightId;
    this.expectedDeparture = props.expectedDeparture;
    this.expectedArrival = props.expectedArrival;
    this.value = props.value;
    this.status = props.status;
  }

  static create(props: Omit<IFlightScheduleProps, 'id' | 'flightNumber'>) {
    const id = uuidv4();

    return new FlightScheduleEntity({
      ...props,
      id,
    });
  }

  raw() {
    return {
      id: this._id,
      flightId: this.flightId,
      expectedDeparture: this.expectedDeparture,
      expectedArrival: this.expectedArrival,
      value: this.value,
      status: this.status.value,
    };
  }

  static dummy() {
    return new FlightScheduleEntity({
      id: 'dummy-id',
      flightId: 'dummy-flight-id',
      expectedDeparture: new Date(),
      expectedArrival: new Date(),
      value: 10000,
      status: FlightScheduleStatus.SCHEDULED,
    });
  }
}
