import React, { useState } from "react";
import { updateFirestoreCollectionEntry, deleteFirestoreCollectionEntry } from "./firestore";
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

export const InvestmentInput = ({value}) => {
    const [investmentAmount, setInvestmentAmount] = useState(0)

    const submitInvestment = (e, name) => {
        e.preventDefault();
        updateFirestoreCollectionEntry('favourites', name, 'investment', investmentAmount)
    }

    const removeDbEntry = (name) => {
      deleteFirestoreCollectionEntry('favourites', name)
    }

    return (
        <form onSubmit={(e) => submitInvestment(e, value?.name)}>
          <Input sx={{color: '#1976d2'}} type="number" value={investmentAmount} onChange={(e) => setInvestmentAmount(e.target.value) }></Input>
          <Button sx={{ display: 'flex', margin: 'auto'}}variant="contained" type="submit">Submit</Button>
        </form>
    )

}