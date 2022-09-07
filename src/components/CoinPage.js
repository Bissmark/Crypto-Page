import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import moment from 'moment';
import { LineChart, Tooltip, CartesianGrid, YAxis, Line } from "recharts";

const CoinPage = () => {
    const [coins, setCoins] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [coin, setCoin] = useState([]);

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

    useEffect(() => {
        axios
          .get(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true'
          )
          .then(res => setCoin(res.data))
          .catch(error => console.log(error))
      }, []);

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    const Toolip = props =>  
        (! props.active) ? null :  ( 
        <div style={{ fontFamily: 'Roboto',  color : 'white',  fontSize: '12px', fontFamily: 'Montserrat', fontWeight: 'bold' }} >
        {props.payload.map(v => <p>{v.value}</p>)}
        <p>{ props.label }</p>
        </div> 
    )

    const coinPricingData = coin.filter(name => {
        return {"price": name}
    })

    console.log(coinPricingData);

    return (
        <div className="coin-container">
            <div className="color-background">
                <p>Rank: {coins.coingecko_rank}</p>
                <div className="image-name">
                    <p>Name: {coins.name}</p>
                    <img src={ coins.image.thumb } alt={ coins.name }></img>
                </div>
                
                <div className="current-price">
                <p>Current Price: ${coins.market_data.current_price.usd}</p>
                <p
                        className={
                            coins.market_data.price_change_percentage_24h > 0 ? "text-success" : "text-danger"
                        }
                    >
                        { coins.market_data.price_change_percentage_24h.toFixed(2) }%
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
            <td>
                <LineChart width={350} height={100} data={coinPricingData}>
                    <Line type="monotone" dataKey="price" stroke="#82ca9d" />
                    <Tooltip content={ Toolip } cursor={ false } />
                    <YAxis hide={true} domain={['dataMin', 'dataMax']} />
                </LineChart> 
            </td>
        </div>
    )
}

export default CoinPage;