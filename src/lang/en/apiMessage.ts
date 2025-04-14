export const responseMessage = {

	/**
	 * Common message
	 */

	INTERNAL_SERVER_ERROR: 'Internal server error',
	UNAUTHORIZED_ACCESS_SERVICE_ERROR: 'You are not authorize to access service.',

	/**
	 * Auth messages
	 */
	AUTH_0001: 'Request token retrieved',
	AUTH_0002: 'Login success',
	AUTH_0003: 'Please login',
	AUTH_0004: 'Your password was changed successfully.',
	AUTH_0005: 'Invalid username or password.',
	AUTH_0006: 'You are inactivated by Admin',
	AUTH_0007: 'Invalid username or password.',
	AUTH_0008: 'Access token expired',
	AUTH_0009: 'Reset password failed',
	AUTH_0010: 'Invalid bearer token',
	AUTH_0011: 'Bearer token expired',
	AUTH_0012: 'Invalid access token',
	AUTH_0013: 'Device registered',
	AUTH_0014:
		"Password reset link sent! You'll receive an email if you are registered on our system.",
	AUTH_0015: 'Your password was changed successfully.',
	AUTH_0016: 'Invalid access or refresh token',
	AUTH_0017: 'You are logged out',
	AUTH_0018: 'Error in logout',
	AUTH_0019: 'Presigned url retrieved',
	AUTH_0020:
		'The recovery link you selected has expired. Re-submit your email address to receive a new recovery link.',
	AUTH_0021:
		'The recovery link you selected has expired. Re-submit your email address to receive a new recovery link.',
	AUTH_0022: 'Client credential is invalid',
	AUTH_0023: 'Company Login Token',

	// Mobile API message
	AUTH_0030: 'Otp insert error',
	AUTH_0031: 'OTP Sent Successfully',
	AUTH_0032: 'The OTP entered is incorrect. Please try again.',
	AUTH_0033: 'OTP expired',
	AUTH_0034: 'OTP Verified successfully',
	AUTH_0035: 'User not found',

	/**
	* Customer
	*/
	CUST_0001: 'Customer added successfully',
	CUST_0002: 'Customer detail retrieved',
	CUST_0003: 'Customer already exists with this email',
	CUST_0004: 'No customer found',
	CUST_0005: 'Customer updated successfully',
	CUST_0006: 'Customer list retrieved',
	CUST_0007: 'Customer(s) deleted successfully',
	CUST_0008: 'Status updated successfully',
	CUST_0009: 'Duplicate contact number found',
	CUST_0010: 'At least one primary phone number is required',
	CUST_0011: 'At least one primary email is required',
	CUST_0012: 'Duplicate email found',
	CUST_0013: 'Email address is already exists',
	CUST_0014: 'Carrier name is mandatory when customer type is carrier',
	/**
	 * Master date formats
	 */

	MASTER_DATE_TIME_FORMAT_0001: 'No date and time format found',
	MASTER_DATE_TIME_FORMAT_0002: 'Date and time format list retrieved.',

	/**
	 * Master date formats
	 */

	MASTER_UNIT_OF_MEASURE_0001: 'No unit of measure found',
	MASTER_UNIT_OF_MEASURE_0002: 'Unit of measure list retrieved.',

	/**
	 * Master date formats
	 */

	MASTER_LANGUAGE_0001: 'No language found',
	MASTER_LANGUAGE_0002: 'Language list retrieved.',

	/**
	 * Master date formats
	 */

	MASTER_CURRENCY_0001: 'No currency found',
	MASTER_CURRENCY_0002: 'Currency list retrieved.',

	/**
	 * Status type messages
	 */
	ST_0001: 'Status type list retrieved',
	ST_0002: 'Status type detail retrieved',
	ST_0003: 'Status type updated successfully',
	ST_0004: 'No status type found',
	ST_0005: 'Alias already exist',
	ST_0006: 'Reordered successfully',
	ST_0007: 'Reordering failed',

	/**
	  * Tag message
	  */
	TAG_0001: 'Tag created successfully',
	TAG_0002: 'Tag detail retrieved',
	TAG_0003: 'Tag updated successfully',
	TAG_0004: 'Tag(s) deleted successfully',
	TAG_0005: 'Tag list retrieved',
	TAG_0006: 'Reordered successfully',
	TAG_0007: 'No tag found',
	TAG_0008: 'Reordering failed',
	TAG_0009: 'Tag(s) already exists',
	TAG_0010: 'Status updated successfully',

	/**
	 * User message
	 */
	US_0001: 'User Created Successfully',
	US_0002: 'User detail retrieved',
	US_0003: 'User detail updated',
	US_0004: 'User(s) deleted successfully',
	// List of user
	US_0005: 'User list retrieved',
	US_0006: 'Reordered successfully',
	US_0007: 'No user found ',

	US_0008: 'Reordering failed',
	US_0009: 'User already exists',
	US_0010: 'Status updated successfully',
	// add user
	US_0011: 'Email has already been taken',
	US_0012: "User can't be created. Please try again.",
	US_0013: "User can't be updated. Please try again.",
	US_0014: 'User updated successfully ',
	US_0015: "Mail can't be sent. Please try again.",
	US_0016: 'Email sent successfully.',
	US_0017: 'All Companies',
	US_0018: 'Send otp successfully',

	// Profile Change
	US_0019: 'Current password is incorrect',
	US_0020: "User can't be updated. Please try again. ",
	US_0021: 'User Updated Successfully',
	US_0022: 'User profile',
	US_0023: 'User added successfully',
	US_0024: 'Old password or new password are required',
	US_0025: 'User Profile Updated Successfully',
	US_0026: "User profile can't be updated. Please try again. ",
	US_0027: 'User found',
	// Status and delete
	US_0028: 'User(s) deleted successfully ',
	US_0029: 'Status updated successfully',
	US_0030: 'Status  can\'t be deleted. Please try again. ',
	US_0031: 'Status  can\'t be updated. Please try again.',
	US_0032: 'Company created successfully.',
	US_0033: 'Company can\'t be created. Please try again. Please use another email address',
	US_0034: 'Company data has been created.',
	US_0035: 'Company data can\'t be created. Please try again..',
	US_0036: 'No user added',
	US_0037: 'No user found',
	US_0038: 'Location changed successfully',
	US_0039: 'Company can\'t be changed. Please try again..',
	US_0040: 'User email sent successfully',
	US_0041: 'Incorrect otp successfully',
	US_0042: 'correct otp successfully',
	US_0043: 'Invalid payment mode can\'t be updated. Please try again.',
	US_0044: 'No payment method found.',
	US_0045: 'Payment method updated successfully.',
	US_0046: 'Payment method can\'t be updated. Please try again.',
	US_0047: 'No Companies',

	/**
	 * Incident Report
	 */
	INCIDENT_REPORT_0001: 'Incident report added successfully',
	INCIDENT_REPORT_0002: 'Incident report detail retrieved',
	INCIDENT_REPORT_0003: 'Incident report list retrieved',
	INCIDENT_REPORT_0004: 'No incident report found',
	INCIDENT_REPORT_0005: 'Incident report update successfully',

	/**
	 * Training Module
	 */
	TRAINING_MODULE_0001: 'Training module added successfully',
	TRAINING_MODULE_0002: 'Training module detail retrieved',
	TRAINING_MODULE_0003: 'Training module list retrieved',
	TRAINING_MODULE_0004: 'No training module found',
	TRAINING_MODULE_0005: 'Training module update successfully',
	TRAINING_MODULE_0006: 'File permission updated successfully',
	TRAINING_MODULE_0007: 'Notification updated successfully',

	/**
	 * Training History
	 */
	TRAINING_HISTORY_0001: 'Training history added successfully',
	TRAINING_HISTORY_0002: 'Training history detail retrieved',
	TRAINING_HISTORY_0003: 'Training history list retrieved',
	TRAINING_HISTORY_0004: 'No training history found',
	TRAINING_HISTORY_0005: 'Training history already exist',
	TRAINING_HISTORY_0006: 'Training history update successfully'
};

export default {
	responseMessage
};
