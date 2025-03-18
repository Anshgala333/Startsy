import React, { useState, useRef, useEffect, useCallback, useContext, useMemo } from "react";
import { useFocusEffect } from "@react-navigation/native";
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
    FlatList,
    RefreshControl,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ActivityIndicator,
    Vibration

} from "react-native";
import { BlurView } from 'expo-blur';
import B1 from "../assets/icons/b1.js";
import B2 from "../assets/icons/b2.js";
import B3 from "../assets/icons/b3.js";
import B4 from "../assets/icons/b4.js";

import NewsletterPage from "./main-2/news1.js"
import RB from "../SCREENS/ReactBottomsheet.js"
import BottomSheet, { BottomSheetView, BottomSheetScrollView, BottomSheetTextInput, BottomSheetFlatList, BottomSheetBackdrop } from '@gorhom/bottom-sheet';


import NewsLettericon from "../assets/icons/Newsletter.js"
import Box from "../assets/icons/box.js"
import Startsy2 from "../assets/icons/startsy2.js"
import main from "../styles/main.js"
import Foryou from "./main-1/Foryou.js"
import Apnauser from "./Apnauser.js"
import NewsLetter from "./main-1/NewsLetter.js"
import Startsy from "./main-1/Startsy.js"
// import Message from "./main-1/Message.js"
import ChatScreen from "./main-1/Message.js"
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Profile from "./main-1/Profile.js"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { GlobalContext } from "@/Global/globalcontext.js";
import { url } from "../config.js"
import Singleprofilepage from "./singleprofilepage.js";
import styles1 from "../styles/Alert.js"

import { GestureHandlerRootView } from "react-native-gesture-handler";



const Main1 = ({ navigation }) => {
    // console.log(API_URL);


    const askAspectRatio = async () => {
        setVisible(true);
    };

    const [visible, setVisible] = useState(false);
    const [newaspect, setnewaspect] = useState(false);



    const openBottomSheet1 = () => {
        navigation.navigate("CommunityPage")
    };
    const openBottomSheet2 = () => {
        navigation.navigate("Blogpage")
    };


    // navigation.navigate("Green")
    const [sendingpost, setsendingpost] = useState(false)
    const mainpagebottomsheet = useRef();
    const snapPoints = useMemo(() => ['20%'], []);
    const BottomSheetContent = () => (
        <BottomSheetView style={styles.bottomSheetContent}>
            <Pressable style={styles.iconButton}
                onPress={openBottomSheet1}
            >
                <View style={[styles.ic, { flex: 1, width: "100%", alignSelf: "center" }]}>
                    <B1 />
                </View>
                <Text style={styles.bottomsheettext}>Community</Text>
            </Pressable>
            <Pressable style={styles.iconButton}
                onPress={openBottomSheet2}
            >
                <View style={[styles.ic, { flex: 1, width: "100%", alignSelf: "center" }]}>
                    <B2 />
                </View>
                <Text style={styles.bottomsheettext}>Blog</Text>
            </Pressable>
            <Pressable style={styles.iconButton}
                onPress={() => askAspectRatio()}
            >
                <View style={[styles.ic, { flex: 1, width: "100%", alignSelf: "center" }]}>
                    <B3 />
                </View>
                <Text style={styles.bottomsheettext}>Media</Text>
            </Pressable>
        </BottomSheetView>
    );


    const [token, setToken] = useState("");
    const [data, setData] = useState(null);
    const { globaldata } = useContext(GlobalContext);
    const flatListRef = useRef(null);


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
            // Add to selected array (You can create a selectedItems array if needed)
            // Assuming you want to add it to some other array like selectedItems
            // setSelectedItems(prev => [...prev, peopledata[index].user._id]);
            setSelectedItems(prev => new Set(prev).add(peopledata[index].user._id));
        } else {
            // Remove from selectedItems array
            // setSelectedItems(prev => prev.filter(item => item !== id));
            const updatedSet = new Set(SelectedItems);
            updatedSet.delete(id);
            setSelectedItems(updatedSet);
        }


    }


    useFocusEffect(
        useCallback(() => {
            // console.log(globaldata, "global data");
            setToken(globaldata.token);
        }, [globaldata])
    );;

    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181a"); // Set your desired color
        StatusBar.setBarStyle("light-content");

        return () => {
            StatusBar.setBackgroundColor("#16181a"); // Set your desired color
            StatusBar.setBarStyle("light-content");
        }

    })


    const [index,setIndex]=useState(0);

    // useFocusEffect(useCallback(()=>{
    //    setIndex(0)
    // },[]))






    useEffect(
        () => {
            StatusBar.setBackgroundColor("#16181a"); // Set your desired color
            StatusBar.setBarStyle("light-content");

            // console.log("main1 main1");
        }
    ), [];


    const [bg, setbg] = useState("#16181a")



    const Tab = createBottomTabNavigator();


    const [commenttext, setcommenttext] = useState("");
    const [postToShareId, setpostToShareId] = useState("")
    const [SelectedItems, setSelectedItems] = useState(new Set())
    const [peopledata, setpeopledata] = useState([])
    const bottomSheetRef6 = useRef(null);
    const snapPoints6 = useMemo(() => ['70%'], []);



    async function openshare(postid) {
        // console.log(postid);
        setpostToShareId(postid);
        setSelectedItems(new Set())

        var final1 = peopledata.map((item) => {
            return { ...item, isSelected: false }
        })
        setpeopledata(final1)


        // bottomSheetRef6.current?.expand();
        bottomSheetRef6.current?.snapToIndex(0);
    }


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
                // console.log(result, "list of followers");


                const uniqueData = result.filter((item, index, self) =>
                    self.findIndex(innerItem => innerItem.user.userName === item.user.userName) === index
                );
                var final1 = uniqueData.map((item) => {
                    return { ...item, isSelected: false }
                })
                // console.log(final1);






                if (response.status === 200) {
                    // You can update the data state here if needed
                    // setData(result); // Example, you can handle the response data
                    // setpeople1(final1)
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





    const updatescroll = (val) => {
        // console.log('====================================');
        // console.log(val);
        t1.setValue(val);
        // console.log('====================================');
    }

    const t1 = new Animated.Value(0);
    const diffclamp = Animated.diffClamp(t1, 0, 55);
    const bottomposition = diffclamp.interpolate({
        inputRange: [0, 55],
        outputRange: [0, 55],
        extrapolate: "clamp",
    })

    function closeall() {
        // console.log("hi");

    }
    const [postid, setpostid] = useState(null);

    const [open, setOpen] = useState(false)
    const [allcomments, setallcomments] = useState([]);
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

    const bottomSheetRef5 = useRef(null);
    const [uploadingcomment, setuploadingcomment] = useState(false);
    async function docomment() {
        // console.log(commenttext, "inn");
        // console.log(postid, "id");


        setuploadingcomment(true);

        try {
            const response = await fetch(`${url}investor/postSuggestions/${postid}`, {
                method: 'POST',
                body: JSON.stringify({ suggestion: commenttext }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            // console.log(data);
            // console.log(response);

            // setemptycomment(false);
            setcommenttext("");

            // var object = {
            //     comment: commenttext,
            //     createdAt: new Date(),
            //     userId: {
            //         profilePhoto: data.profilePhoto,
            //         userName: data.userName,
            //     }
            // };

            // console.log(object)
            // var newarray = [...allcomments];
            // newarray.unshift(object);
            // setallcomments(newarray);

            const scrollToTop = () => {
                // flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
            };
            scrollToTop();
            scrollToTop();
        } catch (err) {
            console.log(err);
        } finally {
            setuploadingcomment(false);
        }
    }


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

        // async function deletepost1() {
        //     console.log("Deleting post...");
        //     if (idofposttobedeleetd != null) {
        //         setisdeleting(true)
        //         try {
        //             const response = await fetch(`${url}posts/deletepost/${idofposttobedeleetd}`, {
        //                 method: 'POST',
        //                 body: "",
        //                 headers: {
        //                     accept: "application/json",
        //                     "Authorization": `Bearer ${token}`,
        //                 },
        //             });

        //             const data = await response.json();
        //             console.log(data);

        //             // Remove the post from the local state
        //             const updatedPosts = posts.filter((post) => post._id !== idofposttobedeleetd);
        //             setPosts(updatedPosts);
        //             setVisible(false)
        //         } catch (err) {
        //             console.log(err);
        //         }
        //         finally {
        //             setisdeleting(false)
        //         }
        //     }
        // }

        return (
            <Modal transparent visible={visible} animationType="none" onRequestClose={() => onClose?.()}>
                <TouchableWithoutFeedback onPress={() => onClose?.()}>
                    <Animated.View style={[styles1.overlay, { opacity: fadeAnim }]}>
                        <TouchableWithoutFeedback>
                            <View style={styles1.alertBox}>
                                <Text style={styles1.title}>Delete Post</Text>
                                <Text style={styles1.message}>Click confirm to delete.</Text>
                                <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>

                                    <TouchableOpacity onPress={() => onClose?.()} style={styles1.button}>
                                        <Text style={styles1.buttonText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => deletepost1()} style={styles1.button}>
                                        {isdeleting && <ActivityIndicator size={24} color="#16181a" />}
                                        {!isdeleting && <Text style={styles1.buttonText}>Confirm</Text>}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    };

    const renderBackdrop = (props) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1} // Backdrop disappears when BottomSheet is closed
            appearsOnIndex={0} // Backdrop appears when BottomSheet is open
            opacity={0.9} // Set opacity for the backdrop
        />
    );

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
                    <TouchableOpacity onPress={() => { handleshareselection(item.user._id, index) }} style={item.isSelected ? styles.sendbtn1 : styles.sendbtn}><Text style={item.isSelected ? styles.sendbtnText1 : styles.sendbtnText}>{item.isSelected ? "Selected" : "Send"}</Text></TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }
    const { height, width } = Dimensions.get("window");







    return (


        <GestureHandlerRootView>

            <SafeAreaView style={main.container}>

                <View style={{ flex: 1, backgroundColor: "red", position: "absolute", top: 0, width: "100%", height: height }}>
                    <Tab.Navigator
                        initialRouteName="Startsy"
                        screenOptions={{
                            tabBarActiveTintColor: "#00DE62",
                            tabBarInactiveTintColor: "#7A7B7C",
                            headerShown: false,
                            tabBarStyle: {
                                backgroundColor: 'transparent',
                                height: 60,
                                // zIndex  : -1,
                                opacity: 1,
                                borderTopWidth: 0,
                                paddingTop: 10,
                                position: "absolute",
                                tabBarHideOnKeyboard: true,

                                // transform :[{translateY : bottomposition}] 
                            },





                            tabBarButton: (props) => (
                                <TouchableOpacity
                                    {...props}
                                    onPress={() => {
                                        Vibration.vibrate(20); // Vibrates for 100ms
                                        props.onPress?.();
                                    }}
                                />
                            ),


                            tabBarBackground: () => (
                                <BlurView
                                    experimentalBlurMethod="dimezisBlurView"
                                    blurAmount={30}
                                    intensity={90} style={{ flex: 1 }} tint="dark" />
                            ),
                        }}

                    >
                        <Tab.Screen
                            screenOptions={{


                            }}
                            name="ForYou"
                            children={(props) => <Foryou scroll={updatescroll} token={token} openshare={openshare} mainpagebottomsheet={mainpagebottomsheet}
                            
                            visible={visible} setVisible={setVisible} newaspect={newaspect} setnewaspect={setnewaspect} 
                            />}
                            options={{
                                tabBarLabel: "",
                                tabBarIcon: ({ focused }) => (
                                    <View style={{ flex: 1, marginTop: -7, width: 49, marginLeft: 15, justifyContent: "center", height: 30 }}>
                                        <Box color={focused ? "#00DE62" : "#828282"} />
                                    </View>
                                ),
                            }}
                        />
                        <Tab.Screen
                            name="NewsLetter"
                            component={NewsLetter}
                            options={{
                                tabBarLabel: "",
                                tabBarIcon: ({ focused }) => (

                                    <View style={{ flex: 1, width: 30, marginLeft: 10, justifyContent: "center", height: 30 }}>
                                        <NewsLettericon color={focused ? "#00DE62" : "#828282"} />
                                    </View>
                                ),
                            }}
                        />
                        <Tab.Screen
                            name="Startsy"
                            // component={Startsy}
                            children={(props) => <Startsy navigation={navigation} token={token} bottomSheetRef5={bottomSheetRef5} setpostid={setpostid} />}
                            options={{
                                tabBarLabel: "",
                                tabBarIcon: ({ focused }) => (
                                    <>
                                        {!focused && <Image style={{ width: 50, height: 50 }} source={require("../assets/images/logogray1.png")} />}
                                        {focused && <Image style={{ width: 50, height: 50 }} source={require("../assets/images/logo.png")} />}
                                    </>
                                ),
                            }}
                        />
                        <Tab.Screen
                            name="Message"
                            // component={ChatScreen}
                            children={(props) => <ChatScreen navigation={navigation} token={token} />}
                            options={{
                                tabBarLabel: "",
                                tabBarIcon: ({ focused }) => (
                                    <View style={{ marginTop: -2 }}>
                                        <MaterialCommunityIcons name="message-text-outline" size={32} color={focused ? "#00DE62" : "#7A7B7C"} />

                                    </View>
                                ),
                            }}
                        />
                        <Tab.Screen
                            name="Profile"

                            children={() => <Apnauser closeall={closeall} mainpagebottomsheet={"mainpagebottomsheet"} navigation={navigation} token={token} />}
                            options={{

                                tabBarLabel: "",
                                tabBarIcon: ({ focused }) => (
                                    <View style={{ marginLeft: -2, marginTop: -4 }}><FontAwesome6 name="circle-user" size={30} color={focused ? "#00DE62" : "#7A7B7C"} /></View>
                                ),
                            }}
                        />
                        <Tab.Screen
                            name="NewsletterPage"
                            component={NewsletterPage} // Replace with the desired component

                            options={{
                                tabBarItemStyle: { display: 'none' },

                                tabBarButton: () => null, // Hides the tab from the bar
                                tabBarVisible: false,     // Ensures it doesn't take space in the bar
                            }}
                        />
                        <Tab.Screen
                            name="Singleprofilepage"
                            // component={Singleprofilepage} // Replace with the desired component
                            children={() => <Singleprofilepage navigation={navigation} openshare={openshare} />}
                            options={{
                                tabBarItemStyle: { display: 'none' },
                                tabBarButton: () => null, // Hides the tab from the bar
                                tabBarVisible: false,     // Ensures it doesn't take space in the bar
                            }}
                        />

                    </Tab.Navigator>

                </View>






                <BottomSheet
                    overlayColor="rgba(0, 0, 0, 0.9)"
                    enablePanDownToClose
                    backdropComponent={renderBackdrop}
                    // renderBackdrop={renderBackdrop}
                    backgroundStyle={{ backgroundColor: '#1A1D1F', borderRadius: 30 }}
                    handleIndicatorStyle={{ backgroundColor: '#00de62' }}
                    ref={bottomSheetRef6}
                    enableDynamicSizing={false}
                    snapPoints={snapPoints6}
                    onClose={() => {



                        // setansh(false);
                        // setcomment(false);
                        // setstatus(false);
                    }}
                    index={-1}
                    contentContainerStyle={{ zIndex: 100, elevation: 20 }}
                >
                    <View style={{ flex: 0.92 }}>
                        <Pressable onPress={() => {
                            // console.log(SelectedItems)
                            // console.log(SelectedItems.size);

                        }
                        }>
                            <Text style={styles.comment}>Share</Text>
                        </Pressable>

                        {/* {emptycomment && <Text style={styles.no}>No comments yet</Text>} */}
                        <BottomSheetFlatList
                            ref={flatListRef}
                            data={peopledata}
                            renderItem={renderpeople}
                            contentContainerStyle={{ paddingBottom: 80 }}
                            scrollEnabled={true}
                            style={{ flex: 1, backgroundColor: '#1A1D1F' }}
                        />

                        {SelectedItems.size > 0 && <TouchableOpacity onPress={finalsubmit} style={styles.confirm}>


                            {!sendingpost && <Text style={styles.confirmText}>Confirm</Text>}
                            {sendingpost && <ActivityIndicator size={24} color="#16181a" />}
                        </TouchableOpacity>}

                    </View>
                </BottomSheet>




                <BottomSheet
                    overlayColor="rgba(0, 0, 0, 0.9)"
                    enablePanDownToClose
                    backgroundStyle={{ backgroundColor: '#16181a', borderRadius: 30 }}
                    handleIndicatorStyle={{ backgroundColor: '#00de62' }}
                    style={{ zIndex: 100000, elevation: 1000 }}
                    enableDynamicSizing={false}
                    ref={mainpagebottomsheet}
                    snapPoints={snapPoints}
                    backdropComponent={renderBackdrop}
                    index={-1}

                >
                    <BottomSheetContent />
                </BottomSheet>






                {/* <RB open={open}
                    setOpen={setOpen}
                    allcomments={allcomments}
                    comments={comments}
                    bottomSheetRef5={bottomSheetRef5}
                    docomment={docomment}
                    uploadingcomment={uploadingcomment} setallcomments={setallcomments} setcommenttext={setcommenttext} commenttext={commenttext} /> */}
            </SafeAreaView>
        </GestureHandlerRootView >

    )
}


export default Main1;

const styles = StyleSheet.create({



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
        borderColor: "#00de62",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,

    },

    sendbtnText1: {
        fontSize: 14,
        color: "#00de62",
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

    listItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#333",
        alignSelf: "flex-start",
        width: "92%",
        marginHorizontal: "auto"
    },


    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
        alignSelf: "flex-start"
    },
    textContainer: {
        flex: 1,
        alignSelf: "flex-start",
    },
    username: {
        fontSize: 18,
        color: "#00DE62",
        fontFamily: "Alata",
        alignSelf: "flex-start",
        marginTop: 0,
        marginBottom: 5
    },
    message: {
        fontSize: 14,
        color: "#B8B8B8",
        marginTop: -3,
        width: "92%",
        // backgroundColor : "red"
    },
    comment: {
        fontFamily: "Roboto",
        color: "#bbbbbb",
        fontSize: 24,
        marginVertical: 10,
        textAlign: "center",

    },

    bottomSheetContent: {
        display: "flex",
        flexDirection: "row",
        width: "94%",
        // height : "50%",
        marginHorizontal: "auto",
        justifyContent: "space-around",
        // backgroundColor  :"red",
        zIndex:2000,
        elevation:1000,
        marginTop: 20
    }, iconButton: {
        display: "flex",
        width: "20%",
        height: "98%",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        alignContent: "center",
        // backgroundColor: "red",
        minWidth: "24%",
        // backgroundColor : "red",

    }, bottomsheettext: {
        textAlign: "center",
        fontSize: 12,
        color: "#B8B8B8",
        fontFamily: "Roboto",
        marginTop: 12
    },
})