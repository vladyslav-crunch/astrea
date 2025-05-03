import type {Request, Response} from 'express';
import User from '../models/user.model.ts';
import {generateAccessToken} from "../utils/jwt";
import jwt from "jsonwebtoken";
import {signInSchema, signUpSchema} from 'astrea-shared';
import {sendTokens} from "../utils/token.ts";

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

        const accessToken = sendTokens(res, {id: user._id.toString(), username: user.username});

        res.status(201).json({
            message: 'User Logged Successfully',
            user: {
                id: user._id,
                username: user.username,
                profilePic: user.profilePic,
                email: user.email,
                level: user.level,
                exp: user.exp
            },
            accessToken
        });
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
        res.status(401).json({message: 'Invalid email or password'});
        return;
    }
    const accessToken = sendTokens(res, {id: user._id.toString(), username: user.username});
    res.status(201).json({
        message: 'User Logged Successfully',
        user: {
            id: user._id,
            username: user.username,
            profilePic: user.profilePic,
            email: user.email,
            level: user.level,
            exp: user.exp
        },
        accessToken
    });
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });
    res.status(200).json({message: "Logged out"});
};


//Refresh Token handling

export const refreshToken = async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;

    if (!token) {
        res.sendStatus(401);
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as { id: string };

        // Fetch user from DB
        const user = await User.findById(decoded.id).select("-password"); // remove password for safety
        if (!user) {
            res.status(404).json({message: "User not found"});
            return
        }

        const accessToken = generateAccessToken({id: user.id, username: user.username});

        res.json({
            accessToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profilePic: user.profilePic,
                level: user.level,
                exp: user.exp,
            },
        });
    } catch (err) {
        res.status(403).json({message: "Invalid refresh token"});
        return
    }
};
