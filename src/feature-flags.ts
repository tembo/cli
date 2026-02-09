import { PostHog } from "posthog-node";

let posthogClient: PostHog | null = null;

/**
 * Initialize PostHog client with API key and host
 */
export function initializePostHog(apiKey: string, host?: string) {
  if (!apiKey) {
    console.warn("PostHog API key not provided. Feature flags will be disabled.");
    return;
  }

  posthogClient = new PostHog(apiKey, {
    host: host || "https://app.posthog.com",
  });
}

/**
 * Check if a feature flag is enabled for a given user
 * @param flagKey The feature flag key to check
 * @param distinctId The user's distinct ID (e.g., email or user ID)
 * @param defaultValue Default value if PostHog is not initialized or flag doesn't exist
 * @returns Promise<boolean> indicating if the flag is enabled
 */
export async function isFeatureFlagEnabled(
  flagKey: string,
  distinctId: string,
  defaultValue: boolean = false
): Promise<boolean> {
  if (!posthogClient) {
    console.warn("PostHog client not initialized. Returning default value.");
    return defaultValue;
  }

  try {
    const isEnabled = await posthogClient.isFeatureEnabled(flagKey, distinctId);
    return isEnabled ?? defaultValue;
  } catch (error) {
    console.error(`Error checking feature flag "${flagKey}":`, error);
    return defaultValue;
  }
}

/**
 * Shutdown PostHog client gracefully
 */
export async function shutdownPostHog() {
  if (posthogClient) {
    await posthogClient.shutdown();
  }
}
