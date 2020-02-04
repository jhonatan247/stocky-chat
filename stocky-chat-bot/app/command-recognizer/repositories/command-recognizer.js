'use strict';
const axios = require('axios');
const csv = require('csvtojson');

module.exports.recognizeCommand = async function(stockId) {
  const csvStream = (
    await axios.get(`https://stooq.com/q/l/?s=${stockId}&f=sd2t2ohlcv&h&e=csv`)
  ).data;
  const jsonData = await new Promise((resolve, reject) => {
    csv()
      .fromString(csvStream)
      .subscribe(
        json => {
          resolve(json);
        },
        err => {
          reject(err);
        }
      );
  });
  console.log(jsonData);
};
