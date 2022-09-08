import React, {useState} from "react";
import BasicTable from "./MuiTable";

const Home = () => {

    const[selectedRow, setSelectedRow] = useState("")
    return (
        <div>
            <div className="coin-app">
                <BasicTable />
            </div>
        </div>
    )
}

export default Home;