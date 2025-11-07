import { Injectable } from '@nestjs/common';
import { probabilityEvent } from '@app/shared/utils/probability';
@Injectable()
export class FailStateRequest01 {
  public request01State: Boolean = false;
  constructor() {}

  probability() {
    const event = probabilityEvent(20);

    if (event) {
      this.request01State = true;
    } else {
      this.request01State = false;
    }
  }
}
