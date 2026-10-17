import { isAllowedOrigin } from "../utils/allowed-origins.js";
import { ApiError } from "../utils/api-error.js";

export function requireTrustedOrigin(req, _res, next) {
  const origin = req.get("origin");

  if (isAllowedOrigin(origin)) {
    next();
    return;
  }

  next(new ApiError(403, "Request origin is not trusted", "UNTRUSTED_ORIGIN"));
}

