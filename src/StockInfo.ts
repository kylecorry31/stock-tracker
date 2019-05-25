import StockPurchase = require("./StockPurchase");
import StockDetails = require("./StockDetails");
import Stock = require("./Stock");
import StockAnalyzer = require("./StockAnalyzer");

class StockInfo extends HTMLElement {

    private shadow: ShadowRoot;
    private details: StockDetails;
    private purchase: StockPurchase;

    constructor(stockPurchase: StockPurchase, stockDetails: StockDetails){
        super();
        this.details = stockDetails;
        this.purchase = stockPurchase;
        this.shadow = this.attachShadow({mode: 'open'});
    }
  
    connectedCallback(){
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

    /**
     * @returns the stock purchase
     */
    public getStockPurchase(): StockPurchase {
        return this.purchase;
    }

    /**
     * @returns the stock details
     */
    public getStockDetails(): StockDetails {
        return this.details;
    }
  
  }
  
  window.customElements.define('cmp-stock-info', StockInfo);
  export = StockInfo;