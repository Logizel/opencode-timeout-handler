# opencode-timeout-handler

An auto-continue plugin for [OpenCode](https://github.com/anomalyco/opencode).

When using free-tier LLMs (like Nemotron 3 Ultra Free and other heavy models), API providers will frequently drop the connection during heavy file edits, throwing an error.

Unlike other auto-resume plugins that blindly spam the `continue` command on every single broken tool call-trapping you in a hallucination loop-this plugin is hyper-targeted. It globally tracks your active session ID and **only** intervenes when a genuine network timeout occurs, running completely silently in the background.

## Features

- **Strict Error Targeting:** Ignores standard `interrupted` tool failures to prevent infinite hallucination loops.
- **Global Session Tracking:** Successfully routes the continue command even if the timeout event drops the session ID payload.
- Multiple Error Handling: Handles multiple errors from the provider side.

## Errors Handled

- "upstream idle timeout exceeded"
- "streaming response failed"
- "provider returned error"
- "upstream error from nvidia: enginecore encountered an issue. see stack trace (above) for the root cause."
- "Error from provider (Console): Upstream request failed"

## Installation

Add the local path (or npm package name) directly to your `opencode.jsonc` file:

```jsonc
  "plugin": [
    "opencode-timeout-handler"
  ]
```
