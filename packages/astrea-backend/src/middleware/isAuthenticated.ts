import type {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../utils/env';

export interface AuthRequest extends Request {
    user?: { id: string };
}

export const isAuthenticated = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        res.status(401).json({message: 'Unauthorized'});
        return
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({message: 'Unauthorized'});
        return
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET) as unknown as jwt.JwtPayload & { id: string };

        if (!payload.id) {
            res.status(403).json({message: 'Token payload is invalid'});
            return
        }

        req.user = {id: payload.id};
        next();
    } catch (err) {
        res.status(403).json({message: 'Invalid token'});
    }
};
