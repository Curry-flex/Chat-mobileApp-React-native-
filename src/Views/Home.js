import { FlatList, StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import Card from './Card'
import Feather from "react-native-vector-icons/Feather"
import OnlineCarrd from './OnlineCarrd'
import { collection, query, limit, where } from "firebase/firestore";
import { firestoreE } from "./firebase";




export default function Home({navigation,user}) {
    const[users,setUsers] =useState("")
    const[onlineUser,setOnlineUser]=useState([])
    

    const getAllusers=async()=>{
    const querySnap =await firestore().collection("users").where("uid","!=",user.uid).get()
    
      const result =querySnap.docs.map((doc)=> doc.data())
      setUsers(result)
    }

    const getAllOnlineUsers=async()=>{
     
      const querySnap =await firestore().collection("users").where("status","==","online").get()
  
      // const result =querySnap.docs.map((doc)=> doc.data())

      // setOnlineUser(result)

      const result =querySnap.docs.map((doc)=> {
        if(doc.data().uid == user.uid)
        {
          return ""
        }
        else{
         return doc.data()
        }
      })
       setOnlineUser(result)
    }
    
    useEffect(()=>{
      getAllOnlineUsers()
    },[onlineUser])
    
    useEffect(()=>{
        getAllusers()
       
        
    },[])

    
    

  return (
    <View style={{marginTop:30,flex:1}}>
        <View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:20}}>
        <Text style={{color:"darkblue",fontSize:20,fontWeight:"bold",textAlign:"center",marginBottom:10}}>Chat List</Text>

        </View>
        <View>
           <FlatList 
        contentContainerStyle={{paddingHorizontal:20,marginVertical:20}}
        horizontal={true}
        data={onlineUser}
        renderItem={({item})=><OnlineCarrd users={item} user={user}  navigation={navigation}/>}
        />

        </View>
       
       <View  style={{flex:1}}>
       <FlatList 
        data={users}
        renderItem={({item})=><Card users={item} navigation={navigation}/>}
        keyExtractor={(item)=>item.uid}
        contentContainerStyle={{
          
        }}
        />
        
       </View>
       <View style={styles.profileIcon}>
        <Feather  name='user' size={25} color="white"
                onPress={(props)=>{
                  navigation.navigate("profile")
                }}
                /> 
        </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  profileIcon:{
    width:50,
    height:50,
    backgroundColor:"blue",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:50,
    position:"absolute",
    top:-20,
    right:10
  }

})