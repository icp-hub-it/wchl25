declare global {
  interface Window {
    umami?: {
      track: (eventName: string, parameters?: Record<string, unknown>) => void;
    };
  }
}

export {};
