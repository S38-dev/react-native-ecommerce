import { StyleSheet, View } from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Home Screen</Text>
      <Text>Welcome to the EcomPro Home!</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});

export default Home;