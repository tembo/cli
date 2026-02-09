# Tembo CLI

This is a CLI for accessing the Tembo API.

## MCP

The CLI also functions as our MCP connector, handling authentication and a few other things for us automatically in our sandbox.

## Configuration

### Environment Variables

- `TEMBO_API_TOKEN` - Authentication token for Tembo API
- `TEMBO_API_URL` - Base URL for Tembo API (default: `https://api.tembo.io`)
- `TEMBO_SSE_URL` - URL for MCP server (default: `https://api.tembo.io/mcp`)

## Development

We build and ship this project internally using Nix, you can build it with:

```
nix build .#
```
