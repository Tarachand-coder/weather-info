
import { Document } from 'mongoose';

export interface ILocationReq extends Document {
    city: string;
}