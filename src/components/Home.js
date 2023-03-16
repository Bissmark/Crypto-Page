import React from "react";
import BasicTable from "./MuiTable";

const Home = ({ searchQuery }) => {
    return (
        <div>
            <div className="coin-app">
                <BasicTable searchQuery={ searchQuery } />
            </div>
        </div>
    )
}

export default Home;