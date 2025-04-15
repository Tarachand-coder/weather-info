import exp from 'constants';
import * as express from 'express';
import checkPermission from '../middlewares/permission.middleware';
import TaskController from '../controllers/task.controller';
import validations from '../validations/task.validation';
import authVerify from '../middlewares/auth.middleware';
import { validate } from 'express-validation';
const { taskAddReq, taskUpdateReq } = validations;

class TaskRouter {
    public router: express.Router;
                    
    constructor() {
        this.router = express.Router();
        
        this.getRouter();
        this.postRouter();
        this.putRouter();
    }

    private getRouter(): void {
        this.router.get(
            '/tasks',
            authVerify.tokenValidate,
            TaskController.getTask
        );
        
        this.router.get(
            '/tasks/:id',
            authVerify.tokenValidate,
            checkPermission.permission,
            TaskController.getTaskDetail
        );
    }

    private postRouter(): void {
        this.router.post(
            '/tasks',
            validate(taskAddReq),
            authVerify.tokenValidate,
            TaskController.addTask
        );
    }

    private putRouter(): void {
        this.router.put(
            '/tasks/:id',
            validate(taskUpdateReq),
            authVerify.tokenValidate,
            TaskController.updateTask
        );
    }
}

export default new TaskRouter().router;