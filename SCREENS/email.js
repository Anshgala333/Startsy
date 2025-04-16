import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView, ScrollView, View, Text, TextInput, Image, StatusBar, KeyboardAvoidingView, Pressable, ActivityIndicator, BackHandler } from "react-native";
import { useFocusEffect } from "expo-router";
import signupstyles from "../styles/signup1styles.js";
import s5 from "@/styles/s5.js";
import Back from "@/components/back.js";
import { url } from "../config.js";
import { GlobalContext } from "@/Global/globalcontext";
import { OtpInput } from "react-native-otp-entry";  // ✅ Added OTP input
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
const Email = ({ navigation, route }) => {
    const { globaldata } = useContext(GlobalContext);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);  // Step 1: Email, Step 2: OTP
    const [token, setToken] = useState("");
    const [otploading, setotploading] = useState(false);
    const [otperror, setotperror] = useState(false);


    const { type, id, useremail } = route.params

    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181a");
        StatusBar.setBarStyle("light-content");
    });

    useEffect(() => {
        setToken(globaldata.token);

        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (step === 2) {
                setStep(1);  // Go back to email step if on OTP step
                return true;
            }
            navigation.goBack();
            return true;
        });

        return () => backHandler.remove();
    }, [step, globaldata]);

    // Validate email format
    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Handle sending OTP
    const handleSendOtp = async () => {
        if (!email || !validateEmail()) {
            setMessage("Enter a valid email *");
            setError(true);
            return;
        }

        // return
        setLoading(true);
        try {
            const response = await fetch(`${url}api/checkemail`, {
                method: 'POST',
                body: JSON.stringify({ "email": email }),
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data);

            if (response.status === 400) {
                // setEmailUniqueError(true);
                setMessage("* Email id already exists");
                setError(true);
                return
            }
            else {
                setStep(2);
                setMessage("");
                setError(false);
            }
        }
        catch (err) {

        }
        finally {
            setLoading(false)
        }



        try {
            const response = await fetch(`${url}api/sendOtp`, {
                method: 'POST',
                body: JSON.stringify({ email: email }),
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data);

        }
        catch (e) {

        }

        // ✅ Switch to OTP step (no backend call as per your request)
        setStep(2);
        setMessage("");
        setError(false);
    };

    async function check(params) {
        setotploading(true)
        try {
            const response = await fetch(`${url}api/verifyOtp`, {
                method: 'POST',
                body: JSON.stringify({ email: email, otp: otp }),
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
                // seterror(true)
                setotperror(true)
            }
            else if (response.status === 200) {
                // console.log("success");
                // seterror(false);
                navigation.navigate("Signup5", { type, id, useremail  , email })

            }
        }
        catch (err) {
            // setloading(false)
            console.log(err);

        }
        finally{
            setotploading(false)
        }
    }

    return (
        <KeyboardAvoidingView style={signupstyles.container} behavior="padding" keyboardVerticalOffset={-100}>
            <ScrollView automaticallyAdjustContentInsets={true} style={{ flex: 1 }}>
                <View style={signupstyles.row}>
                    {/* <Pressable style={signupstyles.back} onPress={() => {
                        if (step === 2) {
                            setStep(1);  // Go back to email step if on OTP step
                        } else {
                            navigation.goBack();
                        }
                    }}>
                        <Back />
                    </Pressable> */}
                    <Pressable onPress={() =>{ 
                        if (step === 2) {
                            setStep(1);
                        } else {
                            navigation.goBack();
                        }
                        }}>
                        {/* <FontAwesome6 name="chevron-left" size={34} style={{ alignSelf: 'flex-start', marginLeft: 16 }} color="#00DF60" /> */}
                    </Pressable>
                    <View style={signupstyles.top}>
                        <Image style={signupstyles.logo} source={require("../assets/images/logo.png")} />
                    </View>

                    <View style={signupstyles.bottom}>
                        {step === 1 ? (
                            <>
                                <Text style={signupstyles.t1}>Enter Your Email</Text>
                                {!error && <Text style={signupstyles.t2}>You won't be able to change this later.</Text>}
                                {error && <Text style={[signupstyles.error , {textAlign : "center"}]}>{message}</Text>}

                                <TextInput
                                    placeholder="xyz@gmail.com"
                                    placeholderTextColor="#828282"
                                    style={s5.input}
                                    value={email}
                                    onChangeText={(text) => {
                                        setError(false);
                                        setEmail(text);
                                    }}
                                />

                                <Pressable style={signupstyles.next} onPress={handleSendOtp}>
                                    {loading ? (
                                        <ActivityIndicator style={{marginTop:7}} size={24} color="#16181a" />
                                    ) : (
                                        <Text style={signupstyles.nexttext}>Send OTP</Text>
                                    )}
                                </Pressable>
                            </>
                        ) : (
                            <>
                                <Text style={signupstyles.t1}>Enter OTP</Text>
                                <Text style={signupstyles.t2}>
                                    We sent a code to{'\n'}
                                    <Text style={{ fontWeight: "bold" }}>{email}</Text> <Text style={{ fontWeight: "bold" }}></Text>
                                    
                                </Text>
                                {/* <Text style={signupstyles.t2}>Check spam *</Text> */}



                                {/* ✅ OTP Input */}
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
                                        pinCodeContainerStyle: s5.pinCodeContainer,
                                        pinCodeTextStyle: { color: "#bbbbbb" },
                                        focusStickStyle: s5.focusStick,
                                        focusedPinCodeContainerStyle: s5.activePinCodeContainer,
                                        placeholderTextStyle: { color: "#bbbbbb" },
                                        filledPinCodeContainerStyle: s5.filledPinCodeContainer,
                                        disabledPinCodeContainerStyle: s5.disabledPinCodeContainer,
                                    }}
                                />
                                {otperror && <Text style={[signupstyles.error , {marginTop : 25 , fontSize : 15}]}>Invalid OTP</Text>}

                                {/* ✅ "Verify OTP" Button */}
                                <Pressable style={[signupstyles.next,{marginTop:25}]} onPress={() => check()}>
                                    {!otploading && <Text style={signupstyles.nexttext}>Verify OTP</Text>}
                                    {otploading &&  <ActivityIndicator style={{marginTop :7}} size={24} color="#16181a" />}
                                </Pressable>
                            </>
                        )}
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Email;
