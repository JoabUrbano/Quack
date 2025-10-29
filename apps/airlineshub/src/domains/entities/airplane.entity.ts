import { v4 as uuidv4 } from 'uuid';

export interface IAirplaneProps {
  id: string;
  model: string;
  capacity: number;
}

export class AirplaneEntity {
  constructor(props: IAirplaneProps) {
    this.id = props.id;
    this.model = props.model;
    this.capacity = props.capacity;
  }

  public id: string;
  public model: string;
  public capacity: number;

  static create(props: Omit<IAirplaneProps, 'id'>) {
    const id = uuidv4();

    return new AirplaneEntity({
      ...props,
      id,
    });
  }

  equals(other: unknown): boolean {
    if (!(other instanceof AirplaneEntity)) {
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
      model: this.model,
      capacity: this.capacity,
    };
  }
}
