import { Image, View, Text, FlatList, StyleSheet, TouchableOpacity  } from 'react-native'
import React, { useState, useEffect } from 'react'
import { collection, getDocs, query, where,  doc,  updateDoc, addDoc } from 'firebase/firestore';
import { userRef, pageUsersRef, db } from '../../firebase/config';
import {fetchAll, fetchUpdateAllEsportes} from '../../firebase/fetchsFunctions'

// Entrar nestes links: https://reactnative.dev/docs/sectionlist https://gemini.google.com/app/4d2257a7afed8685
// match making cloud https://stackoverflow.com/questions/69852087/matchmaking-in-firebase
const SportFriend = () => {
  const [usersData, setUsersData] = useState([]);

  const [found, setFound] = useState(false)
  const [friends, setFriends] = useState([])
  const [count, setCount] = useState(0);

  const handlePress = (username) => {
    console.log("item.username: ", username)
    setCount(count + 1);
  };

  const renderFriendsNames = ({ item }) => (
    <Text>{item}</Text>
  );
  const userAvatar = require("../../assets/man.png")
  let dataUsersChange ={}
  useEffect(()=>  {
    const runAsyncFunctions = async () => {
      const userListData = await fetchAll(userRef, setUsersData)
      console.log("dataFriends aqui: ", userListData)


      // const userListUpdateData = await fetchUpdateAllEsportes(userRef, setUsersData)
      // console.log("userListUpdateData aqui: ", userListUpdateData)

    }
      runAsyncFunctions()
    
    console.log("usersData aqui users: ", usersData)
    
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
          <Text>{item.id}</Text>
          {/* Access other array fields as needed */}
          <TouchableOpacity style={styles.button} onPress={() => handlePress(item.username)}>
            <Text style={styles.buttonText}>Press Me</Text>
          </TouchableOpacity>
          <Text style={styles.counterText}>Count: {count}</Text>
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
  buttonText: {
    color: '#e34e01',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'gold',
  },
  counterText: {
    fontSize: 24,
    marginBottom: 20,
  },
});