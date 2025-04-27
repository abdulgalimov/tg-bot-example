import {ContextAny, getContext} from "@abdulgalimov/tg-framework";

import {actionsTree} from "../../actions";
import {BaseHandler} from "../base.handler";

export class MainHandler extends BaseHandler {
  public async update() {
    const ctx = getContext()

    switch (ctx.action) {
      case actionsTree.main.menu:
        return await this.menu(ctx);
      case actionsTree.main.ping:
        return await this.ping(ctx);
    }
  }

  private async menu(ctx: ContextAny) {
    await this.tg.context.reply({
      text: 'Main menu',
      reply_markup: {
        inline_keyboard: [[{
          text: 'ping',
          callback_data: this.tg.payload.encode(actionsTree.main.ping)
        }]]
      }
    })
  }

  private async ping(ctx: ContextAny) {
    await this.tg.context.showAlert('pong')
  }
}