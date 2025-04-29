import { LogService } from "@abdulgalimov/tg-framework";
import * as console from "node:console";

export class LoggerExample implements LogService {
  public name: string = "";

  private log(level: string, ...args: unknown[]) {
    console.log(`[${this.name}]`, level, ...args);
  }

  public debug(...args: unknown[]) {
    this.log("DEBUG", ...args);
  }

  public info(...args: unknown[]) {
    this.log("INFO", ...args);
  }

  public warn(...args: unknown[]) {
    this.log("WARN", ...args);
  }

  public error(...args: unknown[]) {
    this.log("ERROR", ...args);
  }
}
