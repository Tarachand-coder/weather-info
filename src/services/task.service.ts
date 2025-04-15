import { responseMessage, errorManager } from '../config/errorMessage.config';
import { TaskDBService } from '../dbServies/task.db.service';
import { mongooseObjectId } from '../utils/common.utill';
import { ITaskReq } from '../interfaces/task.interface';
import constants from '../config/constants.config'; 
const { STATUS, USERTYPE }  = constants;
const { ENABLED, DISABLED } = STATUS;
const { USER } = USERTYPE;
const { 
    SUCCESS, ALERTSUCCESS, BAD_REQUEST,
 } = errorManager;

export class TaskService {
    static async getTask(parameters: any) {
        const { reqQuery, resLocals } = parameters;
        if (resLocals.user.userType == USER) {
            var userId = resLocals.user._id;
        }
        const taskQuery : ITaskReq = {
            ...reqQuery,
            userId
        }
        
        const result: any = await TaskDBService.getTask(taskQuery);
        if (!result) {
            return {
				...ALERTSUCCESS,
				message: responseMessage.TASK_0004,
			};
        }
        return {
            ...SUCCESS,
            message: responseMessage.TASK_0003,
            resData: result
        }
    }

    static async getTaskDetail(parameters: any) {
        const { reqParams } = parameters;
        const taskId = reqParams.id;
        const taskDetail: any = await TaskDBService.getTaskDetail({ _id: mongooseObjectId(taskId) });
        if (!taskDetail) {
            return { error: { ...BAD_REQUEST, message: responseMessage.TASK_0004 } };
        }

        return {
            ...SUCCESS,
            message: responseMessage.TASK_0003,
            resData: taskDetail
        }
    }

    static async addTask(parameters: any) {
        const { reqBody, resLocals } = parameters;
        const userId = resLocals.auth ? resLocals.user._id : null;
        const addParams = {
            title: reqBody.title,
            description: reqBody.description,
            expireIn: new Date(reqBody.expireIn).getTime(),
            userId: mongooseObjectId(userId),
            status: ENABLED
        }
        const addedTask: any = await TaskDBService.addTask(addParams);
        return {
            ...SUCCESS,
            message: responseMessage.TASK_0001,
            resData: addedTask
        }
    }

    static async updateTask(parameters: any) {
        const { reqBody, reqParams } = parameters;
        const taskId = reqParams.id;
        const taskDetail: any = await TaskDBService.getTaskDetail({ _id: mongooseObjectId(taskId) });

        if (!taskDetail) {
            return { error: { ...BAD_REQUEST, message: responseMessage.TASK_0004 }};
        }
        const updateParams = {
            name: reqBody.name,
            description: reqBody.description,
            dueDate: reqBody.dueDate,
            status: reqBody.status ? reqBody.status : DISABLED 
        };
        
        const updateDetail: any = await TaskDBService.updateTask(
            { _id: mongooseObjectId(taskId) },
            updateParams,
        );
        if (!updateDetail.matchedCount) {
            return { error: BAD_REQUEST };
        }
        
        return {
            ...SUCCESS,
            message: responseMessage.TASK_0002,
            resData: {}
        }
    }
}