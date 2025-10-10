import { Command } from "commander";
import { TemboClient } from "../client";
import { config } from "../config";

const tasks = new Command().name("tasks");

tasks
  .command("list")
  .description("List all tasks")
  .option("-p, --page <page>", "Page number (starts from 1)", "1")
  .option("-l, --limit <limit>", "Number of items per page (max 100)", "10")
  .action(async (options) => {
    const client = TemboClient.fromEnv();
    const response = await client.sdk.task.list({
      page: parseInt(options.page),
      limit: parseInt(options.limit),
    });

    if (config.get("json")) {
      console.log(JSON.stringify(response, null, 2));
    } else {
      console.log("\nTasks:");
      response.issues.forEach((task) => {
        console.log(`\n  ID: ${task.id}`);
        console.log(`  Title: ${task.title}`);
        console.log(`  Status: ${task.status}`);
        console.log(`  Description: ${task.description}`);
        console.log(`  Created: ${new Date(task.createdAt).toLocaleString()}`);
      });
      console.log(`\nPage ${response.meta.currentPage} of ${response.meta.totalPages} (${response.meta.totalCount} total)`);
    }
  });

tasks
  .command("search")
  .description("Search tasks")
  .argument("<query>", "Search query to find tasks by title or description")
  .option("-p, --page <page>", "Page number (starts from 1)", "1")
  .option("-l, --limit <limit>", "Number of items per page (max 100)", "10")
  .action(async (query, options) => {
    const client = TemboClient.fromEnv();
    const response = await client.sdk.task.search({
      q: query,
      page: parseInt(options.page),
      limit: parseInt(options.limit),
    });

    if (config.get("json")) {
      console.log(JSON.stringify(response, null, 2));
    } else {
      console.log(`\nSearch results for "${query}":`);
      if (response.issues.length === 0) {
        console.log("  No tasks found");
      } else {
        response.issues.forEach((task) => {
          console.log(`\n  ID: ${task.id}`);
          console.log(`  Title: ${task.title}`);
          console.log(`  Status: ${task.status}`);
          console.log(`  Description: ${task.description}`);
          console.log(`  Created: ${new Date(task.createdAt).toLocaleString()}`);
        });
        console.log(`\nPage ${response.meta.currentPage} of ${response.meta.totalPages} (${response.meta.totalCount} total)`);
      }
    }
  });

export default tasks;
