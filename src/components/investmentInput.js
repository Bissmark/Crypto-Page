import React, { useState } from "react";
import { updateFirestoreCollectionEntry, deleteFirestoreCollectionEntry } from "./firestore";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";

export const InvestmentInput = ({value}) => {
    const [investmentAmount, setInvestmentAmount] = useState(0)

    const submitInvestment = (e, name) => {
        e.preventDefault();
        updateFirestoreCollectionEntry('favourites', name, 'investment', investmentAmount)
        // console.log(value?.name)
    }

    const removeDbEntry = (name) => {
      deleteFirestoreCollectionEntry('favourites', name)
    }

    return (
        <form onSubmit={(e) => submitInvestment(e, value?.name)}>
          <TextField
            sx={{
              "& .MuiInputBase-root": {borderColor: 'white'},
              input: {color: 'white'}, display: 'block', margin: 'auto', textAlign: 'center', borderColor: 'white'}} 
            type="number" 
            value={investmentAmount} 
            onChange={(e) => setInvestmentAmount(e.target.value) }
          />
          <Button 
            sx={{ marginRight: '2em', marginTop: '1em'}} 
            variant="contained" 
            type="submit"
          >
            Submit
          </Button>
          <Button 
            sx={{ marginTop: '1em'}} 
            variant="contained" 
            color="error" 
            onClick={() => removeDbEntry(value?.name)}
          >
            Delete
          </Button>  
        </form>
    )

}