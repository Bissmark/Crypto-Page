import React, { useEffect, useState } from "react";
import axios from "axios";

const TotalCoinInfo = () => {
    const [coin, setCoin] = useState('');
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        axios
          .get(
            'https://api.coingecko.com/api/v3/global'
          )
          .then(res => {
            setCoin(res.data);
            setLoading(false);
          })
          
          .catch(error => console.log(error))
    }, []);

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    return (
        <nav>
          <ul className="left-area">
              <p>Amount of Coins: <span className="blue">{coin.data.active_cryptocurrencies}</span> </p>
              <p>Total Market Cap: <span className="blue">{coin.data.total_market_cap.usd.toLocaleString(undefined, { 'minimumFractionDigits': 2,'maximumFractionDigits': 2 })}</span></p>
              <p>Total 24hr Volume: <span className="blue">{coin.data.total_volume.usd.toLocaleString(undefined, { 'minimumFractionDigits': 2,'maximumFractionDigits': 2 })}</span></p>
          </ul>    
        </nav>
    )
}

export default TotalCoinInfo;