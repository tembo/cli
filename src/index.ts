import { Command } from "commander";
import mcp from "./commands/mcp";
import repositories from "./commands/repositories";
import create from "./commands/create";
import models from "./commands/models";
import { config } from "./config";
import { initializePostHog, shutdownPostHog } from "./feature-flags";

// Initialize PostHog with configuration
const posthogApiKey = config.get("posthog.apiKey");
const posthogHost = config.get("posthog.host");

if (posthogApiKey) {
  initializePostHog(posthogApiKey, posthogHost);
}

const cli = new Command()
  .option("--debug", "Enable debug mode")
  .option("--json", "Output in JSON format");

const options = cli.optsWithGlobals();

if (options.debug) {
  config.set("debug", true);
}

if (options.json) {
  config.set("json", true);
}

cli.addCommand(mcp);
cli.addCommand(repositories);
cli.addCommand(create);
cli.addCommand(models);

cli.parse(process.argv);

// Gracefully shutdown PostHog on exit
process.on("exit", () => {
  shutdownPostHog().catch((error) => {
    console.error("Error shutting down PostHog:", error);
  });
});
