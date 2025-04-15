
const constants = {
    BASE_ROUTES: '/api/',
    COLLECTIONS: {
        TASKS: 'tasks',
        USERS: 'users',
        DEVICES: 'devices',
        AUTH: 'auth',
        BLOGS: 'blogs'
    },
    STATUS: {
		ENABLED: 'enabled',
		DISABLED: 'disabled',
		DELETED: 'deleted',
		EXPRIRED: 'expired',
		CANCELED: 'canceled',
		ARCHIVED: 'archived',
	},
    USERTYPE: {
        ADMIN: 'admin',
        USER: 'user'
    },
    TOKEN_TYPE: {
        'ACCESS': 'Access',
        'BEARER': 'Bearer'
    },
    TOKEN: {
        EXPIRE_IN: '60d',
        REFRESH_IN: '90d'
    },
    ENCRYPTION_KEY: 'qazwsxedcrfvtgbyhnujmikolp1234!@',
	IV_LENGTH: 16,  
}

export default constants;