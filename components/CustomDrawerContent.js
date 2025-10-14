import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Image, StyleSheet, Text, View, Switch } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../Utils/Slice';

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.slice.theme);


  const themeColors = {
    background: theme === 'light' ? '#f5f5f5' : '#1f2020ff',
    cardBackground: theme === 'light' ? '#ffffff' : '#2d2d2d',
    text: theme === 'light' ? '#000000' : '#ffffff',
    secondaryText: theme === 'light' ? '#666666' : '#aaaaaa',
    border: theme === 'light' ? '#e0e0e0' : '#3d3d3d',
    switchThumb: theme === 'light' ? '#ffffff' : '#000000',
    switchTrack: { false: '#cccccc', true: '#4CAF50' },
  };

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <DrawerContentScrollView 
      {...props} 
      contentContainerStyle={{ flex: 1 }}
      style={{ backgroundColor: themeColors.background }}
    >
      <View style={[
        styles.headerContainer, 
        { backgroundColor: themeColors.cardBackground }
      ]}>
        <Image
          source={require('../assets/images/dummy.jpg')}
          style={styles.profileImage}
        />
        <Text style={[styles.userName, { color: themeColors.text }]}>
          Lina
        </Text>

      
        <View style={styles.themeToggleContainer}>
          <Text style={[styles.themeText, { color: themeColors.text }]}>
            {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
          </Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={handleToggle}
            thumbColor={themeColors.switchThumb}
            trackColor={themeColors.switchTrack}
            ios_backgroundColor="#3e3e3e"
          />
        </View>
      </View>

      <View style={{ flex: 1, backgroundColor: themeColors.background }}>
        <DrawerItemList 
          {...props} 
          activeBackgroundColor={theme === 'light' ? '#e0e0e0' : '#333333'}
          inactiveBackgroundColor="transparent"
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  themeToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 10,
  },
  themeText: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CustomDrawerContent;