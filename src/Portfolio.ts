import StockPurchase = require("./StockPurchase");

/**
 * A stock portfolio
 */
interface Portfolio {
    /**
     * Add a stock to the portfolio
     * @param stockPurchase a stock purchase
     */
    addStock(stockPurchase: StockPurchase): void;

    /**
     * Remove a stock from the portfolio
     * @param stockPurchase a stock purchase
     */
    removeStock(stockPurchase: StockPurchase): void;

    /**
     * @returns the stocks in the portfolio
     */
    getAllStocks(): StockPurchase[];    
}

export = Portfolio;