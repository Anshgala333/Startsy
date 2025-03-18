import React, { useContext, useState, useRef, useCallback } from "react";
import { FlatList, Text, Touchable, TouchableOpacity, ScrollView, Pressable, View, Vibration, Image, SafeAreaView, RefreshControl } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import styles from "../../styles/post.js"
import { Video } from 'expo-av';
import Upvote from "@/assets/icons/upvote.js";
import Share from "@/assets/icons/share.js";
import { url } from "@/config.js";
import { GlobalContext } from "@/Global/globalcontext.js";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const Post = ({ allpost, setallpost, navigation }) => {

    async function gotochatscreen(item) {
        console.log(item.communityPost.communityName);
        console.log(item.communityPost._id);

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
            console.log(result.data);

            // setmessage(result.data)

            navigation.navigate("Chat1", { item: additionaldetail, messages: result.data, token, navigation })
        } catch (err) {
            console.log(err);
        } finally {
            // setloading(false); // Set loading to false when done
        }

    }

    const [refreshing11, setRefreshing11] = useState(false)

    const data = useContext(GlobalContext)
    console.log(data.globaldata.token);
    var token = data.globaldata.token

    async function upvotepost(id, index) {
        console.log(id);
        Vibration.vibrate(50)
        var toset = !allpost[index].isliked
        var status = toset ? "like" : "unlike"
        console.log(status, "status");

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



    const renderItem = useCallback(
        ({ item, index }) => {


            if (item.user_id == null) {
                return
            }
            else {
                function getVideoHeight() {
                    return item.aspectRatio === "16/9" ? newwidth * (9 / 16) : newwidth * (1 / 1);
                }
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
                                        onPress={() => { navigation.navigate("Singleuserpage", { token: token, id: item.user_id._id, page: "Startsy" }) }}
                                        style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                        <Image style={styles.userimg} source={{ uri: item.user_id.profilePhoto }} />
                                        <View style={styles.userdetail}>
                                            <Text allowFontScaling={false} style={styles.u1}>{item.user_id.userName}</Text>
                                            <Text allowFontScaling={false} style={styles.u2}>{item.user_id.role == "CommunityMember" ? "Member" : item.user_id.role}</Text>
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
                                    <Pressable onPress={() => {
                                        Vibration.vibrate(20)
                                        openshare(item._id)
                                    }}><Share style={{ marginTop: 5, marginRight: 10, right: 0 }} /></Pressable>


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
                else if (item.type == "communityPost") {
                    return (
                        <LinearGradient
                            colors={["rgba(33, 34, 35, 0.4)", "rgba(25, 26, 27, 0.6)"]}
                            locations={[0, 1]}
                            style={styles.box}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }} >
                            <View style={styles.top} >
                                <TouchableOpacity
                                    onPress={() => { navigation.navigate("Singleuserpage", { token: token, id: item.user_id._id, page: "Startsy" }) }}
                                    style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                    <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                        <Image style={styles.userimg} source={{ uri: item.user_id.profilePhoto }} />
                                        <View style={styles.userdetail}>
                                            <Text allowFontScaling={false} style={styles.u1}>{item.user_id.userName}</Text>
                                            <Text allowFontScaling={false} style={styles.u2}>{item.user_id.role == "CommunityMember" ? "Member" : item.user_id.role}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.divider}></View>
                            <View style={styles.lower}>
                                <Pressable onPress={() => console.log("hi")}>
                                    <Text style={styles.com1}>{item.communityPost.communityName}</Text>
                                </Pressable>
                                <Text style={styles.com2}><Text style={styles.desc1}>Community description: </Text>{item.communityPost.communityDescription}</Text>
                                <Text allowFontScaling={false} style={styles.u6}><Text style={styles.desc1}>Members Count :</Text> {item.communityPost.communityMembers.length}</Text>
                                <Text allowFontScaling={false} style={styles.u7}>Rule : {item.communityPost.communityRules}</Text>



                                {!item.Applied && <TouchableOpacity onPress={() => {
                                    Vibration.vibrate(100)
                                    applycommunity(item._id, index)
                                }} style={[styles.next]} >
                                    <Text allowFontScaling={false} style={styles.nexttext}>{item.Applied ? "Joined" : "Join Community"}</Text>
                                </TouchableOpacity>}
                                {item.Applied && <TouchableOpacity onPress={() => {
                                    Vibration.vibrate(100)
                                    gotochatscreen(item)
                                }} style={styles.next1} >
                                    <Text allowFontScaling={false} style={styles.nexttext1}>
                                        {/* <Text style={{marginTop : -10 , alignSelf : "flex-start"}}></Text> */}
                                        Chat
                                        <View style={{ marginTop: 10, paddingLeft: 3, zIndex: 100, elevation: 100 }}>
                                            <MaterialCommunityIcons name="message-text-outline" size={16} color="#000" />
                                        </View>
                                    </Text>
                                </TouchableOpacity>}

                            </View>

                        </LinearGradient>
                    )
                }
                else if (item.type == "jobPost") {
                    return (
                        <LinearGradient
                            colors={["rgba(33, 34, 35, 0.4)", "rgba(25, 26, 27, 0.6)"]}
                            locations={[0, 1]}
                            style={styles.box}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }} >
                            <View style={styles.top} >
                                <TouchableOpacity
                                    onPress={() => { navigation.navigate("Singleuserpage", { token: token, id: item.user_id._id, page: "Startsy" }) }}
                                    style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                    <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                        <Image style={styles.userimg} source={{ uri: item.user_id.profilePhoto }} />
                                        <View style={styles.userdetail}>
                                            <Text allowFontScaling={false} style={styles.u1}>{item.user_id.userName}</Text>
                                            <Text allowFontScaling={false} style={styles.u2}>{item.user_id.role == "CommunityMember" ? "Member" : item.user_id.role}</Text>
                                        </View>
                                    </View>

                                </TouchableOpacity>
                            </View>
                            <View style={styles.divider}></View>
                            <View style={styles.lower}>
                                <Text style={styles.com1}>Role: {item.jobPosts.role}</Text>
                                {/* <Text>{JSON.stringify(item.jobPosts)}</Text> */}
                                <Text style={styles.com2}><Text style={styles.desc1}>Job description: </Text>{item.jobPosts.description}</Text>
                                <Text allowFontScaling={false} style={styles.u8}><Text style={{ color: "#828282" }}>Duration: {item.jobPosts.duration}</Text></Text>
                                <Text allowFontScaling={false} style={styles.u8}><Text style={{ color: "#828282" }}>Payment mode: {item.jobPosts.pay} </Text> </Text>
                                {item.jobPosts.amount != "" && <Text allowFontScaling={false} style={styles.u8}><Text style={{ color: "#828282" }}></Text>Amount: {item.jobPosts.amount} </Text>}

                                <TouchableOpacity onPress={() => { applyjob(item._id, index) }} style={[!item.Jobapplied ? styles.next : styles.next11,]} >
                                    <Text allowFontScaling={false} style={!item.Jobapplied ? styles.nexttext : styles.nexttext11}>{item.Jobapplied ? 'Applied' : "Apply"}</Text>
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                    )
                }
            }

        }

    , [])




    return (
        <SafeAreaView style={{ flex: 1, minHeight : "100%", backgroundColor: "#16181a" }}>

            {allpost.length == 0 && <Text style={{
                margin : "auto",marginTop : 200 , fontSize : 30, color : "#ccc" , fontFamily : "Roboto"
            }}>Search for post</Text>}

           


            <FlatList
                showsVerticalScrollIndicator={false}
                // style={main.scroll1}
                initialNumToRender={5}
                windowSize={10}
                maxToRenderPerBatch={5}
                scrollEventThrottle={0}
                keyExtractor={(item, index) => { return index }}
                removeClippedSubview={false}
                data={allpost}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingTop: 30,
                    paddingBottom: 100
                }}

                // onScroll={(e) => {
                //     scrollY.setValue(e.nativeEvent.contentOffset.y)
                // }}




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


export default Post