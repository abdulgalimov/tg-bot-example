import { Db, User } from "@abdulgalimov/tg-framework";
import { User as TgUser } from "@grammyjs/types/manage";

export class DbExample implements Db {
  public async createOrUpdate(from: TgUser): Promise<User> {
    return {
      id: 1,
      telegramId: from.id,
      langCode: 'ru'
    };
  }
}
