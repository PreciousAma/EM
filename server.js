const express = require('express');
const user = require('./src/controllers/Controller'); 
const auth = require('./src/middlewares/auth'); 
const uid = require('./src/middlewares/uid');


const app = express();
app.use(express.json());
app.use(express.static('UI'));
app.use('/api/v1/auth/', auth);
app.use('/api/v1/auth/login',uid);
// app.use(express.urlencoded({extended:false}));
//const urlEncoder = bodyParser.urlencoded({extended:false})
app.get('/', (req,res)=>{
    res.status(200).sendFile(__dirname+'/UI/landing-page.html');
})
app.post('/api/v1/auth/signup', user.create); 

app.post('/api/v1/auth/login', user.login);

app.post('/api/v1/messages', user.createMsg); 

app.get('/api/v1/messages/:userId', user.inbox);

app.get('/api/v1/messages/unread/:userId', user.unread);

app.get('/api/v1/messages/sent/:userId',user.sent);

app.get('/api/v1/messages/:msgId/:userId', user.msg);

app.delete('/api/v1/:msgId/:userId', user.deleteMsg);

const port = process.env.PORT || 3000;

app.listen(port, ()=>console.log(`app running on port ${port}`))
