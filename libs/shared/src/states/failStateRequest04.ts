import { Injectable } from '@nestjs/common';
import { probabilityEvent } from '../utils/probability';

@Injectable()
export class FailStateRequest04 {
  public request04State: boolean = false;

  constructor() {}

  probability() {
    const event = probabilityEvent(2);

    if (!event) return;
    this.request04State = true;
  }
}
