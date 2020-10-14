/**
 * configuration
 */
const configuration = {
    database : {},
    auth : {}
};


/**
 * Database configuration
 */

configuration.database = {
    dialect: 'mysql',
    database: 'store',
    username: 'root',
    password: 'infiniti',
    models: [__dirname + '/../models/'],
    db_sync : false, // true means it will create the table
}

/**
 * Basic auth configuration
 */
configuration.auth = {
    basic_auth : {
        'admin': 'admin@123'
    },
    rate_limit : {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs,
        message: 'Too many accounts created from this IP, please try again after an hour'
    },
    request_decryption : true,
    response_encryption: false
}

export default configuration;