import { Injectable } from '@nestjs/common';

@Injectable()
export class FidelityService {
  getHello(): string {
    return 'Hello World!';
  }
}
