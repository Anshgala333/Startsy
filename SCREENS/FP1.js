import CustomButton from "@/components/button";
import React, { useEffect, useContext, useState } from "react";
import { Pressable, TextInput } from "react-native";
import { GlobalContext } from "@/Global/globalcontext";
import { View, Text, ActivityIndicator, BackHandler, StyleSheet, Image, StatusBar, TouchableOpacity, Dimensions, SafeAreaView, ScrollView } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import { url } from "../config.js";
const FP1 = ({ navigation }) => {


    const [token, setToken] = useState("");
    const [message, setmessage] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);
    const { globaldata } = useContext(GlobalContext);


    useEffect(() => {
        // console.log(globaldata, "global data");
        setToken(globaldata.token);
    }, [globaldata])

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack();

            return true; // This prevents the default back action
        });

        return () => backHandler.remove();
    }, []);


    async function check() {
        // console.log(`${url}api/checkCurrentPassword`);
        if (password == "") {
            setmessage("* please enter your email")
            seterror(true)
            return
        }

        try {
            setloading(true)
            const response = await fetch(`${url}api/sendOtp`, {
                method: 'POST',
                body: JSON.stringify({ email: password }),
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            // setloading(false)
            console.log(data);
            // console.log(response.status);
            if (response.status === 400) {
                // setmessage("* entered password does not match with your current password")
                seterror(true)
            }
            else if (response.status === 200) {
                // console.log("success");
                seterror(false);
                navigation.navigate("FP2", { email: password, "isforgot": true })

            }
        }
        catch (err) {
            // setloading(false)
            console.log(err);


        }
        finally {
            setloading(false)
        }
    }

    return (

        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#16181a" barStyle={"light-content"} />
            {/* Header Section */}
            {/* <Text allowFontScaling={false} style={styles.headerText}>Profile</Text> */}
            <Pressable onPress={() => {
                
                navigation.goBack()  
            }}>
                <FontAwesome6 name="chevron-left" size={25}
                    style={{ alignSelf: 'flex-start', marginLeft: 16, marginTop: 20, position: "relative" }} color="#00DF60" />
            </Pressable>

            {/* <Text style={styles.t1}>Forgot password</Text> */}
            <TextInput
                allowFontScaling={false}
                placeholder="Enter your email ID"
                placeholderTextColor="#828282"
                style={styles.input}
                value={password}
                onChangeText={(text) => { setpassword(text) }}
            />
            {error && <Text style={styles.err}>{message}</Text>}
            {/* <Text style={styles.t2}>Forgot password</Text> */}
            <Pressable onPress={check} style={styles.btn}>

                {loading && <ActivityIndicator size={24} color="#16181a" />}
                {!loading && <Text style={styles.btntext}>Next</Text>}
            </Pressable>

        </SafeAreaView>
    );
};

export default FP1;


const { height, width } = Dimensions.get("window");


var a = width / 360;
var b = height / 800;

const scalingfactor = Math.sqrt(a * b)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
        backgroundColor: "#16181a",
        // padding: 20,
    },
    headerText: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#00DE62",
        marginBottom: 20,
        color: "#00DE62",
        fontFamily: "myanmar",
        paddingHorizontal: 20

    },
    t2: {
        fontFamily: "Roboto",
        color: "#94A3B8",
        fontSize: 15,
        textAlign: "center",
        marginTop: -5
    },
    t1: {
        fontFamily: "Alata",
        color: "#ccc",
        fontSize: 24,
        textAlign: "center",
        // position : "absolute",
        marginTop: -30,
    }
    , input: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        marginTop: 20,
        fontFamily: "Alata",
        borderBottomWidth: 1,
        // borderRadius : 20,
        paddingLeft: scalingfactor * 10,
        borderBottomColor: "#ccc",
        fontSize: scalingfactor * 20, // Responsive font size
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 7,
        width: "90%",
        marginHorizontal: "auto",
        // fontFamily: "Roboto",
        // lineHeight: scalingfactor * 18,
        // marginBottom: scalingfactor * 25,
        // borderRadius : 20
    },
    btn: {
        borderRadius: 20,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        width: "70%",
        marginHorizontal: "auto",
        marginVertical: 20,
        backgroundColor: "#00DF60"
    },
    btntext: {
        fontFamily: "Alata",
        color: "#16181a",
        fontSize: 20,
        marginTop: -5
    },
    err: {
        color: "#E65858",
        width: "90%",
        fontFamily: "Roboto",
        marginHorizontal: "auto",
        marginTop: -5,
        fontSize: 12,
        marginBottom: 25
    }

});
