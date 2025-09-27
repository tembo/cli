// Get all env vars that start with TEMBO_
export function getTemboEnvVars() {
  return Object.fromEntries(
    Object.entries(process.env).filter(([key]) => key.startsWith("TEMBO_"))
  );
}
