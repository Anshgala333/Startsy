
// 4.4 last of community
import React, { useState, useRef, useEffect } from "react";
import {
    ScrollView,
    SafeAreaView,
    View,
    Text,
    TextInput,
    Image,
    Animated,
    Pressable,
    StyleSheet,
    Dimensions,
    StatusBar,
    TouchableWithoutFeedback

} from "react-native";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { LinearGradient } from "expo-linear-gradient";
import signup3styles from "../styles/signup3styles.js";
import Drop from "./dropdown.js";
import Line2 from "./line2.js";
import Line3 from "./line3.js";
import Line from "./line.js";
import { useFocusEffect } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Signup6 = ({ navigation, route }) => {
    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181A")
        StatusBar.setBarStyle("light-content")
    })

    const { form, image } = route.params;
    console.log('====================================');
    console.log(form);
    console.log('====================================');



    const type = "Freelancer"
    const [role1, setrole] = useState("")
    const [interest, setinterest] = useState("")
    const [prefference, setprefference] = useState("")
    // const final = new FormData

    var role = [
        { label: "Job seeker", value: "Job seeker" },
        { label: "Startup Enthusiast", value: "Startup Enthusiast" },
        { label: "Mentor", value: "Mentor" },
        { label: "Networker", value: "Networker" },

    ]

    var contentPreferences = [
        { label: "Startup News", value: "Startup News" },
        { label: "Job Postings", value: "Job Postings" },
        { label: "Educational Content", value: "Educational Content" },
    ]


    var token;

    async function gettoken() {
        token = await AsyncStorage.getItem("accessToken");
    }

    gettoken()

    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    const t1 = () => {
        setOpen1(!open1);
        if (open2) setOpen2(false);
        if (open3) setOpen3(false);
    }
    const t2 = () => {
        if (open1) setOpen1(false)
        setOpen2(!open2);

        if (open3) setOpen3(false);
    }
    const t3 = () => {
        if (open1) setOpen1(false);
        if (open2) setOpen2(false);
        setOpen3(!open3);
    }
    const handleOutsideTouch = () => {
        if (open1) setOpen1(false);
        if (open2) setOpen2(false);
        if (open3) setOpen3(false);
    };
    const handlerole = (value1) => {
        // console.log("Selected Value:", value1); // Optional: Log the selected value
        setrole(value1); // Update state with the selected value
    };
    const handleinterest = (value1) => {
        console.log("Selected Value:", value1); // Optional: Log the selected value
        setinterest(value1); // Update state with the selected value
    };
    const handleprefference = (value1) => {
        // console.log("Selected Value:", value1); // Optional: Log the selected value
        setprefference(value1); // Update state with the selected value
    };


    const [message, setmessage] = useState("")
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(false)

    async function finalsubmit() {

        const final = new FormData();
        for (var items of form["_parts"]) {

            if (items[0] == "fullname" || items[0] == "password") continue;
            final.append(items[0], items[1]);
        }

        final.append("communityMemberRole", role1)
        final.append("areaOfInterest", interest)
        final.append("contentPrefrence", prefference)
        final.append("user_id", "abcd")




        if (image != "xyz") {
            final.append("profilePhoto", {
                uri: image,
                type: "image/jpeg",
                name: `image_${Date.now()}.jpg`,

            })
        }
        console.log("will make final submit");
        console.log(final);


        setloading(true)
        const response = await fetch('http://192.168.1.7:5002/api/communityMemberInfo', {
            method: 'POST',
            body: final,
            headers: {
                accept: "application/json",
                "Authorization": token,
            },
        });
        const data = await response.json();
        setloading(false)
        console.log(data);
        if (data.status === 200) {
            navigation.navigate("Main2", { username })
        }
        else if (data.status === 400) {
            console.log("internal error");
            setmessage("some error occurred")
        }
    }

    
    // var areaofinterestlist = [
    //     { label: "Technology", value: "Technology" },
    //     { label: "Healthcare", value: "Healthcare" },
    //     { label: "Finance", value: "Finance" },
    //     { label: "Consumer Goods", value: "Consumer Goods" },
    //     { label: "Education", value: "Education" },
    //     { label: "Energy", value: "Energy" },
    //     { label: "Real Estate", value: "Real Estate" },
    //     { label: "Logistics", value: "Logistics" },

    // ]

    var areaofinterestlist = [
        { label: "AI", value: "AI" },
        { label: "AR/VR", value: "AR/VR" },
        { label: "Blockchain", value: "Blockchain" },
        { label: "Social Media", value: "Social Media" },
        { label: "Marketing", value: "Marketing" },
        { label: "Social media marketing", value: "Social media marketing" },
        { label: "SaaS", value: "SaaS" },
        { label: "IoT", value: "IoT" },
        { label: "Cybersecurity", value: "Cybersecurity" },
        { label: "Cloud Computing", value: "Cloud Computing" },
        { label: "Biotech", value: "Biotech" },
        { label: "MedTech", value: "MedTech" },
        { label: "Digital Health", value: "Digital Health" },
        { label: "Pharma", value: "Pharma" },
        { label: "HealthTech", value: "HealthTech" },
        { label: "D2C", value: "D2C" },
        { label: "B2C", value: "B2C" },
        { label: "B2B", value: "B2B" },
        { label: "Marketplaces", value: "Marketplaces" },
        { label: "Logistics", value: "Logistics" },
        { label: "FinTech", value: "FinTech" },
        { label: "InsurTech", value: "InsurTech" },
        { label: "Decentralized Finance", value: "Decentralized Finance" },
        { label: "EdTech", value: "EdTech" },
        { label: "Online Learning Platforms", value: "Online Learning Platforms" },
        { label: "Cleantech", value: "Cleantech" },
        { label: "Renewable Energy", value: "Renewable Energy" },
        { label: "Sustainability", value: "Sustainability" },
        { label: "Media", value: "Media" },
        { label: "Gaming", value: "Gaming" },
        { label: "Content Platforms", value: "Content Platforms" },
        { label: "EVs", value: "EVs" },
        { label: "Autonomous Vehicles", value: "Autonomous Vehicles" },
        { label: "Ride-Sharing", value: "Ride-Sharing" },
        { label: "AgriTech", value: "AgriTech" },
        { label: "FoodTech", value: "FoodTech" },
        { label: "Non-profits", value: "Non-profits" },
        { label: "Impact Investing", value: "Impact Investing" },
        { label: "Philanthropy", value: "Philanthropy" }
    ];
    

    function nextpage(type) {

        const final = new FormData();
        for (var items of form["_parts"]) {

            if (items[0] == "fullname" || items[0] == "password") continue;
            final.append(items[0], items[1]);

        }

        final.append("communityMemberRole", role1)
        final.append("areaOfInterest", interest)
        final.append("contentPrefrence", prefference)
        final.append("user_id", "abcd")

        navigation.navigate("Signup7", { form: final, image: image })
    }

    return (
        <TouchableWithoutFeedback onPress={handleOutsideTouch}>
            <SafeAreaView style={signup3styles.container}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={signup3styles.row}>
                        {/* top */}
                        <View style={signup3styles.top}>
                            <View style={signup3styles.left}>
                                <Image style={signup3styles.logo} source={require("../assets/images/logo.png")} />
                            </View>
                            <View style={signup3styles.right}>
                                <Line3 progresswidth={"73%"} />
                            </View>
                        </View>



                        {/* bottom */}

                        <View style={styles.bottom}>

                            <Text allowFontScaling={false} style={styles.t1}>Community Participation</Text>
                            <Text allowFontScaling={false} style={styles.t2}>Specify your role within the community to help tailor your experience.</Text>
                            {/* <TouchableWithoutFeedback onPress={handleOutsideTouch}>  */}
                            <Drop bb={1} search={false} pccolor={"#828282"} width={"98%"}  borderColor={"#ccc"} items={role} onValueChange={handlerole} open={open1} setOpen={t1} />
                            {/* </TouchableWithoutFeedback> */}


                            <Text allowFontScaling={false} style={[styles.t1, { marginTop:  32 }]}>Area of Interest</Text>
                            <Text allowFontScaling={false} style={styles.t2}>Indicate the specific fields or topics you are passionate about within the startup ecosystem.</Text>
                            <Drop bb={1} pccolor={"#828282"} width={"98%"}  borderColor={"#ccc"}  items={areaofinterestlist} onValueChange={handleinterest} open={open2} setOpen={t2} />


                            <Text allowFontScaling={false} style={[styles.t1, { marginTop: 32 }]}>Content Preference</Text>
                            <Text allowFontScaling={false} style={styles.t2}>Choose the types of content you want to see most in your feed.</Text>
                            <Drop search={false} bb={1} pccolor={"#828282"} width={"98%"}  borderColor={"#ccc"}  items={contentPreferences} onValueChange={handleprefference} open={open3} setOpen={t3} up={true} />


                            <View style={styles.icons}>
                                <Pressable onPress={() => {
                                    navigation.goBack();
                                }}><FontAwesome6 name="chevron-left" size={25} color="#00DF60" /></Pressable>
                                <Pressable onPress={() => {
                                    nextpage()
                                }}><FontAwesome6 name="chevron-right" size={25} color="#00DF60" /></Pressable>


                                {/* <Pressable style={styles.btn} onPress={() => { finalsubmit() }}>
                                    <Text allowFontScaling={false} style={styles.nexttext}>Submit</Text>
                                </Pressable> */}
                            </View>


                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}


export default Signup6
const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;


const scalingfactor = Math.sqrt(a * b)
const styles = StyleSheet.create({
    t1: {
        textAlign: 'Left',
        marginLeft: 10,
        color: "#ccc",
        fontFamily: 'Alata',
        fontSize: 24,
        marginBottom: scalingfactor * 5,
        // marginTop : ,
    },
    t2: {
        textAlign: 'Left',
        color: "#828282",
        fontFamily: 'Roboto',
        fontSize: scalingfactor * 12,

        marginBottom: -2,
        width: "85%",
        alignSelf: "center",
        // lineHeight: scalingfactor * 16
    },
    bottom: {
        width: "100%",
        height: height * 0.85,
        backgroundColor: "rgba(33, 34, 35, 0.5)",
        
        borderTopLeftRadius: 70,
        padding: height * 0.03,
        paddingTop: height * 0.06,
        // justifyContent: "center",
        alignContent: "center",
        padding: scalingfactor * 20,
        paddingTop: scalingfactor * 40
    },
    icons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "92%",
        margin: "auto",
        // marginTop: scalingfactor * 30,
        position: "absolute",
        bottom: 40,
        alignSelf: "center",
    }
    ,
    btn: {
        width: 168,
        height: 48,
        // height : scalingfactor*48,
        backgroundColor: "#00DF60",
        // padding: scalingfactor * 12,
        // marginVertical: height * 0.018,
        borderRadius: 20,
        // margin: "auto",
        // marginTop: scalingfactor * 20,
        shadowColor: 'rgba(0,0,0, 0.5)', // Shadow color
        shadowOffset: {
            width: 0, // x offset
            height: 5, // y offset
        },
        shadowOpacity: 1, // Full opacity for shadow effect
        shadowRadius: 1, // Blur radius
        elevation: 5,
        justifyContent: 'center',

    }, nexttext: {
        color: "#24272A",
        fontFamily: "Alata",
        fontSize: scalingfactor * 22,
        textAlign: "center",
        // lineHeight : 16
        marginTop: -4

    },


})