module.exports.getSignUpTemplateConfig = function (err) {
    let srcConfig = [
        {name: 'username', placeholder: 'Please enter your login', type: 'text', value: null, error: null},
        {name: 'email', placeholder: 'Please enter your email', type: 'email', value: null, error: null},
        {name: 'password', placeholder: 'Please enter your password', type: 'password', value: null, error: null},
        {name: 'confirm_password', placeholder: 'Please repeat your password', type: 'password', value: null, error: null}
    ];

    if (err) {
        srcConfig = srcConfig.map(fieldConfig => {
            if (err[fieldConfig.name]) {
                fieldConfig.error = err[fieldConfig.name];
            }

            return fieldConfig;
        });
    }

    return srcConfig;
};
