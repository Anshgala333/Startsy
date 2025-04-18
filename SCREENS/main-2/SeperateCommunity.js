import React, { useContext, useState, useRef, memo, useCallback, useEffect } from "react";
import { FlatList, Text, Touchable, TouchableOpacity, ToastAndroid, Pressable, View, Vibration, Image, SafeAreaView, RefreshControl } from "react-native";
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
import { Dimensions } from "react-native";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { jwtDecode } from "jwt-decode";

const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;


const scalingfactor = Math.sqrt(a * b)


const Community = ({ allpost, setallpost, getpost, scrollY, navigation ,onReportCallBack}) => {

    // console.log("community re render");

    // useEffect(() => {
    //     console.log("navigation re render page 2 ");
    // }, [navigation])
    // useEffect(() => {
    //     console.log("allpost re render page 2");
    // }, [allpost])
    // useEffect(() => {
    //     console.log("setallpost re render page 2");
    // }, [setallpost])
    // useEffect(() => {
    //     console.log("scrollY re render page 2");
    // }, [scrollY])
    // useEffect(() => {
    //     console.log("getpost re render page 2");
    // }, [getpost])
    // useEffect(() => {
    //     console.log("isready re render page 2");
    // }, [isready])
    // useEffect(() => {
    //     console.log("refreshing11 re render page 2");
    // }, [refreshing11])
    // useEffect(() => {
    //     console.log("applycommunity re render page 2");
    // }, [applycommunity])
    // useEffect(() => {
    //     console.log("showToastWithGravity re render page 2");
    // }, [showToastWithGravity])

    const [isready, setisready] = useState(false)
    const [ActiveTab, setActiveTab] = useState("")

    async function gotochatscreen(item) {

        var id = item.communityPost._id
        var additionaldetail = {
            _id: id,
            "communityName": item.communityPost.communityName
        }


        try {
            const response = await fetch(
                `${url}groupChat/getGroupChatMessage/${id}`,
                {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const result = await response.json();


            navigation.navigate("Chat1", { item: additionaldetail, messages: result.data, token, navigation })
        } catch (err) {
            console.log(err);
        } finally {
            // setloading(false); // Set loading to false when done
        }

    }



    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            `You don't have permission to apply to this community`,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
        );
    };

    const [refreshing11, setRefreshing11] = useState(false)

    const data = useContext(GlobalContext)
    var token = data.globaldata.token

    useFocusEffect(useCallback(() => {
        console.log("focused page 2 ");
        scrollY.setValue(0)

    }, []))

    var decode = jwtDecode(token)
    




    async function applycommunity(id, index) {
        if (allpost[index].Applied) {
            return
        }
        if(decode.role != "Investor" && allpost[index].user_id.role == "Investor"){
            showToastWithGravity("you are not allowed to join this community")
            return
        }
        setallpost(allpost.map((e, i) => {
            if (i == index) {
                var object = { ...e, Applied: true }
                return object
            }
            else return e
        }))
        try {
            const response = await fetch(`${url}posts/applyCommunity/${id}`, {
                method: 'POST',
                body: "",
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.status === 403) {
                showToastWithGravity("you are not allowed to join this community")
            }
            if (response.status === 303) {
                showToastWithGravity("Community is Locked")
            }
            if (response.status === 200) {
                setallpost(allpost.map((e, i) => {
                    if (i == index) {
                        var object = { ...e, Applied: true }
                        return object
                    }
                    else return e
                }))
            }
            else {
                setallpost(allpost.map((e, i) => {
                    if (i == index) {
                        var object = { ...e, Applied: false }
                        return object
                    }
                    else return e
                }))
            }


        }
        catch (err) {
            console.log(err);

        }
    }



    const renderItem =
        ({ item, index }) => {

            // const isVideoPlaying = videoStates[item._id] || false;
            if (item.user_id == null) {
                return
            }
            if(decode.role == "Investor" && item.user_id.role != "Investor")return
            // if (item.Applied == true) {
            //     return
            // }
            
            else {
                function getVideoHeight() {
                    return item.aspectRatio === "16/9" ? newwidth * (9 / 16) : newwidth * (1 / 1);
                }
                if (item.type == "communityPost") {
                    return (
                        <LinearGradient
                            colors={["rgba(33, 34, 35, 0.4)", "rgba(25, 26, 27, 0.6)"]}
                            locations={[0, 1]}
                            style={styles.box}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }} >
                            <View style={[styles.top,{flexDirection:'row',alignItems:'center',paddingRight:20 , width : "100%"}]} >
                                <TouchableOpacity
                                    onPress={() => {
                                        if(decode.role == "Investor" && item.user_id.role != "Investor")return
                                        navigation.navigate("Singleuserpage", { token: token, id: item.user_id._id, page: "Startsy" })
                                    }}
                                    style={{ display: "flex", flexDirection: "row", width: "90%"  }}>
                                    <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                        <Image style={styles.userimg} source={{ uri: item.user_id.profilePhoto }} />
                                        <View style={styles.userdetail}>
                                            <Text allowFontScaling={false} style={styles.u1}>{item.user_id.userName}</Text>
                                            <Text allowFontScaling={false} style={styles.u2}>{item.user_id.role == "CommunityMember" ? "Member" : item.user_id.role}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={{right : 15, position : "absolute"}}>
                                    <TouchableOpacity onPress={() => onReportCallBack(item._id,true)}>
                                        <SimpleLineIcons name="options-vertical" size={20} color="#ccc" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.divider}></View>
                            <View style={styles.lower}>
                                <Pressable onPress={() => console.log("hi")}>
                                    <Text style={styles.com1}>{item.communityPost.communityName}</Text>
                                </Pressable>
                                <Text style={styles.com2}><Text style={styles.desc1}>Community description: </Text>{item.communityPost.communityDescription}</Text>
                                <Text allowFontScaling={false} style={styles.u6}><Text style={styles.desc1}>Members Count :</Text> {item.communityPost.communityMembers.length}</Text>
                                {/* <Text allowFontScaling={false} style={styles.u7}>Rule : {item.communityPost.communityRules}</Text> */}



                                {!item.Applied && <TouchableOpacity onPress={() => {
                                    Vibration.vibrate(100)
                                    applycommunity(item._id, index)
                                }} style={[styles.next]} >
                                    <Text allowFontScaling={false} style={styles.nexttext}>{item.Applied ? "Joined" : "Join Forum"}</Text>
                                </TouchableOpacity>}
                                {item.Applied && <TouchableOpacity onPress={() => {
                                    Vibration.vibrate(100)
                                    gotochatscreen(item)
                                }} style={styles.next1} >
                                    <View allowFontScaling={false} style={styles.nexttext}>
                                        {/* <Text style={{marginTop : -10 , alignSelf : "flex-start"}}></Text> */}
                                        <Text style={{ fontSize: scalingfactor * 16, fontFamily: "Alata" }}>Chat</Text>
                                        <View style={{ paddingLeft: 3, justifyContent: 'center', paddingTop: 3 }}>
                                            <MaterialCommunityIcons name="message-text-outline" size={20} color="#000" />
                                        </View>
                                    </View>
                                </TouchableOpacity>}
                            </View>
                        </LinearGradient>
                    )
                }

            }

        }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#16181a", minHeight: 500 }}>

            <FlatList
                showsVerticalScrollIndicator={false}
                // style={main.scroll1}
                initialNumToRender={5}
                windowSize={10}
                maxToRenderPerBatch={5}
                scrollEventThrottle={0}
                keyExtractor={(item, index) => { return item._id }}
                removeClippedSubview={false}
                data={allpost}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingTop: 108,
                    paddingBottom: 100
                }}

                onScroll={(e) => {
                    scrollY.setValue(e.nativeEvent.contentOffset.y)
                }}
                refreshControl={

                    <RefreshControl
                        progressBackgroundColor="#16181a"
                        colors={['#00de62']}
                        progressViewOffset={100}
                        refreshing={refreshing11}

                        onRefresh={() => {
                            setRefreshing11(true);
                            getpost()
                            Vibration.vibrate(100)
                            setTimeout(() => {
                                setRefreshing11(false); // Stop refreshing after fetching data
                            }, 2000); // Adjust the delay as needed
                        }}
                    />
                }

            />











        </SafeAreaView>
    )
}



export default memo(Community)
