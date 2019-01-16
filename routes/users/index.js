let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');
let parserUrlencoded = bodyParser.urlencoded({extended: false});

let userProxy = require('../../models/users.proxy');

let {maxLength} = require('../../libs/utils');
let {getSignUpTemplateConfig} = require('../../libs/templates.manager');
let {getSignInTemplateConfig} = require('../../libs/template.login.manager');

router.post('/sign-in', parserUrlencoded, (req, res, next) => {
    let SignInRequest = req.body;
    let hasError = false;

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
            hasError = true;
        }
        if (!SignInRequest.password || !maxLength((SignInRequest.password))) {
            errors.password = 'User password is incorrect';
            hasError = true;
        }
    }

    if (hasError) {
        let templateConfig = getSignInTemplateConfig(errors);
        res.render('login', {templateConfig});
    } else {
        userProxy.getInstance()
            .loginUser(SignInRequest)
            .then(userData => res.send({userData}));
    }
});


router.post('/sign-up', parserUrlencoded, (req, res, next) => {

    let signUpRequest = req.body;

    let hasError = false;
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
            errors.username = 'Username is incorrect';
            hasError = true;
        }
        if (!signUpRequest.email || !maxLength(signUpRequest.email)) {
            errors.email = 'User email is incorrect';
            hasError = true;
        }
        if (!signUpRequest.password || !maxLength(signUpRequest.password)) {
            errors.password = 'User password is incorrect';
            hasError = true;
        }
        if (!signUpRequest.confirm_password || !maxLength(signUpRequest.confirm_password) ||
            signUpRequest.confirm_password !== signUpRequest.password) {
            errors.confirm_password = 'passwords don\'t equal';
            hasError = true;
        }
    }


    if (hasError) {
        let templateConfig = getSignUpTemplateConfig(errors);
        res.render('registration', {templateConfig});
    } else {
        userProxy.getInstance()
            .createUserAccound(signUpRequest)
            .then(userData => res.send({userData}));
    }
});
router.get('/sign-up', (req, res) => {
    res.render('registration', {templateConfig: getSignUpTemplateConfig()});
});

router.get('/sign-in', (req, res) => {
    res.render('login', {templateConfig: getSignInTemplateConfig()})
});

module.exports = router;