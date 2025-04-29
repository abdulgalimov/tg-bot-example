import "reflect-metadata";

import { TgFactory } from "@abdulgalimov/tg-framework";
import { actionsTree } from "./actions";
import dotenv from "dotenv";

import { LocaleExample, LoggerExample, StorageExample } from "./utils";
import { Bot } from "./bot";

dotenv.config();

export async function main(): Promise<void> {
  const tg = TgFactory.create(
    {
      config: {
        apiUrl: "https://api.telegram.org",
        token: process.env.TELEGRAM_API_TOKEN!,
      },
      actionsTree,
    },
    {
      entryService: Bot,
      logService: LoggerExample,
      storageService: StorageExample,
      localeService: LocaleExample,
    },
  );

  await tg.init();
}

main().catch(console.error);
