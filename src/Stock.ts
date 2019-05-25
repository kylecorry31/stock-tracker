class Stock {
    private ticker: string;
    
    constructor(ticker: string){
        this.ticker = ticker;
    }

    public getTicker(): string {
        return this.ticker;
    }
}

export = Stock;