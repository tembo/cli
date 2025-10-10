#!/usr/bin/env node
import { Command } from "commander";
import mcp from "./commands/mcp";
import repositories from "./commands/repositories";
import create from "./commands/create";
import tasks from "./commands/tasks";
import me from "./commands/me";
import { config } from "./config";

const cli = new Command()
  .name("tembo")
  .description("Tembo CLI - Manage your Tembo tasks and repositories")
  .version("1.0.0")
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
cli.addCommand(tasks);
cli.addCommand(create);
cli.addCommand(me);

cli.parse(process.argv);
