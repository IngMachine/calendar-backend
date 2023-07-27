/*
    Rutas de Usuarios / Auth
    host + /api/auth
 */

const { Router } = require('express');
const { check } = require('express-validator')

const router = Router();

const {
    createUser,
    loginUser,
    reNewToken
} = require('../controllers/auth')
const {fieldsValidators} = require("../middleware/fields-validators");

router.post(
    '/new',
    [
        // middleware
        check('name', 'The name is required and cannot be empty').not().isEmpty(),
        check('email', 'The email is required').not().isEmpty(),
        check('email', 'The email does not comply with the format').isEmail(),
        check('password', 'The password is required').not().isEmpty(),
        check('password', 'The password must be greater than or equal to 6 characters.').isLength({min: 6}),
        fieldsValidators
    ],
    createUser
);

router.post(
    '/',
    [
        check('email', 'The email is required').not().isEmpty(),
        check('email', 'The email does not comply with the format').isEmail(),
        check('password', 'The password is required').not().isEmpty(),
        check('password', 'The password must be greater than or equal to 6 characters.').isLength({min: 6}),
        fieldsValidators
    ],
    loginUser
);

router.get('/renew', reNewToken)

module.exports = router;