# Tembo CLI

This is a CLI for accessing the Tembo API.

## MCP

The CLI also functions as our MCP connector, handling authentication and a few other things for us automatically in our sandbox.

## Configuration

### Environment Variables

- `TEMBO_API_TOKEN` - Authentication token for Tembo API
- `TEMBO_API_URL` - Base URL for Tembo API (default: `https://api.tembo.io`)
- `TEMBO_SSE_URL` - URL for MCP server (default: `https://api.tembo.io/mcp`)
- `POSTHOG_API_KEY` - PostHog API key for feature flags
- `POSTHOG_HOST` - PostHog host URL (default: `https://app.posthog.com`)

### Feature Flags

This CLI uses PostHog for feature flags. The following flags are supported:

- `is-internal` - Gates access to internal-only features like the Kimi model

## Development

We build and ship this project internally using Nix, you can build it with:

```
nix build .#
```
