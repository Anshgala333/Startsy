import React, { useContext, useState } from "react";
import { View, Text, TextInput, Pressable, ActivityIndicator, Vibration, ToastAndroid } from "react-native";
import { useNavigation } from "expo-router";
import { GlobalContext } from "@/Global/globalcontext.js";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import Drop from "@/SCREENS/dropdown.js";
import { Image } from "react-native-svg";
import styles from '../styles/BlogStyle.jsx'
import B2 from "@/assets/icons/b2.js";
import { url } from "@/config.js";
import { Checkbox } from "react-native-paper";

const BlogPage = () => {
  const data = useContext(GlobalContext);
  const token = data.globaldata.token;
  const navigation = useNavigation();

  const [blog, setBlog] = useState("");      //controller for descripton
  const [blogError, setBlogError] = useState(false)
  const [loading, setLoading] = useState(false);           //loading field
  const [buttonText, setButtonText] = useState("Post blog");    //submit button text
  const maxLength = 1000;                                  ///length count for description

  const [isPrivate,setIsPrivate]=useState(false);


  const postBlog = async () => {
    // console.log(blog)
    setLoading(true);
    let hasError = false;

    if (blog == "") {
      setBlogError(true);
      hasError = true;
      setLoading(false);
      return
    }

    const postType = "textBlog";
    const finaldata = {
      "content": blog,
    };
    finaldata['isPrivate'] = isPrivate

    try {
      const response = await fetch(`${url}posts/createPost/${postType}`, {
        method: 'POST',
        body: JSON.stringify(finaldata),
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error: ${response.status} - ${errorText}`);

      }

      const data = await response.json();

      if (response.status == 200) {
        Vibration.vibrate(100)
        setButtonText("Posted")
        navigation.goBack();
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
      setBlogError(false);
    }
  };

  

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#16181a' }}>

      <ScrollView keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
        contentContainerStyle={{ flexGrow: 1 }}>

        <View style={styles.container} >

          {/* image for community */}
          <B2 />

          <View style={{ flex: 3 }}>
            {/* Description field */}
            <View style={{ marginTop: 10 }}>
              <Text style={styles.label}>Write a blog :</Text>
              <TextInput
                style={styles.textArea}
                value={blog}
                multiline
                numberOfLines={maxLength}

                maxLength={maxLength}
                onChangeText={setBlog}
              />
              <Text style={styles.descriptionLength}>{blog.length}/{maxLength} </Text>

              <View style={{ color: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10 }}>
                <Checkbox
                  status={isPrivate ? "checked" : "unchecked"}
                  onPress={() => {
                    setIsPrivate(!isPrivate)
                    if (!isPrivate) {
                      ToastAndroid.showWithGravityAndOffset(
                        `Your post will only be visible to your connections`,
                      
                        ToastAndroid.LONG,
                        ToastAndroid.TOP,
                        ToastAndroid.CENTER,
                        100, 100
                      );
                    }
                  }}
                  uncheckedColor='#ccc'
                  color='#00de62'
                />
                <Text style={{ color: '#ccc' }}>Private</Text>
              </View>


              {/* show error is description field is empty */}
              {blogError && <Text style={styles.errorStyle}>*Blog text is required</Text>}


            </View>



            <Pressable onPress={postBlog} style={styles.button}>

              {/* show loading if pressed on post button */}

              {loading ?

                <ActivityIndicator size={24} color="#16181a" />

                : <Text style={styles.buttonText}>{buttonText}</Text>
              }

            </Pressable>
          </View>

        </View>
      </ScrollView>

    </GestureHandlerRootView>
  );
};

export default BlogPage;