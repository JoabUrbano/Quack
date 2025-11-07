import { Injectable } from '@nestjs/common';
import { probabilityEvent } from '../utils/probability';

@Injectable()
export class FailStateRequest03 {
  public request03State: boolean = false;
  public timeout: NodeJS.Timeout;

  constructor() {}

  probability() {
    const event = probabilityEvent(10);

    if (!event) return;

    this.request03State = true;

    if (this.timeout) {
      console.log('[FailStateRequest03] clearing timeout');

      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.request03State = false;
    }, 10000);
  }
}
