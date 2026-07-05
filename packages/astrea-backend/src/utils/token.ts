import type { Response } from "express";
import { generateAccessToken, generateRefreshToken } from "./jwt";

export interface TokenPayload {
  id: string;
  username: string;
}

const hasConfiguredFrontendOrigin = Boolean(
  process.env.FRONTEND_ORIGIN || process.env.FRONTEND_ORIGINS,
);

export const refreshCookieOptions = {
  httpOnly: true,
  secure: hasConfiguredFrontendOrigin,
  sameSite: hasConfiguredFrontendOrigin
    ? ("none" as const)
    : ("strict" as const),
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const sendTokens = (res: Response, payload: TokenPayload): string => {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  res.cookie("refreshToken", refreshToken, refreshCookieOptions);

  return accessToken;
};
