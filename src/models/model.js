require('custom-env').env(true);
const uuid = require('uuid');
const moment = require('moment');
//const emitter = require('emitter');
const jwt = require('jsonwebtoken');
class Controller{
    
    /**
   * class constructor
   * @param {object} data
   */
    constructor(){
        this.controller = [];
    }

    /**
   * 
   * @param {object} user object
   * @returns {object} controller object
   */
    createUser(userData){
        const  username = userData.username;
        const id = uuid.v4();
        const token = jwt.sign({username,id}, process.env.SECRET);
        const newUser ={
            id: id,
            token:token,
            email: userData.username || '',
            firstname: userData.firstname || '',
            lastname: userData.surname || '',
            password: userData.password || '',
            phoneNumber: userData.phonenumber || '',
            contacts: [],
            messages:[],
            sent:[],
            draft:[],
            inbox:[],
            group:[],

        };
        this.controller.push(newUser);
        return newUser
    }
      /**
   * 
   * @param {string} username
   * @param {string} password
   * @returns {object} user object || false
   */
    login(username, loginPassword){
           
        var userName = this.controller.find( name => name.email === username);
        var userPassword = this.controller.find(pass => pass.password === loginPassword);
        if(userName.id === userPassword.id){
            const id= userName.id;
            const token = jwt.sign({username,id},process.env.SECRET);
            return {
                // userName
                username,
                id,
                token
            } 
        }
        return false;
    }
    
      /**
   * 
   * @param {string} username
   * @returns {object} user object
   */
    determinePerson(username) { 
        return this.controller.find( name => name.email === username);
    }
       /**
   * 
   * @param {uuid} id
   * @returns {object} user object
   */
  determineUser(id) {
      //returns user object
    return this.controller.find( user => user.id == id);
  }
     /**
   * 
   * @param {uuid} groupId
   * @returns {object} group object
   */
    determineGroup(id){
         var admin = this.controller.find(groups => groups.group.find(ids => ids.id === id)) 
        var group = admin.group;
        return group.find(member => member.id == id);
    }
    /**
   * 
   * @param {uuid} SenderId
   * @param {uuid} RecieverId
   * @param {string} message
   * @param {string} subject
   * @param {string} status
   * @returns {object} newMsg object
   */
    createMessage(senderUsername, receiverUsername, message,subject,status){
        
        const receiver = this.determinePerson(receiverUsername);
        const sender = this.determinePerson(senderUsername);
        /*const receiverIndex = this.controller.indexOf(receiverId);*/
        // if(receiverUsername !== receiver.email) return false;
        const id = uuid.v4();
        const time = moment.now();
        const parentMsgId = uuid.v4();

        const newMsg = {
            id:id,
            createdOn: time,
            subject:subject,
            message: message,
            parentMessageId: parentMsgId,
            status: status, //draft or sent
            senderId: sender.id,
            receiverId:receiver.id
        };

        const receivedMsg = {
            id:id,
            createdOn: time,
            subject:subject,
            message: message,
            parentMessageId: parentMsgId,
            status: 'unread',
            senderId: sender.id,
            receiverId:receiver.id
        };
        status === 'send'? (receiver.inbox.push(receivedMsg), 
                            sender.sent.push(newMsg)): sender.draft.push(newMsg);
        sender.contacts.push(receiver.email);
        return newMsg
    }
    
    /**
   * 
   * @param {uuid} userId
   * @returns {array} inbox array
   */
    inbox(userId){
        const inboxMsg = this.determineUser(userId);
        return inboxMsg.inbox;
    }
    
    /**
   * 
   * @param {uuid} userId
   * @returns {array} sent array
   */
    sent(userId){

        const sentMsg = this.determineUser(userId);
        return sentMsg.sent;
    }
    
     
    /**
   * 
   * @param {uuid} userId
   * @returns {array} sent array
   */
    draft(userId){
        const draftMsg = this.determineUser(userId);
        return draftMsg.sent;
    }
        /**
     * 
     * @param {uuid} userId
     * @returns {object} unread object  
     */
    unread(userId){
        const user = this.determineUser(userId);
        var unread = user.inbox.filter(msg => msg.status=== 'unread')
        
        return unread;
    }

    /**
     * 
     * @param {uuid} userId
     * @param {uuid} msgId
     * @returns {object} message object  
     */
    message(userId, msgid){
        let allmsg =[];
        const user = this.determineUser(userId);
        allmsg = allmsg.concat(user.inbox, user.sent, user.draft);
        let theMsg = allmsg.find(msg=> msg.id===msgid);
        if(theMsg.status === 'unread'){
            theMsg.status = 'read';
        }
        return theMsg;
    }
        /**
     * 
     * @param {uuid} userId
     * @param {uuid} msgId
     * @returns {object} delete msg object  
     */
    delete(userId, msgid){
        const user = this.determineUser(userId);
        let allmsg = allmsg.concat(user.inbox, user.sent, user.draft);
        let msgToDel = allmsg.find(msg=>msg.id===msgid);
        if(user.inbox.includes(msgToDel)){
            let index = user.inbox.indexOf(msgToDel);
            user.inbox.splice(index,1);
            return user.inbox;
        }
        else if(user.sent.includes(msgToDel)){
            let index = user.sent.indexOf(msgToDel);
            user.sent.splice(index,1);
            return user.sent;
        }
        else if(user.draft.includes(msgToDel)){
            let index = user.draft.indexOf(msgToDel);
            user.draft.splice(index,1);
            return draft.inbox;
        }
        else return false;
    }
    
    /**
   * 
   * @param {string} Group name
   * @param {uuid} userId
   */
    createGroup(name, userId){
        var admin = this.determineUser(userId);
        const group ={
            id: uuid.v4(),
            name: name,
            admin: admin.id,
            groupMembers: [],
        }
        admin.group.push(group);
    }
    
     /**
   * 
   * @param {string} GroupId
   * @param {object} member
   */
     addMember(groupId,userId){
        let admin = this.determineUser(userId);
        var groups = this.determineGroup(groupId);
        var newUser ={
            groupId: groupId,
            memberId: userId
        }
        groups.groupMembers.push(newUser);
    }
}


module.exports =  new Controller();