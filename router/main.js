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

// var ejs = require("../views/index.ejs");
//   cc.histoDay('BTC', 'USD')
//   .then(data => {
//     var value = [];
//     var date =[] ;
//     for(var i = 0; i < data.length; i++){
//       value[i] = data[i].close
//       date[i] = new Date(data[i].time*1000)}
//       //console.log(BTC[i]);
//       // -> [ { time: 1485388800,
//       //        close: 915.65,
//       //        high: 917.71,
//       //        low: 893.81,
//       //        open: 893.97,
//       //        volumefrom: 35494.93,
//       //        volumeto: 32333344.2 },
//       //        ... ]
    
//     console.log(value, date);
//     ejs.doGraph(value, date);

//   })
//   .catch(console.error)
//   //graph creation



  app.get('/', function(req,res) {
    res.render('index',
    { name: name,
      value: value,
      BTC : BTC}
    );
  });

  app.get('/whatifBTC', function(req,res){
    var investment = req.query.amount;//req.param("amount");//
    var date = new Date(req.query.date +"T18:09:16Z");
    var initVal;
    var curVal;
    cc.priceHistorical('BTC', ['USD'], date) // -> { BTC: { USD: 997, EUR: 948.17 } }
    .then(prices => {
      //console.log(prices.USD)
      initVal = prices.USD;
      console.log(initVal);
      return cc.priceHistorical('BTC', ['USD'], new Date())
    })
    .then(prices => {
      // console.log(prices)
      curVal = prices.USD;
      console.log(curVal);
      
      res.status(200).send(((investment*curVal)/initVal).toFixed(2));
    }, err => {
      console.log("err happened")
      console.log(err)
    });
  });


    app.get('/whatifARK', function(req,res){
    var investment = req.query.amount;//req.param("amount");//
    var date = new Date(req.query.date+"T18:09:16Z");
    var initVal;
    var curVal;
    cc.priceHistorical('ARK', ['USD'], date) // -> { ARK: { USD: 997, EUR: 948.17 } }
    .then(prices => {
      //console.log(prices.USD)
      initVal = prices.USD;
      console.log(initVal);
      return cc.priceHistorical('ARK', ['USD'], new Date())
    })
    .then(prices => {
      // console.log(prices)
      curVal = prices.USD;
      console.log(curVal);
      
      res.status(200).send(((investment*curVal)/initVal).toFixed(2));
    }, err => {
      console.log("err happened")
      console.log(err)
    });
  })



        app.get('/whatifETH', function(req,res){
    var investment = req.query.amount;//req.param("amount");//
    var date = new Date(req.query.date+"T18:09:16Z");
    var initVal;
    var curVal;
    cc.priceHistorical('ETH', ['USD'], date) // -> { ARK: { USD: 997, EUR: 948.17 } }
    .then(prices => {
      //console.log(prices.USD)
      initVal = prices.USD;
      console.log(initVal);
      return cc.priceHistorical('ETH', ['USD'], new Date())
    })
    .then(prices => {
      // console.log(prices)
      curVal = prices.USD;
      console.log(curVal);
      
      res.status(200).send(((investment*curVal)/initVal).toFixed(2));
    }, err => {
      console.log("err happened")
      console.log(err)
    });
  })



        app.get('/whatifDOGE', function(req,res){
    var investment = req.query.amount;//req.param("amount");//
    var date = new Date(req.query.date+"T18:09:16Z");
    var initVal;
    var curVal;
    cc.priceHistorical('DOGE', ['USD'], date) // -> { ARK: { USD: 997, EUR: 948.17 } }
    .then(prices => {
      //console.log(prices.USD)
      initVal = prices.USD;
      console.log(initVal);
      return cc.priceHistorical('DOGE', ['USD'], new Date())
    })
    .then(prices => {
      // console.log(prices)
      curVal = prices.USD;
      console.log(curVal);
      
      res.status(200).send(((investment*curVal)/initVal).toFixed(2));
    }, err => {
      console.log("err happened")
      console.log(err)
    });
  })
}