import {
  Context,
  getContext,
  Injectable,
  redirect,
  UpdateResult,
} from "@abdulgalimov/tg-framework";
import { actionsTree } from "../../actions";
import { BaseHandler } from "../base.handler";

@Injectable()
export class CoreHandler extends BaseHandler {
  public async update() {
    const ctx = getContext();

    switch (ctx.action) {
      case actionsTree.core.command:
        return await this.command(
          ctx as Context<{ action: typeof actionsTree.core.command }>,
        );
    }
  }

  private async command(
    ctx: Context<{ action: typeof actionsTree.core.command }>,
  ): Promise<UpdateResult> {
    const { command } = ctx.payload;
    switch (command) {
      case "/start":
        return redirect(actionsTree.main.menu);
    }
  }
}
