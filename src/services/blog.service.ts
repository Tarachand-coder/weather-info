import { responseMessage, errorManager } from '../config/errorMessage.config';
import { BlogDBService } from '../dbServies/blog.db.service';
import { IBlogReq } from '../interfaces/blog.interface';
import { mongooseObjectId } from '../utils/common.utill';
import constants  from '../config/constants.config';
const { STATUS } = constants;

const { 
    SUCCESS, ALERTSUCCESS, BAD_REQUEST,
 } = errorManager;

export class BlogService {
    static async getBlog(parameters: any) {
        const { reqQuery } = parameters;
        const result: any = await BlogDBService.getBlog({ ...reqQuery as IBlogReq });
        if (!result) {
            return {
                ...ALERTSUCCESS,
                message: responseMessage.BLOG_0005,
            };
        }
        return {
            ...SUCCESS,
            message: responseMessage.BLOG_0001,
            resData: result
        }
    }

    static async getBlogDetail(parameters: any) {
        const { reqParams } = parameters;
        const taskId = reqParams.id;
        const blogDetail: any = await BlogDBService.getBlogDetail({ _id: mongooseObjectId(taskId) });
        if (!blogDetail) {
            return { error: { ...BAD_REQUEST, message: responseMessage.BLOG_0005 } };
        }

        return {
            ...SUCCESS,
            message: responseMessage.BLOG_0006,
            resData: blogDetail
        }
    }

    static async addBlog(parameters: any) {
        const { reqBody, resLocals } = parameters;
        const userId = resLocals.auth.userId;
        const addParams = {
            title: reqBody.title,
            content: reqBody.content,
            location: reqBody.location,
            userId: mongooseObjectId(userId),
            status: reqBody.status ? reqBody.status : STATUS.ENABLED  
        }
        const addedBlog: any = await BlogDBService.addBlog(addParams);
        return {
            ...SUCCESS,
            message: responseMessage.BLOG_0002,
            resData: addedBlog
        }
    }

    static async updateBlog(parameters: any) {
        const { reqBody, reqParams } = parameters;
        const blogId = reqParams.id;
        const blogDetail: any = await BlogDBService.getBlogDetail({ _id: mongooseObjectId(blogId) });

        if (!blogDetail) {
            return { error: { ...BAD_REQUEST, message: responseMessage.BLOG_0005 }};
        }
        const updateParams = {
            title: reqBody.title,
            content: reqBody.content,
            location: reqBody.location,
            status: reqBody.status ? reqBody.status : STATUS.ENABLED  
        };
        
        const updateDetail: any = await BlogDBService.updateBlog(
            { _id: mongooseObjectId(blogId) },
            updateParams,
        );
        if (!updateDetail.matchedCount) {
            return { error: BAD_REQUEST };
        }
        
        return {
            ...SUCCESS,
            message: responseMessage.BLOG_0003,
            resData: {}
        }
    }

    static async deleteBlog(parameters: any) {
        const { reqParams } = parameters;
        const blogId = reqParams.id;
        const blogDetail: any = await BlogDBService.getBlogDetail({ _id: mongooseObjectId(blogId) });
        if (!blogDetail) {
            return { error: { ...BAD_REQUEST, message: responseMessage.BLOG_0005 }}
        }
        const deletedBlog: any = await BlogDBService.deleteBlog({ _id: mongooseObjectId(blogId) });
        if (!deletedBlog.deletedCount) {
            return { error: { ...BAD_REQUEST, message: responseMessage.BLOG_0007 } }
        }

        return {
            ...SUCCESS,
            message: responseMessage.BLOG_0004,
        }
    }
}