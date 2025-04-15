import * as express from 'express';
import WeatherController from '../controllers/weather.controller';
import validations from '../validations/weather.validation';
import authVerify from '../middlewares/auth.middleware';
import { validate }  from 'express-validation';
const { weatherReq } = validations;

class WeatherRouter {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.allRegisterRoute();
    }

    private allRegisterRoute() {
        this.postRouter();
    }

    private postRouter(): void {
        this.router.post(
            '/weather-info',
            validate(weatherReq),
            authVerify.tokenValidate,
            WeatherController.weatherInfo
        );
    }
} 

export default new WeatherRouter().router;