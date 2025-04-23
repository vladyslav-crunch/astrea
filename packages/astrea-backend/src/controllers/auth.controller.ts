import type {Request, Response} from 'express';
import User from '../models/user.model.ts';
import {generateAccessToken, generateRefreshToken} from "../utils/jwt";
import jwt from "jsonwebtoken";
import {signInSchema, signUpSchema} from 'astrea-shared';

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const parseResult = signUpSchema.safeParse(req.body);
    if (!parseResult.success) {
        res.status(400).json({message: 'Invalid input', errors: parseResult.error.flatten()});
        return;
    }
    const {username, password, email} = parseResult.data;
    try {
        const existing = await User.findOne({email});
        if (existing) {
            res.status(400).json({message: 'User with this email already exists'});
            return;
        }
        const user = await User.create({username, password, email});
        res.status(201).json({message: 'User created', user: {id: user._id, username: user.username}});
    } catch (err) {
        res.status(500).json({message: 'Registration failed', error: err});
    }
};

//Login handling
export const loginUser = async (req: Request, res: Response) => {
    const parseResult = signInSchema.safeParse(req.body);
    if (!parseResult.success) {
        res.status(400).json({message: 'Invalid input', errors: parseResult.error.flatten()});
        return;
    }
    const {email, password} = parseResult.data;
    const user = await User.findOne({email});
    if (!user || !(await user.comparePassword(password))) {
        res.status(401).json({message: 'Invalid credentials'});
        return;
    }
    const payload = {id: user._id, username: user.username};
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({accessToken});
};

//Refresh Token handling

export const refreshToken = (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken; // Get the refresh token from the cookies
    if (!refreshToken) {
        res.sendStatus(401);
        return
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { id: string; username: string };
        const newAccessToken = generateAccessToken({id: decoded.id, username: decoded.username});
        res.json({accessToken: newAccessToken});
        return
    } catch (err) {
        res.status(403).json({message: 'Invalid refresh token'});
        return
    }
};
