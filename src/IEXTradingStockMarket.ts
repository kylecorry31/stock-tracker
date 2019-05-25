import StockMarket = require("./StockMarket");
import Stock = require("./Stock");
import StockDetails = require("./StockDetails");

class IEXTradingStockMarket implements StockMarket {
    async lookup(stock: Stock): Promise<StockDetails> {
        let response = await fetch("https://api.iextrading.com/1.0/stock/" + stock.getTicker() + "/batch?types=quote");
        let json = await response.json();
        return Promise.resolve(new StockDetails(stock, json.quote.companyName, json.quote.close));
    }
}

export = IEXTradingStockMarket;