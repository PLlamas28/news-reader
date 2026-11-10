// Reads and validates environment variables. Server-only: never import this from client code.
// Called lazily (not at module load) so `next build` doesn't fail when the key is absent.

export function getConfig() {
  const apiKey = process.env.GUARDIAN_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GUARDIAN_API_KEY is not set. Add it to .env.local (or set USE_MOCK_DATA=true to use mock data)."
    );
  }
  return {
    apiKey,
    baseUrl: "https://content.guardianapis.com",
  };
}

export const useMockData = () => process.env.USE_MOCK_DATA === "TRUE";
