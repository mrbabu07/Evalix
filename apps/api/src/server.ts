import { app } from "./app.js";
import { config } from "./config.js";
import { prisma } from "./lib/prisma.js";

const server = app.listen(config.API_PORT, () => console.log(`API running at http://localhost:${config.API_PORT}`));

async function shutdown() {
  server.close();
  await prisma.$disconnect();
  process.exit(0);
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
