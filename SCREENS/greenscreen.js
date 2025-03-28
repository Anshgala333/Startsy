import * as React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import { SafeAreaView, Text, Pressable, TextInput, View, Image, StyleSheet, StatusBar, Animated, Easing, Dimensions, KeyboardAvoidingView } from "react-native";
// const { height , width } = Dimensions.get('window');
import greenstyle from "../styles/greenstyle.js"
import Login1 from "./logintrial.js";
const { width, height } = Dimensions.get('window');
import { motion } from 'framer-motion';
import Svg, { Text as SvgText } from 'react-native-svg';
import { useFocusEffect } from "expo-router";
// import  {Global}  from "../app/(tabs)/index.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { url } from "@/config.js";

import { GlobalContext } from "@/Global/globalcontext.js";


const Green = ({ navigation }) => {

    // const {globaldata} = useContext(Global);
    // useEffect(() => {
    //     console.log(globaldata, "global data");
    // }, [globaldata]);

    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181a")
        StatusBar.setBarStyle("light-content")

    })

    const [state, setstate] = useState("")
    const [animationover, setanimationover] = useState(false)
    const [showtoast, setshowtoast] = useState(false)
    const [falsetoken, setfalsetoken] = useState("")
    var temp;


    useEffect(() => {
        async function getToken() {
            temp = await AsyncStorage.getItem("accessToken");
            console.log(temp, "app khulte vakt toke hai ya nai");

            setfalsetoken(temp)


            if (temp == "" || temp == null || temp == undefined) {
                setstate("")
                return
            }
            if (temp) {
                var decode = jwtDecode(temp)
                // console.log(decode);

                //  console.log();
                //  console.log(decode.exp * 1000 , "exp ");
                //  console.log(new Date(decode.exp) , "new dtae ");

                //  console.log(Date.now());

                if (decode.exp * 1000 < Date.now()) {
                    // console.log("expired");

                    setstate("");
                    return

                }


                if (decode.status == false) {
                    setstate("")

                    // console.log("unauthorized user hai yeh");

                    setshowtoast(true)
                }

                else if (decode && decode.role == "Investor") {
                    setstate("Investor")
                }
                else if (decode && decode.role == "Founder") {
                    setstate("Founder")
                }
                else if (decode && decode.role == "CommunityMember") {
                    setstate("CommunityMember")
                }
                else if (decode && decode.role == "Job seeker") {
                    setstate("Job seeker")
                }

            }
        }
        getToken();
    }, []);

    const { globaldata, updateField } = useContext(GlobalContext);


    useEffect(() => {

        async function f1(params) {

            temp = await AsyncStorage.getItem("accessToken");
            console.log(temp, "app khulte vakt toke hai ya nai");
            var decode = jwtDecode(temp)
            console.log(decode);


            if (state == "Investor" && animationover) {
                if (decode.isInvestorVerified) {
                    navigation.navigate("Main2")
                    return
                }
                console.log("recahed here");
                var data
                try {
                    const response = await fetch(`${url}test/getInvestorStatus`, {
                        method: 'GET',
                        headers: {
                            "Authorization": `Bearer ${falsetoken}`,
                        },
                    })
                    data = await response.json()
                    console.log(data.token);
                    console.log(data);
                    if (data.message.isInvestorVerified == true) {
                        navigation.navigate("Main2")
                    }
                    else if(data.message.investorRejected == true){
                        navigation.navigate("InvestorNotVerifiedScreen")

                    }
                    else  {
                        navigation.navigate("InvestorWaitingPage")
                    }
                 


                }
                catch (e) {
                    console.log(e);
                }
                finally {
                    try {
                        console.log(data.token , "okkkkkkkkkkkkkkkkkkk");
                        
                        await AsyncStorage.setItem('accessToken', data.token);
                        updateField("token", data.token);

                        console.log('Data saved successfully!');
                    } catch (error) {
                        console.error('Error saving data:', error);
                    }
                }
            }
            else if ((state == "Founder" || state == "CommunityMember" || state == "Job seeker") && animationover) {
                // navigation.navigate("Main2")
                navigation.replace("Main2")

            }
        }
        f1()

    }, [state, animationover])



    const animatedtop1 = useRef(new Animated.Value(height)).current;
    useEffect(() => {
        // Delay for 2 seconds, then move the login up with a 1 second animation
        setTimeout(() => {
            Animated.timing(animatedtop1, {
                toValue: 0, // Move to 0% (top of the screen)
                duration: 200, // 1 second transition
                easing: Easing.linear,
                useNativeDriver: false,
            }).start();


        }, 2000); // 2 second delay
    }, [animatedtop1]);


    useFocusEffect(() => {
        // StatusBar.setBackgroundColor("#00DF60"); // Set your desired color
        // StatusBar.setBarStyle("light-content");
    })


    // setTimeout(function(){
    //     navigation.replace("LoginTrial")

    // },1500)

    const animatedWidth = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        setTimeout(function () {
            Animated.timing(animatedWidth, {
                toValue: width, // Animate to full width of the screen
                duration: 800, // Duration of the animation
                useNativeDriver: false,
                // SVG doesn't support native driver
                easing: Easing.elastic(3)
                // easing : ,
            }).start();
        }, 800)

    }, [animatedWidth])

    useEffect(() => {
        setTimeout(() => {
            setanimationover(true)
        }, 1200);
    }, [])



    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} style={{ flex: 1, backgroundColor: "#000" }}>
            <View style={greenstyle.green}>
                <StatusBar backgroundColor="#16181a" barStyle={"light-content"} />
                {/* <StatusBar translucent={true} /> */}
                <View style={styles.main}>
                    {/* <Text style={{fontFamily: "Alata"}}>hello</Text> */}
                    <Animated.View style={{ overflow: 'hidden', width: animatedWidth, position: "absolute", alignSelf: "center", left: -width * 0.31, alignContent: "center", top: -50, }}>
                        <Svg height="80" width={width}>
                            <SvgText
                                // style={{ fontFamily: "Arial"  }}
                                x="0"
                                y="50"
                                // fontFamily="Roboto"
                                // fontFamily="Arial"
                                fontSize="70"
                                alignItems="center"
                                fontWeight="bold"
                                fill="#00DF60"
                            >
                                startsy
                            </SvgText>
                        </Svg>
                    </Animated.View>
                </View>



                {state == "" && <Animated.View style={[greenstyle.login, { top: animatedtop1 }]}>
                    <Login1 navigation={navigation} showtoast={showtoast} falsetoken={falsetoken} />
                </Animated.View>}

            </View>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    main: {
        position: 'relative',
        top: "0%",
        backgroundColor: "red",
        alignItems: 'flex-start',
        // left : "-19%"

    },
});

export default Green;
