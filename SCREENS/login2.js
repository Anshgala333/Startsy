import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { SafeAreaView, Text, Pressable, TextInput, View, Image, StyleSheet, Dimensions, StatusBar, Animated, Easing, Platform, KeyboardAvoidingView, ScrollView, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ReadMore1 from "./trial-1.js";
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
const { height, width } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';



const Login2 = ({ navigation }) => {
    const [attop, setattop] = useState(true)
    const animatedValue1 = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        // Start the animation
        Animated.timing(animatedValue1, {
            toValue: attop ? -10 : -height, // Move to 100 if attop is true, else move to 0
            duration: 300, // 0.5 seconds transition
            useNativeDriver: false, // Use native driver for better performance
            easing: Easing.inOut(Easing.ease)


        }).start();
    }, [attop]);

    const animatedtop1 = {
        top: animatedValue1, // Bind animated value to top
    };


    const animatedValue = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        // Start the animation
        Animated.timing(animatedValue, {
            toValue: attop ? height : -10, // Move to 100 if attop is true, else move to 0
            duration: 300, // 0.5 seconds transition
            useNativeDriver: false, // Use native driver for better performance
            easing: Easing.inOut(Easing.ease)
            //
        }).start();
    }, [attop]);

    const animatedtop = {
        top: animatedValue, // Bind animated value to top
    };

    function showsignuppage(type, navigation) {
        // console.log(type);
        navigation.navigate("Signup1", { type: type });

    }

    return (


        <View behavior="padding" keyboardVerticalOffset={-200} style={[styles.container]}>
            <Animated.View style={[{ backgroundColor: "#1E1E1E" }, animatedtop1]}>


                <Pressable style={[styles.back, { zIndex: (attop) ? 1 : 0 }]} onPress={() => {
                    // setForm1Visible(true);
                    // animation3()
                    navigation.navigate("LoginTrial")
                }} >

                    <Ionicons name="arrow-back-circle-outline" size={50} color="#00DE62" />

                </Pressable>

                <View style={styles.top}>
                    <Image style={styles.logo} source={require("../assets/images/logo.png")} />
                </View>
                <View style={styles.bottom}>
                    <View>

                        <Text allowFontScaling={false} style={[styles.newaccount]}>Create a new account as ?</Text>
                        <Pressable onPress={() => {
                            showsignuppage("Investor", navigation)
                        }} style={styles.btn4}><Text allowFontScaling={false} style={[styles.btn4text, { fontFamily: "Alata" }]}>Investor</Text></Pressable>
                        <Pressable onPress={() => {
                            showsignuppage("Founder", navigation)
                        }} style={styles.btn4}><Text allowFontScaling={false} style={styles.btn4text}>Founder</Text></Pressable>
                        <Pressable onPress={() => { showsignuppage("Freelancer", navigation) }} style={styles.btn4}><Text allowFontScaling={false} style={styles.btn4text}>Freelancer</Text></Pressable>
                        <Pressable onPress={() => { showsignuppage("Community member", navigation) }} style={styles.btn4}><Text allowFontScaling={false} style={styles.btn4text}>Community member</Text></Pressable>
                        <Text allowFontScaling={false} style={[styles.gray, styles.p]}>
                            Don't know what to choose? <Text onPress={() => setattop(false)} style={styles.green}>Read more</Text>
                        </Text>
                    </View>

                </View>


            </Animated.View>
            <ReadMore1 attop={attop} setattop={setattop} animatedtop={animatedtop} />


        </View>
    )
}

export default Login2

// const { width, height } = Dimensions.get("window");
// console.log(height);
// const ratio = PixelRatio.get();
// console.log(ratio , "ratio");

var a = width / 360;
var b = height / 800;
// console.log(a,b);

const scalingfactor = Math.sqrt(a * b)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        backgroundColor: "#1E1E1E",
        // backgroundColor : "red",
        position: "relative",
        height: height,
        width: "100%",
        zIndex: 1,

    },
    top: {
        height: height * 0.32,
        margin: "auto",
        padding: height * 0.0215,
        justifyContent: "center",
        alignContent: "center",
        width: "100%",

    },


    bottom: {
        height: 0,
        // height : 0,
        margin: "auto",
        width: "100%",
        backgroundColor: "#24272A",
        borderTopLeftRadius: 70,
        padding: height * 0.03,
        paddingTop: height * 0.06,
        alignSelf: "flex-end",
        // backgroundColor : "red",
        height: height * 0.68,


    },
    logo: {
        aspectRatio: 1,
        resizeMode: "contain",
        margin: "auto",
        alignSelf: "center",
        flex: 0.9
    },
    btn4: {
        backgroundColor: "#00DF60",
        width: "92%",
        height: scalingfactor * 60,
        // padding: height * 0.022,
        marginVertical: scalingfactor * 14,
        justifyContent: "center",
        alignContent: "center",
        borderRadius: 20,
        margin: "auto",
    },
    btn4text: {
        fontSize: scalingfactor * 24, // Responsive font size
        // fontSize : 30,
        color: "#24272A",
        textAlign: "center",
        fontWeight: "600",
        // letterSpacing: 1.5,
        fontFamily: "Alata"
        , marginTop: -5
    },
    newaccount: {
        fontSize: scalingfactor * 24, // Responsive font size
        color: "white",
        marginBottom: width * 0.04,
        fontFamily: "Alata",
        color: "#C5C5C5",
        textAlign: "center"
    },
    back: {
        position: "absolute",
        top: 20,
        left: 20,
        // backgroundColor  : "red",

    },
    backicon: {
        transform: [{ scale: 1.1 }],
        zIndex: 20
    },
    gray: {
        color: "#C5C5C5",
        fontSize: width * 0.042, // Responsive font size,
        fontFamily: "Alata"
    },
    p: {
        textAlign: "center",
        marginVertical: height * 0.012,
        fontSize: width * 0.042,
        fontFamily: "Alata"
    },
    green: {
        color: "#00DF60",
        fontSize: height * 0.022, // Responsive font size
        // marginBottom : 0
        fontFamily: "Alata"
    },
})