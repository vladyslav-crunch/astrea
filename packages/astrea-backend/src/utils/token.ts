import type {Response} from 'express';
import {generateAccessToken, generateRefreshToken} from './jwt';

export interface TokenPayload {
    id: string;
    username: string;
}

export const sendTokens = (res: Response, payload: TokenPayload): string => {
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return accessToken;
};
