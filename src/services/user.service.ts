import { UserDBService } from '../dbServies/user.db.service';
import { errorManager, responseMessage } from '../config/errorMessage.config';
import { IUserReq } from '../interfaces/user.interface';
import { mongooseObjectId } from '../utils/common.utill';
import Crypto from '../utils/encryptDecrypt.util';
import constants from '../config/constants.config'; 
const { SUCCESS, BAD_REQUEST } = errorManager;
const { STATUS, USERTYPE }  = constants;
const { ENABLED } = STATUS;
const { USER, ADMIN } = USERTYPE;

export default class UserService {
    static async getProfile(parameters: any) {
        const { resLocals } = parameters;
        const userId: string = resLocals.user._id;
        const result: any = await UserDBService.getProfile({ _id: mongooseObjectId(userId) });
        if (!result) {
            return {
                ...BAD_REQUEST,
                message: responseMessage.USER_0007
            }
        }
        return {
            ...SUCCESS,
            message: responseMessage.USER_0008,
            resData: result
        }
    }

    static async updateProfile(parameters: any) {
        const { reqBody, resLocals, reqParams } = parameters;
        const userId = resLocals.user._id;
        if (reqParams.id != userId) {
            return {
                ...BAD_REQUEST,
                message: responseMessage.USER_00013
            }
        } 
        const profileData = reqBody;
        const updatedUser = await UserDBService.updateUser({ _id: mongooseObjectId(userId)}, { ...profileData });
        if (!updatedUser.matchedCount) {
            return { error: BAD_REQUEST }
        }

        return {
            ...SUCCESS,
            message: responseMessage.USER_00012
        }
    }

    static async getUser(parameters: any) {
        const { reqQuery, resLocals, reqBody } = parameters;
        const result: any = await UserDBService.getUser({ ...reqQuery as IUserReq});
        if (!result) {
            return {
                ...BAD_REQUEST,
                message: responseMessage.USER_0005
            }
        }
        return {
            ...SUCCESS,
            message: responseMessage.USER_0001,
            resData: result
        }
    }

    static async getUserDetail(parameters: any) {
        const { reqParams } = parameters;
        const userId = reqParams.id;
        const result: any = await UserDBService.userDetail({ _id: mongooseObjectId(userId) });
        if (!result) {
            return {
                ...BAD_REQUEST,
                message: responseMessage.USER_0005
            }
        }
        return {
            ...SUCCESS,
            resData: result
        }
    }
    
    static async addUser(parameters: any) {
        const { reqBody } =  parameters;

        const isUsernameExist: any = await UserDBService.isUsernameExist(reqBody.username);
        if (isUsernameExist)  return { error: { ...BAD_REQUEST, message: responseMessage.USER_0009 } }

        const isEmailExist: any = await UserDBService.isEmailExist(reqBody.email);
        if (isEmailExist)  return { error: { ...BAD_REQUEST, message: responseMessage.USER_00010 } }

        const addParams = {
            username: reqBody.username,
            email: reqBody.email,
            password: Crypto.encrypt(reqBody.password),
            mobileNumber: reqBody.mobileNumber,
            status: reqBody.status
        };
        const addedUser: any = await UserDBService.addUser(addParams);
        if (!addedUser) {
            return {
                ...BAD_REQUEST,
                message: responseMessage.USER_0006
            }
        }
        
        const responseObject = addedUser.toObject();
        delete responseObject.password;

        return {
            ...SUCCESS,
            message: responseMessage.USER_0002,
            resData: responseObject
        }
    }

    static async register(parameters: any) {
        const { reqBody } = parameters;
        const isUsernameExist: any = await UserDBService.isUsernameExist(reqBody.username);
        if (isUsernameExist)  return { error: { ...BAD_REQUEST, message: responseMessage.USER_0009 } }

        const isEmailExist: any = await UserDBService.isEmailExist(reqBody.email);
        if (isEmailExist)  return { error: { ...BAD_REQUEST, message: responseMessage.USER_00010 } }

        const addParams = {
            username: reqBody.username,
            email: reqBody.email,
            password: Crypto.encrypt(reqBody.password),
            mobileNumber: reqBody.mobileNumber,
            status: ENABLED
        }
        const result: any = await UserDBService.addUser(addParams);
        return {
            ...SUCCESS,
            message: responseMessage.AUTH002,
            resData: { result }
        }
    }

    static async updateUser(parameters: any) {
        const { reqBody, reqParams } = parameters;
        const userId = reqParams.id;
        const updateData = reqBody;
        const userDetail: any = await UserDBService.userDetail({ _id: mongooseObjectId(userId)});
        if (!userDetail) {
            return {
                ...BAD_REQUEST,
                message: responseMessage.USER_0005
            }
        }
        // const isUsernameExist: any = await UserDBService.isUsernameExist(reqBody.username, mongooseObjectId(userDetail._id));
        // if (isUsernameExist)  return { error: { ...BAD_REQUEST, message: responseMessage.USER_0009 } }

        const updatedUser = await UserDBService.updateUser({ _id: mongooseObjectId(userId)}, { ...updateData });
        if (!updatedUser.matchedCount) {
            return { error: BAD_REQUEST }
        }
        return {
            ...SUCCESS,
            message: responseMessage.USER_0003
        }
    }

    static async deleteUser(parameters: any) {
        const { reqBody, reqParams } = parameters;
        const userId = reqParams.id;
        const result: any =  await UserDBService.userDetail({ _id: mongooseObjectId(userId) });
        if (!result) {
            return {
                ...BAD_REQUEST,
                message: responseMessage.USER_0005
            }        
        }
        const deleteUser: any = await UserDBService.deleteUser({ _id: mongooseObjectId(userId) });
        if (!deleteUser.deletedCount) {
            return { error: BAD_REQUEST }
        }
        return {
            ...SUCCESS,
            message: responseMessage.USER_0004
        }
    }
}

