export const DEFAULT_ORIGIN_URL = "/api/proxy";
export const UPLOAD_PATH = "/upload";

/**
 * These just protect us from stupid mistakes
 */
if (DEFAULT_ORIGIN_URL.endsWith("/"))
  throw new Error(`DEFAULT_ORIGIN_URL should not end with a '/'`);
if (!UPLOAD_PATH.startsWith("/"))
  throw new Error("UPLOAD_PATH should start with a '/'");
