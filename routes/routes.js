const express = require('express');
const routes = express.Router();
const jwt= require('jsonwebtoken')

const userRegistration = require('../middlewares/UserRegistration')
const userLogin = require('../middlewares/Userlogin')
const authenticateToken= require('../middlewares/authenticateToken');
const DeleteRefreshToken =require('../middlewares/deleterefreshToken')


routes.get('/',(req,res)=>{
    res.send("welcome")
});
routes.get('/registerUser',(req,res)=>{
    res.send("HELLO")
});

routes.post('/registerUser',userRegistration);

routes.get('/Login',(req,res)=>{
    res.send("please login")
});
routes.post('/Login',userLogin);

routes.delete('/Logout',DeleteRefreshToken);

routes.get('/dashboard',authenticateToken,(req,res)=>{
    res.send("dashboard")
    console.log(req.payload);
})
routes.get('/Admin',authenticateToken,(req,res)=>{
    res.send("Admin only")
})


module.exports = routes