import { Image, View, Text, FlatList, StyleSheet  } from 'react-native'
import React, { useState, useEffect } from 'react'
import { collection, getDocs, query, where,  doc,  updateDoc, addDoc } from 'firebase/firestore';
import { userRef, pageUsersRef, db } from '../../firebase/config';


// Entrar nestes links: https://reactnative.dev/docs/sectionlist https://gemini.google.com/app/4d2257a7afed8685

const SportFriend = () => {
  const [usersData, setUsersData] = useState([]);

  const [found, setFound] = useState(false)
  const [friends, setFriends] = useState([])
  const renderFriendsNames = ({ item }) => (
    <Text>{item}</Text>
  );
  const userAvatar = require("../../assets/man.png")
  useEffect(()=>  {
    const fetchData = async () => {
      try{
      const querySnapshot = await getDocs(collection(db, 'Users'));
      const userData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setUsersData(userData);
      console.log("userData aqui: ", userData)
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }

    };
    fetchData()
    console.log("usersData aqui: ", usersData)
  }, [])
  return (
    <FlatList
      data={usersData}
      renderItem={({ item }) => (
        <View>
          <Image source={userAvatar}  className="h-12 w-12 mx-3"/>
          
          <Image source={{uri:item.profilePic}} className="h-12 w-12 rounded-full mx-3" />
          {/* Render your array data here */}
          <Text>{item.username}</Text>
          {/* Access other array fields as needed */}
        </View>
      )}
      keyExtractor={item => item.id}
    />
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