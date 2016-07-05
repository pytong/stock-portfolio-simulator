var StockPortfolioSimulator = React.createClass({
  getInitialState: function() {
    return {total: 10000, transactions: []};
  },

  updatePorfolio: function(transaction) {
    var total,
      transactions;

    total = this.state.total;
    total = total + +transaction.price;
    this.setState({total: total});

    transactions = this.state.transactions;
    transactions.push(transaction);
    this.setState({transactions: transactions});
  },

  render: function() {
    return (
      <div>
        <div className="total">${this.state.total}</div>
        <TransactionForm updatePorfolioCallback={this.updatePorfolio} />
        <TransactionList transactions={this.state.transactions}/>
      </div>
    );
  }
});

var TransactionList = React.createClass({
  render: function() {
    return (
      <div></div>
    );
  }


var TransactionForm = React.createClass({
  getInitialState: function() {
    return {symbol: '', price: ''};
  },

  handleSymbolChange: function(e) {
    this.setState({symbol: e.target.value});
  },

  handlePriceChange: function(e) {
    this.setState({price: e.target.value});
  },

  handlePortofioUpdate: function(e) {
    e.preventDefault();
    this.props.updatePorfolioCallback({symbol: this.state.symbol, price: this.state.price});
    this.setState({symbol: '', price: ''});
  },

  render: function() {
    return (
        <form className="transactionInput">
          <input
            type="text"
            placeholder="symbol"
            value={this.state.symbol}
            onChange={this.handleSymbolChange}
          />
          <input
            type="text"
            placeholder="price"
            value={this.state.price}
            onChange={this.handlePriceChange}
          />
          <input type="submit" value="BUY" onClick={this.handlePortofioUpdate} />
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
