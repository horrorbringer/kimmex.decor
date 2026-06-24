type ErrorContext = {
  component?: string;
  action?: string;
  severity?: "low" | "medium" | "high" | "critical";
  extra?: Record<string, unknown>;
};

let errorHandler: ((message: string, context?: ErrorContext) => void) | null = null;

export function setErrorHandler(handler: (message: string, context?: ErrorContext) => void) {
  errorHandler = handler;
}

export function reportError(error: unknown, context?: ErrorContext) {
  const message = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack : undefined;

  const enrichedContext = {
    ...context,
    timestamp: new Date().toISOString(),
    url: typeof window !== "undefined" ? window.location.href : undefined,
    userAgent: typeof window !== "undefined" ? navigator.userAgent : undefined,
  };

  if (errorHandler) {
    errorHandler(message, enrichedContext);
    return;
  }

  if (process.env.NODE_ENV === "development") {
    console.error(`[Error] ${message}`, enrichedContext, stack);
  }
}

export function initErrorTracking() {
  if (typeof window === "undefined") return;

  window.addEventListener("error", (event) => {
    reportError(event.error, { component: "window.error", severity: "high" });
  });

  window.addEventListener("unhandledrejection", (event) => {
    reportError(event.reason, { component: "unhandledrejection", severity: "high" });
  });
}
