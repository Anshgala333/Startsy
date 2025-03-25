

import React, { useState, useRef, useEffect, useContext, useCallback, memo } from "react";
import {
    ScrollView,
    SafeAreaView,
    View,
    Text,
    TextInput,
    Image,
    Animated,
    Pressable,
    StyleSheet,
    Dimensions,
    StatusBar,
    FlatList,
    BackHandler,
    RefreshControl,
    TouchableOpacity,
    Keyboard,
    Vibration

} from "react-native";
import Post from "./SeperatePost.js"
import { Skeleton } from 'moti/skeleton'
import { MotiView } from 'moti';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import Profile from "@/assets/icons/profile.js";
import Search from "../../assets/icons/Search.js";
import main from "../../styles/main.js"
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useNavigation } from "expo-router";
import { url } from "../../config.js"
import { GlobalContext } from "@/Global/globalcontext.js";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { jwtDecode } from "jwt-decode";

import User from "../main-2/SuggestedUser.js"
// import styles from "@/styles/l.js";

const NewsLetter = React.memo(
    ({ closeall, }) => {
        const navigation = useNavigation()
        const Tab = createMaterialTopTabNavigator();
        // console.log('newsletter okkkkkkkkkkk re render');



        useEffect(() => {
            // console.log('====================================');
            // console.log("closeall re render");
            // console.log('====================================');
        }, [closeall])
        useEffect(() => {
            // console.log('====================================');
            // console.log("token re render");
            // console.log('====================================');
        }, [token])
        useEffect(() => {
            // console.log('====================================');
            // console.log("newsletter re render");
            // console.log('====================================');
        }, [newsletter])
        useEffect(() => {
            // console.log('====================================');
            // console.log("filterednewsletter re render");
            // console.log('====================================');
        }, [filterednewsletter])
        useEffect(() => {
            // console.log('====================================');
            // console.log("globaldata re render");
            // console.log('====================================');
        }, [globaldata])

        useEffect(() => {
            // console.log('====================================');
            // console.log("newsletter11 re render");
            // console.log('====================================');
        }, [newsletter])
        useEffect(() => {
            // console.log('====================================');
            // console.log("filtered new letter re render");
            // console.log('====================================');
        }, [filterednewsletter])
        useEffect(() => {
            // console.log('====================================');
            // console.log("suggestion array new letter re render");
            // console.log('====================================');
        }, [suggestionarray])
        useEffect(() => {
            // console.log('====================================');
            // console.log("refreshing re render");
            // console.log('====================================');
        }, [refreshing])
        useEffect(() => {
            // console.log('====================================');
            // console.log("getdata re render");
            // console.log('====================================');
        }, [getdata])
        useEffect(() => {
            // console.log('====================================');
            // console.log("renderItem re render");
            // console.log('====================================');
        }, [renderItem])
        useEffect(() => {
            // console.log('====================================');
            // console.log("renderItem1 re render");
            // console.log('====================================');
        }, [renderItem1])




        const [token, setToken] = useState("");
        const [loggedinuserid, setloggedin] = useState("");
        const { globaldata } = useContext(GlobalContext);

        useEffect(() => {
            // console.log("gd re rendr");
            setToken(globaldata.token);
        }, [globaldata])

        // useFocusEffect(
        //     useCallback(() => {
        //         closeall()
        //     }, [])
        // )

        useEffect(() => {
            if (token) {
                var decode = jwtDecode(token)
                console.log(decode);

                setloggedin(decode._id)
            }
        }, [token])


        const [newsletter, setnewsletter] = useState([])
        const [filterednewsletter, setfilterednewsletter] = useState([])


        // async function getdata() {

        // }
        const getdata = useCallback(async () => {
            try {
                const response = await fetch(`${url}admin/getAllNewletters`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
                const data = await response.json();

                var special = data.data.filter((e) => e.leaderboardCategory == null)

                // console.log(special);
                // console.log(special.length);

                var normal = data.data.filter((e) => e.leaderboardCategory != null)

                // console.log(normal.length);


                setnewsletter(normal)
                setfilterednewsletter(special)




            }
            catch (err) {
                // console.log(err);
            }
            finally {
                setTimeout(() => {
                    setloading(false)
                }, 3000);
            }
        }, [token])

        useEffect(() => {
            getdata()
            // getspecialnewsletter()
        }, [token])


        // useFocusEffect(
        //     useCallback(() => {
        //         getdata()
        //     }, [token])
        // );


        const renderItem = useCallback(({ item }) => {

            // console.log('====================================');
            // console.log("render 1");
            // console.log('====================================');


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


                <Pressable onPress={() => {
                    navigation.navigate("NewsletterPage", { navigation, item: item })
                }}>
                    <LinearGradient
                        colors={["rgba(33, 34, 35, 0.4)", "rgba(25, 26, 27, 0.6)"]}
                        locations={[0, 1]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={styles.box}>
                        <Image style={styles.image} source={{ uri: item.newsletterImage }} />


                        <Text style={styles.text}>
                            <Text numberOfLines={2}
                                ellipsizeMode="tail"
                                allowFontScaling={false} style={styles.des}></Text>{item.title}

                        </Text>

                        <View style={styles.bottominfo}>
                            <Image style={styles.topimage} source={{ uri: item.taggedUser.profilePhoto }} />
                            <Text style={styles.topu1}>{item.taggedUserName}</Text>
                            {/* <Text style={styles.topu2}>{item.taggedUser.role}</Text> */}
                            <Text style={styles.topu2}>{item.taggedUser.role == "CommunityMember" ? "Member" : item.taggedUser.role}</Text>
                            <View style={styles.circle}></View>

                            <AutoSizeText
                                numberOfLines={1}
                                fontSize={8}
                                mode={ResizeTextMode.max_lines}
                                ellipsizeMode='tail'
                                style={styles.time}>{time(item.taggedUser.createdAt)}
                            </AutoSizeText>
                        </View>
                    </LinearGradient>
                </Pressable>


            )
        }, [])



        const renderItem1 = ({ item }) => {

            // console.log("render2");

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

            if (filterednewsletter.length == 0) {
                // console.log("hiii");

            }

            return (



                <>{!loading && <Pressable onPress={() => { navigation.navigate("NewsletterPage", { navigation, item: item }) }}>
                    <LinearGradient
                        colors={["rgba(36, 39, 42 , 0.4)", "rgba(22, 24, 26 , 0.6)"]}
                        locations={[0, 1]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={styles.box1}>



                        <View style={styles.left}>
                            <Text style={styles.text}>
                                <Text numberOfLines={2}
                                    ellipsizeMode="tail"
                                    allowFontScaling={false} style={styles.des}></Text>{item.title}

                            </Text>

                            <View style={styles.bottominfo1}>
                                <Image style={styles.topimage} source={{ uri: item.taggedUser.profilePhoto }} />
                                <Text style={styles.topu1}>{item.taggedUserName}</Text>
                                {/* <Text style={styles.topu2}>{item.taggedUser.role}</Text> */}
                                <Text style={styles.topu2}>{item.taggedUser.role == "CommunityMember" ? "Member" : item.taggedUser.role}</Text>

                                <View style={styles.circle}></View>
                                {/* <Text style={styles.time}>{time(item.taggedUser.createdAt)}</Text> */}

                                <AutoSizeText
                                    numberOfLines={1}
                                    fontSize={12}
                                    mode={ResizeTextMode.max_lines}
                                    ellipsizeMode='tail'
                                    style={styles.time}>{time(item.taggedUser.createdAt)}
                                </AutoSizeText>
                            </View>
                        </View>
                        <View style={styles.right}>
                            <Image style={styles.image1} source={{ uri: item.newsletterImage }} />
                        </View>
                    </LinearGradient>
                </Pressable>
                }</>

            )
        }

        const [refreshing, setRefreshing] = useState(false)
        const [refreshing1, setRefreshing1] = useState(false)
        const [suggestionarray, setsuggestionarray] = useState([])
        const [text1, settext] = useState("")

        function search(text) {
            if (text[0] != "@" && selectedword == "Newsletter") {
                setfilterednewsletter(newsletter.filter(item =>
                    text === "" || item.content.toLowerCase().includes(text.toLowerCase())
                ))
            }
        }

        const [loading, setloading] = useState(true)

        // async function searchUser() {

        //     // console.log("user search");
        //     var final = `@${text1}`
        //     try {
        //         const response = await fetch(`${url}api/getUserNameSuggestions/${final}`, {
        //             method: 'GET',
        //             headers: {
        //                 accept: "application/json",
        //                 "Authorization": `Bearer ${token}`,
        //             },
        //         });
        //         const data = await response.json();
        //         console.log(data.data);
        //         var filterUser = data.data.filter(e => e._id != loggedinuserid)

        //         setsuggestionarray(filterUser)

        //     }
        //     catch (err) {
        //         console.log(err);

        //     }
        //     finally {
        //         setRefreshing1(false)
        //     }
        // }


     
     


        useEffect(() => {
            async function searchUser() {

                // console.log("user search");
                var final = `showAllUser`
                try {
                    const response = await fetch(`${url}api/getUserNameSuggestions/${final}`, {
                        method: 'GET',
                        headers: {
                            accept: "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    // console.log(data);
                    var filterUser = data.data.filter(e => e._id != loggedinuserid)


                    setsuggestionarray(filterUser)

                }
                catch (err) {
                    console.log(err);

                }
            }
            searchUser()
        }, [token])
        const inputref = useRef(null)
        useEffect(() => {
            const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {

            });
            const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
                // inputref.current?.blur()
            });

            return () => {
                backHandler.remove()

                keyboardDidHideListener.remove();
            }
        }, []);

        const Spacer = ({ height = 16 }) => <View style={{ height }} />;



        const NewsletterComponent = memo(() => {

            useFocusEffect(
                useCallback(() => {

                    // console.log("ok");


                    console.log("ok");

                    handleTabChange("Newsletter")
                }, [])
            )
            return (

                <>
                    <FlatList

                        getItemLayout={(data, index) => ({
                            length: 300, // Fixed height of each item
                            offset: 300 * index,
                            index,
                        })}
                        style={styles.container}
                        data={filterednewsletter}
                        contentContainerStyle={{ paddingBottom: 100 }}
                        keyExtractor={(item, index) => index}
                        renderItem={renderItem1}
                        refreshControl={
                            <RefreshControl
                                progressBackgroundColor="#16181a"
                                colors={['#00de62']}
                                onRefresh={() => {
                                    setRefreshing(true)
                                    Vibration.vibrate(200)
                                    getdata()
                                    setTimeout(() => {
                                        setRefreshing(false)
                                    }, 1000);
                                }} refreshing={(refreshing)} />
                        }
                        // style={styles.scroll1}
                        ListHeaderComponent={
                            <>
                                <View style={styles.divider}></View>
                                <Text allowFontScaling={false} style={styles.headline}>Leaderboard </Text>
                                {loading && <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
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
                                            radius={20}
                                            height={180}
                                            width={250}
                                        />
                                        <Spacer />
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
                                            height={15}
                                            width={250}
                                        />
                                        <Spacer height={8} />
                                        <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                                            <Skeleton
                                                // colorMode="dark"
                                                width={20}
                                                colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

                                                // backgroundColor="red" // Changed to red

                                                height={20}
                                                radius={"round"}
                                                // backgroundColor="black"
                                                highlightColor="#000"  // Set highlight color
                                            />
                                            <Spacer height={8} />
                                            <Skeleton
                                                colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

                                                colorMode="dark"
                                                width={200}
                                                height={18}
                                                // backgroundColor="black"
                                                highlightColor="#333"  // Set highlight color
                                            />
                                        </View>
                                    </MotiView>
                                </View>}

                                {!loading && <FlatList

                                    horizontal={true}
                                    style={styles.scroll}
                                    data={newsletter}
                                    renderItem={renderItem}
                                >
                                </FlatList>}


                                <View style={styles.divider}></View>
                                <Text allowFontScaling={false} style={styles.headline}>Community news </Text>

                                {
                                    loading && <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
                                        <MotiView
                                            transition={{ type: 'timing', duration: 1000, repeatReverse: true }}
                                            style={{ backgroundColor: "white" }}
                                            animate={{ backgroundColor: "#16181a" }}
                                        >



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
                                                height={10}
                                                width={190}
                                            />
                                            <Spacer height={5} />
                                            <Skeleton
                                                colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

                                                transition={{
                                                    // repeat: Infinity,
                                                    duration: 4000
                                                }}
                                                colorMode='dark'
                                                // opacity={0.1}
                                                // backgroundColor="#595857"
                                                highlightColor="#ccc"
                                                radius={20}
                                                height={10}
                                                width={190}
                                            />
                                            <Spacer height={30} />
                                            <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                                                <Skeleton
                                                    colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

                                                    // colorMode="dark"
                                                    width={20}
                                                    // backgroundColor="red" // Changed to red

                                                    height={20}
                                                    radius={"round"}
                                                    // backgroundColor="black"
                                                    highlightColor="#000"  // Set highlight color
                                                />
                                                <Spacer height={10} />
                                                <Skeleton
                                                    colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

                                                    colorMode="dark"
                                                    width={150}
                                                    height={12}
                                                    // backgroundColor="black"
                                                    highlightColor="#333"  // Set highlight color
                                                />
                                            </View>

                                            <View style={{ position: "absolute", right: 0, top: 0 }}>
                                                <Skeleton
                                                    colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

                                                    // colorMode="dark"
                                                    width={90}
                                                    // backgroundColor="red" // Changed to red

                                                    height={70}
                                                    radius={10}
                                                    // backgroundColor="black"
                                                    highlightColor="#000"  // Set highlight color
                                                />
                                            </View>
                                        </MotiView>
                                    </View>
                                }



                            </>
                        }
                    >





                    </FlatList>

                </>

            )

        })


        const globalsearch = (text) => {


            if (selectedword == "users") {
                searchUser(text)
            }

        }


        const [selectedword, setselectedword] = useState('Newsletter')

        function handleTabChange(selected) {
            setselectedword(selected)
            // console.log(selected);

        }

        // useEffect(()=>{
        //     console.log("suggestions array",suggestionarray);

        // },[])

        // const User = memo(() => {

        //     const scrollPosition = useRef(0);
        //     const listRef = useRef(null);
        //     const handleScroll = (event) => {
        //         scrollPosition.current = event.nativeEvent.contentOffset.y;
        //     };


        //     async function sendfollowrequest(stat, id) {

        //         // if (stat) return
    
        //         console.log(stat);
        //         console.log(stat);
        //         console.log(stat);
        //         console.log(stat);
        //         console.log(stat);
    
        //         if (stat == "Connected" || stat == "Request Sent") {
                    
        //             // setconnecteddata("Follow")
    
    
        //             async function makesubmit() {
        //                 setsuggestionarray((prevArray) =>
        //                     prevArray.map((e) =>
        //                         e._id === id ? { ...e, status: "Connect" } : e
        //                     )
        //                 );
    
        //                 try {
        //                     const response = await fetch(`${url}founder/rejectRequest/${id}`, {
        //                         method: 'POST',
        //                         headers: {
        //                             Authorization: `Bearer ${token}`,
        //                         }
        //                     })
        //                     const data = await response.json();
        //                     console.log(data);
                            
    
    
        //                 }
        //                 catch (err) {
        //                     console.log(err);
    
        //                 }
        //             }
        //             makesubmit()
        //             return
        //         }
    
               
        //         setsuggestionarray((prevArray) =>
        //             prevArray.map((e) =>
        //                 e._id === id ? { ...e, status: "Request Sent" } : e
        //             )
        //         );
                
    
    
        //         // console.log(id);
        //         try {
    
        //             const response = await fetch(`${url}connections/followUser/${id}`, {
        //                 method: 'POST',
        //                 body: "",
        //                 headers: {
        //                     "Content-Type": "application/json",
        //                     accept: "application/json",
        //                     "Authorization": `Bearer ${token}`,
        //                 },
        //             });
        //             const data = await response.json();
        //             console.log(data);
        //             // console.log(response.status);
    
        //             // setfollowstatus("request sent")
        //             // setconnecteddata("Request sent")
    
        //         }
        //         catch (err) {
        //             console.log(err);
    
        //         }
    
        //     }
    


        //     function renderSuggestion({ item }) {

        //         // console.log('====================================');
        //         console.log("render3");
        //         // console.log('====================================');
        //         if (item.role == "Admin") return
        //         if (item._id == loggedinuserid) return
        //         return (
        //             // <Text style={{color : "#fff"}}>hello</Text>
        //             <TouchableOpacity onPress={() => {
        //                 navigation.navigate("Singleuserpage", { token: token, id: item._id, page: "NewsLetter" })
        //             }}>
        //                 <View style={[styles.listItem, {}]}>
        //                     {/* <Image
        //                         source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8slgZXgqnSIXDS8wF2uDT_SmsYlBe-W1soQ&s" }}
        //                         style={styles.avatar} /> */}
        //                     {!item.profilePhoto && <Image style={styles.avatar} source={require("../../assets/images/blank.png")} />}
        //                     {item.profilePhoto && <Image style={styles.avatar} source={{ uri: item.profilePhoto }} />}
    
    
    
    
        //                     <View style={styles.textContainer}>
        //                         <Text numberOfLines={1}
    
        //                             allowFontScaling={false} style={styles.username}>{item.userName}</Text>
        //                         <Text allowFontScaling={false} style={styles.message}>{item.role == "CommunityMember" ? "Member" : item.role}</Text>
        //                     </View>
    
        //                     <TouchableOpacity
        //                         onPress={() => { sendfollowrequest(item.status, item._id) }}
        //                         style={item.status != "Connect" ? styles.sendbtn1 : styles.sendbtn}>
    
        //                         {item.status == "Connect" && <Text style={{ color: "#16181a", fontFamily: "Alata", alignItems: "center", textAlign: "center", marginTop: -2, fontSize: 14, }}>{item.status}</Text>}
    
        //                         {item.status == "Request Sent" && <Text style={{ color: "#ccc", fontFamily: "Alata", alignItems: "center", textAlign: "center", marginTop: -2, fontSize: 14, }}>{item.status}</Text>}
    
        //                         {item.status == "Connected" && <Text style={{ color: "#ccc", fontFamily: "Alata", alignItems: "center", textAlign: "center", marginTop: -2, fontSize: 14, }}>{item.status}</Text>}
        //                     </TouchableOpacity>
        //                     {/* <Text allowFontScaling={false} style={styles.time}> "today"}</Text> */}
        //                 </View>
        //             </TouchableOpacity>
        //         )
        //     }


        //     useFocusEffect(
        //         useCallback(() => {
        //             handleTabChange("users")
        //         })
        //     )
        //     return (


        //         <View style={{ flex: 1, backgroundColor: "#16181a" }}>


        //             <FlatList
        //                 keyExtractor={(item, index) => index}
        //                 data={suggestionarray}
        //                 ref={listRef}
        //                 renderItem={renderSuggestion}
        //                 onScroll={handleScroll}
        //                 style={[styles.suggestionbox]}
        //                 contentContainerStyle={{ paddingBottom: 100 }}
        //                 extraData={suggestionarray}
        //                 getItemLayout={(data, index) => ({ length: 200, offset: 200 * index, index })} 
        //                 maintainVisibleContentPosition={{ minIndexForVisible: 20 }}
        //                 onContentSizeChange={() => {
        //                     if (listRef.current) {
        //                         listRef.current.scrollToOffset({ offset: scrollPosition.current, animated: false });
        //                     }
        //                 }}

        //                 refreshControl={
        //                     <RefreshControl
        //                         progressBackgroundColor="#16181a"
        //                         colors={['#00de62']}
        //                         onRefresh={() => {
        //                             setRefreshing1(true)
        //                             // Vibration.vibrate(200)
        //                             searchUser()

        //                         }} refreshing={refreshing1} />
        //                 }


        //             />
        //         </View>


        //     )
        // })


        return (
            <SafeAreaView style={{ flexGrow: 1, minHeight: 700, backgroundColor: "#16181a", position: "relative" }}>

                {/* {filterednewsletter.length == 0 && <Render />} */}


                <Animated.View><Text allowFontScaling={false} style={styles.headerText}>Search</Text></Animated.View>

                <View style={styles.searchContainer}>
                    <Pressable>
                        <Search style={styles.search} />

                        <TextInput
                            ref={inputref}
                            allowFontScaling={false}
                            style={styles.searchInput}
                            placeholder="Search"
                            placeholderTextColor="#828282"
                            onChangeText={(text) => {
                                settext(text)
                                search(text)
                            }}
                            returnKeyType="done" // Adjusts the keyboard's Enter key label
                            onSubmitEditing={(text) => { globalsearch(text) }}

                        />
                    </Pressable>
                </View>

                <View style={{ flex: 1, height: "100%", minHeight: 500, backgroundColor: "#16181a" }}>


                    <Tab.Navigator
                        //  detachInactiveScreens={true}

                        screenOptions={({ route }) => ({
                            unmountOnBlur: false,

                            // animationEnabled: true,
                            tabBarStyle: {
                                backgroundColor: "#16181a",
                                justifyContent: "space-between",
                                display: "flex",
                                width: "98%",
                                margin: "auto",
                                elevation: 0,
                            },

                            tabBarIndicatorStyle: {
                                backgroundColor: "#00DE62",
                                height: 1,
                            },

                        })}
                    >
                        <Tab.Screen
                            name="Connections"
                            component={NewsletterComponent}
                            options={{
                                lazy: false,
                                unmountOnBlur: false,
                                freezeOnBlur: true,

                                tabBarLabel: ({ focused }) => (
                                    <View>
                                        <Text allowFontScaling={false} style={[
                                            styles.tabbarpill, {
                                                fontSize: 18,
                                                fontFamily: "Alata",
                                                color: focused ? "#00DE62" : "#808080",
                                                borderColor: focused ? "#00DE62" : "#808080",
                                            }
                                        ]}> Newsletter
                                        </Text>
                                    </View>
                                ),

                            }}
                        />

                        <Tab.Screen


                            name="Job"
                            // component={User}
                            children={(props) => <User handleTabChange={handleTabChange} token={token} navigation={navigation} />}


                            options={{
                                lazy: false,
                                unmountOnBlur: false,
                                freezeOnBlur: true,


                                tabBarLabel: ({ focused }) => (
                                    <Text allowFontScaling={false} style={[
                                        styles.tabbarpill, {
                                            fontSize: 18,
                                            fontFamily: "Alata",
                                            color: focused ? "#00DE62" : "#808080",
                                            borderColor: focused ? "#00DE62" : "#808080",
                                        }
                                    ]}> Users
                                    </Text>
                                ),

                            }}

                        />
                    </Tab.Navigator>
                </View>
            </SafeAreaView>
        )
    }
)

export default memo(NewsLetter)

const { width, height } = Dimensions.get("window");

var a = width / 360;
var b = height / 800;
// console.log(a,b);

const scalingfactor = Math.sqrt(a * b)

const styles = StyleSheet.create({
    box: {
        height: "auto",
        borderRadius: 15,
        width: width * 0.7,
        backgroundColor: "#24272A",
        // marginBottom : 20,
        padding: 10,
        minHeight: 242,
        maxHeight: 242,
        marginHorizontal: 6

    },
    box1: {
        height: 110,
        borderRadius: 15,
        width: "98%",
        marginHorizontal: "auto",
        marginVertical: 10,
        backgroundColor: "#24272A",
        // marginBottom : 20,
        padding: 10,
        marginHorizontal: 6,
        display: "flex",
        flexDirection: "row"

    },
    container: {
        // flex: 1,
        height: "100%",
        backgroundColor: "#16181a",
        // backgroundColor: "yellow",
        paddingVertical: 20,
        paddingTop: 10,
        height: 100,
        flexGrow: 1,
        minHeight: 500,
        paddingBottom: 100
    },
    des: {
        fontFamily: "Roboto",
        fontSize: scalingfactor * 14,
        fontWeight: "bold",
        color: "#D9D9D9",
        width: "80%"

    },
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#00DE62",
        marginBottom: 12,
        fontFamily: "myanmar",
        color: "#00DE62",
        paddingLeft: 15
    },
    headline: {
        fontSize: 22,
        fontFamily: "Alata",
        color: "#B8B8B8",
        marginBottom: 15,
        paddingLeft: 15,
        marginVertical: 10
    },
    image: {
        // margin: "auto",
        borderRadius: 12,
        alignSelf: "center",
        width: "102%",
        overflow: "hidden",

        marginBottom: 15,
        height: 140,
        objectFit: "cover",
        maxHeight: 140,
    },
    image1: {
        borderRadius: 12,
        alignSelf: "center",
        width: "99%",
        overflow: "hidden",
        marginBottom: 15,
        height: 140,
        objectFit: "cover",

        maxHeight: "98%",

    },
    text: {
        fontSize: 13,
        fontFamily: "Roboto",
        color: "#B8B8B8",
        lineHeight: 16,
        width: "90%"
    },
    scroll: {
        // paddingTop : 60,
        minHeight: 260,
        padding: 20,
        paddingTop: 0,
        paddingLeft: 5,
        // overflow : "scroll",
        width: width * 0.95,
        // margin : "auto",
        backgroundColor: "#16181A",

    },
    scroll1: {

        padding: 20,
        paddingTop: 0,
        paddingLeft: 5,
        width: "99%",
        // height : "auto",
        margin: "auto",
        // flexGrow : 1,
        backgroundColor: "#16181A",

    },
    topimage: {
        width: 25,
        height: 25,
        borderRadius: 50
    },
    topu1: {
        fontFamily: "Alata",
        color: "#E9E9E9",
        fontSize: 14,
        marginLeft: 5,
        // marginTop : -2
    },
    topu2: {
        fontFamily: "Roboto",
        color: "#00DE62",
        fontSize: 11,
        alignSelf: "center",
        justifyContent: "center",
        textAlignVertical: "center",
        marginLeft: 5

    },
    time: {
        fontFamily: "Roboto",
        color: "#828282",
        fontSize: 8,
        alignSelf: "center",
        marginLeft: 5,
        width: 50,
        // backgroundColor : "red"
    },
    circle: {
        width: 5,
        height: 5,
        backgroundColor: "#B8B8B8",
        borderRadius: 50,
        alignSelf: "center",
        marginLeft: 5
    },
    // searchContainer: {
    //     marginHorizontal: 12,
    //     marginBottom: 10,
    // },
    // searchInput: {
    //     // height: 40,
    //     borderColor: "#828282",
    //     borderWidth: 1,
    //     borderRadius: 30,
    //     paddingHorizontal: 15,
    //     color: "#828282",
    //     fontFamily: "Roboto",
    //     fontSize: 18,
    // },

    searchContainer: {
        marginHorizontal: 20,
        marginBottom: 5,
        width: "94%",
        marginHorizontal: "auto"
    },
    searchInput: {
        height: 50,
        borderColor: "#828282",
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 15,
        color: "#828282",
        fontFamily: "Roboto",
        fontSize: 18,
    },
    divider: {
        width: width,
        height: 3,
        marginTop: 5,
        backgroundColor: "#24272A"
    },
    search: {
        position: "absolute",
        right: 15,
        top: 12,
        alignSelf: "center",
    },
    bottominfo: {
        display: "flex",
        flexDirection: "row",
        // justifyContent : "center",
        alignContent: "center",
        // justifyContent : "flex-end",
        // marginTop: 20,
        position: "absolute",
        bottom: 10,
        left: 10,
        marginBottom: 0,
        textAlignVertical: "center",
    },
    bottominfo1: {
        display: "flex",
        flexDirection: "row",
        // justifyContent : "center",
        alignContent: "flex-start",
        // alignSelf : "flex-end",
        justifyContent: "flex-start",
        marginTop: 10,
        textAlignVertical: "center",
        // marginBottom : 0,
        // bottom : -10,
        // backgroundColor: "red",
        width: "90%",
        // flexWrap : "wrap"


    },
    left: {
        width: "70%",
        justifyContent: "space-between"
    },
    right: {
        width: "30%"

    },
    skeletonWrapper: {
        padding: 10,
        backgroundColor: '#24272A',
        marginHorizontal: 6,
        borderRadius: 15,
        marginBottom: 15,
    },

    suggestionbox: {
        // width: "100%",
        flex: 1,
        // height: 320,
        height: "auto",
        maxHeight: height,
        backgroundColor: "transparent",
        // position: "absolute",
        paddingTop: 10,


        // top: 135,
        // elevation: 100,
        // zIndex: 1000
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
        // borderBottomWidth: 1,
        borderRadius: 20,
        // backgroundColor: "#24272A",
        width: "99%",
        borderBottomWidth: 1,
        borderBottomColor: "#333",
        marginVertical: 5,
        paddingBottom: 10,
        paddingTop: 5,
        paddingHorizontal: 20,
        marginHorizontal: "auto"
    },
    avatar: {
        width: 50,
        height: 52,
        paddingTop: 15,
        borderRadius: 25,
        marginRight: 15,
        marginTop: 0,
    },
    textContainer: {
        flex: 1,
        alignSelf: "flex-start",
    },
    username: {
        fontSize: 18,
        width: "90%",

        // backgroundColor : "red",
        color: "#B8B8B8",
        fontFamily: "Alata",
        alignSelf: "flex-start",
        marginTop: 0,
        marginBottom: 0
    },
    message: {
        fontSize: 12,
        color: "#B8B8B8",
        color: "#00DE62",
        marginTop: 1,
    },

    sendbtn1: {
        backgroundColor: "#16181a",
        borderWidth: 2,
        borderColor: "#ccc",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        width: 120,


    },

    sendbtnText1: {
        fontSize: 14,
        color: "#ccc",
        fontFamily: "Alata",
        textAlign: "center"

    },

    sendbtn: {
        backgroundColor: "#ccc",
        paddingHorizontal: 18,
        paddingVertical: 6,
        borderRadius: 8,
        verticalAlign: "top",
        // marginTop: -20,
        borderWidth: 2,
        width: 120,
        borderColor: "#ccc",

    },

    sendbtnText: {
        fontSize: 14,
        color: "#333",
        fontFamily: "Alata",
        textAlign: "center",


    },

})