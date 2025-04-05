
import React, { useContext } from "react";
import { useState, useEffect, useRef } from "react";
import signupstyles from "../styles/signup1styles.js";
import s5 from "@/styles/s5.js";
import Ionicons from '@expo/vector-icons/Ionicons';
import Back from "@/components/back.js";
import { url } from "../config.js"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { SafeAreaView, ScrollView, View, Text, Button, BackHandler, TextInput, Image, StatusBar, Animated, Easing, KeyboardAvoidingView, Pressable, ActivityIndicator } from "react-native";
import { useFocusEffect } from "expo-router";
import { GlobalContext } from "@/Global/globalcontext.js";


const Signup1 = function ({ navigation, route }) {

    // Set status bar style and background color when the screen is focused
    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181a")
        StatusBar.setBarStyle("light-content")
    })

    const { type } = route.params;
    const [username, setusername] = useState("")
    const { globaldata } = useContext(GlobalContext)
    const [message, setmessage] = useState("* username already taken")
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(false)
    // console.log(globaldata);
    // console.log(globaldata.token);


    async function checkusername() {

       

        
        // console.log(username, "username");
        setloading(true)
        if (username == "" || username.trim().length == 0) {
            setmessage('* username required')
            seterror(true)
            setloading(false)
            return
        }
        // console.log(username[0].charCodeAt(0));

        
        if(/[A-Z]/.test(username)){
            
            
            setmessage("* username should be in smaller case")
            seterror(true)
            setloading(false)
            return
        }  
        
        // console.log( /^(?![._])[A-Za-z0-9._]*(?<![._])$/.test(username));
        if(username[0]==" " || username[username.length-1]===" "){
            setmessage('* invalid username')
            seterror(true)
            setloading(false)
            return
        }
        

        if(!(/^(?![._])[A-Za-z0-9._]*(?<![._])$/.test(username))){
            setmessage("*Usernames may include letters, numbers, '.', and '_', but cannot start or end with them.")
            seterror(true)
            setloading(false)
            return
        }

        // Make API call to check if the username is available
        const response = await fetch(`${url}api/checkUserName`, {
            method: 'POST',
            body: JSON.stringify({ username: username }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        // console.log(data);
        if (response.status === 200) {
            navigation.navigate("Signup2", { username, type })
            // navigation.navigate("Signup2", { type, username })
        }
        else if (response.status === 400) {
            setmessage("username already taken")
            seterror(true)
        }
        setloading(false)


    }

    useEffect(() => {
        // Handle hardware back button press
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {

            navigation.setParams({ type });
            navigation.goBack();
            return true;
        });

        return () => backHandler.remove();
    }, [])

    return (

        // Render the signup screen UI
        <KeyboardAvoidingView style={signupstyles.container} behavior="padding" keyboardVerticalOffset={-100} >
            <ScrollView automaticallyAdjustContentInsets={true} automaticallyAdjustsScrollIndicatorInsets={true} style={{ flex: 1 , maxHeight : "100%" }} >

                <View style={signupstyles.row}>
                   <Pressable onPress={() => navigation.goBack()}>
                        <FontAwesome6 name="chevron-left" size={34} style={{ alignSelf: 'flex-start', marginLeft: 16 }} color="#00DF60" />
                    </Pressable>
                    <View style={signupstyles.top}>
                        <Image style={signupstyles.logo} source={require("../assets/images/logo.png")} />
                    </View>


                    <View style={signupstyles.bottom}>
                        <Text allowFontScaling={false} style={signupstyles.t1}>Choose Username</Text>
                        {!error && <Text allowFontScaling={false} style={signupstyles.t2}>You won't be able to change it later.</Text>}
                        {error && <Text style={signupstyles.error}>{message}</Text>}

                        {/* TextInput for entering the username */}
                        <TextInput
                            allowFontScaling={false}
                            placeholder="Username"
                            placeholderTextColor="#828282"
                            style={s5.input}
                            value={username}
                            onChangeText={(text) => {
                                seterror(false)
                                setusername(text)
                            }}
                        />

                        <Pressable style={signupstyles.next} onPress={() => { checkusername() }}>
                            {loading && <ActivityIndicator  style={{ marginTop: 7 }} size={24} color="#16181a" />}
                            {!loading && <Text allowFontScaling={false} style={signupstyles.nexttext}>Next</Text>}
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    )

}

export default Signup1