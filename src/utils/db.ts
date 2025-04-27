import { Db, User } from "@abdulgalimov/tg-framework";
import { User as TgUser } from "@grammyjs/types/manage";

export class DbExample implements Db {
  public async createOrUpdate(from: TgUser): Promise<User> {
    return {
      telegramId: from.id,
      langCode: from.language_code || "en",
    };
  }
}
