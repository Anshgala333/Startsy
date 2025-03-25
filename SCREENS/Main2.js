import React, { useState, useRef, useEffect, useCallback, useContext, useMemo, memo } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
    View,
    Text,
    Image,
    Animated,
    Pressable,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    ActivityIndicator,
    Modal,
    TouchableOpacity,
    KeyboardAvoidingView,
    Vibration,
    ToastAndroid
} from "react-native";
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomSheet1 from "./Bottomsheet1.js"

import Feather from '@expo/vector-icons/Feather';
import Search from "../assets/icons/Search.js";


import RB from "../SCREENS/ReactBottomsheet.js"
import Drop from "./dropdown.js";
import { BlurView } from 'expo-blur';

import Ansh from "../SCREENS/main-1/Ansh.js";
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import { Video } from 'expo-av';
import styles from "../styles/post.js";
import Apnauser from "./Apnauser.js";
import B1 from "../assets/icons/b1.js";
import B2 from "../assets/icons/b2.js";
import B3 from "../assets/icons/b3.js";
import B4 from "../assets/icons/b4.js";
import BottomSheet, { BottomSheetView, BottomSheetScrollView, BottomSheetTextInput, BottomSheetFlatList, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NewsLettericon from "../assets/icons/Newsletter.js";
import main from "../styles/main.js";
import NewsLetter from "./main-2/Newsletter.js";
import Notification from "./main-2/Notification.js";
import Foryou from "./main-2/Foryou.js";
import Startsy from "./main-1/Startsy.js";
import ChatScreen from "./main-2/Message.js";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Profile from "./main-2/Profile.js";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { BottomTabView, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Fontisto from '@expo/vector-icons/Fontisto';
import NewsletterPage from "./main-2/news1.js";
import Singleprofilepage from "../SCREENS/singleprofilepage.js";
import { GlobalContext } from "@/Global/globalcontext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../config.js";
import Followerpage from "../SCREENS/Followerpage.js"
import { jwtDecode } from "jwt-decode";
import JobsPostedScreen from "./JASH/JobsPostedScreen.jsx";
import ApplicantsList from "./JASH/ApplicantsList.jsx";



import ViewSendedPost from "./JASH/View post/ViewSendedPost.jsx";

configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
});

const Main2 = ({ navigation, route }) => {


    const query = route?.params
    const focus = query?.focus


    const [token, setToken] = useState("");
    const [currpage, setcurrpage] = useState(false);
    const { globaldata } = useContext(GlobalContext);
    const[userProfilePhoto,setProfilePhoto]=useState(null);

    useEffect(() => {
        async function getToken() {
            const temp = await AsyncStorage.getItem("accessToken");
            setToken(temp);
        }
        getToken();
    }, []);

    const [peopledata, setpeopledata] = useState([])
    const [people1, setpeople1] = useState([])

    const renderBackdrop = (props) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1} // Backdrop disappears when BottomSheet is closed
            appearsOnIndex={0} // Backdrop appears when BottomSheet is open
            opacity={0.7} // Set opacity for the backdrop
        />
    );




    useEffect(() => {
        const token = globaldata.token;
        async function fetchProfilePhoto() {
            try {
                const response = await fetch(
                    `${url}api/PFP`,
                    {
                        method: "GET",
                        headers: {
                            accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const result = await response.json();
                console.log("okskasxksdidbibd",result);
                setProfilePhoto(result.data)
            } catch (err) {
                console.log(err);
            }
        }
        if(token != ""){
            fetchProfilePhoto()
        }
    }, [])

    async function fetchdata() {
        if (token) {
            try {
                var route = "founder/getFounderChatUserList"
                const response = await fetch(
                    `${url}${route}`,
                    {
                        method: "GET",
                        headers: {
                            accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const result = await response.json();



                const uniqueData = result.filter((item, index, self) =>
                    self.findIndex(innerItem => innerItem.user.userName === item.user.userName) === index
                );
                var final1 = uniqueData.map((item) => {
                    return { ...item, isSelected: false }
                })






                if (response.status === 200) {
                    // You can update the data state here if needed
                    // setData(result); // Example, you can handle the response data
                    setpeople1(final1)
                    setpeopledata(final1)
                    // setdata1(result)
                }
            } catch (err) {
                console.log(err);
            } finally {
                setloading(false); // Set loading to false when done
            }
        }
    }

    useEffect(() => {
        fetchdata()
    }, [token])



    const [bg, setbg] = useState("#16181a");
    const [uri, setImage] = useState(null);
    const Tab = createBottomTabNavigator();

    const t1 = new Animated.Value(0)
    const diffclamp = Animated.diffClamp(t1, 0, 55);
    const bottomposition = diffclamp.interpolate({
        inputRange: [0, 55],
        outputRange: [0, 55],
        extrapolate: "clamp",
    });

    const bottomSheetRef5 = useRef(null);
    const mainpagebottomsheet = useRef();
    const [showBottomSheet, setShowBottomSheet] = useState(false);


    const commentinput = useRef(null);

    const [snapPoints, setSnapPoints] = useState(['20%']);

    useFocusEffect(useCallback(() => {
        setShowBottomSheet(false);
        setTimeout(() => { setShowBottomSheet(true) }, 100)
    }, []))


    // const snapPoints = useMemo(() => ['20%'], []);

    const snapPoints1 = useMemo(() => ['120%'], []);
    const snapPoints2 = useMemo(() => ['120%'], []);
    const snapPoints3 = useMemo(() => ['120%'], []);
    const snapPoints4 = useMemo(() => ['120%'], []);
    const snapPoints5 = useMemo(() => ["100%"], []);
    const snapPoints6 = useMemo(() => ['70%'], []);
    const bottomSheetRef1 = useRef(null);
    const bottomSheetRef2 = useRef(null);
    const bottomSheetRef3 = useRef(null);
    const bottomSheetRef4 = useRef(null);
    const bottomSheetRef6 = useRef(null);
    const [openBottomSheet6, setOpenBottomSheet6] = useState(false);

    const [type, settype] = useState("");
    const [err1, seterr1] = useState(false);
    const [canbeshared, setcanbeshared] = useState(false);
    const [err2, seterr2] = useState(false);
    const [err3, seterr3] = useState(false);
    const [err4, seterr4] = useState(false);
    const [err5, seterr5] = useState(false);
    const [err6, seterr6] = useState(false);
    const [err7, seterr7] = useState(false);
    const [err10, seterr10] = useState(false);
    const [err11, seterr11] = useState(false);
    const [err12, seterr12] = useState(false);
    const [err13, seterr13] = useState(false);
    const [err14, seterr14] = useState(false);
    const [err15, seterr15] = useState(false);
    const [status1, setstatus] = useState(false);
    const [two, settwo] = useState(false);
    const [one, setone] = useState(false);
    const [three, setthree] = useState(false);
    const [four, setfour] = useState(false);
    const [five, setfive] = useState(false);
    const [uploadingcomment, setuploadingcomment] = useState(false);
    const [visible, setVisible] = useState(false);
    const [textlength, settextlength] = useState(0);
    const [firstbottomsheet, setfirstbottomsheet] = useState(false);
    const [firstbottomsheet1, setfirstbottomsheet1] = useState(false);
    const [p1u, setp1u] = useState(false);
    const [p2u, setp2u] = useState(false);
    const [p3u, setp3u] = useState(false);
    const [p4u, setp4u] = useState(false);
    const [p1text, setp1text] = useState("Post");
    const [p2text, setp2text] = useState("Post");
    const [p3text, setp3text] = useState("Post");
    const [p4text, setp4text] = useState("Post");
    const [role4, setrole4] = useState("");
    const [role5, setrole5] = useState("");
    const [description4, setdescription4] = useState("");
    const [duration4, setduration4] = useState("");
    const [pay4, setpay4] = useState("");
    const [caption, setcaption] = useState("");
    const [content, setcontent] = useState("");
    const [communityname, setcommunityname] = useState("");
    const [description, setdescription] = useState("");
    const [rules, setrules] = useState("");
    const [comment, setcomment] = useState(false);
    const [rule1, setrule] = useState("");
    const [open1, setOpen1] = useState(false);
    const [list, setlist] = useState(false);
    const [emptycomment, setemptycomment] = useState(false);
    const flatListRef = useRef(null);
    const [allcomments, setallcomments] = useState([]);
    const [commenttext, setcommenttext] = useState("");
    const [c2, setc2] = useState("");
    const [aspect, setaspect] = useState("");
    const [newaspect, setnewaspect] = useState("");
    const [IsBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [postid, setpostid] = useState(null);
    const [ansh, setansh] = useState(false);
    const [ansh1, setansh1] = useState(false);


    useFocusEffect(useCallback(() => {
        setOpenBottomSheet6(false);
        setTimeout(() => setOpenBottomSheet6(true), 100)
    }, []))

    const role = [
        { label: "Only for Founders", value: "Only for Founders" },
        { label: "Only for Community Members", value: "Only for Community Members" },
        { label: "Job seeker", value: "Jobseeker" },
        { label: "Startup Enthusiast", value: "Startup Enthusiast" },
        { label: "Mentor", value: "Mentor" },
        { label: "Networker", value: "Networker" },
        { label: "Founder or Mentor", value: "Founder or Mentor" },
        { label: "Founder or Startup Enthusiast", value: "Founder or Startup Enthusiast" },
        { label: "No rules", value: "No rules" },
    ];

    const updatescroll = (val) => {
        t1.setValue(val);
    };

    const comments = ({ item, index }) => {
        function time(time) {
            var data1 = new Date(time);
            var seconds = Math.floor((new Date() - data1) / 1000);
            var interval = seconds / 31536000;

            if (interval > 1) {
                return Math.floor(interval) + " years ago";
            }
            interval = seconds / 2592000;
            if (interval > 1) {
                return Math.floor(interval) + " months ago";
            }
            interval = seconds / 86400;
            if (interval > 1) {
                return Math.floor(interval) + " days ago";
            }
            interval = seconds / 3600;
            if (interval > 1) {
                return Math.floor(interval) + " hours ago";
            }
            interval = seconds / 60;
            if (interval > 1) {
                return Math.floor(interval) + " minutes ago";
            }
            return Math.floor(seconds) + " seconds ago";
        }
        return (
            <View key={index} style={styles.listItem}>
                <Image source={{ uri: item.userId.profilePhoto }} style={styles.avatar} />
                <View style={styles.textContainer}>
                    <Text allowFontScaling={false} style={styles.username}>{item.userId.userName}</Text>
                    <Text allowFontScaling={false} style={styles.message}>{item.comment.trim()}</Text>
                </View>
                <Text allowFontScaling={false} style={styles.time}>{time(item.createdAt)}</Text>
            </View>
        );
    };

    const [keyboardOffset, setKeyboardOffset] = useState(new Animated.Value(0));
    // useFocusEffect(
    //     useCallback(() => {
    //         const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
    //             Animated.timing(keyboardOffset, {
    //                 toValue: 0,
    //                 duration: 300,
    //                 useNativeDriver: false,
    //             }).start();
    //         });

    //         const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
    //             Animated.timing(keyboardOffset, {
    //                 toValue: 0,
    //                 duration: 300,
    //                 useNativeDriver: false,
    //             }).start();
    //             // setk(false)
    //             // inputRef.current?.blur()
    //         });

    //         return () => {
    //             keyboardDidShowListener.remove();
    //             keyboardDidHideListener.remove();
    //         };
    //     }, [keyboardOffset])
    // )

    const openBottomSheet1 = () => {
        navigation.navigate("CommunityPage")
    };

    const openBottomSheet2 = () => {
        navigation.navigate("Blogpage")
    };

    const openBottomSheet3 = () => {
        setfour(true);


        // bottomSheetRef3.current?.expand();
        setstatus(true);
        // setImage("")
        setc2("")
        seterr7(false);
        seterr6(false);
        setVisible(false);
    };

    const openBottomSheet4 = () => {
        navigation.navigate("Jobpost")
    };

    const CustomAlert = ({ visible, onClose }) => {
        const fadeAnim = useRef(new Animated.Value(0)).current;

        useEffect(() => {
            if (visible) {
                Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
            } else {
                Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => {
                    if (typeof onClose === "function") {
                        onClose();
                    }
                });
            }
        }, [visible]);

        if (!visible) return null;

        async function deletepost1() {
            if (idofposttobedeleetd != null) {
                try {
                    const response = await fetch(`${url}posts/deletepost/${idofposttobedeleetd}`, {
                        method: 'POST',
                        body: "",
                        headers: {
                            accept: "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    });

                    const data = await response.json();
                    const updatedPosts = posts.filter((post) => post._id !== idofposttobedeleetd);
                    setPosts(updatedPosts);
                    setVisible(false);
                } catch (err) {
                    console.log(err);
                }
            }
        }

        return (
            <Modal transparent visible={visible} animationType="none" onRequestClose={() => onClose?.()}>
                <TouchableWithoutFeedback onPress={() => onClose?.()}>
                    <Animated.View style={[styles1.overlay, { opacity: fadeAnim }]}>
                        <View style={styles1.alertBox}>
                            <Text style={styles1.title}>Choose aspect ratio</Text>
                            <TouchableOpacity onPress={() => { setnewaspect("4/3"); fileupload([4, 3]); }} style={styles1.button}>
                                <Text style={styles1.buttonText}>4:3 (Standard)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setnewaspect("16/9"); fileupload([16, 9]); }} style={styles1.button}>
                                <Text style={styles1.buttonText}>16:9 (Wide)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setnewaspect("1/1"); fileupload([1, 1]); }} style={styles1.button}>
                                <Text style={styles1.buttonText}>1:1 (Square)</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    };

    const askAspectRatio = async () => {
        setVisible(true);
    };


    const [open, setOpen] = useState(false)
    const [open4, setOpen4] = useState(false)
    const [postToShareId, setpostToShareId] = useState("")

    async function opencomment(id) {
        setansh(true);
        setcomment(true);
        setOpen(true)

        bottomSheetRef5.current?.open();
        // bottomSheetRef5.current?.expand();
        setpostid(id);

        try {
            const response = await fetch(`${url}posts/getComments/${id}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setallcomments(data.data);
            if (data.data.length == 0) {
                setemptycomment(true);
            } else {
                setemptycomment(false);
            }
        } catch (err) {
            console.log(err);
        }
    }


    async function openshare(postid) {

        fetchdata()
        setpostToShareId(postid);
        setcanbeshared(true)
        setSelectedItems(new Set())

        var final1 = peopledata.map((item) => {
            return { ...item, isSelected: false }
        })
        setpeopledata(final1)
        bottomSheetRef6.current?.expand();

    }



    async function docomment() {
        setuploadingcomment(true);
        if (commenttext.trim() == "") {
            setuploadingcomment(false);
            return
        }

        try {
            const response = await fetch(`${url}posts/createComment/${postid}`, {
                method: 'POST',
                body: JSON.stringify({ comment: commenttext }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();


            setemptycomment(false);
            setcommenttext("");

            var object = {
                comment: commenttext,
                createdAt: new Date(),
                userId: {
                    profilePhoto: data.profilePhoto,
                    userName: data.userName,
                }
            };


            var newarray = [...allcomments];
            newarray.unshift(object);
            setallcomments(newarray);

            const scrollToTop = () => {
                flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
            };
            scrollToTop();
            scrollToTop();
        } catch (err) {
            console.log(err);
        } finally {
            setuploadingcomment(false);
        }
    }

    function counttext(text) {
        settextlength(text.length);
    }


    const [SelectedItems, setSelectedItems] = useState(new Set())

    async function handleshareselection(id, index) {

        // console.log(index);
        // console.log(id);
        // console.log(peopledata[index].isSelected);

        var temp = peopledata.map((item, i) => {
            if (i == index) {
                return { ...item, isSelected: !item.isSelected }
            }
            else return item
        })
        setpeopledata(temp)

        if (temp[index].isSelected) {
            setSelectedItems(prev => [...prev, peopledata[index].user._id]);
            setSelectedItems(prev => new Set(prev).add(peopledata[index].user._id));
        } else {
            // Remove from selectedItems array
            // setSelectedItems(prev => prev.filter(item => item !== id));
            const updatedSet = new Set(SelectedItems);
            updatedSet.delete(id);
            setSelectedItems(updatedSet);
        }


    }



    const [count, forcerender] = useState(0)

    useFocusEffect(
        useCallback(() => {
            // console.log("focuse main page");
            forcerender(count + 1)
        }, [])
    )





    const BottomSheetContent = memo(() => {
        return (
            <BottomSheetView style={styles.bottomSheetContent}>
                <Pressable style={styles.iconButton} onPress={openBottomSheet1}>
                    <View style={[styles.ic, { flex: 1, width: "100%", alignSelf: "center" }]}>
                        <B1 />
                    </View>
                    <Text style={styles.bottomsheettext}>Forums</Text>
                </Pressable>
                <Pressable style={styles.iconButton} onPress={openBottomSheet2}>
                    <View style={[styles.ic, { flex: 1, width: "100%", alignSelf: "center" }]}>
                        <B2 />
                    </View>
                    <Text style={styles.bottomsheettext}>Blog</Text>
                </Pressable>
                <Pressable style={styles.iconButton} onPress={() => askAspectRatio()}>
                    <View style={[styles.ic, { flex: 1, width: "100%", alignSelf: "center" }]}>
                        <B3 />
                    </View>
                    <Text style={styles.bottomsheettext}>Media</Text>
                </Pressable>
                {loggedinrole != "Investor" && <Pressable style={styles.iconButton} onPress={openBottomSheet4}>
                    <View style={[styles.ic, { flex: 1, width: "100%", alignSelf: "center" }]}>
                        <B4 />
                    </View>
                    <Text style={styles.bottomsheettext}>Job Posting</Text>
                </Pressable>}
            </BottomSheetView>
        )
    });

    useEffect(() => {
        if (token != "") {
            var decode = jwtDecode(token)
            setloggedinrole(decode.role)
        }
    }, [token]);

    function closeall() {
        mainpagebottomsheet.current?.close();
        bottomSheetRef1.current?.close();
        bottomSheetRef2.current?.close();
        bottomSheetRef3.current?.close();
        bottomSheetRef4.current?.close();
        bottomSheetRef5.current?.close();
    }

    useEffect(() => {
        // console.log(uri, "uri ki ");
    }, [uri]);

    const [sendingpost, setsendingpost] = useState(false)
    const [loggedinrole, setloggedinrole] = useState("")


      const showToastWithGravity = (message) => {
        ToastAndroid.showWithGravityAndOffset(
          `${message}`,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          100, 100
        );
      };

    async function finalsubmit() {
        // console.log(SelectedItems);
        // console.log(Array.from(SelectedItems));
        setsendingpost(true)
        var array = Array.from(SelectedItems)

       
        


        try {
            const response = await fetch(`${url}chats/sendMessage/${postToShareId}`, {
                method: 'POST',
                body: JSON.stringify({ sharedToUsers: array }),
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
            bottomSheetRef6.current?.close()
            showToastWithGravity("Post shared successfully")


        }
        catch (e) {

        }
        finally {
            setsendingpost(false)
            setSelectedItems(new Set());
            var final1 = peopledata.map((item) => {
                return { ...item, isSelected: false }
            })
            setpeopledata(final1)
            setpeople1(final1)

            bottomSheetRef6.current?.close()


        }




    }





    const [durationopen, setdurationopen] = useState(false);
    const [payopen, setpayopen] = useState(false);



    const renderpeople = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => {
                // gotochatscreen(item)
            }}>
                <View style={styles.listItem}>
                    <Image
                        source={{ uri: item.user.profilePhoto || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8slgZXgqnSIXDS8wF2uDT_SmsYlBe-W1soQ&s" }}
                        style={styles.avatar} />
                    <View style={styles.textContainer}>
                        <Text numberOfLines={1}
                            ellipsizeMode="tail" allowFontScaling={false} style={styles.username}>{item.user.userName}</Text>

                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            allowFontScaling={false} style={styles.message}>{item.user.userName}</Text>
                    </View>
                    <TouchableOpacity onPress={() => { handleshareselection(item.user._id, index) }} style={item.isSelected ? styles1.sendbtn1 : styles1.sendbtn}><Text style={item.isSelected ? styles1.sendbtnText1 : styles1.sendbtnText}>{item.isSelected ? "Selected" : "Send"}</Text></TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    const [k, setk] = useState(false)






    const isKeyboardVisible = useRef(false);
    const [, forceUpdate] = useState(0);



    return (
        <GestureHandlerRootView
            waitfor={commentinput}
            style={{ flex: 1, backgroundColor: "#16181a" }}>

            <KeyboardAvoidingView behavior="" keyboardVerticalOffset={100} style={{ flex: 1, position: "relative" }}>




                <View style={{ flex: 1, backgroundColor: "red", position: "absolute", top: 0, width: "100%", height: height }}>
                    <Tab.Navigator

                        lazy={false}
                        // unmountOnBlur={false}
                        initialRouteName="Startsy"
                        detachInactiveScreens={true}
                        // keyboardBehavior={true}
                        screenOptions={{

                            freezeOnBlur: true,
                            tabBarPosition: "bottom",
                            // position: "absolute",
                            // animationEnabled: true,

                            tabBarActiveTintColor: "#00DE62",
                            tabBarInactiveTintColor: "#7A7B7C",
                            headerShown: false,
                            // tabBarVisible: false,
                            tabBarHideOnKeyboard: true,


                            tabBarBackground: () => (
                                <BlurView
                                    experimentalBlurMethod="dimezisBlurView"
                                    blurAmount={30}
                                    intensity={90} style={{ flex: 1 }} tint="dark" />
                            ),

                            tabBarButton: (props) => (
                                <TouchableOpacity
                                    {...props}
                                    onPress={() => {
                                        Vibration.vibrate(20); // Vibrates for 100ms
                                        props.onPress?.();
                                    }}
                                />
                            ),

                            tabBarStyle: {
                                backgroundColor: 'transparent',
                                // backgroundColor: 'red',
                                height: 55,
                                // zIndex  : -1,
                                opacity: 1,
                                borderTopWidth: 0,
                                paddingTop: 12,
                                position: "absolute",
                                tabBarHideOnKeyboard: true,
                                display: isKeyboardVisible.current ? "none" : "block",
                                transform: [{ translateY: bottomposition }]
                            },

                        }}
                    >
                        <Tab.Screen
                            name="NewsLetter"
                            children={(props) => <NewsLetter mainpagebottomsheet={mainpagebottomsheet} token={token} closeall={closeall} k={k} setk={setk} />}
                            options={{

                                freezeOnBlur: true,
                                unmountOnBlur: true,
                                tabBarLabel: "",
                                tabBarIcon: ({ focused }) => (
                                    // <Pressable onPress={()=>{Vibration.vibrate(20)}}>
                                    <View style={{ flex: 1, width: 30, marginLeft: 10, marginTop: -3, justifyContent: "center", height: 30 }}>
                                        {/* <Search  width={40} height={40} /> */}
                                        <Feather name="search" size={24} color={focused ? "#00DE62" : "#7A7B7C"} />
                                        {/* <NewsLettericon color={focused ? "#00DE62" : "#828282"} /> */}
                                    </View>
                                    // </Pressable>
                                ),
                            }}
                        />
                        <Tab.Screen
                            name="bell"
                            children={(props) => <Notification mainpagebottomsheet={mainpagebottomsheet} token={token} closeall={closeall} />}
                            options={{
                                freezeOnBlur: true,
                                unmountOnBlur: true,

                                tabBarLabel: "",
                                tabBarIcon: ({ focused }) => (
                                    <View style={{ marginTop: -4 }}>
                                        <Fontisto name="bell" size={24} color={focused ? "#00DE62" : "#7A7B7C"} />
                                        {/* <Feather name="bell" size={32} color={focused ? "#00DE62" : "#7A7B7C"} /> */}
                                    </View>
                                ),
                            }}
                        />
                        <Tab.Screen
                            name="Startsy"
                            children={(props) => <Foryou ansh={ansh} setOpen4={setOpen4} one={one} setone={setone} keyboardOffset={keyboardOffset} commentinput={commentinput} setk={setk} ansh1={ansh1} setansh1={setansh1} two={two} three={three} four={four} five={five} bottomSheetRef5={bottomSheetRef5} bottomSheetRef1={bottomSheetRef1} bottomSheetRef2={bottomSheetRef2} bottomSheetRef3={bottomSheetRef3} bottomSheetRef4={bottomSheetRef4} type={type} settype={settype} setImage={setImage} uri={uri} openBottomSheet3={openBottomSheet3} scroll={updatescroll} token={token} mainpagebottomsheet={mainpagebottomsheet} opencomment={opencomment} visible={visible} setVisible={setVisible} newaspect={newaspect} setnewaspect={setnewaspect} openshare={openshare} />}
                            options={{
                                keyboardBehavior: true,
                                freezeOnBlur: true,
                                // tabBarButton: (props) => {
                                //     return (
                                //         <TouchableOpacity
                                //             {...props}
                                //             onLongPress={() => {
                                //                 // console.log("long press")
                                //                 if (loggedinrole == "Investor") {
                                //                     navigation.navigate("StartsyCard", { token })
                                //                 }
                                //             }
                                //             } // Change to your destination screen
                                //         >
                                //         </TouchableOpacity>
                                //     )
                                // },


                                tabBarLabel: "",
                                tabBarIcon: ({ focused }) => (

                                    <>
                                        {!focused && <Image style={{ width: 40, height: 40 , marginTop : -5 }} source={require("../assets/images/logogray1.png")} />}
                                        {focused && <Image style={{ width: 40, height: 40 , marginTop : -5}} source={require("../assets/images/logo.png")} />}
                                    </>
                                ),
                            }}

                        />
                        <Tab.Screen
                            name="Message"
                            children={(props) => <ChatScreen k={k} setk={setk} mainpagebottomsheet={mainpagebottomsheet} closeall={closeall} token={token} />}
                            options={{
                                freezeOnBlur: true,
                                unmountOnBlur: true,

                                keyboardBehavior: true,

                                tabBarLabel: "",
                                tabBarIcon: ({ focused }) => (
                                    <View style={{ marginTop: -3 }}><MaterialCommunityIcons name="message-text-outline" size={24} color={focused ? "#00DE62" : "#7A7B7C"} /></View>
                                ),
                            }}
                        />
                        <Tab.Screen
                            name="Profile"
                            children={() => <Apnauser closeall={closeall} openshare={openshare} mainpagebottomsheet={mainpagebottomsheet} navigation={navigation} token={token} />}
                            options={{
                                freezeOnBlur: true,
                                unmountOnBlur: true,

                                tabBarLabel: "",
                                tabBarIcon: ({ focused }) => (
                                    <View style={{ marginTop: -4, marginLeft: -2 }}>
                                        {
                                            userProfilePhoto ==null ?
                                            <FontAwesome6 name="circle-user" size={30} color={focused ? "#00DE62" : "#7A7B7C"} />
                                            :
                                            <Image source={{uri:(userProfilePhoto)}} width={30} height={30} style={{borderRadius:50,borderColor:"#00de62",borderWidth:focused?1:0}}/>
                                        }
                                    </View>
                                ),
                                
                            }}
                        />
                        <Tab.Screen
                            name="NewsletterPage"
                            component={NewsletterPage}
                            options={{
                                tabBarLabel: "okkk",
                                unmountOnBlur: true,
                                tabBarItemStyle: { display: 'none' },
                                tabBarButton: () => null,
                                tabBarVisible: true,
                            }}
                        />
                        <Tab.Screen
                            name="Singleuserpage"
                            children={() => <Singleprofilepage navigation={navigation} openshare={openshare} />}
                            options={{
                                tabBarItemStyle: { display: 'none' },
                                tabBarButton: () => null,
                                tabBarVisible: false,
                            }}
                        />
                        <Tab.Screen
                            name="Followerpage"
                            component={Followerpage}
                            // children={() => <Followerpage navigation={navigation}  />}
                            options={{
                                tabBarItemStyle: { display: 'none' },
                                tabBarButton: () => null,
                                tabBarVisible: false,
                            }}
                        />
                        <Tab.Screen
                            name="Jobposted"
                            component={JobsPostedScreen}
                            // children={() => <Followerpage navigation={navigation}  />}
                            options={{
                                tabBarItemStyle: { display: 'none' },
                                tabBarButton: () => null,
                                tabBarVisible: false,
                            }}
                        />


                        <Tab.Screen
                            name="Applicant"
                            component={ApplicantsList}
                            // children={() => <Followerpage navigation={navigation}  />}
                            options={{
                                tabBarItemStyle: { display: 'none' },
                                tabBarButton: () => null,
                                tabBarVisible: false,
                            }}
                        />

                        <Tab.Screen
                            name="ViewSendedPost"
                            // component={ViewSendedPost}
                            children={(props) => <ViewSendedPost openshare={openshare} opencomment={opencomment} />}
                            options={{
                                tabBarItemStyle: { display: 'none' },
                                tabBarButton: () => null,
                                tabBarVisible: false,
                            }}
                        />

                    </Tab.Navigator>
                    {showBottomSheet && (<BottomSheet
                        enablePanDownToClose
                        backgroundStyle={{ backgroundColor: '#16181a', borderRadius: 30 }}
                        handleIndicatorStyle={{ backgroundColor: '#00de62' }}
                        style={{ zIndex: 1000000, elevation: 1000 }}
                        enableDynamicSizing={false}
                        ref={mainpagebottomsheet}
                        snapPoints={snapPoints}
                        backdropComponent={renderBackdrop}
                        index={-1}
                    >
                        <BottomSheetContent />
                    </BottomSheet>)
                    }

                </View>




                {/* <BottomSheet1 mainpagebottomsheet={mainpagebottomsheet}/> */}
                {openBottomSheet6 && (


                    <BottomSheet
                        overlayColor="rgba(0, 0, 0, 0.9)"
                        enablePanDownToClose
                        backgroundStyle={{ backgroundColor: '#1A1D1F', borderRadius: 30 }}
                        handleIndicatorStyle={{ backgroundColor: '#00de62' }}
                        ref={bottomSheetRef6}
                        nestedScrollEnabled={true}
                        backdropComponent={renderBackdrop}
                        enableDynamicSizing={false}
                        snapPoints={snapPoints6}
                        index={-1}
                        // handleStyle={{display : "none"}}
                        contentContainerStyle={{ zIndex: 1000000, elevation: 20000000, height: 100 }}
                    >
                        <View style={{ flex: 1 }}>
                            <Pressable onPress={() => {


                            }
                            }>
                                <Text style={styles.comment}>Share</Text>
                            </Pressable>


                            {peopledata.length == 0 ?


                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>


                                    <Text style={{ color: 'gray' }}>You are not connected to anyone</Text>

                                </View>

                                :
                                <>


                                    <BottomSheetFlatList
                                        ref={flatListRef}
                                        data={peopledata}
                                        nestedScrollEnabled={true}
                                        renderItem={renderpeople}
                                        contentContainerStyle={{ paddingBottom: 80 }}
                                        scrollEnabled={true}

                                    />


                                    <>
                                        {SelectedItems.size > 0 && (<TouchableOpacity onPress={finalsubmit} style={styles1.confirm}>
                                            {!sendingpost && <Text style={styles1.confirmText}>Confirm</Text>}
                                            {sendingpost && <ActivityIndicator size={24} color="#16181a" />}
                                        </TouchableOpacity>)}
                                    </>

                                </>

                            }



                        </View>
                    </BottomSheet>)
                }





                <RB
                    open={open}
                    setOpen={setOpen}
                    allcomments={allcomments}
                    comments={comments}
                    bottomSheetRef5={bottomSheetRef5}
                    docomment={docomment}
                    uploadingcomment={uploadingcomment}
                    setallcomments={setallcomments}
                    setcommenttext={setcommenttext}
                    commenttext={commenttext} />

            </KeyboardAvoidingView>
        </GestureHandlerRootView>
    );
};

export default Main2;

const { height, width } = Dimensions.get("window");

var a = width / 360;
var b = height / 800;
const scalingfactor = Math.sqrt(a * b);

const styles1 = StyleSheet.create({
    searchContainer: {
        marginHorizontal: "auto",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        display: "flex",
        backgroundColor: "transparent",
    },
    searchInput: {
        height: "auto",
        minHeight: 50,
        width: width * 0.95,
        borderColor: "#00DE62",
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 20,
        color: "#828282",
        fontFamily: "Roboto",
        fontSize: 18,
        maxHeight: 100,
    },
    send: {
        position: "absolute",
        top: 12,
        right: 10,
        transform: [{ scale: 1.1 }],
        alignSelf: "center",
        verticalAlign: "center",
        bottom: 0,
    },
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center", alignItems: "center" },
    alertBox: { width: 300, height: 250, zIndex: 100000000000, elevation: 10000000000, marginLeft: 350, marginTop: 750, backgroundColor: "#1A1D1F", padding: 20, borderRadius: 20, alignItems: "center", alignSelf: "center" },
    title: { fontSize: 20, fontWeight: "bold", color: "#D9D9D9", fontFamily: "Alata" },
    message: { fontSize: 16, marginVertical: 10, textAlign: "center", color: "#D9D9D9", fontFamily: "Roboto" },
    button: { marginTop: 15, backgroundColor: "#00de62", padding: 10, paddingHorizontal: 37, borderRadius: 10, minWidth: 200, textAlign: "center" },
    buttonText: { color: "#1A1D1F", fontSize: 16, fontFamily: "Roboto", fontWeight: "700", textAlign: "center" },
    showButton: { backgroundColor: "#28a745", padding: 10, borderRadius: 5 },
    showButtonText: { color: "#fff", fontSize: 16 },


    sendbtn: {
        backgroundColor: "#ccc",
        paddingHorizontal: 18,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#ccc",

    },

    sendbtnText: {
        fontSize: 14,
        color: "#333",
        fontFamily: "Alata"


    },

    sendbtn1: {
        backgroundColor: "#16181a",
        borderWidth: 2,
        borderColor: "#ccc",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,

    },

    sendbtnText1: {
        fontSize: 14,
        color: "#ccc",
        fontFamily: "Alata"

    },
    confirm: {
        position: "absolute", bottom: 30, margin: "auto", paddingVertical: 12, backgroundColor: "#999", alignSelf: "center",
        borderRadius: 12,
        width: "75%"
    },
    confirmText: {
        fontSize: 25,
        fontFamily: "Alata",
        textAlign: "center",
    },
    inputContainer: { flexDirection: "row", backgroundColor: "#1A1D1F", width: "100%", padding: 10, bottom: 70, position: "relative" },

});