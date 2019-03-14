const user = require('../models/model'); 



module.exports = (req, res, next)=>{
    const uid = user.determinePerson(req.body.username)
    
    
    next();
};
 