import "utils/loadEnv";
import { createServer } from "http";
import app from "./restApi";
import { commonExample } from "utils/utils";

commonExample();

const server = createServer();

server.on("request", app);

server.listen(9501, () => {
  console.log(`API v1 (re)started`);
});