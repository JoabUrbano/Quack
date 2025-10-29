import { v4 as uuidv4 } from 'uuid';
import { Entity } from '@airlineshub/domains/entities/entity';

export interface IAirlineProps {
  id: string;
  name: string;
  country: string;
}

export class AirlineEntity extends Entity {
  public name: string;
  public country: string;

  constructor(props: IAirlineProps) {
    super();

    this._id = props.id;
    this.name = props.name;
    this.country = props.country;
  }

  static create(props: Omit<IAirlineProps, 'id'>) {
    const id = uuidv4();

    return new AirlineEntity({
      ...props,
      id,
    });
  }

  raw() {
    return {
      id: this.id,
      name: this.name,
      country: this.country,
    };
  }

  static dummy() {
    return new AirlineEntity({
      id: 'dummy-id',
      name: 'Dummy Airline',
      country: 'Nowhere',
    });
  }
}
