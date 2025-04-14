import axios from 'axios';
import { errorManager, responseMessage } from '../config/errorMessage.config';
import { ILocationReq } from '../interfaces/weather.interface';
import { vars } from '../config/vars.config';
const { weatherApiKey } = vars;
const { SUCCESS, INTERNAL_SERVER_ERROR } = errorManager;

export default class WeatherService {
    
    static async weatherInfo(parameters: any) {
        try {
            const { reqBody } = parameters;
            const location: ILocationReq = reqBody;
            const { city } = location;
            const url: any = `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}&aqi=yes`;

            const response: any = await axios.get(url);
            const reuslt: any = response.data;
            return {
                ...SUCCESS,
                message: responseMessage.WEATHER_INFO_001,
                resData: {
                    reuslt
                }
            }
        }catch (error: any) {
            return {
                ...INTERNAL_SERVER_ERROR,
                resData: error.message
            }
        }
    }
}