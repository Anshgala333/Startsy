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
import SuggestedPost from './SuggestedPost.jsx'
import SendedPost from './SendedPost.jsx'


const ViewSendedPost = ({ route, openshare, opencomment }) => {

    const [skeletonLoading, setSkeletonLoading] = useState(false);
    const [refreshing, setRefresing] = useState(false);
    const [allPost, setAllPost] = useState([]);
    const [sentPost, setSentPost] = useState({});

    async function upvotepost(id, index,isSingle) {
        Vibration.vibrate(50)
        var toset = !allPost[index].isliked
        var status = toset ? "like" : "unlike"
        
        var increment = toset == true ? 1 : -1
        
        
        // setallpost(allpost.map((e, i) => {
        //     if (i == index) {
        //         var object = { ...e, isliked: !e.isliked, itemlikedcount: e.itemlikedcount + increment }
        //         return object
        //     }
        //     else return e
        // }))

        setAllPost(prevPosts =>
            prevPosts.map((e, i) => {
                if (i === index) {
                    return { ...e, isliked: toset, itemlikedcount: e.itemlikedcount + increment };
                }
                return e;
            })
        );

        if (isSingle) {
            console.log("single");
            setSentPost(prevSentPost => ({
                ...prevSentPost,
                isliked: toset,
                itemlikedcount: prevSentPost.itemlikedcount + increment
            }));
        }

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




    const { globaldata, updateField } = useContext(GlobalContext);

    const token = globaldata.token;
    useEffect(() => {
        getpost();
    }, [])


    const getpost = async () => {
        setSkeletonLoading(true)
        try {
            // setSkeletonLoading(true)
            const response = await fetch(`${url}posts/getPosts`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            // console.log(data);

            var decode = jwtDecode(token)
            var loggedinUserID = decode._id


            var data1 = data.data.map(e => {

                var object = { ...e, isliked: e.likedBy.includes(loggedinUserID), Applied: e.communityPost ? e.communityPost.communityMembers.includes(loggedinUserID) : false, Jobapplied: e.jobPosts ? e.jobPosts.jobApplicants.includes(loggedinUserID) : false, itemlikedcount: e.likedBy.length }
                return object
            })


            if (data.data.length > 0) {

                setAllPost(data1);
                console.log(data1);
                setSentPost(data1[0])
                console.log(sentPost);
                setSkeletonLoading(false);
                // console.log(data1[0]);
                updateField("allpost", data1.reverse())
                // setSkeletonLoading(false);
            }

        }
        catch (err) {
            console.log(err);
        }
        finally {
            setTimeout(() => {
                // console.log(skeletonLoading)
                // setSkeletonLoading(false)
            }, 0);
        }
    };














    return (
        <View style={styles.container}>
            {
                skeletonLoading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                        <ActivityIndicator size={'large'} />
                    </View>
                    : <FlatList
                        showsVerticalScrollIndicator={false}

                        ListHeaderComponent={() => {
                            return (
                                <>
                                    <View style={{ borderBottomColor: 'grey', borderBottomWidth: 2, marginBottom: 20 }}>
                                        <SendedPost  item={sentPost} index={0}
                                        openshare={openshare}
                                            opencomment={opencomment}
                                            upvotepost={upvotepost} />
                                    </View>
                                    <Text style={{ color: 'white', fontSize: 24, paddingLeft: 20, marginBottom: 10 }}>Suggestions</Text>
                                </>
                            )
                        }}
                        scrollEventThrottle={16}
                        // keyExtractor={(item) => item._id.toString()}
                        // removeClippedSubview={false}
                        data={allPost}
                        // renderItem={renderItem}
                        renderItem={({ item, index }) => {
                            return(
                                <SuggestedPost item={item} index={index}
                                opencomment={opencomment}
                                openshare={openshare} upvotepost={upvotepost} />
                            );
                        }
                        }
                        contentContainerStyle={{
                            paddingTop: 10,
                            paddingBottom: 100
                        }}





                        refreshControl={

                            <RefreshControl
                                progressBackgroundColor="#16181a"
                                colors={['#00de62']}
                                progressViewOffset={100}
                                refreshing={refreshing}
                                onRefresh={() => {
                                    setRefresing(true);
                                    getpost();
                                    setSkeletonLoading(true)
                                    Vibration.vibrate(100)
                                    setTimeout(() => {
                                        setSkeletonLoading(false)
                                        setRefresing(false); // Stop refreshing after fetching data
                                    }, 2000); // Adjust the delay as needed
                                }}
                            />

                        }
                    />
            }
        </View>
    )
}






const styles1 = StyleSheet.create({

    container: {
        backgroundColor: '#16181a',
        flex: 1,
    },

    sendedPost: {
        flex: 1,

    },
    suggestionsContainer: {
        flex: 1,
        backgroundColor: 'red',
        marginTop: 20,
    }


})

export default ViewSendedPost