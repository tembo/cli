import { Command } from "commander";
import { TemboClient } from "../client";
import { config } from "../config";

const create = new Command();

create
  .name("create")
  .description("Create a new task")
  .option("-r, --repositories <repositories...>", "Repository URLs to create the task for")
  .option("-b, --branch <branch>", "Branch to target for this task")
  .option("-a, --agent <agent>", "Agent to use for this task")
  .option("--no-queue", "Don't queue the task immediately")
  .argument("<prompt>", "The task prompt/description");

create.action(async (prompt, options) => {
  const client = TemboClient.fromEnv();

  const response = await client.sdk.task.create({
    prompt,
    repositories: options.repositories,
    branch: options.branch,
    agent: options.agent,
    queueRightAway: options.queue !== false,
  });

  if (config.get("json")) {
    console.log(JSON.stringify(response, null, 2));
  } else {
    console.log("\nTask created successfully!");
    console.log(`  ID: ${response.id}`);
    console.log(`  Title: ${response.title}`);
    console.log(`  Status: ${response.status}`);
    console.log(`  Description: ${response.description}`);
  }
});

export default create;
