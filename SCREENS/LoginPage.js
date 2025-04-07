
import React, { useContext } from "react";
import { useState, useEffect, useRef } from "react";
import { useFocusEffect } from "expo-router";

import signupstyles from "../styles/signup1styles.js";
import s5 from "@/styles/s5.js";
import Ionicons from '@expo/vector-icons/Ionicons';
import Back from "@/components/back.js";
import { url } from "../config.js"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { SafeAreaView, ScrollView, View, Text, Button, BackHandler, TextInput, Image, StatusBar, Animated, Easing, KeyboardAvoidingView, Pressable, ActivityIndicator, Dimensions, Alert, TouchableOpacity } from "react-native";
import {  useNavigation } from "expo-router";
import { GlobalContext } from "@/Global/globalcontext.js";

import styles from "../styles/l.js"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import Entypo from '@expo/vector-icons/Entypo';


const LoginPage = function ({ navigation, route }) {


    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181a")
        StatusBar.setBarStyle("light-content")
    })

    // const { type } = route.params;
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    // const { globaldata } = useContext(GlobalContext)
    const [message, setmessage] = useState("* username already taken")
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(false)
    // console.log(globaldata);
    // console.log(globaldata.token);
    const [emailerror, setemailerror] = useState(false)
    const [passworderror, setpassworderror] = useState(false)
    const [passworderror1, setpassworderror1] = useState(false)
    const [wrongcredential, setwrongcredential] = useState(false)


    const [showPassword,setShowPassword]=useState(true);


    const { globaldata, updateField } = useContext(GlobalContext);

    const handlelogin = async () => {

        console.log("login route called");



        setemailerror(false)
        setpassworderror(false)
        setpassworderror1(false)
        setwrongcredential(false)

        if (email == "") {
            setemailerror(true)
            return
        }
        if (password == "") {
            setpassworderror(true)
            return
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        // if (!passwordRegex.test(password)) {
        //   setpassworderror1(true)
        //   return;
        // }

        setloading(true)
        var ExistingToken = await AsyncStorage.getItem("notificationToken")
        console.log(ExistingToken);

    


        var final = {
            identifier: email.trim(),
            password: password,
            notificationToken: ExistingToken

        }
        console.log(final);



      
        try {
            const response = await fetch(`${url}api/authenticate`, {
                method: 'POST',
                body: JSON.stringify(final),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                }
            });
            const data = await response.json();
            console.log(data);
            // Alert.alert(JSON.stringify(data))
            if (response.status === 200) {
                updateField("token", data.accessToken);
                try {
                    await AsyncStorage.setItem('accessToken', data.accessToken);
                    console.log('Data saved successfully!');
                } catch (error) {
                    console.error('Error saving data:', error);
                }

                try {
                    const token = data.accessToken;
                    const decoded = jwtDecode(token);
                    console.log(decoded, "ok");
                    if (decoded.role == "Investor") {

                        if (decoded.isInvestorVerified == true) {
                            console.log("reaced here 1");
                            navigation.reset({
                                index: 0,
                                routes: [{ name: "Main2" }],
                            });
                            // navigation.navigate("Main2")
                        }
                        else if (decoded.investorRejected == true) {
                            console.log("reaced here 2");
                            navigation.navigate("InvestorNotVerifiedScreen")
                        }
                        else {
                            console.log("reaced here");

                            navigation.navigate("InvestorWaitingPage")
                        }
                    }
                    else {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "Main2" }],
                        });
                        // navigation.navigate("Main2");
                    }
                }
                catch (err) {
                    Alert.alert(JSON.stringify(data))

                }
            }
            else {
                setwrongcredential(true)
            }


        }
        catch (err) {
            // Alert.alert(JSON.stringify(err))
            console.log(err);

        }
        finally {
            setTimeout(() => {
                setloading(false)
            }, 1000);

        }


    }
    

    useEffect(() => {
        // Handle hardware back button press
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            // navigation.setParams({ type });
            navigation.goBack();
            return true;
        });

        return () => backHandler.remove();
    }, [])

    const [height , setHeight] = useState("")

    useFocusEffect(() => {
        const { height } = Dimensions.get("window")
        setHeight(height)
    })




    return (

        // Render the signup screen UI
        <KeyboardAvoidingView style={signupstyles.container} behavior="padding" keyboardVerticalOffset={-100} >
            <ScrollView automaticallyAdjustContentInsets={true} automaticallyAdjustsScrollIndicatorInsets={true} style={{  minHeight : height }} >

                <View style={signupstyles.row}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <FontAwesome6 name="chevron-left" size={34} style={{ alignSelf: 'flex-start', marginLeft: 16, paddingTop: 10 }} color="#00DF60" />
                    </Pressable>
                    <View style={signupstyles.top}>
                        <Image style={signupstyles.logo} source={require("../assets/images/logo.png")} />
                    </View>


                    <View style={[signupstyles.bottom, { height: height*0.7 }]}>
                        <Text allowFontScaling={false} style={[signupstyles.t1, { marginTop: -15, marginBottom: -20 }]}>Welcome Back !</Text>
                        {!error && <Text allowFontScaling={false} style={signupstyles.t2}></Text>}
                        {wrongcredential && <Text style={signupstyles.invalid}>Invalid credentials</Text>}

                        <TextInput allowFontScaling={false}
                            placeholderTextColor="#828282"

                            style={styles.input}
                            // ref={emailInput}
                            placeholder="Email / Username"
                            value={email}
                            autoCapitalize="none"
                            onChangeText={(text) => { setemail(text) }}
                            // onFocus={() => {
                            //     scrollContainer.current?.scrollTo({ y: 100, animate: true });
                            // }}
                            autoComplete="email"

                        />
                        {emailerror && <Text style={styles.error}>Please enter email address*</Text>}
                        <View style={styles.passwordcontainer}>
                            <TextInput allowFontScaling={false}
                                placeholderTextColor="#828282"
                                style={styles.input2}
                                placeholder="Password"
                                value={password}
                                autoComplete="password"
                                onChangeText={(text) => { setpassword(text) }}
                                secureTextEntry={showPassword}
                            />


                            <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, marginRight: 10, marginBottom: 5 }}
                            onPress={()=>setShowPassword(prev=>!prev)}
                            >
                                {showPassword?
                                    <Entypo name="eye-with-line" size={24} color="#828282" />
                                    :
                                    <Entypo name="eye" size={24} color="#828282" />

                                }
                            </TouchableOpacity>

                        </View>
                        {passworderror && <Text style={[styles.error, { marginTop: 5 }]}>Please enter password*</Text>}
                        {passworderror1 && <Text style={styles.error}>Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one number.</Text>}

                        <Pressable onPress={() => navigation.navigate("FP1")} style={styles.forgot}>
                            <Text allowFontScaling={false} style={[styles.white, styles.forgottext]}>Forgot Password ?</Text>
                        </Pressable>

                        <Pressable style={signupstyles.next} onPress={() => { handlelogin() }}>
                            {loading && <ActivityIndicator style={{ marginTop: 7 }} size={24} color="#16181a" />}
                            {!loading && <Text allowFontScaling={false} style={signupstyles.nexttext}>Login</Text>}
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    )

}

export default LoginPage