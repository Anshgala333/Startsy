// App.tsx

import * as React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import styles from "../styles/l.js"
// import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, BackHandler, Text, Pressable, ActivityIndicator, TextInput, Keyboard, View, Image, StyleSheet, Dimensions, StatusBar, Animated, Easing, Platform, KeyboardAvoidingView, ScrollView, Alert, ToastAndroid } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ReadMore1 from "./trial-1.js";
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
// import readmorestyles from "../styles/readmorestyles.js";
const { height, width } = Dimensions.get('window');
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFocusEffect } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import { GlobalContext } from "@/Global/globalcontext.js";
import { url } from "../config.js"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { LinearGradient } from "expo-linear-gradient";


// import Toast from 'react-native-toast-message';
const Login1 = ({ navigation, showtoast, falsetoken }) => {
  // const navigation = useNavigation();
  // console.log(navigation);


  // const showStyledToast = () => {
  //   Toast.show({
  //     type: 'success', // Types: 'success', 'error', 'info'
  //     text1: 'Notice',
  //     text2: `You don't have to apply to this community`,
  //     position: 'top', // Toast appears at the top
  //     visibilityTime: 3000, // Duration in ms
  //     topOffset: 50, // Offset from the top
  //   });
  // };
  // console.log(falsetoken, "tmep hai yeh");

  // console.log(showtoast, "toast staus");



  const { globaldata, updateField } = useContext(GlobalContext);

  const showToastWithGravity = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      `${message}`,
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      100, 100
    );
  };




  async function deleteuser() {
    try {
      const response = await fetch(`${url}api/deleteUnAuthenticatedUser`, {
        method: 'POST',
        body: "",
        headers: {
          accept: "application/json",
          "Authorization": `Bearer ${falsetoken}`,
        },
      });
      const data = await response.json();
      // setloading(false)
      // console.log(data);
      // console.log(response.status);
    }
    catch (err) {
      console.log(err);

    }
  }
  useEffect(() => {
    if (showtoast == true) {
      showToastWithGravity("Your profile was left incomplete hence it is deleted, you may create it again.")
      deleteuser()



    }

  }, [showtoast])


  useFocusEffect(() => {
    StatusBar.setBackgroundColor("#16181a")
    StatusBar.setBarStyle("light-content")
  })


  const [isForm1Visible, setForm1Visible] = useState(true);
  const [attop, setattop] = useState(true);
  const [initial, setinitial] = useState(true)


  const animation2 = (first) => {
    // console.log(first);


    setTimeout(() => {
      Animated.timing(heightAnim, {
        // toValue: height * 0.42,
        toValue: height * 0.42,
        duration: (first == undefined) ? 300 : 0,
        useNativeDriver: false,
      }).start();

      Animated.timing(bottomanim, {
        // toValue: height * 0.68,
        toValue: height * 0.58,
        duration: (first == undefined) ? 300 : 0,
        useNativeDriver: false,

      }).start();
    }, 0);
  }
  const route = useRoute()

  var first = (route.params) ? route.params.first : ""
  // var moverfirst = (route.params) ? route.params.moverfirst : ""
  const [moverfirst, setMoverfirst] = useState(route.params ? route.params.moverfirst : "");

  setTimeout(() => {
    setMoverfirst(undefined)
  }, 2000);
  useEffect(() => {
    if (route.params && route.params.isForm1Visible !== undefined) {
      // setForm1Visible(route.params.isForm1Visible);

      // console.log("will change to back");

      setinitial(false)
      setForm1Visible(false)
      animation2(first)
      // console.log(moverfirst, "moverfirst ");


      // setattop(true)



    }
  }, [route.params]);





  const [fontsLoaded] = useFonts({
    Alata: require('../assets/fonts/Alata-Regular.ttf'),
  });


  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [loading, setloading] = useState(false)
  const [emailerror, setemailerror] = useState(false)
  const [passworderror, setpassworderror] = useState(false)
  const [passworderror1, setpassworderror1] = useState(false)
  const [wrongcredential, setwrongcredential] = useState(false)


  const handlelogin = async (navigation) => {

    // console.log("login route called");



    setemailerror(false)
    setpassworderror(false)
    setpassworderror1(false)
    setwrongcredential(false)

    if (email == "") {
      setemailerror(true)
      return
    }
    if (password == "") {
      setpassworderror(true)
      return
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    // if (!passwordRegex.test(password)) {
    //   setpassworderror1(true)
    //   return;
    // }

    setloading(true)

    var final = {
      identifier: email,
      password: password,
    }



    try {
      const response = await fetch(`${url}api/authenticate`, {
        method: 'POST',
        body: JSON.stringify(final),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',

        }
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        updateField("token", data.accessToken);


        try {
          await AsyncStorage.setItem('accessToken', data.accessToken);
          // console.log('Data saved successfully!');
        } catch (error) {
          console.error('Error saving data:', error);
        }

        try {
          const token = data.accessToken;
          const decoded = jwtDecode(token);
          console.log(decoded);
          if (decoded.role == "Investor") {
            
            if (decoded.isInvestorVerified == true) {
              navigation.navigate("Main2")
            }
            else if(decoded.investorRejected == true){
              navigation.navigate("InvestorNotVerifiedScreen")

          }
          else  {
              navigation.navigate("InvestorWaitingPage")
          }
          }
          else {
            navigation.navigate("Main2");
          }
        }
        catch (err) {

        }
      }
      else {
        setwrongcredential(true)
      }


    }
    catch (err) {
      console.log(err);

    }
    finally {
      setTimeout(() => {
        setloading(false)
      }, 1000);

    }


  }

  const heightAnim = useRef(new Animated.Value(height)).current;
  const bottomanim = useRef(new Animated.Value(0)).current;
  const flexanim = useRef(new Animated.Value(0.8)).current;

  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    // Start the animation
    // console.log(moverfirst, "ok");

    Animated.timing(animatedValue, {
      toValue: attop ? height + 10 : -10, // Move to 100 if attop is true, else move to 0
      duration: (moverfirst == undefined) ? 300 : 0,
      useNativeDriver: false, // Use native driver for better performance
      easing: Easing.inOut(Easing.ease)
      //
    }).start();
  }, [attop]);



  const animatedtop = {
    top: animatedValue, // Bind animated value to top
  };


  //affecting this will effect read more position----------------------------
  const animatedValue1 = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    // Start the animation
    Animated.timing(animatedValue1, {
      toValue: attop ? 0 : -height, // Move to 0 if attop is true, else move to -height
      duration: (moverfirst == undefined) ? 300 : 0,
      useNativeDriver: false, // Use native driver for better performance
      easing: Easing.inOut(Easing.ease)


    }).start();
  }, [attop]);

  const animatedtop1 = {
    top: animatedValue1, // Bind animated value to top
  };





  useEffect(() => {
    if (initial) {
      const timer1 = setTimeout(() => {
        Animated.timing(heightAnim, {
          toValue: height * 0.4,
          duration: 400,
          useNativeDriver: false,
          easing: Easing.elastic(0.5),
        }).start();
      }, 3000);

      setTimeout(() => {
        setinitial(false)
      }, 5000);
      return () => clearTimeout(timer1);
    }
  }, [initial]);



  useEffect(() => {
    if (initial) {
      const timer = setTimeout(() => {
        Animated.timing(bottomanim, {
          toValue: height * 0.6,
          duration: 400,
          useNativeDriver: false,
          easing: Easing.elastic(0.5)
        }).start();
      }, 3000);

      setTimeout(() => {
        setinitial(false)
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [initial]);

  useEffect(() => {
    if (initial == true && first == "") {
      const timer = setTimeout(() => {
        Animated.timing(flexanim, {
          toValue: 0.9,
          duration: 300,
          useNativeDriver: false,
          easing: Easing.elastic(1)

        }).start();
      }, 3100);

      return () => clearTimeout(timer);
    }
  }, [initial]);




  const animation3 = () => {
    // setForm1Visible(true)
    setTimeout(() => {
      Animated.timing(heightAnim, {
        toValue: height * 0.4,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.ease),
      }).start();
      Animated.timing(bottomanim, {
        toValue: height * 0.6,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.ease),

      }).start();
    }, 0);
  }



  const [parentWidth, setParentWidth] = useState(Dimensions.get('window').width);

  // Function to handle layout changes
  const handleLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setParentWidth(width);
  };




  const bounceValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    // Define the single vertical bounce animation
    if (initial == true && first == "") {
      setTimeout(() => {
        Animated.sequence([
          Animated.timing(bounceValue, {
            toValue: -30,          // Move up by 10 units
            duration: 300,         // Duration of the up movement
            useNativeDriver: true,

          }),
          Animated.timing(bounceValue, {
            toValue: 0,           // Move down by 10 units
            duration: 300,         // Duration of the down movement
            useNativeDriver: true,


          }),

        ]).start();
      }, 2000)
      setTimeout(() => {
        Animated.sequence([
          Animated.timing(bounceValue, {
            toValue: -10,          // Move up by 10 units
            duration: 300,         // Duration of the up movement
            useNativeDriver: true,

          }),
          Animated.timing(bounceValue, {
            toValue: 0,           // Move down by 10 units
            duration: 300,         // Duration of the down movement
            useNativeDriver: true,


          }),

        ]).start();
      }, 3100)
    }
  }, [initial]);

  function showsignuppage(type, navigation) {
    // console.log(type);
    navigation.navigate("Signup1", { type: type });

  }
  useFocusEffect(
    React.useCallback(() => {
      // Adding back button handler only when the screen is focused
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        // console.log('====================================');
        // console.log("back called");
        // console.log('====================================');
        // emailInput.current?.blur()

        if (!isForm1Visible) {
          // console.log("ok");
          setForm1Visible(true);
          animation3();
          return true; // Prevent default back action
        }
        return false; // Allow default back action when form is visible
      });

      // Cleanup when the screen is unfocused
      return () => {
        backHandler.remove();
      };
    }, [isForm1Visible]) // Depend on isForm1Visible to re-run the effect
  );;
  const scrollContainer = useRef()
  const emailInput = useRef()

  const [tree, setstatus] = useState(false); // Default 100px

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // console.log('====================================');
      // console.log("back called");
      // console.log('====================================');
      // emailInput.current?.blur()
    });

    return () => {
      backHandler.remove();
    };
  }, [])
  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setstatus(true); // Move up
    });

    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setstatus(false); // Move up
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);


  return (




    <ScrollView
      style={[{ minHeight: 2000, marginTop: tree ? -75 : 0 }]}
      ref={scrollContainer}>

      <Animated.View style={[{ backgroundColor: "#16181a", width: "100%", height: "100%", flex: 1 }, animatedtop1]}>
        {/* <Toast /> */}
        {!isForm1Visible && (
          <Pressable style={[styles.back, { zIndex: (attop) ? 1 : 0 }]} onPress={() => {
            setForm1Visible(true);
            animation3()
          }} >

            <Ionicons name="arrow-back-circle-outline" size={50} color="#00DE62" />

          </Pressable>
        )}



        {/* -------------------------------------- top part ---------------------------------------- */}

        <Animated.View onLayout={handleLayout} style={[styles.top, { height: heightAnim }]}>
          <Animated.View style={[
            { flex: 1 },
            { transform: [{ translateY: bounceValue }] },
          ]}>
            <Animated.Image style={[styles.logo, initial ? styles.initial : styles.updated, { flex: flexanim }]}
              source={require("../assets/images/logo.png")} />
          </Animated.View>
        </Animated.View>
        {/* -------------------------------------- top part ------------------------------------------ */}


        {/* -------------------------------- bottom part ------------------------------------------------- */}

        {/* <LinearGradient
          colors={["rgba(33, 34, 35, 0.4)", "rgba(25, 26, 27, 0.6)"]}
          locations={[0, 1]}
          // style={styles.box}
         
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }} > */}

        <Animated.View style={[styles.bottom, { height: bottomanim }]} >

          {wrongcredential && <Text style={styles.error1}>Invalid credentials</Text>}

          {isForm1Visible && (<View><Text allowFontScaling={false} style={styles.label}>Email / Username</Text>
            <Pressable
              onPress={() => {
                // console.log('====================================');
                // console.log("scroll");
                scrollContainer.current?.scrollTo({ y: 100, animate: true })
                // console.log('====================================');
              }}
            >
              <TextInput allowFontScaling={false}
                placeholderTextColor="#828282"
                style={styles.input}
                ref={emailInput}
                placeholder="xyz@gmail.com"
                value={email}
                onFocus={() => {
                  scrollContainer.current?.scrollTo({ y: 100, animate: true });
                }}
                autoComplete="email"
                onChangeText={(text) => { setemail(text) }}

              />
            </Pressable>
            {emailerror && <Text style={styles.error}>Please enter email address</Text>}
            <View style={styles.passwordcontainer}>
              <TextInput allowFontScaling={false}
                placeholderTextColor="#828282"
                style={styles.input2}
                placeholder="Password"
                value={password}
                autoComplete="password"
                onChangeText={(text) => { setpassword(text) }}
                secureTextEntry={true}
              />

              <Pressable onPress={() => navigation.navigate("FP1")} style={styles.forgot}>
                <Text allowFontScaling={false} style={[styles.white, styles.forgottext]}>Forgot ?</Text>
              </Pressable>
            </View>
            {passworderror && <Text style={styles.error}>Please enter password</Text>}
            {passworderror1 && <Text style={styles.error}>Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one number.</Text>}

            <Pressable style={styles.loginbutton} onPress={() => {
              handlelogin(navigation)
            }}>
              {!loading && <Text allowFontScaling={false} style={[styles.login]}>Login </Text>}
              {loading && <ActivityIndicator size={24} color="#fff" />}
            </Pressable>
            <Text allowFontScaling={false} style={[styles.white, styles.p]}>Or continue with</Text>
            <Pressable onPress={() => { showToastWithGravity("This functionality is yet to come!") }} style={styles.googlebutton}>
              <Image
                source={require("../assets/images/google.png")}
                style={styles.googleIcon}
              />
              <Text allowFontScaling={false} style={[styles.gray, styles.google]}>Google</Text>
            </Pressable>

            <Text allowFontScaling={false} style={[styles.gray, styles.p]}>
              Don't have account? <Text style={styles.green} onPress={() => {
                // setForm1Visible(false)  commented
                // animation2() commented
                showsignuppage("CommunityMember", navigation)

              }}>Create now</Text>
            </Text>
          </View>)}

          {!isForm1Visible && (

            <View>

              <Text allowFontScaling={false} style={[styles.newaccount]}>Create a new account as ?</Text>
              <Pressable onPress={() => {
                showsignuppage("Investor", navigation)
              }} style={styles.btn4}><Text allowFontScaling={false} style={[styles.btn4text, { fontFamily: "Alata" }]}>Investor</Text></Pressable>
              <Pressable onPress={() => {
                showsignuppage("Founder", navigation)
              }} style={styles.btn4}><Text allowFontScaling={false} style={styles.btn4text}>Founder</Text></Pressable>
              {/* <Pressable onPress={() => { showsignuppage("Freelancer", navigation) }} style={styles.btn4}><Text allowFontScaling={false} style={styles.btn4text}>Freelancer</Text></Pressable> */}
              <Pressable onPress={() => { showsignuppage("CommunityMember", navigation) }} style={styles.btn4}><Text allowFontScaling={false} style={styles.btn4text}>Community Member</Text></Pressable>
              <Text allowFontScaling={false} style={[styles.gray, styles.p]}>
                Don't know what to choose? <Text onPress={() => setattop(false)} style={styles.green}>Read more</Text>
              </Text>
            </View>


          )}

        </Animated.View>

        {/* </LinearGradient > */}



      </Animated.View>
      {/* <ReadMore1 attop={attop} setattop={setattop} animatedtop={animatedtop} /> */}

    </ScrollView>






  );
};


export default Login1;
