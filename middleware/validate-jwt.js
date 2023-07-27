const {request, response} = require('express')
const jwt = require('jsonwebtoken')

const validateJwt = (req = request, res = response, next) => {
    // x-token headers
    const token = req.header('x-token');

    if ( !token )  {
        return res.status(401).json({
            ok: false,
            msg: 'No there is a token in the request'
        })
    }

    try {
        const {uid, name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )

        req.uid = uid;
        req.name = name;

    } catch (err) {
        return res.status(401).json({
            ok:false,
            msg: 'Token is invalid'
        })
    }
    next()
}

module.exports = {
    validateJwt
}