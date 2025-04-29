import { ActionTextMw } from "@abdulgalimov/tg-framework";

export class ActionTextExt extends ActionTextMw {
  public override async execute(): Promise<void> {
    await super.execute();
  }
}
