import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import moment from 'moment';
import { LineChart, Tooltip, CartesianGrid, YAxis, Line, AreaChart, Area, XAxis } from "recharts";

const CoinPage = () => {
    const [coins, setCoins] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const params = useParams();

    useEffect(() => { 
        axios.get(`https://api.coingecko.com/api/v3/coins/${ params.coinName }?sparkline=true`)
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

    console.log(coins.market_data.sparkline_7d.price);

    const coinPricingData = coins.market_data.sparkline_7d.price.map(value => {
        return {"price": value.toFixed(5)}
    })

    const min = coins.market_data.sparkline_7d.price[0];
    const max = coins.market_data.sparkline_7d.price[coins.market_data.sparkline_7d.price.length - 1];
    const priceIncrease = max > min ? true : false;

    const Toolip = props =>  
        (! props.active) ? null :  ( 
        <div style={{ fontFamily: 'Roboto',  color : 'white',  fontSize: '12px', fontFamily: 'Montserrat', fontWeight: 'bold' }} >
        {props.payload.map(v => <p>{v.value}</p>)}
        </div> 
    )
    
    return (
        <div className="coin-container">
            <div className="color-background">
                <div className="inline-table-text">
                <p>Rank: {coins.coingecko_rank}</p>
                <div className="image-name">
                    <p>Name: {coins.name}</p>
                    <img src={ coins.image.thumb } alt={ coins.name }></img>
                </div>
                <div className="current-price">
                    <p>Current Price: ${coins.market_data.current_price.usd}</p>
                    <p
                        className={coins.market_data.price_change_percentage_24h > 0 ? "text-success" : "text-danger"}>
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
                <td className="inline-table-text">
                    <AreaChart width={500} height={300} data={coinPricingData}>
                        <Area type="monotone" dataKey="price" stroke={priceIncrease ? "#82ca9d" : "red"} fill={priceIncrease ? "#82ca9d" : "red"} dot={false} />
                        <Tooltip content={ Toolip } cursor={ false } wrapperStyle={{ outline: 'none' }} />
                        <YAxis hide={true} domain={['dataMin', 'dataMax']} />
                    </AreaChart>
                </td>
            </div>
        </div>
    )
}
    
export default CoinPage;