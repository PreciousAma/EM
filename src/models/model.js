
const uuid = require('uuid');
const moment = require('moment');
//const emitter = require('emitter');

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
        
        const newUser ={
            id: uuid.v4(),
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
        console.log(userPassword, 'password');
        console.log(userName, 'email');
        if(userName.id === userPassword.id){
            return userName 
        }
        return false;
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
         var admin = this.users.find(groups => groups.group.find(ids => ids.id === id)) 
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
    createMessage(senderId, receiverId, message,subject,status){
        
        const receiver = this.determineUser(receiverId);
        const sender = this.determineUser(senderId);
        console.log(receiver, 'receiver');
        console.log(sender, 'sender')
        /*const receiverIndex = this.controller.indexOf(receiverId);*/
        if(receiverId !== receiver.id) return false;
        
        const newMsg = {
            id:uuid.v4(),
            createdOn: moment.now(),
            subject:subject,
            message: message,
            parentMessageId: uuid.v4(),
            status: status, //draft or sent
            messageId: uuid.v4(),
        }
        
        status === 'send'? (receiver.inbox.push({received:newMsg,
                                                 senderId: sender.id,
                                                }), 
                            sender.sent.push({sent:newMsg,
                                             receiverId:receiver.id})): sender.draft.push(newMsg);
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