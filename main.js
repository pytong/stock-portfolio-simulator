var StockPortfolioSimulator = React.createClass({
  getInitialState: function() {
    return {total: 10000, trades: []};
  },

  updatePorfolio: function(transaction) {
    var transactionPrice = +transaction.price;

    if(transaction.type == "BUY") {
      this.state.entryPrice = transactionPrice;
    } else {
      var priceDiff,
          trades,
          total = this.state.total,
          entryPrice = this.state.entryPrice;

      priceDiff = transaction.price - entryPrice;
      total = total + total * (priceDiff / entryPrice);
      total = Number((total).toFixed(2));
      this.setState({total: total});

    trades = this.state.trades;
    trades.push({symbol: transaction.symbol, entryPrice: entryPrice, exitPrice: transactionPrice, total: total});
    trades.reverse();
    this.setState({trades: trades});
    }
  },

  render: function() {
    return (
      <div>
        <div className="total">${this.state.total}</div>
        <TransactionForm updatePorfolioCallback={this.updatePorfolio} />
        <TradeList trades={this.state.trades}/>
      </div>
    );
  }
});

var TradeList = React.createClass({
  generateTransactionId: function() {
    return Math.floor((Math.random() * 1000000) + 1);
  },

  render: function() {
    var _this = this,

    tradeNodes = this.props.trades.map(function(trade) {
      return (
        <Trade key={_this.generateTransactionId()} trade={trade} />
      );
    });

    return (
      <div className="tradeList">
        {tradeNodes}
      </div>
    );
  }
});

var Trade = React.createClass({
  render: function() {
    return (
      <div className="trade">{this.props.trade.symbol}. Bought@{this.props.trade.entryPrice}. Sold@{this.props.trade.exitPrice}. Total: {this.props.trade.total}</div>
    );
  }
});

var TransactionForm = React.createClass({
  getInitialState: function() {
    return {symbol: '', price: '', type: 'BUY'};
  },

  handleSymbolChange: function(e) {
    this.setState({symbol: e.target.value.toUpperCase()});
  },

  handlePriceChange: function(e) {
    this.setState({price: e.target.value});
  },

  handlePortofioUpdate: function(e) {
    var type;

    e.preventDefault();

    this.props.updatePorfolioCallback({symbol: this.state.symbol, price: this.state.price, type: this.state.type});

    if(this.state.type == "BUY") {
      this.setState({type: "SELL"});
    } else {
      this.setState({type: "BUY", symbol: ''});
    }

    this.setState({price: ''});
  },

  render: function() {


    return (
        <form className="transactionInput">
          <input
            type="text"
            placeholder="symbol"
            value={this.state.symbol}
            disabled={this.state.type == 'SELL'}
            onChange={this.handleSymbolChange}
          />
          <input
            type="text"
            placeholder="price"
            value={this.state.price}
            onChange={this.handlePriceChange}
          />
          <input type="submit" value={this.state.type} onClick={this.handlePortofioUpdate} />
        </form>
    );
  }
});


setInterval(function() {
  ReactDOM.render(
    <StockPortfolioSimulator />,
    document.getElementById('container')
  );
}, 50);
