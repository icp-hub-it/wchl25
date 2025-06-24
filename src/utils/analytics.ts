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

const pushEvent = (eventName: string, parameters: Record<string, unknown>) => {
  if (typeof window === "undefined") {
    return;
  }

  if (window.umami) {
    try {
      window.umami.track(eventName, parameters);
    } catch (e) {
      console.error(`failed to track ${eventName}: ${e}`);
    }
  }
};

export const pushFaqClick = () => {
  pushEvent("faq_click", {
    page: window.location.pathname,
    referrer: document.referrer,
  });
};

export const pushJoinLeagueTopbar = () => {
  pushEvent("join_league_topbar", {
    page: window.location.pathname,
    referrer: document.referrer,
  });
};

export const pushJoinLeagueCountdown = () => {
  pushEvent("join_league_countdown", {
    page: window.location.pathname,
    referrer: document.referrer,
  });
};

export const pushViewMoreMentors = (page: number) => {
  pushEvent("view_more_mentors", {
    page: window.location.pathname,
    referrer: document.referrer,
    pageNumber: page,
  });
};

export const pushViewMorePartners = (page: number) => {
  pushEvent("view_more_partners", {
    page: window.location.pathname,
    referrer: document.referrer,
    pageNumber: page,
  });
};

export const pushClickPartner = (partnerName: string) => {
  pushEvent("click_partner", {
    page: window.location.pathname,
    referrer: document.referrer,
    partnerName,
  });
};

export const pushExploreResources = (resource: string) => {
  pushEvent("explore_resources", {
    page: window.location.pathname,
    referrer: document.referrer,
    resource,
  });
};
