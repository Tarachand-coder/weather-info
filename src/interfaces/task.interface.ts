import { Document } from 'mongoose';

export interface ITaskReq {
    paged?: string;
    limit?: string;
    skipFields?: string;
    s?: string;
    status?: string;
    sort?: string;
    timestamp?: number;
}
  
export interface ITask extends Document {
    title: string;
    description?: string;
    expireIn: number;
    userId?: string;
    status: String;
    createdAt: number;
    updatedAt: number;
}