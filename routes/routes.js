const express = require('express');
const routes = express.Router();
const userRegistration = require('../middlewares/UserRegistration')
const userLogin = require('../middlewares/Userlogin')

routes.get('/registerUser',(req,res)=>{
    res.send("HELLO")
});

routes.post('/registerUser',userRegistration);

routes.get('/Login',(req,res)=>{
    res.send("please login")
});

routes.post('/Login',userLogin);

routes.get('/dashboard',(req,res)=>{
    res.send(dashboard)
})


module.exports = routes