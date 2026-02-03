import { type StringValue } from "ms";
import ms from "ms";

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`Environment variable: ${key} is missing`);
  }
  return value;
};

export const MONGO_URI = getEnv("MONGO_URI");
export const PORT = getEnv("PORT");
export const JWT_SECRET = getEnv("JWT_SECRET");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");

export const JWT_EXPIRES = getEnv("JWT_ACCESS_TOKEN_EXPIRES_IN") as StringValue;

// Convert JWT_EXPIRES (e.g., "120m", "1h") to seconds
export const expiresInSeconds = Math.floor(ms(JWT_EXPIRES) / 1000);
