import React from "react";
import { View, Text, Image, Pressable, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import logo from "../assets/images/logofinal.png"; // Ensure the path is correct

const { height } = Dimensions.get("window"); // Get phone screen height

const VerificationPendingScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

    

      {/* Centered Content */}
      <View style={styles.centeredContent}>
        <Image source={logo} style={styles.logo} />

        <Text style={styles.message}>
          Your verification is under review and may take up to{" "}
          <Text style={{ color: "#00DE62", fontWeight: "bold" }}>24 hours</Text>. 
          You will be notified once the process is complete.
        </Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16181A",
    alignItems: "center",
    justifyContent: "center",
  },
  
  centeredContent: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -height / 4 }], 
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginBottom: -20,
  },
  message: {
    fontSize: 16,
    fontFamily: "Alata",
    color: "#ccc",
    textAlign: "center",
    width: 280,
  },
});

export default VerificationPendingScreen;
