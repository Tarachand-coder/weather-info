import * as express from 'express';
import checkPermission from '../middlewares/permission.middleware';
import BlogController from '../controllers/blog.controller';
import validations from '../validations/blog.validation';
import authVerify from '../middlewares/auth.middleware';
import { validate }  from 'express-validation';
const { blogAddReq, blogUpdateReq } = validations;

class BlogRouter {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.allRegisterRoute();
    }

    private allRegisterRoute() {
        this.postRouter();
        this.getRouter();
        this.deleteRouter();
    }

    private postRouter(): void {
        this.router.post(
            '/blog',
            validate(blogAddReq),
            authVerify.tokenValidate,
            BlogController.addBlog
        );
        this.router.post(
            '/blog/:id',
            validate(blogUpdateReq),
            authVerify.tokenValidate,
            BlogController.updateBlog
        );
    }

    private getRouter(): void {
        this.router.get(
            '/blog/:id',
            authVerify.tokenValidate,
            BlogController.getBlogDetail
        );
        this.router.get(
            '/blog',
            authVerify.tokenValidate,
            BlogController.getBlog
        );
    }

    private deleteRouter(): void {
        this.router.delete(
            '/blog/:id',
            authVerify.tokenValidate,
            checkPermission.permission,
            BlogController.deleteBlog
        );
    }
} 

export default new BlogRouter().router;