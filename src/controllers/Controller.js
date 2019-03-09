var model = require('../models/model.js');

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
        
        if(!reqBody.senderEmail && !reqBody.receiverEmail && !reqBody.msg && !reqBody.subject && !reqBody.status ){
            return res.status(400).send({'message': 'All fields are required'})
        }
    const msg = model.createMessage(reqBody.senderEmail, reqBody.receiverEmail, reqBody.msg, reqBody.subject, reqBody.status) 
    return res.status(200).send(msg)
    },
    search(req,res){
        const user = model.determineUser(req.pid);
        console.log(user, 'user');
        return res.status(200).send(user);
        
    },

    /**
     * 
     * @param {object} req 
     * @param {object} res
     * @returns {array} inbox 
     */
    inbox(req,res){
        if(!req.body.user){
            return res.status(400).send({'message': 'All fields are required'})
        }
        const maill = model.inbox(req.body.user); 
        console.log(maill);
        return res.status(201).send(maill)
    },
    /**
     * 
     * @param {object} req 
     * @param {object} res
     * @returns {array} sent messages 
     */
    sent(req,res){
        if(!req.body.user){
            return res.status(400).send({'message': 'All fields are required'})
        }
        const sentMsg = model.inbox(req.body.user);
        res.status(201).send(sentMsg);
    },
}

module.exports = Controller;