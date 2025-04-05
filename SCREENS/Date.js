// import React, { useState } from "react";
// import { View, Button } from "react-native";
// import DatePicker from "react-native-date-picker";

// export default function Date1() {
//   const [date, setDate] = useState(new Date());
//   const [open, setOpen] = useState(false);

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" }}>
//       <Button title="Pick a date" onPress={() => setOpen(true)} color="#fff" />
//       <DatePicker
//         modal
//         open={open}
//         date={date}
//         mode="date"
//         theme="dark" // Enables dark mode
//         onConfirm={(date) => {
//           setOpen(false);
//           setDate(date);
//         }}
//         onCancel={() => setOpen(false)}
//       />
//     </View>
//   );
// }


import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const Date = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/icons/Animation - 1743765657437.json")} // Replace with your file path
        autoPlay
        loop
        style={styles.animation}
      />

      <View style={styles.loginBox}>
        <Text style={styles.title}>Login</Text>

        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#aaa" />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#aaa" secureTextEntry />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", 
  },
  animation: {
    width: "100%", 
    height: 400, 
  },
  loginBox: {
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5, 
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    marginBottom: 15,
    color: "#333",
  },
  button: {
    backgroundColor: "#2575fc",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Date;

