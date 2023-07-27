const {response} = require('express');
const createUser = (req, res = response) => {
    res.json({
        ok: true
    })
}

const loginUser = (req, res = response) => {
    res.json({
        ok: true
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