# my-help-node-server

Minimal [Express](https://expressjs.com/) REST API for the my-help project. CORS is enabled so a separate frontend (e.g. on another port or domain) can call this API from the browser.

## Requirements

- [Node.js](https://nodejs.org/) 18 or newer

## Setup

```bash
npm install
```

## Run

- **Development** (auto-restart on file changes):

  ```bash
  npm run dev
  ```

- **Production-style** (no file watcher):

  ```bash
  npm start
  ```

- **Kill the process using the API port** (default `3000`):

  ```bash
  npm run kill
  ```

By default the server listens on port **3000**. Override with the `PORT` environment variable.

## API

| Method | Path      | Description        |
| ------ | --------- | ------------------ |
| GET    | `/health` | Liveness check JSON |

Example:

```bash
curl http://localhost:3000/health
```

Response: `{"ok":true}`

## Project layout

```text
index.js           # Entry: starts HTTP server
api/
  server.js        # Express app (CORS, JSON parser, routes)
  routes/          # Route modules (add as you grow)
  models/          # Data models
  middleware/      # Custom middleware
```

## Git

This repository was initialized with `git init`. Track only source and config files; `node_modules` and local env files are ignored (see `.gitignore`).
