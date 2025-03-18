import React, { useContext, useState } from "react";
import { View, Text, TextInput, Pressable, ActivityIndicator, Vibration } from "react-native";
import { useNavigation } from "expo-router";
import { GlobalContext } from "@/Global/globalcontext.js";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import Drop from "@/SCREENS/dropdown.js";
import { Image } from "react-native-svg";
import styles from '../styles/BlogStyle.jsx'
import B2 from "@/assets/icons/b2.js";
import { url } from "@/config.js";

const BlogPage = () => {
  const data = useContext(GlobalContext);
  const token = data.globaldata.token;
  const navigation = useNavigation();

  const [blog, setBlog] = useState("");      //controller for descripton
  const [blogError, setBlogError] = useState(false)
  const [loading, setLoading] = useState(false);           //loading field
  const [buttonText, setButtonText] = useState("Post blog");    //submit button text
  const maxLength = 1000;                                  ///length count for description



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

          <View style={{flex:3}}>
            {/* Description field */}
            <View style={{ marginTop: 10 }}>
              <Text style={styles.label}>Write a blog :</Text>
              <TextInput
                style={styles.textArea}
                value={blog}
                multiline
                numberOfLines={4}
                maxLength={maxLength}
                onChangeText={setBlog}
              />
              <Text style={styles.descriptionLength}>{blog.length}/{maxLength} </Text>


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