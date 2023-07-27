const {request, response, json} = require('express');
const createUser = (req = request, res = response) => {
    const { name, email, password } = req.body;

    res.status(201).json({
        ok: true
    })
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