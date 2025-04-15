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
const { STATUS, TOKEN_TYPE, USERTYPE, TOKEN }  = constants;
const { ENABLED, DISABLED } = STATUS;
const { EXPIRE_IN, REFRESH_IN } = TOKEN;
const { ACCESS, BEARER } = TOKEN_TYPE;
const { USER } = USERTYPE;

dotenv.config();

export default class AuthService {
    static async requestToken(parameters: any) {
        const { reqQuery, reqHeaders } = parameters;
        const param: ITokenReq = reqQuery;

        const applicationCredentialDetail: any = await AuthDBService.getApplicationCredentials({
            clientId: param.apiClientId,
            clientSecret: param.apiClientSecret,
            status: ENABLED
        });

        if (!applicationCredentialDetail) {
            return {
                ...UNAUTHORIZED,
                message: responseMessage.AUTH009
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
            userType: USER,
            applicationId: applicationCredentialDetail._id
        });

        const tokenResponse: ITokenRes = {
            token: createToken.requestToken,
            tokenType: BEARER
        }

        return {
            ...SUCCESS,
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
                message: responseMessage.AUTH0010,
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
            message: responseMessage.AUTH0010,
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
            return { error: { ...BAD_REQUEST, message: responseMessage.AUTH009 } }
        }
        const isPasswordMatch = Crypto.decrypt(loggedInUser.password) == params.password;
        if (!isPasswordMatch) {
            return { error: { ...BAD_REQUEST, message: responseMessage.AUTH0011 } };
        }
        const accessTokenSignIn: string = JWT.sign({
            userId: loggedInUser._id,
            authId: authId,
            applicationDetail
        }, EXPIRE_IN);
        const refreshTokenSignIn: string = JWT.sign({
            userId: loggedInUser._id,
            authId: authId,
            applicationDetail
        }, REFRESH_IN);
        const createAccessToken: any = await AuthDBService.createAccessToken(
            { _id: authId },
            {
                accessToken: accessTokenSignIn,
                refreshToken: refreshTokenSignIn,
                userId: mongooseObjectId(loggedInUser._id),
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
            devMessage: responseMessage.AUTH0012,
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
            return { ...UNAUTHORIZED, resCode: 0, message: responseMessage.AUTH0013 }    
        }
        const checkTokenIsExpired = await JWT.checkTokenIsExpired(isTokenExist.refreshToken);
        if (checkTokenIsExpired) {
            await AuthDBService.updateTokenStatus({ _id: isTokenExist._id }, { status: ENABLED })
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
			status: ENABLED,
			accessToken: '',
			refreshToken: '',
			deviceTableId: mongooseObjectId(isTokenExist._id),
			deviceId: isTokenExist.deviceId
		};
		const accessTokenSign = JWT.sign({
			userId: isTokenExist.userId,
			authId: createAuthRecord._id,
			applicationDetail: appDetail
		}, EXPIRE_IN);
		const refreshTokenSign = JWT.sign({
			userId: isTokenExist.userId,
			authId: createAuthRecord._id,
			applicationDetail: appDetail
		}, REFRESH_IN);
		createAuthRecord.accessToken = accessTokenSign;
		createAuthRecord.refreshToken = refreshTokenSign;
		await AuthDBService.updateTokenStatus({ _id: isTokenExist._id }, { status: DISABLED });
		await AuthDBService.createRequestToken(createAuthRecord);
		return {
			...SUCCESS,
			resData: {
				token: accessTokenSign,
				tokenType: ACCESS, 
				expiresIn: EXPIRE_IN,
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
			{ status: DISABLED }
		);
		return { ...SUCCESS, message: responseMessage.AUTH007 };
    }
}
