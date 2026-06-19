import type { Plugin } from "@opencode-ai/plugin";

export const StrictTimeoutPlugin: Plugin = async ({ client }) => {
  let activeSessionId: string | null = null;

  return {
    event: async ({ event }) => {
      const sid =
        (event as any).properties?.sessionID || (event as any).sessionID;
      if (sid) {
        activeSessionId = sid;
      }

      const payload = JSON.stringify(event).toLowerCase();

      if (payload.includes("upstream idle timeout exceeded")) {
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
