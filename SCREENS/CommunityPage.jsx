import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, ActivityIndicator, Vibration, Image, StyleSheet, Platform } from "react-native";
import { GlobalContext } from "@/Global/globalcontext.js";
import { url } from '../config.js'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardAvoidingView } from "react-native";
import { useNavigation } from "expo-router";
import Drop from "@/SCREENS/dropdown.js";
import styles from '../styles/CommunityStyles.jsx'
import B1 from "@/assets/icons/b1.js";
import * as ImagePicker from 'expo-image-picker';
import Profile from "../assets/icons/profile.js"



const CommunityPage = () => {

  const data = useContext(GlobalContext);
  const token = data.globaldata.token;
  const navigation = useNavigation();

  const [communityname, setcommunityname] = useState("");  //controller for community name
  const [description, setdescription] = useState("");      //controller for descripton
  const [error1, setError1] = useState(false);             //error for community name
  const [error2, setError2] = useState(false);             //error for description
  const [error3, setError3] = useState(false);             //error for rule section
  const [loading, setLoading] = useState(false);           //loading field
  const [buttonText, setButtonText] = useState("Post");    //submit button text
  const [onValueChange, setOnValueChange] = useState("")   ///controller for rule section
  const maxLength = 1000;                                  ///length count for description
  const [open, setOpen] = useState(false);                 ///state for rule section


  const [image, setImage] = useState("xyz");

  const fileupload = async () => {

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Allow all media types
      allowsEditing: true, // Allows cropping the image
      aspect: [4, 3], // Aspect ratio of the image
      quality: 1, // Image quality (0 to 1)

    });


    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setImage(imageUri);

    }

  }


  //items for drop down
  const items = [
    { label: "Only for Founders", value: "Only for Founders" },
    { label: "Only for Community Members", value: "Only for Community Members" },
    { label: "Job seeker", value: "Jobseeker" },
    { label: "Startup Enthusiast", value: "Startup Enthusiast" },
    { label: "Mentor", value: "Mentor" },
    { label: "Networker", value: "Networker" },
    { label: "Founder or Mentor", value: "Founder or Mentor" },
    { label: "Founder or Startup Enthusiast", value: "Founder or Startup Enthusiast" },
    { label: "No rules", value: "No rules" },
  ];

  ///called this function when click on submit button
  const post = async function () {

    setLoading(true);
    let hasError = false;
    if (communityname == "") {
      setError1(true);
      hasError = true;

    }
    if (description == "") {
      setError2(true);
      hasError = true;

    }
    // if (onValueChange == "") {
    //   setError3(true);
    //   hasError = true;
    // }

    if (hasError) {
      setLoading(false);
      return;
    }

    if (loading) {
      setLoading(false);
      return;
    }

    const postType = "communityPost";
    const finaldata = {
      "communityName": communityname,
      "communityDescription": description,
      "communityRules": onValueChange,
    };
    const final = new FormData();
    final.append("communityName", communityname)
    final.append("communityDescription", description)
    // final.append("communityRules", onValueChange)
    final.append("communityRules", "No rules")
    if (image != "xyz") {
      final.append("groupPhoto", {
        uri: image,
        type: "image/jpeg",
        name: `image_${Date.now()}.jpg`,

      })
    }

    // console.log(final);
    // console.log(image);








    try {
      const response = await fetch(`${url}posts/createCommunityPost/${postType}`, {
        method: 'POST',
        body: final,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });


      const data = await response.json();
      setButtonText("Posted");
      setcommunityname("");
      setdescription("");
      setOnValueChange("");
      // setdropdownvalue("");

      console.log(response.status);

      if (response.status == 201) {
        Vibration.vibrate(100);
        navigation.goBack();
      }


    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false)
    }
  };


  ///this is section to edit header when page is re rendered
  useLayoutEffect(() => {
    navigation.setOptions(

    )
  }, [])




  return (

    <ScrollView keyboardShouldPersistTaps="handled"
      nestedScrollEnabled={true}
      style={{ flex: 1, backgroundColor: "#16181a", flexGrow: 1, }}
    >

      <View style={styles.container} >

        {/* <Text style={styles.tittle}>Upload Community</Text> */}
        {/* image for community */}
        {/* <View style={{marginVertical : 10 , marginBottom : 10}}><B1/></View> */}



        <Pressable onPress={fileupload}>
          {image != "xyz" ? (
            <Image style={styles.img} source={{ uri: image }} />
          ) : (
            // <Image style={styles.img1} source={require("../assets/images/User_light.png")} />
            <Profile />
          )}
        </Pressable>

        <Text style={styles.t1}>Upload a profile picture</Text>


        <View style={{ flex: 1, marginTop: 20 }}>
          {/* Community name field */}
          <TextInput
            placeholderTextColor="#ccc"
            style={styles.input}
            placeholder="Forum Name"
            value={communityname}
            onChangeText={setcommunityname}
          />






          {/* show error is community name field is empty */}
          {error1 && <Text style={styles.errorStyle}>*Hub name is required</Text>}


          {/* Description field */}
          <View style={{ marginTop: 10 }}>
            <Text style={styles.label}>Description :</Text>
            <TextInput
              style={styles.textArea}
              value={description}
              multiline
              numberOfLines={4}
              maxLength={maxLength}
              onChangeText={setdescription}
            />
            <Text style={styles.descriptionLength}>{description.length}/{maxLength} </Text>


            {/* show error is description field is empty */}
            {error2 && <Text style={styles.errorStyle}>*Description is required</Text>}


          </View>

          {/* Rule drop down field */}
          <View style={{ marginTop: 10 }}>
            {/* <Text style={styles.label}>Rules :</Text>
            <Drop

              items={items}
              onValueChange={setOnValueChange}
              open={open} setOpen={setOpen}
              width="100%" search={false}
              placeholder={"Select rule :"}
            /> */}

            {/* show error is rule field is empty */}
            {error3 && <Text style={styles.errorStyle}>*Rule is required</Text>}

          </View>
          <Pressable onPress={post} style={styles.button}>

            {/* show loading if pressed on post button */}

            {loading ?

              <ActivityIndicator size={24} color="#16181a" />

              : <Text style={styles.buttonText}>{buttonText}</Text>
            }

          </Pressable>
        </View>

      </View>
    </ScrollView>


  );
};

export default CommunityPage;








