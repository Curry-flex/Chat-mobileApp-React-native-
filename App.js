/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { AsyncStorage, LogBox } from 'react-native';

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();
 import { createDrawerNavigator } from '@react-navigation/drawer';
//import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';
 import React,{useState,useEffect} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage1 from '@react-native-async-storage/async-storage'
import PushNotification from "react-native-push-notification";
import Feather from "react-native-vector-icons/Feather"

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
  Button,
  Modal,
  Platform,
  Linking,
  RefreshControl,
  FlatList,
  TextInput,
  Pressable,
  Image

} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import fav from './fav.jpeg'
import { Item } from 'react-native-paper/lib/typescript/components/List/List';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore"


import Signup from './src/Views/Signup';
import Login from './src/Views/Login';
import Home from './src/Views/Home';
import Chat from './src/Views/Chat';
import Profile from './src/Views/Profile';



  


const Stack =createStackNavigator()
const Tab = createBottomTabNavigator()



const App = (props,navigation) => {
   const[user,setUser]= useState("")

   useEffect(()=>{
   const unregister=auth().onAuthStateChanged((userExist)=>{
        if(userExist)
        {
          setUser(userExist)
          firestore().collection("users").doc(userExist.uid).update({status:"online"})
        }
        else{
          setUser("")
        }
      })

      return ()=>{
        unregister()
      }
   },[])
  return (
 
     <SafeAreaView
      style={{flex:1,backgroundColor:"white"}}
     >
     <NavigationContainer
    
     >
       <Stack.Navigator
       screenOptions={{
         
       }}
       initialRouteName="login"
       >

         {
           user?
           <>
            <Stack.Screen 
            name='home'
            options={{
              headerRight:()=>
             <View style={{flexDirection:"row"}}>
                
                
                <TouchableOpacity activeOpacity={0.5} style={{width:50,height:50,backgroundColor:"white",justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
                
                <Feather  name='log-out' size={25} color="black"
                onPress={()=>{
                  firestore().collection("users").doc(user.uid).update({
                    status:firestore.FieldValue.serverTimestamp()
                  }).then(()=>{
                    auth().signOut()
                  })
                 
                }}
                /> 
               
                </TouchableOpacity>
             </View>
              
            }}
            >
            {props => <Home {...props}  user={user} />}
            </Stack.Screen>

            <Stack.Screen 
              name='chat'
              options={({route})=>({title:
               <View>
                 <Text style={{fontWeight:"bold",fontSize:16,color:"darkblue"}}>{route.params.name}</Text>
                 <Text>{typeof(route.params.status)=="string"? route.params.status: route.params.status.toDate().toString()}</Text>
               </View>
              })}
            >
           {props => <Chat  {...props} user={user}/>}
         </Stack.Screen>

         <Stack.Screen
          name='profile'
         >
           {props => <Profile {...props} user={user}/>}
         </Stack.Screen>

           </>
           :
           <>
            <Stack.Screen 
            name="login"
            component={Login}
            />
              <Stack.Screen 
              name='signup'
              component={Signup}
              />
           </>
           
           
         }
       
         
       

       
         
       </Stack.Navigator>
    
    </NavigationContainer>

     </SafeAreaView>
    
     
  )
}

export default App

