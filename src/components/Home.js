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
                        <th>
                            <button>
                               # 
                            </button>
                        </th>
                        <th>
                            <button>
                                Coin
                            </button>
                        </th>
                        <th>
                            <button>
                                Price
                            </button>
                        </th>
                        <th>
                            <button>
                                1hr
                            </button>
                        </th>
                        <th>
                            <button>
                                24hr
                            </button>
                        </th>
                        <th>
                            <button>
                                7d
                            </button>
                        </th>
                        <th>
                            <button>
                                24hr Volume
                            </button>
                        </th>
                        <th>
                            <button>
                                Mkt Cap
                            </button>
                        </th>
                        <th>
                            <button>
                                Last 7 days
                            </button>
                        </th>
                    </tr>
                </tbody>
            </table>

            <hr />

        </div>
    )
}

export default Home;