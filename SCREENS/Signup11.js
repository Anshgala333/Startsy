// 2.4

import React, { useState, useRef, useEffect, useContext } from "react";
import {

    SafeAreaView,
    View,
    Text,
    TextInput,
    Image,
    Animated,
    Pressable,
    StyleSheet,
    Dimensions,
    ScrollView,
    StatusBar,
    FlatList,
    ActivityIndicator,
    TouchableWithoutFeedback
} from "react-native";
// import { FlatList, ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from "@react-native-async-storage/async-storage";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { LinearGradient } from "expo-linear-gradient";
import signup3styles from "../styles/signup3styles.js";
import Drop from "./dropdown.js";
import Line2 from "./line2.js";
import Line from "./line.js"
import Line3 from "./line3.js"
import Entypo from '@expo/vector-icons/Entypo';
import { useFocusEffect } from "expo-router";
import { GlobalContext } from "@/Global/globalcontext.js";
// import { FlatList } from "react-native-gesture-handler";
import { url } from "../config.js"



const Signup11 = ({ navigation, route }) => {



    const [token, settoken] = useState("")
    const { globaldata, updateField } = useContext(GlobalContext);
    const [loading, setloading] = useState(false)

    useEffect(() => {
        console.log(globaldata, "global data");
        settoken(globaldata.token)
    }, [])
    const type = "Founder"
    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181a")
        StatusBar.setBarStyle("light-content")
    })

    const { form, image } = route.params;






    async function finalsubmit() {




        for (var i = 0; i < teammember.length; i++) {
            console.log(i);

            var member = teammember[i];
            console.log(member);

            // Check if all fields are empty
            if (member.username === "" && member.name === "" && member.role === "") {
                // Do nothing or handle as needed
                console.log("All fields are empty for member at index", i);
                continue;
            }

            // Check if only `username` is filled
            if (member.username !== "" && member.name === "" && member.role === "") {
                var updatedTeam = teammember.map((t, index) => {
                    if (i === index) {
                        return { ...t, nameError: true, roleError: true };
                    } else return t;
                });
                console.log(updatedTeam, "Name and Role are missing");
                setteammember(updatedTeam);
                return;
            }

            // Check if only `name` is filled
            if (member.username === "" && member.name !== "" && member.role === "") {
                var updatedTeam = teammember.map((t, index) => {
                    if (i === index) {
                        return { ...t, usernameError: true, roleError: true };
                    } else return t;
                });
                console.log(updatedTeam, "Username and Role are missing");
                setteammember(updatedTeam);
                return;
            }

            // Check if only `role` is filled
            if (member.username === "" && member.name === "" && member.role !== "") {
                var updatedTeam = teammember.map((t, index) => {
                    if (i === index) {
                        return { ...t, usernameError: true, nameError: true };
                    } else return t;
                });
                console.log(updatedTeam, "Username and Name are missing");
                setteammember(updatedTeam);
                return;
            }

            // Check if any single field is missing
            if (member.username === "" || member.name === "" || member.role === "") {
                var updatedTeam = teammember.map((t, index) => {
                    if (i === index) {
                        return {
                            ...t,
                            usernameError: member.username === "",
                            nameError: member.name === "",
                            roleError: member.role === "",
                        };
                    } else return t;
                });
                console.log(updatedTeam, "Some fields are missing");
                setteammember(updatedTeam);
                return;
            }
        }




        const final = new FormData();
        for (var items of form["_parts"]) {

            if (items[0] == "fullname" || items[0] == "password") continue;
            if (items[0] == "previousWorkExperience") {
                final.append(items[0], JSON.stringify(items[1]));
                continue
            }
            // if (items[0] == "socialProof") {
            //     final.append(items[0], JSON.stringify(items[1]));
            //     continue
            // }
            final.append(items[0], items[1]);
        }


        if (image && image != "xyz") {
            final.append("profilePhoto", {
                uri: image,
                type: "image/jpeg",
                name: `image_${Date.now()}.jpg`,

            })
        }

        var array = teammember.map(({ id, username, ...rest }) => {
            return {
                ...rest,
                tag: username
            }

        })


        console.log(array);

        final.append("teamInfo", JSON.stringify(array));


        console.log(final);
        console.log(final.generalModelId);


        setloading(true)
        try {
            const response = await fetch(`${url}api/founderInfo`, {
                method: 'POST',
                body: final,
                headers: {
                    // accept: "application/json",
                    "Authorization": token,
                },
            });
            const data = await response.json();

            console.log(data);
            console.log(response.status);

            if (response.status == 200) {

                try {
                    await AsyncStorage.setItem('accessToken', data.newToken);
                    updateField("token", data.newToken);
                    console.log('Data saved successfully!');
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Main2" }],
                    });
                    // navigation.navigate("Main2")
                } catch (error) {
                    console.error('Error saving data:', error);
                }


            }
            else if (response.status == 555) {
                for (items of data.invalidTeamMates) {
                    teammember[items].tagerror = true;
                    setteammember(teammember)
                }

            }

        }
        catch (err) {
            console.log(err);

        }
        finally {
            setloading(false)
        }

        setloading(false)

        // navigation.navigate("Main2")

    }




    const handleOutsideTouch = () => {
        if (open) {
            setOpen(false);
        }
    };


    const [teammember, setteammember] = useState([{ id: Date.now(), username: '', name: '', role: "" }]);
    function addteammember() {

        console.log("hi");

        setteammember(
            [...teammember, { id: Date.now(), username: '', name: '', role: '' }]
        )
    }
    function deleteteammember(index) {
        console.log(index);

        const updatedTeamMembers = [...teammember];
        updatedTeamMembers.splice(index, 1);
        // console.log(ar1);

        setteammember(updatedTeamMembers)

    }
    function handleworkchange(id, field, value) {
        var array = teammember.map((e) => {
            if (e.id === id) {
                return { ...e, [field]: value, nameError: false, roleError: false, usernameError: false };

            }
            else return { ...e, roleError: false, usernameError: false, nameError: false }
        })
        setteammember(array);
    }

    let debounceTimeout;
    let status = true;

    async function getSuggestions(text) {

        // Clear the debounce timer
        clearTimeout(debounceTimeout);

        // Debounce API calls
        debounceTimeout = setTimeout(async () => {
            console.log(text);
            console.log({ "name": text });

            if (!status) return;

            status = false; // Prevent multiple concurrent calls

            try {
                const response = await fetch(`${url}api/getUserNameSuggestions/${text}`, {
                    method: 'GET',
                    headers: {
                        accept: "application/json",
                        "Authorization": token,
                    },
                });

                const data = await response.json();

                console.log(data);
                console.log(response.status);

                // Handle response (e.g., update suggestions state in UI)
            } catch (err) {
                console.error('Error fetching suggestions:', err);
            } finally {
                status = true; // Allow new requests
            }
        }, 1000); // Adjust debounce delay as needed
    }




    return (

        <SafeAreaView style={signup3styles.container}>
            <ScrollView nestedScrollEnabled={true}>
                <View style={signup3styles.row}>
                    {/* top */}

                    <View style={signup3styles.top}>
                        <View style={signup3styles.left}>
                            <Image style={signup3styles.logo} source={require("../assets/images/logo.png")} />
                        </View>
                        <View style={signup3styles.right}>
                            <Line progresswidth={"105.5%"} />
                        </View>
                    </View>



                    {/* bottom */}

                    <View style={styles.bottom}>
                        <Text style={styles.t1}>Team Information</Text>
                        {teammember.map((we, index) => (
                            <View key={we.id} style={styles.certificate}>
                                <Pressable onPress={addteammember}>
                                    <Entypo style={styles.plus} name="plus" size={24} color="#ccc" />
                                </Pressable>
                                {index > 0 && <Pressable onPress={() => { deleteteammember(index) }}>
                                    <FontAwesome6 name="trash" style={styles.minus} size={15} color="#ccc" />
                                </Pressable>}

                                <TextInput
                                    allowFontScaling={false}
                                    placeholder="@Username"
                                    placeholderTextColor="#828282"
                                    style={[styles.input, { marginTop: 20, backgroundColor: "transparent" }]}
                                    value={we.username}
                                    onChangeText={(text) => {
                                        // getSuggestions(text)
                                        handleworkchange(we.id, "username", text)
                                    }}
                                />
                                {we.usernameError && <Text style={styles.err}>please enter a valid username</Text>}
                                {we.tagerror && <Text style={styles.err}>* user not found</Text>}
                                <TextInput
                                    allowFontScaling={false}
                                    placeholder="Name"
                                    placeholderTextColor="#828282"
                                    style={styles.input}
                                    value={we.name}
                                    onChangeText={(text) => { handleworkchange(we.id, "name", text) }}
                                />
                                {we.nameError && <Text style={styles.err}>* please enter name</Text>}

                                <TextInput
                                    allowFontScaling={false}
                                    placeholder="Role"
                                    placeholderTextColor="#828282"
                                    style={styles.input}
                                    value={we.role}
                                    onChangeText={(text) => { handleworkchange(we.id, "role", text) }}
                                />
                                {we.roleError && <Text style={styles.err}>* please enter role</Text>}


                            </View>
                        ))}
                        <View style={styles.icons} nestedScrollEnabled={true}>
                            <Pressable style={{marginTop : 6}} 
                             onPress={() => {
                                navigation.goBack()
                                // console.log(workexperience);
                            }}><FontAwesome6 name="chevron-left" size={30} color="#00DF60" /></Pressable>
                            <Pressable style={styles.btn} onPress={() => { finalsubmit() }}>
                                {loading && <ActivityIndicator size={24} color="#16181a" />}
                                {!loading && <Text allowFontScaling={false} style={styles.nexttext}>Submit</Text>}
                            </Pressable>
                        </View>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default Signup11;

const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;


const scalingfactor = Math.sqrt(a * b)
const styles = StyleSheet.create({
    t1: {
        textAlign: 'center',
        marginLeft: 10,
        color: "#D9D9D9",
        fontFamily: 'Alata',
        fontSize: 24,
        marginBottom: scalingfactor * 3,
        zIndex: 100,
        // pointerEvents: "none",
        // backgroundColor: 'red',
        width: "auto"
    },
    t2: {
        textAlign: 'Left',
        color: "#828282",
        fontFamily: 'Roboto',
        fontSize: scalingfactor * 13,
        zIndex: -1,
        marginBottom: scalingfactor * 8,
        width: "85%",
        alignSelf: "center",
        lineHeight: scalingfactor * 16
    },
    bottom: {
        width: "100%",
        // height: height*0.85,
        // backgroundColor: "#24272A",
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
        minHeight: height * 0.85

    },
    icons: {

    }
    ,
    btn: {
        width: 140,
        height: 40,
        backgroundColor: "#00DF60",

        borderRadius: 20,

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
        fontSize:  20,
        textAlign: "center",
        // lineHeight : 16
        marginTop: -4

    },
    input: {
        backgroundColor: "transparent",
        margin: scalingfactor * 12,
        marginTop: 0,
        borderBottomWidth: 1,
        paddingLeft: scalingfactor * 10,
        borderBottomColor: "#ccc",
        fontSize:  20,
        color: "#828282",
        paddingBottom: scalingfactor * 4,
        width: "92%",
        fontFamily: "Alata",
        // lineHeight: scalingfactor * 12,
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
        // height : 194,
        paddingTop: 12,
        marginTop: 10,
        margin: "auto",
        width: "92%",
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#ccc",
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
    }


})