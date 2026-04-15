import { createApp } from "./api/server.js";

const PORT = Number(process.env.PORT) || 3000;
const app = createApp();

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
