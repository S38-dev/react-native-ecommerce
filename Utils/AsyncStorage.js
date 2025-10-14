
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


export const getItem = async (key) => {
  try {
    const itemStr = await AsyncStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);

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


export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data', error);
  }
};
