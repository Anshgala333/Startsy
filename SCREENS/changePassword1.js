import CustomButton from "@/components/button";
import React, { useEffect, useContext, useState } from "react";
import { ActivityIndicator, Pressable, TextInput } from "react-native";
import { GlobalContext } from "@/Global/globalcontext";
import { View, Text, BackHandler, StyleSheet, Image, StatusBar, TouchableOpacity, Dimensions, SafeAreaView, ScrollView } from "react-native";

import { url } from "../config.js";
const ChangePassword1 = ({ navigation }) => {


    const [token, setToken] = useState("");
    const [loading, setloading] = useState("");
    const [message, setmessage] = useState("");
    const [password, setpassword] = useState("");
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
            setmessage("* please enter your password")
            seterror(true)
            return
        }
        setloading(true)

        try {
            const response = await fetch(`${url}api/checkCurrentPassword`, {
                method: 'POST',
                body: JSON.stringify({ password: password }),
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            // setloading(false)
            // console.log(data);
            // console.log(response.status);
            if (response.status === 400) {
                setmessage("* entered password does not match with your current password")
                seterror(true)
            }
            else if (response.status === 200) {
                // console.log("success");
                seterror(false);
                navigation.navigate("ChangePassword2", { token, password, isforgot: false })

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
            <Text allowFontScaling={false} style={styles.headerText}>Profile</Text>

            <Text style={styles.t1}>Current password</Text>
            <TextInput
                allowFontScaling={false}
                placeholder="Password"
                placeholderTextColor="#B8B8B8"
                style={styles.input}
                value={password}
                onChangeText={(text) => { setpassword(text) }}
            />
            {error && <Text style={styles.err}>{message}</Text>}
            <Text style={styles.t2}>Forgot password</Text>
            <Pressable onPress={check} style={styles.btn}>
                {loading && <ActivityIndicator style={{ marginTop: -2 }} size={24} color="#16181a" />}
                {!loading && <Text style={styles.btntext}>Next</Text>}
            </Pressable>

        </SafeAreaView>
    );
};

export default ChangePassword1;

// const { width, height } = Dimensions.get("window");
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
        // fontFamily: "Roboto",
        color: "#94A3B8",
        fontSize: 15,
        textAlign: "center",
        marginTop: -5
    },
    t1: {
        fontFamily: "Alata",
        color: "#ffffff",
        fontSize: 24,
        textAlign: "center",
        marginTop: 5
    }
    , input: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        marginTop: 40,
        borderBottomWidth: 3,
        // borderRadius : 20,
        paddingLeft: scalingfactor * 10,
        borderBottomColor: "#AEAFAF",
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
        width: "50%",
        marginHorizontal: "auto",
        marginVertical: 20,
        backgroundColor: "#00DF60"
    },
    btntext: {
        fontFamily: "Alata",
        color: "#24272A",
        fontSize: 20,
        marginTop: -5
    },
    err: {
        color: "#E65858",
        width: "90%",
        marginHorizontal: "auto",
        marginTop: -5,
        fontSize: 12,
        marginBottom: 25
    }

});
