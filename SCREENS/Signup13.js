
// 4.4 last of community
import React, { useState, useRef, useEffect, useContext } from "react";
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
    TouchableWithoutFeedback,
    ActivityIndicator

} from "react-native";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { LinearGradient } from "expo-linear-gradient";
import signup3styles from "../styles/signup3styles.js";
import Drop from "./dropdown.js";
import Line from "./line.js";
import * as DocumentPicker from 'expo-document-picker';
import { useFocusEffect } from "expo-router";
import { GlobalContext } from "@/Global/globalcontext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../config.js"

const Signup13 = ({ navigation, route }) => {
    const { form, image , selectedOption } = route.params;
    console.log(selectedOption);
    
    // const form = ""

    // const [final, setFormData] = useState(new FormData());
    // useFocusEffect(
    //     React.useCallback(() => {
    //         // Reset FormData to avoid duplication
    //         setFormData(new FormData());
    //     }, [])
    // );


    const [token, settoken] = useState("")
    const [loading, setloading] = useState("")
    const [role1, setrole] = useState("")
    const { globaldata, updateField } = useContext(GlobalContext);
    useEffect(() => {
        setrole(selectedOption)
    }, [selectedOption])

    const [open1, setOpen1] = useState(false);

    useEffect(() => {
        console.log(globaldata, "global data");
        settoken(globaldata.token)
    }, [])

    const t1 = () => {
        setOpen1(!open1);

    }
    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181a")
        StatusBar.setBarStyle("light-content")
    })
    const handlerole = (value1) => {
        // console.log("Selected Value:", value1); // Optional: Log the selected value
        setrole(value1); // Update state with the selected value
    };

    var role = [
        { label: "Angel Investor", value: "Angel Investor" },
        { label: "Venture Capitalist", value: "Venture Capitalist" },
        { label: "Institutional Investor", value: "Institutional Investor" },
        { label: "Family Offices", value: "Family Offices" },
        { label: "New Investor", value: "New Investor" },
    ]

    const [linkedinurl, setlinkedinurl] = useState("")
    const [websiteurl, setwebsiteurl] = useState("")
    const [domainemail, setdomainemail] = useState("")
    const [panCard, setpanCard] = useState("")
    const [file, setFile] = useState(null);

    const [errors, setErrors] = useState({
        linkedinUrlError: "",
        websiteUrlError: "",
        domainEmailError: "",
        panCardError: "",
        fileError: "",
    });


    const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/;
    const websiteRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/.*)?$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const panCardRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;


    const validateInputs = () => {
        let isValid = true;
        const newErrors = {};

        if (role1 == "") {
            newErrors.roleError = "* Please select a valid type";
            isValid = false;
            return
        }



        // Validate LinkedIn URL
        if ((!linkedinurl || !linkedinRegex.test(linkedinurl))) {
            newErrors.linkedinUrlError = "* Please enter a valid LinkedIn URL.";
            isValid = false;
        }

        // Validate Website URL
        if ((!websiteurl && !websiteRegex.test(websiteurl)) && (role1 == "Angel Investor" || role1 == "Institutional Investor")) {
            newErrors.websiteUrlError = "* Please enter a valid Website URL.";
            isValid = false;
        }

        // Validate Domain Email
        if ((!domainemail || !emailRegex.test(domainemail)) && (role1 == "Venture Capitalist")) {
            newErrors.domainEmailError = "* Please enter a valid email address.";
            isValid = false;
        }

        // Validate PAN Card
        // if (!panCard || !panCardRegex.test(panCard)) {
        //     newErrors.panCardError = "* Please enter a valid PAN number.";
        //     isValid = false;
        // }

        // Validate File Upload
        // if ((!file) && (role1 == "Family Offices" || role1 == "New Investor")) {
        //     newErrors.fileError = "* Please upload a valid document.";
        //     isValid = false;
        // }

        setErrors(newErrors);
        return isValid;
    };


    const finalSubmit = async () => {
        if (!validateInputs()) {
            return;
        }

        // Handle form submission
        // Make API call with the form data (including file and other inputs)

        // navigation.navigate("Main2");
        navigation.navigate("InvestorWaitingPage");
        // navigation.navigate("Wait");
    };







    async function finalsubmit() {

        if (!validateInputs()) {
            return;
        }


        const final = new FormData();
        for (var items of form["_parts"]) {

            if (items[0] == "fullname" || items[0] == "password") continue;
            final.append(items[0], items[1]);
        }


        final.append("linkedInUrl", linkedinurl)
        final.append("websiteUrl", websiteurl)
        final.append("domainEmail", domainemail)
        final.append("panCard", panCard)
        final.append("investorType", role1)

        if (file) {
            final.append("panCardPhoto", {
                uri: file,
                type: "image/jpeg",
                name: `image_${Date.now()}.jpg`,

            })
        }

        if (image && image != "xyz") {
            final.append("profilePhoto", {
                uri: image,
                type: "image/jpeg",
                name: `image_${Date.now()}.jpg`,

            })
        }
        console.log("will make final submit");





        setloading(true)
        const response = await fetch(`${url}api/investorInfo`, {
            method: 'POST',
            body: final,

            headers: {
                accept: 'application/json',
                "Authorization": token
            }
        });


        const data = await response.json();
        console.log(data, "investor");

        if (response.status == 200) {

            try {
                await AsyncStorage.setItem('accessToken', data.newToken);
                updateField("token", data.newToken);
                console.log('Data saved successfully!');
                navigation.reset({
                    index: 0,
                    routes: [{ name: "InvestorWaitingPage" }],
                });
                // navigation.navigate("Main2")
            } catch (error) {
                console.error('Error saving data:', error);
            }
        }

        setloading(false)



    }

    const openFilePicker = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*', // Allow all file types (you can restrict this if needed)
            });
            console.log(result.canceled);


            if (!result.canceled) {
                console.log("success in uploading pancrad ");
                setFile(result.assets[0].uri);
            } else {
                console.log('ok');

                // Alert.alert('Cancelled', 'No file selected.');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred while picking the file.');
        }
    };
    <StatusBar backgroundColor="#16181a" barStyle={"light-content"} />

    return (
        < SafeAreaView style={[signup3styles.container, { position: "relative" }]} >
            <ScrollView nestedScrollEnabled={true}
            >
                <TouchableWithoutFeedback>
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


                            <Text allowFontScaling={false} style={styles.t1}>Authenticity Verification </Text>
                            {/* <Drop borderwidth={3} borderColor={"#16181a"} items={role} onValueChange={handlerole} open={open1} setOpen={t1} /> */}
                            {/* {errors.roleError && <Text style={styles.errorText}>please select a valid type</Text>} */}
                            <TextInput
                                allowFontScaling={false}
                                placeholder="LinkedIN URL*"
                                placeholderTextColor="#B8B8B8"
                                style={[styles.input, { marginTop: 20, paddingRight: 10 }]}
                                value={linkedinurl}
                                onChangeText={(text) => { setlinkedinurl(text) }}
                            />
                            {errors.linkedinUrlError && (<Text style={styles.errorText}>{errors.linkedinUrlError}</Text>)}
                            {(role1 == "Angel Investor" || role1 == "Institutional Investor") && <TextInput
                                allowFontScaling={false}
                                placeholder="Website URL / Angel list url"
                                placeholderTextColor="#B8B8B8"
                                style={styles.input}
                                value={websiteurl}
                                onChangeText={(text) => { setwebsiteurl(text) }}
                            />}

                            {errors.websiteUrlError &&
                                <Text style={styles.errorText}>{errors.websiteUrlError}</Text>}

                            {role1 == "Venture Capitalist" && <TextInput
                                allowFontScaling={false}
                                placeholder="Official Domain Email"
                                placeholderTextColor="#B8B8B8"
                                style={styles.input}
                                value={domainemail}
                                onChangeText={(text) => { setdomainemail(text) }}
                            />}
                            {errors.domainEmailError && <Text style={styles.errorText}>{errors.domainEmailError}</Text>}

                            <TextInput
                                allowFontScaling={false}
                                placeholder="Pan Number"
                                placeholderTextColor="#B8B8B8"
                                style={styles.input}
                                value={panCard}
                                onChangeText={(text) => { setpanCard(text) }}
                            />

                            {errors.panCardError && <Text style={styles.errorText}>{errors.panCardError}</Text>}

                            {/* <Text allowFontScaling={false} style={styles.t11}>Verification document upload</Text>
                            <Pressable style={styles.upload} onPress={openFilePicker}>
                                <Text allowFontScaling={false} style={styles.nexttext}>Upload</Text>
                            </Pressable>
                            {errors.fileError && <Text style={styles.errorText1}>{errors.fileError}</Text>} */}


                            <View style={styles.icons}>
                                <Pressable onPress={() => {

                                    navigation.goBack();
                                }}><FontAwesome6 name="chevron-left" size={45} color="#00DF60" /></Pressable>
                                <Pressable style={styles.btn} onPress={() => { finalsubmit() }}>

                                    {loading && <ActivityIndicator size={24} color="#16181a" />}
                                    {!loading && <Text allowFontScaling={false} style={styles.nexttext}>Submit</Text>
                                    }
                                </Pressable>
                            </View>



                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </ SafeAreaView>
    )
}


export default Signup13
const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;


const scalingfactor = Math.sqrt(a * b)
const styles = StyleSheet.create({
    t1: {
        textAlign: 'center',
        marginLeft: 10,
        color: "#D9D9D9",
        fontFamily: 'Alata',
        fontSize: scalingfactor * 27,
        marginBottom: scalingfactor * 20,


    },
    t11: {
        textAlign: 'center',
        // marginLeft: 10,
        color: "#D9D9D9",
        fontFamily: 'Alata',
        fontSize: scalingfactor * 22,
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
        height: height * 0.85,
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

    },
    icons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "92%",
        position : "absolute",
        marginHorizontal: "auto",
        // marginTop: scalingfactor * 30,
        // position: "absolute",
        bottom: 50,
        alignSelf: "center",
        marginTop: 100
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

    }
    , upload: {

        width: 229,
        height: 48,
        backgroundColor: "#00DF60",
        borderRadius: 20,
        shadowColor: 'rgba(0,0,0, 0.5)', // Shadow color
        shadowOffset: {
            width: 0, // x offset
            height: 5, // y offset
        },
        shadowOpacity: 1, // Full opacity for shadow effect
        shadowRadius: 1, // Blur radius
        elevation: 5,
        justifyContent: 'center',
        marginHorizontal: "auto",
        marginTop: 20
    },
    input: {
        marginHorizontal: "auto",
        // padding : 10,
        borderRadius: 20,
        height: 47,
        width: "92%",
        borderWidth: 3,
        borderColor: "#16181A",
        marginTop: 10,
        paddingLeft: 20,
        color: "#B8B8B8",
        // fontFamily: "Alata",
        fontSize: scalingfactor * 16,
        marginBottom: scalingfactor * 16
    },

    errorText: {
        marginVertical: 5,
        marginTop: -6,
        textAlign: "left",
        // backgroundColor : "red",
        width: "85%",
        marginHorizontal: "auto",
        color: "#E65858",
        fontSize: 12,
        fontFamily: "Roboto",
    },
    errorText1: {
        marginVertical: 5,
        marginTop: 4,
        textAlign: "center",
        // backgroundColor : "red",
        width: "85%",
        marginHorizontal: "auto",
        color: "#E65858",
        fontSize: 12,
        fontFamily: "Roboto",
    }



})