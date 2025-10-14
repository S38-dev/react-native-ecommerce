import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { getItem, setItem,getCart, setCart } from '../Utils/AsyncStorage';



const ProductDetail = ({ route, navigation }) => {

  const { product } = route.params;
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);

  const handlePress = async () => {
    const Id= await getItem('id')
    
    const res = await fetch('https://dummyjson.com/carts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: Id,
        products: [
          {
            id: product.id,
            quantity: quantity,
          },
       
        ]
      })
    })
   
     ToastAndroid.show('A product has been added to the Cart', ToastAndroid.SHORT);
     const data=await res.json()
    console.log('res add cart ',data)
    const addedProduct=data.products
    const oldCart=await getCart()|| []
    console.log('oldCart',oldCart)
    await setCart([addedProduct,...oldCart])
   


    
  }


  return (
    <ScrollView style={styles.container}>
      {/* Product Images */}
      <Image source={{ uri: selectedImage }} style={styles.mainImage} />


      <FlatList
        data={product.images}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedImage(item)}>
            <Image source={{ uri: item }} style={styles.thumbnail} />
          </TouchableOpacity>
        )}
        style={styles.imageList}
      />

      {/* Product Attributes */}
      {/* <View style={styles.attributes}>
        <View style={styles.attributeBox}><Text>Vegan</Text></View>
        <View style={styles.attributeBox}><Text>Enriched</Text></View>
        <View style={styles.attributeBox}><Text>Cruelty-Free</Text></View>
      </View> */}

      <Text style={styles.title}>{product.title}</Text>
      <View style={styles.rating}>
        {Array.from({ length: 5 }).map((_, index) => (
          <AntDesign
            key={index}
            name='star'
            size={20}
            color={index < product.rating ? "#ffe347ff" : "#a4a39eff"}
          />
        ))}
        <Text style={styles.reviewCount}> ({product.reviews.length} Reviews)</Text>
      </View>
      <Text style={styles.price}>${product.price.toFixed(2)*quantity}</Text>

     
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() => setQuantity(q => Math.max(1, q - 1))}
          style={styles.qtyButton}
        >
          <Text>-</Text>
        </TouchableOpacity>
        <Text style={styles.qtyText}>{quantity}</Text>
        <TouchableOpacity
          onPress={() => setQuantity(q => q + 1)}
          style={styles.qtyButton}
        >
          <Text>+</Text>
        </TouchableOpacity>
      </View>

    
      <TouchableOpacity style={styles.cartButton} onPress={() => handlePress()}>
        <Text style={styles.cartButtonText}>Add to Cart</Text>
      </TouchableOpacity>

     
      <Text style={styles.description}>{product.description}</Text>


    </ScrollView>
  );
};
// onPress={()=>navigation.navigate('Cart')}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffffff', padding: 16 },
  mainImage: { width: '100%', height: 390, borderRadius: 10 },
  imageList: { marginVertical: 10, },
  thumbnail: { width: 60, height: 60, marginRight: 10, borderRadius: 8, borderWidth: 0.5, borderColor: 'black' },
  attributes: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  attributeBox: { borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginVertical: 5 },
  rating: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  reviewCount: { marginLeft: 5, color: '#777' },
  price: { fontSize: 22, fontWeight: 'bold', marginVertical: 5 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  qtyButton: { padding: 10, borderWidth: 1, borderColor: '#000000ff', borderRadius: 5 },
  qtyText: { marginHorizontal: 15, fontSize: 16 },
  cartButton: { backgroundColor: '#000', padding: 15, borderRadius: 10, alignItems: 'center', marginVertical: 10 },
  cartButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  description: { fontSize: 16, color: '#555', marginVertical: 10 },
});

export default ProductDetail;
