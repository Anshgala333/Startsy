import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { SafeAreaView, Text, Pressable, TextInput, View, Image, StyleSheet, StatusBar, Platform, Animated, Easing, Dimensions, FlatList, ScrollView, Keyboard, KeyboardAvoidingView, TouchableOpacity, Linking } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { ScrollView } from "react-native-gesture-handler";
import { InteractionManager } from "react-native";

import { BackHandler } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";

import io from "socket.io-client";
import { jwtDecode } from "jwt-decode";

import { url } from "../../config.js"

const Chat = ({ navigation, route }) => {

    const [newtext, setnewtext] = useState("")
    const { item, messages, token, photo1, photo2 } = route.params;
    const { extra } = route.params;


    const btn11 = useRef(null)


    function sendmessage() {


        console.log("hiiii");


        if (newtext == "") {
            return
        }




        console.log(messages);

        const finaldata = {
            senderId: id,
            receiverId: jisuserkosendkarnahaiuskiid,
            message: newtext
        }
        socket.emit("privateMessage", finaldata)
        setdata([...data, { message: newtext, senderId: id }])


        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({
                offset: data.length * 100,
                animated: true,
            });
        }
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


    const [data, setdata] = useState(null)
    const [socket, setSocket] = useState(null);
    const [id, setid] = useState(null);
    const flatListRef = useRef(null);
    const [keyboardstatus, setkeyboardstatus] = useState(false)
    const inputRef = useRef(null);
    const [offset, setoffset] = useState(320)


    const decoded = jwtDecode(token);


    useEffect(() => {

        setdata(messages)
        if (messages && flatListRef.current) {
            setTimeout(() => {
                InteractionManager.runAfterInteractions(() => {
                    flatListRef.current.scrollToOffset({
                        offset: messages.length * 100,
                        animated: false,
                    });
                });
            }, 0);
        }

    }, [])




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

    const renderItem = ({ item, index }) => {

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
                return <Text style={{ backgroundColor: "", marginTop: -10 }} key={index}>{part}</Text>;
            });
        };



        const dataLength = data.length;
        return (
            <View style={{ display: "flex", flex: 1, width: "100%" }}>
                {index < dataLength - 1 && item.senderId != data[index + 1].senderId && <Image style={item.senderId == jisuserkosendkarnahaiuskiid ? styles.pfpleft : styles.pfpright} source={{ uri: item.senderId == jisuserkosendkarnahaiuskiid ? photo2 : photo1 }} />}

                {index == dataLength - 1 && <Image style={item.senderId == jisuserkosendkarnahaiuskiid ? styles.pfpleft : styles.pfpright} source={{ uri: item.senderId == jisuserkosendkarnahaiuskiid ? photo2 : photo1 }} />}
                <View style={[styles.message,
                (item.senderId == jisuserkosendkarnahaiuskiid) ? styles.received : styles.sent
                ]}>
                    <Text allowFontScaling={false} style={[(item.senderId != jisuserkosendkarnahaiuskiid) ? styles.senttext : styles.receivedtext]}>
                        {renderMessage(item.message)}
                    </Text>
                </View>
            </View>
        );
    };




    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            // navigation.pop(2)
            navigation.goBack()
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

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
            <Animated.View style={{ flex: 1, }}>

                <View style={{ flex: 1 }}>


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
                        style={[styles.scroll,]}
                        data={data}
                        ref={flatListRef}
                        renderItem={renderItem}

                        getItemLayout={(data, index) => ({ length: 100, offset: 100 * index, index })}
                        contentContainerStyle={{
                            paddingHorizontal: 10,
                            paddingVertical: 20,
                            justifyContent: 'flex-end',
                        }}
                    />
                    <View >
                        <Animated.View style={[styles.searchContainer, marginBottom]}>
                            <TextInput
                                ref={inputRef}
                                autoCorrect={true}
                                allowFontScaling={false}
                                multiline={true}
                                style={styles.searchInput}
                                placeholder="Type ..."
                                placeholderTextColor="#828282"
                                onFocus={handleFocus}
                                // onBlur={() => setkeyboardstatus(false)}
                                onChangeText={(val) => setnewtext(val)}
                                value={newtext}

                                onTouchStart={(e) => {
                                    e.preventDefault(); // Prevent immediate focus
                                    setTimeout(() => {
                                        inputRef.current.focus();
                                    }, 500); // Delay focus by 500ms
                                }}
                            />



                        </Animated.View>

                        <TouchableOpacity
                            ref={btn11}
                            onTouchStart={() => { inputRef.current.focus(); }}
                            style={styles.send} onPress={sendmessage}>
                            <Ionicons name="send" size={24} color="#00DE62" />
                        </TouchableOpacity>
                    </View>


                </View>
            </Animated.View>

        </KeyboardAvoidingView>
    )
}


export default Chat



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
        // bottom : 10,
        // marginBottom: 320,
        // backgroundColor: "yellow",
        borderColor: "#00DE62",
        borderWidth: 1,
        // position : "absolute",
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
        maxWidth: width * 0.6,
        fontWeight: "bold",
        // backgroundColor: "red",
        borderRadius: 20,
        alignSelf: "flex-end",

        borderBottomRightRadius: 2,
        borderWidth: 2,
        borderColor: "#00DE62",
        backgroundColor: "transparent",
        backgroundColor: "#00DE62",
        maxWidth: width * 0.6,
        padding: 15,
        paddingVertical: 10,
        marginRight: 30

    },
    receivedtext: {
        fontFamily: "Roboto",
        fontSize: 16,
        color: "#00de62",
        maxWidth: width * 0.6,
        borderColor: "#00DE62",
        fontWeight: "bold",
        borderWidth: 2,
        // backgroundColor : "red",
        borderRadius: 20,
        borderBottomLeftRadius: 2,
        backgroundColor: "transparent",
        maxWidth: width * 0.6,
        padding: 20,
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
        marginVertical: 5
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


})


