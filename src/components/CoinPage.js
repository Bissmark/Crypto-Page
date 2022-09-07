import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import moment from 'moment';
import { LineChart, Tooltip, CartesianGrid, Line } from "recharts";

const CoinPage = () => {
    const [coins, setCoins] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const params = useParams();

    useEffect(() => { 
        axios.get(`https://api.coingecko.com/api/v3/coins/${ params.coinName }`)
          .then(res => {
            console.log(res.data);
            setCoins(res.data);
            setLoading(false);
          })
          .catch(error => console.log(error));
    }, []);

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    return (
        <div className="coin-container">
            <div className="color-background">
                <p>Rank: {coins.coingecko_rank}</p>
                <div>
                    <img className="image" src={ coins.image.thumb } alt={ coins.name }></img>
                    <p className="name">{coins.name}</p>
                    
                </div>
                
                <div className="current-price">
                <p>Current Price: ${coins.market_data.current_price.usd}</p>
                <p
                        className={
                            coins.market_data.price_change_percentage_24h > 0 ? "text-success" : "text-danger"
                        }
                    >
                        { coins.market_data.price_change_percentage_24h.toFixed(5) }%
                    </p> 
                </div>
                <p>Market Cap: ${coins.market_data.market_cap.usd.toLocaleString()}</p>
                <p>Circulating Supply: {coins.market_data.circulating_supply.toLocaleString()}</p>
                <p>Total Supply: {coins.market_data.total_supply.toLocaleString()}</p>
                <p>All-Time High: ${coins.market_data.ath.usd.toLocaleString()}</p>
                <p>All-Time High Data: {moment(coins.market_data.ath_date.usd).format('Do MMM YY') }</p>
                <p>All-Time Low: ${coins.market_data.atl.usd.toLocaleString()}</p>
                <p>All-Time Low Data: {moment(coins.market_data.atl_date.usd).format('Do MMM YY')}</p>
            </div>
            <div className="CoinPageTable">
                <td>
                    <LineChart width={500} height={250} data={coins.tickers}>
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <Tooltip />
                    </LineChart>
                </td>
            </div>
        </div>
    )
}

export default CoinPage;