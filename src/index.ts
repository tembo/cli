import { Command } from "commander";
import mcp from "./commands/mcp";
import repositories from "./commands/repositories";
import create from "./commands/create";
import { config } from "./config";

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

cli.parse(process.argv);
