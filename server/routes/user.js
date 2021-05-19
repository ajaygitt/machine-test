var express = require('express')
const router = express.Router()
const SECRET_KEY="SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
var jwt=require('jsonwebtoken');
const controller=require('../controller/controller')

// middleware to check if user is valid

function verifyLoggedIn(req,res,next){

    console.log(req.body);
    let token=req.body.jwt
if(token==null)
{
    res.status(400).send('token is null')
}
else
{
    jwt.verify(token, SECRET_KEY, (err, user)=>{

if(err)
{

    res.status(400).send('token error')
}
else
{
    console.log("this is the loggedin user",user);
    req.user=user;
    next()
}

    })
}
    
}




router.post('/signup',(req,res)=>{

controller.signup(req.body).then((result)=>{

    console.log(result);
if(result=='notExist')
{
    result=true
    res.status(200).send(result)
}
else
{
    result=false;
    res.status(200).send(result)

}
})


})

router.post('/Login',(req,res)=>{
    controller.Login(req.body).then((result)=>{

        console.log(result);
        if(result.user)
        {
            
            let jwtToken = jwt.sign(result.user,SECRET_KEY)
            res.status(200).send({user:result.Username,id:result.user._id,jwtToken})
        }
        else if(result.invalidUser)
        {
res.send(result)
        }
        else if(result.passwordInvalid)
        {
res.send(result)
        }
    })
})


router.post('/addCompany',verifyLoggedIn,(req,res)=>{
   
    let userId= req.user._id
    controller.addCompany(userId,req.body).then(()=>{
        res.status(200).send('ok')
    })
})

router.post('/getCompanies',verifyLoggedIn,(req,res)=>{

    controller.getCompanies(req.user._id).then((result)=>{
res.send(result)
    })
})



router.post('/addTime',(req,res)=>{

    console.log(req.body);
    controller.addAppointment(req.body).then((result)=>{

        console.log(result);
        if(result.status)
        {
            res.send('true')
        }
        else
        {
            res.send('false')
        }

    })
})

router.post('/bulkDelete',verifyLoggedIn,(req,res)=>{

controller.bulkDelete(req.user._id)
res.status(200).send('ok')
})

module.exports = router