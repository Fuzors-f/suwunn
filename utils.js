//npm install mysql ejs express dotenv multer morgan 
const mysql = require("mysql");
require('dotenv').config();
const pool = mysql.createPool({
    host:process.env.host,
    database:process.env.database, //nama database
    user:process.env.user,
    password: process.env.password,
    port : process.env.ports
   
});


function getConnection() {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                resolve(connection);
            }
        });
    });
}

function executeQuery(conn, query) {
    return new Promise(function (resolve, reject) {
        conn.query(query, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function allnumeric(inputtxt)
{
    var numbers = /^[-+]?[0-9]+$/;
    if(inputtxt.match(numbers))
    {
        return true;
    }
    else
    {
        return false;
    }
}

function rand_str() {
    const list = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ0123456789";
    var res = "";
    for(var i = 0; i < 15; i++) {
        var rnd = Math.floor(Math.random() * list.length);
        res = res + list.charAt(rnd);
    }
    return res;
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function pw(password){
    return !!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%* #+=\(\)\^?&]{3,}$/);
};


function CheckDecimal(inputtxt) 
{ 
    var decimal=  /^[-+]?[0-9]+\.[0-9]+$/; 
    if(inputtxt.match(decimal)) 
    { 
        return true;
    }
    else
    { 
        return false;
    }
} 

function checkDecimalandNumber(input){
    var decimal=  /^[-+]?[0-9]+\.[0-9]+$/; 
    var numbers = /^[-+]?[0-9]+$/;
    if(input.match(decimal ) || input.match(numbers)){
        return true;
    }else{
        return false;
    }
}

module.exports = {
    "getConnection": getConnection,
    "executeQuery": executeQuery,
    "allnumeric" : allnumeric,
    "rand_str" : rand_str,
    "validateEmail" : validateEmail,
    "numericletter" : pw,
    "CheckDecimal" : CheckDecimal,
    "checkDecimalandNumber" :checkDecimalandNumber
}