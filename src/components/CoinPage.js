import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import moment from 'moment';
import { Tooltip, YAxis, AreaChart, Area, CartesianGrid } from "recharts";
import { useMediaQuery } from "react-responsive";
import "./CoinPage.css"

const CoinPage = () => {
    const [coins, setCoins] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const params = useParams();
    const isBigScreen = useMediaQuery({ query: '(min-width: 600px)'});

    useEffect(() => { 
        axios.get(`https://api.coingecko.com/api/v3/coins/${ params.coinName }?sparkline=true`)
          .then(res => {
            setCoins(res.data);
            setLoading(false);
          })
          .catch(error => console.log(error));
    }, []);

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    const coinPricingData = coins.market_data.sparkline_7d.price.map(value => {
        return {"price": value.toFixed(5)}
    })

    const min = coins.market_data.sparkline_7d.price[0];
    const max = coins.market_data.sparkline_7d.price[coins.market_data.sparkline_7d.price.length - 1];
    const priceIncrease = max > min ? true : false;

    const Toolip = props =>  
        (! props.active) ? null :  ( 
        <div style={{ fontFamily: 'Montserrat',  color : 'white',  fontSize: '15px', fontFamily: 'Montserrat', fontWeight: 'bold' }} >
        {props.payload.map((v, i) => <p key={i}>{v.value}</p>)}
        </div> 
    )
    
    return (
        <div className="coin-container">
            <div className="color-background">
                <h1 className="title-coin">{coins.name} <img src={ coins.image.thumb } alt={ coins.name }></img></h1>
                <div className="text-box">
                    <div className = { isBigScreen ? "next-to" : "next-to-mobile"}>
                        <p>Rank: <span>{coins.coingecko_rank}</span></p>
                        <p>Current Price: <span>${coins.market_data.current_price.usd}</span></p>
                        <div className="twenty-four-change">
                            <p>24hr change:</p>
                            <p className={coins.market_data.price_change_percentage_24h > 0 ? "text-success" : "text-danger"}>
                                { coins.market_data.price_change_percentage_24h.toFixed(2) }%
                            </p> 
                        </div>
                        <p>Market Cap: <span>${coins.market_data.market_cap.usd.toLocaleString()}</span></p>
                        <p>Circulating Supply: <span>{coins.market_data.circulating_supply.toLocaleString()}</span></p>
                        <p>Total Supply: <span>{coins.market_data.total_supply.toLocaleString()}</span></p>
                    </div>
                    <div className = { isBigScreen ? "next-to" : "next-to-mobile"}>
                        <p>All-Time High: <span>${coins.market_data.ath.usd.toLocaleString()}</span></p>
                        <p>All-Time High Data: <span>{moment(coins.market_data.ath_date.usd).format('Do MMM YY') }</span></p>
                        <p>All-Time Low: <span>${coins.market_data.atl.usd.toLocaleString()}</span></p>
                        <p>All-Time Low Data: <span>{moment(coins.market_data.atl_date.usd).format('Do MMM YY')}</span></p>
                    </div>
                </div>
                <AreaChart className = { isBigScreen ? "" : "graph-mobile"} width = { isBigScreen ? 960 : 340} height = { isBigScreen ? 300 : 200} data={coinPricingData}>
                    <Area type="monotone" dataKey="price" stroke={priceIncrease ? "#82ca9d" : "red"} fill={priceIncrease ? "#82ca9d" : "red"} dot={false} />
                    <Tooltip content={ Toolip } cursor={ false } wrapperStyle={{ outline: 'none' }} />
                    <YAxis style = { isBigScreen ? {fontSize: '15px'} : {fontSize: '10px'}} width={80} type="number" tickFormatter={(value) => value.toFixed(2)} domain={['dataMin', 'auto']} />
                    <CartesianGrid stroke="#000" strokeDasharray="5 5" />
                </AreaChart> 
            </div>
        </div>
    )
}
    
export default CoinPage;