import { View, Text, StyleSheet, Pressable, Image, FlatList, RefreshControl, Vibration, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { jwtDecode } from 'jwt-decode';
import { GlobalContext } from "@/Global/globalcontext.js";
import { url } from '@/config';
import { CircularProgress } from 'react-native-circular-progress';
import Upvote from '@/assets/icons/upvote';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Share from "@/assets/icons/share.js";
import styles from "../../../styles/post.js"

const SuggestedPost = ({ item, index, opencomment, openshare, upvotepost ,id}) => {

    // console.log(item)
    
    if (!item.user_id) return
    if (item.type == "communityPost") return
    if (item.type == "jobPost") return
    if (item.type == "Question") return
    if(item._id==id)return;

    const lastTap = useRef(null);
    const handleDoubleTap = (id, index) => {
        const now = Date.now();
        if (lastTap.current && now - lastTap.current < 300) {
            Vibration.vibrate(20)
            upvotepost(id, index)
        }
        lastTap.current = now;
    };

    



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
                            // console.log(decode.role);

                            // if (decode.role == "Investor") {
                            //     console.log("qpqpqp");
                            //     if (item.user_id.role == "Founder") return
                            //     else navigation.navigate("Singleuserpage", { token: token, id: item.user_id._id, page: "Startsy" })
                            // }
                            // else if (item.user_id.role != "Investor") {
                            //     navigation.navigate("Singleuserpage", { token: token, id: item.user_id._id, page: "Startsy" })
                            // }

                        }}
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
                        <TouchableOpacity onPress={() => { upvotepost(item._id, index,false) }}>
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




export default SuggestedPost;