


import React, { useState, useRef, useEffect, useMemo, useContext, useCallback, memo } from "react";
import * as Application from 'expo-application';
import {
    View, Text, Animated, Pressable, StyleSheet, StatusBar, Dimensions, TouchableWithoutFeedback, BackHandler,
    TouchableOpacity,
    Modal,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Scroll from "./Scroll.js"
import JobpostPage from "./JobPost.js"
import Question from "./Question.js"

const { width } = Dimensions.get('window');
import { Skeleton } from 'moti/skeleton';
import { MotiView } from 'moti';

import styles from "../../styles/post.js"
import main from "../../styles/main.js"
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFocusEffect, useNavigation } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { GlobalContext } from "@/Global/globalcontext.js";
import Community from "./SeperateCommunity.js"
import { url } from "../../config.js"
import { jwtDecode } from "jwt-decode";
import Startsy from "../main-1/Startsy.js";
const Foryou =
    ({ scroll, settype, token, mainpagebottomsheet, opencomment, openshare, visible, setVisible, setnewaspect, setImage }) => {

        // console.log("for you re render");


        useFocusEffect(() => {
            // console.log('for you 1 focused');

            return () => {
                // console.log('for you 1 blurred'); // This fires when switching screens
            };
        });



        // useEffect(() => {
        //     console.log("scroll of parent page re render");
        // }, [scroll,Tab,settype,getpost,scrollY,token,mainpagebottomsheet,opencomment,setVisible,openshare,visible,setnewaspect])
        // // useEffect(() => {
        // // 
        // //     console.log("globaldata of parent page re render");
        // // 
        // // }, [globaldata])
        // useEffect(() => {
        //     // console.log("settype of parent page re render");
        // }, [settype])
        // useEffect(() => {
        //     // console.log("getpost of parent page re render");
        // }, [getpost])
        // useEffect(() => {
        //     // console.log("scrolly of parent page re render");
        // }, [scrollY])
        // useEffect(() => {
        //     // console.log("token of parent page re render");
        // }, [token])
        // useEffect(() => {
        //     // console.log("mainpagebottomsheet of parent page re render");
        // }, [mainpagebottomsheet])
        // useEffect(() => {
        //     // console.log("opencomment of parent page re render");
        // }, [opencomment])
        // useEffect(() => {
        //     // console.log("setVisible of parent page re render");
        // }, [setVisible])
        // useEffect(() => {
        //     // console.log("openshare of parent page re render");
        // }, [openshare])
        // useEffect(() => {
        //     // console.log("visible of parent page re render");
        // }, [visible])
        // useEffect(() => {
        //     // console.log("setnewaspect of parent page re render");
        // }, [setnewaspect])
        // useEffect(() => {
        //     // console.log("setImage of parent page re render");
        // }, [setImage])
        // useEffect(() => {
        //     console.log("allpost of parnet page re render");
        // }, [allpost])
        // useEffect(() => {
        //     // console.log("loggedinUserID parent page re render");
        // }, [loggedinUserID])
        // useEffect(() => {
        //     // console.log("skeleton re parent page render");
        // }, [skeleton])

        // useEffect(() => {
        //     // console.log(", re render");
        // }, [,])
        // useEffect(() => {
        //     // console.log("openbottomsheet re render");
        // }, [openBottomSheet])
        // useEffect(() => {
        //     // console.log("tab re render");
        // }, [Tab])


        const navigation = useNavigation()
        const [allpost, setallpost] = useState([])
        const [ActiveTab, setActiveTab] = useState()
        // const memoizedAllPost = useMemo(() => allpost, [allpost]);

        const [loggedinUserID, setloggedInuserID] = useState("")
        const [loggedinRole, setrole] = useState("")



        useEffect(() => {
            if (token != "") {
                const decode = jwtDecode(token);
                setloggedInuserID(decode._id)
                setrole(decode.role)
                // console.log(decode.role);

            }
        }, [token])

        const [skeleton, setskeletonloading] = useState(false)
        const { globaldata, updateField } = useContext(GlobalContext);


        const getpost = useCallback(async () => {
            setskeletonloading(true)
            try {
                setskeletonloading(true)
                const response = await fetch(`${url}posts/getPosts`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
                const data = await response.json();

                var decode = jwtDecode(token)
                var loggedinUserID = decode._id



                var data1 = data.data.map(e => {


                    var object = { ...e, isliked: e.likedBy.includes(loggedinUserID), Applied: e.communityPost ? e.communityPost.communityMembers.includes(loggedinUserID) : false, Jobapplied: e.jobPosts ? e.jobPosts.jobApplicants.includes(loggedinUserID) : false, itemlikedcount: e.likedBy.length , issaved : !data.bookmarks.includes(e._id) }


                    return object
                })


                if (data.data.length > 0) {

                    setallpost(data1)
                    updateField("allpost", data1.reverse())
                }

            }
            catch (err) {
            }
            finally {
                setTimeout(() => {
                    setskeletonloading(false)
                }, 0);
            }
        }, [token])

        useEffect(() => {

            if (token != "" && token != null && token != undefined) {
                getpost()
            }

        }, [token])

        const openBottomSheet = () => {
            mainpagebottomsheet.current?.expand();
            
        }



        // const scrollY = new Animated.Value(0);
        const scrollY = useRef(new Animated.Value(0)).current;


        const diffclamp1 = Animated.diffClamp(scrollY, 0, 100);
        const translateY = diffclamp1.interpolate({
            inputRange: [0, 100],
            outputRange: [0, -100],
            extrapolate: "clamp",
        })

        const diffclamp = Animated.diffClamp(scrollY, 0, 70);
        const scale = diffclamp.interpolate({
            inputRange: [0, 10, 70],
            outputRange: [1, 1, 0],
            // extrapolate: "clamp",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })



        const CustomAlert = ({ visible, onClose }) => {
            const fadeAnim = useRef(new Animated.Value(0)).current; // Persistent animated value

            useEffect(() => {
                if (visible) {
                    Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
                } else {
                    Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => {
                        if (typeof onClose === "function") {
                            onClose(); // Ensure onClose exists before calling
                        }
                    });
                }
            }, [visible]);

            if (!visible) return null; // Prevent rendering when not visible



            return (
                <Modal transparent visible={visible} animationType="none" onRequestClose={() => onClose?.()}>
                    <TouchableWithoutFeedback onPress={() => onClose?.()}>
                        <Animated.View style={[styles1.overlay, { opacity: fadeAnim }]}>
                            {/* <TouchableWithoutFeedback> */}
                            <View style={styles1.alertBox}>
                                <Text style={styles1.title}>Choose aspect ratio</Text>

                                <TouchableOpacity onPress={() => {
                                    setnewaspect("4/3")
                                    fileupload([4, 3])
                                }} style={styles1.button}>
                                    <Text style={styles1.buttonText}>4:3 (Standard)</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    setnewaspect("16/9")
                                    fileupload([16, 9])
                                }} style={styles1.button}>
                                    <Text style={styles1.buttonText}>16:9 (Wide)</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    setnewaspect("1/1")
                                    fileupload([1, 1])
                                }} style={styles1.button}>
                                    <Text style={styles1.buttonText}>1/1 (Square)</Text>
                                </TouchableOpacity>
                            </View>
                            {/* </TouchableWithoutFeedback> */}
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </Modal>
            );
        };

        const fileupload = async (aspect) => {

            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (permissionResult.granted === false) {
                alert("Permission to access camera roll is required!");
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: aspect,
                quality: 1,

            });


            if (!result.canceled) {
                const imageUri = result.assets[0].uri;


                var type1;
                setImage(imageUri); // Set the selected image URI

                if (result.assets[0].type == "image") {

                    settype("photo")
                    type1 = "photo"
                }
                else {
                    settype(result.assets[0].type)

                    type1 = result.assets[0].type

                }



                setVisible(false);
                navigation.navigate("Mediapage", { type: type1, aspectRatio: `${aspect[0] / aspect[1]}`, uri: imageUri })


            }

        }

        const Tab = createMaterialTopTabNavigator();

        return (
            <Animated.View style={{ flex: 1, position: "absolute", height: "100%", width: "100%" }}>
                <CustomAlert visible={visible} onClose={() => setVisible(false)} />
                <Animated.View style={{
                    position: "absolute",
                    top: 0,
                    width: "100%",
                    backgroundColor: "#16181a",
                    zIndex: 100,
                    transform: [{ translateY: translateY }]

                }}>
                    <Text allowFontScaling={false} style={main.headertext}>Startsy</Text>
                    {/* <Text allowFontScaling={false} style={main.headertext}> <Text>App Version: {Application.nativeApplicationVersion}</Text></Text> */}
                    
                    {/* {loggedinRole == "Investor" && <Pressable
                        onPress={() => {

                            console.log("going to cards list");
                            navigation.navigate("StartsyCard", { token: token })

                        }}

                        style={styles1.job1}>
                        <Text style={styles1.jobtext}>Cards</Text>
                    </Pressable>} */}
                </Animated.View>

                <View style={{ flex: 1, height: "100%", minHeight: 500 }}>
                    <Tab.Navigator
                        initialRouteName="Connections"



                        screenOptions={({ route }) => ({
                            swipeEnabled: loggedinRole != "Investor",
                            unmountOnBlur: false,
                            freezeOnBlur: true,

                            // lazy: true,
                            // lazyPlaceholder: () => null,
                            // shifting: true,
                            // animationEnabled: true,
                            // tabBarScrollEnabled : true,
                            tabBarStyle: {
                                backgroundColor: "#16181a",
                                justifyContent: "space-between",
                                display: "flex",
                                position: "absolute",
                                width: "100%",
                                top: 45,
                                transform: [{ translateY: translateY }],
                                margin: "auto",
                                elevation: 0,
                            },
                            tabBarIndicatorStyle: {
                                backgroundColor: "#00DE62",
                                height: 1,
                            },


                        })}
                    >
                        <Tab.Screen
                            name="Connections"
                            // children={Test1}
                            listeners={({ navigation, route }) => ({
                                tabPress: (e) => {
                                    console.log("Tab Pressed:", route.name); // ✅ Should log tab name
                                    setActiveTab(route.name); // ✅ Updates state when tab is pressed
                                },
                            })}
                            children={(props) => <Scroll allpost={allpost} scroll={scroll} setallpost={setallpost} opencomment={opencomment} openshare={openshare} getpost={getpost} scrollY={scrollY} navigation={navigation} setskeletonloading={setskeletonloading} skeleton={skeleton} />}
                            options={{
                                lazy: false,
                                unmountOnBlur: false,
                                freezeOnBlur: true,
                                tabBarLabel: ({ focused }) => (
                                    <View>
                                        <Text allowFontScaling={false} style={[
                                            styles1.tabbarpill, {
                                                color: focused ? "#00DE62" : "#808080",
                                                borderColor: focused ? "#00DE62" : "#808080",
                                            }
                                        ]}> Media
                                        </Text>
                                    </View>
                                ),

                            }}
                        />

                        <Tab.Screen
                            listeners={({ navigation, route }) => ({
                                tabPress: (e) => {
                                    console.log("Tab Pressed:", route.name); // ✅ Should log tab name
                                    setActiveTab(route.name); // ✅ Updates state when tab is pressed
                                },
                            })}

                            name="Q&A"
                            // component={Test2}
                            children={(props) => <Question allpost={allpost} setallpost={setallpost} getpost={getpost} scrollY={scrollY} navigation={navigation} />}
                            options={{
                                unmountOnBlur: false,
                                freezeOnBlur: true,
                                tabBarLabel: ({ focused }) => (
                                    <Text allowFontScaling={false} style={[
                                        styles1.tabbarpill, {
                                            color: focused ? "#00DE62" : "#808080",
                                            borderColor: focused ? "#00DE62" : "#808080",
                                        }
                                    ]}> Q&A
                                    </Text>
                                ),

                            }}
                        />
                        <Tab.Screen
                            listeners={({ navigation, route }) => ({
                                tabPress: (e) => {
                                    console.log("Tab Pressed:", route.name); // ✅ Should log tab name
                                    setActiveTab(route.name); // ✅ Updates state when tab is pressed
                                },
                            })}

                            name="Forums"
                            // component={Test2}
                            children={(props) => <Community allpost={allpost} setallpost={setallpost} getpost={getpost} scrollY={scrollY} navigation={navigation} />}
                            options={{
                                unmountOnBlur: false,
                                freezeOnBlur: true,
                                tabBarLabel: ({ focused }) => (
                                    <Text allowFontScaling={false} style={[
                                        styles1.tabbarpill, {
                                            color: focused ? "#00DE62" : "#808080",
                                            borderColor: focused ? "#00DE62" : "#808080",
                                        }
                                    ]}> Forums
                                    </Text>
                                ),

                            }}
                        />

                        {loggedinRole != "Investor" && <Tab.Screen
                            listeners={({ navigation, route }) => ({
                                tabPress: (e) => {
                                    console.log("Tab Pressed:", route.name); // ✅ Should log tab name
                                    setActiveTab(route.name); // ✅ Updates state when tab is pressed
                                },
                            })}

                            name="Job"
                            // component={Test3}
                            children={(props) => <JobpostPage allpost={allpost} setallpost={setallpost} getpost={getpost} scrollY={scrollY} navigation={navigation} />}
                            options={{
                                unmountOnBlur: false,
                                freezeOnBlur: true,
                                tabBarLabel: ({ focused }) => (
                                    <Text allowFontScaling={false} style={[
                                        styles1.tabbarpill, {
                                            color: focused ? "#00DE62" : "#808080",
                                            borderColor: focused ? "#00DE62" : "#808080",
                                        }
                                    ]}> Jobs
                                    </Text>
                                ),

                            }}
                        />}
                        {loggedinRole == "Investor" &&
                            <Tab.Screen
                                listeners={({ navigation, route }) => ({
                                    tabPress: (e) => {
                                        console.log("Tab Pressed:", route.name); // ✅ Should log tab name
                                        setActiveTab(route.name); // ✅ Updates state when tab is pressed
                                    },
                                })}

                                name="Cards"
                                // component={Test3}
                                children={(props) => <Startsy token={token} navigation={navigation} />}
                                options={{
                                    // unmountOnBlur: false,
                                    freezeOnBlur: true,
                                    tabBarLabel: ({ focused }) => (
                                        <Text allowFontScaling={false} style={[
                                            styles1.tabbarpill, {
                                                color: focused ? "#00DE62" : "#808080",
                                                borderColor: focused ? "#00DE62" : "#808080",
                                            }
                                        ]}> Startups
                                        </Text>
                                    ),

                                }}
                            />
                        }


                    </Tab.Navigator>
                </View>

                <Animated.View style={[styles.add, { transform: [{ scale: scale }] }]}>
                    {ActiveTab != "Cards" && <Pressable onPress={openBottomSheet} >
                        <AntDesign name="pluscircle" size={50} color="#00de62" />
                    </Pressable>}
                </Animated.View>
            </Animated.View>

        );
    }


export default Foryou



const styles1 = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
    alertBox: { width: 300, backgroundColor: "#1A1D1F", padding: 20, borderRadius: 20, alignItems: "center" },
    title: { fontSize: 20, fontWeight: "bold", color: "#D9D9D9", fontFamily: "Alata" },
    message: { fontSize: 16, marginVertical: 10, textAlign: "center", color: "#D9D9D9", fontFamily: "Roboto" },
    button: { marginTop: 15, backgroundColor: "#00de62", padding: 6, paddingHorizontal: 37, borderRadius: 10, minWidth: 200, textAlign: "center" },
    buttonText: { color: "#1A1D1F", fontSize: 16, fontFamily: "Roboto", fontWeight: "bold", textAlign: "center" },
    showButton: { backgroundColor: "#28a745", padding: 10, borderRadius: 5 },
    showButtonText: { color: "#fff", fontSize: 16 },
    tabbarpill: {
        fontSize: 16,
        fontFamily: "Alata",
    },
    job1: {
        position: "absolute", right: 20, top: 10,
        backgroundColor: "#ccc",
        paddingVertical: 8,
        paddingHorizontal: 40,
        borderRadius: 20,
        zIndex: 10000
    },

    jobtext: {
        fontFamily: "Alata",
        fontSize: 16,
        marginTop: -5,
        color: "#000"
    }

})