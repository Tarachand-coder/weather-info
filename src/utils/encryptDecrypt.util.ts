import * as crypto from 'crypto';
import constants from '../config/constants.config';

const { ENCRYPTION_KEY, IV_LENGTH } = constants;

export default class EncryptDecrypt {
	static encrypt(plainText: string): string {
		const iv = crypto.randomBytes(IV_LENGTH);
		const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
		let encrypted = cipher.update(plainText);
		encrypted = Buffer.concat([encrypted, cipher.final()]);
		return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
	}

	static decrypt(encryptedStr: string): string {
		const textParts = encryptedStr.split(':');
		const iv = Buffer.from(textParts.shift() || '', 'hex');
		const encryptedText = Buffer.from(textParts.join(':'), 'hex');
		const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
		let decrypted = decipher.update(encryptedText);
		decrypted = Buffer.concat([decrypted, decipher.final()]);
		return decrypted.toString();
	}
}
