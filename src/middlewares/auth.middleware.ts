import { NextFunction, Request, Response } from 'express';
import CustomResponse from '../utils/customResponse.util';
import { errorManager, responseMessage }  from '../config/errorMessage.config';
import JWTService from '../utils/jwtToken.util';
import AuthModel from '../models/auth.model';
import UserModel from '../models/user.model';
import ApplicationModel from '../models/application.model';
import constants from '../config/constants.config';
import { mongooseObjectId } from '../utils/common.utill';
import JWT from '../utils/jwtToken.util';
import * as useragent from 'express-useragent';

const {
	STATUS
} = constants;
const { UNAUTHORIZED, INTERNAL_SERVER_ERROR, SUCCESS } = errorManager;

class AuthVerify {
	// eslint-disable-next-line consistent-return
	public tokenValidate = async (req: Request, res: Response, next: NextFunction) => {
		const lang = req.headers['accept-language'] ? req.headers['accept-language'] : 'en';
		const authorization = req.headers.authorization ? req.headers.authorization.split(' ', 2) : [];
		const tokenType = authorization[0] || '';
		const token = authorization[1] || '';
		if (!tokenType || !token) {
			return CustomResponse.setResponse(res, {
				...UNAUTHORIZED, resCode: 3, message: responseMessage.AUTH006  
			});
		}
		res.locals.token = token;
		switch (tokenType) {
			case 'Bearer': {
				this.validateBearerToken(req, res, next);
				break;
			}
			case 'Access': {
				this.validateAccessToken(req, res, next);
				break;
			}
			default: {
				return CustomResponse.setResponse(res, {
					...UNAUTHORIZED, resCode: 0, message: responseMessage.AUTH006
				});
			}
		}
	};

	public validateBearerToken = async (req: Request, res: Response, next: NextFunction) => {
		const lang = req.headers['accept-language'] ? req.headers['accept-language'] : 'en';
		try {
			const authorization = res.locals.token;
			if (!authorization) {
				return CustomResponse.setResponse(res, {
					...UNAUTHORIZED,
					message:  responseMessage.AUTH006,
					devMessage: responseMessage.AUTH006
				});
			}
			const useragentData: useragent.Details = useragent.parse(req.headers['user-agent'] || '');
			const statusAgent: any = await this.validateBearerTokenAgent(authorization, useragentData);
			if (statusAgent === 'expired') {
				return CustomResponse.setResponse(res, {
					...UNAUTHORIZED, resCode: 0, message: responseMessage.AUTH007
				});
			}
			if (!statusAgent) {
				return CustomResponse.setResponse(res, {
					...UNAUTHORIZED, resCode: 0, message: responseMessage.AUTH007 
				});
			}
			const auth: any = await this.checkBearerTokenIsExits(authorization);
			if (auth === null) {
				return CustomResponse.setResponse(res, {
					...UNAUTHORIZED, resCode: 0, message: responseMessage.AUTH007 
				});
			}
			// Get token detail
			const tokenData: any = await JWT.verify(authorization);
			const applicationObj = {
				clientId: tokenData.clientId,
				clientSecret: tokenData.clientSecret,
				platform: tokenData.clientOrigin,
				_id: mongooseObjectId(tokenData.applicationId),
				status: STATUS.ENABLED
			};
			// Application credential validate
			const isApplicationValid: any = await this.getApplicationDetail(applicationObj);
			if (!isApplicationValid) {
				return CustomResponse.setResponse(res, {
					...UNAUTHORIZED, resCode: 0, message: responseMessage.AUTH008
				});
			}
			res.locals.authenticated = authorization;
			res.locals.auth = auth;
			res.locals.applicationDetail = applicationObj;
			return next();
		}
		catch (error) {
			return CustomResponse.setResponse(res, {
				...UNAUTHORIZED, resCode: 0, message: responseMessage.AUTH009
			});
		}
	};

	/**
		 * Validate user agent with request
		 * @param bearerToken string
		 * @param useragentData useragent.Details
		 */

	// eslint-disable-next-line class-methods-use-this
	public validateBearerTokenAgent = async (bearerToken: string, useragentData: useragent.Details):
		Promise<any> => new Promise<any>((resolve, reject) => {
			JWTService.verify(bearerToken).then((result) => {
				if (result !== null) {
					resolve(true);
					// resolve(result.clientAgennt === useragentData.source);
				}
				else {
					resolve(false);
				}
			}).catch((err) => {
				if (err.name === 'TokenExpiredError') {
					resolve('expired');
				}
				else {
					reject(err);
				}
			});
		});

	/**
		 * Check user token is exists in db
		 * @param bearerToken string
		 */
	// eslint-disable-next-line class-methods-use-this
	public checkBearerTokenIsExits = async (bearerToken: string) => {
		// const params = { requestToken: bearerToken, status: STATUS.DISABLED, accessToken: '' };
		const params = { requestToken: bearerToken, status: STATUS.ENABLED };
		return AuthModel.find(params);
	};	

	/**
		 * Validate access token
		 * @param req Request
		 * @param res Response
		 * @param next NextFunction
		 */
	public validateAccessToken = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
		const lang = req.headers['accept-language'] ? req.headers['accept-language'] : 'en';
		try {
			const { companyId } = req.params;
			const authorization = res.locals.token;
			if (!authorization) {
				return CustomResponse.setResponse(res, {
					...UNAUTHORIZED, resCode: 0, message: 'Unauthorized User'
				});
			}
			// Check access token is exists in db
			const isAccessTokenExist: any = await this.isAccessTokenExist(authorization);
			if (isAccessTokenExist === null) {
				return CustomResponse.setResponse(res, {
					...UNAUTHORIZED, resCode: 0, message: 'Unauthorized User'
				});
			}
			// check access token is expired or no
			const tokenExpired: boolean = await this.checkTokenIsExpired(authorization);
			if (tokenExpired) {
				return CustomResponse.setResponse(res, {
					...UNAUTHORIZED, resCode: 0, message: 'Unauthorized User'
				});
			}
			// Get token data
			const tokenData = await JWT.verify(authorization);
			const { applicationDetail }: any = tokenData;
			const isApplicationValid: any = await this.getApplicationDetail(
				{ ...applicationDetail, _id: applicationDetail._id }
			);
			if (!isApplicationValid) {
				return CustomResponse.setResponse(res, {
					...UNAUTHORIZED, resCode: 0, message: 'Unauthorized User'
				});
			}
			const userData = await UserModel.findOne(
				{ _id: isAccessTokenExist.userId, status: STATUS.ENABLED },
				{
					updatedAt: 0,
					createdAt: 0
				}
			);
			if (userData === null) {
				const updateToken = await AuthModel.updateOne({ _id: isAccessTokenExist._id }, { status: STATUS.DISABLED });
				return CustomResponse.setResponse(res, {
					...SUCCESS,
					message: 'Unauthorized User' 
				});
			}
			res.locals.user = userData;
			res.locals.authenticated = authorization;
			res.locals.auth = isAccessTokenExist;
			res.locals.tokenData = tokenData;
			return next();
		}
		catch (err) {
			return CustomResponse.setResponse(res, {
				...INTERNAL_SERVER_ERROR,
				message: 'Unauthorized User' 
			});
		}
	};

	/**
		 * Check access token is exists or no in db
		 * @param accessToken string
		 */
	// eslint-disable-next-line class-methods-use-this
	public isAccessTokenExist = async (accessToken: string) => {
		const params = { accessToken: accessToken, status: STATUS.ENABLED };
		return AuthModel.findOne(params);
	};

	// eslint-disable-next-line class-methods-use-this
	public getApplicationDetail = async (criteria: any) => ApplicationModel.findOne(criteria);

	// eslint-disable-next-line class-methods-use-this
	public checkTokenIsExpired = async (accessToken: string): Promise<boolean> => new Promise<any>((resolve, reject) => {
		JWTService.verify(accessToken).then((data) => {
			resolve(false);
		}).catch((err) => {
			if (err.name === 'TokenExpiredError') {
				resolve(true);
			}
			else {
				resolve(true);
			}
		});
	});
}

export default new AuthVerify();

