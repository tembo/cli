import { Command } from "commander";
import { TemboClient } from "../client";
import { config } from "../config";

const repositories = new Command().name("repos");

repositories
  .command("list")
  .description("List all repositories")
  .action(async () => {
    const client = TemboClient.fromEnv();
    const response = await client.sdk.repository.list();

    if (config.get("json")) {
      console.log(JSON.stringify(response.codeRepositories, null, 2));
    } else {
      console.log("\nRepositories:");
      response.codeRepositories.forEach((repo) => {
        console.log(`\n  Name: ${repo.name}`);
        console.log(`  ID: ${repo.id}`);
        if (repo.url) console.log(`  URL: ${repo.url}`);
        if (repo.description) console.log(`  Description: ${repo.description}`);
        if (repo.branch) console.log(`  Branch: ${repo.branch}`);
      });
    }
  });

export default repositories;
