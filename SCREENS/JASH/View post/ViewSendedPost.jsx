import { View, Text, StyleSheet, Pressable, Image, FlatList, RefreshControl, Vibration, TouchableOpacity, ActivityIndicator ,Dimensions} from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'

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
import { useRoute } from "@react-navigation/native";

import DeletedPost from './DeletedPost.jsx'



const ViewSendedPost = ({ openshare, opencomment }) => {

    const [skeletonLoading, setSkeletonLoading] = useState(false);
    const [refreshing, setRefresing] = useState(false);
    const [allPost, setAllPost] = useState([]);
    const [sentPost, setSentPost] = useState({});
    const route = useRoute()
    // console.log(route.params.id)
    const id = route.params.id;
    // console.log(id);



    const { globaldata, updateField } = useContext(GlobalContext);

    const token = globaldata.token;


    var decode = jwtDecode(token)
    // console.log(token);

    var loggedinUserID = decode._id


    // console.log(id);

    async function upvotepost(id, index, isSingle) {
        Vibration.vibrate(50)


        if (!isSingle) {

            var toset = !allPost[index].isliked
            var status = toset ? "like" : "unlike"

            var increment = toset == true ? 1 : -1

            setAllPost(prevPosts =>
                prevPosts.map((e, i) => {
                    if (i === index) {
                        return { ...e, isliked: toset, itemlikedcount: e.itemlikedcount + increment };
                    }
                    return e;
                })
            );
        }

        if (isSingle) {

            var toset = !sentPost.isliked
            var status = toset ? "like" : "unlike"
            var increment = toset == true ? 1 : -1


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

            console.log(response.status);

        }
        catch (err) {
            console.log(err);

        }
    }





    const getSinglePost = async () => {
        setSkeletonLoading(true)
        try {
            const response = await fetch(`${url}test/getOnePost/${id}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            const { data } = await response.json();
            if (!data) {
                // console.log("daaattaaaaaa", data);
                setSentPost([]);
            }

            else {
                var data1 = data.map(e => {

                    var object = { ...e, isliked: e.likedBy.includes(loggedinUserID), Applied: e.communityPost ? e.communityPost.communityMembers.includes(loggedinUserID) : false, Jobapplied: e.jobPosts ? e.jobPosts.jobApplicants.includes(loggedinUserID) : false, itemlikedcount: e.likedBy.length }
                    return object
                })

                setSentPost(data1[0]);


            }

        }
        catch (err) {
            console.log(err);

        }
    }





    ///call this when page renders
    useEffect(() => {
        getSinglePost();
        getpost();
    }, [route.params.id])



    ///fetch all data
    const getpost = async () => {

        try {
            // setSkeletonLoading(true)
            const response = await fetch(`${url}posts/getPosts`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();


            var decode = jwtDecode(token)
            var loggedinUserID = decode._id


            var data1 = data.data.map(e => {

                var object = { ...e, isliked: e.likedBy.includes(loggedinUserID), Applied: e.communityPost ? e.communityPost.communityMembers.includes(loggedinUserID) : false, Jobapplied: e.jobPosts ? e.jobPosts.jobApplicants.includes(loggedinUserID) : false, itemlikedcount: e.likedBy.length }
                return object
            })


            if (data.data.length > 0) {

                setAllPost(data1);



                setSkeletonLoading(false);

                updateField("allpost", data1.reverse())

            }

        }
        catch (err) {
            console.log(err);
        }
        finally {
            setTimeout(() => {
                setSkeletonLoading(false)
            }, 0);
        }
    };


    return (
        <View style={styles.container}>
            {
                skeletonLoading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                        <ActivityIndicator size={'large'} color={"#00de62"} />
                    </View>
                    : <FlatList
                        showsVerticalScrollIndicator={false}

                        ListHeaderComponent={() => {
                            return (
                                <>
                                    <View>
                                        {
                                            sentPost.length == 0 ?
                                               <DeletedPost/>
                                                :
                                                <SendedPost item={sentPost} index={0}
                                                    openshare={openshare}
                                                    opencomment={opencomment}
                                                    upvotepost={upvotepost} />
                                        }
                                    </View>
                                    <Text style={{ color: 'white', fontSize: 24, paddingLeft: 20, marginBottom: 10 }}>Suggestions</Text>
                                </>
                            )
                        }}
                        scrollEventThrottle={16}
                        data={allPost}
                        renderItem={({ item, index }) => {
                            return (
                                <SuggestedPost item={item} index={index} id={id}
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






// const styles1 = StyleSheet.create({

//     container: {
//         backgroundColor: '#16181a',
//         flex: 1,
//     },

//     sendedPost: {
//         flex: 1,

//     },
//     suggestionsContainer: {
//         flex: 1,
//         backgroundColor: 'red',
//         marginTop: 20,
//     }


// })

export default ViewSendedPost