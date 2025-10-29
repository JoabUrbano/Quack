import { v4 as uuidv4 } from 'uuid';
import { Entity } from '@airlineshub/domains/entities/entity';

export interface IAirplaneProps {
  id: string;
  model: string;
  capacity: number;
}

export class AirplaneEntity extends Entity {
  public model: string;
  public capacity: number;

  constructor(props: IAirplaneProps) {
    super();

    this._id = props.id;
    this.model = props.model;
    this.capacity = props.capacity;
  }

  static create(props: Omit<IAirplaneProps, 'id'>) {
    const id = uuidv4();

    return new AirplaneEntity({
      ...props,
      id,
    });
  }

  raw() {
    return {
      id: this.id,
      model: this.model,
      capacity: this.capacity,
    };
  }

  static dummy() {
    return new AirplaneEntity({
      id: 'dummy-id',
      model: 'Dummy Model',
      capacity: 100,
    });
  }
}
