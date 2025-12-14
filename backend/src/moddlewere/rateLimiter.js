import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // Use IP-based key (real rate limiting)
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress ||
      "unknown-ip";

    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later." });
    }

    next();
  } catch (error) {
    // FAIL SAFE: log error but allow request
    console.error("Rate limiter failed (allowed request):", error.message);
    next();
  }
};

export default rateLimiter;
