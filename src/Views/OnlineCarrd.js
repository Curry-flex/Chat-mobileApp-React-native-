import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function OnlineCarrd({users,navigation,user}) {

  return (
   
  <TouchableOpacity
  onPress={() =>navigation.navigate("chat",users) }
  >

{
  users?
  <>
  <View style={{flexDirection:"row",margin:10}} >
        <View>
        <Image source={{uri:users.image}}
    style={{width:50,height:50,borderRadius:50}}
    />
    <Text style={{marginLeft:10}}>online</Text>

        </View>
   
  </View>

  </>
  :
  <>
  </>
}


  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})