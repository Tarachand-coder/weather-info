import * as mongoose from 'mongoose';
import { responseMessage as apiMessagesEn } from '../lang/en/apiMessage';
import { responseMessage as apiValidationMessagesEn } from '../lang/en/apiValidationMessage';
import CustomResponse from './customResponse.util';
import { responseMessage, errorManager } from '../config/errorMessage.config';
const { SUCCESS, BAD_REQUEST } = errorManager;


export const mongooseObjectId = (id?: any) => {
    if (id) {
        return new mongoose.Types.ObjectId(String(id));
    }
    return new mongoose.Types.ObjectId();
}

export const getMessages = (messageKey: string, lang: string = 'en', moduleType: string = 'api') => {
	try {
		let apiMessagesSource: any;

		if (moduleType === 'api') {
			if (lang === 'en') {
				apiMessagesSource = apiMessagesEn;
			}
			else {
				apiMessagesSource = apiMessagesEn;
			}
		}
		else if (moduleType === 'validation') {
			if (lang === 'en') {
				apiMessagesSource = apiValidationMessagesEn;
			}
			else {
				apiMessagesSource = apiValidationMessagesEn;
			}
		}
		else {
			return `Due to invalid type, No appropriate${moduleType}message found.`;
		}

		if (apiMessagesSource && messageKey in apiMessagesSource) {
			return apiMessagesSource[messageKey];
		}
		return `No appropriate message found for ${moduleType}.`;
	}
	catch (err) {
		return 'No appropriate message found';
	}
};

export const setPermission= (res: any, userType: any, userPermission: string) => {
	if (userType == userPermission) {
		return CustomResponse.setResponse(res, {
			...BAD_REQUEST,
			message: responseMessage.USER_00011
		}); 
	}
}