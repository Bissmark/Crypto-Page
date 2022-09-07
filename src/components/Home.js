import React, { useState, useEffect } from "react";
import axios from 'axios';
import Coin from './Coin';
import Charts from "./HomePageChart/Charts";
import BasicTable from "./MuiTable";

const Home = () => {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');
    const headers = ['', 'rank', 'name', 'price', '24hr', 'volume', 'marketcap', 'Last 7 Days'];

    useEffect(() => {
      axios
        .get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true'
        )
        .then(res => setCoins(res.data))
        .catch(error => console.log(error))
    }, []);
  
    const handleChange = e => {
      setSearch(e.target.value);
    }
  
    const filteredCoins = coins.filter(coin =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            
            <div className="coin-app">
                <div className="coin-search">
                    <h1 className="coin-text">Search a currency</h1>
                    <form>
                        <input
                        className="coin-input"
                        type='text'
                        onChange={ handleChange }
                        placeholder='Search...'
                        />
                    </form>
                </div>
                <div>
                    <BasicTable />
                </div>
                {/* <table>
                    <thead>
                    <tr className="headers">
                        { headers.map((header, i) => (
                            <td key={ i } coins={coins}  onClick={() => console.log(header)} >{ header }</td>
                        ))}
                    </tr> 
                    </thead>
                    <tbody>
                        {filteredCoins.map((coin, index) => (
                            <Coin key={coin.id} coin={coin} index={index + 1} />
                        ))}
                        {/* <Charts coinData={coins} />  */}
                    {/* </tbody> */}
                {/* </table> */}
            </div>
        </div>
    )
}

export default Home;