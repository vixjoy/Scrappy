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

const

module.exports

whatif : function(initalAmount, start){
  var oldprice;
  var newprice;
  cc.priceHistorical('BTC', ['USD'], start) // -> { BTC: { USD: 997, EUR: 948.17 } }
.then(prices => {
  console.log(price)
  oldprice = JSON.stringify(prices);

    cc.priceHistorical('BTC', ['USD'], Date())
.then(prices => {
  console.log(price)
  newprice = JSON.stringify(prices);

  return(intialAmount/oldprice) * newprice);
  
})
.catch(console.error)};

