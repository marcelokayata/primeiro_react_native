import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getDocs, query, where } from 'firebase/firestore';
import { userRef } from '../../firebase/config';

const SportFriend = () => {
  const [found, setFound] = useState(false)
  const [searchFriendsName, setSearchFriendsName] = useState([])

  useEffect(()=>  {
    async function SportFriendData(){
      const queryResult = query(userRef, where('username', '>=', "marc"), where('username', '<=', "marc"+'\uf8ff'))
      const querySnapshot = await getDocs(queryResult)
      if(!querySnapshot.empty){
        let friends = []
        querySnapshot.forEach((document)=>{
            // console.log(`location document aqui: ${JSON.stringify(document)}`)
            const {profilePic, username} = document.data()
            console.log(`location username aqui: ${username}`)
            friends.push({profilePic,username})
        })
        setSearchFriendsName(friends)
        setFound(true)
      }else{
        setFound(false)
      }
    }
    SportFriendData()
  }, [])
  return (
    <View>
      <Text>SportFriend</Text>
    </View>
  )
}

export default SportFriend