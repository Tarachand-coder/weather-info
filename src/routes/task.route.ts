import exp from 'constants';
import * as express from 'express';
import TaskController from '../controllers/task.controller';
import { validate } from 'express-validation';
import validations from '../validations/task.validation';
import authVerify from '../middlewares/auth.middleware';
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
            // validate(taskUpdateReq),
            authVerify.tokenValidate,
            TaskController.updateTask
        );
    }
}

export default new TaskRouter().router;