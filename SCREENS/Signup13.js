


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
    ToastAndroid,
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
import { OtpInput } from "react-native-otp-entry";

const Signup13 = ({ navigation, route }) => {
    const { form, image, selectedOption } = route.params;
    console.log(selectedOption);
    // .........................................................................................
    const [verifyOtpVisible, setVerifyOtpVisible] = useState(false); // To control OTP input visibility
    const [isOtpLoading, setIsOtpLoading] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false); // To show/hide loading indicator for OTP verification
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [sendotpStatus, setSendOtpStatus] = useState(false);
    // .........................................................................................................
    const [token, settoken] = useState("")
    const [loading, setloading] = useState("")
    const [role1, setrole] = useState("")
    const [VerificationText, setVerificationText] = useState("Verify OTP")
    const { globaldata, updateField } = useContext(GlobalContext);
    useEffect(() => {
        setrole(selectedOption)
    }, [selectedOption])

    const [open1, setOpen1] = useState(false);

    useEffect(() => {
        // console.log(globaldata, "global data");
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

    const handleSendOtp = async () => {

        if ((!domainemail || !emailRegex.test(domainemail))) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                domainEmailError: "* Enter a valid email",  // Error message for invalid email
            }));
            return; // Exit if email is invalid
        } else {
            // Reset the email error message if valid
            setErrors((prevErrors) => ({
                ...prevErrors,
                domainEmailError: "",
            }));
        }
        setSendOtpStatus(true)

        console.log('email is valid')

        // If email is valid, proceed with sending OTP
        setIsOtpLoading(true);

        try {
            // Call your API to send OTP here
            const response = await fetch(`${url}api/sendOtp`, {
                method: 'POST',
                body: JSON.stringify({ email: domainemail }),
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await response.json();
            console.log(data);

            // Handle any further success logic here
            setVerifyOtpVisible(true);
            setOtpSent(true);  // OTP has been sent
            setIsOtpVerified(false);  // Reset OTP verification status
        } catch (error) {
            console.error("Error sending OTP:", error);
        } finally {
            setIsOtpLoading(false);
            setSendOtpStatus(false)
        }
    };

    // .............................................................................................................................

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
        navigation.navigate("Main2");
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

    const showToastWithGravity = (message) => {
        ToastAndroid.showWithGravityAndOffset(
          `${message}`,
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          100, 100
        );
      };

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
    // .......................................................................
    async function check(params) {
        // setotploading(true)
        setIsOtpLoading(true);
        try {
            const response = await fetch(`${url}api/verifyOtp`, {
                method: 'POST',
                body: JSON.stringify({ email: domainemail, otp: otp }),
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data);

            // setloading(false)
            // console.log(data);
            // console.log(response.status);
            if (response.status === 400) {
                // setmessage("* OTP is incorrect")
                showToastWithGravity("OTP is invalid")
                setIsOtpVerified(false);

            }
            else if (response.status === 200) {
                setIsOtpVerified(true);
                setVerificationText("Verified")
                // console.log("success");
                // seterror(false);

                // navigation.navigate("Signup5", { type, id, useremail  , email })

            }
        }
        catch (err) {
            // setloading(false)
            console.log(err);

        }
        finally {
            // setotploading(false)
            setIsOtpLoading(false);
        }
    }
    // ...................................................................................

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
                        {/* ............................................................... */}
                        <View style={styles.bottom}>
                            <Text allowFontScaling={false} style={styles.t1}>Authenticity Verification </Text>

                            <TextInput
                                allowFontScaling={false}
                                placeholder="LinkedIN URL*"
                                placeholderTextColor="#828282"
                                style={[styles.input, { marginTop: 20, paddingRight: 10 }]}
                                value={linkedinurl}
                                onChangeText={(text) => { setlinkedinurl(text) }}
                            />
                            {errors.linkedinUrlError && (<Text style={styles.errorText}>{errors.linkedinUrlError}</Text>)}

                            {(role1 == "Angel Investor" || role1 == "Institutional Investor") && <TextInput
                                allowFontScaling={false}
                                placeholder="Website URL / Angel list url"
                                placeholderTextColor="#828282"
                                style={styles.input}
                                value={websiteurl}
                                onChangeText={(text) => { setwebsiteurl(text) }}
                            />}

                            {errors.websiteUrlError &&
                                <Text style={styles.errorText}>{errors.websiteUrlError}</Text>}

                            {role1 == "Venture Capitalist" && (
                                <>
                                    <TextInput
                                        allowFontScaling={false}
                                        placeholder="Official Domain Email *"
                                        placeholderTextColor="#828282"
                                        style={styles.input}
                                        value={domainemail}
                                        onChangeText={(text) => { setdomainemail(text) }}
                                    />
                                    {errors.domainEmailError && <Text style={styles.errorText}>{errors.domainEmailError}</Text>}

                                    {/* Verify OTP Button (Only for Venture Capitalist) */}
                                    {!otpSent && domainemail && !isOtpVerified && (
                                        // <Pressable
                                        //     style={styles.verifyOtpButton} onPress={handleSendOtp}
                                        // >
                                        //     <Text style={styles.verifyOtpText}>Send OTP</Text>
                                        // </Pressable>

                                        <Pressable style={styles.verifyOtpButton1 } onPress={handleSendOtp} >
                                        {sendotpStatus ? (
                                            <ActivityIndicator size={24} color="#16181a" />
                                        ) : (
                                            <Text style={styles.verifyOtpText}>Send OTP</Text>
                                        )}
                                    </Pressable>
                                        
                                    )}
                                </>
                            )}

                            {/* OTP Input Fields */}
                            {verifyOtpVisible && otpSent && role1 === "Venture Capitalist" && (
                                <View style={styles.otpContainer}>
                                    <OtpInput
                                        numberOfDigits={4}
                                        focusColor="#00de62"
                                        autoFocus={false}
                                        hideStick={true}
                                        placeholder="****"
                                        blurOnFilled={true}
                                        disabled={false}
                                        type="numeric"
                                        secureTextEntry={false}
                                        focusStickBlinkingDuration={500}
                                        onFocus={() => console.log("Focused")}
                                        onBlur={() => console.log("Blurred")}
                                        onTextChange={(text) => setOtp(text)}
                                        onFilled={(text) => console.log(`OTP is ${text}`)}
                                        textInputProps={{
                                            accessibilityLabel: "One-Time Password",
                                        }}
                                        theme={{
                                            containerStyle: { width: "80%", marginHorizontal: "auto" },
                                            pinCodeContainerStyle: styles.pinCodeContainer,
                                            pinCodeTextStyle: { color: "#bbbbbb" },
                                            focusStickStyle: styles.focusStick,
                                            focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                                            placeholderTextStyle: { color: "#bbbbbb" },
                                            filledPinCodeContainerStyle: styles.filledPinCodeContainer,
                                            disabledPinCodeContainerStyle: styles.disabledPinCodeContainer,
                                        }}
                                    />

                                    {/* Verify OTP Button */}
                                    <Pressable style={styles.verifyOtpButton11} onPress={() => check()} >
                                        {isOtpLoading ? (
                                            <ActivityIndicator size={24} color="#16181a" />
                                        ) : (
                                            <Text style={styles.verifyOtpText}>{VerificationText}</Text>
                                        )}
                                    </Pressable>
                                </View>
                            )}


                            {/* <TextInput
                                allowFontScaling={false}
                                placeholder="Pan Number"
                                placeholderTextColor="#B8B8B8"
                                style={styles.input}
                                value={panCard}
                                onChangeText={(text) => { setpanCard(text) }}
                            />
                            {errors.panCardError && <Text style={styles.errorText}>{errors.panCardError}</Text>} */}
                        </View>
                        {/* ......................................................... */}

                        <View style={styles.icons}>
                            <Pressable onPress={() => {

                                navigation.goBack();
                            }}><FontAwesome6 name="chevron-left" size={25} color="#00DF60" /></Pressable>

                            {/* <Pressable style={[styles.btn,{ opacity: isOtpVerified ? 1 : 0.5 }]} onPress={() => { finalsubmit() }}>

                                    {loading && <ActivityIndicator size={24} color="#16181a" />}
                                    {!loading && <Text allowFontScaling={false} style={styles.nexttext}>Submit</Text>
                                    }
                                </Pressable> */}



                            {role1 !== "Venture Capitalist" && (
                                <Pressable
                                    style={styles.btn}
                                    onPress={finalsubmit} // Submit button is always enabled for other roles
                                >
                                    <Text style={styles.nexttext}>Submit</Text>
                                </Pressable>
                            )}

                            {/* For Venture Capitalist, only show Submit button if OTP is verified */}
                            {role1 === "Venture Capitalist" && (
                                <Pressable
                                    style={[styles.btn, { opacity: isOtpVerified ? 1 : 0 }]}  // Disable button if OTP not verified
                                    onPress={() => isOtpVerified && finalsubmit()}  // Only call finalSubmit if OTP is verified
                                    disabled={!isOtpVerified}  // Disable button if OTP not verified
                                >
                                    <Text style={styles.nexttext}>Submit</Text>
                                </Pressable>
                            )}
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
        textAlign: 'left',
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
        paddingHorizontal : 20,
        position: "absolute",
        marginHorizontal: "auto",
        // marginTop: scalingfactor * 30,
        // position: "absolute",
        bottom: 50,
        alignSelf: "center",
        marginTop: 100
    }
    ,
    btn: {
        width: 150,
        height: 40,
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
        fontSize: scalingfactor * 20,
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
        borderRadius: 0,
        // height: 47,
        borderWidth : 0,
        borderBottomWidth :1,
        borderBottomColor : "#ccc",
        width: "92%",
        borderColor: "#ccc",
        marginTop: 10,
        paddingLeft: 0,
        fontFamily: "Alata",
        marginBottom: scalingfactor * 16,
        fontSize:  20, // Responsive font size
        color: "#ccc",
    },

    errorText: {
        marginVertical: 5,
        marginTop: -6,
        textAlign: "left",
        // backgroundColor : "red",
        width: "85%",
        marginHorizontal: "auto",
        color: "#E65858",
        fontSize: 10,
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
    },
    // ....................................................

    verifyOtpButton: {
        backgroundColor: '#ccc',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
        marginBottom: 10,
        width: 130,
        alignSelf: "center"
    },
    verifyOtpButton1: {
        backgroundColor: '#00de62',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        marginBottom: 10,
        width: 130,
        alignSelf: "center"
    },
    verifyOtpButton11: {
        backgroundColor: '#00de62',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
        width: 130,
        alignSelf: "center"
    },
    // Text inside the OTP verification button
    verifyOtpText: {
        fontSize: 16,
        marginTop : -2,
        fontFamily: "Alata",
        color: '#24272A',
    },

    otpContainer: {
        alignItems: 'center',
        marginTop: 10,
    },

    otpInput: {
        width: '80%',
        marginTop: 10,
    },


    codeInputField: {
        width: 50,
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#B8B8B8',
        fontSize: 18,
        textAlign: 'center',
    },

    codeInputHighlight: {
        borderColor: '#00DE62',
    },


    submitButton: {
        backgroundColor: '#16181a',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },


    submitButtonText: {
        color: '#fff',
        fontSize: 18,
    },

})