import { collection, getDocs } from 'firebase/firestore';

export const fetchAll = async (docSelected, setData) => {
    try{
    const querySnapshot = await getDocs(docSelected)
    const userData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
    console.log("Data fetch all here: ", userData)
    setData(userData)

    return  userData
    }
    catch (error) {
        console.error('Error fetching data fetchAll:', error);
      }
}