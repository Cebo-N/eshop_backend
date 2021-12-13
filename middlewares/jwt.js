const expressJwt = require('express-jwt');

const authentication = () =>{
    const secret = process.env.SECRET_KEY
    const api = process.env.API_URL
    return expressJwt({
        secret,
        algorithms : ['HS256'],
        isRevoked : isRevoked
    }).unless({
        path : [
            {url : /\/api\/v1\/products(.*)/, method : ['GET','OPTIONS']},
            {url : /\/api\/v1\/categories(.*)/, method : ['GET','OPTIONS']},
            `${api}/users/login`,
            `${api}/users/register`
        ]
    })
}

const isRevoked = async(req, payload, done) =>{
    if(!payload.isAdmin){
        done(null, true)
    }
    done();
}

module.exports = authentication