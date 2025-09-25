import { Command } from "commander";
import create from "./commands/create";
import mcp from "./commands/mcp";

const cli = new Command();

cli.addCommand(create);
cli.addCommand(mcp);

cli.parse(process.argv);
