import { collection, getDocs } from 'firebase/firestore';

export const fetchAll = async (setDataHere, docSelected) => {
    try{
    const querySnapshot = await getDocs(docSelected)
    const userData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
    await setDataHere(userData)
    console.log("Data fetch all here: ", userData)
    return  userData
    }
    catch (error) {
        console.error('Error fetching data fetchAll:', error);
      }
}