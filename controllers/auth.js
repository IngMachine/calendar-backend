const {request, response, json} = require('express');
const User = require('../models/User')


const createUser = async(req = request, res = response) => {

    try {
        const user = new User( req.body );
        await user.save();

        res.status(201).json({
            ok: true,
            msg: 'register'
        })
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}

const loginUser = (req = request, res = response) => {
    const { email, password } = req.body;

    res.status(200).json({
        ok: true,
    })
}

const reNewToken = (req, res = response) => {
    res.json({
        ok: true
    })
}


module.exports = {
    createUser,
    loginUser,
    reNewToken
}