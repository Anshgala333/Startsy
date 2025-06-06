import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform, ToastAndroid, Image, BackHandler, Alert, Pressable, Linking } from "react-native";
import { List, Avatar, Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import * as FileSystem from "expo-file-system";
// import * as IntentLauncher from "expo-intent-launcher";
import * as Updates from "expo-updates";
import * as MediaLibrary from 'expo-media-library';
import { url } from "@/config.js";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import RatingPage from "../SCREENS/BetaRating.js";
import { MotiPressable } from "moti/interactions/index.js";
const Settings = ({ navigation, route }) => {

  var { token, tabnavigation } = route.params
  // console.log(route.params);


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
      // tabnavigation.navigate("Profile")
      navigation.goBack()
      return true

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


  // ---------------------------------------------------------------------------

  const IMAGE_URL = "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?cs=srgb&dl=pexels-pixabay-417173.jpg&fm=jpg"; // Replace with your image URL
  const [status, requestPermission] = MediaLibrary.usePermissions();




  //   const downloadImage = async () => {
  //     if (!status?.granted) {
  //         const permission = await requestPermission();
  //         if (!permission.granted) {
  //             Alert.alert("Permission Denied", "You need to allow access to save images.");
  //             return;
  //         }
  //     }

  //     const fileUri = `${FileSystem.documentDirectory}downloaded-image.jpg`;

  //     try {
  //         // Step 1: Download Image
  //         const { uri } = await FileSystem.downloadAsync(IMAGE_URL, fileUri);

  //         // Step 2: Save Image to Gallery
  //         const asset = await MediaLibrary.createAssetAsync(uri);
  //         await MediaLibrary.createAlbumAsync("Download", asset, false);

  //         Alert.alert("Download Complete", "Image saved to gallery!");
  //     } catch (error) {
  //         Alert.alert("Error", "Failed to download image.");
  //         console.error("Download Error:", error);
  //     }
  // };


  const showToastWithGravity = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      `${message}`,
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      100, 100
    );
  };




  async function downloadAPK(params) {

    try {
      const response = await fetch(`${url}api/getApiLink/`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await response.json();
 
      console.log(response.status);

      if (response.status === 200) {
        const driveLink = data.link
        try {
          const supported = await Linking.canOpenURL(driveLink);
          if (supported) {
            await Linking.openURL(driveLink);
            // updateUserApkVersion()
          } else {
            Alert.alert("Error", "Cannot open the link.");
          }
        } catch (error) {
          console.error("Error opening link:", error);
        }
      }
      else if (response.status == 404) {
        showToastWithGravity("You already have the latest version of this APK")
      }
    }
    catch (e) {
      console.log(e);
    }

  }

  const checkHermes = () => {
    if (global.HermesInternal) {
      Alert.alert('Hermes is enabled!');
    } else {
      Alert.alert('Hermes is not enabled.');
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Pressable onPress={() => navigation.goBack()}>
          <FontAwesome6 name="chevron-left" size={25} style={{ alignSelf: 'flex-start', marginLeft: 6, marginTop: -6 }} color="#00DF60" />
        </Pressable>
        <Text allowFontScaling={false} style={styles.headerText}>Settings</Text>
      </View>
      <View style={styles.bottom}>

        <View>
          {/* <TouchableOpacity style={styles.option} onPress={() => downloadAPK()}> */}
            {/* <Icon name="bookmark-outline" size={24} color="#00DE62" /> */}
            {/* <MaterialIcons name="update" size={24} color="#00de62" /> */}
            {/* <Text style={styles.optionText}>Update</Text>  */}
          {/* </TouchableOpacity> */}
          <TouchableOpacity style={styles.option} onPress={() => {
      

            navigation.navigate(editprofilepage)
          }}>
            <Icon name="account-edit" size={24} color="#00DE62" />
            <Text style={styles.optionText}>Edit Profile</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("SavedPost", { tabnavigation })}>
            <Icon name="bookmark-outline" size={24} color="#00DE62" />
            <Text style={styles.optionText}>Saved Posts</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.option} onPress={() => alert("Switch Account")}>
          <Icon name="account-switch" size={24} color="#00DE62" />
          <Text style={styles.optionText}>Switch Account</Text>
        </TouchableOpacity>  */}

          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("RatingPage")}>
            <MaterialIcons name="feedback" size={24} color="#00de62" />
            <Text style={[styles.optionText, { color: "#ccc" }]}>Beta Feedback</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={() => Logout()}>
            <Icon name="logout" size={24} color="#00DE62" />
            <Text style={[styles.optionText, { color: "#ccc" }]}>Logout</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.option} onPress={() => {
            checkHermes()
          }}>
            <Icon name="logout" size={24} color="#00DE62" />
            <Text style={[styles.optionText, { color: "#ccc" }]}>Check hermes</Text>
          </TouchableOpacity> */}

        </View>

        <View style={styles.footer}>
          <Text style={styles.devtext1}> Beta Version 1.0.0</Text>
          <Text style={styles.devtext}>  Developed by RSPY Tech Pvt. Ltd.</Text>
        </View>
      </View>
    </View>


  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16181A",
    position: "relative"
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    //paddingVertical: 15,
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
    paddingTop: 0,
    flex: 1,
    justifyContent: 'space-between'
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
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#00DE62",
    // marginBottom: 12,
    fontFamily: "myanmar",
    color: "#00DE62",
    paddingLeft: 10,
    marginBottom: 10,
  },

  devtext: {
    // textAlign:"right",
    color: "#ccc",
    alignSelf: "center",
    bottom: 0,
    fontFamily: "Roboto",
    fontSize: 10,
    marginTop:2
  },

  devtext1: {
    // textAlign:"right",
    color: "#828282",
    alignSelf: "center",
    bottom: 0,
    marginBottom : 4,
    fontFamily: "Roboto",
    fontSize: 12,
    
  }
});

export default Settings;