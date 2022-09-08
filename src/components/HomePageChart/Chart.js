import React from "react";
import moment from "moment";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip
} from "recharts";

const Chart = ({ sparklineData }) => {
  const formattedData = sparklineData
    .map((price, idx) => {
      if (idx % 6 === 0) {
        const timeToSubtract = 168 - idx;
        const date = moment()
          .subtract(timeToSubtract, "hours")
          .format("ddd h:mma");
        return { value: price, date };
      } else if (idx === sparklineData.length - 1) {
        const date = moment().format("ddd h:mma");
        return { value: price, date };
      }
      return null;
    })
    .filter(data => data);

  return (
    <LineChart width={150} height={100} data={formattedData}>
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <Tooltip />
    </LineChart>
  );
};

export default Chart;