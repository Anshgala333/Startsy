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
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    BackHandler

} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { url } from "../config.js"

// import CalendarPicker from "react-native-calendar-picker";
import Profile from "../assets/icons/profile.js"
import Drop from "./dropdown.js";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
// import { LinearGradient } from "expo-linear-gradient";
import signup3styles from "../styles/signup3styles.js";
import s5 from "../styles/s5.js";
import { BlurView } from "expo-blur";
import { LinearGradient } from 'expo-linear-gradient';
import Line from "./line.js";
// import Line2 from "./line2.js";
import Line3 from "./line3.js";
import Line2 from "./line2.js";
import Devi from "./Devi.js"


import * as DocumentPicker from 'expo-document-picker';

import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { GlobalContext } from "@/Global/globalcontext.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Signup5 = ({ navigation, route }) => {



    const [token, settoken] = useState("")
    const { globaldata, updateField } = useContext(GlobalContext);

    // useEffect(() => {
    //     console.log(globaldata, "global data");
    //     settoken(globaldata.token)
    // }, [])
    useEffect(() => {
        async function getToken() {
            const temp = await AsyncStorage.getItem("accessToken");
            updateField("token", temp);
            settoken(temp);
            // console.log(temp, "yeh temp hai from signup 5");
            // console.log(globaldata.token, "yeh globally saved me se aa raah");
            // console.log(globaldata.token, "yeh globally saved me se aa raah");

        }
        getToken();
    }, []);


    const { type, id, useremail , email } = route.params
    // console.log(route.params);
    // console.log('====================================');
    // console.log(type);
    // console.log(id);
    // console.log('====================================');

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [skip, setSkip] = useState(false);
    const [filtereddate, setfiltereddate] = useState("Enter your DOB");

    const [fullname, setfullname] = useState("")
    // const [email, setemail] = useState("")
    const [country, setcountry] = useState("")
    const [number, setnumber] = useState("")
    const [age, setage] = useState("")
    const [gender, setgender] = useState("")
    const [image, setImage] = useState("xyz");

    const [errors, setErrors] = useState({}); // Error state

    const validateForm = () => {
        const newErrors = {};

        // Fullname validation
        if (!fullname.trim()) {
            newErrors.fullname = "* Full name is required.";
        }

        // Email validation
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!email.trim()) {
        //     newErrors.email = "* Email is required.";
        // } else if (!emailRegex.test(email)) {
        //     newErrors.email = "* Enter a valid email address.";
        // }

        // Country validation
        // if (!country.trim()) {
        //     newErrors.country = "* Please select a country.";
        // }

        // Phone number validation (10 digits only)
        const numberRegex = /^\d{10}$/;
        if (!number.trim()) {
            newErrors.number = "* Phone number is required.";
        } else if (!numberRegex.test(number)) {
            newErrors.number = "* Phone number must be 10 digits.";
        }

        // Age validation (must be between 18 and 100)
        // const ageNumber = parseInt(age, 10);
        // if (!age.trim()) {
        //     newErrors.age = "* Age is required.";
        // } else if (isNaN(ageNumber) || ageNumber < 18 || ageNumber > 100) {
        //     newErrors.age = "* Age must be between 18 and 100.";
        // }

        // Gender validation
        // if (!gender.trim()) {
        //     newErrors.gender = "* Gender is required.";
        // }

        // Image validation
        // if (image === "xyz") {
        //     newErrors.image = "* Profile picture is required.";
        // }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = () => {
        if (validateForm()) {
            // Proceed to the next page if no errors
            nextpage(navigation, type);
        }

        // nextpage(navigation, type);

    };





    const formData = new FormData();
    formData.append("generalModelId", id)
    formData.append("fullName", fullname)
    // formData.append("password", password)
    formData.append("fullname", fullname)
    formData.append("email", email)
    formData.append("country", country)
    formData.append("contactInfo", number)
    formData.append("age", JSON.stringify(date))
    formData.append("gender", gender)



    const rotateValue = useRef(new Animated.Value(0)).current;
    const [rotated, setRotated] = useState(true);
    const [inputLayout, setInputLayout] = useState({ height: 0, y: 0 });
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [afterinput, setafterinput] = useState(0)
    const [message, setmessage] = useState("")
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(false)



    const countries = ["United States", "Canada", "Australia", "India", "Japan"];
    const myElementRef = useRef(null);
    const handleRotate = () => {
        myElementRef.current.measure((x, y, width, height, pageX, pageY) => {
            // console.log(x, y, width, height, pageX, pageY);
            const value = pageY
            setafterinput(value)
            setDropdownVisible(!dropdownVisible);
            // console.log(afterinput);
            setRotated(!rotated);
        });
    };

    useEffect(() => {
        Animated.timing(rotateValue, {
            toValue: rotated ? 0 : 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [rotated])

    const rotation = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"],
    });

    const handleCountrySelect = (country) => {
        setcountry(country)
        setRotated(!rotated);
        setDropdownVisible(false);
    };



    const fileupload = async () => {

        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        // Launch the image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Allow all media types
            allowsEditing: true, // Allows cropping the image
            aspect: [1, 1], // Aspect ratio of the image
            quality: 1, // Image quality (0 to 1)

        });


        if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            setImage(imageUri);

        }

    }


    async function sendtobackend() {
        try {

            const response = await fetch('http://192.168.1.7:9000/userimg', {
                method: 'POST',
                body: formData,
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            });

            // Check if the response is okay
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            // console.log(data); // Log the response from the server
        } catch (error) {
            console.error('Error uploading image:', error); // Handle the error
        }
    }


    function renderline() {
        if (type === "Investor" || type === "Founder") {
            return <Line progresswidth={"31.5%"} />;
        } else if (type === "Freelancer") {
            return <Line3 progresswidth={"39%"} />;
        } else {
            // return <Line3 progresswidth={"39%"} />;
            return <Line3 progresswidth={"39.5%"} />;
        }
    }

    // useEffect(() => {
    //     const setStatusBar = () => {
    //         StatusBar.setBackgroundColor("#16181A"); // Set your desired color
    //         StatusBar.setBarStyle("light-content");
    //     };


    //     setStatusBar();
    //     setTimeout(() => {
    //         setStatusBar()
    //     }, 0);
    // }, [])



    // useEffect(() => {
    //     const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    //         // navigation.pop(2)
    //         // navigation.goBack()
    //         // navigation.replace("Main2" , {focus : "Message"})
    //         BackHandler.exitApp()


    //         return true;
    //     });

    //     return () => backHandler.remove();
    // }, []);

    async function getdata() {
        try {
            const response = await fetch(`${url}api/getProfiledetailForSwitch`, {
                method: 'GET',
                headers: {
                    accept: "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            // console.log(data.data.age , "ikkkkkk");
            // console.log(JSON.parse(data.data.age));
            var tempdate = new Date(JSON.parse(data.data.age)).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            })
            // console.log(tempdate);



            setfullname(data.data.fullName)
            // setemail(data.data.email)
            setcountry(data.data.country)
            setnumber(data.data.contactInfo)
            // setDate(tempdate)
            setfiltereddate(tempdate)
            setgender(data.data.gender)
            setImage(data.profilePhoto)
        }
        catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        getdata()
    }, [token])





    async function nextpage(navigation, type) {
        // console.log(type);

        // console.log(token);

        // console.log(formData, "final");
        // console.log(date);

        // setDate(JSON.stringify(date)) 
        // console.log(typeof date);




        if (email == useremail) {

        }
        else {


            // try {
            //     const response = await fetch(`${url}api/checkemail`, {
            //         method: 'POST',
            //         body: JSON.stringify({ "email": email }),
            //         headers: {
            //             "Content-Type": "application/json",
            //             accept: "application/json",
            //             "Authorization": `Bearer ${token}`,
            //         },
            //     });
            //     const data = await response.json();
            //     // setloading(false)
            //     // console.log(data);
            //     // console.log(response.status);

            //     if (response.status === 400) {
            //         setEmailUniqueError(true);
            //         return
            //     }
            // }
            // catch (err) {

            // }
            // finally {

            // }

        }

        console.log(image == "xyz");
        if(image == "xyz"){
            console.log("no image ");
            
            
        }
        




        if (type === "CommunityMember") {
            // console.log(formData, "signup 6 pe ja raha hu");
            // sendtobackend()
            navigation.navigate("Signup6", { form: formData, image: image })
            // navigation.navigate("Signup6", { form: formData , image });
        }
        else if (type == "Freelancer") {
            navigation.navigate("Signup7", { form: formData, image: image })
        }
        else if (type == "Founder") {
            navigation.navigate("Signup9", { form: formData, image: image })
        }
        else if (type == "Investor") {
            navigation.navigate("Signup12", { form: formData, image: image })
        }





    }

    // const [open, setOpen] = useState(false);
    const [open11, setOpen11] = useState(false);
    const [EmailUniqueError, setEmailUniqueError] = useState(false);


    const handleOutsideTouch = () => {
        if (dropdownVisible) {
            setDropdownVisible(false);
        }

    };

    var country1 = [
        { label: "India", value: "INDIA" },
        { label: "United States", value: "UNITED_STATES" },
        { label: "Canada", value: "CANADA" },
        { label: "United Kingdom", value: "UNITED_KINGDOM" },
        { label: "Australia", value: "AUSTRALIA" },
        { label: "Singapore", value: "SINGAPORE" },
        { label: "Indonesia", value: "INDONESIA" },
        { label: "Vietnam", value: "VIETNAM" },
        { label: "Malaysia", value: "MALAYSIA" },
        { label: "UAE", value: "UAE" },
        { label: "Saudi Arabia", value: "SAUDI_ARABIA" },
        { label: "Israel", value: "ISRAEL" },
        { label: "Nigeria", value: "NIGERIA" },
        { label: "South Africa", value: "SOUTH_AFRICA" },
        { label: "Brazil", value: "BRAZIL" },
        { label: "Mexico", value: "MEXICO" },
        { label: "Others (Type)", value: "OTHERS" },

    ]
    // const onChange = (event, selectedDate) => {
    //     setShow(Platform.OS === 'ios'); // For iOS, keep picker open
    //     if (selectedDate) {
    //         setDate(selectedDate);

    //     }
    // };

    const genderlist = [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" },
    ]
    // const [open , setOpen] = useState(true)
    // function seteducation() {
    //     // console.log("education");
    // }

    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181a")
        StatusBar.setBarStyle("light-content")
    })
    const [open, setOpen] = useState(false)


    function givemedate(date) {
        // console.log(date);
        // console.log(date == new Date());
        if (typeof date == "string") {
            // console.log("date hi nai hai");
            return "Enter your DOB"
        }


        // console.log("transfrom");
        if (typeof date == "object") {
            const messageDate1 = date.toLocaleDateString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            });

            // console.log(messageDate1);
            return messageDate1
        }


    }

    function check() {
        if (fullname == "" && email == "" && number == "" && image == "xyz" && gender == "" && age == "") {
            setSkip(false)
        }
        else if (fullname != "" && email != "" && number != "" && image != "xyz") {
            setSkip(true)
        }
        else setSkip(false)
    }

    return (


        // <TouchableWithoutFeedback onPress={()=>{
        //     setOpen(false)
        // }}>
        <SafeAreaView
            style={{ flex: 1, backgroundColor: "#16181a" }}>
            <ScrollView nestedScrollEnabled={true} style={[{ flex: 1, backgroundColor: "#16181a", paddingBottom: 0, paddingBottom: 0 }, signup3styles.container]}>
                {/* <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={0} extraScrollHeight={0} enableAutomaticScroll={true} style={signup3styles.container}> */}
                {/* <ScrollView style={signup3styles.row}> */}
                <Devi show={show} setShow={setShow} date={date} setDate={setDate} filtereddate={filtereddate} setfiltereddate={setfiltereddate} />


                {/* Top Section */}
                <View style={signup3styles.top}>
                    <View style={signup3styles.left}>
                        <Image style={signup3styles.logo} source={require("../assets/images/logo.png")} />
                    </View>
                    <View style={signup3styles.right}>
                        {renderline()}
                    </View>
                </View>




                {/* Bottom Section */}
                <ScrollView nestedScrollEnabled={true} style={s5.bottom}>
                    <View style={{ paddingBottom: 10, flex: 1, borderTopLeftRadius: 100 }}>
                        <Pressable onPress={fileupload}>
                            {image != "xyz" ? (
                                <Image style={styles.img} source={{ uri: image }} />
                            ) : (
                                // <Image style={styles.img1} source={require("../assets/images/User_light.png")} />
                                <Profile />
                            )}
                        </Pressable>
                        <Text style={s5.t1}>Upload a profile picture </Text>
                        {errors.image && <Text style={[styles.errorText, { textAlign: "center" }]}>{errors.image}</Text>}
                        <View style={{ marginTop: 30 }}>
                            <TextInput
                                allowFontScaling={false}
                                placeholder="Full name *"
                                placeholderTextColor="#B8B8B8"
                                style={s5.input}
                                value={fullname}
                                onChangeText={(text) => {
                                    check()
                                    setfullname(text)
                                }}
                            />
                            {errors.fullname && <Text style={styles.errorText}>{errors.fullname}</Text>}
                            {/* <TextInput
                                allowFontScaling={false}
                                placeholder="Email address *"
                                placeholderTextColor="#B8B8B8"
                                style={[s5.input, { marginBottom: 12, marginTop: 0 }]}
                                value={email}
                                onChangeText={(text) => {
                                    check()
                                    setemail(text)
                                }}
                            /> */}
                            {/* <CalendarPicker  /> */}
                            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                            {EmailUniqueError && <Text style={styles.errorText}>*Email ID already registered.</Text>}

                            {/* <View>
                                        <Pressable onPress={handleRotate}>
                                            <TextInput
                                                ref={myElementRef}
                                                allowFontScaling={false}
                                                placeholder="Country"
                                                placeholderTextColor="#B8B8B8"
                                                style={s5.input}
                                                value={country}
                                                editable={false} // Disable keyboard input
                                                onLayout={(event) => {
                                                    const { height, y } = event.nativeEvent.layout;
                                                    console.log(height, y, "cooordd");
                                                    setInputLayout({ height, y });
                                                }}
                                            />
                                        </Pressable>

                                        <Pressable style={s5.dropdown} onPress={handleRotate}>
                                            <Animated.View
                                                style={[{ transform: [{ rotate: rotation }] }]}
                                            >
                                                <FontAwesome6
                                                    name="chevron-down"
                                                    size={20}
                                                    color="#00DF60"
                                                />
                                            </Animated.View>
                                        </Pressable>
                                    </View> */}

                            <Drop bb={3} borderColor={"#16181a"} bradius={0} items={country1} pccolor={"#ccc"} width={"94%"} open={open} placeholder={country} setOpen={setOpen} onValueChange={(e) => {
                                check()
                                setcountry(e)
                            }} nestedScrollEnabled={true} extra={true} />
                            {errors.country && <Text style={styles.errorText}>{errors.country}</Text>}



                            <TextInput


                                allowFontScaling={false}
                                placeholder="Phone number *"
                                placeholderTextColor="#B8B8B8"
                                style={[s5.input, { marginTop: 14 }]}
                                value={number}
                                onChangeText={(text) => {
                                    check()
                                    setnumber(text)
                                }}
                            />
                            {errors.number && <Text style={styles.errorText}>{errors.number}</Text>}
                            <Pressable onPress={() => {
                                console.log("opening date");
                                setShow(true)
                                setShow(true)
                                setShow(true)
                                setShow(true)
                            }}>
                                {/* <Text> {JSON.stringify(date)}</Text> */}
                                <TextInput
                                    readOnly={true}

                                    allowFontScaling={false}
                                    placeholder="Age (Years)"
                                    placeholderTextColor="#B8B8B8"
                                    style={[s5.input, { marginBottom: 10, marginTop: 0 }]}
                                    value={filtereddate}
                                    onChangeText={(text) => {
                                        check()
                                        setage(text)
                                    }}
                                />
                            </Pressable>



                            {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}
                            {/* <TextInput
                                allowFontScaling={false}
                                placeholder="Gender"
                                placeholderTextColor="#B8B8B8"
                                style={s5.input}
                                value={gender}
                                onChangeText={(text) => { setgender(text) }}
                            /> */}
                            <Drop bb={3} borderColor={"#16181a"} bradius={0} pccolor={"#ccc"} width={"94%"} up={true} placeholder={gender} items={genderlist} open={open11} setOpen={setOpen11}
                                onValueChange={(e) => {
                                    check()
                                    setgender(e)
                                }} nestedScrollEnabled={true} extra={true} gender={true} />

                            {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}

                            <View style={s5.icons}>
                                <Pressable onPress={() => {
                                    // BackHandler.exitApp()

                                    // navigation.goBack()

                                }}><FontAwesome6 name="chevron-left" size={40} color="#00DF60" /></Pressable>
                                {skip && <Pressable style={s5.btn} onPress={() => { handleSubmit() }}>
                                    <Text allowFontScaling={false} style={styles.nexttext}>Skip</Text>
                                    {/* <FontAwesome6 name="chevron-right" size={40} color="#00DF60" /> */}
                                </Pressable>}
                                {!skip && <Pressable onPress={() => { handleSubmit() }}>
                                    {/* <Text allowFontScaling={false} style={styles.nexttext}>Skip</Text> */}
                                    <FontAwesome6 name="chevron-right" size={40} color="#00DF60" />
                                </Pressable>}

                            </View>

                        </View>


                    </View>

                </ScrollView>

                {/* </ScrollView> */}
                {/* </KeyboardAwareScrollView> */}
            </ScrollView>
        </SafeAreaView>
        // </TouchableWithoutFeedback>


    );


};





export default Signup5;

const { height, width } = Dimensions.get("window");
const scalingFactor = Math.sqrt((width / 360) * (height / 800));

const styles = StyleSheet.create({
    progress: {
        position: "absolute",
        left: -5,
        borderWidth: 0.2,
        width: "56.5%",
        backgroundColor: "transparent",
        height: 14,
        top: -5,
        opacity: 1,
        borderRadius: 20,
    },
    img1: {
        margin: "auto",
        width: 113,
        height: 120,
        borderRadius: 100
    },
    img: {
        margin: "auto",
        width: 113,
        height: 113,
        borderRadius: 100
    },
    errorText: {
        color: "#E65858",
        // fontFamily: "Roboto",
        fontSize: 12,
        marginTop: -8,
        width: "92%",
        marginHorizontal: "auto"
    },
    nexttext: {
        color: "#24272A",
        fontFamily: "Alata",
        fontSize: 18,
        textAlign: "center",
        // lineHeight : 16
        marginTop: -4

    },
});
