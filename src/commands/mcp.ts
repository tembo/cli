import { Command } from "commander";
// @ts-ignore
import { streamableHttpToStdio } from "supergateway/dist/gateways/streamableHttpToStdio.js";
import getAuthToken from "../auth";

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

  streamableHttpToStdio({
    streamableHttpUrl: options.sseUrl,
    logger: console,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
});

export default mcp;
