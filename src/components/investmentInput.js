import React, { useState } from "react";
import { updateFirestoreCollectionEntry } from "./firestore";
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

export const InvestmentInput = ({value}) => {
    const [investmentAmount, setInvestmentAmount] = useState(0)

    const submitInvestment = (e, name) => {
        e.preventDefault();
        updateFirestoreCollectionEntry('favourites', name, 'investment', investmentAmount)
      }
    return (
        <form onSubmit={(e) => submitInvestment(e, value?.name)}>
        <Input sx={{color: '#1976d2', display: 'block', width: '50%'}} type="number" value={investmentAmount} onChange={(e) => setInvestmentAmount(e.target.value) }></Input>
        <Button variant="contained" type="submit">Submit</Button>
      </form>
    )

}