import { model, Model, Schema } from "mongoose";
import Moments from '../utils/moment.util';
import constants from '../config/constants.config'
const {
	COLLECTIONS, STATUS
} = constants;

export interface IDeviceReq extends Document {
    deviceId: string;
    deviceToken: string;
    deviceType: string;
    modelName: string;
    name: string;
    appVersion: string;
    deviceOs: string;
    timezone: string;
    platformEndpoint: string;
    appType: string;
    status: string;
    createdAt: number;
    updatedAt: number;
    locationCoordinate: any;
}

const deviceSchema = new Schema<IDeviceReq>(
    {
		deviceId: {
			type: String,
			trim: true
		},
		deviceToken: {
			type: String,
			trim: true
		},
		deviceType: {
			type: String,
			trim: true
		},
		deviceOs: {
			type: String,
			trim: true
		},
		modelName: {
			type: String,
			trim: true
		},
		name: {
			type: String,
			trim: true
		},
		appVersion: {
			type: String,
			trim: true,
			default: '1.0.0'
		},
		timezone: {
			type: String,
			trim: true
		},
		platformEndpoint: {
			type: String,
			trim: true,
			default: ''
		},
		appType: {
			type: String,
			trim: true
		},
		status: {
			type: String,
			enum: [ STATUS.ENABLED, STATUS.DISABLED],
			default: STATUS.ENABLED
		},
		locationCoordinate: {
			type: {
				type: String,
				enum: 'Point',
				default: 'Point'
			},
			coordinates: {
				type: [Number], // [long, lat]
				default: [0, 0]
			}
		},
		createdAt: {
			type: Number,
			trim: true
		},
		updatedAt: {
			type: Number,
			trim: true
		}
	},
	{
		collection: COLLECTIONS.DEVICES,
		versionKey: false,
		timestamps: { currentTime: () => Moments.getCurrentTimestampWithoutSeconds() }
	}
);

const Device: Model<IDeviceReq> = model(COLLECTIONS.DEVICES, deviceSchema);

export default Device;