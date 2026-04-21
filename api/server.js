import cors from "cors";
import express from "express";

import createHelpRouter from "./routes/helpRoutes.js";

export function createApp(options = {}) {
  const { db } = options;
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Server is running");
  });

  app.use("/api/help", createHelpRouter(db));

  return app;
}
