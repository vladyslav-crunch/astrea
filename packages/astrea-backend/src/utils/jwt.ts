import jwt from 'jsonwebtoken';
import {JWT_SECRET, JWT_REFRESH_SECRET} from "./env.ts";

export const generateAccessToken = (payload: object) =>
    jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });

export const generateRefreshToken = (payload: object) =>
    jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
