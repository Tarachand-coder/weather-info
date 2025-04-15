import TaskModel from '../models/task.model';
import { mongooseObjectId } from '../utils/common.utill';

export class TaskDBService {
    static async getTask(filters: any) {
        try {
            return await TaskModel.find(filters);
        }
        catch(error) {
            return null;
        }
    }

    static async getTaskDetail(criteria: any) {
        return TaskModel.findOne(criteria);
    }

    static async addTask(data: any) {
        return TaskModel.create(data);
    }

    static async updateTask(criteria: any, data: any) {
        return TaskModel.updateOne(criteria, data);
    }
}