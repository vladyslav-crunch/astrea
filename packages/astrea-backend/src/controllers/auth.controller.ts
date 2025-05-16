import type {Request, Response} from 'express';
import * as AuthService from '../services/auth.service';
import {signInSchema, signUpSchema} from 'astrea-shared';

export const createUser = async (req: Request, res: Response) => {
    const parsed = signUpSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({message: 'Invalid input', errors: parsed.error.flatten()});
        return
    }
    try {
        const {
            user,
            accessToken
        } = await AuthService.register(parsed.data.username, parsed.data.email, parsed.data.password, res);
        res.status(201).json({message: 'User created', user, accessToken});
    } catch (err: any) {
        res.status(400).json({message: err.message});
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const parsed = signInSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({message: 'Invalid input', errors: parsed.error.flatten()})
        return
    }
    try {
        const {user, accessToken} = await AuthService.login(parsed.data.email, parsed.data.password, res);
        res.status(200).json({message: 'Login successful', user, accessToken});
    } catch (err: any) {
        res.status(401).json({message: err.message});
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;
    if (!token) {
        res.sendStatus(401)
        return
    }
    try {
        const {user, accessToken} = await AuthService.refresh(token, res);
        res.status(200).json({accessToken, user});
    } catch (err: any) {
        res.status(403).json({message: err.message});
    }
};

export const logout = (_req: Request, res: Response) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
    });
    res.status(200).json({message: "Logged out"});
};
