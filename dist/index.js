// index.ts
var StrictTimeoutPlugin = async ({ client }) => {
  let activeSessionId = null;
  return {
    event: async ({ event }) => {
      const sid = event.properties?.sessionID || event.sessionID;
      if (sid) {
        activeSessionId = sid;
      }
      const payload = JSON.stringify(event).toLowerCase();
      if (payload.includes("upstream idle timeout exceeded")) {
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
