import { model, Model, Schema } from "mongoose";
import Moments from '../utils/moment.util';

export interface IApplication extends Document {
    clientId: String,
    clientSecret: String,
    status: String
}

const applicationSchema = new Schema<IApplication>(
    {
        clientId: {
            type: String,
            trim: true,
            required: true
        },
        clientSecret: {
            type: String,
            trim: true
        },
        status: {
            type: String,
            enum: ['enabled', 'disabled'],
            default: 'disabled'            
        }
    },
    {
		collection: 'applications',
		versionKey: false,
		timestamps: { currentTime: () => Moments.getCurrentTimestampWithoutSeconds() }
	}
);

const Application: Model<IApplication> = model('applications', applicationSchema);

export default Application;