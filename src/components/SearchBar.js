import { useState } from "react";
import { TextField } from "@mui/material";

const SearchBar = () => {
    const [search, setSearch] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }

    return (
        <TextField
            className="coin-input"
            type='text'
            onChange={ handleChange }
            placeholder='Search...'
            sx={{ marginLeft: '3em', input: {color: 'white'}}}
            size="small"
        />
    )
}

export default SearchBar;