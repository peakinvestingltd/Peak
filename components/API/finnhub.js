const finnhub = require("finnhub");

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = "sandbox_c0lsa3f48v6r1vcsdurg"; // Replace this
const finnhubClient = new finnhub.DefaultApi();

function getLineChartData(stockTicker, resoloution, from, to) {
  finnhubClient.stockCandles(
    stockTicker,
    resoloution,
    from,
    to,
    {},
    (error, data, response) => {
      console.log(data.o);
      return data.o;
    }
  );
}

function getCompanyProfile(stockTicker) {
  // Company profile
  finnhubClient.companyProfile(
    { symbol: stockTicker },
    (error, data, response) => {
      console.log("vv company profile vv");
      console.log(data);
    }
  );
}

function getCurrentPrice(stockTicker) {
  finnhubClient.quote("AAPL", (error, data, response) => {
    let currentPrice = data.c;
    console.log("vv current price vv");
    console.log(currentPrice);
    return currentPrice;
  });
}

getLineChartData("AAPL", "D", 1590988249, 1591852249);
getCompanyProfile("TSLA");
getCurrentPrice("TSLA");
