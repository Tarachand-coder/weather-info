import { ITokenReq, IDeviceReq, ILoginReq, ILoginRes, ITokenRes, IRefreshTokenReq } from '../interfaces/auth.interface';
import { responseMessage } from '../config/errorMessage.config';
import { UserDBService } from '../dbServies/user.db.service';
import { errorManager } from '../config/errorMessage.config';
import AuthDBService from '../dbServies/auth.db.service';
import { mongooseObjectId } from '../utils/common.utill';
import constants from '../config/constants.config'; 
import Crypto from '../utils/encryptDecrypt.util';
import JWT from '../utils/jwtToken.util';
import dotenv from 'dotenv';
const { SUCCESS, BAD_REQUEST, INTERNAL_SERVER_ERROR, UNAUTHORIZED } = errorManager;
const { STATUS, TOKEN_TYPE }  = constants;
const { ENABLED } = STATUS;
const { ACCESS } = TOKEN_TYPE;

dotenv.config();

export default class AuthService {
    static async requestToken(parameters: any) {
        const { reqQuery, reqHeaders } = parameters;
        const param: ITokenReq = reqQuery;

        const applicationCredentialDetail: any = await AuthDBService.getApplicationCredentials({
            clientId: param.apiClientId,
            clientSecret: param.apiClientSecret,
            status: 'enabled' 
        });

        if (!applicationCredentialDetail) {
            return {
                ...UNAUTHORIZED,
                message: 'Unauthorized User'
            }
        }

        const requestToken: string = JWT.sign({
            clientId: param.apiClientId,
            clientSecret: param.apiClientSecret,
            applicationId: applicationCredentialDetail._id,
            // clientAgent: useragentData.source || '',
			// clientOs: useragentData.os || '',
			// clientOrigin: platform,
        });
        const createToken: any = await AuthDBService.createRequestToken({
            requestToken,
            userType: 'customer',
            applicationId: applicationCredentialDetail._id
        });

        const tokenResponse: ITokenRes = {
            token: createToken.requestToken,
            tokenType: 'Bearer'
        }

        return {
            ...SUCCESS,
            message: 'get data',
            resData: tokenResponse
        }
    }

    static async deviceRegister(parameters: any) {
        const { reqBody, resLocals } = parameters;
        const param: IDeviceReq = reqBody;
        const bearerToken: any = resLocals.authenticated;
        const deviceExist :any = await AuthDBService.deviceExist({
            deviceId: param.deviceId
        });

        const platformEndpoint = '';
        if (deviceExist) {
            await AuthDBService.updateDeviceDetail(
                { deviceId: param.deviceId },
                { deviceToken: param.deviceToken, platformEndpoint }
            );
            await AuthDBService.updateAuthDetail(
                { requestToken: bearerToken },
                {
					deviceTableId: mongooseObjectId(deviceExist._id),
					deviceId: deviceExist.deviceId
				}
            );
            return {
                ...SUCCESS,
                message: 'Device register',
                resData: deviceExist
            }     
        }
        const addDevice = await AuthDBService.insertDevice(param);
        await AuthDBService.updateAuthDetail(
			{ requestToken: bearerToken },
			{
				deviceTableId: mongooseObjectId(String(addDevice._id)),
				deviceId: param.deviceId
			}
		);
        return {
            ...SUCCESS,
            message: 'Device Register',
            resData: addDevice
        }
    }

    static async register(parameters: any) {
        const { reqBody } = parameters;
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

    static async authentication(parameters: any) {
        const { reqBody, resLocals } = parameters;
        const { applicationDetail, auth } = resLocals;
        const authId: any = auth[0]._id;
        const params: ILoginReq = reqBody;
        const userAuthenticateCriteria: any = { email: params.email, status: 'enabled' };
        const loggedInUser: any = await AuthDBService.userAuthentication(userAuthenticateCriteria);
        if (!loggedInUser || !loggedInUser?.password) {
            return { error: { ...BAD_REQUEST, message: 'Unauthrized Data' } }
        }
        const isPasswordMatch = Crypto.decrypt(loggedInUser.password) == params.password;
        if (!isPasswordMatch) {
            return { error: { ...BAD_REQUEST, message: 'Password does not match' } };
        }
        const accessTokenSignIn: string = JWT.sign({
            userId: loggedInUser._id,
            authId: authId,
            applicationDetail
        }, '60d');
        const refreshTokenSignIn: string = JWT.sign({
            userId: loggedInUser._id,
            authId: authId,
            applicationDetail
        }, '90d');
        const createAccessToken: any = await AuthDBService.createAccessToken(
            { _id: authId },
            {
                accessToken: accessTokenSignIn,
                refreshToken: refreshTokenSignIn,
                userId: loggedInUser._id,
                status: ENABLED
            }
        );
        const loginRes: ILoginRes = {
            token: accessTokenSignIn,
            tokenType: ACCESS,
            refreshToken: refreshTokenSignIn
        }
        return {
            ...SUCCESS,
            devMessage: 'login',
            resData: loginRes
        }
    }

    static async refreshToken(parameters: any) {
        const { reqBody, reqQuery } = parameters;
        const params: IRefreshTokenReq = reqBody;
        const isTokenExist: any = await AuthDBService.isTokenExist({
            ...params
        });
        if (!isTokenExist) {
            return { ...UNAUTHORIZED, resCode: 0, message: 'Token is not exist' }    
        }
        const checkTokenIsExpired = await JWT.checkTokenIsExpired(isTokenExist.refreshToken);
        if (checkTokenIsExpired) {
            await AuthDBService.updateTokenStatus({ _id: isTokenExist._id }, { status: 'disabled' })
        }

        const tokenData = await JWT.verify(params.refreshToken);
		const applicationDetail: any = tokenData;
													
		const appDetail = {
			platform: applicationDetail.platform,
			status: applicationDetail.status,
			_id: applicationDetail._id,
			clientId: applicationDetail.clientId,
			clientSecret: applicationDetail.clientSecret
		};
		const createAuthRecord: any = {
			_id: mongooseObjectId(),
			requestToken: isTokenExist.requestToken,
			userId: isTokenExist.userId,
			status: 'enabled',
			accessToken: '',
			refreshToken: '',
			deviceTableId: mongooseObjectId(isTokenExist._id),
			deviceId: isTokenExist.deviceId
		};
		const accessTokenSign = JWT.sign({
			userId: isTokenExist.userId,
			authId: createAuthRecord._id,
			applicationDetail: appDetail
		}, '60d');
		const refreshTokenSign = JWT.sign({
			userId: isTokenExist.userId,
			authId: createAuthRecord._id,
			applicationDetail: appDetail
		}, '90d');
		createAuthRecord.accessToken = accessTokenSign;
		createAuthRecord.refreshToken = refreshTokenSign;
		await AuthDBService.updateTokenStatus({ _id: isTokenExist._id }, { status: 'disabled' });
		await AuthDBService.createRequestToken(createAuthRecord);
		return {
			...SUCCESS,
			message: 'new token',
			resData: {
				token: accessTokenSign,
				tokenType: 'access',
				expiresIn: '60d',
				refreshToken: refreshTokenSign
			}
		};
    }

    static async logout(parameters: any) {
        const { resLocals, lang = 'en' } = parameters;
		const params: any = resLocals;
        const authId = params.auth._id;
		const isLoggedOut = await AuthDBService.updateAuthDetail(
			{ _id: mongooseObjectId(authId) },
			{ status: 'disabled' }
		);
		return { ...SUCCESS, message: responseMessage.AUTH007 };
    }
}
