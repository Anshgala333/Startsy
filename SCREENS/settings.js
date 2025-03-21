import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, BackHandler } from "react-native";
import { List, Avatar, Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const settings = ({ navigation, route }) => {

  var { token , tabnavigation } = route.params

  var decode = jwtDecode(token)

  var editprofilepage;
  if (decode.role == "Founder") {
    editprofilepage = "Founder1";
  }
  else if (decode.role == "Investor") {
    editprofilepage = "EditInvestorInfo";
  }
  else {
    editprofilepage = "Editcommunity";
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // navigation.navigate("Apnauser")

    });

    return () => backHandler.remove();
  }, []);

  async function Logout() {
    try {
      await AsyncStorage.removeItem('accessToken'); // Replace 'token' with your key
    } catch (error) {
      console.error('Error removing token:', error);
    }
    console.log("removing");

    navigation.reset({
      index: 0,
      routes: [{ name: "LoginTrial" }],
    });

    // navigation.navigate("LoginTrial")

  }

  return (
    <View style={styles.container}>
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.option} onPress={() => {
          console.log(editprofilepage);

          navigation.navigate(editprofilepage)
        }}>
          <Icon name="account-edit" size={24} color="#00DE62" />
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("SavedPost" , {tabnavigation})}>
          <Icon name="bookmark-outline" size={24} color="#00DE62" />
          <Text style={styles.optionText}>Saved Posts</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.option} onPress={() => alert("Switch Account")}>
          <Icon name="account-switch" size={24} color="#00DE62" />
          <Text style={styles.optionText}>Switch Account</Text>
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.option} onPress={() => Logout()}>
          <Icon name="logout" size={24} color="#00DE62" />
          <Text style={[styles.optionText, { color: "#ccc" }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16181A",
  },
  top: {
    width: "100%",
    height: 120,
    backgroundColor: "#7A7B7C",
    justifyContent: "center",
    alignItems: "center",
  },
  profilephoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
    overflow: "hidden",
  },
  img2: {
    width: "100%",
    height: "100%",
  },
  bottom: {
    width: "100%",
    backgroundColor: "#16181a",
    padding: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#24272A",
  },
  optionText: {
    fontSize: 18,
    color: "#E9E9E9",
    fontFamily: "Alata",
    marginLeft: 15,
  },
});

export default settings;
