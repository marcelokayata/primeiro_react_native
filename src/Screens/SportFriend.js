import { Image, View, Text, FlatList, StyleSheet  } from 'react-native'
import React, { useState, useEffect } from 'react'
import { collection, getDocs, query, where,  doc,  updateDoc, addDoc } from 'firebase/firestore';
import { userRef, pageUsersRef, db } from '../../firebase/config';
import {fetchAll} from '../../firebase/fetchsFunctions'

// Entrar nestes links: https://reactnative.dev/docs/sectionlist https://gemini.google.com/app/4d2257a7afed8685

const SportFriend = () => {
  const [usersData, setUsersData] = useState([]);

  const [found, setFound] = useState(false)
  const [friends, setFriends] = useState([])
  const renderFriendsNames = ({ item }) => (
    <Text>{item}</Text>
  );
  const userAvatar = require("../../assets/man.png")
  let dataUsersChange ={}
  useEffect(()=>  {
    const fetchData = async () => {
      try{
      const querySnapshot = await getDocs(collection(db, 'Users'));
      const userData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      console.log("userData aqui conteudo: ", userData)
      querySnapshot.forEach((document)=>{
        dataUsersChange = document.data()
        console.log("userData aqui conteudo fetch data: ", dataUsersChange)
        dataUsersChange["esportes"] = {}
        dataUsersChange["esportes"].academia = true
        dataUsersChange["esportes"].crossfit = false
        console.log("userData aqui conteudo fetch data2: ", dataUsersChange)

      })
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }

    };
    const updateData = async () => {
      const queryResultPageUsersRef = await getDocs(pageUsersRef)
      const userDataUpdate = queryResultPageUsersRef.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      console.log("queryResultPageUsersRef -= ", userDataUpdate)
    }
    const runAsyncFunctions = async () => {
      const sportData = await fetchAll(setFriends, userRef)
      console.log("dataFriends aqui: ", sportData)
      setUsersData(sportData)
    }
    fetchData()
    updateData()
    console.log("usersData aqui users: ", usersData)
    runAsyncFunctions()
    
    console.log("Novos dados: ", friends)
  }, [])
  return (
    <>
    <FlatList
      data={usersData}
      renderItem={({ item }) => (
        <View>
          {item.profilePic ? (
            <Image source={{uri:item.profilePic}} className="h-12 w-12 rounded-full mx-3" />
          ):(
          <Image source={userAvatar}  className="h-12 w-12 mx-3"/>
        )}
          {/* Render your array data here */}
          <Text>{item.username}</Text>
          {/* Access other array fields as needed */}
        </View>
      )}
      keyExtractor={item => item.id}
    />
    </>
  )
}

export default SportFriend

const styles = StyleSheet.create({
  square: {
    width: 100,
    height: 100,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});