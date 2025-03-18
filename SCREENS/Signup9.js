// 2.4

import React, { useState, useRef, useEffect } from "react";
import {

    SafeAreaView,
    View,
    Text,
    TextInput,
    Image,
    Animated,
    Pressable,
    StyleSheet,
    StatusBar,
    Dimensions,
    ScrollView,
    FlatList,
    TouchableWithoutFeedback
} from "react-native";
// import { FlatList, ScrollView } from 'react-native-gesture-handler';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { LinearGradient } from "expo-linear-gradient";
import signup3styles from "../styles/signup3styles.js";
import Drop from "./dropdown.js";
import Line2 from "./line2.js";
import Line from "./line.js"
import Line3 from "./line3.js"
import Entypo from '@expo/vector-icons/Entypo';
// import { FlatList } from "react-native-gesture-handler";
import { useFocusEffect } from "expo-router";




const Signup9 = ({ navigation, route }) => {

    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181a")
        StatusBar.setBarStyle("light-content")
    })
    const [workexperience, setworkexperience] = useState([{ id: Date.now(), name: '', role: '', year: "" }]);

    const { type } = route.params || "Freelancer"
    const { form, image } = route.params;

    const [skills, setskills] = useState("")
    const [education1, seteducation] = useState("")
    const [eduerror, seteduerror] = useState(false)



    function nextpage(navigation, type) {

        console.log(education1);

        if (education1 == "") {
            console.log("hi");
            seteduerror(true);
            return;
        }


        for (var i = 0; i < workexperience.length; i++) {
            console.log(i);

            var items = workexperience[i];
            console.log(items);

            // Check if all fields are empty
            if (items.name == "" && items.role == "" && items.year == "") {
                // Do nothing or handle if needed
            }
            // Check if only `name` is filled
            else if (items.name != "" && items.role == "" && items.year == "") {
                var array = workexperience.map((w, index) => {
                    if (i == index) {
                        return { ...w, roleError: true, yearError: true };
                    } else return w;
                });
                console.log(array, "Role and Year missing");
                setworkexperience(array);
                return;
            }
            // Check if only `role` is filled
            else if (items.name == "" && items.role != "" && items.year == "") {
                var array = workexperience.map((w, index) => {
                    if (i == index) {
                        return { ...w, nameError: true, yearError: true };
                    } else return w;
                });
                console.log(array, "Name and Year missing");
                setworkexperience(array);
                return;
            }
            // Check if only `year` is filled
            else if (items.name == "" && items.role == "" && items.year != "") {
                if (isNaN(items.year) || items.year < 1950 || items.year > 2025) {
                    var array = workexperience.map((w, index) => {
                        if (i == index) {
                            return { ...w, yearError: true, yearInvalid: true };
                        } else return w;
                    });
                    console.log(array, "Year must be a number between 1950 and 2025");
                    setworkexperience(array);
                    return;
                }
                var array = workexperience.map((w, index) => {
                    if (i == index) {
                        return { ...w, nameError: true, roleError: true };
                    } else return w;
                });
                console.log(array, "Name and Role missing");
                setworkexperience(array);
                return;
            }
            // Check if any single field is missing or year is invalid
            else if (
                items.name == "" ||
                items.role == "" ||
                items.year == "" ||
                isNaN(items.year) ||
                items.year < 1950 ||
                items.year > 2025
            ) {
                var array = workexperience.map((w, index) => {
                    if (i == index) {
                        return {
                            ...w,
                            nameError: items.name == "",
                            roleError: items.role == "",
                            yearError: items.year == "",
                            yearInvalid: isNaN(items.year) || items.year < 1950 || items.year > 2025,
                        };
                    } else return w;
                });
                console.log(array, "Some fields missing or year invalid");
                setworkexperience(array);
                return;
            }
        }


        const final = new FormData();
        for (var items of form["_parts"]) {

            if (items[0] == "fullname" || items[0] == "password") continue;
            final.append(items[0], items[1]);
        }

        final.append("education", education1)
        final.append("skills", skills)

        var array = workexperience.map(({ id, name, ...items }) => {
            return {
                company: name,
                role: items.role,
                year: items.year
            }
        })
        final.append("previousWorkExperience", array)

        console.log(final);

        navigation.navigate("Signup10", { form: final, image: image })
    }
    var education = [
        { label: "10th", value: "10TH" },
        { label: "12th", value: "12th" },
        { label: "Graduate", value: "Graduate" },
        { label: "Post-Graduate", value: "Post-Graduate" },
        { label: "P.H.D", value: "P.H.D" },


    ]

    const [open, setOpen] = useState(false)
    const handleOutsideTouch = () => {
        if (open) {
            setOpen(false);
        }
    };


    // multiple certificate 



    function addworkexperience() {
        setworkexperience(
            [...workexperience, { id: Date.now(), name: '', role: '', year: '' }]
        )
    }
    function deleteworkexperience(index) {
        console.log(index);

        // setworkexperience(
        //     [...workexperience, { id: Date.now(), name: '', role: '', year: '' }]
        // )
        var update = [...workexperience]
        update.splice(index, 1)
        // var array = workexperience.splice(index, 1);
        setworkexperience(update)
    }

    function handleworkchange(id, field, value) {
        var array = workexperience.map((e) => {
            if (e.id === id) {
                return { ...e, [field]: value, yearError: false, roleError: false, nameError: false, yearInvalid: false }

            }
            else return { ...e, yearError: false, roleError: false, nameError: false, yearInvalid: false }
        })
        setworkexperience(array);
    }
    return (

        <SafeAreaView style={signup3styles.container}>
            <ScrollView nestedScrollEnabled={true}>
                <TouchableWithoutFeedback onPress={handleOutsideTouch}>
                    <View style={signup3styles.row}>
                        {/* top */}

                        <View style={signup3styles.top}>
                            <View style={signup3styles.left}>
                                <Image style={signup3styles.logo} source={require("../assets/images/logo.png")} />
                            </View>
                            <View style={signup3styles.right}>
                                <Line progresswidth={"55.5%"} />
                            </View>
                        </View>



                        {/* bottom */}

                        <View style={styles.bottom}>
                            <Text style={styles.t1}>Area of Expertise</Text>
                            <TextInput
                                allowFontScaling={false}
                                placeholder="Write any Top 3"
                                placeholderTextColor="#B8B8B8"
                                style={styles.input}
                                value={skills}
                                onChangeText={(text) => { setskills(text) }}
                            />
                            <Text style={[styles.t1, { marginBottom: 5 }]}>Education</Text>
                            <Text style={[styles.t2, { marginBottom: 20 }]}>List your highest degree achieved, which helps to establish your academic background and qualifications.</Text>
                            <Drop borderwidth={3}  borderColor={"#16181a"} 
                             items={education} open={open} setOpen={setOpen} onValueChange={(value) => {
                                seteduerror(false)
                                seteducation(value)}} nestedScrollEnabled={true} />

                            {eduerror && <Text style={styles.err1}>* please select a valid value</Text>}

                            {/* <Text style={styles.t1}>Education</Text>
                            <Text style={[styles.t2, { marginBottom: 20 }]}>List your highest degree achieved, which helps to establish your academic background and qualifications.</Text> */}

                            {/* <ScrollView style={{height : 200} }> */}
                            {/* <Drop items={education} open={open} setOpen={setOpen} onValueChange={seteducation} nestedScrollEnabled={true} /> */}
                            {/* </ScrollView> */}

                            <Text style={[styles.t1, { marginTop: 20 }]}>Previous Work Experience</Text>
                            <Text style={[styles.t2, { marginBottom: 20 }]}>Detail any relevant industry experience, particularly if you’ve worked in a specific company or held roles that have prepared you for your current venture.</Text>


                            {workexperience.map((we, index) => (
                                <View key={we.id} style={styles.certificate}>
                                    <Pressable onPress={addworkexperience}>
                                        <Entypo style={styles.plus} name="plus" size={24} color="#00DE62" />

                                        {/* <Entypo style={styles.minus} name="plus" size={24} color="#00DE62" /> */}
                                    </Pressable>
                                    {index > 0 && <Pressable onPress={() => { deleteworkexperience(index) }}>
                                        <FontAwesome6 name="trash" style={styles.minus} size={15} color="#00DE62" />
                                    </Pressable>}

                                    <TextInput
                                        allowFontScaling={false}
                                        placeholder="Company / Oragnisation"
                                        placeholderTextColor="#B8B8B8"
                                        style={[styles.input, { marginTop: 20, backgroundColor: "transparent" }]}
                                        value={we.name}
                                        onChangeText={(text) => { handleworkchange(we.id, "name", text) }}
                                    />
                                    {we.nameError && <Text style={styles.err}>* please enter company name</Text>}
                                    <TextInput
                                        allowFontScaling={false}
                                        placeholder="Role"
                                        placeholderTextColor="#B8B8B8"
                                        style={[styles.input , {marginTop : -3}]}
                                        value={we.role}
                                        onChangeText={(text) => { handleworkchange(we.id, "role", text) }}
                                    />
                                    {we.roleError && <Text style={styles.err}>* please enter your role</Text>}

                                    <TextInput
                                        allowFontScaling={false}
                                        placeholder="Year"
                                        placeholderTextColor="#B8B8B8"
                                        style={[styles.input , {marginTop : -3}]}
                                        value={we.year}
                                        onChangeText={(text) => { handleworkchange(we.id, "year", text) }}
                                    />
                                    {we.yearError && <Text style={styles.err}>* please enter year</Text>}
                                    {we.yearInvalid && <Text style={styles.err}>* please enter valid year</Text>}


                                </View>
                            ))}
                            <View style={styles.icons} nestedScrollEnabled={true}>
                                <Pressable onPress={() => {
                                    navigation.goBack()
                                    // console.log(workexperience);
                                }}><FontAwesome6 name="chevron-left" size={40} color="#00DF60" /></Pressable>
                                <Pressable onPress={() => { nextpage(navigation, type) }}><FontAwesome6 name="chevron-right" size={40} color="#00DF60" /></Pressable>
                            </View>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </SafeAreaView>

    )
}

export default Signup9;

const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;


const scalingfactor = Math.sqrt(a * b)
const styles = StyleSheet.create({
    t1: {
        textAlign: 'Left',
        marginLeft: 10,
        color: "#D9D9D9",
        fontFamily: 'Alata',
        fontSize: scalingfactor * 27,
        marginBottom: scalingfactor * 3,
        zIndex: 100,
        // pointerEvents: "none",
        // backgroundColor: 'red',
        width: "auto"
    },
    t2: {
        textAlign: 'Left',
        color: "#94A3B8",
        // fontFamily: 'Roboto',
        fontSize: scalingfactor * 13,
        zIndex: 100,
        marginBottom: scalingfactor * 8,
        width: "85%",
        fontSize : 12,
        alignSelf: "center",
    },
    bottom: {
        width: "100%",
        // height: height*0.85,
        backgroundColor : "rgba(33, 34, 35, 0.5)",
        // backgroundColor: "red",
        borderTopLeftRadius: 70,
        padding: height * 0.03,
        paddingTop: height * 0.06,
        // justifyContent: "center",
        alignContent: "center",
        padding: scalingfactor * 20,
        paddingTop: scalingfactor * 40,
        // overflow : "hidden",

    },
    icons: {

    }
    ,
    btn: {
        width: 168,
        height: 48,
        // height : scalingfactor*48,
        backgroundColor: "#00DF60",
        // padding: scalingfactor * 12,
        // marginVertical: height * 0.018,
        borderRadius: 20,
        // margin: "auto",
        // marginTop: scalingfactor * 20,
        shadowColor: 'rgba(0,0,0, 0.5)', // Shadow color
        shadowOffset: {
            width: 0, // x offset
            height: 5, // y offset
        },
        shadowOpacity: 1, // Full opacity for shadow effect
        shadowRadius: 1, // Blur radius
        elevation: 5,
        justifyContent: 'center',

    }, nexttext: {
        color: "#24272A",
        fontFamily: "Alata",
        fontSize: scalingfactor * 22,
        textAlign: "center",
        // lineHeight : 16
        marginTop: -4

    },
    input: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        marginTop: 0,
        borderBottomWidth: 3,
        paddingLeft: scalingfactor * 10,
        borderBottomColor: "#16181A",
        fontSize: scalingfactor * 20,
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 5,
        width: "92%",
        // fontFamily: "Roboto",
        // lineHeight: scalingfactor * 18,
        marginBottom: scalingfactor * 20
    }
    , icons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "92%",
        margin: "auto",
        marginTop: 20,
        marginBottom: 30
    },
    certificate: {
        padding: 4,
        paddingTop: 15,
        marginTop: 10,
        margin: "auto",
        width: "92%",
        backgroundColor: "transparent",
        borderWidth: 3,
        borderColor: "#16181A",
        borderRadius: 10,
        position: "relative"
    },
    plus: {
        position: "absolute",
        right: 5,
        top: -5,
        zIndex: 100
    },
    minus: {
        position: "absolute",
        right: 45,
        top: -3,
        zIndex: 100
    },
    err: {
        marginVertical: 0,
        marginTop: -20,
        marginBottom: 10,
        textAlign: "left",
        // backgroundColor : "red",
        width: "90%",
        marginHorizontal: "auto",
        color: "#E65858",
        fontSize: 12,
        fontFamily: "Roboto",
    },
    err1: {
        marginVertical: 0,
        marginTop: 0,
        marginBottom: 10,
        textAlign: "left",
        // backgroundColor : "red",
        width: "90%",
        marginHorizontal: "auto",
        color: "#E65858",
        fontSize: 12,
        fontFamily: "Roboto",
    }


})