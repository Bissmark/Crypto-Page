import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { getFirestoreCollectionEntry, deleteFirestoreCollectionEntry } from "../firestore";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [values, loadingFirebase, errorFB, snaphot] =
    getFirestoreCollectionEntry("favourites");
  console.log(values);
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.log(err);
      alert("An error occured while fetching user data");
    }
  };

  const removeDbEntry = (name) => {
    deleteFirestoreCollectionEntry('favourites', name)
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  return (
    <div className="dashboard" style={{flexWrap: 'wrap', margin: '5em'}}>
      <div className="dashboard_container">
                    <h1 className="profile-name">{ name }</h1>
                    <div>{ user?.email }</div>
                    {/* <button className="dashboard_btn" onClick={ logout }>
                        Logout
                    </button> */}
        </div>
        {loadingFirebase && <span>Data: Loading</span>}
        {values && (
          <div style={{display:'flex', width: '100%', flexWrap: 'wrap'}}>
            {values.map((value) => {
                if(value.name){
                    return (
                        <div style={{display:'flex', width: '100%'}}>
                          {value?.name && <div><b>Name:</b> {value?.name}</div>}
                          {value?.marketCap && <div><b>MarketCap:</b> {value?.marketCap}</div>}
                          {value?.price && <div><b>Price:</b> {value?.price}</div>}
                          {value?.twentyFourHour && (
                            <div><b>24Hr:</b> {value?.twentyFourHour}</div>
                          )}
                          {value?.volume && <div><b>Volume:</b> {value?.volume}</div>}
                          <button onClick={() => removeDbEntry(value?.name)}>x</button>
                        </div>
                      );
                }
             
            })}
          </div>
        )}
      </div>
  );
}

export default Dashboard;
