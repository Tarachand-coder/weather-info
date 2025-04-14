import { IBlog } from '../interfaces/blog.interface';
import mongoose, { Schema, Types, model } from 'mongoose';
import constant from '../config/constants.config';
import Moments from '../utils/moment.util';

const { 
    COLLECTIONS, STATUS
} = constant;

const blogSchema = new Schema<IBlog>(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: false
        },
        status: {
            type: String,
            enum: [ STATUS.DISABLED, STATUS.ENABLED, STATUS.DELETED ]
        },
    },
    {
        collection: COLLECTIONS.BLOGS,
		versionKey: false,
		minimize: false,
		timestamps: { currentTime: () => Moments.getCurrentTimestampWithoutSeconds() }
    }
);

const Blog = model<IBlog>(COLLECTIONS.BLOGS, blogSchema);

export default Blog;
