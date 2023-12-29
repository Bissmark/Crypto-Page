import { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const generateSignature = (apiKey, nonce) => {
  const message = `nonce=${nonce}`;
  const secret = apiKey; // Replace with your actual secret key
  const signature = CryptoJS.HmacSHA512(message, secret).toString(CryptoJS.enc.Hex);
  return signature;
};

const Coinspot = () => {
    const [coins, setCoins] = useState([]);
    const API_URL = 'https://www.coinspot.com.au/api/ro/my/balances'; // Replace with your server API endpoint
    const apiKey = process.env.REACT_APP_COINSPOT_KEY;

    useEffect(() => {
    const nonce = Date.now();
    const signature = generateSignature(apiKey, nonce);

    axios.post(API_URL, null, {
      headers: {
        'key': apiKey,
        'sign': signature,
        'nonce': nonce,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => {
        console.log(res);
        setCoins(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [apiKey]);

    // useEffect(() => {
    //     const fetchCoins = async () => {
    //     try {
    //         // Make a request to your server to fetch data from CoinSpot API
    //         const response = await fetch(API_URL, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             // Add any other headers needed for authentication, like your API key
    //             'Authorization': process.env.REACT_APP_COINSPOT_KEY,
    //         },
    //         });

    //         if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //         }

    //         const data = await response.json();
    //         setCoins(data); // Update state with the fetched coins data
    //         console.log(data);
    //     } catch (error) {
    //         console.error('Error fetching data:', error.message);
    //         // Handle errors as needed
    //     }
    //     };

    //     fetchCoins(); // Call the fetchCoins function when the component mounts
    // }, [API_URL]); // Dependencies array to ensure the effect runs only once

    return (
        <div>
        <h1>Your Crypto Coins</h1>
        <ul>
            {coins.map((coin) => (
            <li key={coin.id}>{coin.name}: {coin.balance}</li>
            ))}
        </ul>
        </div>
    );
};

export default Coinspot;