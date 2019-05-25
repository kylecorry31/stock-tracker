import Stock = require("./Stock");
import StockDetails = require("./StockDetails");

/**
 * A stock market
 */
interface StockMarket {
    /**
     * Lookup the details about a stock
     * @param stock the stock to lookup
     * @returns a promise for the details of a stock
     */
    lookup(stock: Stock): Promise<StockDetails>;
}

export = StockMarket;