const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../model/user.js');
const jwt = require('jsonwebtoken')

const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
    try {
        let { name, email, password } = req.body;
        if (!name && !email && !password) {
            res.send({
                ok: false,
                message: "Signup inputs are invalid"
            });
            return;
        }

        let hashedPassword = await bcrypt.hash(password, 10);

        let newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: 'user'
        });

        let savedUser = await newUser.save();
        res.send({
            ok: true,
            message: "User has successfully signup.",
            user: savedUser
        })
        console.log(savedUser)
    } catch (error) {
        res.status(500).send({
            ok: false,
            message: error.message,
        })
    }
});

authRouter.post('/login', async (req , res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            res.send({
                ok: false,
                message: 'Invalid credentials!'
            })
            return
        }

        let isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            res.send({
                ok: false,
                message: 'Inavlid Credentials'
            });
            return
        }

        let token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.cookie('token', token , {
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.send({
            ok: true,
            message: 'User has succefully login!'
        })

    } catch (error) {
        res.send({
            ok: false,
           message: error.message
        })
    }
})

module.exports = {
    authRouter
}