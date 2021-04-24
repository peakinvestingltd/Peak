// const { default: axios } = require("axios");
// const finnhub = require("finnhub");

// const api_key = finnhub.ApiClient.instance.authentications["api_key"];
// api_key.apiKey = "sandbox_c0lsa3f48v6r1vcsdurg"; // Replace this
// const finnhubClient = new finnhub.DefaultApi();

function price(stockTicker) {
  axios
    .get(
      "https://finnhub.io/api/v1/quote?symbol=AAPL&token=sandbox_c0lsa3f48v6r1vcsdurg"
    )
    .then((response) => {
      console.log(response.data.c);
      return response.data.c;
    });
}
module.exports = { price };
// exports.getLineChartData = (stockTicker, resoloution, from, to) => {
//   finnhubClient.stockCandles(
//     stockTicker,
//     resoloution,
//     from,
//     to,
//     {},
//     (error, data, response) => {
//       console.log(data.o);
//       return data.o;
//     }
//   );
// };

// exports.getCompanyProfile = (stockTicker) => {
//   // Company profile
//   finnhubClient.companyProfile(
//     { symbol: stockTicker },
//     (error, data, response) => {
//       console.log("vv company profile vv");
//       console.log(data);
//       return data;
//     }
//   );
// };

// exports.getCurrentPrice = (stockTicker) => {
//   finnhubClient.quote("AAPL", (error, data, response) => {
//     let currentPrice = data.c;
//     console.log("vv current price vv");
//     console.log(currentPrice);
//     return currentPrice;
//   });
// };

// getLineChartData("AAPL", "D", 1590988249, 1591852249);
// getCompanyProfile("TSLA");
// getCurrentPrice("TSLA");
