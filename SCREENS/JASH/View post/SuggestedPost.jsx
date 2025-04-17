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
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const SuggestedPost = ({ item, index, opencomment, openshare, upvotepost, id, toggleSavePost }) => {



    if (!item.user_id) return
    if (item.type == "communityPost") return
    if (item.type == "jobPost") return
    if (item.type == "Question") return
    if (item._id == id) return;

    const lastTap = useRef(null);
    const handleDoubleTap = (id, index) => {
        const now = Date.now();
        if (lastTap.current && now - lastTap.current < 300) {
            Vibration.vibrate(20)
            upvotepost(id, index)
        }
        lastTap.current = now;
    };



    function messagetime(date) {
        var date1 = new Date(date);
        const messageDate1 = date1.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
        return messageDate1
    }





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


                <View style={styles.iconcontainer}>

                    <View style={[styles.icon2,]}>


                        <View style={{ flexDirection: 'row', gap: 7, marginRight: 4, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => { upvotepost(item._id, index) }}>

                                {!item.isliked && <Upvote width={32} height={34} style={{ marginLeft: 5, marginRight: -5, marginTop: 6 }} />}
                                {item.isliked && <Upvote width={32} height={34} style={{ marginLeft: 5, marginRight: -5, marginTop: 6 }} selected={true} />}
                            </TouchableOpacity>
                            <Text style={{ color: "#ccc", fontFamily: 'Roboto', fontSize: 14, top: 3 }}>{item.itemlikedcount}</Text>
                        </View>


                        {/* comment */}


                        <View style={{ flexDirection: 'row', gap: 7, marginRight: 4, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                Vibration.vibrate(20)
                                opencomment(item._id)

                            }}
                            >
                                <FontAwesome name="comment-o" size={28} color="#ccc" />

                            </TouchableOpacity>

                            <Text style={{ color: "#ccc", fontFamily: 'Roboto', fontSize: 16, top: 3 }}>{item.postComments.length}</Text>
                        </View>

                        {/* <Pressable onPress={() => {
                            Vibration.vibrate(20)
                            opencomment(item._id)

                        }}
                        >
                            <FontAwesome name="comment-o" size={27} color="#ccc" />
                        </Pressable> */}


                        {/* share */}

                        <Pressable onPress={() => {
                            Vibration.vibrate(20)
                            openshare(item._id)
                        }}>
                            <Share style={{ top: 3 }} />
                        </Pressable>


                    </View>



                    <TouchableOpacity style={{ paddingRight: 0, paddingRight: 8 }} onPress={() => toggleSavePost(item._id, index)}>
                        {!item.isSaved ? (
                            <MaterialIcons name="bookmark-border" size={32} color="#ccc" />
                        ) : (
                            <MaterialCommunityIcons
                                name="bookmark"
                                size={32}
                                color="#ccc"

                            />
                        )}
                    </TouchableOpacity>



                </View>
                <View style={styles.lower}>
                    {item.type != "textBlog" && <Text allowFontScaling={false} style={styles.u3}>{item.caption != undefined ? item.caption : "caption"} </Text>}
                    <Pressable allowFontScaling={false} style={styles.u4}>
                        <Text style={styles.u4}>{messagetime(item.createdAt)}</Text>
                    </Pressable>

                </View>
                {/* </View> */}
            </LinearGradient >
        </Pressable>
    )



}




export default SuggestedPost;