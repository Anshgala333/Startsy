import React, { useState } from "react";
import { Pressable, TextInput } from "react-native";
import { View, Text, StyleSheet, StatusBar, Dimensions, SafeAreaView } from "react-native";
import{url} from "../config.js"
const ChangePassword2 = ({navigation , route  }) => {

    const{token} = route.params;
    const isforgot = route.params.isForgot
    const epassword = route.params.password

   


    
    

    
    const [password, setPassword] = useState("");
    const [success, setsuccess] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const[error, seterror] = useState(false);

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
        try {
            // console.log(token);
            var route = isforgot ? "forgotPassword" : "changePassword"
            var object = isforgot ? { newPassword: password , confirmPassword : confirmPassword ,email : email} :
            { newPassword: password , confirmPassword : confirmPassword }
            
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
            // setloading(false)
            // console.log(data);
            // console.log(response.status);
            if (response.status === 400) {
                // setmessage("* entered password does not match with your current password")
                // seterror(true)
            }
            else if (response.status === 200) {
                // console.log("success");
                seterror(false);
                setsuccess(true)
                navigation.navigate("Green");
                // navigation.navigate("ChangePassword2")

            }
        }
        catch (err) {
            // setloading(false)
            console.log(err);

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
        },
        headerText: {
            fontSize: 35,
            fontWeight: "bold",
            color: "#00DE62",
            marginBottom: 20,
            paddingHorizontal: 20,
        },
        t1: {
            color: "#ffffff",
            fontSize: 24,
            textAlign: "center",
            marginTop: 5,
        },
        t11: {
            color: "#ffffff",
            fontSize: 16,
            textAlign: "center",
            marginTop: 5,
        },
        t2: {
            color: "#94A3B8",
            fontSize: 15,
            textAlign: "center",
            marginTop: 10,
        },
        input: {
            margin: height * 0.016,
            marginTop: 35,
            borderBottomWidth: 3,
            borderBottomColor: "#AEAFAF",
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
            height: 45,
            justifyContent: "center",
            alignItems: "center",
            width: "70%",
            alignSelf: "center",
            marginVertical: 20,
            backgroundColor: "#00DF60",
        },
        btntext: {
            color: "#24272A",
            fontSize: 22,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#16181a" barStyle={"light-content"} />
            <Text allowFontScaling={false} style={styles.headerText}>Profile</Text>
            <Text style={styles.t1}>Create a password</Text>
            <Text style={styles.t2}>Use a strong password</Text>
            <TextInput
                allowFontScaling={false}
                placeholder="Password"
                placeholderTextColor="#B8B8B8"
                style={styles.input}
                value={password}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
            />
            {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
            <TextInput
                allowFontScaling={false}
                placeholder="Confirm password"
                placeholderTextColor="#B8B8B8"
                style={styles.input}
                value={confirmPassword}
                secureTextEntry={true}
                onChangeText={(text) => setConfirmPassword(text)}
            />
            {confirmPasswordError ? <Text style={styles.error}>{confirmPasswordError}</Text> : null}
            {success && <Text style={styles.t11}>password changes successfully</Text>}
            <Pressable onPress={handleSave} style={styles.btn}>
                <Text style={styles.btntext}>Save</Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default ChangePassword2;
