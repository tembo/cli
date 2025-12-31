# Tembo CLI

This is a CLI for accessing the Tembo API.

## A Poem About Tembo

```
In terminals where commands await,
A bridge emerges, small but great—
Tembo speaks to cloud and code,
Bearer tokens light the road.

Through MCP it streams with care,
Authentication handled there,
From sandbox depths to API heights,
Connecting days and linking nights.

Commander guides each argument's way,
TypeScript ensures no types astray,
With Supergateway's streaming flow,
The data moves where it must go.

Environment variables hold the keys,
Convict configures with such ease,
Repositories listed, tasks created too,
Tembo does what CLIs do.

A connector faithful, a client true,
Built with Nix for me and you,
In the realm of code it stands so tall—
Tembo CLI, uniting all.
```

## MCP

The CLI also functions as our MCP connector, handling authentication and a few other things for us automatically in our sandbox.

## Development

We build and ship this project internally using Nix, you can build it with:

```
nix build .#
```
