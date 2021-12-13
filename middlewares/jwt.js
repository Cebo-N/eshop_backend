const expressJwt = require('express-jwt');

const authentication = () =>{
    const secret = process.env.SECRET_KEY
    return expressJwt({
        secret,
        algorithms : ['HS256']
    })
}

module.exports = authentication