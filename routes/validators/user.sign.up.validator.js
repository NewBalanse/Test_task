let {errorResponse} = require('../../libs/response.codes');
let {maxLength} = require('../../libs/utils');
let {getSignUpTemplateConfig} = require('../../libs/templates.manager');

module.exports = function (req, res, next) {
    let signUpRequest = req.body;
    let hasErrors = false;
    let errors = {
        username: null,
        email: null,
        password: null,
        confirm_password: null
    };

    if (typeof signUpRequest !== 'object') {
        next(new Error('Sign up request is invalid'));
    } else {
        if (!signUpRequest.username || !maxLength(signUpRequest.username)) {
            errors.password = 'Username is incorrect';
        }
        if (!signUpRequest.email || !maxLength(signUpRequest.email)) {
            errors.email = 'User email is incorrect';
        }
        if (!signUpRequest.password || !maxLength(signUpRequest.password)) {
            errors.password = 'User password is incorrect';
        }
        if (!signUpRequest.confirm_password || !maxLength(signUpRequest.confirm_password) ||
            signUpRequest.confirm_password !== signUpRequest.password) {
            errors.confirm_password = 'passwords don\'t equal';
        }

        if (hasErrors) {
            let templateConfig = getSignUpTemplateConfig(errors);
            res.render('registration', {templateConfig});
        } else {
            next();
        }
    }
};
