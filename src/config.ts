import convict from "convict";

export const config = convict({
  debug: {
    doc: "Whether to enable debug mode",
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
});
