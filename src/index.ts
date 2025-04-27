import { Bot } from "./bot";

export async function main(): Promise<void> {
  const bot = new Bot();

  await bot.init();
}

main().catch(console.error);
