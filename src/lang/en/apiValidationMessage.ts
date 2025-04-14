export const responseMessage = {
	/**
	 * Common
	 */
	ADDRESS_FULL_ADDRESS_BASE: 'Full address must be a string',
	ADDRESS_FULL_ADDRESS_REQUIRED: 'Full address is required',
	ADDRESS_FULL_ADDRESS_EMPTY: 'Full address is not allowed to be empty',

	ADDRESS_ADDRESS_BASE: 'Address must be a string',
	ADDRESS_ADDRESS_REQUIRED: 'Address must be a string',
	ADDRESS_ADDRESS_EMPTY: 'Address is not allowed to be empty',

	ADDRESS_CITY_BASE: 'City must be a string',
	ADDRESS_CITY_REQUIRED: 'City is required',
	ADDRESS_CITY_EMPTY: 'City is not allowed to be empty',

	ADDRESS_STATE_BASE: 'State must be a string',
	ADDRESS_STATE_REQUIRED: 'State is required',
	ADDRESS_STATE_EMPTY: 'State is not allowed to be empty',

	ADDRESS_ZIP_CODE_BASE: 'Zipcode must be a string',
	ADDRESS_ZIP_CODE_REQUIRED: 'Zipcode is required',
	ADDRESS_ZIP_CODE_EMPTY: 'Zipcode is not allowed to be empty',

	ADDRESS_NEIGHBORHOOD_BASE: 'Neighborhood must be a string',
	ADDRESS_NEIGHBORHOOD_REQUIRED: 'Neighborhood is required',
	ADDRESS_NEIGHBORHOOD_EMPTY: 'Neighborhood is not allowed to be empty',

	ADDRESS_PROVINCE_CODE_BASE: 'Province code must be a string',
	ADDRESS_PROVINCE_CODE_REQUIRED: 'Province code is required',
	ADDRESS_PROVINCE_CODE_EMPTY: 'Province code is not allowed to be empty',

	ADDRESS_COUNTRY_BASE: 'Country must be a string',
	ADDRESS_COUNTRY_REQUIRED: 'Country is required',
	ADDRESS_COUNTRY_EMPTY: 'Country is not allowed to be empty',

	ADDRESS_COUNTRY_CODE_BASE: 'Country code must be a string',
	ADDRESS_COUNTRY_CODE_REQUIRED: 'Country code is required',
	ADDRESS_COUNTRY_CODE_EMPTY: 'Country code is not allowed to be empty',

	CONTACT_COUNTRY_CALLING_CODE_BASE: 'Country calling code must be a string',
	CONTACT_COUNTRY_CALLING_CODE_REQUIRED: 'Country calling code is required',
	CONTACT_COUNTRY_CALLING_CODE_EMPTY: 'Country calling code is not allowed to be empty',

	STATUS_BASE: 'Status must be a string',
	STATUS_REQUIRED: 'Status is required',
	STATUS_EMPTY: 'Status is not allowed to be empty',

	/**
	 * Auth
	 */
	AUTH_CLIENT_ID_BASE: 'Client id must be a string',
	AUTH_CLIENT_ID_REQUIRED: 'Client id is required',
	AUTH_CLIENT_ID_EMPTY: 'Client id is not allowed to be empty',
	AUTH_CLIENT_SECRET_BASE: 'Client secret must be a string',
	AUTH_CLIENT_SECRET_REQUIRED: 'Client secret is required',
	AUTH_CLIENT_SECRET_EMPTY: 'Client secret is not allowed to be empty',

	AUTH_AUTHORIZATION_BASE: 'Authorization must be a string',
	AUTH_AUTHORIZATION_REQUIRED: 'Authorization is required',
	AUTH_AUTHORIZATION_EMPTY: 'Authorization is not allowed to be empty',

	AUTH_DEVICE_ID_BASE: 'Device id must be a string',
	AUTH_DEVICE_ID_REQUIRED: 'Device id is required',
	AUTH_DEVICE_ID_EMPTY: 'Device id is not allowed to be empty',

	AUTH_LOGIN_EMAIL_ADDRESS_BASE: 'Email address must be a string',
	AUTH_LOGIN_EMAIL_ADDRESS_REQUIRED: 'Email address is required',
	AUTH_LOGIN_EMAIL_ADDRESS_EMPTY: 'Email address is not allowed to be empty',

	AUTH_LOGIN_PASSWORD_BASE: 'Password must be a string',
	AUTH_LOGIN_PASSWORD_REQUIRED: 'Password is required',
	AUTH_LOGIN_PASSWORD_EMPTY: 'Password is not allowed to be empty',

	AUTH_ACCESS_TOKEN_BASE: 'Access token must be a string',
	AUTH_REFRESH_TOKEN_BASE: 'Refresh token must be a string',

	AUTH_REQUEST_PANEL_BASE: 'Request panel must be a string',
	AUTH_REQUEST_PANEL_EMPTY: 'Request panel is not allowed to be empty',

	AUTH_HASH_BASE: 'Hash must be a string',
	AUTH_HASH_REQUIRED: 'Hash is required',
	AUTH_HASH_EMPTY: 'Hash is not allowed to be empty',

	/**
	 * Customer
	 */

	CUSTOMER_FIRST_NAME_BASE: 'User name must be a string',
	CUSTOMER_FIRST_NAME_REQUIRED: 'User name is required',
	CUSTOMER_FIRST_NAME_EMPTY: 'User name is not allowed to be empty',
	CUSTOMER_CONTACT_N_EMAIL_REQUIRED: 'At least one of the contacts or emails must be provided',
	CUSTOMER_LOCATION_MIN: 'locations must contain at least 1 items',
	CUSTOMER_STATUS_BASE: 'Status must be a string',
	CUSTOMER_STATUS_REQUIRED: 'Status is required',
	CUSTOMER_STATUS_EMPTY: 'Status is not allowed to be empty',
	CUSTOMER_ID_MIN: 'The array must contain at least one id',

	/**
	 * Tag
	 */
	TAG_NAME_BASE: 'Tag name must be a string',
	TAG_NAME_REQUIRED: 'Tag name is required',
	TAG_NAME_EMPTY: 'Tag name is not allowed to be empty',
	TAG_COLOR_BASE: 'Tag color must be a string',
	TAG_COLOR_REQUIRED: 'Tag color is required',
	TAG_COLOR_EMPTY: 'Tag color is not allowed to be empty',
	TAG_ID_MIN: 'The array must contain at least one id',

	/**
	 * User
	 */
	USER_NAME_BASE: 'User name must be a string',
	USER_NAME_REQUIRED: 'User name is required',
	USER_NAME_EMPTY: 'User name is not allowed to be empty',

	USER_FIRST_NAME_BASE: 'User name must be a string',
	USER_FIRST_REQUIRED: 'User name is required',
	USER_FIRST_EMPTY: 'User name is not allowed to be empty',

	USER_LAST_NAME_BASE: 'User name must be a string',
	USER_LAST_NAME_REQUIRED: 'User name is required',
	USER_LAST_NAME_EMPTY: 'User name is not allowed to be empty',

	USER_EMAIL_ADDRESS_BASE: 'Email address must be a string',
	USER_EMAIL_ADDRESS_REQUIRED: 'Email address is required',
	USER_EMAIL_ADDRESS_VALID: 'Email address must be a valid email',
	USER_EMAIL_ADDRESS_EMPTY: 'Email address is not allowed to be empty',

	USER_PHONE_NUMBER_BASE: 'Phone number must be a string',
	USER_PHONE_NUMBER_REQUIRED: 'Phone number is required',
	USER_PHONE_NUMBER_EMPTY: 'Phone number is not allowed to be empty',

	USER_ABOUT_ME_BASE: 'About me must be a string',
	USER_AVATAR_BASE: 'Avatar must be a string',
	USER_DOB_NUMBER_BASE: 'DOB must be a number',

	USER_PASSWORD_BASE: 'Password must be a string',
	USER_PASSWORD_REQUIRED: 'Password is required',
	USER_PASSWORD_EMPTY: 'Password is not allowed to be empty',

	USER_OLD_PASSWORD_BASE: 'Old password must be a string',
	USER_OLD_PASSWORD_REQUIRED: 'Old password is required',
	USER_OLD_PASSWORD_EMPTY: 'Old password is not allowed to be empty',

	COMPANY_STAFF_USER_NAME_BASE: 'Name must be a string',
	COMPANY_STAFF_USER_NAME_REQUIRED: 'Name is required',
	COMPANY_STAFF_USER_NAME_EMPTY: 'Name is not allowed to be empty',

	COMPANY_STAFF_USER_EMAIL_ADDRESS_BASE: 'Email address must be a string',
	COMPANY_STAFF_USER_EMAIL_ADDRESS_REQUIRED: 'Email address is required',
	COMPANY_STAFF_USER_EMAIL_ADDRESS_VALID: 'Email address must be a valid email',
	COMPANY_STAFF_USER_EMAIL_ADDRESS_EMPTY: 'Email address is not allowed to be empty',

	COMPANY_STAFF_USER_PHONE_NUMBER_BASE: 'Phone number must be a string',
	COMPANY_STAFF_USER_PHONE_NUMBER_REQUIRED: 'Phone number is required',
	COMPANY_STAFF_USER_PHONE_NUMBER_EMPTY: 'Phone number is not allowed to be empty',

	COMPANY_STAFF_USER_JOB_TITLE_BASE: 'Job title must be a string',
	COMPANY_STAFF_USER_JOB_TITLE_REQUIRED: 'Job title is required',
	COMPANY_STAFF_USER_JOB_TITLE_EMPTY: 'Job title is not allowed to be empty',

	COMPANY_STAFF_USER_ABOUT_ME_BASE: 'About me must be a string',
	COMPANY_STAFF_USER_AVATAR_BASE: 'Avatar must be a string'

};

export default {
	responseMessage
};
