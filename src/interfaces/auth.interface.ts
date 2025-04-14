export interface ITokenReq {
    apiClientId?: string;
	apiClientSecret?: string;
	grantType?: string;
	requestFrom?: string;
}

export interface IDeviceReq {
	deviceId: string;
	deviceToken?: string;
	timezone?: string;
	deviceOs?: string;
	deviceName?: string;
	pushToken?: string;
	platformEndpoint?: string;
	deviceType?: string;
}

export interface ILoginReq {
	email: string;
	password: string;
}

export interface ILoginRes {
	token: string;
	tokenType: string;
	refreshToken: string;
}

export interface ITokenRes {
	token: string;
	tokenType: string
}
export interface IRefreshTokenReq {
	accessToken: string,
	refreshToken: string
}