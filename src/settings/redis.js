import { createClient } from "redis";
import env from "dotenv";

env.config();

const clientRedis = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

export default clientRedis;
