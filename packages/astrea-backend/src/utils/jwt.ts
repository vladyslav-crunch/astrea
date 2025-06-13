import {sign} from 'jsonwebtoken';
import {
    JWT_SECRET,
    JWT_REFRESH_SECRET,
    JWT_EXPIRES,
} from './env.ts';

export const generateAccessToken = (payload: object) =>
    sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES
    });

export const generateRefreshToken = (payload: object) =>
    sign(payload, JWT_REFRESH_SECRET, {expiresIn: '7d'});
