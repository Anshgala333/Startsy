import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { View, Animated, Text, Image, ToastAndroid, Easing, FlatList, StatusBar,Linking, RefreshControl, ActivityIndicator, StyleSheet, BackHandler, SafeAreaView, ScrollView, Pressable, Dimensions, TouchableOpacity, Modal, TouchableWithoutFeedback, TextInput, Vibration } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Banner from "../assets/icons/banner.js"
import Upvote from '@/assets/icons/upvote';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import Post from "../components/Post.js"
import { useRoute } from '@react-navigation/native';
import { url } from "../config.js"
import { Video } from 'expo-av';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Share from "@/assets/icons/share.js";
import styles from "../styles/post.js"
import { jwtDecode } from 'jwt-decode';
import { useFocusEffect, useNavigation } from 'expo-router';
import Logout from "../assets/icons/logout.js"
import { Alert } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Delete from "../assets/icons/delete.js"
import { Skeleton } from 'moti/skeleton'
import { MotiView } from 'moti';
import ReadMore1 from "../SCREENS/trial-1.js";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

import Settings from "../SCREENS/Settings.js"

import BottomSheet, { BottomSheetView, BottomSheetScrollView, BottomSheetTextInput, BottomSheetDraggableView, BottomSheetFlatList, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'react-native-svg';

// import dotenv from 'dotenv/config'



const Apnauser = ({ props, token, mainpagebottomsheet, closeall, openshare }) => {
    // dotenv.config()
    var mypage = true
    const navigation = useNavigation()

    const flatListRef = useRef(null);
    const [commenttext, setcommenttext] = useState("")
    const [uploadingcomment, setuploadingcomment] = useState(false)
    const Spacer = ({ height = 16 }) => <View style={{ height }} />;





// console.log("profile page re");


    // var id = process.env.API_URL
    // console.log(id , "local id from env");

    const [attop, setattop] = useState(true);

    const animatedValue = useRef(new Animated.Value(0)).current;
    useEffect(() => {

        Animated.timing(animatedValue, {
            toValue: attop ? height + 10 : -10, // Move to 100 if attop is true, else move to 0
            //   duration: (moverfirst == undefined) ? 300 : 0,
            duration: 300,
            useNativeDriver: false, // Use native driver for better performance
            easing: Easing.inOut(Easing.ease)
            //
        }).start();
    }, [attop]);
    const animatedtop = {
        top: animatedValue, // Bind animated value to top
    };



    const animatedValue1 = useRef(new Animated.Value(0)).current;
    const animatedtop1 = {
        top: animatedValue1, // Bind animated value to top
    };



     const showToastWithGravity = (message) => {
        ToastAndroid.showWithGravityAndOffset(
          `${message}`,
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          100, 100
        );
      };
    
    useEffect(() => {
        // Start the animation
        Animated.timing(animatedValue1, {
            toValue: attop ? 0 : -height, // Move to 0 if attop is true, else move to -height
            duration: 300,
            useNativeDriver: false, // Use native driver for better performance
            easing: Easing.inOut(Easing.ease)


        }).start();
    }, [attop]);









    const comments = ({ item, index }) => {

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
        return (
            <View key={index} style={styles.listItem}>
                <Image
                    source={{ uri: item.userId.profilePhoto }}
                    style={styles.avatar} />
                <View style={styles.textContainer}>
                    <Text allowFontScaling={false} style={styles.username}>{item.userId.userName}</Text>
                    <Text allowFontScaling={false} style={styles.message}>{item.comment.trim()}</Text>
                </View>
                <Text allowFontScaling={false} style={styles.time}>{time(item.createdAt)}</Text>
            </View>
        )
    }

    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [isdeleting, setisdeleting] = useState(false);

    useFocusEffect(
        useCallback(() => {
            if (closeall) {
                closeall()
            }
        }, [])
    )



    var decode = jwtDecode(token)
    // console.log(decode);

    var editprofilepage;


    async function docomment() {

        setuploadingcomment(true)


        try {

            const response = await fetch(`${url}posts/createComment/${postid}`, {
                method: 'POST',
                body: JSON.stringify({ comment: commenttext }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            // console.log(data);
            setemptycomment(false)

            // console.log(response.status);
            setcommenttext("");

            var object = {
                comment: commenttext,
                createdAt: new Date(),
                userId: {
                    profilePhoto: data.profilePhoto,
                    userName: data.userName,
                }
            }
            var newarray = [...allcomments]
            newarray.unshift(object)
            setallcomments(newarray)


            const scrollToTop = () => {
                flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
            };
            scrollToTop();
            scrollToTop();

        }
        catch (err) {
            console.log(err);

        }
        finally {
            setuploadingcomment(false)
            // Keyboard.dismiss();
        }

    }



    const [minHeight, setMinHeight] = useState(100);
    const [tabIndex, setTabIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [investor, setinvestorarray] = useState([]);
    const [noninvestor, setnoninvestor] = useState([]);
    const [refreshing, setRefreshing] = useState(false);


    const AboutTab = () => {

        useFocusEffect(
            useCallback(() => {

                // mainpagebottomsheet.current?.close()
                handleTabChange(1)
            })
        )

        return (
            <View style={{ flex: 1, width: width, height: 10000, backgroundColor: "#16181a" }}>
                <View style={styles1.buyPlanSection}>
                    <Text allowFontScaling={false} style={styles1.buyPlanText}>Buy Plan</Text>
                </View>
            </View>

        )
    }


    const PostsTab = ({ posts, isLoading }) => {

        useFocusEffect(
            useCallback(() => {
                // console.log("post");
                // console.log(posts, "ok");

                // handleTabChange(1)
            })
        )


        return (
            <View style={{ flex: 1, backgroundColor: "#16181a" }}>

                <CustomAlert visible={visible} onClose={() => setVisible(false)} />
                <CustomAlert1 visible={visible1} onClose={() => setVisible1(false)} />

                {posts?.length == 0 && <Text style={styles1.no}>You have not posted anything yet</Text>}

                <FlatList
                    scrollEnabled={false}
                    getItemLayout={(data, index) => ({
                        length: 400,
                        offset: 400 * index,
                        index,
                    })}
                    keyExtractor={(item, index) => item._id.toString()}
                    data={posts}
                    renderItem={renderItem}


                />

            </View>
        );


    };



    useEffect(() => {
        // console.log(minHeight); // Log after state updates
    }, [minHeight]);


    const handleTabChange = (index) => {
        setTabIndex(index);
        // Update minHeight based on the active tab
        // if (index === 0) {
        //   setMinHeight(200); // About tab active, set minHeight to 200
        // } else if (index === 1) {
        //   setMinHeight(1400); // Posts tab active, set minHeight to 1000
        // }
    };





    if (decode.role == "Founder") {
        editprofilepage = "Founder1";
    }
    else if (decode.role == "Investor") {
        editprofilepage = "EditInvestorInfo";
    }
    else {
        editprofilepage = "Editcommunity";

    }

    // console.log(decode);
    // console.log(decode._id);

    var id = decode._id





    const Tab = createMaterialTopTabNavigator();


    const [userdata, setuserdata] = useState(null)
    const [posts, setPosts] = useState([])
    const [GeneralModelId, setGeneralModelId] = useState("")
    const [profilecompletion, setprofilecompletion] = useState()
    const [instaurl, setinstaurl] = useState("")
    const [LinkedinURl, setlinkedInUrl] = useState("")
    const [yturl, setyturl] = useState("")



    async function getdata(params) {
        try {

            const response = await fetch(`${url}api/getUsersProfiles/${id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();

            console.log(data.profileCompletion, "completion ka data");
            console.log(data);
            


            // console.log(data.data.chatUsers, "poiuytr");

            setinvestorarray(data.data?.chatUsers.filter((e) => e.role == "Investor"))
            setnoninvestor(data.data?.chatUsers.filter((e) => e.role != "Investor"))

            setGeneralModelId(data.data._id)
            setemail(data.data.email)

            setuserdata(data.data)
            setprofilecompletion(data.profileCompletion)

            var rec1 = data.data.portfolio.filter((e) => e.name != "")
            var rec2 = data.data.certification.filter((e) => e.name != "")
            var combined = [...rec1, ...rec2]
            setCertficate(combined)

            // console.log(data.data.hiddenInfo.socialProof);

            // var instaurl = data.data.hiddenInfo.socialProof[0].url
            // var LinkedinURl = data.data.hiddenInfo.socialProof[1].url
            // var yturl = data.data.hiddenInfo.socialProof[2].url

            setinstaurl(data.data.hiddenInfo.socialProof[0].url)
            setlinkedInUrl(data.data.hiddenInfo.socialProof[1].url)
            setyturl(data.data.hiddenInfo.socialProof[2].url)
            



            if (true) {
                var data1 = data.data.posts.map(e => {

                    // console.log(e);

                    var object = { ...e,
                         isliked: e.likedBy ? e.likedBy.includes(decode._id) : false, 
                         Applied: e.communityPost ? e.communityPost.communityMembers.includes(decode._id) : false,
                          Jobapplied: e.jobPosts ? e.jobPosts.jobApplicants.includes(decode._id) : false }
                    return object
                })
                if (data1) {
                    setPosts(data1.reverse())
                }
                else {
                    setPosts([])

                }
            }
            setfollowstatus(data.data.status)

            // console.log(data.data.posts.length, "post ka length");

            setMinHeight(data.data.posts.length * 700)
            // console.log(data.data.posts.length * 500);

            setImage(data.data.user_id.bannerImage)

            // console.log(data.data);
            // console.log(data.data.user_id.bannerImage);
            // console.log(image);





        }
        catch (err) {
            console.log(err);

        }
    }

    // console.log(id);

    useEffect(() => {
        getdata()
    }, [])



    // console.log(route.params);


    useEffect(() => {
        StatusBar.setBackgroundColor("#16181A");
        StatusBar.setBarStyle("light-content")
    }, [])




    // useEffect(() => {
    //     const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    //         // console.log(page);

    //         if (page == "Chat") {
    //             navigation.navigate(page, { item, messages, token });
    //         }
    //         else {
    //             navigation.navigate(page);
    //         }

    //         return true; // This prevents the default back action
    //     });

    //     return () => backHandler.remove();
    // }, [page]);

    const [image, setImage] = useState("")
    const [followstatus, setfollowstatus] = useState("Follow")
    const [email, setemail] = useState("")
    const [certficatesAndPortfolio, setCertficate] = useState("")

    const CustomAlert = ({ visible, onClose }) => {
        const fadeAnim = useRef(new Animated.Value(0)).current; // Persistent animated value

        useEffect(() => {
            if (visible) {
                Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
            } else {
                Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => {
                    if (typeof onClose === "function") {
                        onClose(); // Ensure onClose exists before calling
                    }
                });
            }
        }, [visible]);

        if (!visible) return null; // Prevent rendering when not visible

        async function deletepost1() {
            console.log("Deleting post...");
            Vibration.vibrate(200)
            if (idofposttobedeleetd != null) {
                setisdeleting(true)
                try {
                    const response = await fetch(`${url}posts/deletepost/${idofposttobedeleetd}`, {
                        method: 'POST',
                        body: "",
                        headers: {
                            accept: "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    });

                    const data = await response.json();
                    // console.log(data);

                    // Remove the post from the local state
                    const updatedPosts = posts.filter((post) => post._id !== idofposttobedeleetd);
                    setPosts(updatedPosts);
                    setVisible(false)
                } catch (err) {
                    console.log(err);
                }
                finally {
                    setisdeleting(false)
                }
            }
        }

        return (
            <Modal transparent visible={visible} animationType="none" onRequestClose={() => onClose?.()}>
                <TouchableWithoutFeedback onPress={() => onClose?.()}>
                    <Animated.View style={[styles1.overlay, { opacity: fadeAnim }]}>
                        <TouchableWithoutFeedback>
                            <View style={styles1.alertBox}>
                                <Text style={styles1.title}>Delete Post</Text>
                                <Text style={styles1.message}>Click confirm to delete.</Text>
                                <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>

                                    <TouchableOpacity onPress={() => onClose?.()} style={styles1.button}>
                                        <Text style={styles1.buttonText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => deletepost1()} style={styles1.button}>
                                        {isdeleting && <ActivityIndicator size={24} color="#16181a" />}
                                        {!isdeleting && <Text style={styles1.buttonText}>Confirm</Text>}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    };
    const CustomAlert1 = ({ visible, onClose }) => {
        const fadeAnim = useRef(new Animated.Value(0)).current; // Persistent animated value

        useEffect(() => {
            if (visible) {
                Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
            } else {
                Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => {
                    if (typeof onClose === "function") {
                        onClose(); // Ensure onClose exists before calling
                    }
                });
            }
        }, [visible]);

        if (!visible) return null; // Prevent rendering when not visible

      

        return (
            <Modal transparent visible={visible1} animationType="none" onRequestClose={() => onClose?.()}>
                <TouchableWithoutFeedback onPress={() => onClose?.()}>
                    <Animated.View style={[styles1.overlay, { opacity: fadeAnim }]}>
                        <TouchableWithoutFeedback>
                            <View style={styles1.alertBox}>
                       
                            </View>
                        </TouchableWithoutFeedback>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    };

    const [idofposttobedeleetd, setidofposttobedeleetd] = useState(null)

    const renderItem = ({ item, index }) => {



        async function deletepost(postid) {

            setVisible(true)
            setidofposttobedeleetd(postid)

            // console.log("hi");
            // console.log(postid);


        }




        const isVideoPlaying = videoStates[item._id] || false;

        function currency(pay) {
            // console.log(pay);
            // console.log(typeof pay);
            pay = Number(pay);
            return pay.toLocaleString("en-IN")
        }


        if (item.type == "photo" || item.type == "textBlog" || item.type == "video") {
            return (
                // <View key={index} style={styles.box}>
                    <LinearGradient
                                                    colors={["rgba(33, 34, 35, 0.4)", "rgba(25, 26, 27, 0.6)"]}
                                                    locations={[0, 1]}
                                                    style={styles.box}
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 0, y: 1 }} >
                    <View style={[styles.top, { marginBottom: 0 }]} >
                        <View
                            // onPress={() => { navigation.navigate("Singleuserpage", { token: token, id: item.user_id._id, page: "Startsy" }) }}
                            style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                            <Image style={styles.userimg} source={{ uri: userdata.user_id.profilePhoto }} />
                            <View style={styles.userdetail}>
                                <Text allowFontScaling={false} style={styles.u1}>{userdata.user_id.userName == "" ? decode.userName : decode.userName}</Text>
                                <Text allowFontScaling={false} style={styles.u2}>{userdata.user_id.role == "CommunityMember" ? "Member" : userdata.user_id.role}</Text>
                            </View>
                            <Pressable style={styles1.minus} onPress={() => {
                                Vibration.vibrate(20)
                                deletepost(item._id)
                            }}>
                                {/* <FontAwesome6 name="trash" style={styles1.minus} size={22} color="#00DE62" /> */}
                                {/* <Feather name="trash-2" style={styles1.minus} size={22} color="#00DE62" /> */}

                                {/* <Text>click me</Text> */}
                                {/* <Pressable style={styles1.minus}><Delete /></Pressable> */}
                                <Delete />

                            </Pressable>
                        </View>
                    </View>

                    {item.type == "textBlog" && <View style={styles.divider}></View>}

                    {item.type == "photo" && <Image style={[styles.template, { aspectRatio: item.aspectRatio ? item.aspectRatio : 1 / 1 }]} source={{ uri: item.mediaUrl }} />}
                    {item.type == "video" &&
                        <Video
                            ref={ref => videoRefs.current[item._id] = ref}
                            style={styles.template}
                            source={{ uri: item.mediaUrl }}
                            useNativeControls // Enables native playback controls
                            resizeMode="contain" // Adjusts video to fit within the view
                            isLooping // Loops the video
                            shouldPlay={isVideoPlaying}
                        />

                    }
                    {item.type == "textBlog" && <Text style={styles.blogtext}>{item.content}</Text>}

                        <View style={styles.iconcontainer}>

                                    <View style={styles.icon2}>


                                        <View style={{flexDirection:'row',gap:6,marginRight:4}}>
                                            <TouchableOpacity onPress={() => { upvotepost(item._id, index) }}>
                                          
                                                {!item.isliked && <Upvote width={32} height={34} style={{ marginLeft: 5, marginRight: -5, marginTop: 6 }} />}
                                                {item.isliked && <Upvote width={32} height={34} style={{ marginLeft: 5, marginRight: -5, marginTop: 6 }} selected={true} />}
                                            </TouchableOpacity>
                                            <Text style={{  left: 0, color: "#ccc" ,fontFamily:'Roboto',top:5}}>{item.likedBy.length}</Text>
                                        </View>


                                        <Pressable onPress={() => {
                                            Vibration.vibrate(20)
                                            opencomment(item._id)
                                            
                                        }}
                                        >
                                            <FontAwesome style={{ marginLeft: 4, marginRight:7}} name="comment-o" size={27} color="#ccc" />
                                        </Pressable>

                                        <Pressable onPress={() => {
                                            Vibration.vibrate(20)
                                            openshare(item._id)
                                        }}>
                                            <Share style={{ marginTop: 5, marginRight: 10, right: 0 }} />
                                        </Pressable>


                                    </View>


                                </View>

                                <View style={styles.lower}>
                                    {item.type != "textBlog" && <Text allowFontScaling={false} style={styles.u3}>{item.caption != undefined ? item.caption : "caption"} </Text>}
                                    <Pressable onPress={() => { opencomment(item._id) }} allowFontScaling={false} style={styles.u4}>
                                        <Text style={styles.u4}>View {item.postComments.length} comments</Text>
                                    </Pressable>
                               </View>
                               </LinearGradient>

                // </View>
            )
        }
        else if (item.type == "communityPost") {
            return (
                <View key={index} style={styles.box}>

                    <View style={styles.top} >
                        <View

                            // onPress={() => { navigation.navigate("Singleuserpage", { token: token, id: item.user_id._id, page: "Startsy" }) }}
                            style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                            <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                <Image style={styles.userimg} source={{ uri: userdata.user_id.profilePhoto }} />
                                <View style={styles.userdetail}>
                                    <Text allowFontScaling={false} style={styles.u1}>{decode.userName}</Text>
                                    <Text allowFontScaling={false} style={styles.u2}>Community Member</Text>
                                </View>
                                <Pressable style={styles1.minus} onPress={() => {
                                    Vibration.vibrate(20)
                                    deletepost(item._id)
                                }}>
                                    {/* <FontAwesome6 name="trash" style={styles1.minus} size={22} color="#00DE62" /> */}
                                    {/* <Feather name="trash-2" style={styles1.minus} size={30} color="#00DE62" /> */}
                                    {/* <Pressable style={styles1.minus}><Delete /></Pressable> */}
                                    <Delete />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    <View style={styles.divider}></View>

                    <View style={styles.lower}>
                        <Text style={styles.com1}>{item.communityPost.communityName}</Text>
                        <Text style={styles.com2}><Text style={styles.desc1}>Community description: </Text>{item.communityPost.communityDescription}</Text>
                        <Text allowFontScaling={false} style={styles.u6}><Text style={styles.desc1}>Members Count :</Text> {item.communityPost.communityMembers.length}</Text>
                        <Text allowFontScaling={false} style={styles.u7}>Rules & Guidelines: {item.communityPost.communityRules}</Text>

                        <Pressable style={[styles.next]} >
                            <Text allowFontScaling={false} style={styles.nexttext}>Join Forum</Text>
                        </Pressable>
                    </View>

                </View>
            )
        }
        else if (item.type == "jobPost") {
            return (
                <View key={index} style={styles.box}>
                    <View style={styles.top} >

                        <View
                            // onPress={() => { navigation.navigate("Singleuserpage", { token: token, id: item.user_id._id, page: "Startsy" }) }}
                            style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                            <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                <Image style={styles.userimg} source={{ uri: userdata.user_id.profilePhoto }} />
                                <View style={styles.userdetail}>
                                    <Text allowFontScaling={false} style={styles.u1}>{decode.userName}</Text>
                                    <Text allowFontScaling={false} style={styles.u2}>{userdata.user_id.role == "CommunityMember" ? "Member" : userdata.user_id.role}</Text>
                                </View>

                                <Pressable style={styles1.minus} onPress={() => {
                                    Vibration.vibrate(50)
                                    deletepost(item._id)
                                }}>
                                    {/* <FontAwesome6 name="trash" style={styles1.minus} size={22} color="#00DE62" /> */}
                                    {/* <Feather name="trash-2" style={styles1.minus} size={30} color="#00DE62" /> */}
                                    {/* <Pressable style={styles1.minus}><Delete /></Pressable> */}
                                    <Delete />


                                </Pressable>
                            </View>

                        </View>
                    </View>
                    <View style={styles.lower}>
                        <Text style={styles.com1}>Role: {item.jobPosts.role}</Text>
                        <Text style={styles.com2}><Text style={styles.desc1}>Community description: </Text>{item.jobPosts.description}</Text>
                        <Text allowFontScaling={false} style={styles.u8}><Text style={{ color: "#828282" }}>Duration: {item.jobPosts.duration}</Text></Text>
                        <Text allowFontScaling={false} style={styles.u8}><Text style={{ color: "#828282" }}>Payment mode: {item.jobPosts.pay} </Text> </Text>
                        {item.jobPosts.amount != "" && <Text allowFontScaling={false} style={styles.u8}><Text style={{ color: "#00de62" }}>Amount: {item.jobPosts.amount} </Text></Text>}


                        <Pressable onPress={() => { applyjob(item._id) }} style={[styles.job]} >
                            <Text allowFontScaling={false} style={styles.nexttext}>Apply</Text>
                        </Pressable>
                    </View>

                </View>
            )
        }
    };

    const fileupload = async () => {

        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        // Launch the image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All, // Allow all media types
            allowsEditing: true, // Allows cropping the image
            aspect: [16, 9], // Aspect ratio of the image
            quality: 1, // Image quality (0 to 1)

        });


        if (!result.canceled) {
            var final = new FormData();
            const imageUri = result.assets[0].uri;
            setImage(imageUri);

            final.append("coverImage", {
                uri: imageUri,
                type: "image/jpeg",
                name: `image_${Date.now()}.jpg`,

            })

            // console.log(final);


            const response = await fetch(`${url}api/uploadCoverImage`, {
                method: 'POST',
                body: final,
                headers: {
                    accept: "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await response.json();

            // console.log(data);

        }

    }


    async function sendfollowrequest(id) {

        // console.log(id);
        try {

            const response = await fetch(`${url}connections/followUser/${id}`, {
                method: 'POST',
                body: "",
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            // setloading(false)
            // console.log(response.status);
            setfollowstatus("request sent")

        }
        catch (err) {
            console.log(err);

        }

    }
    async function logout() {
        try {
            await AsyncStorage.removeItem('accessToken'); // Replace 'token' with your key
            // console.log('Token removed successfully');
        } catch (error) {
            console.error('Error removing token:', error);
        }
        console.log("removing");
        
        navigation.reset({
            index: 0,
            routes: [{ name: "LoginTrial" }],
        });

        // navigation.navigate("LoginTrial")

    }


    function getfund(fund) {

        // console.log('====================================');
        // console.log(fund);
        // console.log('====================================');

        if (fund == 69) {
            return 0
        }
        fund = fund - 57
        return (fund * 100000).toLocaleString("en-IN")


        // (+userdata.hiddenInfo.fundingStatus).toLocaleString("en-IN")

    }
// console.log(token);


    async function shownormalconnection() {

        var decoded = jwtDecode(token)

        // console.log(decoded);
        var route;

        if (decoded.role == "Founder") {
            route = "founder/getFounderChatUserList"
        }
        else if (decoded.role == "Investor") {
            route = "investor/getInvestorChatUserList"
        }
        else if (decoded.role == "CommunityMember") {
            // console.log("fuck");

            route = "founder/getFounderChatUserList"

        }


        // console.log(token, "second use focus effect");
        try {
            // setskeletonloading(true)
            const response = await fetch(
                `${url}${route}`,
                {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const result = await response.json();
            // console.log(result);
            
            // console.log(result,"kwsowusxquqeguiqevuasgofqegfqv8euhjXU   3JYCNHADSHYU");
            var array = result.map((e) => e.user)
            const uniqueData = array.filter((item, index, self) =>
                index === self.findIndex(t => t._id === item._id)
            );

            const filter2 = uniqueData.map((item)=> {
                return {...item, status: 'Connected' }
            }
            )



            navigation.navigate("Followerpage", { people: filter2 ,token:token})





            // const uniqueData = result.filter((item, index, self) =>
            //     self.findIndex(innerItem => innerItem.user.userName === item.user.userName) === index
            // );


            // const sortedData = uniqueData.sort((a, b) => {
            //     if (a.lastMessage === null && b.lastMessage === null) return 0;
            //     if (a.lastMessage === null) return 1;
            //     if (b.lastMessage === null) return -1;

            //     const dateA = new Date(a.lastMessage.createdAt);
            //     const dateB = new Date(b.lastMessage.createdAt);
            //     return dateB - dateA; // Sort in descending order of time
            // });

            // // console.log(result.data, "investor");
            // // console.log(result.data.messages.length, "investor");

            // if (response.status === 200) {
            //     // You can update the data state here if needed
            //     // setData(result); // Example, you can handle the response data
            //     setData(sortedData)
            //     setfiltereddata(sortedData)
            //     // setdata1(result)
            // }
        } catch (err) {
            console.log(err);
        } finally {
            // setskeletonloading(false)
            // setloading(false); // Set loading to false when done
        }
    }


    function length1(data) {
        // console.log(data.length);

        const uniqueData = data.filter((item, index, self) =>
            index === self.findIndex(t => t._id === item._id)
        );

        // console.log(uniqueData);
        

        // console.log(uniqueData.length);

        return uniqueData.length

        // console.log('====================================');
    }

    const handleswitch = ()=>{
        // if(profilecompletion < 80){
        //     showToastWithGravity("Please complete a minimum of 80% of the profile in order to switch role")
        // }
        // else{
        //     setattop(false)
        // }
        setattop(false)

       
    }

    const Header = function () {
        return (
            <View style={{ marginTop: 0 }} key={1}>
                <Pressable onPress={()=>{
                    navigation.navigate("Settings" , {token : token , tabnavigation : navigation})
                }}>
                    <View style={styles1.header}>
                        <Text numberOfLines={1} style={styles1.username}>{userdata.user_id.userName}</Text>
                        <View style={styles1.logout}>
                            {/* <Logout /> */}
                            <AntDesign name="setting" size={28} color="#ccc" style={{marginRight:10,alignContent:'center'}} />
                        </View>
                        {/* <Text style={styles1.logoutText}>Logout</Text> */}
                        {/* <TouchableOpacity onPress={() => setVisible(true)} style={styles1.showButton}>
                            <Text style={styles1.showButtonText}>Show Alert</Text>
                        </TouchableOpacity> */}


                    </View>
                </Pressable>
                <View>
                    <Pressable onPress={fileupload} style={styles1.top}>
                        {/* {userdata.user_id.bannerImage != "" && <Image style={styles1.bimg} source={{ uri: userdata.user_id.bannerImage }} />} */}

                        {(image == "" || image == undefined) &&
                            <View style={styles1.img1}>
                                <Banner />
                            </View>}


                        {(image != "" && image != undefined) && <Image style={styles1.bimg} source={{ uri: image }} />}
                    </Pressable>
                    <View style={styles1.bottom}>

                        {/* <Delete /> */}

                        <View style={styles1.parent}>
                            <AnimatedCircularProgress
                            style={{
                                position : "absolute",
                                top : -60,
                                left : 0
                            }}
                                size={120}
                                width={3}
                                fill={profilecompletion}
                                tintColor="#ccc"
                                backgroundColor="#16181a"
                                rotation={0}
                                lineCap="round"
                            >
                                {() => (
                                    // <View style={styles1.imageContainer}>
                                        <Image
                                            source={{uri : userdata.user_id.profilePhoto}} // Replace with your image URL
                                            style={styles1.img2}
                                        />

                                    // </View>

                                )}
                            </AnimatedCircularProgress>
                            <Text style={styles1.progressText}>{`${profilecompletion}%`}</Text>
                            {/* <MaterialCommunityIcons name="certificate-outline" size={24} color="#ccc" /> */}
                           
                        </View>

                      
                        {/* <View style={styles1.profilephoto}>
                            <Image style={styles1.img2} source={{ uri: userdata.user_id.profilePhoto }} />
                        </View> */}
                        <View style={styles1.upvote}>
                        
                            <View style={{ transform: [{ scale: 1.1 }], marginRight: 0 }} >
                                {/* <Upvote width={decode.role == "Investor" ? 0 : 50} height={44} /> */}
                                {(decode.role == "CommunityMember" || decode.role == "Job seeker") && 
                           <View style={styles1.ss}>
                            
                            
                             {certficatesAndPortfolio.length > 0 &&
                              <TouchableOpacity onPress={()=>navigation.navigate("CertificatePortfolioPage")}>
                              <MaterialCommunityIcons name="certificate-outline" size={24} color="#ccc" />
                           </TouchableOpacity>
                             }
                             
                              {instaurl != "" && <Pressable onPress={() => Linking.openURL(instaurl)} >
                                       <AntDesign name="instagram" style={styles.plus1} size={20} color="#bbbbbb" />
                                     </Pressable>}
                                     {yturl != "" && <Pressable onPress={() => {Linking.openURL(yturl)}} >
                                       <AntDesign name="youtube" style={styles.plus1} size={20} color="#bbbbbb" />
                                     </Pressable>
                                     }
                                     {LinkedinURl != "" && <Pressable onPress={() => Linking.openURL(LinkedinURl)} >
                                       <AntDesign name="linkedin-square" style={styles.plus1} size={20} color="#bbbbbb" />
                                     </Pressable>}


                           </View>
                        }
                        
                            </View>
                            <Text style={styles1.followers}>
                                {/* {decode.role != "Investor" && (userdata.totalUpvotes || 0)} */}
                            </Text>
                        </View>

                        <Text style={styles1.u1}>
                            {userdata.fullName}  <Text style={styles1.role}>{userdata.user_id.role == "CommunityMember" ? "Member" : userdata.user_id.role}</Text>

                        </Text>

                      <View style={{display : "flex" , flexDirection : "row" , gap : 0}}>
                      {/* <Pressable onPress={() => {
                            navigation.navigate(editprofilepage)
                        }} style={styles1.f1}>
                            <Text style={styles1.ft}>Edit profile</Text>
                            
                        </Pressable> */}
                       {userdata.user_id.role == "CommunityMember" &&  <Pressable style={styles1.f1} onPress={() => handleswitch()}>
                            <Text style={styles1.ft}>Switch Role </Text>
                        </Pressable>}

{/* <Pressable style={styles1.f1} onPress={() => handleswitch()}>
                            <Text style={styles1.ft}>Switch Role </Text>
                        </Pressable> */}
                      </View>
                        {/* <Text style={styles1.goal}>{userdata.goal}</Text> */}

                        {decode.role == "Founder" &&
                            <Text style={styles1.goal}>{userdata.goal}</Text>
                        }

                        {decode.role == "Founder" &&
                            <Text style={styles1.fund}>{userdata.hiddenInfo.stageOfStartup ? userdata.hiddenInfo.stageOfStartup : ""} :  ₹ {getfund(userdata.hiddenInfo.fundingStatus)}</Text>
                        }



                        {decode.role == "Investor" &&
                            <Text style={styles1.goal}>Investment experience : {userdata.previousExperience} years</Text>
                        }

                        {decode.role == "Investor" &&
                            <Text style={styles1.fund}>Investment capacity : ₹ {userdata.investmentRange.toLocaleString("en-IN")}</Text>
                        }


                        {(decode.role == "CommunityMember" || decode.role == "Job seeker") && userdata.tagline != ""&&
                            <Text style={styles1.goal}>{userdata.tagline}</Text>
                        }

                        {(decode.role == "CommunityMember"  || decode.role == "Job seeker") && userdata.skills != "" &&
                            <Text style={styles1.fund}>{userdata.skills}</Text>
                        }
                        

                        {/* <Pressable onPress={() => setattop(false)}>
                            <Text>press to go up</Text>
                        </Pressable> */}



                        {/* {userdata.goal != undefined && <Text style={styles1.goal}>{userdata.goal}</Text>}
                        {userdata.hiddenInfo?.stageOfStartup != undefined && <Text style={styles1.fund}>{userdata.hiddenInfo.stageOfStartup}</Text>} */}

                        <View style={styles1.main}>
                            {decode.role != "Investor" && decode.role != "CommunityMember" && <View style={styles1.connectionContainer}>


                                {Array(3).fill(null).map((_, index) => (
                                    <View key={index} style={styles1.circle}>
                                        <Image
                                            key={index}
                                            style={styles1.profileImage1}
                                            source={
                                                investor[index]
                                                    ? { uri: investor[index].profilePhoto } // Profile photo if available
                                                    : require("../assets/images/blank1.png")   // Dummy image if not
                                            }
                                        />
                                    </View>
                                ))}


                                <Text style={styles1.t6}>{userdata.investorConnections} investor connections</Text>
                            </View>}
                            <TouchableOpacity onPress={() => {
                                // console.log("users page");
                                shownormalconnection()

                            }} style={styles1.connectionContainer}>

                                {Array(3).fill(null).map((_, index) => (
                                    <View key={index} style={styles1.circle}>
                                        <Image
                                            key={index}
                                            style={styles1.profileImage1}
                                            source={
                                                noninvestor[index]
                                                    ? { uri: noninvestor[index].profilePhoto } // Profile photo if available
                                                    : require("../assets/images/blank1.png")   // Dummy image if not
                                            }
                                        />
                                    </View>
                                ))}

                                <Text style={styles1.t6}>{length1(userdata.chatUsers)} connections</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles1.divider}></View>

                    </View>
                </View>
            </View>
        )
    }


    // useFocusEffect(useCallback(()=>{
    //     getdata()
    // }))

    async function upvotepost(id, index) {
        // console.log(id);
        // console.log(index);

        var toset = !posts[index].isliked
        // console.log(toset);

        var status = toset ? "like" : "unlike"

        setPosts(posts.map((e, i) => {
            if (i == index) {
                var object = { ...e, isliked: !e.isliked }
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
            // console.log(data);
            // console.log(response.status);

        }
        catch (err) {
            // setloading(false)
            console.log(err);

        }


    }

    const [emptycomment, setemptycomment] = useState(false)
    const [comment, setcomment] = useState(false)
    const [co, setiscommentopen] = useState(false)
    const [allcomments, setallcomments] = useState([])
    const [postid, setpostid] = useState(null)
    const bottomSheetRef5 = useRef(null);


    async function opencomment(id) {
        setcomment(true)
        bottomSheetRef5.current?.expand();
        setpostid(id);
        setiscommentopen(true)

        // console.log("open comment");


        try {
            // console.log(token);
            const response = await fetch(`${url}posts/getComments/${id}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            // console.log(response.status);
            // console.log(data.data);
            setallcomments(data.data)
            if (data.data.length == 0) {
                setemptycomment(true)
            }
            else {
                setemptycomment(false)

            }

        }
        catch (err) {
            console.log(err);
        }



    }





    const render = ({ item, index }) => (

        < View key={index} style={{ flex: 1, minHeight: minHeight, backgroundColor: "#16181a" }} >

            {!userdata && <ActivityIndicator size={24} color="#ccc" />}
            {userdata && <Header />}

            {/* Tab Navigation */}
            < View style={styles1.tabContainer} >
            <PostsTab isLoading={isLoading} posts={posts} setPosts={setPosts} />
               {/* <Tab.Navigator
                    screenOptions={({ route }) => ({

                        tabBarStyle: {
                            marginBottom: 10,
                            backgroundColor: "#16181a",
                            // backgroundColor: "red",
                            justifyContent: "space-between",
                            display: "flex",
                            // height  : 200,
                            elevation: 0,


                            width: width * 0.95,
                            margin: "auto"
                        },


                        tabBarIndicatorStyle: {
                            backgroundColor: "#00DE62",
                            height: 0,
                        },

                    })}
                > */}
                    {/* <Tab.Screen
                        name="Connections"
                        component={AboutTab}
                        options={{
                            tabBarLabel: ({ focused }) => (
                                <Text allowFontScaling={false} style={[
                                    styles1.tabbarpill, {

                                        color: focused ? "#16181A" : "#ccc",
                                        borderColor: focused ? "#ccc" : "#ccc",
                                        backgroundColor: focused ? "#ccc" : "transparent",
                                    }
                                ]}> Buy Plan
                                </Text>
                            ),

                        }}
                    /> */}
                    {/* <Tab.Screen

                        name="Requests"
                        children={() => <PostsTab isLoading={isLoading} posts={posts} setPosts={setPosts} />}
                        options={{
                            tabBarLabel: ({ focused }) => (
                                <Text allowFontScaling={false} style={[
                                    styles1.tabbarpill, {
                                        color: focused ? "#16181A" : "#ccc",
                                        borderColor: focused ? "#ccc" : "#ccc",
                                        backgroundColor: focused ? "#ccc" : "transparent",
                                    }
                                ]}> Your Posts
                                </Text>
                            ),

                        }}
                    /> */}
                {/* </Tab.Navigator> */}

                {/* {decode.role == "Investor" && <AboutTab />} */}
            </ View>
        </View >

    )


    const [viewableItems, setViewableItems] = useState([]);
    const [videoStates, setVideoStates] = useState({});
    const videoRefs = useRef({});
    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        setViewableItems(viewableItems);

        // Update play state for videos based on visibility
        const updatedVideoStates = {};
        viewableItems.forEach(viewableItem => {
            if (viewableItem.isViewable) {
                updatedVideoStates[viewableItem.item._id] = true; // Video should play when in view
            } else {
                updatedVideoStates[viewableItem.item._id] = false; // Video should stop when out of view
            }
        });

        setVideoStates(updatedVideoStates);
        viewableItems.forEach(item => {
            if (!item.isViewable && videoRefs.current[item.item._id]) {
                videoRefs.current[item.item._id].pauseAsync(); // Pause the video
            }
        });
    }, []);



    const viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 80, // Item is considered viewable if 50% is visible
    };



    const loadMorePosts = () => {
        // console.log(tabIndex);

        if (isLoading) return;
        if (tabIndex == 0) return;
        // console.log('====================================');
        // console.log("new post will come qlwijwei ");
        // console.log('====================================');

        setIsLoading(true);
        setTimeout(() => {
            const newPosts = Array.from(
                { length: 10 },
                (_, i) => `Post ${posts.length + i + 1}`
            );
            setPosts((prevPosts) => [...prevPosts, ...newPosts]);
            setIsLoading(false);
            // setMinHeight(minHeight + 300)

            // console.log('====================================');
            // console.log(posts);
            // console.log(minHeight);

            // console.log('====================================');
            setMinHeight(minHeight + 300); // Adjust minHeight for new posts
        }, 2000); // Simulate API delay
    };


    const renderBackdrop = (props) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1} // Backdrop disappears when BottomSheet is closed
            appearsOnIndex={0} // Backdrop appears when BottomSheet is open
            opacity={0.7} // Set opacity for the backdrop
        />
    );

    const snapPoints5 = useMemo(() => ["50%", "100%"], []);





    async function deletepost(postid) {

       
        // try {
        //     const response = await fetch(`${url}posts/deletepost/${postid}`, {
        //         method: 'POST',
        //         body: "",
        //         headers: {
        //             accept: "application/json",
        //             "Authorization": `Bearer ${token}`,
        //         },
        //     });
        //     const data = await response.json();
        //     console.log(data);
        //     // var array = posts.map((e)=>{
        //     //     console.log(e);

        //     //     if(e._id != id){
        //     //         return e
        //     //     }
        //     // })
        //     // var array = posts.splice(posts.indexOf(postid) , 1)
        //     // setPosts(array)

        // }
        // catch (err) {
        //     console.log(err);

        // }

    }

    const [status1, setstatus] = useState(false)


    return (
        <>
            <Animated.View style={[{ flex: 1, backgroundColor: "#16181a" }]}>

                {!userdata && <View style={styles1.header}>
                    <Text style={styles1.username}>Profile</Text>
                    <View style={styles1.logout}>
                        {/* <Logout /> */}
                    </View>
                    {/* <Text style={styles1.logoutText}>Logout</Text> */}
                </View>}

                {/* {!userdata && <ActivityIndicator style={{ marginVertical: "auto", top: -50 }} size="large" color="#ccc" />} */}

                {!userdata &&
                    <MotiView
                        transition={{ type: 'timing', duration: 1000, repeatReverse: true }}
                        // style={[styles.container, styles.padded]}
                        animate={{ backgroundColor: "#16181a" }}
                    >

                        <Skeleton
                            transition={{
                                // repeat: Infinity,
                                duration: 10000
                            }}
                            colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

                            colorMode='dark'
                            // opacity={0.1}
                            // backgroundColor="#595857"
                            highlightColor="#ccc"
                            radius={0}
                            height={100}
                            width={"100%"}
                        />
                        <View style={{ marginTop: -30, marginLeft: 10 }}>
                            <Skeleton
                                transition={{
                                    // repeat: Infinity,
                                    duration: 10000
                                }}
                                colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

                                colorMode='dark'
                                // opacity={0.1}
                                // backgroundColor="#595857"
                                highlightColor="#ccc"
                                radius={130}
                                height={130}
                                width={130}
                            />
                        </View>
                        <Spacer />

                        <Spacer height={8} />
                        <View style={{ display: "flex", flexDirection: "column", gap: 5, paddingLeft: 10 }}>

                            <Skeleton
                                transition={{
                                    // repeat: Infinity,
                                    duration: 4000
                                }}
                                colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

                                colorMode='dark'
                                // opacity={0.1}
                                // backgroundColor="#595857"
                                highlightColor="#ccc"
                                radius={20}
                                height={30}
                                width={250}
                            />

                            <Spacer height={0} />
                            <Skeleton
                                colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

                                colorMode="dark"
                                width={170}
                                height={18}
                                // backgroundColor="black"
                                highlightColor="#333"  // Set highlight color
                            />
                            <Spacer height={0} />

                            <Skeleton
                                colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

                                colorMode="dark"
                                width={250}
                                height={18}
                                // backgroundColor="black"
                                highlightColor="#333"  // Set highlight color
                            />
                            <Spacer height={0} />

                            <Skeleton
                                colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

                                colorMode="dark"
                                width={200}
                                height={18}
                                // backgroundColor="black"
                                highlightColor="#333"  // Set highlight color
                            />
                        </View>


                        <View style={{ display: "flex", flexDirection: "row", gap: 40, justifyContent: "center", marginTop: 40 }}>

                            <Skeleton
                                transition={{
                                    // repeat: Infinity,
                                    duration: 10000
                                }}
                                colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

                                colorMode='dark'
                                // opacity={0.1}
                                // backgroundColor="#595857"
                                highlightColor="#ccc"
                                radius={10}
                                height={15}
                                width={140}
                            />

                            <Skeleton
                                transition={{
                                    // repeat: Infinity,
                                    duration: 10000
                                }}
                                colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

                                colorMode='dark'
                                // opacity={0.1}
                                // backgroundColor="#595857"
                                highlightColor="#ccc"
                                radius={10}
                                height={15}
                                width={140}
                            />

                        </View>
                    </MotiView>

                }



                {userdata && <FlatList
                    scrollEnabled={true}


                    keyExtractor={(item, index) => index.toString()}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    refreshControl={
                        <RefreshControl progressViewOffset={0} refreshing={refreshing} progressBackgroundColor="#16181a"
                            colors={['#00de62']}
                            onRefresh={() => {
                                setRefreshing(true);
                                getdata()
                                Vibration.vibrate(200)


                                setTimeout(() => {
                                    setRefreshing(false); // Stop refreshing after fetching data
                                }, 2000); // Adjust the delay as needed
                            }} />}

                    data={[1]}
                    // keyExtractor={[1] => item.id.toString()} 
                    style={{ backgroundColor: "#16181a" }}
                    renderItem={render}
                    onEndReachedThreshold={0.1}

                />}



                 <BottomSheet


                    overlayColor="rgba(0, 0, 0, 0.9)"
                    backdropComponent={renderBackdrop}
                    enablePanDownToClose
                    backgroundStyle={{ backgroundColor: '#1A1D1F', borderRadius: 30 }} // Changes the background of the sheet itself
                    handleIndicatorStyle={{ backgroundColor: '#00de62' }}

                    ref={bottomSheetRef5}
                    snapPoints={snapPoints5}
                    onClose={() => {
                        setcomment(false)
                        setstatus(false)
                        setiscommentopen(false);
                    }}
                    index={-1} // Initially closed
                    contentContainerStyle={{ zIndex: 100, elevation: 20, }}


                >
                    <View style={{ flex: 0.92 }}>

                        <Text style={styles.comment}>Comments</Text>
                        {/* <KeyboardAvoidingView behavior="" keyboardVerticalOffset={-100} style={{ flex: 1 }}> */}
                        {emptycomment && <Text style={styles.no}>No comments yet</Text>}
                        <BottomSheetFlatList
                            ref={flatListRef}
                            data={allcomments}
                            renderItem={comments}
                            scrollEnabled={true}
                            style={{ flex: 0.7, height: "100", overflow: "hidden" }}
                        // contentContainerStyle={  }}

                        />
                        {/* </KeyboardAvoidingView> */}
                        <View
                            style={styles.sc1}>
                            <TextInput
                                placeholder=""

                                placeholderTextColor="#828282"
                                style={styles.searchInput}
                                value={commenttext}
                                multiline={true}
                                onChangeText={text => setcommenttext(text)}
                            />
                            <Pressable onPress={docomment} style={styles.send1} >

                                {uploadingcomment && <ActivityIndicator size={24} color="#00de62" />}
                                {!uploadingcomment && <Ionicons name="send" size={24} color="#00DE62" />}
                            </Pressable>
                        </View>




                    </View>

                </BottomSheet>
                






            </Animated.View>
            <ReadMore1 attop={attop} GeneralModelId={GeneralModelId} setattop={setattop} animatedtop={animatedtop} email={email} token={token} />


        </>



    )

}

export default Apnauser

const { width, height } = Dimensions.get("window");

const styles1 = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        height: 55,
        backgroundColor: "#16181A",
        paddingHorizontal: 15,
        paddingVertical: 5,
        justifyContent: "space-between",
        alignItems : "center",
    },
    header1: {
        display: "flex",
        flexDirection: "row",
        height: 55,
        // alignItems : "center",
        backgroundColor: "#16181A",
        paddingHorizontal: 15,
        // paddingVertical: 5,
        justifyContent: "space-between"
    },
    username: {
        fontFamily: "myanmar",
        fontSize: 24,
        width: "70%",
        color: "#00DE62",
        fontWeight: "bold",
        // marginLeft: 5,
        marginTop: 5,
        flex: 1
    },
    logout: {
        fontFamily: "myanmar",
        fontSize: 24,
        color: "#00DE62",
        fontWeight: "bold",
        marginLeft: 10,
        marginTop: 5,
        flexDirection: "row",  // If adding more icons in the future
        alignItems: "center"
    },
    top: {
        width: "100%",
        height: 120,
        backgroundColor: "#7A7B7C",
        justifyContent: "center",
        alignContent: "center",
        display: "flex",
    },
    img1: {
        // backgroundColor : "red",
        width: 50,
        height: 50,
        margin: "auto",
        marginTop: 35,
        paddingLeft: 10,
        alignSelf: "center",

    },
    bottom: {
        width: "100%",
        backgroundColor: "#16181a",
        padding: 10
    },
    upvote: {
        justifyContent: "flex-end",
        alignSelf: "flex-end",
        width: 80,
        // backgroundColor: "red",
        height: "auto",
        marginVertical: 20,
        display: "flex",
        flexDirection: "row",
        // height : 100
    },
    followers: {
        color: '#00de62',
        // fontFamily: "Roboto",
        alignSelf: "flex-end",
        marginLeft: -10,
        // paddingTop : 20
        // top: 12

    },
    u1: {
        fontFamily: "Alata",
        fontSize: 24,
        color: "#E9E9E9",
        paddingHorizontal: 5,
        width: "100%",
        marginVertical: 10,
        marginTop: 20,
        // marginTop: 30
    },
    role: {
        fontFamily: "Roboto",
        fontSize: 14,
        color: "#888",
        marginLeft: 10,
        top: -2

    },

    f1: {
        // width: 180,
        paddingHorizontal : 25,
        height: 34,
        backgroundColor: "#ccc",
        borderRadius: 20,
        justifyContent: "flex-start",
        alignItems: "center",
        marginVertical: 0,
        // paddingHorizontal: 5,
        marginHorizontal: 5

    },
    ft: {
        fontFamily: "Alata",
        fontSize: 16,
        color: "#16181A",
        marginTop: 3

    },
    goal: {
        fontFamily: "Roboto",
        fontSize: 18,
        color: "#D9D9D9",
        paddingHorizontal: 5,
        marginVertical: 12,
        marginBottom: 5,
        // marginTop  : 0

    },
    fund: {
        fontFamily: "Roboto",
        fontSize: 15,
        color: "#00de62",
        paddingHorizontal: 5,
        marginVertical: 0

    },
    connectionContainer: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        marginVertical: 20
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 50,
        marginRight: -6,
        overflowY: "hidden",
    },

    ss :{
        display : "flex",
        flexDirection : "row",
        gap : 10,
        paddingLeft : 10,
        marginRight: 18,
        marginTop : -10
    },

    profileImage1: {
        width: "100%",
        height: "100%",
        borderRadius: 100,
        marginBottom: 0,
        borderWidth: 2,
        borderColor: "#16181a"
    },
    t6: {
        fontFamily: "Alata",
        fontSize: 12,
        color: "#AEAFAF",
        marginLeft: 15,
        marginTop: -2
    },

    main: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly"

    },
    divider: {
        width: "110%",
        marginLeft: -20,
        height: 3,
        marginTop: 5,
        // marginBottom: 20,
        backgroundColor: "#24272A"
    },

    profilephoto: {
        width: 130,
        height: 130,
        // aspectRatio: 1 / 1,
        position: "absolute",
        left: 10,
        top: -45,
        // backgroundColor : "red",
        justifyContent: "center",
        alignItems: "center",
        // borderWidth: 4,
        // borderColor: "#000",
        borderRadius: 100,
        overflow: "hidden",


    },
    img2: {
        objectFit: "cover",
        width: "100%",
        alignSelf: "center",
        height: "100%",
        // borderRadius: 100,

    },
    bimg: {
        width: "100%",
        height: "100%",


    },
    buyPlanSection: {
        borderWidth: 2,
        borderColor: "#ccc",
        borderRadius: 10,
        // minHeight: 400,
        width: width * 0.89,
        height: 400,
        // height: 200,
        // justifyContent: "center",
        // alignItems: "center",
        alignSelf: "center",
        // flex: 0.9,
        backgroundColor: "#16181a",
        marginTop: 10
    },
    buyPlanText: {
        fontSize: 32,
        fontFamily: "Alata",
        color: "#B8B8B8",
        textAlign: "center"
    },

    tabContainer: {
        flex: 1,
        height: Dimensions.get('window').height - 250,
    },
    tabContent: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    tabbarpill: {
        borderWidth: 2,
        borderRadius: 30,
        textAlign: "center",
        textAlignVertical: "center",
        height: 46,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        width: width * 0.46,
        fontFamily: "Alata",
        fontSize: 18,
        textAlign: "center",
        verticalAlign: "top",
        paddingTop: 7,
        textAlignVertical: "center",
        textTransform: "capitalize",
        borderWidth: 1,
        borderRadius: 30,

    },
    no: {
        textAlign: 'center',
        fontSize: 16,
        marginVertical: "auto",
        alignSelf: "center",
        // flex: 1,
        color: "#666",
        // fontFamily: "Roboto",
        marginTop: 30,
        // backgroundColor :  "red",
        height: 30
    },
    logoutText: {
        position: "absolute",
        right: 12,
        top: 16,
        color: "#ccc",
        fontFamily: "Roboto",
        fontSize: 14
    },
    minus: {
        // backgroundColor :"red",
        position: "absolute",
        right: 20,
        elevation: 100,
        zIndex: 1000,
        top: 12
    }
    // logout : {
    //     position: "absolute",
    //     right : 0,
    //     top : 10
    // }
    , container: { flex: 1, justifyContent: "center", alignItems: "center" },
    overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
    alertBox: { width: 300, backgroundColor: "#1A1D1F", padding: 20, borderRadius: 20, alignItems: "center" },
    title: { fontSize: 20, fontWeight: "bold", color: "#D9D9D9", fontFamily: "Alata" },
    message: { fontSize: 16, marginVertical: 10, textAlign: "center", color: "#D9D9D9", fontFamily: "Roboto" },
    button: { marginTop: 10, backgroundColor: "#00de62", padding: 6, paddingHorizontal: 37, borderRadius: 10 },
    buttonText: { color: "#1A1D1F", fontSize: 16, fontFamily: "Roboto", fontWeight: "bold" },
    showButton: { backgroundColor: "#28a745", padding: 10, borderRadius: 5 },
    showButtonText: { color: "#fff", fontSize: 16 },
    imageContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    progressText: {
        position: 'absolute',
        textAlign : "center",
        paddingHorizontal : 10,
        zIndex: 10,
        top : 40,
        left : 40,
        alignSelf : "center",
        // width : 80,
        paddingHorizontal: 10,
        paddingVertical: 4,
        color: '#000',
        backgroundColor: '#00de62',
        borderRadius: 10
    },
    parent : {
        width : 200,
        backgroundColor : "red",
        position : "relative",
        flex : 1
    }




})










// const ProfilePage = ({ progress = 0.8 }) => {
//     return (
//         <View style={styles.container}>
//             <AnimatedCircularProgress
//                 size={100}
//                 width={7}
//                 fill={progress * 100}
//                 tintColor="white"
//                 backgroundColor="#3d5875"
//                 rotation={0}
//                 lineCap="round"
//             >
//                 {() => (
//                     <View style={styles.imageContainer}>
//                         <Image
//                             source={require('../../assets/image.png')} // Replace with your image URL
//                             style={styles.profileImage}
//                         />

//                     </View>

//                 )}
//             </AnimatedCircularProgress>
//             <Text style={styles.progressText}>{`${progress * 100}%`}</Text>
//         </View>
//     )
// }


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
    
// });
