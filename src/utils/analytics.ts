import { initOrbiter } from "@junobuild/analytics";

export const initAnalytics = () => {
  if (import.meta.env.MODE === "development") {
    return;
  }

  initOrbiter({
    options: {
      userAgentParser: true,
      performance: true,
    },
  });
};
