import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GiftedChat,Bubble,InputToolbar } from 'react-native-gifted-chat'
import firestore from "@react-native-firebase/firestore"
import { QuickReplies } from 'react-native-gifted-chat'

export default function Chat({user,route}) {
    const currentUser =route.params
    const [messages, setMessages] = useState([]);

    // const getAllMessages=async()=>{
    //     const docid =currentUser.uid>user.uid? user.uid +"-"+ currentUser.uid: currentUser.uid +"-"+  user.uid
   
    //    const querySnap=await firestore().collection("chatroom").doc(docid).collection("message").orderBy("createdAt","desc").get()

    //   const allMesaage=  querySnap.docs.map((doc)=>{
    //      return{
    //          ...doc.data(),
    //          createdAt:doc.data().createdAt.toDate()
    //      }
    //  })
    //  setMessages(allMesaage)
    // }
   
    //Real time chat
  useEffect(() => {
    const docid =currentUser.uid>user.uid? user.uid +"-"+ currentUser.uid: currentUser.uid +"-"+  user.uid
   
    const messageRef=firestore().collection("chatroom").doc(docid).collection("message").orderBy("createdAt","desc")

     messageRef.onSnapshot((querySnap)=>{
        const allMesaage=  querySnap.docs.map((doc)=>{
            const data =doc.data()
            if(data.createdAt)
            {
                return{
                    ...doc.data(),
                    createdAt:doc.data().createdAt.toDate()
                }

            }
            else{
                return{
                    ...doc.data(),
                    createdAt:new Date()
                }
            }
           
        })
        setMessages(allMesaage)
     })
 
  
  }, [])

      const onSend =(messageArray) => {
          const msg =messageArray[0]
          const myMessage ={
              ...msg,
              sentBy:user.uid,
              sentTo:currentUser.uid,
              createdAt:new Date(),
          }
        setMessages(previousMessages => GiftedChat.append(previousMessages, myMessage))
        const docid =currentUser.uid>user.uid? user.uid +"-"+ currentUser.uid: currentUser.uid +"-"+  user.uid
     firestore().collection("chatroom").doc(docid).collection("message").add({...myMessage,createdAt:firestore.FieldValue.serverTimestamp()})
      }
  return (
    <View style={{flex:1,backgroundColor:"#2e2c2d"}}>
        <GiftedChat
      
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: user.uid,
      }}

      renderBubble={(props)=>{
          return  <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: "darkblue"
            },
            left:{
                backgroundColor:"white"
            }
          }}
        />
      }}
     
      renderInputToolbar={(props)=>{
          return <InputToolbar {...props} containerStyle={{margin:5,borderRadius:10}}  textInputStyle={{color:"black"}}/>
      }}
    />
    </View>
  )
}

const styles = StyleSheet.create({})