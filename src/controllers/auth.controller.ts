import { Request, Response } from 'express';
import CustomResponse, { IAPIParams } from '../utils/customResponse.util';
import User from '../models/user.model';
import AuthService from '../services/auth.service';
import { errorManager } from '../config/errorMessage.config';
const { INTERNAL_SERVER_ERROR } = errorManager;

export default class AuthController {
    static async getRequestToken(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const params: IAPIParams = {
                reqQuery: req.query,
                reqBody: req.body,
                reqParams: req.params,
                reqHeaders: req.headers
            }
            const result: any = await AuthService.requestToken(params);
            if (result && result.error) {
                return CustomResponse.setResponse(res, result.error);
            }
            return CustomResponse.setResponse(res, result);
        }catch (error) {
            return CustomResponse.setResponse(res, {
                ...INTERNAL_SERVER_ERROR,
                resData: error
            })
        }
    }

    static async deviceRegister(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const params: IAPIParams = {
                reqBody: req.body,
                resLocals: res.locals
            };
            const result: any = await AuthService.deviceRegister(params);
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
    
    static async authentication(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const params: IAPIParams = {
                reqBody: req.body,
                reqParams: req.params,
                resLocals: res.locals
            }
            const result: any = await AuthService.authentication(params);
            if (result && result.error) {
                return CustomResponse.setResponse(res, result.error);
            }
            return CustomResponse.setResponse(res, result);
        }catch (error) {
            return CustomResponse.setResponse(res, {
                ...INTERNAL_SERVER_ERROR,
                resData: error
            })
        }
    }

    static async refreshToken(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const params: IAPIParams = {
                reqBody: req.body,
                reqQuery: req.query
            }
            const result: any = await AuthService.refreshToken(params);
            if (!result && !result.error) {
                return CustomResponse.setResponse(res, result.error);
            }
            return CustomResponse.setResponse(res, result);
        }catch (error) { 
            return CustomResponse.setResponse(res, {
                ...INTERNAL_SERVER_ERROR,
                resData: error
            })
        } 
    }

    static async logout(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const params: IAPIParams = {
                resLocals: res.locals
            }
            const result: any = await AuthService.logout(params);
            if (!result && !result.error) {
                return CustomResponse.setResponse(res, result.error);
            }
            return CustomResponse.setResponse(res, result);
        }catch (error) { 
            return CustomResponse.setResponse(res, {
                ...INTERNAL_SERVER_ERROR,
                resData: error
            })
        } 
    }
}