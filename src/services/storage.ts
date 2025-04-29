import { StorageServiceExternal, User } from "@abdulgalimov/tg-framework";
import { User as TgUser } from "@grammyjs/types/manage";

export class StorageExample implements StorageServiceExternal {
  private readonly data: Record<string, unknown> = {};

  public async setValue(key: string, value: any): Promise<void> {
    // set value on redis
    this.data[key] = value;
  }
  public async getValue<R = unknown>(key: string): Promise<R | null> {
    // get value from redis
    return (this.data[key] as R) || null;
  }
  public async delValue(key: string): Promise<void> {
    // delete value from redis
    delete this.data[key];
  }

  public async createUser(from: TgUser): Promise<User> {
    // create user on pg-database
    return {
      telegramId: from.id,
      langCode: from.language_code || "en",
    };
  }
}
