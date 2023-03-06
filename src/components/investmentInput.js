import React, { useState } from "react";
import { updateFirestoreCollectionEntry, deleteFirestoreCollectionEntry } from "./firestore";
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

export const InvestmentInput = ({value}) => {
    const [investmentAmount, setInvestmentAmount] = useState(0)
    console.log(value);

    const submitInvestment = (e, name) => {
        e.preventDefault();
        updateFirestoreCollectionEntry('favourites', name, 'investment', investmentAmount)
        console.log(value?.name)
    }

    const removeDbEntry = (name) => {
      deleteFirestoreCollectionEntry('favourites', name)
    }

    return (
        <form onSubmit={(e) => submitInvestment(e, value?.name)}>
          <Input sx={{color: '#1976d2', display: 'block', width: '50%', margin: 'auto'}} type="number" value={investmentAmount} onChange={(e) => setInvestmentAmount(e.target.value) }></Input>
          <Button sx={{ marginRight: '2em', marginTop: '1em'}} variant="contained" type="submit">Submit</Button>
          <Button sx={{ marginTop: '1em'}} variant="contained" color="error" onClick={() => removeDbEntry(value?.name)}>Delete</Button>  
        </form>
    )

}