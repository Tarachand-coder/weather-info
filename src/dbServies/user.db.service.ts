import UserModel from '../models/user.model';
import constants from '../config/constants.config'; 
const { STATUS }  = constants;
const { ENABLED, DISABLED, DELETED } = STATUS;

export class UserDBService {
    static async getProfile(criteria: any) {
        return await UserModel.findOne(criteria);
    }

    static async getUser(filters: any) {
        return await UserModel.find(filters).select('-password');
    }
    
    static async userDetail(criteria: any) {
        return await UserModel.findOne(criteria).select('-password');
    }

    static async addUser(data: any) {
        return await UserModel.create(data);
    }
    
    static async isUsernameExist(username: string, userId: any = null) {
        const matchCondition: any = {
            username,
            status: { $ne: DELETED },
        };
    
        if (userId) {
            matchCondition._id = { $eq: userId };
        }
    
        const userByUsername = await UserModel.aggregate([
            { $match: matchCondition }
        ]);
    
        return userByUsername.length > 0;
    }

    static async isEmailExist(email: string) {
        const userByEmail = await UserModel.aggregate([
            {
                $match: {
                    email: email,
                    status: { $ne : DELETED } 
                }
            }
        ]);
        return userByEmail?.length > 0; 
    }

    static async updateUser(criteria: any, data: any) {
        return await UserModel.updateOne(criteria, data);
    }

    static async deleteUser(criteria: any) {
        return await UserModel.deleteOne(criteria);
    }
}