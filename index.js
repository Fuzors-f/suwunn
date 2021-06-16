const express = require('express');
const app = express();
const users = require('./router/newRoute'); 
app.set('view engine', 'ejs');
require('dotenv').config();

app.use(express.urlencoded({extended:true}));

app.use("/",users);


const port = process.env.PORT || 3000;

app.listen(port, function (){ //buka port 3000 untuk menjadi server 
    console.log(`Jalan di ${port}`);
});