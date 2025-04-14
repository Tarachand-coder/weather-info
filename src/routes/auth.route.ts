import exp from 'constants';
import * as express from 'express';
import AuthController from '../controllers/auth.controller';
import authVerify from '../middlewares/auth.middleware';
import { validate } from 'express-validation';
import validation from '../validations/auth.validation';
const { deviceRegisterReq, loginReq, refreshTokenReq } = validation;

class AuthRouter {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        
        this.getRouter();
        this.postRouter();
    }

    private getRouter(): void {
        this.router.get(
            '/auth/request-token',
            AuthController.getRequestToken
        );

        this.router.get(
            '/auth/logout',
            authVerify.tokenValidate,
            AuthController.logout
        );
    }

    private postRouter(): void {
        this.router.post(
            '/auth/device',
            validate(deviceRegisterReq),
            authVerify.tokenValidate,
            AuthController.deviceRegister
        );

        this.router.post(
            '/auth/authentication',
            validate(loginReq),
            authVerify.tokenValidate,
            AuthController.authentication
        );

        this.router.post(
            '/auth/refresh-token',
            validate(refreshTokenReq),
            AuthController.refreshToken
        );
    }
}

export default new AuthRouter().router;