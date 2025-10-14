
import { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { getItem, setItem,getCart, setCart } from '../Utils/AsyncStorage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../components/CustomDrawerContent';
const Profile=()=>{
   const drawer=createDrawerNavigator()
    return (
    <ProfileDrawer.Navigator
      screenOptions={{
        headerShown: true,
        drawerPosition: 'right',
        drawerStyle: {
          backgroundColor: '#fafafa',
          width: 240,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <ProfileDrawer.Screen name="Profile Info" component={ProfileMain} />
      <ProfileDrawer.Screen name="Settings" component={AccountSettings} />
    </ProfileDrawer.Navigator>
  );
}
