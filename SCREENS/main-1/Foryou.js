


import React, { useState, useRef, useEffect, useMemo, useContext, useCallback } from "react";
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
    StatusBar,
    FlatList,
    RefreshControl,
    Dimensions, PixelRatio,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    ActivityIndicator,
    BackHandler,
    ToastAndroid,
    Vibration,
    TouchableOpacity,
    Modal,

} from "react-native";
import { Skeleton } from 'moti/skeleton';
import { MotiView } from 'moti';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from "../../styles/post.js"

import { Video } from 'expo-av';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { NativeViewGestureHandler } from 'react-native-gesture-handler'
import Octicons from '@expo/vector-icons/Octicons';
import main from "../../styles/main.js"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import CustomButton from "@/components/button.js";
import AntDesign from '@expo/vector-icons/AntDesign';
// import BottomSheet from '@gorhom/bottom-sheet';

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFocusEffect, useNavigation } from "expo-router";

import B1 from "../../assets/icons/b1.js"
import B2 from "../../assets/icons/b2.js"
import B3 from "../../assets/icons/b3.js"
import B4 from "../../assets/icons/b4.js"
import { color } from "framer-motion";
import Drop from "../dropdown.js";
import * as ImagePicker from 'expo-image-picker';

import Upvote from "@/assets/icons/upvote.js";
import Share from "@/assets/icons/share.js";
import { GlobalContext } from "@/Global/globalcontext.js";

import { url } from "../../config.js"
import { useRoute } from "@react-navigation/native";
import { Keyboard } from "react-native";
import { jwtDecode } from "jwt-decode";
const Foryou = ({ scroll, token, openshare, mainpagebottomsheet, visible, setVisible, newaspect, setnewaspect }) => {

    const navigation = useNavigation()


    const [allpost, setallpost] = useState([])
    // console.log(token);


    // console.log("hello ofor you");
    const Spacer = ({ height = 16 }) => <View style={{ height }} />;


    // const [token, settoken] = useState("")
    const [comment, setcomment] = useState(false)
    const [loading, setloading] = useState(false)
    const [loading1, setloading1] = useState(true)

    const [p1u, setp1u] = useState(false)
    const [p2u, setp2u] = useState(false)
    const [p3u, setp3u] = useState(false)
    const [p4u, setp4u] = useState(false)

    const [co, setiscommentopen] = useState(false)
    const [allcomments, setallcomments] = useState([])

    const [postid, setpostid] = useState(null)
    const [commenttext, setcommenttext] = useState("")
    const { globaldata, updateField } = useContext(GlobalContext);

    // useEffect(() => {
    //     // console.log(globaldata, "global data");
    //     settoken(globaldata.token)
    // }, [])

    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181A");
        StatusBar.setBarStyle("light-content");
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




        // Launch the image picker
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


            // openBottomSheet3()

            setVisible(false);


            navigation.navigate("Mediapage", { type: type1, aspectRatio: `${aspect[0] / aspect[1]}`, uri: imageUri })


        }

    }



    // useEffect(() => {
    //     // Listener for the hardware back button
    //     const backAction = () => {
    //         console.log(co);
    //         console.log(co, "cooo");


    //         if (co == true) {
    //             bottomSheetRef5.current?.close();
    //             setiscommentopen(false);
    //             return true; // Prevent default behavior
    //         }

    //         else {
    //             BackHandler.exitApp()
    //         }
    //     };

    //     const backHandler = BackHandler.addEventListener(
    //         'hardwareBackPress',
    //         backAction
    //     );

    //     return () => backHandler.remove(); // Cleanup
    // }, [co]);

    async function getpost() {
        setloading(true);
        try {
            const response = await fetch(`${url}posts/getPosts`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();

            // console.log(data.data[0]);
            console.log(response.status);
            console.log(data);


            // var data1 = data.data.map(e => {
            //     var object = { ...e, isliked: false }
            //     return object


            // })

            var decode = jwtDecode(token)
            var loggedinUserID = decode._id

            var data1 = data.data.map(e => {

                var object = { ...e, isliked: e.likedBy.includes(loggedinUserID), Applied: e.communityPost ? e.communityPost.communityMembers.includes(loggedinUserID) : false, Jobapplied: e.jobPosts ? e.jobPosts.jobApplicants.includes(loggedinUserID) : false, itemlikedcount: e.likedBy.length }
                return object
            })




            // console.log(data1[0]);



            if (data.data.length > 0) {
                setallpost(data1.reverse())
            }



        }
        catch (err) {
            console.log(err);
        }
        finally {
            setloading(false);
        }

    }

    useEffect(() => {
        // console.log("start");


        getpost()
        // setTimeout(() => {
        //     getpost()
        //     // console.log(allpost);

        // }, 1000);

    }, [token])




    const [uri, setImage] = useState(null)
    const [status1, setstatus] = useState(false)
    const [bg, setbg] = useState("#16181a")
    const [refreshing, setRefreshing] = useState(false);
    const [textlength, settextlength] = useState(0);
    const [rule1, setrule] = useState("")
    const [open1, setOpen1] = useState(false);
    const [list, setlist] = useState(false)

    const [communityname, setcommunityname] = useState("")
    const [description, setdescription] = useState("")
    const [rules, setrules] = useState("")
    const [caption, setcaption] = useState("")
    const [content, setcontent] = useState("")
    const [c2, setc2] = useState("")
    const [type, settype] = useState("")


    const [role4, setrole4] = useState("")
    const [description4, setdescription4] = useState("")
    const [duration4, setduration4] = useState("")
    const [pay4, setpay4] = useState("")




    const scrollY = new Animated.Value(0);
    const diffclamp = Animated.diffClamp(scrollY, 0, 55);
    const translateY = diffclamp.interpolate({
        inputRange: [0, 55],
        outputRange: [0, -55],
        extrapolate: "clamp",
    })






    const [viewableItems, setViewableItems] = useState([]);
    const [videoStates, setVideoStates] = useState({});
    const videoRefs = useRef({});
    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        setViewableItems(viewableItems);

        // Update play state for videos based on visibility
        const updatedVideoStates = {};
        viewableItems.forEach(viewableItem => {
            if (viewableItem.isViewable) {
                updatedVideoStates[viewableItem.item._id] = true; // Video should play when in view
            } else {
                updatedVideoStates[viewableItem.item._id] = false; // Video should stop when out of view
            }
        });

        setVideoStates(updatedVideoStates);
        viewableItems.forEach(item => {
            if (!item.isViewable && videoRefs.current[item.item._id]) {
                videoRefs.current[item.item._id].pauseAsync(); // Pause the video
            }
        });
    }, []);


    async function upvotepost(id, index) {
        // console.log(id);
        // console.log(index);

        var toset = !allpost[index].isliked
        console.log(toset);

        var status = toset ? "like" : "unlike"

        var increment = toset == true ? 1 : -1
        console.log(increment);


        setallpost(allpost.map((e, i) => {
            if (i == index) {
                var object = { ...e, isliked: !e.isliked, itemlikedcount: e.itemlikedcount + increment }
                return object
            }
            else return e
        }))

        try {

            const response = await fetch(`${url}posts/upvotePost/${id}/${status}`, {
                method: 'POST',
                body: "",
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data);
            console.log(response.status);

        }
        catch (err) {
            // setloading(false)
            console.log(err);

        }


    }
    const showToastWithGravity = (message) => {
        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
        );
    };

    async function applycommunity(id) {
        console.log("tu investor hai ");
        showToastWithGravity("you cannot apply to community since you are an investor")


    }
    async function applyjob(id) {
        console.log("tu investor hai ");
        showToastWithGravity("you cannot apply to job since you are an investor")

    }

    const lastTap = useRef(null);

    const handleDoubleTap = (id, index) => {
        const now = Date.now();
        if (lastTap.current && now - lastTap.current < 300) {
            // Double tap detected
            upvotepost(id, index)


        }
        lastTap.current = now;
    };


    const renderItem = useMemo(
        () => ({ item, index }) => {

            const isVideoPlaying = videoStates[item._id] || false;

            function currency(pay) {
                // console.log(pay);
                // console.log(typeof pay);
                // pay = Number(pay);
                return pay
                // return pay.toLocaleString("en-IN")
            }
            if (item.type == "photo" || item.type == "textBlog" || item.type == "video") {
                return (
                    <Pressable onPress={() => {
                        handleDoubleTap(item._id, index)

                    }}>
                        <View style={styles.box}>
                            <View style={styles.top} >
                                <Pressable
                                    style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                    <Image style={styles.userimg} source={{ uri: item.user_id.profilePhoto }} />
                                    <View style={styles.userdetail}>
                                        <Text allowFontScaling={false} style={styles.u1}>{item.user_id.userName}</Text>
                                        <Text allowFontScaling={false} style={styles.u2}>{item.user_id.role == "CommunityMember" ? "Member" : item.user_id.role}</Text>
                                    </View>
                                </Pressable>
                            </View>
                            <View style={styles.divider}></View>

                            {item.type == "photo" && <Image style={[styles.template, { aspectRatio: item.aspectRatio ? item.aspectRatio : 1 / 1 }]} source={{ uri: item.mediaUrl }} />}
                            {item.type == "video" &&
                                <Video
                                    ref={ref => videoRefs.current[item._id] = ref}
                                    style={[styles.template, { aspectRatio: item.aspectRatio ? item.aspectRatio : 1 / 1 }]}
                                    source={{ uri: item.mediaUrl }}
                                    useNativeControls // Enables native playback controls
                                    resizeMode="contain" // Adjusts video to fit within the view
                                    isLooping // Loops the video
                                    shouldPlay={isVideoPlaying}
                                />

                            }
                            {item.type == "textBlog" && <Text style={styles.blogtext}>{item.content}</Text>}

                            <View style={styles.iconcontainer}>
                                <View style={styles.icon2}>
                                    <Pressable onPress={() => { upvotepost(item._id, index) }}>

                                        {!item.isliked && <Upvote width={36} height={36} style={{ marginHorizontal: 5 }} />}
                                        {item.isliked && <Upvote width={36} height={36} style={{ marginHorizontal: 5 }} selected={true} />}
                                    </Pressable>
                                    <Text style={{ left: -10, top: 13, color: "#ccc" }}>{item.itemlikedcount}</Text>

                                </View>
                                <TouchableOpacity

                                    onPress={() => {
                                        Vibration.vibrate(20)
                                        openshare(item._id)
                                    }}
                                >
                                    <Share style={{ marginTop: 5, marginRight: 10, right: 0 }} />
                                </TouchableOpacity>



                            </View>
                            {item.type != "textBlog" && <View style={styles.lower}>
                                <Text allowFontScaling={false} style={[styles.u3, { paddingLeft: 10 }]}>{item.caption != undefined ? item.caption : "caption"} </Text>


                            </View>}


                        </View>
                    </Pressable>
                )
            }
            else if (item.type == "communityPost") {
                return (
                    <View style={styles.box}>

                        <View style={styles.top} >
                            <Pressable
                                style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                    <Image style={styles.userimg} source={{ uri: item.user_id.profilePhoto }} />
                                    <View style={styles.userdetail}>
                                        <Text allowFontScaling={false} style={styles.u1}>{item.user_id.userName}</Text>
                                        <Text allowFontScaling={false} style={styles.u2}>{item.user_id.role == "CommunityMember" ? "Member" : item.user_id.role}</Text>
                                    </View>
                                </View>
                            </Pressable>
                        </View>
                        <View style={styles.lower}>
                            <Text style={styles.com1}>{item.communityPost.communityName}</Text>
                            <Text style={styles.com2}><Text style={styles.desc1}>Community description: </Text>{item.communityPost.communityDescription}</Text>
                            <Text allowFontScaling={false} style={styles.u6}><Text style={styles.desc1}>Members Count :</Text> {item.communityPost.communityMembers.length}</Text>
                            <Text allowFontScaling={false} style={styles.u7}>Rules & Guidelines: {item.communityPost.communityRules}</Text>

                            <Pressable onPress={() => { applycommunity(item._id) }} style={[styles.next]} >
                                <Text allowFontScaling={false} style={styles.nexttext}>Join Community</Text>
                            </Pressable>
                        </View>

                    </View>
                )
            }
            else if (item.type == "jobPost") {
                return (
                    <View style={styles.box}>
                        <View style={styles.top} >

                            <Pressable
                                style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                    <Image style={styles.userimg} source={{ uri: item.user_id.profilePhoto }} />
                                    <View style={styles.userdetail}>
                                        <Text allowFontScaling={false} style={styles.u1}>{item.user_id.userName}</Text>
                                        <Text allowFontScaling={false} style={styles.u2}>{item.user_id.role == "CommunityMember" ? "Member" : item.user_id.role}</Text>
                                    </View>
                                </View>

                            </Pressable>
                        </View>
                        <View style={styles.lower}>
                            <Text style={styles.com1}>Role: {item.jobPosts.role}</Text>
                            <Text style={styles.com2}><Text style={styles.desc1}>Community description: </Text>{item.jobPosts.description}</Text>
                            <Text allowFontScaling={false} style={[styles.u8 , {color : "#828282"} ]}>Duration: {item.jobPosts.duration} </Text>
                            <Text allowFontScaling={false} style={styles.u8}><Text style={{ color: "#828282" }}>Payment mode: {item.jobPosts.pay} </Text> </Text>
                            {item.jobPosts.amount != "" && <Text allowFontScaling={false} style={styles.u8}><Text style={{ color: "#828282" }}></Text>Amount: {item.jobPosts.amount} </Text>}

                            <Pressable onPress={() => { applyjob(item._id) }} style={[styles.next]} >
                                <Text allowFontScaling={false} style={styles.nexttext}>Apply</Text>
                            </Pressable>
                        </View>

                    </View>
                )
            }
        }
    )


    function header() {
        return (
            <View style={[main.header, { backgroundColor: "#16181a", marginBottom: 10 }]}>
                <Text allowFontScaling={false} style={main.headertext}>For you</Text>
            </View>
        )
    }

    var headeref = useRef(null);



    const openBottomSheet = () => {

        mainpagebottomsheet.current?.expand();
    }




    var timeout;

    const viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 80, // Item is considered viewable if 50% is visible
    };
    return (
        <SafeAreaView style={styles.container}>

            <GestureHandlerRootView nestedScrollEnabled style={{ flex: 1 }} >

                {/* <TouchableWithoutFeedback onPress={closebottomsheet}> */}
                {/* <View style={{ position: "absolute" }}> */}

                <CustomAlert visible={visible} onClose={() => setVisible(false)} />



                {/* {allpost.length == 0 && } */}
                {loading &&

                    <>
                        <View style={[main.header, { backgroundColor: "#16181a" }]}>
                            <Text allowFontScaling={false} style={[main.headertext, { marginBottom: 0 }]}>For you</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "center" }}>

                            {/* <View> */}
                            <View style={{ display: "flex", flexDirection: "row", gap: 5, width: "92%", alignItems: "center" }}>
                                <Skeleton
                                    // colorMode="dark"
                                    width={30}
                                    colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

                                    // backgroundColor="red" // Changed to red

                                    height={30}
                                    radius={"round"}
                                    // backgroundColor="black"
                                    highlightColor="#000"  // Set highlight color
                                />
                                <Spacer height={8} />
                                <Skeleton
                                    colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}
                                    colorMode="dark"
                                    width={'60%'}
                                    height={10}
                                    // backgroundColor="black"
                                    highlightColor="#333"  // Set highlight color
                                />
                            </View>
                            <Spacer height={8} />

                            <Skeleton
                                style={{ marginTop: 10 }}
                                colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

                                transition={{
                                    opacity: 1,
                                    duration: 1000,

                                    // repeat: true,
                                }}
                                colorMode='dark'
                                opacity={1}
                                highlightColor="red"   // Set highlight color here
                                radius={20}

                                height={300}

                                width={"94%"}
                            // style={styles.box}
                            >
                            </Skeleton>
                            <Spacer height={8} />


                            <View style={{}}>
                                <Skeleton
                                    colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}
                                    colorMode="dark"
                                    width={'70%'}
                                    height={12}
                                    // backgroundColor="black"
                                    highlightColor="#333"  // Set highlight color
                                />
                                <Spacer height={8} />

                                <Skeleton
                                    colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}
                                    // colorMode="dark"
                                    width={'90%'}
                                    height={12}
                                    // backgroundColor="black"
                                    highlightColor="#333"  // Set highlight color
                                />

                            </View>
                            <Spacer height={30} />
                            {/* </View> */}


                            <View style={{ display: "flex", flexDirection: "row", gap: 5, width: "92%", alignItems: "center" }}>
                                <Skeleton
                                    // colorMode="dark"
                                    width={30}
                                    colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

                                    // backgroundColor="red" // Changed to red

                                    height={30}
                                    radius={"round"}
                                    // backgroundColor="black"
                                    highlightColor="#000"  // Set highlight color
                                />
                                <Spacer height={8} />
                                <Skeleton
                                    colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}
                                    colorMode="dark"
                                    width={'65%'}
                                    height={10}
                                    // backgroundColor="black"
                                    highlightColor="#333"  // Set highlight color
                                />
                            </View>
                            <Spacer height={8} />

                            <Skeleton
                                style={{ marginTop: 10 }}
                                colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

                                transition={{
                                    opacity: 1,
                                    duration: 1000,

                                    // repeat: true,
                                }}
                                colorMode='dark'
                                opacity={1}
                                highlightColor="red"   // Set highlight color here
                                radius={20}

                                height={200}

                                width={"94%"}
                            // style={styles.box}
                            >
                            </Skeleton>
                            <Spacer height={8} />


                            <Skeleton
                                colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}
                                colorMode="dark"
                                width={'90%'}
                                height={12}
                                backgroundColor="black"
                                highlightColor="#333"  // Set highlight color
                            />
                            <Spacer height={8} />

                            <Skeleton
                                colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}
                                // colorMode="dark"
                                width={'90%'}
                                height={12}
                                // backgroundColor="black"
                                highlightColor="#333"  // Set highlight color
                            />
                        </View>
                    </>

                }
                {!loading && <FlatList

                    ListHeaderComponent={header}
                    // scrollEventThrottle={0}
                    showsVerticalScrollIndicator={false}
                    style={main.scroll1}
                    initialNumToRender={5}
                    windowSize={10}
                    maxToRenderPerBatch={5}
                    scrollEventThrottle={16}
                    keyExtractor={(item, index) => { return index }}
                    removeClippedSubview={false}

                    // onScroll={(e) => {
                    //     scrollY.setValue(e.nativeEvent.contentOffset.y)
                    // }}

                    contentContainerStyle={{
                        // marginTop : 200,
                        paddingBottom: 100
                    }}
                    data={allpost}
                    renderItem={renderItem}

                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}


                    refreshControl={
                        <RefreshControl progressViewOffset={30} refreshing={refreshing}
                            progressBackgroundColor="#16181a"
                            colors={['#00de62']}
                            onRefresh={() => {
                                // console.log("start");
                                Vibration.vibrate(200)
                                setRefreshing(true);
                                // setbg("transparent")
                                getpost()

                                setTimeout(() => {
                                    setRefreshing(false); // Stop refreshing after fetching data
                                }, 2000); // Adjust the delay as needed
                            }} />}

                    bounces={true}
                    contentInset={{ top: 10 }}
                >



                </FlatList>}


                <Animated.View style={[styles.add,
                    // { transform: [{ scale: scale }] }
                ]}>

                    <Pressable onPress={openBottomSheet} >
                        <AntDesign name="pluscircle" size={50} color="#00de62" />
                    </Pressable>
                </Animated.View>



                {/* bottomsheet 1 */}
            </GestureHandlerRootView>
        </SafeAreaView >

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
    divider: {
        width: "110%",
        marginLeft: -20,
        height: 3,
        marginTop: 5,
        marginBottom: 20,
        backgroundColor: "#24272A"
    },

    blurOverlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },
})