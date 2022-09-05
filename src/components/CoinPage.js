import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import moment from 'moment';


const CoinPage = () => {
    const [coins, setCoins] = useState([]);
    const [isLoading, setLoading] = useState(true);
    
    console.log('lmao');
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
        <div>
            <p>Rank: {coins.coingecko_rank}</p>
            <div>
                <img className="image" src={ coins.image.thumb } alt={ coins.name }></img>
                <p className="name">{coins.name}</p>
            </div>
            <p>Current Price: ${coins.market_data.current_price.usd}</p>
            <p
                className={
                    coins.market_data.price_change_percentage_24h > 0 ? "text-success" : "text-danger"
                }
            >
                { coins.market_data.price_change_percentage_24h.toFixed(5) }%
            </p>
            <p>Market Cap: ${coins.market_data.market_cap.usd.toLocaleString()}</p>
            <p>Circulating Supply: {coins.market_data.circulating_supply.toLocaleString()}</p>
            <p>Total Supply: {coins.market_data.total_supply.toLocaleString()}</p>
            <p>Max Supply: {coins.market_data.max_supply.toLocaleString() }</p>
            <p>All-Time High: ${coins.market_data.ath.usd.toLocaleString()}</p>
            <p>All-Time High Data: {moment(coins.market_data.ath_date.usd).format('Do MMM YY') }</p>
            <p>All-Time Low: ${coins.market_data.atl.usd.toLocaleString()}</p>
            <p>All-Time Low Data: {moment(coins.market_data.atl_date.usd).format('Do MMM YY')}</p>

        
        </div>
    )
}

export default CoinPage;