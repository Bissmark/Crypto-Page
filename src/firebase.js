import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCss4CttkNBgoA3X1JMYn_3gK6Y-WZSyWg",
    authDomain: "ceegecrypto.firebaseapp.com",
    projectId: "ceegecrypto",
    storageBucket: "ceegecrypto.appspot.com",
    messagingSenderId: "230442394037",
    appId: "1:230442394037:web:66bcf06ef410b6adb939fc",
    measurementId: "G-RNSQ1M2WKS"
};
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// const provider = new GoogleAuthProvider();
// signInWithPopup(auth, provider)
//     .then((result) => {
//         // This give you a Google access token. You can use it to access the Google API.
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;
//         // The signed in user info
//         const user = result.user;
//         // IdP data avaliable using get AdditionalUserInfo(result)
//     }).catch((error) => {
//         // Handle errors here
//         const errorCode = error.code;
//         const ErrorMessage = error.message;
//         // The email of the user's account used
//         const email = error.customData.email;
//         // The AuthCredential type that was used
//         const credential = GoogleAuthProvider.credentialFromError(error);
// })

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        //console.log(res)
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email
            });
        }
    } catch(err) {
        console.log(err);
        alert(err.message);
    }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.log(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        });
    } catch (err) {
        console.log(err);
        alert(err.message);
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert('Password reset link send!');
    } catch (err) {
        console.log(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout
};