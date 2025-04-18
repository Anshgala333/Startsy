import React, { useState } from "react";
import { ActivityIndicator, Pressable, TextInput, TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, StatusBar, Dimensions, SafeAreaView } from "react-native";
import { url } from "../config.js"
import signupstyles from "@/styles/signup1styles.js";
import { Entypo } from "@expo/vector-icons";
const ChangePassword2 = ({ navigation, route }) => {

    const { token } = route.params;
    const isforgot = route.params.isforgot
    const email = route.params.email
    const epassword = route.params.password



    const [password, setPassword] = useState("");
    const [success, setsuccess] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [error, seterror] = useState(false);
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    const [loading, setloading] = useState(false);

    const validatePassword = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError("Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one number.");
            return false;
        }
        setPasswordError(""); // Clear error if validation passes
        return true;
    };

    const validateConfirmPassword = () => {
        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match.");
            return false;
        }
        setConfirmPasswordError(""); // Clear error if validation passes
        return true;
    };

    const handleSave = async () => {
        if (!validatePassword() || !validateConfirmPassword()) {
            return; // Prevent submission if validation fails
        }
        // Proceed with saving the password
        setloading(true)
        try {

            var route = isforgot ? "forgotPassword" : "changePassword"
            console.log(route);

            var object = isforgot ? { password: password, confirmPassword: confirmPassword, email: email } :
                { newPassword: password, confirmPassword: confirmPassword }

            // console.log(object);
            // return


            const response = await fetch(`${url}api/${route}`, {
                method: 'POST',
                body: JSON.stringify(object),
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();


            if (response.status === 400) {

            }
            else if (response.status === 200) {

                seterror(false);
                setsuccess(true)
                navigation.navigate("Green");
                // navigation.navigate("ChangePassword2")

            }
        }
        catch (err) {

            console.log(err);

        }
        finally {
            setloading(false)
        }
    };

    const { height, width } = Dimensions.get("window");
    const a = width / 360;
    const b = height / 800;
    const scalingFactor = Math.sqrt(a * b);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#16181a",
            alignItems: 'center'
        },
        headerText: {
            fontSize: 35,
            fontWeight: "bold",
            color: "#00DE62",
            marginBottom: 20,
            paddingHorizontal: 20,
        },
        t1: {
            color: "#ccc",
            fontSize: 24,
            fontFamily: "Alata",
            textAlign: "center",
            marginTop: 20,
        },
        t11: {
            color: "#ffffff",
            fontSize: 16,
            textAlign: "center",
            marginTop: 5,
        },
        t2: {
            color: "#94A3B8",
            fontSize: 12,
            textAlign: "center",
            marginTop: 10,
        },
        input: {
            margin: height * 0.016,
            marginTop: 35,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            fontSize: scalingFactor * 20,
            color: "#B8B8B8",
            fontFamily: "Alata",
            paddingBottom: scalingFactor * 7,
            width: "88%",
            alignSelf: "center",
        },
        error: {
            color: "#E65858",
            fontSize: scalingFactor * 14,
            textAlign: "left",
            width: "88%",
            marginHorizontal: "auto",
        },
        btn: {
            borderRadius: 20,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            alignSelf: "center",
            marginVertical: 20,
            backgroundColor: "#00DF60",
        },
        btntext: {
            color: "#16181a",
            fontSize: 20,
            marginTop: -3,
            fontFamily: "Alata",
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#16181a" barStyle={"light-content"} />
            <Text style={styles.t1}>Create a password</Text>
            <Text style={styles.t2}>Use a strong password</Text>

            <View style={{
                position: "relative",
                padding: 0,
                borderBottomColor: "white",
                borderBottomWidth: 1,
                width: "95%",
                paddingBottom: 8,
                paddingStart: 8,
                marginTop: 30,
            }}>
                <TextInput
                    allowFontScaling={false}
                    placeholder="Password"
                    placeholderTextColor="#828282"
                    style={signupstyles.input}
                    value={password}
                    secureTextEntry={showPassword}
                    onChangeText={(text) => {
                        setPasswordError("")
                        setConfirmPasswordError("")
                        setPassword(text)
                    }}
                />
                <TouchableOpacity style={{ position: 'absolute', marginRight: 10, right: 0, bottom: 0, marginBottom: 10 }}
                    onPress={() => setShowPassword(prev => !prev)}
                >
                    {showPassword ?
                        <Entypo name="eye-with-line" size={24} color="#828282" />
                        :
                        <Entypo name="eye" size={24} color="#828282" />

                    }
                </TouchableOpacity>
            </View>
            {passwordError ? (
                <Text style={signupstyles.error}>{passwordError}</Text>
            ) : null}

            <View style={{
                position: "relative",
                padding: 0,
                borderBottomColor: "white",
                borderBottomWidth: 1,
                width: "95%",
                paddingBottom: 8,
                paddingStart: 8,
                marginTop: 30,
            }}>
                <TextInput
                    allowFontScaling={false}
                    placeholder="Confirm Password"
                    placeholderTextColor="#828282"
                    style={signupstyles.input}
                    value={confirmPassword}
                    secureTextEntry={showConfirmPassword}
                    onChangeText={(text) => {
                        setPasswordError("")
                        setConfirmPasswordError("")
                        setConfirmPassword(text)
                    }}
                />
                <TouchableOpacity style={{ position: 'absolute', marginRight: 10, right: 0, bottom: 0, marginBottom: 10 }}
                    onPress={() => setShowConfirmPassword(prev => !prev)}
                >
                    {showConfirmPassword ?
                        <Entypo name="eye-with-line" size={24} color="#828282" />
                        :
                        <Entypo name="eye" size={24} color="#828282" />

                    }
                </TouchableOpacity>
            </View>
            {confirmPasswordError ? <Text style={styles.error}>{confirmPasswordError}</Text> : null}
            {success && <Text style={styles.t11}>password changes successfully</Text>}
            <Pressable onPress={handleSave} style={styles.btn}>
                {loading && <ActivityIndicator style={{ marginTop: -2 }} size={24} color="#16181a" />}
                {!loading && <Text style={styles.btntext}>Save</Text>}
            </Pressable>
        </SafeAreaView>
    );
};

export default ChangePassword2;
