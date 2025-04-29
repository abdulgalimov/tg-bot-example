import {
  ApiService,
  Context,
  ContextAny,
  ContextService,
  getContext,
  Inject,
  Injectable,
  PayloadService,
  UpdateResult,
} from "@abdulgalimov/tg-framework";

import { actionsTree } from "../../actions";
import { BaseHandler } from "../base.handler";

@Injectable()
export class MainHandler extends BaseHandler {
  @Inject(ContextService)
  private contextService!: ContextService;

  @Inject(ApiService)
  private apiService!: ApiService;

  @Inject(PayloadService)
  private payloadService!: PayloadService;

  public async update() {
    const ctx = getContext();

    switch (ctx.action) {
      case actionsTree.main.menu:
        return await this.menu(ctx);
      case actionsTree.main.ping:
        return await this.ping(
          ctx as Context<{ action: typeof actionsTree.main.ping }>,
        );
      case actionsTree.main.sendPhoto:
        return await this.sendPhoto(ctx);
    }
  }

  private async menu(ctx: ContextAny) {
    await this.contextService.reply({
      text: "Main menu",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "ping",
              callback_data: this.payloadService.encode(actionsTree.main.ping, {
                value: 1,
              }),
            },
          ],
          [
            {
              text: "send photo",
              callback_data: this.payloadService.encode(
                actionsTree.main.sendPhoto,
              ),
            },
          ],
        ],
      },
    });
  }

  private async ping(
    ctx: Context<{ action: typeof actionsTree.main.ping }>,
  ): Promise<UpdateResult> {
    const { value } = ctx.payload;
    await this.contextService.showAlert(`pong: ${value}`);

    await this.contextService.reply({
      text: "Main menu",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "ping",
              callback_data: this.payloadService.encode(actionsTree.main.ping, {
                value: value + 1,
              }),
            },
          ],
        ],
      },
    });
  }

  private async sendPhoto(ctx: ContextAny) {
    const { user } = ctx;

    const url = "https://picsum.photos/200/300";
    await this.apiService.methods.sendPhoto({
      caption: "photo",
      chat_id: user.telegramId,
      photo: url,
    });

    /*
    const sendFile: SendFile = {
      stream: fs.createReadStream("images/photo.jpg"),
      filename: "photo.jpg",
      contentType: "image/jpeg",
    };

    await this.apiService.sendDocument({
      caption: "photo",
      chat_id: user.telegramId,
      document: sendFile,
    });
     */
  }
}
