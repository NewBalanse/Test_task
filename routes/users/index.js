let express = require('express');
let router = express.Router();

let signUpInputValidator = require('../validators/user.sign.up.validator');
let signUpUser = require('./sign.up.user');
let signInInputValidator = require('../validators/user.sign.in.validator');
let signInUser = require('./sign.in.user');

router.post('/sign-up',signUpInputValidator(), signUpUser());
router.get('/sign-up', signUpUser());

router.post('/sign-in', signInInputValidator(), signInUser());
router.get('/sign-in', signInUser);

module.exports = router;