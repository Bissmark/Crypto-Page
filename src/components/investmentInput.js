import React, { useState } from "react";
import { updateFirestoreCollectionEntry } from "./firestore";

export const InvestmentInput = ({value}) => {
    const [investmentAmount, setInvestmentAmount] = useState(0)

    const submitInvestment = (e, name) => {
        e.preventDefault();
        updateFirestoreCollectionEntry('favourites', name, 'investment', investmentAmount)
      }
    return (
        <form onSubmit={(e) => submitInvestment(e, value?.name)}>
        <input type="number" value={investmentAmount} onChange={(e) => setInvestmentAmount(e.target.value) }></input>
        <button type="submit">Submit</button>
      </form>
    )

}