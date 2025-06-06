import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, Image, StatusBar, KeyboardAvoidingView, Pressable, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import { useFocusEffect } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import signupstyles from "../styles/signup1styles.js";
import Ionicons from '@expo/vector-icons/Ionicons';
import Back from "../components/back.js";
import { url } from "../config.js";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Entypo } from "@expo/vector-icons";
const Signup2 = function ({ navigation, route }) {
    const { type, username } = route.params;
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);

    const validatePassword = () => {
        // Validate password: At least 8 characters, 1 lowercase, 1 uppercase, and 1 number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError("Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one number.");
            return false;
        }
        setPasswordError(""); // Clear error if validation passes
        return true;
    };

    const validateConfirmPassword = () => {
        // Check if confirm password matches
        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match.");
            return false;
        }
        setConfirmPasswordError(""); // Clear error if validation passes
        return true;
    };

    const handleSubmit = async () => {
        if (!validatePassword() || !validateConfirmPassword()) {
            return; // Prevent submission if validation fails
        }

        const final = {
            userName: username,
            password: password,
            role: type,
        };

        setLoading(true);
        try {
            const response = await fetch(`${url}api/register`, {
                method: 'POST',
                body: JSON.stringify(final),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();


            // console.log(data);

            await AsyncStorage.setItem('accessToken', data.accessToken);
            // console.log("token stored successfully");


            if (type === "Investor") {
                navigation.navigate("Signup4", { type, username, password });
            } else {
                navigation.navigate("Email", { type, username, password });
                // navigation.navigate("Signup5", { type, username, password });
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181a");
        StatusBar.setBarStyle("light-content");
    });

    return (
        <KeyboardAvoidingView style={signupstyles.container} behavior="padding" keyboardVerticalOffset={0}>
            <ScrollView>
                <View style={signupstyles.row}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <FontAwesome6 name="chevron-left" size={25} style={{ alignSelf: 'flex-start', marginLeft: 16 }} color="#00DF60" />
                    </Pressable>
                    <View style={signupstyles.top}>
                        <Image style={signupstyles.logo} source={require("../assets/images/logo.png")} />
                    </View>
                    <View style={signupstyles.bottom}>
                        <Text allowFontScaling={false} style={signupstyles.t1}>Create a password</Text>
                        <Text allowFontScaling={false} style={signupstyles.t2}>Use a strong password</Text>

                        <View style={{ 
                            position: "relative",
                            padding: 0,
                            borderBottomColor: "white",
                            borderBottomWidth: 1,
                            width: "95%",
                            paddingBottom: 8,
                            paddingStart: 8,
                            marginTop: 10,
                             }}>
                            <TextInput
                                allowFontScaling={false}
                                placeholder="Password"
                                placeholderTextColor="#828282"
                                style={signupstyles.input}
                                // style={[signupstyles.input ,{marginBottom:10} ]}
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
                                    <Ionicons name="eye-off-outline" size={24} color="#828282" />
                                    :
                                    <Ionicons name="eye-outline" size={24} color="#828282" />

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
                            <TouchableOpacity style={{ position: 'absolute', right: 0, bottom: 0, marginBottom: 10, marginRight: 10 }}
                                onPress={() => setShowConfirmPassword(prev => !prev)}
                            >
                                {showConfirmPassword ?
                                    <Ionicons name="eye-off-outline" size={24} color="#828282" />
                                    :
                                    <Ionicons name="eye-outline" size={24} color="#828282" />

                                }
                            </TouchableOpacity>
                        </View>
                        {confirmPasswordError ? (
                            <Text style={signupstyles.error}>{confirmPasswordError}</Text>
                        ) : null}

                        <Pressable onPress={handleSubmit} style={[signupstyles.next , {marginTop : 40}]} disabled={loading}>
                            {!loading ? (
                                <Text allowFontScaling={false} style={signupstyles.nexttext}>Next</Text>
                            ) : (
                                <ActivityIndicator style={{ marginTop: 7 }} size={24} color="#000" />
                            )}
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Signup2;
