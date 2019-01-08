let express = require('express');
let router = express.Router();
let signUpInputValidator = require('../validators/user.sign.up.validator');
let signUpUser = require('./sign.up.user');

router.post('/sign-up', signUpInputValidator, signUpUser);
router.get('/sign-up', signUpUser);

module.exports = router;