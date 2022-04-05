const express = require('express');
const path = require('path');
const app = express();
const getAccessToken = require('./code');
app.get('/outer',(req,res)=>{
    res.sendFile(__dirname +'/index.html');
})
app.get('/',(req,res)=>{
    
    getAccessToken(req.query.code).then((data)=>{
        res.status(200).send({message: data})
    });
    
   
})
app.listen(3003,()=>{
    console.log('running');
})