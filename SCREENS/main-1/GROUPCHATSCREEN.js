import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { SafeAreaView, Text, Pressable, TextInput, View, Image, StyleSheet, StatusBar, Platform, Animated, Easing, Dimensions, FlatList, ScrollView, Keyboard, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { ScrollView } from "react-native-gesture-handler";
import { InteractionManager } from "react-native";
import B1 from "../../assets/icons/b1.js"

import { BackHandler } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";

import io from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import { url } from "../../config.js"

const Chat1 = ({ navigation, route }) => {

    const [newtext, setnewtext] = useState("")
    const { item, messages, token } = route.params;


    console.log(item, "params");

    const { extra } = route.params;

    // console.log(extra, "extra ");

    // console.log(messages, "message");


    const btn11 = useRef(null)

    var [loggedInUserProfilePhoto, setloggedInUserProfilePhoto] = useState("")

    useEffect(() => {
        async function f1() {
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
                console.log(result.data);
                setloggedInUserProfilePhoto(result.data)
            } catch (err) {
                console.log(err);
            }
        }
        f1()
    }, [])


    function sendmessage() {


        // console.log("hiiii");


        if (newtext == "") {
            return
        }
        // if (inputRef.current) {
        //     inputRef.current.focus();
        // }



        // console.log(messages);

        // const finaldata = {
        //     senderId: id,
        //     receiverId: jisuserkosendkarnahaiuskiid,
        //     message: newtext
        // }

        const finaldata = {
            groupId: item._id,
            senderId: id,
            message: newtext
        }

        console.log(finaldata, "finaldata");
        // console.log(data, "data ");

        socket.emit("groupMessage", finaldata)
        setdata([...data, {
            message: newtext, senderId: {
                _id: id,
                profilePhoto: loggedInUserProfilePhoto
            }
        }])




        if (flatListRef.current) {

            console.log("scroll karne wala hu");

            flatListRef.current.scrollToOffset({
                offset: data.length * 100,
                animated: true,
            });
        }
        setnewtext("")


    }


    useEffect(() => {
        var decode = jwtDecode(token);
        // console.log(decode);

        if (extra && extra.status) {
            setnewtext(`${decode.userName} has considered your application for ${extra.jobrole} Now you can chat for further discussion.`)
        }

    }, [extra])
    // console.log(item, "chatscreen ka item hai ");

    const jisuserkosendkarnahaiuskiid = item._id;
    // console.log(jisuserkosendkarnahaiuskiid, "user id");


    // const [data, setdata] = useState(null)
    const [data, setdata] = useState([])



    // console.log('====================================');





    const [socket, setSocket] = useState(null);
    const [id, setid] = useState(null);
    const flatListRef = useRef(null);
    const [keyboardstatus, setkeyboardstatus] = useState(false)
    const inputRef = useRef(null);
    const [offset, setoffset] = useState(320)




    useEffect(() => {
        const setStatusBar = () => {
            StatusBar.setBackgroundColor("#16181A"); // Set your desired color
            StatusBar.setBarStyle("light-content");
        };
        console.log(messages);
        console.log(messages);


        setdata(messages)
        setStatusBar();
        setTimeout(() => {
            setStatusBar()
        }, 0);

        if (messages && flatListRef.current) {
            setTimeout(() => {
                // Ensure we are only scrolling when new messages are added
                InteractionManager.runAfterInteractions(() => {
                    flatListRef.current.scrollToOffset({
                        offset: messages.length * 100,  // Adjust to actual item height
                        animated: false,
                    });
                });
            }, 100);
        }



    }, [])




    useEffect(() => {
        // Connect to the Socket.IO server
        const newSocket = io(`${url}`, {
            transports: ["websocket"], // Ensure WebSocket is used
        });

        setSocket(newSocket);
        const decoded = jwtDecode(token);
        // console.log(decoded);

        setid(decoded._id)


        // Clean up the connection on unmount
        return () => {
            newSocket.disconnect();
        };
    }, []);




    useEffect(() => {


        if (socket) {

            const finaldata = {
                groupId: item._id,
                userId: id,
            }

            // const data = {
            //     groupId: item._id,
            //     userId: id ,
            //     messages :newtext 
            // }

            // console.log(finaldata, "group join karte vakt ye bhej raha hu");

            socket.emit("joinGroup", finaldata)

            // console.log("i am connection socke url, ", url);
            // Listen for incoming private messages
            socket.on("groupMessage", ({ data1, pfp }) => {

                console.log("groupmessage backend se aaya hai", data1);
                if (data1.senderId == id) return



                // console.log(data);

                setdata((prev) => [...prev, data1])

                function scroll() {
                    if (flatListRef.current) {
                        console.log("scroll karne wala hu dusre mobile me");
                        flatListRef.current.scrollToOffset({
                            offset: data.length * 100,
                            animated: true,
                        });
                    }

                }
                scroll()

                // setdata((prevMessages) => [...prevMessages, data]);
            });
        }
    }, [socket]);


    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;

            const setStatusBar = () => {
                StatusBar.setBackgroundColor("#16181A");
                StatusBar.setBarStyle("light-content");
            };

            // Update status bar reliably
            setStatusBar();

            // // Use InteractionManager to defer actions until navigation is settled
            const interaction = InteractionManager.runAfterInteractions(() => {
                //     if (isActive) {
                //         if (flatListRef.current) {
                //             flatListRef.current.scrollToOffset({
                //                 offset: data.length * 100,
                //                 animated: true,
                //             });
                //         }
                //     }
            });
            // if (flatListRef.current) {
            //     flatListRef.current.scrollToOffset({
            //         offset: messages.length * 200,
            //         animated: true,
            //     });
            // }

            // Keyboard event listeners
            const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", (e) => {
                // console.log(e.endCoordinates.height);
                // console.log(height);

                if (e.endCoordinates.height > 1) {

                    if (isActive) setoffset(e.endCoordinates.height);
                }


            });

            const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
                if (isActive) {
                    setkeyboardstatus(false);
                    if (inputRef.current) inputRef.current.blur();
                }
            });

            // Cleanup function
            return () => {
                isActive = false;
                interaction.cancel();
                keyboardDidShowListener.remove();
                keyboardDidHideListener.remove();
            };
        }, [data]) // Dependency on `data.length` for accurate scroll behavior
    );







    const renderItem = ({ item, index }) => {

        const dataLength = data.length;


        if (item.senderId == null) {
            // console.log("yeh hai null", item);
            return
        }
        // console.log(dataLength);

        else return (
            <View style={{ display: "flex", flex: 1, width: "100%" }}>

                {index < (dataLength - 1) && item.senderId?._id != data[index + 1].senderId?._id && <Image style={item.senderId._id != id ? styles.pfpleft : styles.pfpright} source={{ uri: item.senderId.profilePhoto }} />}

                {index == dataLength - 1 && <Image style={item.senderId._id != id ? styles.pfpleft : styles.pfpright} source={{ uri: item.senderId.profilePhoto }} />}


                <View style={[
                    styles.message,
                    (item.senderId._id != id) ? styles.received : styles.sent
                ]}>


                    <View
                        allowFontScaling={false}
                        style={[(item.senderId._id == id) ? styles.senttext : styles.receivedtext]}
                    >
                        {item.senderId._id != id && <Text style={styles.messageUserNameLeft} >{item.senderId.userName}</Text>}

                        <Text style={[(item.senderId._id != id) ? styles.messagestyleLeft : styles.messagestyleRight]}    >{item.message}</Text>
                    </View>
                </View>
            </View>
        );
    };


    // const renderItem = ()=>{
    //     return(
    //         <Text>hello</Text>
    //     )
    // }
    const handleFocus = (e) => {

        setkeyboardstatus(true)

    };
    const marginBottom = new Animated.Value(0);
    useEffect(() => {
        Animated.timing(marginBottom, {
            toValue: keyboardstatus ? offset : 0, // Transition to either the offset or 0
            duration: 0, // 300ms transition
            useNativeDriver: false, // MarginBottom can't be animated natively
        }).start();
    }, [keyboardstatus]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack();
            setkeyboardstatus(false)
            // console.log("hi");
            if (inputRef.current) {
                inputRef.current.blur();
            }

            return true; // This prevents the default back action
        });

        return () => backHandler.remove();
    }, [token]);

    useEffect(() => {

    }, [data]);

    function handlenext() {
        var decode = jwtDecode(token)
        // if (decode.role == "Investor") {
        //     return
        // }
        navigation.navigate("GroupDescriptionPage", { token: token, item })
        // navigation.navigate("Singleprofilepage", { token: token, id: item.user._id, page: "Chat", item, messages, })
    }


    const [keyboardOffset, setKeyboardOffset] = useState(new Animated.Value(0));
    useFocusEffect(
        useCallback(() => {
            const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
                Animated.timing(keyboardOffset, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            });

            const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
                Animated.timing(keyboardOffset, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
                // setk(false)
                // inputRef.current?.blur()
            });

            return () => {
                keyboardDidShowListener.remove();
                keyboardDidHideListener.remove();
            };
        }, [keyboardOffset])
    )


    return (
        // <SafeAreaView style={{ flex: 1, paddingVertical: 10, backgroundColor: "#16181a" }}>
        //     <View style={[styles.header]}>
        // <Pressable onPress={() => { navigation.goBack() }}>
        //     <Ionicons name="arrow-back-circle-outline" size={40} color="#00DE62" />
        // </Pressable>

        // <Pressable
        //     onPress={() => { handlenext() }}
        // >
        //     <View style={styles.details}>
        //         <View style={styles.userimg}>
        //             <B1 />
        //         </View>
        //         <View style={styles.d2}>
        //             <Text allowFontScaling={false} style={styles.userid}>{item.communityName}</Text>
        //             <Text allowFontScaling={false} style={styles.username}>{item.communityName}</Text>
        //         </View>
        //     </View>
        // </Pressable>


        //     </View>
        //     <KeyboardAvoidingView keyboardVerticalOffset={-100}
        //         keyboardShouldPersistTaps={false}
        //         style={{ flex: keyboardstatus ? (1 - (offset / height) - 0.08) : 1 }}
        //     >


        //         <FlatList
        //             style={[styles.scroll,]}
        //             data={data}
        //             ref={flatListRef}
        //             renderItem={renderItem}

        //             getItemLayout={(data, index) => ({ length: 100, offset: 100 * index, index })}
        //             contentContainerStyle={{
        //                 paddingHorizontal: 10,
        //                 paddingVertical: 20,
        //                 justifyContent: 'flex-end',
        //             }}
        //         />
        //     </KeyboardAvoidingView>
        //     <View behavior="padding" >
        //         {/* <ScrollView style={{}}> */}
        //         {/* <Pressable onPress={() => { setkeyboardstatus(true) }}> */}
        //         <Animated.View style={[styles.searchContainer, marginBottom]}>
        //             <TextInput
        //                 ref={inputRef}
        //                 autoCorrect={true}
        //                 allowFontScaling={false}
        //                 multiline={true}
        //                 style={styles.searchInput}
        //                 placeholder="Type ..."
        //                 placeholderTextColor="#828282"
        //                 onFocus={handleFocus}
        //                 // onBlur={() => setkeyboardstatus(false)}
        //                 onChangeText={(val) => setnewtext(val)}
        //                 value={newtext}

        //                 onTouchStart={(e) => {
        //                     e.preventDefault(); // Prevent immediate focus
        //                     setTimeout(() => {
        //                         inputRef.current.focus();
        //                     }, 500); // Delay focus by 500ms
        //                 }}
        //             />



        //         </Animated.View>

        //         <TouchableOpacity

        //             ref={btn11}
        //             onTouchStart={() => { inputRef.current.focus(); }}
        //             style={styles.send} onPress={sendmessage}>
        //             <Ionicons name="send" size={24} color="#00DE62" />
        //         </TouchableOpacity>
        //         {/* </Pressable> */}
        //         {/* </ScrollView> */}
        //     </View>
        // </SafeAreaView >


        <Animated.View style={{ flex: 1, }}>

            <View style={{ flex: 1.1, backgroundColor: "#16181a" }}>


                <View style={[styles.header]}>
                    <Pressable style={{paddingLeft : 10 , paddingTop : 7}} onPress={() => { navigation.goBack() }}>
                        {/* <Ionicons name="arrow-back-circle-outline" size={36} color="#00DE62" /> */}
                        <FontAwesome6 name="chevron-left" size={25} color="#00DF60" />

                    </Pressable>

                    <Pressable
                        onPress={() => { handlenext() }}
                    >
                        <View style={styles.details}>
                            <View style={styles.userimg}>
                                {(item.groupPhoto == undefined || item.groupPhoto == "") && <B1 color={"#ccc"} />}
                                {item.groupPhoto && <Image style={{ width: 44, height: 44, borderRadius: 30 , marginRight : 10 }} source={{ uri: item.groupPhoto }} />}
                                {/* <B1 color={"#ccc"} /> */}
                            </View>
                            <View style={styles.d2}>
                                <Text numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false} style={styles.userid}>{item.communityName}</Text>
                                <Text allowFontScaling={false} style={[styles.username,]} ellipsizeMode="tail" numberOfLines={1}>{item.communityDescription}</Text>
                            </View>
                        </View>
                    </Pressable>


                </View>
                <FlatList
                    // style={{height : 600}}
                    data={data}
                    removeClippedSubview={false}
                    initialNumToRender={20}  // Only load 20 items initially
                    maxToRenderPerBatch={10}  // Render only 10 items per batch
                    windowSize={21}
                    legacyImplementation={true}
                    bounces={true}
                    contentInset={{ top: 10 }}
                    ref={flatListRef}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item._id}
                    // onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}

                    getItemLayout={(data, index) => ({ length: 100, offset: 100 * index, index })}
                    contentContainerStyle={styles.messagesContainer}
                />

                {/* <FlatList
                        data={data}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => <Text style={styles.message}>ok</Text>}
                        contentContainerStyle={styles.messagesContainer}
                    /> */}




                <View style={{ zIndex: 100000, bottom: 0 }} >
                    <Animated.View style={[styles.searchContainer, { marginBottom: keyboardOffset }]}>
                        <TextInput
                            ref={inputRef}
                            autoCorrect={true}
                            allowFontScaling={false}
                            multiline={true}
                            style={styles.searchInput}
                            placeholder="Type ..."
                            placeholderTextColor="#828282"
                            // onBlur={() => setkeyboardstatus(false)}
                            onChangeText={(val) => setnewtext(val)}
                            value={newtext}


                        />



                    </Animated.View>

                    <TouchableOpacity
                        ref={btn11}
                        onTouchStart={() => { inputRef.current.focus(); }}
                        style={styles.send} onPress={sendmessage}>
                        <Ionicons name="send" size={24} color="#ccc" />
                    </TouchableOpacity>
                </View>
                {/* <Animated.View style={[styles.inputContainer, { marginBottom: keyboardOffset }]}>
                        <TextInput
                            style={styles.input}
                            // value={inputText}
                            // onChangeText={setInputText}
                            placeholder="Type a message..."
                        />
                        <TouchableOpacity style={styles.sendButton}>
                            <Text style={styles.sendButtonText}>Send</Text>
                        </TouchableOpacity>
                    </Animated.View> */}

            </View>
        </Animated.View>


    )
}


export default Chat1



const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;


const scalingfactor = Math.sqrt(a * b)


const styles = StyleSheet.create({
    container: {

        flex: 1,
        // height: height,
        backgroundColor: "#16181a",
        // backgroundColor: "yellow",
        marginTop: 0,
        top: 0
    },

    searchContainer: {
        marginHorizontal: "auto",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        display: "flex",
        // height: 100,
        width: "98%",
        // marginBottom: 320,
        // backgroundColor: "yellow",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 30,
        justifyContent: "flex-start",


        // position : "absolute",
        // bottom : 0
    },
    searchInput: {
        height: "auto",
        minHeight: 50,
        width: width * 0.85,
        justifyContent: "flex-start",
        right: 0,
        alignSelf: "flex-start",

        // borderColor: "#00DE62",

        // borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 20,
        color: "#bbbbbb",
        fontFamily: "Roboto",
        fontSize: 18,
        maxHeight: 100,
        // backgroundColor: "red",



        // marginBottom  :20
    },
    image: {
        width: 43,
        height: 43,
        borderRadius: 100,
        // marginBottom :100
    },

    userid: {
        fontFamily: "Alata",
        fontSize: 20,
        width: "100%",
        // backgroundColor: "red",
        color: "#00DE62",
        alignSelf: "flex-start",

    },
    username: {
        fontFamily: "Roboto",
        fontSize: 12,
        color: "#B8B8B8",
        alignSelf: "flex-start",
    },
    details: {
        display: "flex",
        flexDirection: "row",
        width: "100%"
    },
    header: {
        height: 100,
        width: "100%",
        // position: "absolute",

        // opacity : 0.1,
        backgroundColor: "#16181a",
        // left: 0,
        padding: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        zIndex: 1000,
        position: "relative",
        // top: 0,
        // marginTop: 5,
        paddingBottom: 12,
        height: 60,
    },
    d2: {
        alignSelf: "center",
        alignContent: "flex-start",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingLeft: 0,
        marginTop: -10,
        // backgroundColor: "yellow",
        // flex: 1,
        width: "75%",
        // marginBottom  :10
    }
    ,
    scroll: {

        // backgroundColor: "red",
        // flex: 0.5,
        // height :height/2
        // overflow : "visible"
    },
    message: {
        height: "auto",
        minHeight: 30,
        // backgroundColor : "red",
        marginBottom: 10,
        marginTop: 0,
        marginLeft: 30
    },
    senttext: {
        // fontFamily: "Roboto",
        fontSize: 20,
        color: "#16181a",
        maxWidth: width * 0.6,
        // fontWeight: "bold",
        // backgroundColor: "red",
        borderRadius: 20,
        alignSelf: "flex-end",

        borderBottomRightRadius: 2,
        borderWidth: 2,
        borderColor: "#ccc",
        backgroundColor: "transparent",
        backgroundColor: "#ccc",
        maxWidth: width * 0.6,
        padding: 10,
        paddingVertical: 10,
        marginRight: 30

    },
    receivedtext: {
        fontFamily: "Roboto",
        fontSize: 22,
        color: "#ccc",
        maxWidth: width * 0.6,
        borderColor: "#ccc",
        fontWeight: "bold",
        borderWidth: 2,
        // backgroundColor : "red",
        borderRadius: 20,
        borderBottomLeftRadius: 2,
        backgroundColor: "transparent",
        maxWidth: width * 0.6,
        padding: 15,
        // paddingVertical: 10,

    }
    , sent: {
        alignItems: "flex-end",
        justifyContent: "center",
        marginVertical: 0
    }
    , received: {
        alignItems: "flex-start",
        justifyContent: "center",
        marginVertical: 0
    },
    send: {
        // width: 20,
        // height: 20,
        position: "absolute",
        elevation: 10000,
        zIndex: 100000,
        top: 12,
        right: 20,
        transform: [{ scale: 1.1 }],
        alignSelf: "center",
        verticalAlign: "center",
        bottom: 0,
    },
    pfpleft: {
        position: "absolute",
        width: 25,
        height: 25,
        borderRadius: 100,
        bottom: 10,
    },
    pfpright: {
        position: "absolute",
        width: 25,
        height: 25,
        right: 0,
        borderRadius: 100,
        bottom: 10,
    },

    messageUserNameLeft: {
        fontFamily: "Alata",
        fontSize: 10,

        color: "#999",
        // fontWeight: "bold",
        marginTop: -10,
        marginBottom: 5
    },

    messagestyleLeft: {
        fontFamily: "Roboto",
        fontSize: 16,
        color: "#ccc",
        fontWeight: "bold",
    },
    messagestyleRight: {
        fontFamily: "Roboto",
        fontSize: 16,
        color: "#000",
        fontWeight: "bold",
    }



})


