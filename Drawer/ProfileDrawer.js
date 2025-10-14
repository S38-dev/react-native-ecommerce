import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../components/CustomDrawerContent';
import Cart from '../screens/Cart';
import { Svg, Path } from 'react-native-svg';
import ProductListing from '../screens/ProductListingNew';
import { useSelector } from 'react-redux';

const Drawer = createDrawerNavigator();

const ProfileDrawer = () => {
  const theme = useSelector((state) => state.slice.theme);


  const themeColors = {
    background: theme === 'light' ? '#fafafa' : '#1f2020ff',
    text: theme === 'light' ? '#000000' : '#ffffff',
    border: theme === 'light' ? '#f0f0f0' : '#333333',
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerStyle: { 
          backgroundColor: themeColors.background, 
          width: 240 
        },
        drawerLabelStyle: {
          color: themeColors.text,
          fontSize: 16,
          fontWeight: '500',
        },
        drawerActiveBackgroundColor: theme === 'light' ? '#e0e0e0' : '#333333',
        drawerActiveTintColor: themeColors.text,
        drawerInactiveTintColor: themeColors.text,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen 
        name="Products" 
        component={ProductListing}
        options={{
          drawerIcon: ({ color, size, focused }) => (
            <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
              <Path 
                d="M3 9h18M3 15h18M3 21h18" 
                stroke={themeColors.text} 
                strokeWidth="2" 
              />
            </Svg>
          ),
        }}
      />
      <Drawer.Screen
        name="Cart"
        component={Cart}
        options={{
          drawerIcon: ({ color, size }) => (
            <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
              <Path 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                stroke={themeColors.text} 
                strokeWidth="2"
              />
            </Svg>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default ProfileDrawer;