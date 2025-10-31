import { v4 as uuidv4 } from 'uuid';
import { Entity } from '@airlineshub/domains/entities/entity';

export interface IAirlineProps {
  id: string;
  seatNumber: number;
  flightId: string;
  purchaseDate: Date;
  finalValue: number;
  userId: string;
}

export class AirTicket extends Entity {
  public seatNumber: number;
  public flightId: string;
  public purchaseDate: Date;
  public finalValue: number;
  public userId: string;

  constructor(props: IAirlineProps) {
    super();

    this._id = props.flightId;
    this.seatNumber = props.seatNumber;
    this.purchaseDate = props.purchaseDate;
    this.finalValue = props.finalValue;
    this.userId = props.userId;
  }

  static create(props: Omit<IAirlineProps, 'id'>) {
    const id = uuidv4();

    return new AirTicket({
      ...props,
      id,
    });
  }

  raw() {
    return {
      id: this.id,
      seatNumber: this.seatNumber,
      flightId: this.flightId,
      purchaseDate: this.purchaseDate,
      finalValue: this.finalValue,
      userId: this.userId,
    };
  }

  static dummy() {
    return new AirTicket({
      id: 'dummy-id',
      seatNumber: 1,
      purchaseDate: new Date(),
      finalValue: 10000,
      flightId: 'dummy-flight-id',
      userId: 'dummy-user-id',
    });
  }
}
