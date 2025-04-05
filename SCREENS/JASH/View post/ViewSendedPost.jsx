import { View, Text, StyleSheet, Pressable, Image, FlatList, RefreshControl, Vibration, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native'
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
import { ToastAndroid } from 'react-native';



const ViewSendedPost = ({ openshare, opencomment }) => {

    const [skeletonLoading, setSkeletonLoading] = useState(false);
    const [refreshing, setRefresing] = useState(false);
    const [allPosts, setAllPosts] = useState([]);
    const [bookmarks, setBookmarks] = useState([])
    const [sentPost, setSentPost] = useState({});
    const route = useRoute()

    const id = route.params.id;

    
    
    
    
    const { globaldata, updateField } = useContext(GlobalContext);
    
    const token = globaldata.token;
    
    
    var decode = jwtDecode(token)
    
    
    var loggedinUserID = decode._id
    
    const showToastWithGravity = (message) => {
           ToastAndroid.showWithGravityAndOffset(
               `${message}`,
               ToastAndroid.SHORT,
               ToastAndroid.TOP,
               100, 100
           );
       };

    const toggleSavePost = async (id, index,isSingle) => {
    

        // console.log("book");
        if(isSingle){
            setSentPost(prev => {
                return {
                    ...prev,
                    isSaved:!prev.isSaved
                }
                

            });
            var toset = sentPost.isSaved
        }
        else{
            // console.log("here");
            
            setAllPosts(prevPosts =>
                prevPosts.map((e, i) => {
                    if (i === index) {
                        return { ...e, isSaved: !e.isSaved };
                    }
                    return e;
                })
            );
            var toset = allPosts[index].isSaved
            // console.log(toset);
            
        }



        var status = toset ? "remove" : "add"
        var message = toset ? "Unsaved" : "Saved"
        showToastWithGravity(`Post ${message} successfully`)

        try {
            console.log("here");
            
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
          
            
        
            Vibration.vibrate(20)

        }
        catch (err) {
            console.log(err);

        }


    }



    async function upvotepost(id, index, isSingle) {
        Vibration.vibrate(50)


        if (!isSingle) {

            var toset = !allPosts[index].isliked
            var status = toset ? "like" : "unlike"

            var increment = toset == true ? 1 : -1

            setAllPosts(prevPosts =>
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
            const responsedData = await response.json();
      


            const data = responsedData.data
            const bookmarks = responsedData.bookmarks






            if (!data) {

                setSentPost([]);
            }


            else {
                var data1 = data.map(e => {

                    var object = {
                        ...e, isliked: e.likedBy.includes(loggedinUserID),
                        Applied: e.communityPost ? e.communityPost.communityMembers.includes(loggedinUserID) : false,
                        Jobapplied: e.jobPosts ? e.jobPosts.jobApplicants.includes(loggedinUserID) : false, itemlikedcount: e.likedBy.length,
                        isSaved: bookmarks.includes(e._id)
                    }
                    return object
                })

                setSentPost(data1[0]);


            }


        }
        catch (err) {
            console.log(err);

        }
    }


    ///call sis when page renders
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


            const { bookmarks } = data;

            setBookmarks(bookmarks);



            var decode = jwtDecode(token)
            var loggedinUserID = decode._id


            var data1 = data.data.map(e => {

                var object = {
                    ...e, isliked: e.likedBy.includes(loggedinUserID), Applied: e.communityPost ? e.communityPost.communityMembers.includes(loggedinUserID) : false, Jobapplied: e.jobPosts ? e.jobPosts.jobApplicants.includes(loggedinUserID) : false,
                    itemlikedcount: e.likedBy.length,
                    isSaved: bookmarks.includes(e._id)
                }
                return object
            })


            if (data.data.length > 0) {

                setAllPosts(data1);



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
                                                <DeletedPost />
                                                :
                                                <SendedPost item={sentPost} index={0}
                                                    openshare={openshare}
                                                    toggleSavePost={toggleSavePost}
                                                    opencomment={opencomment}
                                                    upvotepost={upvotepost} />
                                        }

                                    </View>
                                    <Text style={{ color: '#777', fontSize: 20, paddingLeft: 20, marginBottom: 15, fontFamily: "Alata", marginTop: -15 }}>Suggestions</Text>
                                </>
                            )
                        }}
                        scrollEventThrottle={16}
                        data={allPosts}
                        renderItem={({ item, index }) => {
                            return (
                                <SuggestedPost
                                    bookmarks={bookmarks}
                                    toggleSavePost = {toggleSavePost}
                                    item={item} index={index} id={id}
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