const express = require('express');
const routes = express.Router();
const userRegistration = require('../middlewares/UserRegistration')

routes.get('/registerUser',(req,res)=>{
    res.send("HELLO")
});

routes.post('/registerUser',userRegistration);

module.exports = routes