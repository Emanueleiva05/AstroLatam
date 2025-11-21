import { createClient } from "redis";
import env from "dotenv";

env.config();

const clientRedis = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

export default clientRedis;
