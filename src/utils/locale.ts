import { Locale } from "@abdulgalimov/tg-framework";

export class LocaleExample implements Locale {
  public text(
    languageCode: string,
    textCode: string,
    args?: Record<string, unknown>,
  ): string {
    return `${languageCode}: ${textCode}`;
  }
}
