import * as JWT from 'jsonwebtoken';
import { vars } from '../config/vars.config';
const { privateKey, publicKey } = vars;

class JWTService {
    private algo: any = 'RS256';

    public sign(payload: object, expiresIn: string = '30d'): string {
        const signOptions: object = {
            issuer: 'suraksha',
            subject: 'requestTokenForAppUser',
            audience: `AppUsers`,
            expiresIn,
            algorithm: this.algo
        };
        return JWT.sign(payload, privateKey, signOptions);
    }

    public verify(token: string, expiresIn: string = '30d') {
        const verifyOptions: object = {
            issuer: 'suraksha',
            subject: 'requestTokenForAppUser',
            audience: `AppUsers`,
            algorithm: this.algo
        };
        return new Promise((resolve, reject) => {
            JWT.verify(token, publicKey, verifyOptions, (error, decoded) => {
                if (error) {
                    reject(error);
                }else {
                    resolve(decoded);
                }
            });
        })
    }

    public checkTokenIsExpired = async (token: string): Promise<any> => new Promise<any>((resolve, reject) => {
		this.verify(token).then((data: any) => {
			resolve(false);
		}).catch((err: any) => {
			if (err.name === 'TokenExpiredError') {
				resolve(true);
			}
			else {
				reject(err);
			}
		});
	});
}

export default new JWTService();
