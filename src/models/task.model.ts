import { ITask } from '../interfaces/task.interface';
import mongoose, { Schema, Types, model } from 'mongoose';
import constant from '../config/constants.config';
import Moments from '../utils/moment.util';

const { 
    COLLECTIONS
} = constant;

const taskSchema = new Schema<ITask>(
    {
        title: {
            type: String,
            required: false,
        },
        description: {
            type: String
        },
        expireIn: {
            type: Number,
            required: false
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: false
        },
        status: {
            type: String
        },
        createdAt: {
            type: Number
        },
        updatedAt: {
            type: Number,
        }
    },
    {
        collection: COLLECTIONS.TASKS,
		versionKey: false,
		minimize: false,
		timestamps: { currentTime: () => Moments.getCurrentTimestampWithoutSeconds() }
    }
);

const Task = model<ITask>('Tasks', taskSchema);

export default Task;
