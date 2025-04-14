 
import { Request, Response } from 'express';
import { IAPIParams } from '../utils/customResponse.util';
import { BlogService } from '../services/blog.service';
import CustomResponse from '../utils/customResponse.util';
import { errorManager } from '../config/errorMessage.config';
import { setPermission } from '../utils/common.utill';
import constants from '../config/constants.config'; 
const { 
    INTERNAL_SERVER_ERROR 
} = errorManager;
const { STATUS, USERTYPE }  = constants;
const { USER, ADMIN } = USERTYPE;


export default class BlogController {
    static async getBlog(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const params: IAPIParams = {
                reqQuery: req.query,
            }
            
            const result: any = await BlogService.getBlog(params);
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

    static async getBlogDetail(req: Request, res: Response): Promise<void> {
        try {
            const params: IAPIParams = {
                reqQuery: req.query,
                reqParams: req.params
            };
            const result: any = await BlogService.getBlogDetail(params);
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

    static async addBlog(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const params: IAPIParams = {
                reqBody: req.body,
                resLocals: res.locals
            }
            const result: any = await BlogService.addBlog(params);
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

    static async updateBlog(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const params: IAPIParams = {
                reqBody: req.body,
                reqQuery: req.query,
                reqParams: req.params
            };
            const result: any = await BlogService.updateBlog(params);
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

    static async deleteBlog(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const params: IAPIParams = {
                reqParams: req.params,
                resLocals: res.locals
            };
            const result: any = await BlogService.deleteBlog(params);
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
