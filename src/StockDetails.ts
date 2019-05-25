import Stock = require("./Stock");

/**
 * Details about a stock
 */
class StockDetails {
    private stock: Stock;
    private price: number;
    private name: string;

    /**
     * Default constructor
     * @param stock the stock
     * @param name the name of the stock
     * @param price the price of the stock
     */
    constructor(stock: Stock, name: string, price: number){
        this.stock = stock;
        this.name = name;
        this.price = price;
    }

    /**
     * @returns the stock
     */
    public getStock(): Stock {
        return this.stock;
    }

    /**
     * @returns the name of the stock
     */
    public getName(): string {
        return this.name;
    }

    /**
     * @returns the price of the stock
     */
    public getPrice(): number {
        return this.price;
    }

}

export = StockDetails;