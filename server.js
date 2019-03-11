const express = require('express');
const user = require('./src/controllers/Controller'); 

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:false}));
//const urlEncoder = bodyParser.urlencoded({extended:false})

app.post('/api/v1/auth/signup', user.create); 

app.post('/api/v1/auth/login', user.login);

app.post('/api/v1/messages', user.createMsg ); 

app.get('/api/v1/messages', user.inbox);

app.get('/api/v1/messages/unread', (req, res)=>{
    
});

app.get('/api/v1/messages/sent',user.sent);

app.get('/api/v1/messages/:msgid', (req, res)=>{
    
});


app.delete('/api/v1/:msgid', (req, res)=>{
    
});
const port = process.env.PORT || 3000;

app.listen(port, ()=>console.log(`app running on port ${port}`))
