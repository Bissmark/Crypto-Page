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
            console.log(res.data.data.active_cryptocurrencies);
            setCoin(res.data);
            setLoading(false);
          })
          
          .catch(error => console.log(error))
    }, []);

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    //console.log(coin.data.active_cryptocurrencies);

    return (
        <div className="navbar-left">
              <p>Amount of Coins: {coin.data.active_cryptocurrencies} </p>
              <p>Total Market Cap: {coin.data.total_market_cap.usd.toLocaleString()}</p>
              <p>Total 24hr Volume: {coin.data.total_volume.usd.toLocaleString()}</p>
        </div>
    )
}

export default TotalCoinInfo;