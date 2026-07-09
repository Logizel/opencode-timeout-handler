import type { Plugin } from "@opencode-ai/plugin";

export const StrictTimeoutPlugin: Plugin = async ({ client }) => {
  let activeSessionId: string | null = null;

  const errorTriggers = [
    "upstream idle timeout exceeded",
    "streaming response failed",
    "provider returned error",
    "upstream error from nvidia: enginecore encountered an issue. see stack trace (above) for the root cause.",
  ];

  return {
    event: async ({ event }) => {
      const sid =
        (event as any).properties?.sessionID || (event as any).sessionID;
      if (sid) {
        activeSessionId = sid;
      }

      const payload = JSON.stringify(event).toLowerCase();

      const isTargetError = errorTriggers.some((trigger) =>
        payload.includes(trigger),
      );

      if (isTargetError) {
        if (activeSessionId) {
          try {
            await client.session.prompt({
              path: { id: activeSessionId },
              body: { parts: [{ type: "text", text: "continue" }] },
            });
          } catch {}
        }
      }
    },
  };
};
