const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
import CustomResponse from '../utils/customResponse.util';
import { errorManager, responseMessage } from '../config/errorMessage.config';
const { BAD_REQUEST } = errorManager;

// const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
//     const token = req.headers["authorization"]?.split(" ")[1];
//     if (!token) {
//         return CustomResponse.setResponse(res, {
//             ...BAD_REQUEST,
//             message: responseMessage.AUTH001,
//             resData: {}
//         });
//     }
// } 