

import { Request, Response } from 'express';
import CustomResponse, { IAPIParams } from '../utils/customResponse.util';
import WeatherService from '../services/weather.service';
import { errorManager }  from '../config/errorMessage.config';
const { INTERNAL_SERVER_ERROR } = errorManager;

export default class WeatherController {
    static async weatherInfo(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const param : IAPIParams = {
                reqQuery: req.query,
                reqBody: req.body,
            }
            const result: any = await WeatherService.weatherInfo(param);
            if (result.error && result) {
                return CustomResponse.setResponse(res, result.error);
            }
            return CustomResponse.setResponse(res, result);    
        }catch (error) {
            return CustomResponse.setResponse(res, {
                ...INTERNAL_SERVER_ERROR,
                resData: error
            });
        }
    }
}