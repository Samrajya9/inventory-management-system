require("dotenv").config();
const connection = require("../models/connection.js");
const bcrypt = require("bcrypt");
const GenerateAccesToken = require('./JWT.AccessToken.js');
const GenerateRefreshToken =require('./JWTRefreshToken.js')


const userLogin = async (req, res) => {
  const { Email, Password } = req.body;
  const EmailExist = await CheckExistinguser(Email);

  if (!EmailExist) {
    return res.status(404).json({ message: "Email not found" });
  } else {
    try {
    //  Geing database password
      const data_base_details = await new Promise((resolve, reject) => {
        connection.query(
          "select * from users where Email=?",
          [Email],
          (err, result) => {
            if (err) {
              reject(err);
              res.status(500).json({ Message: err.message });
            } else {
              // res.status(200).json({ message: result[0].Password });  
              resolve(result[0]);
            }
          }
        );
      });
      // console.log(data_base_details);
       // Comparing Password
      const passwordCheck = await bcrypt.compare(Password,data_base_details.Password);
      if (!passwordCheck) {
             res.status(403).json({Message:"Incorrect password"})  
             return ;   
      }else{
        const payload =
              {
                Full_Name :data_base_details.Full_Name,
                Role :data_base_details.role
              };
              // Creatig accesstoken 
            GenerateAccesToken(payload,process.env.ACCEESS_TOKEN_SECRET).then((access_token)=>{
              res.status(200)
              // .json({AccessToken: access_token,message:"Login successful"})
            })
            
            // Creating refresh token
            GenerateRefreshToken(payload,process.env.REFRESH_TOKEN_SECRET).then((RefreshToken)=>{
             return res.cookie("RefreshToken", RefreshToken, { httpOnly: true }).json({Message:"Token sent to cookkie"});
            })
            // Set refresh token in response cookie
             
      }
    } catch (error) {
      if (error) {
        console.log(error);
        res.status(500).json({ Error: "Internal server error" });
      }
    }
  }
};

const CheckExistinguser = async (Email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users where Email=?",
      [Email],
      (err, results) => {
        if (err) {
          console.log("err");
          return reject(err);
        } else {
          resolve(results.length > 0);
        }
      }
    );
  });
};

module.exports = userLogin;
