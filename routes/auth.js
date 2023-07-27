/*
    Rutas de Usuarios / Auth
    host + /api/auth
 */

const { Router } = require('express');
const router = Router();


const {
    createUser,
    loginUser,
    reNewToken
} = require('../controllers/auth')

router.post('/new', createUser );

router.post('/', loginUser );

router.get('/renew', reNewToken)

module.exports = router;