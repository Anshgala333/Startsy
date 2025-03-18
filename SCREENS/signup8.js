
// 3.5 last of free lancer
import React, { useState, useRef, useEffect, useContext } from "react";
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
    Keyboard,
    KeyboardAvoidingView
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {url} from "../config.js"
import { useFocusEffect } from "expo-router";

import signup3styles from "../styles/signup3styles.js";
import Drop from "./dropdown.js";
import Line3 from "./line3.js"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { GlobalContext } from "@/Global/globalcontext.js";


const Signup8 = ({ navigation, route }) => {

    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181a")
        StatusBar.setBarStyle("light-content")
    })
    const [token, settoken] = useState("")
    const { globaldata, updateField } = useContext(GlobalContext);

    useEffect(() => {
        console.log(globaldata, "global data");
        settoken(globaldata.token)
    }, [])

    const [service, setservice] = useState("")
    const [Availability, setAvailability] = useState("")
    const [pricing, setpricing] = useState("")



    const { form, image } = route.params

    console.log('====================================');
    console.log(form);
    console.log('====================================');



    const type = "Freelancer"
    async function finalsubmit() {

        const final = new FormData();
        for (var items of form["_parts"]) {
            if (items[0] == "fullname" || items[0] == "password") continue;
            final.append(items[0], items[1]);
        }

        console.log("final submit");
        final.append("services", service)
        final.append("currentAvailability", Availability)
        final.append("pricing", pricing)


        if (image && image != "xyz") {
            final.append("profilePhoto", {
                uri: image,
                type: "image/jpeg",
                name: `image_${Date.now()}.jpg`,

            })
        }

        console.log(final);


        try {
            const response = await fetch(`${url}/freelancerInfo`, {
                method: 'POST',
                body: final,
                headers: {
                    accept: 'application/json',
                    "Authorization": token
                }
            });

            const data = await response.json();
            console.log(data);
            navigation.navigate("Main2")
        }
        catch (err) {
            console.log(err);
        }




    }

    const [open, setOpen] = useState(false);
    const handleOutsideTouch = () => {
        if (open) {
            setOpen(false);
        }
    };

    const [textlength, settextlength] = useState(0);
    var available = [
        { label: "Full-Time", value: "Full-Time" },
        { label: "Part-Time", value: "Part-Time" },
        { label: "Project-Based", value: "Project-Based" },

    ]

    function counttext(text) {

        settextlength(text.length)

    }
    return (


        < SafeAreaView style={[signup3styles.container, { position: "relative" }]} >
            <ScrollView nestedScrollEnabled={true}>
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
                                <Line3 progresswidth={"105%"} />
                            </View>
                        </View>



                        {/* bottom */}

                        <View style={styles.bottom}>
                            <Text style={styles.t1}>Services</Text>
                            <Text style={styles.t2}>Provide a concise overview of the service, including specific skills, techniques, or tools used. Highlights the unique benefits and value the service offers. This section aims to attract potential clients by clearly outlining how the service meets their needs.</Text>

                            <View style={{ position: "relative" }}>
                                <Text style={[styles.t2, styles.count]}>{textlength}/1000</Text>
                                <TextInput
                                    allowFontScaling={false}
                                    placeholder=""
                                    placeholderTextColor="#B8B8B8"
                                    style={styles.input}
                                    maxLength={1000}
                                    multiline={true}
                                    onFocus={handleOutsideTouch}
                                    onPress={handleOutsideTouch}
                                    // value={username}
                                    onChangeText={(text) => {
                                        setservice(text)
                                        counttext(text)
                                    }}
                                />
                            </View>
                            {/* </KeyboardAvoidingView> */}

                            <Text style={[styles.t1, { marginBottom: 15 }]}>Current Availability</Text>
                            <View style={{ zIndex: 1000 }}>
                                <Drop items={available} onValueChange={(value) => { setAvailability(value) }} setOpen={setOpen} open={open} nestedScrollEnabled={true} />
                            </View>




                            <Text style={[styles.t1, { marginTop: 15, marginBottom: 12 }]}>Pricing</Text>
                            <Pressable onPress={() => {
                                setpricing("Maximum")
                                handleOutsideTouch()
                            }}
                                style={styles.btn}><Text style={styles.nexttext}>Minimum</Text></Pressable>
                            <Pressable onPress={() => {
                                setpricing("Minimum")
                                handleOutsideTouch()
                            }} style={styles.btn}><Text style={styles.nexttext}>Maximum</Text></Pressable>

                            <View style={styles.icons}>
                                <Pressable style={{ marginTop: 5 }} onPress={() => { navigation.goBack() }}><FontAwesome6 name="chevron-left" size={40} color="#00DF60" /></Pressable>
                                <Pressable style={[styles.submit,]} onPress={() => { handleOutsideTouch(), finalsubmit() }}>
                                    <Text allowFontScaling={false} style={styles.submittext}>Submit</Text>
                                </Pressable>
                            </View>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </ SafeAreaView>

    )
}

export default Signup8


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
        fontSize: scalingfactor * 27,
        marginBottom: scalingfactor * 3,
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
        marginBottom: 15,

        // elevation: 5,
        justifyContent: 'center',

    }, nexttext: {
        color: "#00DE62",
        fontFamily: "Alata",
        fontSize: scalingfactor * 22,
        textAlign: "center",
        marginTop: -4

    },
    submittext: {
        color: "black",
        fontFamily: "Alata",
        fontSize: scalingfactor * 22,
        textAlign: "center",
        marginTop: -4
    },
    submit: {
        backgroundColor: "#00DF60",
        width: 168,
        height: 48,
        borderRadius: 15,
        // elevation: 5,
        justifyContent: 'center',

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



})