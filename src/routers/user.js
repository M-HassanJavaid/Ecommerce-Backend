const express = require('express');
const { User } = require('../model/user.js');
const { checkAuth } =  require('../middlewares/checkAuth.js')

const userRouter = express.Router();

userRouter.get('/profile' , checkAuth , async (req , res) => {
    try {
        let id = req.user.id;
        let user = await User.findById(id);
        if (!user) {
            res.status(404).send({
                ok: false,
                message: 'No user found.',
            });
            return
        }

        res.send({
            ok: true,
            message: 'User profile has successfully send!',
            user : user
        })

    } catch (error) {
        res.status(501).send({
            ok: false,
            message: 'Due to some internal server profile could not get.',
            error: error.message
        })
    }
})

module.exports={
    userRouter
}