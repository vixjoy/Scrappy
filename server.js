const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');
const path = require('path');
const express = require('express');
const util = require('util');
const ejs = require('ejs');

var app = express();


const url = `https://coinranking.com/`;
var destination = fs.createWriteStream('./coinranking.html')

request(url, (error, response, body) => {
  // Check status code (200 is HTTP OK)
  if (response.statusCode !== 200) {
    console.log("Error!\n");
    return 1;
  }



require('./router/main')(app);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);



var server     =    app.listen($PORT,function(){
console.log("Express is running on port 3000");
});



});


