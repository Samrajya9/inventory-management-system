require("dotenv").config();
const connection = require("../models/connection.js");
const bcrypt = require("bcrypt");

const UserLogin = async (req, res) => {
  const { Email, Password } = req.body;
  const EmailExist = await CheckExistinguser(Email);

  if (!EmailExist) {
    return res.status(404).json({ message: "Email not found" });
  } else {
    try {
      // Comparing Password
      const data_base_details = await new Promise((resolve, reject) => {
        connection.query(
          "select * from users where Email=?",
          [Email],
          (err, result) => {
            if (err) {
              reject(err);
              res.status(500).json({ Message: err.message });
            } else {
              res.status(200).json({ message: result[0].Password });
              resolve(result[0]);
            }
          }
        );
      });
      console.log(data_base_details);
      const passwordCheck = await bcrypt.compare(
        Password,
        data_base_details.Password
      );
      if (passwordCheck) {
        console.log("jwt start");
      }
      //   Creating JWt{
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

module.exports = UserLogin;
