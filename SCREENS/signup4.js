import React from "react";
import { useState, useEffect, useRef } from "react";
import signup3styles from "../styles/signup3styles.js";
import signupstyles from "@/styles/signup1styles.js";
import Custombutton from "../components/button.js"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import { SafeAreaView, View, Text, Button, TextInput, Image, StatusBar, Animated, Easing, KeyboardAvoidingView, Pressable, StyleSheet, Dimensions } from "react-native";
import { CommonActions } from "@react-navigation/native";

import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "expo-router";
const Signup4 = ({ navigation, route }) => {
    const { type , username , password } = route.params;
    function nav() {

    }

    // const resetNavigation = () => {
    //     // Reset the navigation stack to the 'Signup1' screen
    //     navigation.dispatch(
    //       CommonActions.reset({
    //         index: 5, // The screen you want to navigate to (in this case, 'Signup1')
    //         routes: [{ name: 'LoginTrial' }], // The route name for the target screen
    //       })
    //     );
    //   };


     useFocusEffect(() => {
           StatusBar.setBackgroundColor("#16181a")
           StatusBar.setBarStyle("light-content")
       })
    return (

        <SafeAreaView style={signup3styles.container}>
            <View style={signup3styles.row}>
                {/* top */}
                <View style={signup3styles.top}>
                    <View style={signup3styles.left}>
                        <Image style={signup3styles.logo} source={require("../assets/images/logo.png")} />
                    </View>
                    <View style={signup3styles.right}>
                        <View style={signup3styles.line}>
                            <View style={[signup3styles.c, signup3styles.c1]}></View>
                            <View style={[signup3styles.c, signup3styles.c2]}></View>
                            <View style={[signup3styles.c, signup3styles.c3]}></View>
                            <View style={[signup3styles.c, signup3styles.c4]}></View>
                            <View style={[signup3styles.c, signup3styles.c5]}></View>
                            <View style={[signup3styles.n, signup3styles.n1]}><Text style={signup3styles.ntext}>1</Text></View>
                            <View style={[signup3styles.n, signup3styles.n2]}><Text style={signup3styles.ntext}>2</Text></View>
                            <View style={[signup3styles.n, signup3styles.n3]}><Text style={signup3styles.ntext}>3</Text></View>
                            <View style={[signup3styles.n, signup3styles.n4]}><Text style={signup3styles.ntext}>4</Text></View>
                            <LinearGradient
                                style={[signup3styles.progress]}
                                locations={[0, 0.8]}
                                colors={['#8CBEA2', '#79b896']}
                                start={{ x: 0, y: 0 }} // Starting point of the gradient
                                end={{ x: 1, y: 0 }}
                            />
                        </View>
                    </View>
                </View>



                {/* bottom */}
                <View style={signup3styles.bottom}>

                    <Text style={styles.t1}>
                        Apart from your primary residence do you own assets worth 2cr. and above?
                    </Text>


                    <Pressable style={styles.btn} onPress={() => { navigation.navigate("Signup5", { type , username , password }) }}>
                        <Text allowFontScaling={false} style={signupstyles.nexttext}>Yes</Text>
                    </Pressable>
                    <Pressable style={styles.btn} onPress={()=>{navigation.navigate("Signup3")}}>
                        <Text allowFontScaling={false} style={signupstyles.nexttext}>No</Text>
                    </Pressable>

                    <Pressable style={styles.back} onPress={() => {
                        navigation.setParams({ type });
                        navigation.goBack();
                    }}><FontAwesome6 name="chevron-left" size={50} color="#00DF60" /></Pressable>


                </View>
            </View>
        </SafeAreaView>
    )
}

export default Signup4
const { height, width } = Dimensions.get("window")
var a = width / 360;
var b = height / 800;
// console.log(a, b);

const scalingfactor = Math.sqrt(a * b)

const styles = StyleSheet.create({

    t1: {
        color: "#D9D9D9",
        fontFamily: "Alata",
        lineHeight: scalingfactor * 30,
        fontSize: scalingfactor * 24,
        textAlign: "center",
        width: "90%",
        alignSelf: "center",
        marginBottom: scalingfactor * 20

    },

    btn: {
        width: 188,
        height: 47,
        // height : scalingfactor*48,
        backgroundColor: "#00DF60",
        // padding: scalingfactor * 12,
        marginVertical: height * 0.018,
        justifyContent: "center",
        alignContent: "center",
        borderRadius: 20,
        margin: "auto",
        marginTop: scalingfactor * 20,
        shadowColor: 'rgba(0,0,0, 0.5)', // Shadow color
        shadowOffset: {
            width: 0, // x offset
            height: 5, // y offset
        },
        shadowOpacity: 1, // Full opacity for shadow effect
        shadowRadius: 1, // Blur radius
        elevation: 5,

    }
    , back: {
        position: 'absolute',
        left: 30,
        bottom: 40
    }
})