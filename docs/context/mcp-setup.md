# MCP Setup

## Goal

Expose the project context pack and implementation folders to an MCP-capable client so an agent can read the domain rules before generating Convex code.

## Recommended MCP Server

Use the Filesystem MCP server for this project.

Why this server:

- It gives the agent read access to the context pack and source tree.
- It is simple enough for an MVP workflow.
- It avoids inventing a custom memory layer before the core domain is stable.

## Project Config

This repository includes a root MCP config at `.mcp.json`.

Configured server:

- `filesystem`

Configured paths:

- `docs/context`
- `convex`
- `src`
- `PROJECT_RULES.md`
- `AGENTS.md`

## Safety Boundaries

- The context pack is intentionally exposed as read-first project context.
- Generated Convex files under `convex/_generated/` must still be treated as read-only.
- Authorization decisions must remain server-side even if an MCP-assisted agent proposes client code.
- MCP access should stay scoped to this repo instead of broad home-directory access.

## Example Client Behavior

An MCP-capable coding agent should:

1. Load `docs/context/domain.md`, `docs/context/data-model.md`, `docs/context/security.md`, and `docs/context/api-contracts.md`.
2. Read `AGENTS.md` and `PROJECT_RULES.md`.
3. Use those files to plan a Convex schema, queries, and mutations.
4. Validate that any generated API surface matches the invariants and permission rules.

## Validation Note

During this session, the host environment reported no active MCP resources or templates, so a live MCP fetch could not be demonstrated here. The files added in this commit are the missing project setup needed for the next run in an MCP-enabled client.
