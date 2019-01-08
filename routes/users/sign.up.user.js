let usersProxy = require('../../models/users.proxy');
let {getSignUpTemplateConfig} = require('../../libs/templates.manager');

module.exports = function (req, res) {
    if (req.method === 'GET') {
        res.render('registration', {templateConfig: getSignUpTemplateConfig()})
    }

    if (req.method === 'POST') {
        let signUpObj = req.body;
        usersProxy.getInstance()
            .createUserAccound(signUpObj)
            .then(userData => res.render('successful.registration', {userData}))
    }
};
