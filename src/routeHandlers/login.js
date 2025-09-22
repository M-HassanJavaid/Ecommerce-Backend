const { User } = require('../model/user.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function login(req , res) {
    try {
        let { email , password } = req.body;
        let user = await User.findOne({email});
        if (!user) {
            res.send({
                ok: false,
                message: 'Invalid credentials!'
            })
            return
        }

        let isPasswordMatch = await bcrypt.compare(password , user.password);

        if (!isPasswordMatch) {
            res.send({
                ok: false,
                message: 'Inavlid Credentials'
            });
            return
        }

        let token = jwt.sign(
            {
                uid: user._id,
                role: user.role,
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.cookie('token' , token )

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
}

module.exports = {
    login
}