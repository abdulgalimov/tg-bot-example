import {getContext, Telegram} from "@abdulgalimov/tg-framework";

import { DbExample, LocaleExample, StorageExample } from "./utils";
import { actionsTree } from "./actions";
import {CoreHandler, MainHandler} from "./handlers";
import {HandlerOptions} from "./handlers/base.handler";

export class Bot {
  private readonly tg: Telegram;

  private coreHandler: CoreHandler

  private mainHandler: MainHandler;

  public constructor() {
    this.tg = new Telegram({
      storage: new StorageExample(),
      locale: new LocaleExample(),
      tg: {
        apiUrl: "https://api.telegram.org",
        token: "7633108518:AAGOCbUkJ1L6PoDB03M0xDIolHsTJL8cxLo",
      },
      actionsTree,
      handler: () => this.tryUpdate(),
      textIcons: {},
      db: new DbExample(),
    });

    const options: HandlerOptions = {
      tg: this.tg,
    }

    this.coreHandler = new  CoreHandler(options)

    this.mainHandler = new  MainHandler(options)
  }

  public async init(): Promise<void> {
    await this.tg.init();
  }

  private async tryUpdate(tryCount: number = 0) {
    const ctx = getContext();

    const result = await this.update();

    if (typeof result === 'object' && result.redirect) {
      const { action, payload } = result.redirect;
      ctx.action = action;

      ctx.payload = this.tg.payload.parse(ctx.action, ctx.payload, payload);

      if (tryCount < 5) {
        await this.tryUpdate(tryCount + 1);
      }
    }
  }

  private async update() {
    const ctx = getContext();
    console.log(ctx.action.meta.fullKey);

    if (ctx.action.meta.childOf(actionsTree.core)) {
      return await this.coreHandler.update();
    }

    if (ctx.action.meta.childOf(actionsTree.main)) {
      return await this.mainHandler.update();
    }
  }
}
