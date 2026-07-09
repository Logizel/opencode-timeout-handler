// index.ts
var StrictTimeoutPlugin = async ({ client }) => {
  let activeSessionId = null;
  const errorTriggers = [
    "upstream idle timeout exceeded",
    "streaming response failed",
    "provider returned error",
    "upstream error from nvidia: enginecore encountered an issue. see stack trace (above) for the root cause."
  ];
  return {
    event: async ({ event }) => {
      const sid = event.properties?.sessionID || event.sessionID;
      if (sid) {
        activeSessionId = sid;
      }
      const payload = JSON.stringify(event).toLowerCase();
      const isTargetError = errorTriggers.some((trigger) => payload.includes(trigger));
      if (isTargetError) {
        if (activeSessionId) {
          try {
            await client.session.prompt({
              path: { id: activeSessionId },
              body: { parts: [{ type: "text", text: "continue" }] }
            });
          } catch {}
        }
      }
    }
  };
};
export {
  StrictTimeoutPlugin
};
