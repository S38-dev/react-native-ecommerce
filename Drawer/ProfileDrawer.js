import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../components/CustomDrawerContent';
import Cart from '../screens/Cart';
import { Svg, Path } from 'react-native-svg';
import ProductListing from '../screens/ProductListing';
const Drawer = createDrawerNavigator();

const ProfileDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerStyle: { backgroundColor: '#fafafa', width: 240 },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >

      <Drawer.Screen name="Products" component={ProductListing} />
      <Drawer.Screen
        name="Cart"
        component={Cart}
        options={{
          drawerIcon: ({ color, size }) => (
            <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
              <Path d="M3 12h18M3 6h18M3 18h18" stroke={color} strokeWidth="2" />
            </Svg>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default ProfileDrawer;
