import StockPurchase = require("./StockPurchase");
import StockDetails = require("./StockDetails");

/**
 * A class to analyze a stock
 */
class StockAnalyzer {

    private stockPurchase: StockPurchase;
    private stockDetails: StockDetails;

    /**
     * Default constructor
     * @param stockPurchase the stock purchase
     * @param stockDetails the stock details
     */
    constructor(stockPurchase: StockPurchase, stockDetails: StockDetails){
        this.stockPurchase = stockPurchase;
        this.stockDetails = stockDetails;        
    }

    /**
     * @returns the gain/loss of the stock
     */
    public getGainLoss(): number {
        let gainLoss = this.stockDetails.getPrice() - this.stockPurchase.getBuyPrice();
        return gainLoss * this.stockPurchase.getShares();
    }

    /**
     * @returns the market value of the stock
     */
    public getMarketValue(): number {
        return this.stockDetails.getPrice() * this.stockPurchase.getShares();
    }

    /**
     * @returns the investment returns as a percentage
     */
    public getInvestmentReturns(): number {
        let difference = this.stockDetails.getPrice() - this.stockPurchase.getBuyPrice();;
        return 100 * difference / this.stockPurchase.getBuyPrice();
    }

}

export = StockAnalyzer;