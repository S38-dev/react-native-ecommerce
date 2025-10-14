import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCart } from '../Utils/AsyncStorage'
import { useEffect, useState, useRef } from 'react';
const CartScreen = () => {
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    const fetchCart = async () => {
      try {
        // const res = await fetch('https://dummyjson.com/carts/user/5');
        // const json = await res.json(); 

        const storedCart = (await getCart()) || [];
        setCartData(storedCart)
        console.log('mycaart', cartData)
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };

    fetchCart();
  }, []);

  const increaseQuantity = (id) => {
    setCartData(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartData(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1), total: Math.max(1, item.quantity - 1) * item.price }
          : item
      )
    );
  };
  const subtotal = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = cartData.length ? 4.99 : 0;
  const total = subtotal + shipping;


  const CartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.productImage}

      />
      <View style={styles.itemDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.quantityButton} onPress={() => decreaseQuantity(item.id)}>
          <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={() => increaseQuantity(item.id)}>
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Bag</Text>
        <Text style={styles.itemCount}>{cartData.length} items</Text>
      </View>

      <ScrollView style={styles.cartItems} showsVerticalScrollIndicator={false}>
        {cartData.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
         </ScrollView>


        <View style={styles.promoSection}>
          <View style={styles.promoInput}>
            <Text style={styles.promoText}>Picero Coals</Text>
          </View>
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
        </View>
     


      <View style={styles.footer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping</Text>
          <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
        </View>

        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Bag Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>



        <TouchableOpacity style={styles.checkoutButton} >
          <Text style={styles.checkoutText}>Proceed To Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
  },
  cartItems: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    padding: 5,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 15,
    color: '#000',
  },
  promoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  promoInput: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  promoText: {
    fontSize: 16,
    color: '#000',
  },
  applyButton: {
    backgroundColor: '#000',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 10,
  },
  applyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  checkoutButton: {
    backgroundColor: '#000',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;