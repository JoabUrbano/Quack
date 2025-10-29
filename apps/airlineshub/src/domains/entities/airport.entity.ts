import { v4 as uuidv4 } from 'uuid';
import { Entity } from '@airlineshub/domains/entities/entity';
import { DomainValidationException } from '@airlineshub/domains/exceptions/domain-validation.exception';

export interface IAirportProps {
  id: string;
  name: string;
  city: string;
  country: string;
  iata: string;
}

export class AirportEntity extends Entity {
  public name: string;
  public city: string;
  public country: string;
  public iata: string;

  constructor(props: IAirportProps) {
    super();

    this.validate(props);

    this._id = props.id;
    this.name = props.name;
    this.city = props.city;
    this.country = props.country;
    this.iata = props.iata;
  }

  private validate(props: IAirportProps): void {
    if (!props.name || props.name.trim() === '') {
      throw new DomainValidationException('Airport name is required');
    }

    if (!props.city || props.city.trim() === '') {
      throw new DomainValidationException('Airport city is required');
    }

    if (!props.country || props.country.trim() === '') {
      throw new DomainValidationException('Airport country is required');
    }

    if (!props.iata || props.iata.trim() === '') {
      throw new DomainValidationException('Airport IATA code is required');
    }

    if (props.iata.length !== 3) {
      throw new DomainValidationException(
        'Airport IATA code must be 3 characters long',
      );
    }
  }

  static create(props: Omit<IAirportProps, 'id'>) {
    const id = uuidv4();

    return new AirportEntity({
      ...props,
      id,
    });
  }

  raw() {
    return {
      id: this.id,
      name: this.name,
      city: this.city,
      country: this.country,
      iata: this.iata,
    };
  }

  static dummy() {
    return new AirportEntity({
      id: 'dummy-id',
      name: 'Dummy Airport',
      city: 'Dummy City',
      country: 'Dummy Country',
      iata: 'DUM',
    });
  }
}
