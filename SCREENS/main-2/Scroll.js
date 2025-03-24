import React, { useContext, useState, useRef, memo, useCallback, useEffect } from "react";
import { FlatList, Text, Animated, Touchable, TouchableOpacity, ToastAndroid, Pressable, View, Vibration, Image, SafeAreaView, RefreshControl } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import styles from "../../styles/post.js"
import { Video } from 'expo-av';
import Upvote from "@/assets/icons/upvote.js";
import Share from "@/assets/icons/share.js";
import { url } from "@/config.js";
import { GlobalContext } from "@/Global/globalcontext.js";
import { useFocusEffect } from "expo-router";
import Header from '../Header1.js';
// import { Skeleton } from "moti/skeleton/index.js";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Skeleton } from 'moti/skeleton';
import { MotiView } from 'moti';
import { jwtDecode } from "jwt-decode";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Scroll = ({ allpost, setallpost, opencomment, openshare, scroll, scrollY, navigation, getpost, skeleton, setskeletonloading }) => {


    const [refreshing11, setRefreshing11] = useState(false)
    const [savedPosts, setSavedPosts] = useState({});
    const [isSaved, setIsSaved] = useState(false);

    
      const showToastWithGravity = (message) => {
        ToastAndroid.showWithGravityAndOffset(
          `${message}`,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          100, 100
        );
      };
    



    // const [skeleton, setskeletonloading] = useState(true)
    // .......................................................................................

    const toggleSavePost = async (id, index) => {
        console.log(id);
        console.log(index);

        console.log("book");
        setallpost(prevPosts =>
            prevPosts.map((e, i) => {
                if (i === index) {
                    return { ...e, issaved: !e.issaved };
                }
                return e;
            })
        );

        var toset = !allpost[index].issaved


        var status = toset ? "remove" : "add"
        var message = toset ? "Unsaved" : "Saved"
        showToastWithGravity(`Post ${message} successfully`)

        try {

            const response = await fetch(`${url}test/savePost/${id}/${status}`, {
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
            Vibration.vibrate(20)

        }
        catch (err) {
            console.log(err);

        }




        //setIsSaved(!isSaved);
    };

    // ........................................................................................
    // console.log("scroll re render");




    // useEffect(() => {
    //     console.log("allpost re render os scroll page 1");
    // }, [allpost])
    // useEffect(() => {
    //     console.log("setallpost re render of scroll page");
    // }, [setallpost])
    // useEffect(() => {
    //     console.log("opencomment re render of scroll page");
    // }, [opencomment])

    // useEffect(() => {
    //     console.log("openshare re render of scroll page");
    // }, [openshare])
    // useEffect(() => {
    //     console.log("getpost re render of scroll page of scroll page");
    // }, [getpost])
    // useEffect(() => {
    //     console.log("scrollY re render of scroll page of page 1");
    // }, [scrollY])
    // useEffect(() => {
    //     console.log("scroll okkkkk re render of scroll page");
    // }, [scroll])
    // useEffect(() => {
    //     console.log("navigation re render of scroll page");
    // }, [navigation])

    // useFocusEffect(useCallback(() => {
    //     console.log("focused ");
    //     scrollY.setValue(0)

    // }, []))



    useEffect(() => {
        console.log("refreshing11 state change");
    }, [refreshing11])
    useEffect(() => {
        console.log("skeleton state change");
    }, [skeleton])


    const data = useContext(GlobalContext)
    var token = data.globaldata.token

    // .............................................

    // ................................................
    var [count, setcount] = useState(0)
    async function upvotepost(id, index) {
        Vibration.vibrate(50)
        var toset = !allpost[index].isliked
        var status = toset ? "like" : "unlike"

        var increment = toset == true ? 1 : -1

        // setallpost(allpost.map((e, i) => {
        //     if (i == index) {
        //         var object = { ...e, isliked: !e.isliked, itemlikedcount: e.itemlikedcount + increment }
        //         return object
        //     }
        //     else return e
        // }))

        setallpost(prevPosts =>
            prevPosts.map((e, i) => {
                if (i === index) {
                    return { ...e, isliked: toset, itemlikedcount: e.itemlikedcount + increment };
                }
                return e;
            })
        );

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
            console.log(err);

        }
    }

    const Spacer = ({ height = 16 }) => <View style={{ height }} />;

    const lastTap = useRef(null);

    const handleDoubleTap = (id, index) => {
        const now = Date.now();
        if (lastTap.current && now - lastTap.current < 300) {
            Vibration.vibrate(20)
            upvotepost(id, index)
        }
        lastTap.current = now;
    };

    var decode = jwtDecode(token)



    const renderItem =
        ({ item, index }) => {
            // console.log("render scroll");
            // const isVideoPlaying = videoStates[item._id] || false;
            if (item.user_id == null) {
                return
            }
            else {

                if (item.type == "photo" || item.type == "textBlog" || item.type == "video") {
                    return (
                        <Pressable onPress={() => { handleDoubleTap(item._id, index) }}>
                            <LinearGradient
                                colors={["rgba(33, 34, 35, 0.4)", "rgba(25, 26, 27, 0.6)"]}
                                locations={[0, 1]}
                                style={styles.box}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }} >

                                {/* <View onTouchStart={closebottomsheet} style={styles.box}> */}
                                <View style={styles.top} >
                                    <Pressable
                                        onPress={() => {
                                            console.log(decode.role);

                                            if (decode.role == "Investor") {
                                                console.log("qpqpqp");
                                                if (item.user_id.role == "Founder") return
                                                else navigation.navigate("Singleuserpage", { token: token, id: item.user_id._id, page: "Startsy" })
                                            }
                                            else if (item.user_id.role != "Investor") {
                                                navigation.navigate("Singleuserpage", { token: token, id: item.user_id._id, page: "Startsy" })
                                            }

                                        }}
                                        style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                        <Image style={styles.userimg} source={{ uri: item.user_id.profilePhoto }} />
                                        <View style={styles.userdetail}>
                                            <Text allowFontScaling={false} style={styles.u1}>{item.user_id.userName}</Text>
                                            <Text allowFontScaling={false} style={styles.u2}>{item.user_id.role == "CommunityMember" ? "Member" : item.user_id.role}</Text>
                                        </View>

                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: "center",    // Center horizontally
                                            alignItems: "center",        // Center vertically
                                            right : 20,
                                            top : 0
                                        }}>
                                            <TouchableOpacity style={{ paddingRight: 0 }} onPress={() => toggleSavePost(item._id, index)}>
                                                {item.issaved ? (
                                                    <MaterialIcons name="bookmark-border" size={30} color="#ccc" />
                                                ) : (
                                                    <MaterialCommunityIcons
                                                        name="bookmark"
                                                        size={30}
                                                        color="#ccc"             // Gray when unsaved

                                                    />
                                                )}
                                            </TouchableOpacity>
                                        </View>
                                    </Pressable>
                                </View>

                                {item.type == "textBlog" && <View style={styles.divider}></View>}

                                {item.type == "photo" && <Image style={[styles.template, { aspectRatio: item.aspectRatio ? item.aspectRatio : 1 / 1 }]} source={{ uri: item.mediaUrl }} />}
                                {item.type == "video" &&
                                    <Video
                                        ref={ref => videoRefs.current[item._id] = ref}
                                        style={[styles.template, { width: newwidth, height: getVideoHeight(item.aspectRatio) }]}
                                        source={{ uri: item.mediaUrl }}
                                        useNativeControls // Enables native playback controls
                                        resizeMode="cover" // Adjusts video to fit within the view
                                        isLooping // Loops the video
                                        shouldPlay={isVideoPlaying}
                                    />
                                }

                                {item.type == "textBlog" && <Text style={styles.blogtext}>{item.content}</Text>}
                                {/* {item.type == "textBlog" &&  <View style={[styles.divider , {marginTop : 7}]}></View>} */}

                                <View style={styles.iconcontainer}>
                                    <View style={styles.icon2}>
                                        <TouchableOpacity onPress={() => { upvotepost(item._id, index) }}>
                                            {/* {item.likedBy.includes(loggedinUserID) && <Upvote width={36} height={36} style={{ marginHorizontal: 0 }} selected={true} />} */}
                                            {/* {!item.likedBy.includes(loggedinUserID)   && <Upvote width={36} height={36} style={{ marginLeft: 5, marginRight: -5 }} />} */}

                                            {!item.isliked && <Upvote width={36} height={36} style={{ marginLeft: 5, marginRight: -5 }} />}
                                            {item.isliked && <Upvote width={36} height={36} style={{ marginLeft: 5, marginRight: -5 }} selected={true} />}
                                        </TouchableOpacity>
                                        <Text style={{ left: 0, top: 13, color: "#ccc" }}>{item.itemlikedcount}</Text>
                                        <Pressable onPress={() => {
                                            Vibration.vibrate(20)
                                            opencomment(item._id)
                                        }}>
                                            <FontAwesome style={{ marginLeft: 4 }} name="comment-o" size={30} color="#ccc" />
                                        </Pressable>
                                    </View>
                                    {/* ............................................................................................ */}






                                    {/* ............................................................................................ */}


                                    <Pressable onPress={() => {
                                        Vibration.vibrate(20)
                                        openshare(item._id)
                                    }}>
                                        <Share style={{ marginTop: 5, marginRight: 10, right: 0 }} />
                                    </Pressable>


                                </View>
                                <View style={styles.lower}>
                                    {item.type != "textBlog" && <Text allowFontScaling={false} style={styles.u3}>{item.caption != undefined ? item.caption : "caption"} </Text>}
                                    <Pressable onPress={() => { opencomment(item._id) }} allowFontScaling={false} style={styles.u4}>
                                        <Text style={styles.u4}>View {item.postComments.length} comments</Text>
                                    </Pressable>

                                </View>
                                {/* </View> */}
                            </LinearGradient >
                        </Pressable>
                    )
                }

            }

        }

    const handleScroll = useCallback(

        Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            {
                useNativeDriver: false, // Set to true if you don't need layout-related animations

            }
        ),
        []
    );





    const flatlistref = useRef(null)

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#16181a", minHeight: 500 }}>



            {skeleton && <View style={{ flex: 1, marginTop: 110, alignItems: "center" }}>

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
            </View>}


            {!skeleton && <FlatList
                showsVerticalScrollIndicator={false}
                // initialNumToRender={5}
                // windowSize={10}
                ref={flatlistref}
                // maxToRenderPerBatch={5}
                scrollEventThrottle={16}
                keyExtractor={(item) => item._id.toString()}
                // removeClippedSubview={false}
                data={allpost}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingTop: 108,
                    paddingBottom: 100
                }}
                extraData={allpost}



                // onScroll={handleScroll}
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
                            setskeletonloading(true)
                            Vibration.vibrate(100)
                            setTimeout(() => {
                                setskeletonloading(false)

                                setRefreshing11(false); // Stop refreshing after fetching data
                            }, 2000); // Adjust the delay as needed
                        }}
                    />
                }

            />}
        </SafeAreaView>
    )
}
export default memo(Scroll) 