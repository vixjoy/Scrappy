const url = `https://coinranking.com/`;
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');
const path = require('path');
const express = require('express');
const util = require('util');
const ejs = require('ejs');
const cc = require('cryptocompare')
global.fetch = require('node-fetch')
var name = [];
var value = [];
var BTCprices = [];

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

  cc.histoDay('BTC', 'USD')
.then(data => {
  console.log(data)
  for(var i = 0; i < data.length; i++){
     BTCprices[i] = data[i].close;
  // -> [ { time: 1485388800,
  //        close: 915.65,
  //        high: 917.71,
  //        low: 893.81,
  //        open: 893.97,
  //        volumefrom: 35494.93,
  //        volumeto: 32333344.2 },
  //        ... ]
  }
 
})
.catch(console.error)

// cc.priceHistorical('BTC', ['USD', 'EUR'], new Date('2017-01-01'))
// .then(prices => {
//   console.log(prices)
//   strprices = JSON.stringify(prices);
//   // -> { BTC: { USD: 997, EUR: 948.17 } }
// })
// .catch(console.error)



  app.get('/', function(req,res) {
    res.render('index', 
      { name: name,
        value: value,
        BTC : BTCprices}
    );
  });



}

