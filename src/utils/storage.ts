import { DataStorage, User } from "@abdulgalimov/tg-framework";
import { User as TgUser } from "@grammyjs/types/manage";

export class StorageExample implements DataStorage {
  private readonly data: Record<string, unknown> = {};

  public async setValue(key: string, value: any): Promise<void> {
    this.data[key] = value;
  }
  public async getValue<R = unknown>(key: string): Promise<R | null> {
    return (this.data[key] as R) || null;
  }
  public async delValue(key: string): Promise<void> {
    delete this.data[key];
  }

  public async createUser(from: TgUser): Promise<User> {
    return {
      telegramId: from.id,
      langCode: from.language_code || "en",
    };
  }
}
