var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define("Stock", ["require", "exports"], function (require, exports) {
    "use strict";
    class Stock {
        constructor(ticker) {
            this.ticker = ticker;
        }
        getTicker() {
            return this.ticker;
        }
    }
    return Stock;
});
define("StockDetails", ["require", "exports"], function (require, exports) {
    "use strict";
    class StockDetails {
        constructor(stock, name, price) {
            this.stock = stock;
            this.name = name;
            this.price = price;
        }
        getStock() {
            return this.stock;
        }
        getName() {
            return this.name;
        }
        getPrice() {
            return this.price;
        }
    }
    return StockDetails;
});
define("StockMarket", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("IEXTradingStockMarket", ["require", "exports", "StockDetails"], function (require, exports, StockDetails) {
    "use strict";
    class IEXTradingStockMarket {
        lookup(stock) {
            return __awaiter(this, void 0, void 0, function* () {
                let response = yield fetch("https://api.iextrading.com/1.0/stock/" + stock.getTicker() + "/batch?types=quote");
                let json = yield response.json();
                return Promise.resolve(new StockDetails(stock, json.quote.companyName, json.quote.close));
            });
        }
    }
    return IEXTradingStockMarket;
});
define("StockPurchase", ["require", "exports"], function (require, exports) {
    "use strict";
    class StockPurchase {
        constructor(stock, shares, buyPrice) {
            this.stock = stock;
            this.shares = shares;
            this.buyPrice = buyPrice;
        }
        getStock() {
            return this.stock;
        }
        getShares() {
            return this.shares;
        }
        getBuyPrice() {
            return this.buyPrice;
        }
    }
    return StockPurchase;
});
define("Portfolio", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("LocalStoragePortfolio", ["require", "exports", "StockPurchase", "Stock"], function (require, exports, StockPurchase, Stock) {
    "use strict";
    class LocalStoragePortfolio {
        removeStock(stockPurchase) {
            let stocks = this.getAllStocks();
            let stockIdx = -1;
            for (let i = 0; i < stocks.length; i++) {
                let stockEqual = stocks[i].getStock().getTicker() === stockPurchase.getStock().getTicker();
                let sharesEqual = stocks[i].getShares() === stockPurchase.getShares();
                let pricesEqual = stocks[i].getBuyPrice() === stockPurchase.getBuyPrice();
                if (stockEqual && sharesEqual && pricesEqual) {
                    stockIdx = i;
                    break;
                }
            }
            if (stockIdx === -1) {
                return;
            }
            stocks.splice(stockIdx, 1);
            this.saveAllStocks(stocks);
        }
        addStock(stockPurchase) {
            let stocks = this.getAllStocks();
            stocks.push(stockPurchase);
            this.saveAllStocks(stocks);
        }
        getAllStocks() {
            let savedStocksString = localStorage.getItem('portfolio');
            if (savedStocksString == null) {
                return [];
            }
            let stocksJSON = JSON.parse(savedStocksString);
            let stocks = [];
            for (let stock of stocksJSON.stocks) {
                stocks.push(new StockPurchase(new Stock(stock.ticker), stock.shares, stock.buyPrice));
            }
            return stocks;
        }
        saveAllStocks(stocks) {
            let stocksJSON = { "stocks": [] };
            for (let stock of stocks) {
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
    return LocalStoragePortfolio;
});
define("StockAnalyzer", ["require", "exports"], function (require, exports) {
    "use strict";
    class StockAnalyzer {
        constructor(stockPurchase, stockDetails) {
            this.stockPurchase = stockPurchase;
            this.stockDetails = stockDetails;
        }
        getGainLoss() {
            let gainLoss = this.stockDetails.getPrice() - this.stockPurchase.getBuyPrice();
            return gainLoss * this.stockPurchase.getShares();
        }
        getMarketValue() {
            return this.stockDetails.getPrice() * this.stockPurchase.getShares();
        }
        getInvestmentReturns() {
            let difference = this.stockDetails.getPrice() - this.stockPurchase.getBuyPrice();
            ;
            return 100 * difference / this.stockPurchase.getBuyPrice();
        }
    }
    return StockAnalyzer;
});
define("StockInfo", ["require", "exports", "StockAnalyzer"], function (require, exports, StockAnalyzer) {
    "use strict";
    class StockInfo extends HTMLElement {
        constructor(stockPurchase, stockDetails) {
            super();
            this.details = stockDetails;
            this.purchase = stockPurchase;
            this.shadow = this.attachShadow({ mode: 'open' });
        }
        connectedCallback() {
            let stockAnalyzer = new StockAnalyzer(this.purchase, this.details);
            var gainLoss = stockAnalyzer.getGainLoss();
            var marketValue = stockAnalyzer.getMarketValue();
            var investmentReturn = stockAnalyzer.getInvestmentReturns();
            this.shadow.innerHTML = `
            <style>
            #stock {
                box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
                margin: 16px;
                padding: 16px;
                background: white;
                border-radius: 4px;
                position: relative;
            }
    
            #price {
                font-weight: lighter;
                font-size: 1.8rem;
            }
    
            #purchase-details {
                color: rgba(0, 0, 0, 0.6);
            }
    
            #purchase-price {
                display: inline;
            }
    
            #purchase-shares {
                display: inline;
                font-style: italic;
            }

            #delete {
                position: absolute;
                right: 12px;
                top: 12px;
                color: red;
                cursor: pointer;
                font-weight: bold;
                font-size: 24px;
            }
    
            .red {
                color: rgba(180, 0, 0, 0.86);
            }
    
            .green {
                color: rgba(0, 100, 0, 0.86);
            }
            </style>
    
            <div id="stock">
            <div id="delete">X</div>
            <h1 id="name" class="${gainLoss < 0 ? "red" : "green"}">${this.details.getName()} <span id="ticker">(${this.details.getStock().getTicker()})</span></h1>
            <h2 id="price">${this.details.getPrice().toFixed(2)} USD</h2>
            <div id="purchase-details">
                <p id="purchase-price">Bought for ${this.purchase.getBuyPrice().toFixed(2)} USD</p>
                <p id="purchase-shares">(${this.purchase.getShares()} shares)</p>
            </div>
            <div id="analysis-details">
                <p id="analysis-gain-loss"><strong>Gain/Loss:</strong> ${gainLoss.toFixed(2)} USD</p>
                <p id="analysis-market-value"><strong>Market value:</strong> ${marketValue.toFixed(2)} USD</p>
                <p id="analysis-investment-returns"><strong>Investment returns:</strong> ${investmentReturn.toFixed(2)}%</p>
            </div>
    
            </div>
  
      `;
            this.shadow.querySelector('#delete').addEventListener('click', () => {
                let event = new CustomEvent("delete");
                this.dispatchEvent(event);
            });
        }
        getStockPurchase() {
            return this.purchase;
        }
        getStockDetails() {
            return this.details;
        }
    }
    window.customElements.define('cmp-stock-info', StockInfo);
    return StockInfo;
});
define("Main", ["require", "exports", "Stock", "IEXTradingStockMarket", "StockPurchase", "StockInfo", "LocalStoragePortfolio"], function (require, exports, Stock, IEXTradingStockMarket, StockPurchase, StockInfo, LocalStoragePortfolio) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let portfolio = new LocalStoragePortfolio();
    let stockMarket = new IEXTradingStockMarket();
    function displayStocks(stocks, element) {
        return __awaiter(this, void 0, void 0, function* () {
            element.innerHTML = '';
            for (let stock of stocks) {
                let stockDetails = yield stockMarket.lookup(stock.getStock());
                let stockInfoElt = new StockInfo(stock, stockDetails);
                stockInfoElt.addEventListener('delete', () => {
                    removeStock(portfolio, stock, document.querySelector('#stocks'));
                });
                element.appendChild(stockInfoElt);
            }
        });
    }
    function addStock(portfolio, stock, element) {
        portfolio.addStock(stock);
        displayStocks(portfolio.getAllStocks(), element);
    }
    function removeStock(portfolio, stock, element) {
        portfolio.removeStock(stock);
        displayStocks(portfolio.getAllStocks(), element);
    }
    document.querySelector('#stock-add-form-submit').addEventListener('click', () => {
        let tickerElt = document.querySelector('#stock-add-form-ticker');
        let sharesElt = document.querySelector('#stock-add-form-shares');
        let priceElt = document.querySelector('#stock-add-form-price');
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
});
//# sourceMappingURL=app.js.map