import { v4 as uuidv4 } from 'uuid';

export interface IAirlineProps {
  id: string;
  name: string;
  country: string;
}

export class AirlineEntity {
  constructor(props: IAirlineProps) {
    this.id = props.id;
    this.name = props.name;
    this.country = props.country;
  }

  public id: string;
  public name: string;
  public country: string;

  static create(props: Omit<IAirlineProps, 'id'>) {
    const id = uuidv4();

    return new AirlineEntity({
      ...props,
      id,
    });
  }

  equals(other: unknown): boolean {
    if (!(other instanceof AirlineEntity)) {
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
      name: this.name,
      country: this.country,
    };
  }
}
