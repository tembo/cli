# Feature Flags

This document explains how feature flags work in the Tembo CLI.

## Overview

The Tembo CLI uses PostHog for feature flag management. Feature flags allow us to control access to features based on user properties and conditions.

## Setup

To enable feature flags, set the following environment variables:

```bash
export POSTHOG_API_KEY="your-posthog-api-key"
export POSTHOG_HOST="https://app.posthog.com"  # Optional, defaults to app.posthog.com
```

## Current Feature Flags

### `is-internal`

This flag is used to identify internal users/employees. It gates access to features that are only available internally.

**Features gated by `is-internal`:**
- **Kimi Model**: Access to the Kimi AI model (Moonshot provider)

## Usage

### Check Available Models

List all models available to the current user:

```bash
tembo models list
```

Check if a specific model is available:

```bash
tembo models check kimi
```

You can also specify a custom user ID for testing:

```bash
tembo models list --user-id "user@example.com"
tembo models check kimi --user-id "user@example.com"
```

## Implementation Details

### Adding a New Model with Feature Flag

To add a new model that requires a feature flag:

1. Edit `src/models.ts`
2. Add the model to the `MODELS` array:

```typescript
{
  id: "new-model",
  name: "New Model",
  provider: "provider-name",
  requiresFeatureFlag: "feature-flag-key",
}
```

### Adding a New Feature Flag Check

To check a feature flag in your code:

```typescript
import { isFeatureFlagEnabled } from "./feature-flags";

const hasAccess = await isFeatureFlagEnabled(
  "flag-key",
  userId,
  false // default value
);

if (hasAccess) {
  // Feature is enabled
}
```

## PostHog Configuration

In PostHog, the `is-internal` flag should be configured to return `true` for internal users. This can be based on:

- Email domain (e.g., `@tembo.io`)
- User properties
- Custom conditions

Example PostHog flag configuration:
- Flag key: `is-internal`
- Condition: User email ends with `@tembo.io`
- Return value: `true`

## Testing

To test feature flags locally without PostHog:

1. Don't set `POSTHOG_API_KEY` - the system will use default values
2. Or set up a test PostHog project for development
3. Use the `--user-id` flag to test with different user identities

## Security Notes

- Feature flag checks are done server-side
- Default to deny (return `false`) if PostHog is unavailable
- API keys should be kept secure and not committed to the repository
