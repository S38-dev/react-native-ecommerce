
import AsyncStorage from '@react-native-async-storage/async-storage';


export const setItem = async (key, value, expireInMs = null) => {
  console.log('running setItem');
  try {
    const item = {
      value,
      expiry: expireInMs ? Date.now() + expireInMs : null,
    };
    await AsyncStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error('Error saving data', error);
  }
};


export const setCart = async (value) => {
  console.log('running setCart');
  try {
    const item = {
      value,
      expiry: null, 
    };
    await AsyncStorage.setItem('myCart', JSON.stringify(item));
  } catch (error) {
    console.error('Error saving cart data', error);
  }
};

export const getItem = async (key) => {
  try {
    const itemStr = await AsyncStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    console.log('user',item)

    if (item.expiry && Date.now() > item.expiry) {
      await removeItem(key); 
      return null;
    }

    return item.value;
  } catch (error) {
    console.error('Error reading data', error);
    return null;
  }
};

export const getCart = async () => {
  try {
    const itemStr = await AsyncStorage.getItem('myCart');
    if (!itemStr) return [];

    const item = JSON.parse(itemStr);
    console.log('getCart:', item);

    return item.value || [];
  } catch (error) {
    console.error('Error reading cart data', error);
    return [];
  }
};


export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data', error);
  }
};
