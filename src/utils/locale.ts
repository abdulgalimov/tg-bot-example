import { LocaleServiceExternal, TextIcons } from "@abdulgalimov/tg-framework";

export class LocaleExample implements LocaleServiceExternal {
  public readonly textIcons: TextIcons = {};

  public text(
    languageCode: string,
    textCode: string,
    args?: Record<string, unknown>,
  ): string {
    return `${languageCode}: ${textCode}`;
  }
}
