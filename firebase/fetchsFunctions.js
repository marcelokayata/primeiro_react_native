import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db} from './config'
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

export const fetchUpdateAllEsportes = async (docSelected) => {
  try{
  const querySnapshot = await getDocs(docSelected)
  const userData = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
  let esportes
  console.log("Data fetch all here: ", userData)
  querySnapshot.forEach((document)=>{
    // esportes = document.data()
    console.log("userData aqui conteudo fetch data: ", esportes)
    console.log("document id aqui conteudo fetch data: ", document.id)
    esportes = {}
    esportes.academia = true
    esportes.crossfit = false
    esportes.futebol = false
    esportes.futevolei = false
    esportes.corrida = false
    esportes.caminhada = false
    console.log("userData aqui conteudo fetch data2: ", esportes)
    updateDoc(doc(db, "Users", document.id), {
                esportes
              }).catch((error)=>console.log(error))
    

  })
  return esportes

  
  }
  catch (error) {
      console.error('Error fetching data fetchAll:', error);
    }
}