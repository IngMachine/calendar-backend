const {request, response, json} = require('express');
const createUser = (req = request, res = response) => {
    const { name, email, password } = req.body;

    if( name.length < 5 ) {
        return res.status(400).json({
            ok: false,
            msg: 'El nombre debe de ser de 5 letras'
        });
    }

    res.status(201).json({
        ok: true,
        name,
        email,
        password
    })
}

const loginUser = (req = request, res = response) => {
    const { email, password } = req.body;



    res.json({
        ok: true,
        email,
        password
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