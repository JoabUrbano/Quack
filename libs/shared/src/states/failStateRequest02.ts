import { Injectable } from '@nestjs/common';
import { probabilityEvent } from '../utils/probability';

@Injectable()
export class FailStateRequest02 {
  public request02State: boolean = false;
  public timeout: NodeJS.Timeout;

  constructor() {}

  probability() {
    const event = probabilityEvent(10);

    if (!event) return;

    this.request02State = true;

    if (this.timeout) {
      console.log('[FailStateRequest02] clearing timeout');

      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.request02State = false;
    }, 5000);
  }
}
