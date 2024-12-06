import { View, Text, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { collection, getDocs, query, where,  doc,  updateDoc, addDoc } from 'firebase/firestore';
import { userRef, pageUsersRef, db } from '../../firebase/config';


const SportFriend = () => {
  const [found, setFound] = useState(false)
  const [friends, setFriends] = useState([])
  const renderFriendsNames = ({ item }) => (
    <Text>{item}</Text>
  );
  useEffect(()=>  {
    async function SportFriendData(){
      // usuários
      const queryResult = query(userRef, where('username', '>=', "marc"), where('username', '<=', "marc"+'\uf8ff'))
      const querySnapshot = await getDocs(queryResult)

      // Esportes
      const querypageUsersRef = query(pageUsersRef)
      // console.log("Dados aqui: ", querypageUsersRef)
      const querypageUsersRefDataSnapshot = await getDocs(querypageUsersRef)
      console.log("dados query: ", querypageUsersRefDataSnapshot)
      if(!querySnapshot.empty){
        console.log("Entrou aqui")
        // let friends = []

        querySnapshot.forEach(  async (document)=> {
          console.log(`dados usuarios: `, document.data().username)
          await setFriends(friends =>[...friends, document.data().username])
          await console.log("todos os amigos : ", friends)
        })
        

        // Esportes
        // querypageUsersRefDataSnapshot.forEach((document)=>{
        //   console.log(`dados: `, document)
        //   console.log(`document.data(): `, document.data())
        //   console.log(`document.id: `, document.id)
        //   updateDoc(doc(db, 'PageUsers', document.id), {
        //       esportes:
        //       {
        //           futebol:true,
        //           futevolei: false,
        //           academia: true,
        //           crossfit: true
        //       }
        //   }).then(()=>{
        //     console.log("Document updated successfully!");
        //   })
        //   .catch((error) => {
        //     console.error("Error updating document: ", error);
        //   });
        // })
        
          // await addDoc(collection(db, "PageUsers"), {
          //   esportes:
          //     {
          //         futebol:true,
          //         futevolei: false,
          //         academia: true
          //     }
          
          // })
           
      }else{
        setFound(false)
      }
    }
    SportFriendData()
  }, [])
  return (
    <View>
      <Text>SportFriend</Text>
      <FlatList
            data={friends}
            renderItem={renderFriendsNames}
            keyExtractor={(item) => item}
        />
    </View>
  )
}

export default SportFriend