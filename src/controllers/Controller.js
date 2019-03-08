var model = require('../models/model.js')

const Controller = {
    
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */ 
    create(req, res) {
    if (!req.body.username && !req.body.firstname && !req.body.surname &&
!req.body.password && !req.body.phonenumber && !req.body.confirmpass ){ 
        console.log(req.body);
      return res.status(400).send({'message': 'All fields are required'})
    }
    const newUser = model.createUser(req.body); 
    console.log(req.body);
        return res.status(200).send(newUser); 
  },
    
    /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */ 
    login(req, res){
        if(!req.body.username && !req.body.password ){
            return res.status(400).send({'message': 'All fields are required'})
        }
        const user = model.login(req.body.username, req.body.password); 
        return res.status(200).send(user);
    },
    
    /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} message object 
   */ 
    createMsg(req, res){
        const reqBody = req.body;
        
        if(!reqBody.senderId && !reqBody.receiverId && !reqBody.msg && !reqBody.subject && !reqBody.status ){
            return res.status(400).send({'message': 'All fields are required'})
    }
    const msg = model.createMessage(reqBody.senderId, reqBody.receiverId, reqBody.msg, reqBody.subject, reqBody.status)
    },
    search(req,res){
        const user = model.determineUser(req.pid);
        console.log(user, 'user');
        return res.status(200).send(user);
        
    }
}

module.exports = Controller;