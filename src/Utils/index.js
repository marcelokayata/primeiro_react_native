const sortLastMessage = (a,b) => {
    const aTimeStamp = a.message[0]?.TimeStamp || 0
    const bTimeStamp = b.message[0]?.TimeStamp || 0
    return bTimeStamp - aTimeStamp
}

const combinedData = (friendAvatar, sortedLastMessage) => {
    return friendAvatar.map((friend)=> {
        const lastMessageData = sortedLastMessage.find((chat)=> chat.chatters.includes(friend.name))
        return {
            ...friend,
            lastMessage: lastMessageData?lastMessageData.message : ''
        }
    })
}

export {sortLastMessage, combinedData}