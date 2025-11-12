import { createClient } from "redis";

const clientRedis = createClient({
  host: "localhost",
  port: 6379,
});

export default clientRedis;
