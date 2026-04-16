import cors from "cors";
import express from "express";

import matchRoutes from "./routes/matchRoutes.js";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Server is running");
  });

  app.use("/api/match", matchRoutes);

  return app;
}
