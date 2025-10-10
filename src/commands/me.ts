import { Command } from "commander";
import { TemboClient } from "../client";
import { config } from "../config";

const me = new Command().name("me");

me
  .description("Get information about the current authenticated user")
  .action(async () => {
    const client = TemboClient.fromEnv();
    const response = await client.sdk.me.retrieve();

    if (config.get("json")) {
      console.log(JSON.stringify(response, null, 2));
    } else {
      console.log("\nAuthenticated User:");
      console.log(`  User ID: ${response.userId || "N/A"}`);
      console.log(`  Organization ID: ${response.orgId || "N/A"}`);
    }
  });

export default me;
