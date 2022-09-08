import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import moment from 'moment';
import { Tooltip, YAxis, XAxis, AreaChart, Area, CartesianGrid } from "recharts";

const CoinPage = () => {
    const [coins, setCoins] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const params = useParams();

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
        <div style={{ fontFamily: 'Montserrat',  color : 'white',  fontSize: '20px', fontFamily: 'Montserrat', fontWeight: 'bold' }} >
        {props.payload.map(v => <p>{v.value}</p>)}
        </div> 
    )
    
    return (
        <div className="coin-container">
            <div className="color-background">
                <h1 className="title-coin">{coins.name} <img src={ coins.image.thumb } alt={ coins.name }></img></h1>
                <div className="text-box">
                    <div className="next-to">
                        <p>Rank: <span className="blue">{coins.coingecko_rank}</span></p>
                        <p>Current Price: <span className="blue">${coins.market_data.current_price.usd}</span></p>
                        <div className="twenty-four-change">
                            <p>24hr change: </p>
                        <p
                            className={coins.market_data.price_change_percentage_24h > 0 ? "text-success" : "text-danger"}>
                            { coins.market_data.price_change_percentage_24h.toFixed(2) }%
                        </p> 
                        </div>
                        <p>Market Cap: <span className="blue">${coins.market_data.market_cap.usd.toLocaleString()}</span></p>
                        <p>Circulating Supply: <span className="blue">{coins.market_data.circulating_supply.toLocaleString()}</span></p>
                        <p>Total Supply: <span className="blue">{coins.market_data.total_supply.toLocaleString()}</span></p>
                    </div>
                    <div className="next-to">
                        <p>All-Time High: <span className="blue">${coins.market_data.ath.usd.toLocaleString()}</span></p>
                        <p>All-Time High Data: <span className="blue">{moment(coins.market_data.ath_date.usd).format('Do MMM YY') }</span></p>
                        <p>All-Time Low: <span className="blue">${coins.market_data.atl.usd.toLocaleString()}</span></p>
                        <p>All-Time Low Data: <span className="blue">{moment(coins.market_data.atl_date.usd).format('Do MMM YY')}</span></p>
                        <p className="hidden"> sadad</p>
                        <p className="hidden"> sadsad</p>
                    </div>
                </div>
                    <AreaChart width={960} height={300} data={coinPricingData}>
                        <Area type="monotone" dataKey="price" stroke={priceIncrease ? "#82ca9d" : "red"} fill={priceIncrease ? "#82ca9d" : "red"} dot={false} />
                        <Tooltip content={ Toolip } cursor={ false } wrapperStyle={{ outline: 'none' }} />
                        <YAxis width={80} type="number" tickFormatter={(value) => value.toFixed(2)} domain={['dataMin', 'auto']} />
                        {/* <XAxis domain={[0, 'auto']} /> */}
                        <CartesianGrid stroke="#000" strokeDasharray="5 5" />
                    </AreaChart>
            </div>
            
        </div>
    )
}
    
export default CoinPage;