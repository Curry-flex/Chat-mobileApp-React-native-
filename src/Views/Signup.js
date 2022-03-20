import { StyleSheet, Text, View,Image, KeyboardAvoidingView, Alert ,ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import { TextInput ,Button} from 'react-native-paper'
import { launchImageLibrary } from 'react-native-image-picker'
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { NavigationContainer } from '@react-navigation/native';

export default function Signup({navigation}) {
    const[name,setName]= useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[image,setImage]=useState(null)
    const[showNext,setShowNext]=useState(false)
    const[loading,setLoading]=useState(false)

    if(loading){
        return <ActivityIndicator  size="large" color="#00ff00"/>
    }

    const uploadImage=()=>{
        launchImageLibrary({quality:0.5},(fileObject)=>{
             const image =fileObject.assets[0]

             const uploadImage =storage().ref().child(`profiles ${uuid.v4()}`).putFile(image.uri)
             uploadImage.on('state_changed', 
             (snapshot) => {
         
             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              if(progress == 100){
                  alert("image uploaded")
              }
             
           }, 
           (error) => {
             alert(error.message)
           }, 
           () => {
            
            
         
             uploadImage.snapshot.ref.getDownloadURL().then((downloadURL) => {
                 setImage(downloadURL);
               });
         
           }
         );

        })
    }

    const signUp=async()=>{
        setLoading(true)
  if(!name || !email || !password){
    Alert.alert("error","input all required filed")
  }
  else{
     try {
        const result = await auth().createUserWithEmailAndPassword(email,password)

        firestore().collection("users").doc(result.user.uid).set({
            name:name,
            email:result.user.email,
            uid:result.user.uid,
            image,
            status:"online"
           
        })
        setLoading(false)
        Alert.alert("success","record uploaded successfully",[{text:"ok",onPress:()=>navigation.navigate("login")}])
        setName("")
        setEmail("")
        setPassword("")
        setImage("")
        
     } catch (error) {
         console.log(error.message)
     }
    }
    }

  return (
    <KeyboardAvoidingView behavior='position'>
        <View style={styles.logoContainer}>

    <Text style={{color:"darkblue",fontSize:20,fontWeight:"bold",textAlign:"center",marginBottom:10}}>Signup to Login</Text>
      <Image  
       source={require("../assets/download.png")}
       style={{
           width:200,
           height:200
       }}
      />

        </View>

        <View style={styles.input}>
        <TextInput
            label="name"
            value={name}
            onChangeText={name => setName(name)}
            style={{marginBottom:10}}
            mode="outlined"
         />

         <TextInput
            label="Email"
            value={email}
            onChangeText={email => setEmail(email)}
            style={{marginBottom:10}}
            mode="outlined"
            />

           <TextInput
            label="Password"
            value={password}
            secureTextEntry
            onChangeText={password => setPassword(password)}
            style={{marginBottom:10}}
            mode="outlined"
            /> 
             <Button  mode="contained" onPress={() => uploadImage()}
             style={{marginVertical:10}}
             >
                choose photo
            </Button> 

            <Button  mode="contained"  
            disabled={image ? false:true}
            onPress={()=>{
                signUp()
                
            }}
            >
                Signup
            </Button> 
        </View>
    
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    logoContainer:{
        alignItems:"center",
        justifyContent:"center",
        marginBottom:40,
        marginTop:20
    },

    input:{
        marginHorizontal:20
    }
})