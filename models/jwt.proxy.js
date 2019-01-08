class JWTProxy {
    static _instance = null;
    static getInstance () {
        if (!this._instance) {
            this._instance = new this();
        }

        return this._instance;
    }

    createJWTToken () {

    }

    assignJWTToUser () {

    }

    validateJWTToken () {

    }
}

module.exports = JWTProxy;