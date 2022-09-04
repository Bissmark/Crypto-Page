import React from "react";

const Coin = ({ coin }) => {
    return (
      <tr>
        <td>{coin.market_cap_rank}</td>
        <td>
            <img
                src={coin.image}
                alt=""
                style={{ width: "3%" }}
            />
            <span>{coin.name}</span>
        </td>
  
        <td>${coin.current_price.toFixed(2).toLocaleString()}</td>
  
        <td
            className={
                coin.price_change_percentage_24h > 0 ? "text-success" : "text-danger"
            }
        >
            {coin.price_change_percentage_24h.toFixed(2)}%
        </td>
  
        <td>
            ${coin.total_volume.toLocaleString()}
        </td>

        <td>
            ${ coin.market_cap.toLocaleString() }
        </td>
      </tr>
    );
  };

export default Coin;