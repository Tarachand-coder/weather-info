import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import Moments from '../utils/moment.util';
import constants from '../config/constants.config';
const { STATUS, USERTYPE } = constants;
const { COLLECTIONS } = constants;
const { ENABLED, DISABLED, DELETED } = STATUS;

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        mobileNumber: {
            type: String
        },
        userType: {
            type: String,
            enum: [ USERTYPE.ADMIN, USERTYPE.USER ],
            default: USERTYPE.USER
        },
        status: {
            type: String,
            enum: [ ENABLED, DISABLED, DELETED ],
            default: ENABLED
        },
    },
    {
		collection: COLLECTIONS.USERS,
		versionKey: false,
		minimize: false,
		timestamps: { currentTime: () => Moments.getCurrentTimestampWithoutSeconds() }
	}
    );

const User = model<IUser>('Users', userSchema);

export default User;
