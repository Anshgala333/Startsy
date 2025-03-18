import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, Image, StatusBar, KeyboardAvoidingView, Pressable, ActivityIndicator, ScrollView } from "react-native";
import { useFocusEffect } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import signupstyles from "../styles/signup1styles.js";
import Ionicons from '@expo/vector-icons/Ionicons';
import Back from "../components/back.js";
import { url } from "../config.js";

const Signup2 = function ({ navigation, route }) {
    const { type, username } = route.params;
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

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
                navigation.navigate("Signup4", { type ,username, password});
            } else {
                navigation.navigate("Signup5", { type, username, password });
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
                    <Pressable style={signupstyles.back} onPress={() => {
                        navigation.setParams({ type });
                        navigation.goBack();
                    }}>
                        <Back />
                    </Pressable>
                    <View style={signupstyles.top}>
                        <Image style={signupstyles.logo} source={require("../assets/images/logo.png")} />
                    </View>
                    <View style={signupstyles.bottom}>
                        <Text allowFontScaling={false} style={signupstyles.t1}>Create a password</Text>
                        <Text allowFontScaling={false} style={signupstyles.t2}>Use a strong password</Text>

                        <TextInput
                            allowFontScaling={false}
                            placeholder="Password"
                            placeholderTextColor="#B8B8B8"
                            style={signupstyles.input}
                            value={password}
                            secureTextEntry={true}
                            onChangeText={(text) => { setPassword(text) }}
                        />
                        {passwordError ? (
                            <Text style={ signupstyles.error }>{passwordError}</Text>
                        ) : null}

                        <TextInput
                            allowFontScaling={false}
                            placeholder="Confirm password"
                            placeholderTextColor="#B8B8B8"
                            style={signupstyles.input2}
                            secureTextEntry={true}
                            value={confirmPassword}
                            onChangeText={(text) => { setConfirmPassword(text) }}
                        />
                        {confirmPasswordError ? (
                            <Text style={signupstyles.error}>{confirmPasswordError}</Text>
                        ) : null}

                        <Pressable onPress={handleSubmit} style={signupstyles.next} disabled={loading}>
                            {!loading ? (
                                <Text allowFontScaling={false} style={signupstyles.nexttext}>Next</Text>
                            ) : (
                                <ActivityIndicator size={24} color="#000" />
                            )}
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Signup2;
