import { getContext, Telegram, UpdateResult } from "@abdulgalimov/tg-framework";

import { LocaleExample, StorageExample } from "./utils";
import { actionsTree } from "./actions";
import { CoreHandler, MainHandler } from "./handlers";
import { HandlerOptions } from "./handlers/base.handler";

export class Bot {
  private readonly tg: Telegram;

  private coreHandler: CoreHandler;

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
      handler: () => this.update(),
    });

    const options: HandlerOptions = {
      tg: this.tg,
    };

    this.coreHandler = new CoreHandler(options);

    this.mainHandler = new MainHandler(options);
  }

  public async init(): Promise<void> {
    await this.tg.init();
  }

  private async update(): Promise<UpdateResult> {
    const ctx = getContext();

    if (ctx.action.meta.childOf(actionsTree.core)) {
      return await this.coreHandler.update();
    }

    if (ctx.action.meta.childOf(actionsTree.main)) {
      return await this.mainHandler.update();
    }
  }
}
