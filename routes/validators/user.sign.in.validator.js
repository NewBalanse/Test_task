let {errorResponse} = require('../../libs/response.codes');
let {maxLength} = require('../../libs/utils');
let {getSignInTemplateConfig} = require('../../libs/template.login.manager');

module.exports = function (req, res, next) {
    let SignInRequest = req.body;
    let hasErrors = false;
    let errors = {
        email: null,
        password: null
    };

    if (typeof SignInRequest !== 'object') {
        next(new Error('Sign in request is invalid'));
    }
    else {
        if (!SignInRequest.email || !maxLength(SignInRequest.email)) {
            errors.email = 'User email is incorrect';
        }
        if (!SignInRequest.password || !maxLength((SignInRequest.password))) {
            errors.email = 'User password is incorrect';
        }

        if (hasErrors) {
            let templateConfig = getSignInTemplateConfig(errors);
            res.render('login', {templateConfig});
        } else {
            next();
        }

    }
};