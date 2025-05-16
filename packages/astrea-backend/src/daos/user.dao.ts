import User from '../models/user.model';

export const findByEmail = (email: string) => User.findOne({email});

export const findById = (id: string) => User.findById(id).select('-password');

export const create = (data: { username: string, email: string, password: string }) =>
    User.create(data);
