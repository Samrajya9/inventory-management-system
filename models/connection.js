const mysql = require('mysql');


const connection = (host,user,password,database) => {
    const con = mysql.createConnection(
        {
            host: host,
            user: user,
            password: password,
            database: database
        }
    );
    con.connect((err)=>{
        if(err){
            throw err
        }
        console.log("Database connected succesfully");
    });
    return con;
};

module.exports = connection;

