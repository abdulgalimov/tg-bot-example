import { KeyValueStorage } from "@abdulgalimov/tg-framework";

export class StorageExample implements KeyValueStorage {
  private readonly data: Record<string, unknown> = {};

  public async setValue(key: string, value: any): Promise<void> {
    this.data[key] = value;
  }
  public async getValue<R = unknown>(key: string): Promise<R | null> {
    return this.data[key] as R || null;
  }
  public async del(key: string): Promise<void> {
    delete this.data[key];
  }
}
