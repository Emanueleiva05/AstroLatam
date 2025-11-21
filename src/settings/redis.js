import { createClient } from "redis";
import env from "dotenv";

env.config();

const clientRedis =
  process.env.NODE_ENV === "test"
    ? {
        connect: async () => {},
        get: async (key) => null,
        set: async (key, value) => {},
        del: async (key) => {},
      }
    : createClient({
        socket: {
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
        },
      });

export default clientRedis;
