import ApplicationModel from '../models/application.model';
import DeviceModel from '../models/device.model';
import AuthModel from '../models/auth.model';
import UserModel from '../models/user.model';

export default class AuthDBService {
    static async getApplicationCredentials(criteria: any) {
        return  ApplicationModel.findOne(criteria);
    }

    static async deviceExist(criteria: any) {
        return DeviceModel.findOne(criteria);
    }

    static async isTokenExist(criteria: any) {
        return AuthModel.findOne(criteria);
    }

    static async updateDeviceDetail(criteria: any, data: any) {
        return DeviceModel.updateOne(criteria, data);
    }

    static async updateAuthDetail(criteria: any, data: any) {
        return AuthModel.updateOne(criteria, data);
    }

    static async insertDevice(data: any) {
        const auth: any = new AuthModel(data);
        return auth.save();
    }

    static async userAuthentication(criteria: any) {
        const user = await UserModel.aggregate([
            {
                $match: {
                    email: criteria.email,
                    status: criteria.status
                }
            }
        ]);
        const u = user.length ? user[0] : null;

        return u;
    }

    static async createAccessToken(criteria: any, data: any) {
        return await AuthModel.updateOne(criteria, data);
    }

    static async createRequestToken(data: any) {
        const auth: any = new AuthModel(data);
        return auth.save();
    }

    static async updateTokenStatus(criteria: any, data: any) {
        return AuthModel.updateOne(criteria, { $set: data });
    }
}