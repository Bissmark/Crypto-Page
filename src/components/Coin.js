import React from "react";
import { Link } from "react-router-dom";
import { LineChart, Line, CartesianGrid, Tooltip } from "recharts";
// import moment from "moment";

const Coin = ({ coin }) => {
    return (
      <tr>
        <td>★</td>
        <td>{ coin.market_cap_rank }</td>
        <td>
            <img
                src={ coin.image }
                alt={ coin.name }
                style={{ width: "3%" }}
            />
            <span><Link to={coin.id} className="link">{coin.name}</Link></span>
        </td>
  
        <td>${ coin.current_price.toFixed(2).toLocaleString() }</td>
  
        <td
            className={
                coin.price_change_percentage_24h > 0 ? "text-success" : "text-danger"
            }
        >
            { coin.price_change_percentage_24h.toFixed(2) }%
        </td>
  
        <td>
            ${ coin.total_volume.toLocaleString() }
        </td>

        <td>
            ${ coin.market_cap.toLocaleString() }
        </td>
        <td>
            <LineChart width={150} height={100} data={coin.sparkline_in_7d.price}>
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <Tooltip />
            </LineChart>
        </td>
      </tr>
    );
  };

export default Coin;