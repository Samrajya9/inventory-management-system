require("dotenv").config();
const connection  = require('../models/connection.js');
const bcrypt= require('bcrypt');

// const connection = connectionConfig(process.env.HOST,process.env.USER,"",process.env.DATABASE)

const userRegistration = async (req,res,next)=>{
    try {
        const {Full_Name,Contact,Address,Email,Password,Role} =req.body
        // chcecking if the email exists
        const ExistingUser = await CheckExistinguser(Email) ;
        if(ExistingUser){res.status(400).json({error:"Email already exist"})};
        // Hashing password
        const HashPassword = await bcrypt.hash(Password,10)
        // Insertin data into Database
        await connection.query(
            "INSERT INTO users(Full_Name,Contact,Address,Email,Password,Role) VALUES(?,?,?,?,?,?)",
            [Full_Name,Contact,Address,Email,HashPassword,Role],
            (err)=>{
                if(err){
                    console.log(err);
                    res.status(500).json({Error:"failed to regsiter user"})
                }else{
                    res.status(200).json({Message:"User registered sucessfully"})
                }
            }
        )
    } catch (error) {
        console.log("Error:",error);
    }   
};

const CheckExistinguser = async(Email)=>{
    return new Promise((resolve,reject)=>{
        connection.query("SELECT * FROM users where Email=?",
        [Email],
        (err,results)=>{
            if(err) {
                console.log(err);
                reject(err)}
            resolve(results.length > 0 )
        });
    })
}

module.exports = userRegistration;