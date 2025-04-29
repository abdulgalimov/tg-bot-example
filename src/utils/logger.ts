import { LogService } from "@abdulgalimov/tg-framework";
import * as console from "node:console";

export class LoggerExample implements LogService {
  public name: string = "";

  public debug(...args: unknown[]) {
    console.log(this.name, ...args);
  }

  public info(...args: unknown[]) {
    console.info(this.name, ...args);
  }

  public warn(...args: unknown[]) {
    console.warn(this.name, ...args);
  }

  public error(...args: unknown[]) {
    console.error(this.name, ...args);
  }
}
