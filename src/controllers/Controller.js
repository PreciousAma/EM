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
      return res.status(400).send({ 
              'status': 400,
              'message': 'All fields are required'
    });
    }

    const newUser = model.createUser(req.body); 
        return res.status(201).send({
            'status': 201,
            'data': newUser
        }); 
  },
    
    /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */ 
    login(req, res){
        if(!req.body.username && !req.body.password ){
            return res.status(400).send({ 
                'status': 400,
                'message': 'Bad Request'
      });
        }
       
        const user = model.login(req.body.username, req.body.password);
        return res.status(202).send({
            'status': 202,
            'data': user
        });
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
            return res.status(400).send({ 
                    'status': 400,
                    'message': 'Bad Request'
                });
        }
    const msg = model.createMessage(reqBody.senderEmail, reqBody.receiverEmail, reqBody.msg, reqBody.subject, reqBody.status) 
    return res.status(201).send({
        'status':201,
        'data':msg
    })
    },
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {object} user object
     */
    search(req,res){
        const user = model.determineUser(req.pid);
        return res.status(200).send(user);
        
    },

    /**
     * 
     * @param {object} req 
     * @param {object} res
     * @returns {object} inbox object
     */
    inbox(req,res){
        if(!req.params.userId){
            return res.status(404).send({ 
                'status': 400,
                'message': 'Page Not Found'
            });
        }
        const mail = model.inbox(req.params.userId); 
        return res.status(201).send({
            'status':201,
            'data':mail
        });
    },
    /**
     * 
     * @param {object} req 
     * @param {object} res
     * @returns {array} sent messages object
     */
    sent(req,res){
        if(!req.params.userId ){
            return res.status(404).send({ 
                'status': 404,
                'message': 'Page Not Found'
            });
        }
        const sentMsg = model.sent(req.params.userId);
        res.status(200).send({
            'status':200,
            'data':sentMsg});
    },

    msg(req,res){
        if(!req.params.userId && !req.params.msgId){
            return res.status(404).send({ 
                'status': 404,
                'message': 'Page Not Found'
            });
        }
        else{
            const msg = model.message(req.params.userId, req.params.msgId)
            return res.status(200).send({
                'status':200,
                'data': msg
            });
        }
    },
    deleteMsg(req,res){
        if(!req.params.userId && !req.params.msgId){
            return res.status(404).send({ 
                'status': 404,
                'message': 'Page Not Found'
            });
        }
        else{
            const msg = model.delete(req.params.userId, req.params.msgId)
            return res.status(200).send({
                'status':200,
                'data': msg
            });
        }
    },

    unread(req,res){
        if(!req.params.userId){
            return res.status(404).send({ 
                'status': 404,
                'message': 'Page Not Found'
            });
        }
        else{
            const msg = model.unread(req.params.userId)
            return res.status(200).send({
                'status':200,
                'data': msg
            });
        }
    },
}

module.exports = Controller;