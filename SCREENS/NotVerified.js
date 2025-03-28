import React, { useContext } from "react";
import { View, Text, Image, Pressable, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import logo from "../assets/images/logofinal.png"; // Ensure the path is correct
import { url } from "@/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { height } = Dimensions.get("window"); // Get phone screen height
import { GlobalContext } from "@/Global/globalcontext";

const InvestorNotVerifiedScreen = () => {
  const navigation = useNavigation();
    const { globaldata, updateField } = useContext(GlobalContext);
  

  async function handleContinue() {


    var token = await AsyncStorage.getItem("accessToken")
    console.log(token);

    try {
      const response = await fetch(`${url}test/convertInvestorToCommunity`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
      const data = await response.json()
      console.log(data);
      if (response.status == 200) {
        updateField("token", data.accessToken);


        try {
          await AsyncStorage.setItem('accessToken', data.accessToken);
        } catch (error) {
          console.error('Error saving data:', error);
        }
        navigation.navigate("Main2")
      }

    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>

        <Image source={logo} style={styles.logo} />


        <Text style={styles.message}>
          Unfortunately, your verification was not approved.
        </Text>


        <Pressable style={styles.button} onPress={() => handleContinue()}>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
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
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ccc",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    elevation: 3, // Android shadow
    shadowColor: "#00DE62", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Alata",
    color: "#16181A",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default InvestorNotVerifiedScreen;
