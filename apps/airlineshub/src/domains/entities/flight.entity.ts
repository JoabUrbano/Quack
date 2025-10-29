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
  terminal: string;
  gate: string;
  airlineId: string;
  status: FlightStatus;
}

export class FlightEntity extends Entity {
  private airplaneId: string;
  private flightNumber?: number;
  private expectedDeparture: Date;
  private expectedArrival: Date;
  private duration: number;
  private terminal: string;
  private gate: string;
  private airlineId: string;
  private status: FlightStatus;

  constructor(props: IFlightProps) {
    super();
    this._id = props.id;
    this.airplaneId = props.airplaneId;
    this.flightNumber = props.flightNumber;
    this.expectedDeparture = props.expectedDeparture;
    this.expectedArrival = props.expectedArrival;
    this.duration = props.duration;
    this.terminal = props.terminal;
    this.gate = props.gate;
    this.airlineId = props.airlineId;
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
      terminal: this.terminal,
      gate: this.gate,
      airlineId: this.airlineId,
      status: this.status.value,
    };
  }

  static dummy() {
    return new FlightEntity({
      id: 'dummy-id',
      airplaneId: 'dummy-airplane-id',
      expectedDeparture: new Date(),
      expectedArrival: new Date(),
      duration: 120,
      terminal: 'A',
      gate: '1',
      airlineId: 'dummy-airline-id',
      status: FlightStatus.SCHEDULED,
    });
  }
}
