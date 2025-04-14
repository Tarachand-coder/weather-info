import { Document } from 'mongoose';

export interface IUserReq {
    paged?: string;
    limit?: string;
    skipFields?: string;
    s?: string;
    status?: string;
    sort?: string;
    timestamp?: number;
}

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    mobileNumber: string;
    userType?: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}