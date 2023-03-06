import { collection } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { doc, setDoc, deleteDoc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore";
import { db } from "../firebase"

export const getFirestoreCollectionEntry = (collectionName) => {
    let collectionData = useCollectionData
    return collectionData(
        collection(db, collectionName)
    )
}

export const updateFirestoreCollectionEntry = async (collectionName, title, field, value) => {
    await updateDoc(doc(db, collectionName, title), {
        title,
        [field]:value
    });           
}

export const updateFirestoreCollectionArrayEntry = async (collectionName, title, field, value) => {
    console.log(123, value, field)
    await updateDoc(doc(db, collectionName, title), {
        title,
        [field]:arrayUnion(value)
    });           
}

export const removeFirestoreCollectionArrayEntry = async (collectionName, title, field, value) => {
    // Add a new document in collection "cities"
    console.log(123, value, field)
    await updateDoc(doc(db, collectionName, title), {
        title,
        [field]:arrayRemove(value)
    });           
}

export const addFirestoreCollectionEntry = async (collectionName, rank, name, price, volume, marketCap, sevenDays, twentyFourHour) => {
    // Add a new document in collection "cities"
    await setDoc(doc(db, collectionName, name), {
        name,
        price,
        volume,
        marketCap,
        sevenDays,
        twentyFourHour
    });           
}

export const deleteFirestoreCollectionEntry = async (collectionName, name) => {
    console.log(name)
    await deleteDoc(doc(db, collectionName, name));
}
