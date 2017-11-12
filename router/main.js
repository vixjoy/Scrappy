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
const html = require('html');
var name = [];
var value = [];
var BTC = [];

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
    for(var i = 0; i < data.length; i++){
      BTC[i] = {value: data[i].close, date: new Date(data[i].time*1000)}

      console.log(BTC[i]);
      // -> [ { time: 1485388800,
      //        close: 915.65,
      //        high: 917.71,
      //        low: 893.81,
      //        open: 893.97,
      //        volumefrom: 35494.93,
      //        volumeto: 32333344.2 },
      //        ... ]
    }
    console.log(BTC.length);

  })
  .catch(console.error)
  //graph creation



  app.get('/', function(req,res) {
    res.render('index',
    { name: name,
      value: value,
      BTC : BTC}
    );
  });

  app.get('/whatif', function(req,res){
    var investment = req.query.amount;//req.param("amount");//
    var date = req.query.date;
    res.send(investment);
    // cc.priceHistorical('BTC', ['USD'], date) // -> { BTC: { USD: 997, EUR: 948.17 } }
    // .then(prices => {
    //   //console.log(price)
    //   var initVal = JSON.stringify(prices);
    //
    // });
    // cc.priceHistorical('BTC', ['USD'], Date())
    // .then(prices => {
    //   //console.log(price)
    //   var curVal = JSON.stringify(prices);
    //
    //   res.send((investment/initVal)*curVal);
      console.log("AAAAAAAAA");
    // });
  });
}
