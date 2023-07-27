const {request, response, json} = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User')

const createUser = async(req = request, res = response) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if ( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'A user exists with this email'
            })
        }

        user = new User( req.body );

        // Encrypt the password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        })
    }

}

const loginUser = async(req = request, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'User or password is incorrect - email'
            });
        }

        // Confirm password
        const validPassword = bcrypt.compareSync( password, user.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'User or password is incorrect - password'
            });
        }

        // Generate Jwt

        return res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        })
    }
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