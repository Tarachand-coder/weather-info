import { Request, Response } from 'express';
// import { bcrypt } from 'bcrypt';

type Data = string | Record<string, any> | any[];

// export const hashedPassword = async (plainText: String) => {
//     const salt = await bcrypt.genSalt(10);

//     return await bcrypt.hash(plainText, salt);
// }

export const successStatus = (res: Response, data: Data): Response => {
    const json = Array.isArray(data) ? { status: "success", data: data } : { status: "success", message: data };

    return res.status(200).json(json);
};

export const errorStatus = (res: Response, statusCode: number, message: string, errors: any = ''): Response => {
    const json = errors ? { status: "error", message: message, errors: errors } : { status: "error", message: message };

    return res.status(statusCode).json(json);
};