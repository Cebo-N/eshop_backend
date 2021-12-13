
const handleError = (err, req, res,next) =>{
    if(err){
        res.status(err.status).send(
           err
        )
    }
}

module.exports = handleError