import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { SafeAreaView, Text, Pressable, TextInput, View, Image, StyleSheet, StatusBar, Platform, Animated, Easing, Dimensions, FlatList, ScrollView, Keyboard, KeyboardAvoidingView, TouchableOpacity, Linking } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { ScrollView } from "react-native-gesture-handler";
import { InteractionManager } from "react-native";

import { BackHandler } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";

import io from "socket.io-client";
import { jwtDecode } from "jwt-decode";
// import styles from "../../styles/post.js"

import { url } from "../../config.js"
import { useNavigation } from "@react-navigation/native";

const Chat = ({ route }) => {

    const [newtext, setnewtext] = useState("")
    const { item, messages, token, photo1, photo2, tabnavigation } = route.params;
    const { extra } = route.params;
    const itemdummy = route.params.item
    const navigation = useNavigation();


    console.log(messages.at(-2), "blog");



    console.log(photo1);
    console.log(photo2);



    const btn11 = useRef(null)
    const [keyboardOffset, setKeyboardOffset] = useState(new Animated.Value(0));

    // useFocusEffect(
    //     useCallback(()=>{

    //     } , [])
    // )




    function sendmessage() {


        console.log("hiiii");


        if (newtext == "") {
            return
        }




        console.log(messages);

        const finaldata = {
            senderId: id,
            receiverId: jisuserkosendkarnahaiuskiid,
            message: newtext,
            updatedAt: new Date(),
            // profilePhoto  : ""
        }
        socket.emit("privateMessage", finaldata)
        setdata((data) => [...data, { message: newtext, senderId: id, updatedAt: new Date() }])
        // setdata([...data, { message: newtext, senderId: id, updatedAt: new Date() }])


        setTimeout(() => {
            if (flatListRef.current) {
                flatListRef.current.scrollToOffset({
                    offset: (data.length + 1) * 700,
                    animated: false,
                });
                // flatListRef.current.scrollToEnd({ animated: false });
                // flatListRef.current.scrollToEnd({ animated: false });
                // flatListRef.current.scrollToEnd({ animated: false });

            }
        }, 1000);
        setnewtext("")


    }


    useEffect(() => {
        var decode = jwtDecode(token);
        console.log(decode);

        if (extra && extra.status) {
            setnewtext(`${decode.userName} has considered your application for ${extra.jobrole} Now you can chat for further discussion.`)
        }

    }, [extra])

    const jisuserkosendkarnahaiuskiid = item.user._id;


    const [data, setdata] = useState([])
    const [socket, setSocket] = useState(null);
    const [id, setid] = useState(null);
    const flatListRef = useRef(null);
    const [keyboardstatus, setkeyboardstatus] = useState(false)
    const inputRef = useRef(null);
    const [offset, setoffset] = useState(300)


    const decoded = jwtDecode(token);





    useEffect(() => {
        setdata(messages)
        setTimeout(() => {
            // Ensure we are only scrolling when new messages are added
            InteractionManager.runAfterInteractions(() => {
                flatListRef.current?.scrollToOffset({
                    offset: messages.length * 100,  // Adjust to actual item height
                    animated: false,
                });
            });
        }, 500);
    }, []);  // This runs only on mount

    useFocusEffect(
        useCallback(() => {
            setTimeout(() => {
                // Ensure we are only scrolling when new messages are added
                InteractionManager.runAfterInteractions(() => {
                    console.log('====================================');
                    console.log(messages.length);
                    console.log('====================================');
                    flatListRef.current?.scrollToOffset({
                        offset: messages.length * 100,  // Adjust to actual item height
                        animated: false,
                    });
                });
            }, 500);
        }, [messages])
    )



    useEffect(() => {
        const newSocket = io(`${url}`, {
            // transports: ["websocket"], // Ensure WebSocket is used
        });

        setSocket(newSocket);
        setid(decoded._id)


        // Clean up the connection on unmount
        return () => {
            newSocket.disconnect();
        };
    }, []);




    useEffect(() => {


        if (socket) {

            const finaldata = {
                senderId: id,
                receiverId: jisuserkosendkarnahaiuskiid,
                message: newtext
            }
            socket.emit("registerUser", finaldata)
            console.log("i am connection socke url, ", url);
            // Listen for incoming private messages
            socket.on("privateMessage", (data) => {
                console.log(data);
                setdata((prevMessages) => [...prevMessages, data]);
            });
        }
    }, [socket]);






    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const handlePress = (url) => {
        Linking.openURL(url);
    };

    // const renderItem = ({ item, index }) => {

    //     const renderMessage = (message) => {
    //         const parts = message.split(urlRegex);

    //         return parts.map((part, index) => {
    //             if (part.match(urlRegex)) {
    //                 return (

    //                     <Text onPress={() => handlePress(part)} style={{ color: '#000', alignSelf: "flex-start", paddingTop: 0, fontSize: 16, fontWeight: "bold", textDecorationLine: 'underline' }}>
    //                         {part}
    //                     </Text>

    //                 );
    //             }
    //             return <Text style={{ backgroundColor: "", marginTop: -10 }} key={index}>{part}</Text>;
    //         });
    //     };



    //     const dataLength = data.length;
    //     return (
    //         <View style={{ display: "flex", flex: 1, width: "100%" }}>
    //             {index < dataLength - 1 && item.senderId != data[index + 1].senderId && <Image style={item.senderId == jisuserkosendkarnahaiuskiid ? styles.pfpleft : styles.pfpright} source={{ uri: item.senderId == jisuserkosendkarnahaiuskiid ? photo2 : photo1 }} />}

    //             {index == dataLength - 1 && <Image style={item.senderId == jisuserkosendkarnahaiuskiid ? styles.pfpleft : styles.pfpright} source={{ uri: item.senderId == jisuserkosendkarnahaiuskiid ? photo2 : photo1 }} />}
    //             <View style={[styles.message,
    //             (item.senderId == jisuserkosendkarnahaiuskiid) ? styles.received : styles.sent
    //             ]}>
    //                 <Text allowFontScaling={false} style={[(item.senderId != jisuserkosendkarnahaiuskiid) ? styles.senttext : styles.receivedtext]}>
    //                     {renderMessage(item.message)}
    //                 </Text>
    //             </View>
    //         </View>
    //     );
    // };










    const renderMessage = (message) => {
        const parts = message.split(urlRegex);

        return parts.map((part, index) => {
            if (part.match(urlRegex)) {
                return (

                    <Text onPress={() => handlePress(part)} style={{ color: '#000', alignSelf: "flex-start", paddingTop: 0, fontSize: 16, fontWeight: "bold", textDecorationLine: 'underline' }}>
                        {part}

                    </Text>

                );
            }
            return <Text style={{ backgroundColor: "", marginTop: -10, position: "relative" }} key={index}>{part}

            </Text>;
        });
    };

    function messagetime(date) {
        var date = new Date(date)
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        const formattedTime = date.toLocaleString('en-US', options);
        return formattedTime
    }


    function renderdategap(date, index) {
        if (index > 0) {
            var date1 = new Date(data[index - 1].updatedAt)
            var date2 = new Date(date)
            const messageDate1 = date1.toLocaleDateString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            });
            const messageDate2 = date2.toLocaleDateString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            });

            if (messageDate1 != messageDate2) {
                return (
                    <View style={{ justifyContent: "center", textAlign: "center", marginVertical: 10, marginBottom: 20, padding: 10, width: "auto", margin: "auto", borderRadius: 10, }}>
                        <Text style={{ textAlign: "center", backgroundColor: "#363535", padding: 5, paddingHorizontal: 10, borderRadius: 10, color: "#bbbbbb" }}>{messageDate2}</Text>
                    </View>
                )
            }

        }
        else if (index == 0) {
            var date1 = new Date(date)
            const messageDate1 = date1.toLocaleDateString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            });
            return (
                <View style={{ justifyContent: "center", textAlign: "center", marginVertical: 10, marginBottom: 20, padding: 10, width: "auto", margin: "auto", borderRadius: 10, }}>
                    <Text style={{ textAlign: "center", backgroundColor: "#363535", padding: 5, paddingHorizontal: 10, borderRadius: 10, color: "#bbbbbb" }}>{messageDate1}</Text>
                </View>
            )
        }
    }
    // const renderItem = ({ item, index }) => {};

    const renderItem = React.useMemo(
        () => ({ item, index }) => {
            const dataLength = data.length;
            console.log(dataLength);

            return (
                <>
                    {renderdategap(item.updatedAt, index)}

                    {typeof item.message == "string" && <TouchableOpacity onLongPress={() => {
                        console.log("long pressed");

                    }}>
                        <View style={{ display: "flex", flex: 1 }}>
                            {index < dataLength - 1 && item.senderId != data[index + 1].senderId && <Image style={item.senderId == jisuserkosendkarnahaiuskiid ? styles.pfpleft : styles.pfpright} source={{ uri: item.senderId == jisuserkosendkarnahaiuskiid ? photo2 : photo1 }} />}
                            {index == dataLength - 1 && <Image style={item.senderId == jisuserkosendkarnahaiuskiid ? styles.pfpleft : styles.pfpright} source={{ uri: item.senderId == jisuserkosendkarnahaiuskiid ? photo2 : photo1 }} />}




                            <View style={[styles.message, (item.senderId == jisuserkosendkarnahaiuskiid) ? styles.received : styles.sent]}>
                                <View style={{ position: "relative", }} allowFontScaling={false}>
                                    <Text style={[{ position: "absolute", bottom: 6, zIndex: 10000, fontSize: 10, color: "#666" }, { right: item.senderId != jisuserkosendkarnahaiuskiid ? 40 : 15 }]}>{messagetime(item.updatedAt)}</Text>
                                    <Text style={[
                                        (item.senderId != jisuserkosendkarnahaiuskiid) ? styles.senttext : styles.receivedtext,

                                        { paddingRight: item.message.length < 20 ? 60 : 15 },

                                        { paddingBottom: item.message.length > 10 ? 20 : 15 }
                                    ]}> {renderMessage(item.message)}</Text>
                                </View>

                                {/* <View style={{ flexDirection: "row", alignSelf: "flex-end", alignItems: "center", marginTop: 5 }}>
                                                    <Text style={{ fontSize: 12, color: "#666", marginRight: 5 }}>
                                                        10.30 AM {/* Replace this with the actual timestamp */}
                                {/* </Text> */}
                                {/* </View> */}
                            </View>
                        </View>
                    </TouchableOpacity>}
                    {typeof item.message == "object" &&
                        <View style={[styles.message, (item.senderId == jisuserkosendkarnahaiuskiid) ? styles.received : styles.sent]}>

                            {index < dataLength - 1 && item.senderId != data[index + 1].senderId && <Image style={item.senderId == jisuserkosendkarnahaiuskiid ? styles.pfpleft1 : styles.pfpright1} source={{ uri: item.senderId == jisuserkosendkarnahaiuskiid ? photo2 : photo1 }} />}

                            {index == dataLength - 1 && <Image style={item.senderId == jisuserkosendkarnahaiuskiid ? styles.pfpleft1 : styles.pfpright1} source={{ uri: item.senderId == jisuserkosendkarnahaiuskiid ? photo2 : photo1 }} />}
                            <TouchableOpacity onPress={()=>tabnavigation.navigate("ViewSendedPost",{item:item})}>

                                <View style={[styles.box, {
                                    marginRight: item.senderId != jisuserkosendkarnahaiuskiid ? 25 : 0,
                                    marginLeft: item.senderId != jisuserkosendkarnahaiuskiid ? 25 : 0

                                }]}>
                                    <View style={styles.top} >
                                        <Pressable
                                            // onPress={() => { navigation.navigate("Singleuserpage", { token: token, id: "6793703e4d5879e729e089f2", page: "Chat" }) }}
                                            onPress={() => {
                                                navigation.navigate("Singleuserpage", { token: token, id: "6793703e4d5879e729e089f2", page: "Chat", item: itemdummy, messages, })

                                            }}
                                            style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                            <Image style={styles.userimg} source={{ uri: item.message.profilePhoto }} />
                                            <View style={styles.userdetail}>
                                                <Text allowFontScaling={false} style={styles.u1}>{item.message.userName}</Text>

                                            </View>
                                        </Pressable>
                                    </View>
                                    {item.message.postImage == null && <View style={styles.divider}></View>
                                    }
                                    <TouchableOpacity onPress={() => tabnavigation.navigate('ViewSendedPost', { item: item })}
                                    >
                                        {item.message.postImage != null && <Image style={[styles.template, { aspectRatio: item.aspectRatio ? item.aspectRatio : 1 / 1 }]} source={{ uri: item.message.postImage }} />}
                                    </TouchableOpacity>
                                    {item.message.postImage == null && <Text style={styles.blogtext}>{item.message.postContent}</Text>}
                                    {/* {item.type == "video" &&
                                    <Video
                                        ref={ref => videoRefs.current[item._id] = ref}
                                        style={[styles.template, { width: newwidth, height: getVideoHeight(item.aspectRatio) }]}
                                        source={{ uri: item.mediaUrl }}
                                        useNativeControls // Enables native playback controls
                                        resizeMode="cover" // Adjusts video to fit within the view
                                        isLooping // Loops the video
                                        shouldPlay={isVideoPlaying}
                                    />
                                } */}
                                    {/* {item.type == "textBlog" && <Text style={styles.blogtext}>{item.content}</Text>} */}

                                    <View style={styles.iconcontainer}>
                                        <View style={styles.icon2}>

                                        </View>
                                        {/* <Pressable onPress={() => openshare(item._id)}><Share style={{ marginTop: 5, marginRight: 10, right: 0 }} /></Pressable> */}


                                    </View>
                                    <View style={styles.lower}>
                                        <Text allowFontScaling={false} style={styles.u3}>{item.message.postCaption != undefined ? item.message.postCaption : "caption"} </Text>

                                    </View>

                                </View>
                            </TouchableOpacity>
                        </View>
                    }




                </>
            );
        })


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
        }, [])
    )




    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            // navigation.pop(2)
            navigation.goBack()
            // navigation.replace("Main2" , {focus : "Message"})
            if (inputRef.current) {
                inputRef.current.blur();
            }

            return true;
        });

        return () => backHandler.remove();
    }, [token]);

    useEffect(() => {

    }, [data]);

    function handlenext() {
        var decode = jwtDecode(token)
        if (decode.role == "Investor") {
            return
        }
        navigation.navigate("Singleuserpage", { token: token, id: item.user._id, page: "Chat", item, messages, })
    }


    // useEffect(() => {
    //     if (data.length > 0) {
    //         flatListRef.current?.scrollToEnd({ animated: true });
    //     }
    // }, [data]);

    return (
        // <KeyboardAvoidingView style={{ flex: 1, height: height }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <Animated.View style={{ flex: 1, }}>
            <View style={{ flex: 1.1, backgroundColor: "#16181a" }}>


                <View style={[styles.header]}>
                    <Pressable onPress={() => { navigation.goBack() }}>
                        <Ionicons name="arrow-back-circle-outline" size={40} color="#00DE62" />
                    </Pressable>

                    <Pressable
                        onPress={() => { handlenext() }}
                    >
                        <View style={styles.details}>
                            <View style={styles.userimg}>
                                <Image style={styles.image} source={{ uri: item.user.profilePhoto }} />
                            </View>
                            <View style={styles.d2}>
                                <Text allowFontScaling={false} style={styles.userid}>{item.user.userName}</Text>
                                <Text allowFontScaling={false} style={styles.username}>{item.user.userName}</Text>
                            </View>
                        </View>
                    </Pressable>


                </View>
                <FlatList
                    // style={{height : 600}}
                    data={data}
                    // inverted={true}
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

        // </KeyboardAvoidingView>
    )
}


export default Chat



const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;


const scalingfactor = Math.sqrt(a * b)


const styles = StyleSheet.create({
    inputContainer: { flexDirection: "row", padding: 10, borderTopWidth: 1, borderColor: "#ddd", bottom: 0 },
    input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginTop: 0 },
    sendButton: { backgroundColor: "#007AFF", padding: 10, borderRadius: 5, marginLeft: 10 },
    sendButtonText: { color: "#fff", fontWeight: "bold" },

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
        // bottom : 10,
        // marginBottom: 320,
        backgroundColor: "#16181a",
        borderColor: "#ccc",
        borderWidth: 1,
        // position : "absolute",
        borderRadius: 30,
        bottom: 0,
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
        fontSize: 22,
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
        flexDirection: "row"
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
        paddingLeft: 10,
        marginTop: -10,

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
        minHeight: 42,
        marginBottom: 10,
        marginTop: 0,
        marginLeft: 30
    },
    senttext: {
        fontFamily: "Roboto",
        fontSize: 16,
        color: "#16181a",
        fontWeight: 900,
        maxWidth: width * 0.6,
        // fontWeight: "bold",
        // backgroundColor: "red",
        borderRadius: 20,
        alignSelf: "flex-end",

        borderBottomRightRadius: 2,
        borderWidth: 2,
        borderColor: "#ccc",
        // borderColor: "red",
        backgroundColor: "transparent",
        backgroundColor: "#ccc",
        maxWidth: width * 0.6,
        padding: 15,
        paddingVertical: 10,
        marginRight: 25

    },
    receivedtext: {
        fontFamily: "Roboto",
        fontSize: 16,
        color: "#ccc",
        maxWidth: width * 0.6,
        borderColor: "#ccc",
        // fontWeight: "bold",
        borderWidth: 2,
        // backgroundColor : "red",
        borderRadius: 20,
        borderBottomLeftRadius: 2,
        backgroundColor: "transparent",
        maxWidth: width * 0.6,
        padding: 20,
        paddingLeft: 10,
        paddingVertical: 10,

    }
    , sent: {
        alignItems: "flex-end",
        justifyContent: "center",
        marginVertical: 5
    }
    , received: {
        alignItems: "flex-start",
        justifyContent: "center",
        marginVertical: 5,
        // marginLeft
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
    pfpleft1: {
        position: "absolute",
        width: 25,
        height: 25,
        left: -30,
        borderRadius: 100,
        bottom: 25,
    },
    pfpleft: {
        position: "absolute",
        width: 25,
        height: 25,
        left: 0,
        borderRadius: 100,
        bottom: 10,
    },
    pfpright: {
        position: "absolute",
        width: 25,
        height: 25,
        right: -5,
        borderRadius: 100,
        bottom: 10,
    },
    pfpright1: {
        position: "absolute",
        width: 25,
        height: 25,
        right: 0,
        borderRadius: 100,
        bottom: 25,
    },

    messagesContainer: { flexGrow: 1, padding: 10, paddingBottom: 0, minHeight: 400 },

    box: {
        width: width * 0.70,
        height: "auto",
        // height: 100,
        margin: 10,
        backgroundColor: "#1A1D1F",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        margin: "auto",
        marginBottom: 25,
        paddingVertical: 5,
        paddingVertical: 0,
        paddingBottom: 20,
        // opacity : 0.5

    },
    boxText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    template: {
        width: width * 0.66,
        // aspectRatio : 1/1,
        objectFit: "cover",

        borderRadius: 10,
        // height: 182,
        // maxHeight: 182
    },
    userimg: {
        borderRadius: 100,
        width: 36,
        aspectRatio: 1,
        margin: 10,
        marginLeft: 15,
        alignSelf: "flex-start",
        justifyContent: "flex-start"
    },
    userdetail: {
        flex: 1,
        alignSelf: "flex-start",
        paddingLeft: 5,
        // marginTop :
    },
    iconcontainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "95%",
        marginHorizontal: "auto",
        marginTop: 10
    }
    , top: {
        // backgroundColor: "red",
        height: 50
    },
    u1: {
        fontFamily: "Alata",
        fontSize: 20,
        marginTop: 10,
        color: "#E9E9E9"
    },
    u3: {
        fontFamily: "Roboto",
        fontSize: 14,
        color: "#B8B8B8",
        textAlign: "left",
        marginLeft: 0,
        // backgroundColor : "red"
    },
    lower: {
        display: "flex",
        // flexDirection: "row",
        width: "95%",
        marginHorizontal: "auto",
        marginTop: 10,
        paddingLeft: 5,
        // justifyContent: "space-between"
    },
    blogtext: {
        textAlign: "left",
        width: "92%",
        paddingHorizontal: 5,
        marginVertical: 10,
        marginBottom: -20,
        color: "#B8B8B8",
        fontSize: 20,
        fontFamily: "Roboto",

    },

    divider: {
        width: "100%",
        // marginLeft: -20,
        height: 1,
        marginTop: 5,
        marginHorizontal: "auto",
        // marginBottom: 20,
        backgroundColor: "#24272A"
    },

})


