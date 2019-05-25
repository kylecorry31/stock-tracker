import Stock = require("./Stock");
import StockMarket = require("./StockMarket");
import IEXTradingStockMarket = require("./IEXTradingStockMarket");
import StockPurchase = require("./StockPurchase");
import StockInfo = require("./StockInfo");
import Portfolio = require("./Portfolio");
import LocalStoragePortfolio = require("./LocalStoragePortfolio");

let portfolio: Portfolio = new LocalStoragePortfolio();
let stockMarket: StockMarket = new IEXTradingStockMarket();

async function displayStocks(stocks: StockPurchase[], element: HTMLElement){
    element.innerHTML = '';
    for(let stock of stocks){
        let stockDetails = await stockMarket.lookup(stock.getStock());
        let stockInfoElt = new StockInfo(stock, stockDetails);
        stockInfoElt.addEventListener('delete', () => {
            removeStock(portfolio, stock, document.querySelector('#stocks'));
        });
        element.appendChild(stockInfoElt);
    }
}

function addStock(portfolio: Portfolio, stock: StockPurchase, element: HTMLElement){
    portfolio.addStock(stock);
    displayStocks(portfolio.getAllStocks(), element);
}

function removeStock(portfolio: Portfolio, stock: StockPurchase, element: HTMLElement){
    portfolio.removeStock(stock);
    displayStocks(portfolio.getAllStocks(), element);
}

document.querySelector('#stock-add-form-submit').addEventListener('click', () => {
    let tickerElt: HTMLInputElement = document.querySelector('#stock-add-form-ticker');
    let sharesElt: HTMLInputElement = document.querySelector('#stock-add-form-shares');
    let priceElt: HTMLInputElement = document.querySelector('#stock-add-form-price');
    let ticker = tickerElt.value.toUpperCase();
    let shares = parseFloat(sharesElt.value);
    let price = parseFloat(priceElt.value);
    let purchase = new StockPurchase(new Stock(ticker), shares, price);
    tickerElt.value = '';
    sharesElt.value = '';
    priceElt.value = '';
    addStock(portfolio, purchase, document.querySelector('#stocks'));
});

displayStocks(portfolio.getAllStocks(), document.querySelector('#stocks'));