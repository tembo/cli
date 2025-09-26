import { Command } from "commander";
// @ts-ignore
import { sseToStdio } from "supergateway/dist/gateways/sseToStdio.js";
import getAuthToken from "../auth";
import { TemboClient } from "../client";

const create = new Command();

create
  .name("create")
  .description("Create a new task")
  .option("--repository <repository>", "The repository to create the task in")
  .argument("<taskDetails>", "The details of the task");

create.action((taskDetails) => {
  const client = TemboClient.fromEnv();
  console.log(taskDetails);
});

export default create;
