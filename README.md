# opencode-timeout-handler

An auto-continue plugin for [OpenCode](https://github.com/anomalyco/opencode).

When using free-tier or "limitless" LLMs (like Nemotron 3 Ultra Free and other heavy models), API providers will frequently drop the connection during heavy file edits, throwing an `upstream idle timeout exceeded` error.

Unlike other auto-resume plugins that blindly spam the `continue` command on every single broken tool call-trapping you in a hallucination loop-this plugin is hyper-targeted. It globally tracks your active session ID and **only** intervenes when a genuine network timeout occurs, running completely silently in the background.

## Features

- **Zero-Log Execution:** Keeps your terminal output completely clean.
- **Strict Error Targeting:** Ignores standard `interrupted` tool failures to prevent infinite hallucination loops.
- **Global Session Tracking:** Successfully routes the continue command even if the timeout event drops the session ID payload.

## Installation

Add the local path (or npm package name) directly to your `opencode.jsonc` file:

```jsonc
  "plugin": [
    "opencode-timeout-handler"
  ]
```
