const express = require('express');
const user = require('./src/controllers/Controller'); 

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:false}));
//const urlEncoder = bodyParser.urlencoded({extended:false})

app.post('/api/v1/auth/signup', user.create); 

app.post('/api/v1/auth/login', user.login);

app.post('/api/v1/messages', user.createMsg ); 

//test
app.post('/api/v1/search/:id', user.search); 

app.get('/api/v1/messages', (req, res)=>{
    
});

app.get('/api/v1/messages/unread', (req, res)=>{
    
});

app.get('/api/v1/messages/sent', (req, res)=>{
    
});

app.get('/api/v1/messages/:msgid', (req, res)=>{
    
});


app.delete('/api/v1/:msgid', (req, res)=>{
    
});

app.listen(3000, ()=>console.log('app running on port ', 3000))
