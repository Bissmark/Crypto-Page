import { TextField } from "@mui/material";
import './SearchBar.css'

const SearchBar = ({ setSearchQuery }) => {

    const handleChange = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
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