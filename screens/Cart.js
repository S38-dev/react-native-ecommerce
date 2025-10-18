import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCart } from '../Utils/AsyncStorage'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native'
const CartScreen = () => {
  const [cartData, setCartData] = useState([])
  const theme = useSelector((state) => state.slice.theme); 

useFocusEffect(
  React.useCallback(() => {
    const fetchCart = async () => {
      try {
        const storedCart = (await getCart()) || [];
        setCartData(storedCart);
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };
    fetchCart();
  }, [])
);


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


  const themeColors = {
    background: theme === 'light' ? '#f8f8f8' : '#1f2020ff',
    cardBackground: theme === 'light' ? '#ffffff' : '#2d2d2d',
    text: theme === 'light' ? '#000000' : '#ffffff',
    secondaryText: theme === 'light' ? '#666666' : '#aaaaaa',
    border: theme === 'light' ? '#f0f0f0' : '#3d3d3d',
    buttonBackground: theme === 'light' ? '#000000' : '#ffffff',
    buttonText: theme === 'light' ? '#ffffff' : '#000000',
    quantityBg: theme === 'light' ? '#f8f8f8' : '#3d3d3d',
    quantityButtonBg: theme === 'light' ? '#ffffff' : '#4d4d4d',
  };

  const CartItem = ({ item }) => (
    <View style={[styles.cartItem, { 
      backgroundColor: themeColors.cardBackground,
      borderBottomColor: themeColors.border 
    }]}>
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.productImage}
      />
      <View style={styles.itemDetails}>
        <Text style={[styles.productTitle, { color: themeColors.text }]}>
          {item.title}
        </Text>
        <Text style={[styles.productPrice, { color: themeColors.text }]}>
          ${item.price.toFixed(2)}
        </Text>
      </View>
      <View style={[styles.quantityContainer, { backgroundColor: themeColors.quantityBg }]}>
        <TouchableOpacity 
          style={[styles.quantityButton, { backgroundColor: themeColors.quantityButtonBg }]} 
          onPress={() => decreaseQuantity(item.id)}
        >
          <Text style={[styles.quantityText, { color: themeColors.text }]}>-</Text>
        </TouchableOpacity>
        <Text style={[styles.quantity, { color: themeColors.text }]}>{item.quantity}</Text>
        <TouchableOpacity 
          style={[styles.quantityButton, { backgroundColor: themeColors.quantityButtonBg }]} 
          onPress={() => increaseQuantity(item.id)}
        >
          <Text style={[styles.quantityText, { color: themeColors.text }]}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>

      <View style={[styles.header, { 
        backgroundColor: themeColors.cardBackground,
        borderBottomColor: themeColors.border 
      }]}>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>
          Shopping Bag
        </Text>
        <Text style={[styles.itemCount, { color: themeColors.secondaryText }]}>
          {cartData.length} items
        </Text>
      </View>

      <ScrollView style={styles.cartItems} showsVerticalScrollIndicator={false}>
        {cartData.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
         </ScrollView>
        
       
      <View style={[styles.footer, { 
        backgroundColor: themeColors.cardBackground 
      }]}>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: themeColors.secondaryText }]}>
            Subtotal
          </Text>
          <Text style={[styles.summaryValue, { color: themeColors.text }]}>
            ${subtotal.toFixed(2)}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: themeColors.secondaryText }]}>
            Shipping
          </Text>
          <Text style={[styles.summaryValue, { color: themeColors.text }]}>
            ${shipping.toFixed(2)}
          </Text>
        </View>

        <View style={[styles.summaryRow, styles.totalRow, { 
          borderTopColor: themeColors.border 
        }]}>
          <Text style={[styles.totalLabel, { color: themeColors.text }]}>
            Bag Total
          </Text>
          <Text style={[styles.totalValue, { color: themeColors.text }]}>
            ${total.toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity style={[styles.checkoutButton, { 
          backgroundColor: themeColors.buttonBackground 
        }]} >
          <Text style={[styles.checkoutText, { color: themeColors.buttonText }]}>
            Proceed To Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 14,
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
    borderRadius: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 5,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
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
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 15,
  },
  promoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  promoInput: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  promoText: {
    fontSize: 16,
  },
  applyButton: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 10,
  },
  applyText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 20,
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
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
