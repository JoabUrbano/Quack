import { v4 as uuidv4 } from 'uuid';
import { Entity } from '@airlineshub/domains/entities/entity';

export interface IUserProps {
  id: string;
  name: string;
  email: string;
  password: string;
}

export class UserEntity extends Entity {
  public name: string;
  public email: string;
  public password: string;

  constructor(props: IUserProps) {
    super();

    this._id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
  }

  static create(props: Omit<IUserProps, 'id'>) {
    const id = uuidv4();

    return new UserEntity({
      ...props,
      id,
    });
  }

  raw() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }

  static dummy() {
    return new UserEntity({
      id: 'dummy-id',
      name: 'Dummy User',
      email: 'dummy@example.com',
      password: 'dummy-password',
    });
  }
}
