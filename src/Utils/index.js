import { Alert } from "react-native"


const combinedData = (friendAvatar, sortedLastMessage) => {
    return friendAvatar.map((friend)=> {
        const lastMessageData = sortedLastMessage.find((chat)=> chat.chatters.includes(friend.name))
        return {
            ...friend,
            lastMessage: lastMessageData?lastMessageData.message : ''
        }
    })
}

function processAuthError(authError){
    if(authError.message.includes('user-not-found')){
        Alert.alert('User not found', 'You probably have to sign up first')
    } else if(authError.message.includes('wrong-password')){
        Alert.alert('Wrong password', 'Try again')
    } else if(authError.message.includes('email-already-in-use')){
        Alert.alert('Please use another email','This e-mail ID already exists, use a different one')
    } else if (authError.message.includes('network-request-failed')){
        Alert.alert('Network error', 'Try again later or check your internet connection')
    } else if (authError.message.includes('invalid-email')) {
        Alert.alert('Invalid E-mail', 'E-mail should be in the right format')
    } else if (authError.message.includes('auth/invalid-credentia')) {
        Alert.alert('Invalid credential')
    } 
    else if (authError.message.includes('auth/too-many-requests')) {
        Alert.alert('To many failed login attempts', 'You can immediately restore it by resetting your password or you can try again later')
    } 
    else{
        console.log(" Aqui: ", authError.message)
        Alert.alert('Unknown error', 'Try again later')
    }
}

export { combinedData, processAuthError}