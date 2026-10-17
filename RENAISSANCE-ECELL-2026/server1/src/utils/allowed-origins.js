import { env } from "../config/env.js";

const LOCAL_ORIGIN_REGEX = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/i;
const VERCEL_ORIGIN_REGEX = /^https:\/\/([a-zA-Z0-9-]+\.)*vercel\.app$/i;
const MNNIT_ORIGIN_REGEX = /^https?:\/\/([a-zA-Z0-9-]+\.)*mnnit\.ac\.in(:\d+)?$/i;

export function isAllowedOrigin(origin) {
  // Non-browser requests or same-origin requests without an Origin header
  if (!origin) return true;

  const cleanOrigin = origin.trim().replace(/\/+$/, "");

  // Explicitly configured origins in CLIENT_ORIGIN
  if (env.CLIENT_ORIGINS.includes(cleanOrigin) || env.CLIENT_ORIGINS.includes(origin)) {
    return true;
  }

  // Localhost development on any port
  if (LOCAL_ORIGIN_REGEX.test(cleanOrigin)) {
    return true;
  }

  // Any Vercel deployment (e.g. iic-website-eight.vercel.app, preview URLs, etc.)
  if (VERCEL_ORIGIN_REGEX.test(cleanOrigin)) {
    return true;
  }

  // MNNIT official domains and internal IP
  if (MNNIT_ORIGIN_REGEX.test(cleanOrigin) || cleanOrigin.startsWith("http://210.212.49.57")) {
    return true;
  }

  return false;
}
