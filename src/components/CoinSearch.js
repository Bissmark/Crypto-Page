import React from "react";
import { Link } from "react-router-dom";

const CoinSearch = () => {
    return (
        <div>
            <nav>
                <p>Logo | NightModeSwitch | <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link></p>
            </nav>

            <hr />

            <h1>Crypto Price by Market Cap</h1>

            <input placeholder="Search..."/>

            <hr />
        </div>
    )
    
}

export default CoinSearch;