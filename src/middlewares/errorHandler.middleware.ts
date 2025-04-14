import * as express from 'express';
import * as expressValidation from 'express-validation';
import CustomResponse from '../utils/customResponse.util';
import { getMessages } from '../utils/common.utill';
import { errorManager } from '../config/errorMessage.config';

const {
	BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR
} = errorManager;

export default class ErrorHandler {
	static notFound(req: any, res: any) {
		const errorName = 'API_NOT_FOUND';
		return CustomResponse.setResponse(res, NOT_FOUND);
	}

	static handle(
		error: any,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	): any {

		const lang = req.headers['accept-language'] ? req.headers['accept-language'] : 'en';
		// message pattern to check is message has all capital letter and underscore
		const messagePatternRegex = /^[A-Z_]+$/;

		let err = error;
		function extractErrorMsg(errorObj: any) {
			let errormsg: string = '';
			if (errorObj?.details?.headers) {
				errormsg = errorObj.details.headers.map((er: { message: any; }) => er.message);
			}
			else if (errorObj?.details?.body) {
				errormsg = errorObj.details.body.map((er: { message: any; }) => er.message);
			}
			else if (errorObj?.details?.query) {
				errormsg = errorObj.details.query.map((er: { message: any; }) => er.message);
			}
			else if (errorObj?.details?.params) {
				errormsg = errorObj.details.params.map((er: { message: any; }) => er.message);
			}
			return errormsg.toString().replace(/['"]+/g, '');
		}

		if (err instanceof expressValidation.ValidationError) {
			const tempErrorMessage = extractErrorMsg(err);

			let errorMessage:string = '';
			let devErrorMessage:string = '';

			// If the pattern matches, we'll generate a message based on the message file;
			// otherwise, we'll return the string as it is.
			if (messagePatternRegex.test(tempErrorMessage)) {
				// Generate message based on message file
				errorMessage = getMessages(tempErrorMessage, lang, 'validation');
				devErrorMessage = getMessages(tempErrorMessage, 'en', 'validation');
			}
			else {
				// Return the string as it is
				errorMessage = tempErrorMessage;
				devErrorMessage = tempErrorMessage;
			}

			const validationErr = { ...BAD_REQUEST, devMessage: '' };
			
			validationErr.message = errorMessage;
			validationErr.devMessage = devErrorMessage;
			err = validationErr;
		}
		else if (err instanceof Error) {
			// convert it to CustomError
			err = {
				...INTERNAL_SERVER_ERROR,
				message: getMessages('INTERNAL_SERVER_ERROR', lang),
				devMessage: getMessages('INTERNAL_SERVER_ERROR')
			};
		}
		return CustomResponse.setResponse(res, {
			httpCode: err.httpCode,
			message: err.message,
			devMessage: err.devMessage,
			resCode: err.resCode
		});
	}
}
