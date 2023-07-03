const express = require('express');
const routes = express.Router();
const jwt= require('jsonwebtoken')

const userRegistration = require('../middlewares/UserRegistration')
const userLogin = require('../middlewares/Userlogin')
const authenticateToken= require('../middlewares/authenticateToken');
const DeleteRefreshToken =require('../middlewares/deleterefreshToken');
const authenticateRole = require('../middlewares/authenticateRole');


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
    res.send(`${req.payload.Full_Name} ${req.payload.Role}`)
    console.log(req.payload);
})
routes.get('/Admin',authenticateToken,authenticateRole("Admin"),(req,res)=>{
    res.send("Admin only")
    console.log(req.payload);
})


module.exports = routes