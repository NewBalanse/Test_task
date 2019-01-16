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
            db().query(`INSERT INTO users (username, email, password) VALUES ('${userObj.username}', '${userObj.email}', '${passwordData.password}');`
                , (err, result, fields) => {
                    if (err) {
                        reject(err);
                    }

                    let ReturnedUserObj = {
                        username: userObj.username,
                        email: userObj.email
                    };

                    resolve(ReturnedUserObj);
                });
        });
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
            let pass = this._generateUserPassword(userObj.password);
            let mail = userObj.email;

            db().query(`SELECT * FROM users WHERE email = '${mail}' && password = '${pass.password}';`
                , (err, result, fields) => {
                    if (err) {
                        reject(err);
                    }

                    let SqlPassword = result[0].password

                    if (this._validateUserPassword(pass.password, SqlPassword)) {
                        let ReturnedUserObj = {
                            username: result[0].username,
                            email: result[0].email,
                        };
                        resolve(ReturnedUserObj);
                    }
                });
        });
    }

    /**
     *
     * @returns {{
         *  password: string
         * }}
     * @private
     */
    _generateUserPassword(rawPassword) {
        let cipher = crypto.createCipher('aes-128-cbc', 'X2yhsg3j');
        let crypted = cipher.update(rawPassword, 'utf8', 'hex');
        crypted += cipher.final('hex');

        return {
            password: crypted
        };
    }

    /***
     *
     * @param rawPassword : string
     * @returns {{
         * password: string
         * }}
     * @private
     */
    _DecryptUserPassord(rawPassword) {
        let decipher = crypto.createDecipher('aes-128-cbc', 'X2yhsg3j');
        let crypted = decipher.update(rawPassword, 'hex', 'utf8');
        crypted += decipher.final('utf8');


        return {
            password: crypted
        };
    }

    /***
     *
     * @param password:string
     * @param passwordHash:string
     * @returns {boolean}
     * @private
     */
    _validateUserPassword(password, passwordHash) {
        if (passwordHash === password) {
            return true;
        }

        return false;
    }
}

module.exports = UsersProxy;
