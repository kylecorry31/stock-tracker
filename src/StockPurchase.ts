import Stock = require("./Stock");

/**
 * A stock purchase
 */
class StockPurchase {
    private stock: Stock;
    private shares: number;
    private buyPrice: number;

    /**
     * Default constructor
     * @param stock the stock
     * @param shares the number of shares
     * @param buyPrice the buy price of the stock
     */
    constructor(stock: Stock, shares: number, buyPrice: number){
        this.stock = stock;
        this.shares = shares;
        this.buyPrice = buyPrice;
    }

    /**
     * @returns the stock
     */
    public getStock(): Stock {
        return this.stock;
    }

    /**
     * @returns the shares
     */
    public getShares(): number {
        return this.shares;
    }

    /**
     * @returns the buy price of the stock
     */
    public getBuyPrice(): number {
        return this.buyPrice;
    }
}

export = StockPurchase;