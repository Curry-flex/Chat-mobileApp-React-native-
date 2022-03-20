import { StyleSheet, Text, View ,Image, TouchableOpacity, ScrollView} from 'react-native'
import React from 'react'

export default function Card({navigation,users}) {
  return (
    
     
   <ScrollView>
          <TouchableOpacity
    onPress={() => navigation.navigate("chat",users)}
    >
      <View
      
      style={{
        flexDirection:'row',
        marginVertical:5,
        borderWidth:1,
        borderColor:"green",
        padding:10,
        backgroundColor:"white",
        marginHorizontal:10,
        borderRadius:20
    }}>
      <Image source={{uri:users.image}} style={{
          width:60,
          height:60,
          borderRadius:50,
        
      }} />
      <View style={{marginLeft:20}}>
          <Text style={styles.text}>{users.name}</Text>
          <Text style={styles.email}>{users.email}</Text>
      </View>
    </View>

    </TouchableOpacity>
   </ScrollView>
  
    
  
  )
}

const styles = StyleSheet.create({
    text:{
        color:"#4e5450",
        fontSize:16,
        fontWeight:"bold",
        
    },
    email:{
      color:"#4e5450",
        fontSize:16,
    }
})