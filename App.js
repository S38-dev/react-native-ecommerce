// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import AuthWrapper from './authFunctions/Auth';
import Cart from './screens/Cart';
// import ProductListing from './screens/Home';
import { Provider } from 'react-redux';
import Login from './screens/Login';
import ProductListing from './screens/ProductListing';
import ProductDetails from './screens/ProductDetail';
const Stack = createNativeStackNavigator();
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from './Utils/Store';
registerRootComponent(App);

export default function App() {
    return (
        <SafeAreaProvider>
        <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                
                        <Stack.Screen name='login' component={Login}/>
                <Stack.Screen name="ProductListing" component={ProductListing} />
                <Stack.Screen name="ProductDetails" component={ProductDetails} />
                {/* <Stack.Screen name='register' component={Register}/> */}
               

                <Stack.Screen name="Cart">
                    {(props) => (
                        <AuthWrapper>
                            <Cart {...props} />
                        </AuthWrapper>
                    )}
                </Stack.Screen>
         

                
                <Stack.Screen name="Profile">
                    {(props) => (
                        <AuthWrapper>
                            <Profile {...props} />
                        </AuthWrapper>
                    )}
                </Stack.Screen>



                {/* <ProtectedScreen name="Cart" component={Cart} /> */}





            </Stack.Navigator>
        </NavigationContainer>
        </Provider>
        </SafeAreaProvider>
    );
}
