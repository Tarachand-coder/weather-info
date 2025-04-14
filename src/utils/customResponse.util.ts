import { Response } from "express";

export interface IAPIParams {
    reqQuery?: any,
    reqBody?: any,
    reqParams?: any,
    reqHeaders?: any,
    resLocals?: any
}

export default class CustomResponse {
    static setResponse(res: Response, params: {
        httpCode: number,
        message: string,
        devMessage?: string,
        resData?: any;
        resCode?: number
    }): void {
        res.status(params.httpCode).json({
            responseCode: params.resCode,
            responseMessage: params.message,
            responseDevMessage: params.devMessage,
            responseData: params.resData || {} 
        });
    }
}