import { Router } from 'express';
import userRoute from './user.route';
import taskRouter from './task.route';
import authRoute from './auth.route';
import weatherRoute from './weather.route';
import blogRoute from './blog.route';

const router = Router();

router.use('', userRoute);
router.use('', taskRouter);
router.use('', authRoute);
router.use('', weatherRoute);
router.use('', blogRoute);

export default router;