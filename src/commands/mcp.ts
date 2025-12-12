import { Command } from "commander";
// @ts-ignore
import { streamableHttpToStdio } from "supergateway/dist/gateways/streamableHttpToStdio.js";
import getAuthToken from "../auth";
import { getTemboEnvVars } from "../env";

const mcp = new Command();

mcp.name("mcp");
mcp
  .description("Run the MCP server")
  .option(
    "--sse-url <url>",
    "The URL of the MCP server",
    process.env.TEMBO_SSE_URL || "https://api.tembo.io/mcp"
  );

mcp.action(async (options) => {
  const authToken = getAuthToken();
  const temboEnvVars = getTemboEnvVars();

  // Convert temboEnvVars to headers, X-Tembo-<key>: <value>
  const temboHeaders: Record<string, string> = {};
  for (const [key, value] of Object.entries(temboEnvVars)) {
    if (value !== undefined) {
      temboHeaders[`X-Tembo-${key}`] = value;
    }
  }

  // Add workflow ID header if present (for automation context)
  const workflowId = process.env.TEMBO_WORKFLOW_ID;
  if (workflowId) {
    temboHeaders["X-Tembo-Workflow-Id"] = workflowId;
  }

  streamableHttpToStdio({
    streamableHttpUrl: options.sseUrl,
    logger: console,
    headers: {
      Authorization: `Bearer ${authToken}`,
      ...temboHeaders,
    },
  });
});

export default mcp;
