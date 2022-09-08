import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useEffect } from "react";

const GetUserName = ({ name, setName }) => {
    const [user, loading, error] = useAuthState(auth);

    const fetchUserName = async () => {
        try {
            if (!user) {
                setName('');
            } else {
                const q = query(collection(db, "users"), where("uid", "==", user?.uid));
                const doc = await getDocs(q);
                const data = doc.docs[0].data();
                setName(data.name);
            }
            
        } catch (err) {
            console.log(err);
            alert("An error occured while fetching user data lmao");
        }
    };
    useEffect(() => {
        if (loading) return;
        fetchUserName();
    }, [user, loading]);
}

export default GetUserName;