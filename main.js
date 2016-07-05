var StockPortfolioSimulator = React.createClass({
  render: function() {
    return <p>haha</p>;
  }
});

setInterval(function() {
  ReactDOM.render(
    <StockPortfolioSimulator />,
    document.getElementById('container')
  );
}, 50);
