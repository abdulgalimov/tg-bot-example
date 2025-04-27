import {Telegram} from "@abdulgalimov/tg-framework";

export type HandlerOptions = {
  tg: Telegram
}

export class BaseHandler {
  protected tg: Telegram;

  public constructor(options: HandlerOptions) {
    this.tg = options.tg;
  }
}