import {Schema, model} from 'mongoose';
import bcrypt from 'bcrypt';
import type {IUser} from "../schemas/user.schema.ts";


const userSchema = new Schema<IUser>({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    level: {type: Number, default: 1},
    profilePic: {type: String, default: ""},
    exp: {type: Number, default: 0},
}, {timestamps: true});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare password
userSchema.methods.comparePassword = function (candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
};

export default model<IUser>('User', userSchema);
