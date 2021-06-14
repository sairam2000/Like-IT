const express = require('express');
const mongoose = require('mongoose');
const {MONGOURI} = require('./keys');
const app = express();
const signup = require('./routes/signup');
const signin = require('./routes/signin');
const posts = require('./routes/posts');
const user = require('./routes/userdetails')
const PORT = 5000;



// Mongoose Connection starts
mongoose.connect(MONGOURI, { useNewUrlParser: true , useUnifiedTopology: true });
mongoose.connection.on('connected',()=>{
    console.log('connected');
});
mongoose.connection.on('error',(err)=>{
    console.log(err);
});
//  mongoose connection ends


app.use(express.json());
app.use('/signup',signup);
app.use('/signin',signin);
app.use('/posts',posts);
app.use('/user',user);



app.listen(PORT,()=>{
    console.log("server is running at port",PORT);
});