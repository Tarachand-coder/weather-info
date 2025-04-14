import TaskModel from '../models/task.model';

export class TaskDBService {
    static async getTask(filters: any) {
        try {
            return await TaskModel.find();
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