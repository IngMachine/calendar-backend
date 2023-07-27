const {request, response, json} = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User')
const {generateJWT} = require("../helpers/jwt");

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

        // Generate token
        const token = await generateJWT( user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
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

        // Generate token
        const token = await generateJWT( user.id, user.name);

        return res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        })
    }
}

const reNewToken = async(req, res = response) => {
    const { uid, name } = req;

    // Generate token
    const token = await generateJWT( uid, name);

    res.json({
        ok: true,
        token
    })
}


module.exports = {
    createUser,
    loginUser,
    reNewToken
}