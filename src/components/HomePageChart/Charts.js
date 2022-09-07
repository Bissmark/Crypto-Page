import React from "react";
import Chart from "./Chart";

const Charts = ({ coinData }) => {
  
  return (
    <div>
      {coinData.map(coin => (
        <div className="chart__container" key={coin.name}>
          <Chart sparklineData={coin.sparkline_in_7d.price} />
        </div>
      ))}
    </div>
  );
};
export default Charts;