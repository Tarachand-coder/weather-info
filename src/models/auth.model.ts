import {
	Document, model, Schema
} from 'mongoose';

import constants from '../config/constants.config';
import Moments from '../utils/moment.util';

const {
	STATUS, COLLECTIONS
} = constants;

/**
 * Interface to model the Auth schema.
 */
export interface IAuth extends Document {
    userType?: string;
    status?: string;
    userId?: string;
    deviceId?: string;
    requestToken?: string;
    accessToken?: string;
    deviceTableId?: any;
    refreshToken?: string;
    locationId?: string;
    phoneNumberWithCountryCallingCode?: string;
}

const authSchema = new Schema<IAuth>(
	{
		status: {
			type: String,
			enum: [STATUS.ENABLED, STATUS.DISABLED],
			default: STATUS.ENABLED
		},
		userId: {
			type: String,
			trim: true,
			default: ''
		},
		userType: {
			type: String,
			enum: ['user', 'customer'],
			trim: true,
			default: 'customer'
		},
		deviceId: {
			type: String,
			trim: true,
			default: ''
		},
		deviceTableId: {
			type: Schema.Types.ObjectId,
			trim: true
		},
		requestToken: {
			type: String,
			required: true,
			trim: true
		},
		accessToken: {
			type: String,
			default: '',
			trim: true
		},
		refreshToken: {
			type: String,
			default: '',
			trim: true
		},
		locationId: {
			type: String, // type = string because key is optional
			trim: true
		},
		phoneNumberWithCountryCallingCode: {
			type: String
		},
	},
	{
		collection: COLLECTIONS.AUTH,
		versionKey: false,
		timestamps: { currentTime: () => Moments.getCurrentTimestampWithoutSeconds() }
	}
);

const Auth = model(COLLECTIONS.AUTH, authSchema);

export default Auth;
