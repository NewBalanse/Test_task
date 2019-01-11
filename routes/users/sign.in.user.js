let userProxy = require('../../models/users.proxy');
let {getSingInTemplateConfig} = require('../../libs/template.login.manager');

module.exports = function (req, res) {
  if(req.method === 'GET'){
      res.render('login', {templateConfig: getSingInTemplateConfig()});
  }

  if(req.method === 'POST'){
      let SignIn = req.body;
      userProxy.getInstance()
          .loginUser(SignIn);
  }

};