
import * as momentTz from 'moment-timezone';
import Moment from 'moment';

export default class Moments {
    static getCurrentTimestampWithoutSeconds(timezone?: any) {
		return Number(Math.floor(Number(Moment().second(0)
			.format('x')) / 1000) * 1000);
	}
}