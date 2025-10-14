
import { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View,Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Profile=()=>{
  const navigation=useNavigation()
    return (
        <Pressable style={{maxWidth:50,left:20,top:20}}
          onPress={() => navigation.openDrawer()}
        
        >

            <Image
            source={require('../assets/images/dummy.jpg')}
            style={{width:50,height:50,borderRadius:25,}}
            />
        </Pressable>
  
  );
}
export default Profile