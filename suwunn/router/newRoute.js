
require('dotenv').config();
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const key = process.env.secret;
const fs= require("fs");
const morgan=require('morgan');
const multer=require('multer');
const axios = require("axios").default;

const accessLogStream  = fs.createWriteStream('./218116752.log', {flags:'a'},); //buat file dengna nama 218116752 dan tipe e .log
const {
    executeQuery,
    getConnection,
    allnumeric,
    validateEmail,
    rand_str,
    numericletter,
    CheckDecimal,
    checkDecimalandNumber
} = require("../utils");
const { exception } = require("console");


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/uploads");
    },
    filename: function (req, file, callback) {
        const filename = file.originalname.split(".");
        const extension = filename[filename.length - 1];

        let nama =""
        if(!req.headers["x-auth-token"]){
             nama = req.body.username;
            
        }
        else{
            let user = null;
            user = jwt.verify(req.headers["x-auth-token"],key);
            nama = user.username;
        }
        if(extension.toLowerCase() != "png" && extension.toLowerCase()!= "jpg"){
            callback("tipe file salah", null);
        }
      
        callback(null, nama+ "." + extension);
    }
});
const uploads = multer({
    storage: storage
});





morgan.token('msg',(req,res)=>{return "Message: "+msg+";"});
morgan.token('status',(req,res)=>{return "Status: "+ res.statusCode+";"});
morgan.token('method',(req,res)=>{return "Method: "+ req.method+";"});
morgan.token('date',(req,res)=>{ return "DateTime: "+  new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() +";"});
let format = morgan(`:method URL: :url ; :status :msg :date ResponseTime: :response-time ms `,{stream:accessLogStream,});

//var msg di sini untuk bantuan saja saat melakukan logging
var msg='';


router.use(format);


router.get("/api/suwunn", async function (req,res){
    let query = req.query.nama;
    let error = "";
    if(query != "Shan"){
        error ="Bukan Shan"
    }else{
        error = "pasti shan"
    }
    return res.render("oke",{data :key, error : error});
})


module.exports = router;