import "reflect-metadata";

import { ActionTextMw, TgFactory } from "@abdulgalimov/tg-framework";
import { actionsTree } from "./actions";
import dotenv from "dotenv";

import {
  ActionTextExt,
  LocaleExample,
  LoggerExample,
  StorageExample,
} from "./services";
import { Bot } from "./bot";

dotenv.config();

export async function main(): Promise<void> {
  const factory = new TgFactory(
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

  factory.register(ActionTextMw, ActionTextExt);

  const tg = factory.create();

  await tg.init();

  tg.startLongpoll();
}

main().catch(console.error);
