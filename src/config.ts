import convict from "convict";

export const config = convict({
  debug: {
    doc: "Whether to enable debug mode",
    format: Boolean,
    default: false,
  },
  json: {
    doc: "Whether to output in JSON format",
    format: Boolean,
    default: false,
  },
  tembo: {
    apiUrl: {
      doc: "The URL of the Tembo API",
      format: String,
      default: "https://api.tembo.io",
    },
  },
  posthog: {
    apiKey: {
      doc: "PostHog API key for feature flags",
      format: String,
      default: process.env.POSTHOG_API_KEY || "",
      env: "POSTHOG_API_KEY",
    },
    host: {
      doc: "PostHog host URL",
      format: String,
      default: process.env.POSTHOG_HOST || "https://app.posthog.com",
      env: "POSTHOG_HOST",
    },
  },
});
