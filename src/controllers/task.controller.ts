 
import { Request, Response } from 'express';
import { IAPIParams } from '../utils/customResponse.util';
import { TaskService } from '../services/task.service';
import CustomResponse from '../utils/customResponse.util';
import { errorManager } from '../config/errorMessage.config';
import { setPermission } from '../utils/common.utill';
const { 
    INTERNAL_SERVER_ERROR 
} = errorManager;

export default class TaskController {
    static async getTask(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const params: IAPIParams = {
                reqQuery: req.query,
                resLocals: res.locals
            }
            
            const result: any = await TaskService.getTask(params);
            if (result && result.error) {
                return CustomResponse.setResponse(res, result.error);
            }
            return CustomResponse.setResponse(res, result);
        }
        catch(error) {
            return CustomResponse.setResponse(res, {
                ...INTERNAL_SERVER_ERROR,
                resData: error
            });
        }
    }

    static async getTaskDetail(req: Request, res: Response): Promise<void> {
        try {
            const params: IAPIParams = {
                reqQuery: req.query,
                reqParams: req.params
            };
            const result: any = await TaskService.getTaskDetail(params);
            if (result && result.error) {
                return CustomResponse.setResponse(res, result.error);
            }
            return CustomResponse.setResponse(res, result);
        } catch(error) {
            return CustomResponse.setResponse(res, {
                ...INTERNAL_SERVER_ERROR,
                resData: error
            });
        }
    }

    static async addTask(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const params: IAPIParams = {
                reqBody: req.body,
                resLocals: res.locals
            }
            const result: any = await TaskService.addTask(params);
            if (result && result.error) {
                return CustomResponse.setResponse(res, result.error);
            }
            return CustomResponse.setResponse(res, result);
        }
        catch (error: any) {
            return CustomResponse.setResponse(res, {
                ...INTERNAL_SERVER_ERROR,
                resData: error.stack
            });
        }
    }

    static async updateTask(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const params: IAPIParams = {
                reqBody: req.body,
                reqQuery: req.query,
                reqParams: req.params
            };
            const result: any = await TaskService.updateTask(params);
            if (result && result.error) {
                return CustomResponse.setResponse(res, result.error);
            }
            return CustomResponse.setResponse(res, result);
        }
        catch(error) {
            return CustomResponse.setResponse(res, {
                ...INTERNAL_SERVER_ERROR,
                resData: error
            });
        }
    }
}
