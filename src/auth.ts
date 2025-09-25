export default function getAuthToken() {
  if (process.env.TEMBO_API_TOKEN) {
    return process.env.TEMBO_API_TOKEN;
  } else {
    throw new Error("TEMBO_API_TOKEN is not set");
  }
}
