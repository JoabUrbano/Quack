import { BaseDomainException } from '@airlineshub/domains/exceptions';

export class DomainValidationException extends BaseDomainException {
  constructor(message: string) {
    super(message);
    this.name = 'DomainValidationException';
  }
}
