import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthWrapper from '../authFunctions/Auth';

const Stack = createNativeStackNavigator();

const ProtectedScreen = ({ name, component }) => {
  const Component = component; 

  return (
    <Stack.Screen name={name}>
      {(props) => (
        <AuthWrapper>
          <Component {...props} />
        </AuthWrapper>
      )}
    </Stack.Screen>
  );
};

export default ProtectedScreen;
