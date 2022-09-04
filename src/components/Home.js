import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Coin from './Coin';
import { ThemeContext, themes } from "../contexts/ThemeContext";

function Home() {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');
    const [darkMode, setDarkMode] = useState(true);
  
    const headers = ['rank', 'name', 'price', '24hr', 'volume', 'marketcap']
  
    useEffect(() => {
      axios
        .get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
        )
        .then(res => {
          setCoins(res.data);
          console.log(res.data);
        })
        .catch(error => console.log(error));
    }, []);
  
    const handleChange = e => {
      setSearch(e.target.value);
    }
  
    const filteredCoins = coins.filter(coin =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );
  
    return (
        <div>
            <nav>
                <p>Logo | 
                    <ThemeContext.Consumer>
                    {({ changeTheme }) => (
              <button
                onClick={() => {
                  setDarkMode(!darkMode);
                  changeTheme(darkMode ? themes.light : themes.dark);
                }}
              >
                <span>Night/Day</span>
              </button>
            )}
                    
                    </ThemeContext.Consumer> 
                    
                    | <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link> </p>
            </nav>
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

                    <table>
                        <thead>
                        <tr className="headers">
                            { headers.map((header, i) => (
                                <td key={ i } onClick={ () => console.log('lmao') }>{ header }</td>
                            ))}
                        </tr>  
                        </thead>
                        <tbody>
                        {filteredCoins.map((coin, index) => (
                            <Coin key="coin.id" coin={coin} index={index + 1} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home;