import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db } from "../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { getFirestoreCollectionEntry, deleteFirestoreCollectionEntry } from "../firestore";
import Button from '@mui/material/Button';
import {InvestmentInput} from "../investmentInput"
import axios from 'axios';


function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [coins, setCoins] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [values, loadingFirebase, errorFB, snaphot] =
  getFirestoreCollectionEntry("favourites");
  
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.log(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true'
      )
      .then(res => setCoins(res.data))
      .catch(error => console.log(error))
  }, []);

  const removeDbEntry = (name) => {
    deleteFirestoreCollectionEntry('favourites', name)
  }

  const sumInvestment = (items) => {
    return items.reduce( function(a, b){
        if(!b['investment']){
            return a
        }
        return parseInt(a) + parseInt(b['investment']);
    }, 0);
  }

  const sumCurrentInvestment = (items) => {
    console.log('items', items)
    return items.reduce( function(a, b){
        console.log(a)
        const currentCoin = coins.filter(coin => coin.id === b.name)[0]
        console.log('current coin',currentCoin)
        if(!currentCoin) return a
        if(!currentCoin.price_change_percentage_24h) return a
        const currentCOinPercentGrowth = currentCoin.price_change_percentage_24h
       

        if(!b['investment']){
            return a
        }
        return parseInt(a) + (1 + currentCOinPercentGrowth  / 100) * parseInt(b['investment']);
    }, 0);
  }

  const currentInvestmentValue = (initialInvestment, name) => {
    if(!initialInvestment) return 0
    const currentCoin = coins.filter(coin => coin.id === name)[0]
    if(!currentCoin || !currentCoin.price_change_percentage_24h) return initialInvestment
    console.log(currentCoin)
    return (1 + currentCoin.price_change_percentage_24h /100) * initialInvestment
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  return (
    <div className="dashboard" style={{flexWrap: 'wrap', margin: '5em'}}>
      <div className="dashboard_container">
          <h1 className="profile-name">{ name }</h1>
          <div>Email: <span className="blue">{ user?.email }</span></div>
        </div>
        <h1>Portfolio</h1>
        {loadingFirebase && <span>Data: Loading</span>}
        {values && (
          <div>
            {values.map((value) => {
                if(value.name){
                    return (
                        <div className="favourites" style={{ width: '20%'}}>
                          {value?.name && <div><b>Name:</b> <span className="blue">{value?.name.charAt(0).toUpperCase() + value?.name.slice(1)}</span></div>}
                          {value?.marketCap && <div><b>MarketCap:</b> <span className="blue">{value?.marketCap.toLocaleString()}</span></div>}
                          {value?.price && <div><b>Price:</b> <span className="blue">${value?.price}</span></div>}
                          <div className="twenty-four-change">
                            <p><b>24hr change:</b></p>
                        <p
                            className={value?.twentyFourHour > 0 ? "text-success" : "text-danger"}>
                            { value?.twentyFourHour.toFixed(2) }%
                        </p>
                        </div>
                          {value?.volume && <div><b>Volume:</b> <span className="blue">{value?.volume.toLocaleString()}</span></div>}
                          {value?.volume && <div><b>Initial Investment:</b> <span className="blue">{value?.investment}</span></div>}
                          {value?.volume && <div><b>Current Investment:</b> <span className="blue">{currentInvestmentValue(value?.investment,value?.name )}</span></div>}
                          <InvestmentInput value={value}/>
                          <Button variant="contained" color="error" onClick={() => removeDbEntry(value?.name)}>Delete</Button>
                        </div>
                      );
                }
             
            })}
              <div>Total Initial Investment: <span className="blue">{sumInvestment(values)}</span></div>
              <div>Total Current Investment: <span className="blue">{sumCurrentInvestment(values)}</span></div>
              <div>Total Gain/Loss: <span className="blue">{sumInvestment(values) - sumCurrentInvestment(values)}</span></div>
          </div>
        
        )}
      </div>
  );
}

export default Dashboard;
