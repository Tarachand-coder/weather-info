import { errorManager, responseMessage }  from '../config/errorMessage.config';
import { Request, Response, NextFunction } from "express";
import CustomResponse from "../utils/customResponse.util";
import constants from '../config/constants.config'; 
const { STATUS, USERTYPE }  = constants;
const { BAD_REQUEST } = errorManager;
const { USER, ADMIN } = USERTYPE;

class checkPermission {
    public permission = async (req: Request, res: Response, next: NextFunction) => {
        const user = res.locals.user;
         if (user.userType == USER) {
            return CustomResponse.setResponse(res, {
                ...BAD_REQUEST,
                message: responseMessage.USER_00011
            }); 
        }
        next();
    }
}

export default new checkPermission();