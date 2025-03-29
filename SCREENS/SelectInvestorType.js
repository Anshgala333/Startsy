
// 2.5 second last  of startup founder
import React, { useState, useRef, useEffect, useContext, useCallback } from "react";
import {

    SafeAreaView,
    View,
    Text,
    TextInput,
    Image,
    Animated,
    Pressable,
    StyleSheet,
    Dimensions,
    ScrollView,
    StatusBar,
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import signup3styles from "../styles/signup3styles.js";
import Drop from "./dropdown.js";
import Line3 from "./line3.js"
import Line from "./line.js";
import { useFocusEffect } from "expo-router";



const SelectInvestor = ({ navigation, route }) => {
    const { form, image } = route.params;

  
    const nextPage = () => {

        if(selectedOption == "")return

        const final = new FormData();
        for (let item of form["_parts"]) {
            if (item[0] === "fullname" || item[0] === "password") continue;
            final.append(item[0], item[1]);
        }
       console.log(final);
       console.log(selectedOption);
    //    return
       

        navigation.navigate("Signup13", { form: final, image , selectedOption });
    };



    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181a")
        StatusBar.setBarStyle("light-content")
    })









    function nextpage(navigation, type) {

        const final = new FormData();
        for (var items of form["_parts"]) {
            if (items[0] == "fullname" || items[0] == "password") continue;
            final.append(items[0], items[1]);
        }
        final.append("previousExperience", sliderrange1)
        final.append("areaOfInterest", areaofinterest)
        final.append("startupStage", startupstage)
        final.append("preferredSector", sector)
        final.append("investmentRange", sliderrange)




        // if(image && image != "xyz"){
        //     final.append("profilePhoto", {
        //         uri : image,
        //         type : 'image/jpeg',
        //         name: `image_${Date.now()}.jpg`,


        //     })
        // }
        console.log(final);
        navigation.navigate("Signup13", { form: final, image })
    }
    function finalsubmit() {
        console.log("final submit");

    }


    const [selectedOption, setSelectedOption] = useState(null);
    const options = ["Angel Investor", "Venture Capitalist", "Institutional Investor" , "Family Offices" , "New Investor"];

   
    const RadioBox = ({ label, selected, onPress }) => {
        return (
            <TouchableOpacity
                onPress={onPress}
                style={{
                    width: "92%",
                    marginHorizontal: "auto",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 15,
                    borderWidth: 2,
                    borderColor: selected ? "#00de62" : "#ccc",
                    backgroundColor: selected ? "#00de62" : "transparent",
                    borderRadius: 10,
                    marginVertical: 10,
                }}
            >
                {/* Radio Button */}
                <View
                    style={{
                        width: 15,
                        height: 15,
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: selected ? "#16181a" : "#ccc",
                        alignItems: "center",
                        marginTop: 4,
                        justifyContent: "center",
                        backgroundColor: selected ? "#16181a" : "transparent",
                        marginRight: 10,
                    }}
                >
                    {selected && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#16181a" }} />}
                </View>

                {/* Label */}
                <Text style={{ color: selected ? "#000" : "#ccc", fontSize: 16, fontFamily: "Alata" }}>{label}</Text>
            </TouchableOpacity>
        );
    };




    return (

        < SafeAreaView style={[signup3styles.container, { position: "relative" , height : "100%" }]} >
            <ScrollView nestedScrollEnabled={true}
            >
                <View
                    style={[signup3styles.row, { position: "relative" }]}>
                    {/* <View style={[styles.modal]}></View> */}
                    {/* top */}
                    <View style={signup3styles.top}>
                        <View style={signup3styles.left}>
                            <Image style={signup3styles.logo} source={require("../assets/images/logo.png")} />
                        </View>
                        <View style={signup3styles.right}>
                            <Line progresswidth={"81%"} />
                        </View>
                    </View>



                    {/* bottom */}

                    <View style={[styles.bottom, {flexGrow : 1}]}>
                        <Text allowFontScaling={false} style={[styles.t1, { marginBottom: 15 }]}>Select Investor Type <Text style={{ fontSize: 15, color: "#94A3B8" }}>*</Text></Text>


                        {options.map((option, index) => (
                            <RadioBox key={index} label={option} selected={selectedOption === option} onPress={() => setSelectedOption(option)} />
                        ))}















                        <View style={styles.icons}>
                            <Pressable style={{ marginTop: 5 }} onPress={() => { navigation.goBack() }}><FontAwesome6 name="chevron-left" size={40} color="#00DF60" /></Pressable>
                            <Pressable onPress={() => { nextPage() }}><FontAwesome6 name="chevron-right" size={40} color="#00DF60" /></Pressable>

                        </View>

                    </View>
                </View>
            </ScrollView>
        </ SafeAreaView>
    )
}

export default SelectInvestor


const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;


const scalingfactor = Math.sqrt(a * b)
const styles = StyleSheet.create({
    t1: {
        textAlign: 'Left',
        marginLeft: 10,
        color: "#D9D9D9",
        fontFamily: 'Alata',
        fontSize: scalingfactor * 24,
        // backgroundColor : "red",
        width: "97%",
        marginBottom: scalingfactor * 3,
    },
    thumb: {
        width: 30,
        height: 30
    },
    t2: {
        textAlign: 'Left',
        color: "#94A3B8",
        fontFamily: 'Roboto',
        fontSize: scalingfactor * 13,

        marginBottom: scalingfactor * 8,
        width: "85%",
        alignSelf: "center",
        lineHeight: scalingfactor * 16
    },
    bottom: {
        width: "100%",
        height: height*0.85,
        backgroundColor: "#24272A",
        // backgroundColor: "red",
        borderTopLeftRadius: 70,
        padding: height * 0.03,
        paddingTop: height * 0.06,
        // justifyContent: "center",
        alignContent: "center",
        padding: scalingfactor * 20,
        paddingTop: scalingfactor * 40,
        backgroundColor: "rgba(33, 34, 35, 0.5)",

        // overflow : "hidden",

    },

    input: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        marginTop: 0,
        borderWidth: 3,
        borderRadius: 20,
        borderColor: "#16181A",
        fontSize: scalingfactor * 20,
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 5,
        width: "92%",
        fontFamily: "Roboto",
        lineHeight: scalingfactor * 18,
        marginBottom: scalingfactor * 25,
        height: 190,
        marginTop: 10,
        padding: 10,
        textAlignVertical: "top",
        paddingBottom: 30,

    }
    , icons: {
        display: "flex",
        position : "absolute",
        bottom: 0,
        left : 0,
        paddingHorizontal : 30,

        flexDirection: "row",
        justifyContent: "space-between",
        width: width,
        // backgroundColor : "red",
        marginHorizontal: "auto",
        marginTop: 30,
        marginBottom: 30
    },

    btn: {
        width: "92%",
        height: 48,
        margin: "auto",
        backgroundColor: "transparent",
        borderRadius: 20,
        borderWidth: 3,
        borderColor: "#16181A",
        borderRadius: 10,
        marginBottom: 10,
        justifyContent: 'center',

    },
    btn1: {
        width: 173,
        height: 48,
        margin: "auto",
        backgroundColor: "transparent",
        borderRadius: 20,
        borderWidth: 3,
        borderColor: "#16181A",
        borderRadius: 20,
        marginBottom: 0,
        marginTop: 10,
        justifyContent: 'center',
    },
    nexttext: {
        color: "#00DE62",
        fontFamily: "Alata",
        fontSize: scalingfactor * 22,
        textAlign: "center",
        marginTop: -4

    },

    count: {
        fontSize: 14,
        position: "absolute",
        bottom: 25,
        right: 25,
        // backgroundColor: "red",
        width: "auto"
    },
    modal: {
        width: width,
        height: height,
        backgroundColor: "yellow",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,

    }
    , input1: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        marginTop: 0,
        borderBottomWidth: 3,
        // borderRadius : 20,
        paddingLeft: scalingfactor * 10,
        borderBottomColor: "#16181A",
        fontSize: scalingfactor * 20, // Responsive font size
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 5,
        width: "92%",
        fontFamily: "Roboto",
        lineHeight: scalingfactor * 18,
        marginBottom: scalingfactor * 25
    },
    des: {
        width: "92%",
        paddingLeft: scalingfactor * 10,
        fontFamily: "Roboto",
        textAlign: "left",
        fontSize: scalingfactor * 20,
        color: "#B8B8B8",
        alignSelf: "center",
    }, box: {
        // position: "absolute",
        width: 14,
        height: 14,
        borderRadius: 3,
        backgroundColor: "#00DE62",
        // top: -3,
        top: 22,
        elevation: 10
    },
    box1: {
        width: 14,
        elevation: 10,
        height: 14,
        borderRadius: 3,
        backgroundColor: "#00DE62",
        // top: -3,
        top: 8,
        backfaceVisibility: "hidden",

        left: "98%",
        marginLeft: -scalingfactor * 20
    }
    , sliderbox: {
        width: "90%",
        marginTop: -1,
        height: 5,
        margin: "auto",
        // borderWidth: 2,
        borderColor: "#00DE62",
        borderColor: "#00DE62",
        zIndex: 101,
        backgroundColor: "#00DE62",
        borderRadius: 20,
        pointerEvents: "auto",
        // elevation : 10
    }

})