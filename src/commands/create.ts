import { Command } from "commander";

const create = new Command();

create.name("create");
create.description("Create a new project");
create.action(() => {
  console.log("Creating a new project");
});

create.argument("<name>", "The name of the project");

export default create;
