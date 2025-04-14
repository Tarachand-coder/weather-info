import { Document } from 'mongoose';

export interface IBlogReq {
    paged?: string;
    limit?: string;
    skipFields?: string;
    s?: string;
    status?: string;
    sort?: string;
    timestamp?: number;
}
  
export interface IBlog extends Document {
    title: string;
    content?: string;
    location: string;
    userId?: string;
    status: string;
    createdAt: number;
    updatedAt: number;
}