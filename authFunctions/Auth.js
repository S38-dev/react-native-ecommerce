import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { getItem } from '../Utils/AsyncStorage';

const Auth = ({ children }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getItem('token');
      console.log('getting token ',token)
      if (!token) {
        navigation.replace('login'); 
      } else {
        setIsAuth(true); 
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) return null; 

  return <>{isAuth && children}</>;
};

export default Auth;
