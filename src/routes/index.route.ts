import { Router } from 'express';
import weatherRoute from './weather.route';
import taskRouter from './task.route';
import userRoute from './user.route';
import authRoute from './auth.route';
import blogRoute from './blog.route';

const router = Router();

router.use('', userRoute);
router.use('', taskRouter);
router.use('', authRoute);
router.use('', weatherRoute);
router.use('', blogRoute);

export default router;