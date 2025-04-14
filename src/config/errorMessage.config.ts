export const errorManager = {
	INTERNAL_SERVER_ERROR: {
		httpCode: 500,
		resCode: 0,
		message: 'Internal sever error',
	},
    BAD_REQUEST: {
        httpCode: 400,
		resCode: 0,
		message: 'Bad request',
    },
    SUCCESS: {
        httpCode: 200,
        resCode: 1,
        message: 'Success',
    },
    ALERTSUCCESS: {
        httpCode: 200,
        resCode: 0,
    },
    UNAUTHORIZED: {
		httpCode: 401,
		resCode: 0,
		message: 'You are not authorize to access service.'
	},
    NOT_FOUND: {
        httpCode: 404,
        resCode: 0,
		message: 'Page not found.'
    }
}

export const responseMessage = {
    AUTH001: 'No Token Provided',
    AUTH002: 'User register successfully',
    AUTH003: 'User not found',
    AUTH004: 'Invalid password',
    AUTH005: 'Login successfully',
    AUTH006: 'Bearer token invalid',
    AUTH007: 'Bearer token has expired',
    AUTH008: 'Client details invalid',
    AUTH009: 'Unauthorized User',

    TASK_0001: 'Task added successfully',
    TASK_0002: 'Task update successfully',
    TASK_0003: 'Task detail',
    TASK_0004: 'Task not found',

    USER_0001: 'User list',
    USER_0002: 'User added successfully',
    USER_0003: 'User update successfully',
    USER_0004: 'User delete successfully',
    USER_0005: 'User not found',
    USER_0006: "User wasn't added",
    USER_0007: "Profile data not found",
    USER_0008: "Profile detail",
    USER_0009: 'Username is already exist',
    USER_00010: 'Email is already exist',
    USER_00011: 'Access denied',
    USER_00012: 'Profile update successfully',
    USER_00013: 'Invalid user',

    WEATHER_INFO_001: 'Weather Information',

    BLOG_0001: 'Blog list',
    BLOG_0002: 'Blog added successfully',
    BLOG_0003: 'Blog update successfully',
    BLOG_0004: 'Blog delete successfully',
    BLOG_0005: 'Blog not found',
    BLOG_0006: 'Blog detail',
    BLOG_0007: "Blog was't deleted",
}

export default { 
    errorManager,
    responseMessage 
}