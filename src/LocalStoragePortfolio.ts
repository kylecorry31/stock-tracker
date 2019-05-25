import Portfolio = require("./Portfolio");
import StockPurchase = require("./StockPurchase");
import Stock = require("./Stock");

/**
 * A portfolio which saves to local storage
 */
class LocalStoragePortfolio implements Portfolio {
    removeStock(stockPurchase: StockPurchase): void {
        let stocks = this.getAllStocks();
        let stockIdx = -1;
        for(let i = 0; i < stocks.length; i++){
            let stockEqual = stocks[i].getStock().getTicker() === stockPurchase.getStock().getTicker();
            let sharesEqual = stocks[i].getShares() === stockPurchase.getShares();
            let pricesEqual = stocks[i].getBuyPrice() === stockPurchase.getBuyPrice();
            if (stockEqual && sharesEqual && pricesEqual){
                stockIdx = i;
                break;
            }
        }
        if (stockIdx === -1){
            return;
        }
        stocks.splice(stockIdx, 1);
        this.saveAllStocks(stocks);
    }

    addStock(stockPurchase: StockPurchase): void {
        let stocks = this.getAllStocks();
        stocks.push(stockPurchase);
        this.saveAllStocks(stocks);
    }    
    
    getAllStocks(): StockPurchase[] {
        let savedStocksString = localStorage.getItem('portfolio');
        if (savedStocksString == null){
            return [];
        }
        let stocksJSON = JSON.parse(savedStocksString);
        let stocks = [];
        for(let stock of stocksJSON.stocks){
            stocks.push(new StockPurchase(new Stock(stock.ticker), stock.shares, stock.buyPrice));
        }
        return stocks;
    }

    private saveAllStocks(stocks: StockPurchase[]): void {
        let stocksJSON = {"stocks": []};
        for(let stock of stocks){
            stocksJSON.stocks.push({
                'ticker': stock.getStock().getTicker(),
                'shares': stock.getShares(),
                'buyPrice': stock.getBuyPrice()
            });
        }
        let savedStocksString = JSON.stringify(stocksJSON);
        localStorage.setItem('portfolio', savedStocksString);
    }
}

export = LocalStoragePortfolio;