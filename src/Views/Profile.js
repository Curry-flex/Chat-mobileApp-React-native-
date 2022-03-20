import { Image, StyleSheet, Text, TouchableOpacity, View,ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"

export default function Profile({user}) {
    const[userProfile,setUserProfile]=useState("")
    const[loading,setLoading] =useState(false)
    if(loading){
        return <ActivityIndicator size="large" color="#00ff00" />
    }
    
    const getLoginUser=async()=>{
    await firestore().collection("users").doc(user.uid).get().then(doc=>{
        
        setUserProfile(doc.data())
    })
    
    }

    useEffect(()=>{
        getLoginUser()
       
        
    },[])
    
  

  return (
    <View style={{flex:1,backgroundColor:"#414042"}}>
       <View style={styles.imageContainer}>
          <Image  source={{uri:userProfile.image}} 
          
          style={{width:200,height:200,borderRadius:100,justifyContent:"center",alignItems:"center",marginBottom:30}}
          />
        <Text style={{color:"white",fontSize:25,fontWeight:"bold",marginBottom:10}}>Name: {userProfile.name}</Text>
        <Text style={{color:"white",fontSize:25,marginBottom:70}}>Email: {userProfile.email}</Text>
        <TouchableOpacity
        activeOpacity={0.6}
        style={styles.button}
        
        onPress={() =>{
            
          firestore().collection("users").doc(user.uid).update({
            status:firestore.FieldValue.serverTimestamp()
          })
             auth().signOut()
          
            }}
        >
            <Text style={{fontWeight:"bold"}}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    imageContainer:{
      alignItems:"center",
      justifyContent:"center",
      marginVertical:30,
      
    },
    button:{
        width:70,
        height:70,
        backgroundColor:"white",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:50
    }
})
