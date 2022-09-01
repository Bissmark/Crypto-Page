import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <nav>
                <p>Logo | NightModeSwitch | <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link></p>
            </nav>

            <hr />

            <h1>Crypto Price by Market Cap</h1>

            <input placeholder="Search..."/>

            <hr />

            <table>
                <tbody>
                    <tr>
                        <th>#</th>
                        <th>Coin</th>
                        <th>Price</th>
                        <th>1hr</th>
                        <th>24hr</th>
                        <th>7d</th>
                        <th>24hr Volume</th>
                        <th>Mkt Cap</th>
                        <th>Last 7 days</th>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default Home;