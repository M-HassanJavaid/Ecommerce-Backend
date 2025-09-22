const { User } = require('../model/user.js')
const bcrypt = require('bcrypt')

async function signup(req , res) {
    try {
        let {name , email , password} = req.body;
        if (!name && !email && !password ) {
            res.send({
                ok: false,
                message: "Signup inputs are invalid"
            });
            return;
        }

        let hashedPassword = await bcrypt.hash(password , 10);

        let newUser = new User({
            name , 
            email , 
            password : hashedPassword, 
            role : 'user'
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
}

module.exports = {
    signup
}