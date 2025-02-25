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

export const fetchUpdateLikeFriend = async (docSelected, userId, likes) => {
  try{
  // Estou utilizando o PageUsers para aprender, mas o correto no final será o Users
  const querySnapshot = await getDocs(docSelected)
  const userData = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
  console.log("Data fetch friend all here: ", userData)
  console.log("Data fetch friend likes: ", userData[0].likes)
  let likesSet = new Set(userData[0].likes)
  const likeAlreadyExists = likesSet.has(userId)
  console.log("likeAlreadyExists: ", likeAlreadyExists)
  if (likeAlreadyExists == false){

    querySnapshot.forEach((document)=>{
      // esportes = document.data()
      console.log("entrou no likeAlreadyExists:")
      console.log("document id aqui conteudo fetch friend data: ", document.id)
      likes = []
      likes.push(userId)
      // esportes.crossfit = false
      // esportes.futebol = false
      // esportes.futevolei = false
      // esportes.corrida = false
      // esportes.caminhada = false
      // console.log("userData aqui conteudo fetch friend data2: ", esportes)
      updateDoc(doc(db, "PageUsers", document.id), {
        likes
                }).catch((error)=>console.log(error))
      
  
    })
  }
  return ""

  
  }
  catch (error) {
      console.error('Error fetching data fetchAll:', error);
    }
}