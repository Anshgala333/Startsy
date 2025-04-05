import CustomButton from "@/components/button";
import React, { useEffect, useContext, useState } from "react";
import { Pressable, TextInput } from "react-native";
import { GlobalContext } from "@/Global/globalcontext";
import { View, Text, BackHandler, ActivityIndicator, StyleSheet, Image, StatusBar, TouchableOpacity, Dimensions, SafeAreaView, ScrollView } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { url } from "../config.js";
const FP2 = ({ navigation, route }) => {

  var email = route.params.email
  var isforgot = route.params.isforgot

  // console.log(email);
  // console.log(isforgot);


  const [loading, setloading] = useState(false);

  const [token, setToken] = useState("");
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
      setmessage("* please enter your email")
      seterror(true)
      return
    }

    setloading(true)
    try {
      const response = await fetch(`${url}api/verifyOtp`, {
        method: 'POST',
        body: JSON.stringify({ email: email, otp: password }),
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
        setmessage("* OTP is incorrect")
        seterror(true)
      }
      else if (response.status === 200) {
        // console.log("success");
        seterror(false);
        navigation.navigate("ChangePassword2", { token, email, isforgot: true, email: email })

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

      <Text style={styles.t1}>Enter OTP</Text>
      {!error && <Text style={styles.t2}>Check your email</Text>}
      {error && <Text style={[styles.t2 , {color : "#E65858"}]}>{message}</Text>}
      {/* <TextInput
        allowFontScaling={false}
        placeholder="Enter your email id"
        placeholderTextColor="#B8B8B8"
        style={styles.input}
        value={password}
        onChangeText={(text) => { setpassword(text) }}
      /> */}


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
        // onTextChange={(text) => console.log(text)}
        onTextChange={(text) => { setpassword(text) }}
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
      {/* {error && <Text style={styles.err}>{message}</Text>} */}
      {/* <Text style={styles.t2}>Forgot password</Text> */}
      <Pressable onPress={check} style={styles.btn}>

        {loading && <ActivityIndicator size={24} color="#16181a" />}
        {!loading &&   <Text style={styles.btntext}>Next</Text>}
      </Pressable>

    </SafeAreaView>
  );
};

export default FP2;


const { height, width } = Dimensions.get("window");


var a = width / 360;
var b = height / 800;

const scalingfactor = Math.sqrt(a * b)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'center',
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
    color: "#828282",
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
    marginBottom : 30
  },
  t1: {
    fontFamily: "Alata",
    color: "#ccc",
    fontSize: 24,
    textAlign: "center",
    marginTop: 5,
    // marginBottom: 30
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
    width: "70%",
    marginHorizontal: "auto",
    marginVertical: 40,
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
    marginHorizontal: "auto",
    marginTop: 20,
    fontSize: 12,
    textAlign: "center",
    // marginLeft : 40,
    marginBottom: 25
  }

});
