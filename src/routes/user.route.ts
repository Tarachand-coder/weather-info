import * as express from 'express';
import checkPermission from '../middlewares/permission.middleware';
import UserController from '../controllers/user.controller';
import validations from '../validations/user.validation';
import authVerify from '../middlewares/auth.middleware';
import { validate }  from 'express-validation';
const { userAddReq, userUpdateReq, RegisterReq, userProfileReq } = validations;

class UserRouter {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.allRegisterRoute();
    }

    private allRegisterRoute() {
        this.getRouter();
        this.postRouter();
        this.putRouter();
        this.deleteRouter();
    }

    private getRouter(): void {
        this.router.get(
            '/users/profile',
            authVerify.tokenValidate,
            UserController.getProfile
        );
        this.router.get(
            '/users',
            authVerify.tokenValidate,
            UserController.getUser
        );
        this.router.get(
            '/users/:id',
            authVerify.tokenValidate,
            UserController.getUserDetail
        );
    }

    private postRouter(): void {
        this.router.post(
            '/users',
            validate(userAddReq),
            authVerify.tokenValidate,
            checkPermission.permission,
            UserController.addUser
        );

        this.router.post(
            '/register',
            validate(RegisterReq),
            authVerify.tokenValidate,
            UserController.register
        );
    }

    private putRouter(): void {
        this.router.put(
            '/users/:id',
            validate(userUpdateReq),
            authVerify.tokenValidate,
            checkPermission.permission,
            UserController.updateUser
        );
        this.router.put(
            '/users/profile/:id',
            validate(userProfileReq),
            authVerify.tokenValidate,
            UserController.updateProfile
        );
    }

    private deleteRouter(): void {
        this.router.delete(
            '/users/:id',
            authVerify.tokenValidate,
            checkPermission.permission,
            UserController.deleteUser
        );
    }
} 

export default new UserRouter().router;