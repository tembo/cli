import { Command } from "commander";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import getAuthToken from "../auth";
import { getTemboEnvVars } from "../env";
import { TemboClient } from "../client";

const mcp = new Command();

mcp.name("mcp");
mcp.description("Run the Tembo MCP server with local tools");

mcp.action(async () => {
  const authToken = getAuthToken();
  const temboEnvVars = getTemboEnvVars();

  // Run the local MCP server with the subtask tool
  const server = new McpServer({
    name: "tembo-mcp",
    version: "1.0.0",
  });

  // Register the subtask tool
  server.tool(
    "create_subtask",
    "Create a new Tembo subtask linked to the current issue/task. This allows you to break down work into smaller tasks.",
    {
      title: z.string().describe("A short title for the subtask"),
      description: z
        .string()
        .describe(
          "A detailed description of what needs to be done in this subtask"
        ),
      repositoryIds: z
        .array(z.string())
        .optional()
        .describe(
          "Optional array of repository IDs to associate with the subtask. If not provided, inherits from parent."
        ),
      queueRightAway: z
        .boolean()
        .optional()
        .default(true)
        .describe("Whether to queue the subtask immediately for processing"),
    },
    async (args) => {
      try {
        const client = TemboClient.fromToken(authToken);

        // Get the current issue ID from the environment (set by Tembo when running in context of a task)
        const issueSourceId = temboEnvVars.TEMBO_ISSUE_SOURCE_ID;

        const response = await client.createSubtask({
          title: args.title,
          description: args.description,
          prompt: args.description,
          repositoryIds: args.repositoryIds,
          queueRightAway: args.queueRightAway ?? true,
          issueSourceId: issueSourceId,
        });

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(response, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: "text" as const,
              text: `Failed to create subtask: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // Connect using stdio transport
  const transport = new StdioServerTransport();
  await server.connect(transport);
});

export default mcp;
