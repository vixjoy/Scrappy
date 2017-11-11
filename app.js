const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');
const path = require('path');
const express = require('express');

const outputResults = (DailyCrypto) => {
  const output = `Bitcoin is worthn $ ${Bitcoin.USD},Today!`;
  console.log(output);
}

// Check cache
if (fs.existsSync('cache.json')) {
  const cachedBitcoin = JSON.parse(fs.readFileSync('cache.json', 'utf8'));
  moment.updateLocale('en', { week: { dow : 4 } }); // Thursday is the first day of the week!
  if (moment().day() == moment(cachedBitcoin.timestamp).day()) { // If cached result is from this week, output results.
    outputResults(cachedBitcoin);
    return;
  }
}

// Scrape weekly ad
//const storeID = '2622294'; // Hard coding my local Publix; shouldn't matter much
//const searchTerm = 'Bitcoin'; 
const url = `https://coinranking.com/`;
var destination = fs.createWriteStream('./coinranking.html')

request(url, (error, response, body) => {
  // Check status code (200 is HTTP OK)
  if (response.statusCode !== 200) {
    console.log("Error!\n");
    return 1;
  }

  else{
    request(url)
    .pipe(destination)
    .on('finish', function(){
      console.log("complete");
    })
    ;
  }
  var value = [];
  //var name = [];
  var $ = cheerio.load(body);
  for(var i = 0; i < 5; i++){
    //name[i]= $('.coin-list__body__row__cryptocurrency__name').get(i);
    value[i] = $('.coin-list__body__row__price__value').get(i);
    console.log(" :\t"+value[i].children[0].data+"\n");
  }

  // Parse the document body
  // const $ = cheerio.load(body);
  // const currencies = Array.from($('coin-list__body').find('.grid'));
  // console.log(currencies);
  // const deals = currencies.map(deal => ([$('.coin-list__row__price__value span', deal).text(), $('.deal span', deal).text()]));
  // if (deals.find(title => title[0].includes(searchTerm)) === undefined) {
  //   console.log("404: Currency Not Found\n");
  //   return 1;
  // }
  // const Bitcoin = {
  //   name: deals.find(title => title[0].includes(searchTerm))[0],
  //   USD: deals.find(title => title[0].includes(searchTerm))[1],
  //   timestamp: moment()
  // };
  outputResults(DailyCrypto);
  fs.writeFile('cache.json', JSON.stringify(DailyCrypto, null, 2));
});
