import { StyleSheet, Text, View,Image, KeyboardAvoidingView, TouchableOpacity, Alert,ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { TextInput ,Button} from 'react-native-paper'
import auth from "@react-native-firebase/auth"

export default function Login({navigation}) {
     
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[loading,setLoading] =useState(false)

    if(loading){
        return <ActivityIndicator size="large" color="#00ff00" />
    }

    const login=async()=>{
        
        if(!email || !password){
            Alert.alert("success","input all required field")
            return
        }
        else{
       
            try {
                 
                     setLoading(true)
                 
                auth().signInWithEmailAndPassword(email.trim(),password).then(()=>{
                   setLoading(false)
                    navigation.navigate("home")
                    
                 }).catch((error)=> Alert.alert(error.message))
                   setLoading(false)
                
            } catch (error) {
               // alert("username or password incorrect")
            }
        }
    }
    
  return (
    <KeyboardAvoidingView behavior='position'>
        <View style={styles.logoContainer}>

    <Text style={{color:"darkblue",fontSize:20,fontWeight:"bold",textAlign:"center",marginBottom:10}}> Login</Text>
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
            
            <TouchableOpacity
            onPress={()=>navigation.navigate("signup")}
            >
                <Text style={{color:"blue",fontSize:16,fontWeight:"bold",marginVertical:10}}>Dont have account ?</Text>
            </TouchableOpacity>
           

            <Button  mode="contained" onPress={() => login()}>
                Login
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