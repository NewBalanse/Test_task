let mysql = require('mysql');
let {DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD, DB_CHARSET} = require('../config');
let mysqlConnection = null;

/**
 * @param {{
 *  dbName: string
 * }} dbParams
 * @param {Function} callback
 */
module.exports.createConnection = function (dbParams, callback) {
    let {dbName} = dbParams || {};

    if (!mysqlConnection) {
        mysqlConnection = mysql.createConnection({
            host: DB_HOST,
            user: DB_USERNAME,
            password: DB_PASSWORD,
            charset: DB_CHARSET,
            database: dbName || DB_NAME
        });

        mysqlConnection.connect((err) => {
            if (err) {
                return console.error('Error when try to connect to mysql', err);
            }

            if (callback) {
                callback();
            }
        });
    }
};

module.exports.closeConnection  = function () {
    if (mysqlConnection) {
        mysqlConnection.end();
    }
};

module.exports.db = function () {
    return mysqlConnection;
};
