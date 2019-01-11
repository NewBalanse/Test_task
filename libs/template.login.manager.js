module.exports.getSingInTemplateConfig = function (err) {

    let srcConfig = [
        {name: 'email', placeholder: 'Please enter your email', type: 'email', value: null, error: null},
        {name: 'password', placeholder: 'Please enter your password', type: 'password', value: null, error: null}
    ];

    console.log(srcConfig);
    if(err){
        srcConfig = srcConfig.map(fieldConfig => {
            if(err[fieldConfig.name]){
                fieldConfig.error = err[fieldConfig.name];
            }

            return fieldConfig;
        });
    }

    return srcConfig;
};