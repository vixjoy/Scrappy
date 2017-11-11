const url = `https://coinranking.com/`;
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');
const path = require('path');
const express = require('express');
const util = require('util');
const ejs = require('ejs');
var name = [];
var value = [];

module.exports = function(app)
{
  request(url, (error, response, body) => {
  // Check status code (200 is HTTP OK)
    if (response.statusCode !== 200) 
    {
      console.log("Error!\n");
      return 1;
    }
    else 
    {
      console.log("Today's Top 20 Currencies are:\n")
      var $ = cheerio.load(body);
      for(var i = 0; i < 20; i++){
        name[i]= $('.coin-name').get(i).children[0].data;
        value[i] = $('.coin-list__body__row__price__value').get(i).children[0].data;
        console.log(name[i] +" :\t"+value[i]+"\n");
      }
    }
  });


  app.get('/', function(req,res) {
    res.render('index', 
      { name: name,
        value: value}
    );
  });



}

