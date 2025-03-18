
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
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
// import Slider from '@react-native-community/slider';
import Slider from "@react-native-community/slider";

import signup3styles from "../styles/signup3styles.js";
import Drop from "./dropdown.js";
import Line3 from "./line3.js"
import Line from "./line.js";
import { useFocusEffect } from "expo-router";
import { GlobalContext } from "@/Global/globalcontext.js";



const Signup12 = ({ navigation, route }) => {
    const { form, image } = route.params;

    console.log('====================================');
    console.log(form);
    console.log('====================================');



    const validateInputs = () => {
        const newErrors = {};
        if (!sliderrange1) newErrors.years = "Please select the years of experience.";
        // if (!areaofinterest) newErrors.areaOfInterest = "Please select an area of interest.";
        if (!startupstage) newErrors.startupStage = "Please select a startup stage.";
        if (!sector) newErrors.sector = "Please select a preferred sector.";
        if (!sliderrange) newErrors.capacity = "Please enter your investment capacity.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const nextPage = () => {
        if (!validateInputs()) return;

        const final = new FormData();
        for (let item of form["_parts"]) {
            if (item[0] === "fullname" || item[0] === "password") continue;
            final.append(item[0], item[1]);
        }
        final.append("previousExperience", sliderrange1);
        final.append("areaOfInterest", areaofinterest);
        final.append("startupStage", startupstage);
        final.append("preferredSector", sector);
        final.append("investmentRange", sliderrange);

        navigation.navigate("Signup13", { form: final, image });
    };



    const [errors, setErrors] = useState({});
    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181a")
        StatusBar.setBarStyle("light-content")
    })
    const { type } = route.params || "Investor"

    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);


    const [sliderrange, setsliderrange] = useState(0)
    const [sliderrange1, setsliderrange1] = useState(0)

    const [areaofinterest, setareafofinterest] = useState("")
    const [startupstage, setsetstartupstage] = useState("")
    const [investmentvalue, setinvestmentvalue] = useState(0)
    const [sector, setsector] = useState(0)






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



    const handleOutsideTouch = () => {
        if (open1) { setOpen1(false) }
        if (open2) { setOpen2(false) }
        if (open3) { setOpen3(false) }
    };
    function setAvailability() {
        console.log("education");

    }
    var areaofinterestlist = [
        { label: "Technology", value: "Technology" },
        { label: "Healthcare", value: "Healthcare" },
        { label: "Finance", value: "Finance" },
        { label: "Consumer Goods", value: "Consumer Goods" },
        { label: "Education", value: "Education" },
        { label: "Energy", value: "Energy" },
        { label: "Real Estate", value: "Real Estate" },
        { label: "Logistics", value: "Logistics" },

    ]
    var stage = [

        { label: "Ideation Stage", value: "Ideation Stage" },
        { label: "Pre-Seed Stage", value: "Pre-Seed Stage" },
        { label: "Seed Stage", value: "Seed Stage" },
        { label: "Early Stage (Series A)", value: "Early Stage (Series A)" },
        { label: "(Series B and Beyond)", value: "Growth Stage (Series B and Beyond)" },
        { label: "Expansion/Late Stage", value: "Expansion/Late Stage" }



    ]

    var sectorlist = [
        { label: "AI", value: "AI" },
        { label: "AR/VR", value: "AR/VR" },
        { label: "Blockchain", value: "Blockchain" },
        { label: "Social Media", value: "Social Media" },
        { label: "Marketing", value: "Marketing" },
        { label: "Social Media Marketing", value: "Social Media Marketing" },
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
    ]





    function counttext(text) {
        settextlength(text.length)
    }


    const sliderRef = useRef(null);

    const h1 = (value) => {
        if (sliderRef.current) {
            clearTimeout(sliderRef.current);
        }
        sliderRef.current = setTimeout(() => {
            setsliderrange(value);
        }, 100);
    };
    const h2= (value) => {
        if (sliderRef.current) {
            clearTimeout(sliderRef.current);
        }
        sliderRef.current = setTimeout(() => {
            setsliderrange1(value);
        }, 100);
    };

    const sliderImage = require("../assets/images/slider.png");
    return (

        < SafeAreaView style={[signup3styles.container, { position: "relative" }]} >
            <ScrollView nestedScrollEnabled={true}
            >
                <TouchableWithoutFeedback onPress={handleOutsideTouch}>
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

                        <View style={styles.bottom}>
                            <Text allowFontScaling={false} style={[styles.t1, { marginBottom: 15 }]}>Investing experience <Text style={{fontSize:15 ,color: "#94A3B8"}}>*</Text></Text>
                            <Pressable onPress={() => { handleOutsideTouch() }} style={styles.btn1}>
                                <Text allowFontScaling={false} style={styles.nexttext}>{sliderrange1.toLocaleString("en-IN")} {sliderrange1 > 1 ? "years" : "year"}</Text>
                            </Pressable>
                            <View style={[styles.box, { left: 10 }]}></View>
                            <View style={[styles.box1, { right: 10 }]}></View>

                            <Slider
                                // style={styles.sliderbox}
                                style={{ marginTop: -7 }}
                                minimumValue={0}
                                maximumValue={50}
                                value={sliderrange1}
                                step={1}
                                minimumTrackTintColor="#00DE62"
                                maximumTrackTintColor="#00DE62"
                                thumbTintColor="#737373"
                                // step={100}
                                // thumbTintColor="#737373" // Color of the slider thumb
                                // trackImage={require("../assets/images/slider.png")}
                                // trackImage={require("../assets/images/slider3.png")}
                                // thumbImage={require("../assets/images/slider3.png")}
                                // onValueChange={(value) => { setsliderrange1(value) }}
                                onValueChange={h2}
                            // hitSlop={{ top: 50, left: 50, right: 50, bottom: 50 }}
                            // thumbTouchSize={{ width: 100, height: 100 }}
                            />
                            {errors.years && <Text style={signup3styles.errorText}>{errors.years}</Text>}


                            {/* <Text allowFontScaling={false} style={[styles.t1, { marginTop: 25, marginBottom: 10 }]}>Area of interest </Text>
                            <Text allowFontScaling={false} style={[styles.t2, { marginBottom: 15 }]}>In this section, specify the fields and industries that capture your investment interest. </Text>
                            <Drop items={areaofinterestlist} onValueChange={(value) => { setareafofinterest(value) }} setOpen={setOpen1} open={open1} nestedScrollEnabled={true} />
                            {errors.areaOfInterest && (
                                <Text style={signup3styles.errorText}>{errors.areaOfInterest}</Text>
                            )} */}


                            <Text allowFontScaling={false} style={[styles.t1, { marginBottom: 10, marginTop: 25 }]}>Preferred startup stage <Text style={{fontSize:15 ,color: "#94A3B8"}}>*</Text></Text>
                            <Text allowFontScaling={false} style={[styles.t2, { marginBottom: 15 }]}>Indicate the stages of development at which you prefer to invest.</Text>
                            <Drop borderwidth={3} borderColor={"#16181a"} items={stage} onValueChange={(value) => { setsetstartupstage(value) }} setOpen={setOpen2} open={open2} nestedScrollEnabled={true} />
                            {errors.startupStage && (
                                <Text style={signup3styles.errorText}>{errors.startupStage}</Text>
                            )}

                            <Text allowFontScaling={false} style={[styles.t1, { marginBottom: 10, marginTop: 25 }]}>Preferred startup sector <Text style={{fontSize:15 ,color: "#94A3B8"}}>*</Text></Text>
                            <Text allowFontScaling={false} style={[styles.t2, { marginBottom: 15 }]}>This distinction helps founders understand the scope and nature of your investment interests, ensuring that you receive opportunities that align with your strategic preferences and expertise.
                            </Text>
                            <Drop borderwidth={3} borderColor={"#16181a"} items={sectorlist} onValueChange={(value) => { setsector(value) }} setOpen={setOpen3} open={open3} nestedScrollEnabled={true} />
                            {errors.sector && (
                                <Text style={signup3styles.errorText}>{errors.sector}</Text>
                            )}


                            <Text allowFontScaling={false} style={[styles.t1, { marginTop: 20, marginBottom: 25 }]}>Investment capacity <Text style={{fontSize:15 ,color: "#94A3B8"}}>*</Text></Text>


                            <Pressable onPress={() => { handleOutsideTouch() }} style={styles.btn}>
                                <Text allowFontScaling={false} style={styles.nexttext}>{sliderrange.toLocaleString("en-IN")}</Text>

                            </Pressable>

                            {/* slider */}
                            <View style={[styles.box, { left: 10 }]}></View>
                            <View style={[styles.box1, { right: 10 }]}></View>
                            <Slider
                                // style={styles.sliderbox}
                                style={{ marginTop: -7 }}
                                minimumValue={0}
                                maximumValue={10000000}
                                value={sliderrange}
                                step={1000}
                                minimumTrackTintColor="#00DE62"
                                maximumTrackTintColor="#00DE62"
                                // step={100}
                                // thumbTintColor="#737373" // Color of the slider thumb
                                // trackImage={require("../assets/images/slider.png")}
                                // trackImage={require("../assets/images/slider3.png")}
                                thumbTintColor="#737373"

                                // thumbImage={require("../assets/images/slider3.png")}
                                // onValueChange={(value) => { setsliderrange(value) }}
                                onValueChange={h1}
                            // hitSlop={{ top: 50, left: 50, right: 50, bottom: 50 }}
                            // thumbTouchSize={{ width: 100, height: 100 }}
                            />
                            {errors.capacity && (
                                <Text style={signup3styles.errorText}>{errors.capacity}</Text>
                            )}





                            <View style={styles.icons}>
                                <Pressable style={{ marginTop: 5 }} onPress={() => { navigation.goBack() }}><FontAwesome6 name="chevron-left" size={40} color="#00DF60" /></Pressable>
                                <Pressable onPress={() => { nextPage() }}><FontAwesome6 name="chevron-right" size={40} color="#00DF60" /></Pressable>

                            </View>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </ SafeAreaView>
    )
}

export default Signup12


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
        // height: height*0.85,
        backgroundColor: "#24272A",
        // backgroundColor: "red",
        borderTopLeftRadius: 70,
        padding: height * 0.03,
        paddingTop: height * 0.06,
        // justifyContent: "center",
        alignContent: "center",
        padding: scalingfactor * 20,
        paddingTop: scalingfactor * 40,
        backgroundColor : "rgba(33, 34, 35, 0.5)",

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
        flexDirection: "row",
        justifyContent: "space-between",
        width: "92%",
        margin: "auto",
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