import * as UserDAO from '../daos/user.dao';
import {generateAccessToken} from '../utils/jwt';
import {sendTokens} from '../utils/token';
import type {Response} from 'express';
import jwt from 'jsonwebtoken';

export const register = async (username: string, email: string, password: string, res: Response) => {
    const existing = await UserDAO.findByEmail(email);
    if (existing) throw new Error("User with this email already exists");

    const user = await UserDAO.create({username, email, password});
    const accessToken = sendTokens(res, {id: user._id.toString(), username: user.username});
    return {user, accessToken};
};

export const login = async (email: string, password: string, res: Response) => {
    const user = await UserDAO.findByEmail(email);
    if (!user || !(await user.comparePassword(password))) throw new Error("Invalid email or password");

    const accessToken = sendTokens(res, {id: user._id.toString(), username: user.username});
    return {user, accessToken};
};

export const refresh = async (refreshToken: string, res: Response) => {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { id: string };
    const user = await UserDAO.findById(decoded.id);
    if (!user) throw new Error("User not found");

    const accessToken = generateAccessToken({id: user._id.toString(), username: user.username});
    return {user, accessToken};
};
