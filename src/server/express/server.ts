import "utils/loadEnv";
import { createServer } from "http";
import app from "./restApi";
import { commonExample } from "utils/utils";

commonExample();

const server = createServer();

server.on("request", app);
server.listen(process.env.SERVER_PORT, () => {
  console.log(`API v1 (re)started`);
});