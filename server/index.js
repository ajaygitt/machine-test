  
var express = require('express')
var path = require('path')
var cors = require('cors')
var app = express() 
var db=require('./model/connection')

var commonRouter=require('./routes/user')
var port=8000
app.listen(port,()=>{
    console.log("Server Connected to Port "+port) 
})
app.use(cors()) 
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public'))); 

db.connect((err)=>{
    if(err){
        console.log("err in db connection");
    }else{
        console.log("DB connected");
    }
})




app.use('/',commonRouter)