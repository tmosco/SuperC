import { query } from "./_generated/server";

export const getHomepageData = query({
  args: {},
  handler: async () => {
    return {
      heading: "Convex-backed homepage",
      message: "Hello from Convex!",
      generatedAt: new Date().toISOString(),
    };
  },
});
