import type { Request, Response } from 'express';
import User from '../models/auth.model';
import {generateAccessToken, generateRefreshToken} from "../utils/jwt.ts";
import jwt from "jsonwebtoken";


// Register a new user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
        const existing = await User.findOne({ username });
        if (existing) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const user = await User.create({ username, password });
        res.status(201).json({ message: 'User created', user: { id: user._id, username: user.username } });
    } catch (err) {
        res.status(500).json({ message: 'Registration failed', error: err });
    }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
        res.status(401).json({ message: 'Invalid credentials' });
        return
    }

    const payload = { id: user._id, username: user.username };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Set refresh token in an HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true, // Ensures it can't be accessed by JavaScript
        secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
        sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000, // Refresh token expires in 7 days
    });
    res.json({ accessToken });
    return
};


export const refreshToken = (req: Request, res: Response) =>{
    const refreshToken = req.cookies.refreshToken; // Get the refresh token from the cookies

    if (!refreshToken) {
        res.sendStatus(401);
        return
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { id: string; username: string };
        const newAccessToken = generateAccessToken({ id: decoded.id, username: decoded.username });
        res.json({ accessToken: newAccessToken });
        return
    } catch (err) {
        res.status(403).json({ message: 'Invalid refresh token' });
        return
    }
};
