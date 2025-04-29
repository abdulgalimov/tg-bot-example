import {
  getContext,
  Inject,
  Injectable,
  Update,
  UpdateResult,
} from "@abdulgalimov/tg-framework";
import { actionsTree } from "./actions";
import { CoreHandler, MainHandler } from "./handlers";

@Injectable()
export class Bot {
  @Inject(CoreHandler)
  private coreHandler!: CoreHandler;

  @Inject(MainHandler)
  private mainHandler!: MainHandler;

  public constructor() {}

  @Update()
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
