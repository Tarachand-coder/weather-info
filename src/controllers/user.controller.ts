

import { Request, Response } from 'express';
import CustomResponse, { IAPIParams } from '../utils/customResponse.util';
import UserService from '../services/user.service';
import { errorManager, responseMessage }  from '../config/errorMessage.config';
const { INTERNAL_SERVER_ERROR } = errorManager;
import constants from '../config/constants.config'; 
import { setPermission } from '../utils/common.utill';
const { SUCCESS, BAD_REQUEST } = errorManager;
const { STATUS, USERTYPE }  = constants;
const { ENABLED } = STATUS;
const { USER, ADMIN } = USERTYPE;

export default class UserController {
    static async getProfile(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const params: IAPIParams = {
                reqBody: req.body,
                resLocals: res.locals
            }
            const result: any = await UserService.getProfile(params);
            if (result && result.error) {
                return CustomResponse.setResponse(res, result.error);
            }
            return CustomResponse.setResponse(res, result);
        }catch (error) {
            return CustomResponse.setResponse(res, {
                ...INTERNAL_SERVER_ERROR,
                resData: error
            });
        }         
    }

    static async updateProfile(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const params : IAPIParams = {
                reqParams: req.params,
                reqBody: req.body,
                resLocals: res.locals
            }
            const result: any = await UserService.updateProfile(params);
            if (result.error && result) {
                return CustomResponse.setResponse(res, result.error);
            }
            return CustomResponse.setResponse(res, result);
        }catch (error) {
            return CustomResponse.setResponse(res, {
                ...INTERNAL_SERVER_ERROR,
                resData: error
            });
        }
    }

    static async getUser(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const param : IAPIParams = {
                reqQuery: req.query,
				reqBody: req.body,
				reqParams: req.params,
				resLocals: res.locals,
            }
            const result: any = await UserService.getUser(param);
            if (result.error && result) {
                return CustomResponse.setResponse(res, result.error);
            }
            return CustomResponse.setResponse(res, result);    
        }catch (error) {
            return CustomResponse.setResponse(res, {
                ...INTERNAL_SERVER_ERROR,
                resData: error
            });
        }
    }

    static async getUserDetail(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const params: IAPIParams = {
                reqBody: req.body,
                reqParams: req.params,
                resLocals: res.locals,
            }
            const result: any = await UserService.getUserDetail(params);
            if (result && result.error) {
                return CustomResponse.setResponse(res, result.error);
            }
            return CustomResponse.setResponse(res, result);
        }catch (error) {
            return CustomResponse.setResponse(res, {
                ...INTERNAL_SERVER_ERROR,
                resData: error
            });
        }         
    }

    static async addUser(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const params : IAPIParams = {
                reqQuery: req.query,
                reqBody: req.body,
                resLocals: res.locals
            }
            const result: any = await UserService.addUser(params);
            if (result.error && result) {
                return CustomResponse.setResponse(res, result.error);
            }
            return CustomResponse.setResponse(res, result);
        }catch (error) {
            return CustomResponse.setResponse(res, {
                ...INTERNAL_SERVER_ERROR,
                resData: error
            });
        }
    }

    static async register(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const params: IAPIParams = {
                reqBody: req.body
            };
            const result: any = await UserService.register(params);
            if (result && result.error) {
                return CustomResponse.setResponse(res, result.error);
            }
            return CustomResponse.setResponse(res, result);
        }catch (error) {
            return CustomResponse.setResponse(res, {
                ...INTERNAL_SERVER_ERROR,
                resData: error
            });
        }
    }

    static async updateUser(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const params: IAPIParams = {
                reqBody: req.body,
                reqParams: req.params,
                resLocals: res.locals
            }
            const result: any = await UserService.updateUser(params);
            if (result && result.error) {
                return CustomResponse.setResponse(res, result.error);
            }
            return CustomResponse.setResponse(res, result);
        }catch (error) {
            return CustomResponse.setResponse(res, {
                ...INTERNAL_SERVER_ERROR,
                resData: error
            });
        }
    }

    static async deleteUser(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const params: IAPIParams = {
                reqBody: req.body,
                reqParams: req.params,
                resLocals: res.locals,
            }
            const result: any = await UserService.deleteUser(params);
            if (result && result.error) {
                return CustomResponse.setResponse(res, result.error);
            }
            return CustomResponse.setResponse(res, result);
        }catch (error) {
            return CustomResponse.setResponse(res, {
                ...INTERNAL_SERVER_ERROR,
                resData: error
            });
        }
    }
}