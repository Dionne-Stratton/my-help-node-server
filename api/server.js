import cors from "cors";
import express from "express";

/**
 * Creates and configures the Express application (CORS + JSON body parsing).
 * Mount routes here or under `api/routes` as the API grows.
 */
export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/health", (req, res) => {
    res.json({ ok: true });
  });

  return app;
}
