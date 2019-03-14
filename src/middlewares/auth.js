const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    const bearerHeader = req.headers['authorization'];
    if(typeof(bearerHeader)!=='undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next()
    }
    else{
        res.sendStatus(403);
    }
    // if(req.headers.authorization){
    //     const token = req.headers.authorization.split(' ')[1];
    //     jwt.verify(token, process.env.SECRET, (err, decoded)=>{
    //         if(err){
    //             next(Error('Failed to authenticate token'))
    //         }
    //         else{
    //             req.decoded = decoded;
    //             next();
    //         }
    //     })
    // }
    // else(Error('No Token provided'));
}