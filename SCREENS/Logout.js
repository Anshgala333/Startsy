// 














// Successfule scree code
// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// export default function SuccessPage() {
//   const navigation = useNavigation(); // Move useNavigation inside the component

//   return (
//     <View style={styles.container}>
//       {/* Success Icon */}
//       <View style={styles.iconContainer}>
//         <View style={styles.iconCircle}>
//           <MaterialIcons name="production-quantity-limits" size={40} color="white" />
//         </View>
//       </View>

//       {/* Success Message */}
//       <Text style={styles.messageText}>
//         You have successfully your shopping cart list!
//       </Text>
//       <Text style={styles.successText}>Successful!</Text>

//       {/* Continue Shopping Button */}
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => navigation.navigate('ShoppingPage')} // Ensure 'ShoppingPage' exists in your navigation
//       >
//         <Text style={styles.buttonText}>Continue Shopping</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   iconContainer: {
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   iconCircle: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: '#2C3E50',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   messageText: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//     marginBottom: 10,
//     fontFamily: 'Poppins-Regular',
//   },
//   successText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     textAlign: 'center',
//     marginBottom: 20,
//     fontFamily: 'Poppins-Bold',
//   },
//   button: {
//     backgroundColor: '#FFA726',
//     borderRadius: 8,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//     fontFamily: 'Poppins-Bold',
//   },
// });

// dropdown sheet code
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(10);
  const pricePerUnit = 24.5; // Example price per unit

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const totalPrice = (pricePerUnit * quantity).toFixed(2);

  return (
    <View style={styles.container}>
      {/* Product Name and Availability */}
      <Text style={styles.productName}>9 GL LAMINATE</Text>
      <View style={styles.availabilityContainer}>
        <Text style={styles.availabilityText}>Available in stock</Text>
      </View>

      {/* Product Description */}
      <Text style={styles.description}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1500s ...
      </Text>

      {/* Quantity and Selector */}
      <View style={styles.quantityContainer}>
        <Text style={styles.label}>Quantity</Text>
        <View style={styles.quantitySelector}>
          <TouchableOpacity onPress={handleDecrease} style={styles.selectorButton}>
            <Text style={styles.selectorText}>-</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={quantity.toString()}
            onChangeText={(value) => setQuantity(Number(value) || 1)}
          />
          <TouchableOpacity onPress={handleIncrease} style={styles.selectorButton}>
            <Text style={styles.selectorText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Total Price */}
      <View style={styles.priceContainer}>
        <Text style={styles.label}>Total Price</Text>
        <Text style={styles.price}>₹ {totalPrice}</Text>
      </View>

      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.addToCartText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    padding: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  availabilityContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#DFF6E1',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 20,
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#28A745',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
  },
  selectorButton: {
    padding: 10,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectorText: {
    fontSize: 18,
    color: '#333',
  },
  input: {
    width: 40,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  addToCartButton: {
    backgroundColor: '#FFA726',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

