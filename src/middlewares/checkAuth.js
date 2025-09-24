const jwt = require('jsonwebtoken');

async function checkAuth(req , res , next){
    try {
        let token = req.cookies.token;
        if (!token) {
            res.send({
                ok: false,
                message: 'User is unauthorized.'
            });
            return
        }

        let decode =  jwt.verify(token , process.env.JWT_SECRET);

        req.user = decode;

        next()
    } catch (error) {
        res.send({
            ok: false,
            message: error.message
        })
    }
}

module.exports = {
    checkAuth
}