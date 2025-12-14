import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

let ratelimit;

try {
  ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "10 s"),
    analytics: true,
  });
} catch (error) {
  console.error("Upstash init failed:", error.message);
}

export default ratelimit;
