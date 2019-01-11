let {db} = require('../libs/database');
let crypto = require('crypto');

let _instance = null;

class UsersProxy {
    static getInstance() {
        if (!_instance) {
            _instance = new this();
        }

        return _instance;
    }

    /**
     * @param {{
     *  username: string,
     *  password: string,
     *  email: string
     * }} userObj
     * @returns {Promise<{
     *  username: string,
     *  email: string
     * }>}
     */
    createUserAccound(userObj) {
        return new Promise((resolve, reject) => {
            let passwordData = this._generateUserPassword(userObj.password);
            db().query(`
                INSERT INTO users (username, email, password)
                VALUES (${userObj.username}, ${userObj.email}, ${password});
            `, (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }

                let userObj = {
                    username: rows[0].username,
                    email: rows[0].email
                };

                resolve(userObj);
            });
        })
    }

    /***
     *
     * @param {{
     * email: string,
     * password: string
     * }} userObj
     * @returns {Promise<{
     * email: string
     * username: string
     * }>}
     */
    loginUser(userObj) {
        return new Promise((resolve, reject) => {
            let pass = userObj.password;

            db.qeury(`
            SELECT * from users 
            WHERE email = '${userObj.email}'; 
            `,
                (err, result, fields) => {
                    if (err) {
                        return reject(err);
                    }


                    let SqlPassword = result[0].password

                    let _isValid = this._validateUserPassword(pass, SqlPassword);

                    if (_isValid) {
                        let ReturnedUserObj = {
                            username: result[0].username,
                            email: result[0].email,
                        };

                        resolve(ReturnedUserObj);
                    }
                });
        })
    }

    getUserData() {

    }

    /**
     *
     * @param {string} rawPassword
     * @returns {{
     *  salt: string,
     *  password: string
     * }}
     * @private
     */
    _generateUserPassword(rawPassword) {
        let salt = this._generateSalt();
        let hmac = crypto.createHmac('sha512', salt)
            .update(rawPassword);
        return {
            salt,
            password: hmac.digest('hex')
        };
    }

    /**
     *
     * @param {number} length
     * @returns {string}
     * @private
     */
    _generateSalt(length = 15) {
        return crypto.randomBytes(Math.ceil(length / 2))
            .toString('hex');
    }

    _validateUserPassword(password, passwordHash) {
        let tmpPassword;

        if(password == tmpPassword){
            return true;
        }

        return false;
    }
}

module.exports = UsersProxy;
