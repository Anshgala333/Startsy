import React, { useContext, useState, useRef, memo, useCallback, useEffect } from "react";
import { FlatList, Text, ActivityIndicator, Touchable, TouchableOpacity, ToastAndroid, Button, Pressable, View, Vibration, Image, SafeAreaView, RefreshControl, TextInput, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import styles from "../../styles/post.js"
import { Video } from 'expo-av';
import Upvote from "@/assets/icons/upvote.js";
import Share from "@/assets/icons/share.js";
import { url } from "@/config.js";
import { GlobalContext } from "@/Global/globalcontext.js";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import QuestionReply from "./QuestionReply.js"

import { useNavigation } from 'expo-router';

const Question = ({ allpost, setallpost, getpost, scrollY, navigation }) => {


    const [isready, setisready] = useState(false)
    const [ActiveTab, setActiveTab] = useState("")


    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            `You don't have permission to apply to this community`,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
        );
    };

    const [refreshing11, setRefreshing11] = useState(false)
    const [Uploading, setUploading] = useState(false)

    const data1 = useContext(GlobalContext)
    var token = data1.globaldata.token

    useFocusEffect(useCallback(() => {
        console.log("focused page 2 ");
        scrollY.setValue(0)
    }, []))

    const [blog, Setblog] = useState("")


    const postBlog = async () => {

        if (blog == "") {
            return
        }
        const postType = "Question";
        const finaldata = {
            "content": blog,
        };

        console.log(finaldata);
        // return
        setUploading(true)


        try {
            const response = await fetch(`${url}posts/createPost/${postType}`, {
                method: 'POST',
                body: JSON.stringify(finaldata),
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server Error: ${response.status} - ${errorText}`);

            }

            const data = await response.json();
            console.log(data);
            const newQuestion = data.post


            setallpost([newQuestion, ...allpost]);
            if (response.status == 200) {
                Vibration.vibrate(100)
                Setblog("")

                // setButtonText("Posted")
                // navigation.goBack();
            }
        } catch (err) {
            console.error("Error:", err);
        } finally {
            setUploading(false)

            // setLoading(false);
            // setBlogError(false);
        }
    };


    const navgiation = useNavigation();

    const [data, setData] = useState([
        { id: '1', name: 'Startsy user 1' },
        { id: '2', name: 'Startsy user 2' },
        { id: '3', name: 'Startsy user 3' },
        { id: '4', name: 'Startsy user 4' },
    ]);

    const addItem = () => {
        const newItem = { id: Math.random().toString(), name: `Startsy user ${data.length + 1}` };
        setData([...data, newItem]);
    };
    const removeItem = (itemId) => {
        setData(data.filter((item) => item.id !== itemId));
    };

    const clearItems = () => {
        setData([]);
    };



    const renderItem =
        ({ item, index }) => {

            // console.log(item);

            function time(time) {

                var data1 = new Date(time)

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




            // const isVideoPlaying = videoStates[item._id] || false;
            if (item.user_id == null) {
                return
            }
            if (item.Applied == true) {
                return
            }
            if (!item.content) return
            else if (item.type == "Question") {

                console.log(item.content);
                return (
                    <TouchableOpacity onPress={() => { navigation.navigate("QuestionReply", { data: item, token }) }}
                    >
                        <LinearGradient colors={["rgba(33, 34, 35, 0.4)", "rgba(25, 26, 27, 0.6)"]}
                            style={styles1.item}
                        >

                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <Image source={require('../../assets/images/logo.png')} style={{ width: 30, height: 30, borderRadius: 20 }} />
                                <Text style={styles1.userNameStyle}>Anonymous</Text>
                                <Text style={styles1.time}>{time(item.createdAt)}</Text>
                            </View>
                            <View style={styles1.divider}></View>

                            {/* question section */}
                            <View>
                                <Text numberOfLines={4} ellipsizeMode='tail' style={styles1.QuestionContent}>
                                    {item.content}
                                </Text>
                            </View>



                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <Pressable  onPress={() => { navigation.navigate("QuestionReply", { data: item, token }) }}>
                                    <Text style={styles1.reply}>Reply</Text>
                                </Pressable>
                                <Text style={styles1.totalRepliesText}> {item.postComments.length} Replies</Text>
                            </View>

                        </LinearGradient>
                    </TouchableOpacity>
                )

            }

        }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#16181a", minHeight: 500, paddingTop: 85 }}>
            <View style={{ zIndex: 100000, paddingTop: 25, marginBottom: 10, }} >
                <View style={styles1.searchContainer}>
                    <TextInput
                        allowFontScaling={false}
                        multiline={true}
                        style={styles1.searchInput}
                        placeholder="Ask a question ?"
                        placeholderTextColor="#828282"
                        onChangeText={(val) => Setblog(val)}
                        value={blog}
                    />



                </View>

                <TouchableOpacity
                    style={styles1.send}
                    onPress={postBlog}
                >
                    {Uploading && <ActivityIndicator size={24} color="#ccc" />}
                    {!Uploading && <Ionicons name="send" size={24} color="#ccc" />}

                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={allpost}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    keyExtractor={(item) => item.id}

                    refreshControl={

                        <RefreshControl
                            progressBackgroundColor="#16181a"
                            colors={['#00de62']}
                            progressViewOffset={0}
                            refreshing={refreshing11}
                            onRefresh={() => {
                                setRefreshing11(true);
                                getpost()
                                Vibration.vibrate(100)
                                setTimeout(()=>{
                                    setRefreshing11(false);
                                } , 2000)
                                
                            }}
                        />
                    }

                    renderItem={renderItem}
                />
            </View>







        </SafeAreaView>
    )
}



export default memo(Question)



const styles1 = StyleSheet.create({
    searchContainer: {
        marginHorizontal: "auto",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        display: "flex",
        // height: 100,
        width: "95%",
        backgroundColor: "#16181a",
        borderColor: "#ccc",
        borderWidth: 1,
        // position : "absolute",
        borderRadius: 30,
        // bottom: 0,
        justifyContent: "flex-start",

    },
    searchInput: {
        height: "auto",
        minHeight: 50,
        width: "85%",
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
    },
    send: {
        // width: 20,
        // height: 20,
        position: "absolute",
        elevation: 10000,
        zIndex: 100000,
        top: 38,
        right: 30,
        transform: [{ scale: 1.1 }],
        alignSelf: "center",
        verticalAlign: "center",
        bottom: 0,
    },
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#16181a',
        color: 'white'
        // paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 10,
        gap: 10
    },
    item: {
        padding: 15,
        gap: 10,
        // color:'white',
        marginVertical: 5,
        borderRadius: 20,
        width: "96%",
        marginHorizontal: "auto",
        overflow : "hidden"

    },
    totalRepliesText: {
        alignItems: 'center',
        fontSize: 11,
        paddingTop: 5,
        color: 'gray',
        fontFamily:'Roboto'

    },
    userNameStyle: {
        // fontWeight: 'bold',
        color: '#ccc',
        fontSize: 18,
        fontFamily: "Alata",
        verticalAlign: "middle"
    },
    reply: {
        color: "#00de62",
        fontFamily: "Alata",
    },
    QuestionContent: {
        textAlign: "left",
        width: "92%",
        paddingHorizontal: 5,
        marginVertical: 10,
        color: "#ccc",
        fontSize: 16,
    },
    time: {
        position: "absolute",
        right: 0,
        top: 10,
        fontSize: 11,
        color: "gray",
        fontFamily:'Roboto'
    },
    divider: {
        width: "120%",
        marginLeft: -30,
        height: 1,
        marginTop: 3,
        // marginBottom: 20,
        backgroundColor: "#24272A"
    },
})












