import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export const generateAccessToken = (payload: object) =>
    jwt.sign(payload, ACCESS_SECRET, { expiresIn: '15m' });

export const generateRefreshToken = (payload: object) =>
    jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
