import Tembo from "@tembo-io/sdk";
import getAuthToken from "./auth";
import { config } from "./config";

export class TemboClient {
  private client: Tembo;

  static fromEnv() {
    return new TemboClient(getAuthToken());
  }

  static fromToken(authToken: string) {
    return new TemboClient(authToken);
  }

  constructor(authToken: string) {
    this.client = new Tembo({
      apiKey: authToken,
      baseURL: process.env.TEMBO_API_URL || process.env.TEMBO_BASE_URL,
      logLevel: config.get("debug") ? "debug" : "warn",
    });
  }

  get sdk() {
    return this.client;
  }
}
