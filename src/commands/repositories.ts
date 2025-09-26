import { Command } from "commander";
import { TemboClient } from "../client";

const repositories = new Command().name("repos");

repositories
  .command("list")
  .description("List all repositories")
  .action(async () => {
    const client = TemboClient.fromEnv();
    const repositories = await client.getRepositories();

    console.log(JSON.stringify(repositories, null, 2));
  });

export default repositories;
