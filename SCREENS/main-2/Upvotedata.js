
import { useFocusEffect, useNavigation } from "expo-router";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Text, View, Image, Modal, TouchableWithoutFeedback, Animated, FlatList, TouchableOpacity, StyleSheet, RefreshControl, Dimensions, ScrollView, Pressable, Vibration } from "react-native";
import { url } from "../../config.js"
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { jwtDecode } from "jwt-decode";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Skeleton } from 'moti/skeleton';
import styles1 from '@/styles/Alert2.js';


import { LinearGradient } from "expo-linear-gradient";





function Upvotedata({ token }) {




    const navigation = useNavigation()


    const [refreshing, setRefreshing] = useState(false)
    const [data, setdata] = useState([])
    const [suggestion, setsuggestion] = useState([])
    const [normal, setnormal] = useState([])
    const [subNotification, setSubNotification] = useState([])
    const [loading, setloading] = useState(true)
    const [skeleton, setskeletonloading] = useState(false)
    const [statistic, setstatistic] = useState({
        totalUpvotes: 0,
        upvotesPerDay: 0,
        investorUpvotes: 0

    })


    const [visible, setVisible] = useState(false)
    const [entirecontent, setentirecontent] = useState("")
    const [length, setLength] = useState("0")

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



        return (
            <Modal transparent visible={visible} animationType="none" onRequestClose={() => onClose?.()}>
                <TouchableWithoutFeedback onPress={() => onClose?.()}>
                    <Animated.View style={[styles1.overlay, { opacity: fadeAnim }]}>
                        <TouchableWithoutFeedback>
                            <View style={styles1.alertBox}>
                                <Text style={styles1.title}>Suggestion</Text>
                                <Text style={styles1.message}>{entirecontent}</Text>

                                <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>


                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    };




  

    useEffect(() => {
        getData1()
    }, [])






    async function getData1() {
        try {
            setskeletonloading(true)
            const response = await fetch(
                `${url}notification/getUserNotifiation`,
                {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const result = await response.json();
            console.log(result);
            

            if (response.status == 404) {
                setLength(result.pendingRequest);
            }



            else if (response.status != 404) {
                var suggestionArray = result.data.filter((e) => e.notificationType == "suggestion")
                setsuggestion([...suggestionArray.reverse()])

                var normalArray = result.data.filter((e) => e.notificationType != "suggestion")
                normalArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

                setnormal(normalArray)
                var array = result.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                setSubNotification(array);
     
            }
            setLength(result.pendingRequest)



        } catch (err) {
            console.log(err);
        }
        finally {
            setskeletonloading(false)
            setloading(false);
        }
    }



    function rendersub({ item }) {


        if (item.sendingUserId == null) return

        async function sendmessage() {


            var message = item.sendingUserId._id
            var jobrole = item.appliedJobRole;

            try {
                const response = await fetch(`${url}chats/addToChatDirectly/${message}`, {
                    method: 'POST',
                    body: "",
                    headers: {
                        accept: "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
                const data = await response.json();
            }
            catch (err) {

            }


            var first = {
                user: {
                    _id: item.sendingUserId._id,
                    profilePhoto: item.sendingUserId?.profilePhoto,
                    userName: item.sendingUserId.userName
                }

            }

            var extra = {
                status: true,
                jobrole

            }



            navigation.navigate("Chat", { item: first, messages: [], token, navigation, extra });

        }


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
        const Spacer = ({ height = 16 }) => <View style={{ height }} />;



        if (item.notificationType == "suggestion") {
            return (
                <TouchableOpacity onPress={() => {
                    setVisible(true)
                    setentirecontent(item.notificationMessage)
                    Vibration.vibrate(10)
                }}>
                    <LinearGradient
                        colors={["rgba(33, 34, 35, 0.4)", "rgba(25, 26, 27, 0.6)"]}
                        locations={[0, 1]}
                        style={{
                            backgroundColor: "#24272A",
                            borderRadius: 20,
                            height: "auto",
                            maxHeight: 300,
                            minHeight: 100,
                            marginHorizontal: 10,
                            marginVertical: 10,
                            paddingHorizontal: 10,
                            paddingBottom: 10
                        }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }} >

                        <View style={styles.left}>
                            <Pressable
                                style={{ paddingTop: 10 }}
                            // onPress={() => { navigation.navigate("Singleuserpage", { token: token, id: item.sendingUserId._id, page: "bell" }) }}

                            >
                                {item.sendingUserId?.profilePhoto && <Image style={styles.topimage101} source={{ uri: item.sendingUserId?.profilePhoto }} />}
                                {!item.sendingUserId?.profilePhoto && <Image style={styles.topimage101} source={require("../../assets/images/p2.png")} />}


                            </Pressable>
                            <View style={styles.bottominfo101}>
                                <View style={{ display: "flex", flexDirection: "row" }}>

                                    <Pressable


                                    >
                                        <View style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
                                            <Text style={styles.topu101}>

                                                Investor
                                            </Text>
                                            <View style={styles.circle1}></View>
                                            <Text
                                                numberOfLines={1}
                                                style={{
                                                    fontSize: 8, fontFamily: "Alata",
                                                    color: "#E9E9E9",
                                                    fontSize: 10,
                                                    marginTop: 8,
                                                    marginLeft: 10,
                                                }}
                                            >
                                                {time(item.timestamp)}

                                            </Text>
                                        </View>
                                    </Pressable>
                                </View>



                            </View>
                        </View>

                        <View style={styles.right}>
                            {item.notificationType == "upvotePost"}
                            {item.notificationType == "upvoteProfile"}
                            {item.notificationType == "jobApplied" &&
                                <Pressable onPress={sendmessage} style={{ top: 16, right: 0 }}>
                                    <MaterialCommunityIcons name="message-text-outline" size={34} color={"#00DE62"} />
                                </Pressable>
                            }
                            {item.notificationType == "joinCommunity"}
                            {/* {item.notificationType == "upvotePost" && item.postId?.type == "blogPost" && <B2 width={40} height={40} />} */}
                            {item.notificationType == "upvotePost" && item.postId?.type == "photo" &&
                                <Image style={styles.image1} source={{ uri: item.postId.mediaUrl }} />
                            }
                            {item.notificationType == "commentPost" && <Image style={styles.image1} source={{ uri: item.postId.mediaUrl }} />}

                        </View>
                        <Text
                            numberOfLines={2}
                            // fontSize={12}
                            // mode={ResizeTextMode.max_lines}
                            ellipsizeMode='tail'
                            style={[styles.sub2, { width: "auto", maxWidth: 250 }]}>
                            {item.notificationMessage}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            );
        }


        else {
            return (
                <LinearGradient
                    colors={["rgba(33, 34, 35, 0.4)", "rgba(25, 26, 27, 0.6)"]}
                    locations={[0, 1]}
                    style={styles.box1}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }} >
                    <View style={styles.left}>


                        <Pressable
                            style={{ paddingTop: 10 }}
                        // onPress={() => {
                        //     navigation.navigate("Singleuserpage", { token: token, id: item.sendingUserId._id, page: "bell" })
                        // }}

                        >
                            {item.sendingUserId?.profilePhoto && <Image style={styles.topimage} source={{ uri: item.sendingUserId.profilePhoto }} />}
                            {!item.sendingUserId?.profilePhoto && <Image style={styles.topimage} source={require("../../assets/images/p2.png")} />}

                        </Pressable>
                        <View style={styles.bottominfo1}>
                            <View style={{ display: "flex", flexDirection: "row" }}>

                                <Pressable
                                    onPress={() => { 
                                        if(decode.role == "Investor" && item.sendingUserId.role != "Investor")return
                                        navigation.navigate("Singleuserpage", { token: token, id: item.sendingUserId._id, page: "bell" }) 
                                    }}

                                >
                                    <Text style={styles.topu1}>{item.sendingUserId.userName} <Text style={styles.topu2}>{item.sendingUserId.role == "CommunityMember" ? "Member" : item.sendingUserId.role}</Text> <View style={styles.circle}></View> <AutoSizeText
                                        numberOfLines={1}
                                        fontSize={11}
                                        mode={ResizeTextMode.max_lines}
                                        ellipsizeMode='tail'
                                        style={styles.time}>{time(item.timestamp)}
                                    </AutoSizeText>

                                    </Text>
                                </Pressable>
                                {/* <Text style={styles.time}>{time(item.taggedUser.createdAt)}</Text> */}


                            </View>
                            {/* <Text style={styles.sub2}>{item.notificationMessage}</Text> */}
                            <Text
                                numberOfLines={1}
                                fontSize={12}
                                // mode={ResizeTextMode.max_lines}
                                // ellipsizeMode='tail'
                                style={[styles.sub2, { fontSize: 12, marginLeft: 10 }]}>{item.notificationMessage}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.right}>
                        {item.notificationType == "upvotePost"}
                        {item.notificationType == "upvoteProfile"}
                        {item.notificationType == "jobApplied" &&
                            <Pressable onPress={sendmessage} style={{ top: 20, right: 10 }}>
                                {/* <MaterialCommunityIcons name="message-text-outline" size={34} color={"#00DE62"} /> */}
                                <FontAwesome6 name="user-tie" size={24} color="#ccc" />
                            </Pressable>
                        }
                        {item.notificationType == "joinCommunity"}
                        {/* {item.notificationType == "upvotePost" && item.postId?.type == "blogPost" && <B2 width={40} height={40} />} */}
                        {item.notificationType == "upvotePost" && item.postId?.type == "photo" &&

                            <TouchableOpacity onPress={() => {
                                navigation.navigate("ViewSendedPost", { id: item.postId._id })
                            }}>
                                <Image style={styles.image1} source={{ uri: item.postId.mediaUrl }} />
                            </TouchableOpacity>

                        }
                        {item.notificationType == "commentPost" &&

                            <TouchableOpacity onPress={() => {
                                navigation.navigate("ViewSendedPost", { id: item.postId._id })
                            }}>

                                <Image style={styles.image1} source={{ uri: item.postId?.mediaUrl }}
                                />

                            </TouchableOpacity>}



                    </View>
                </LinearGradient>
                // </TouchableOpacity>


            )

        }

    }


    function top100() {



        // if (decode.role == "CommunityMember") {
        //     return (
        //         <Pressable style={styles.Jobbtn} onPress={() => {
        //             navigation.navigate('AllRequests', {
        //                 token: token, navigation: navigation
        //             })
        //         }
        //         }>
        //             <Text style={styles.jobbtntext}><Text style={{ color: "#00de62", borderColor: "red", borderWidth: 1 }}>{length}</Text>   Connection Requests</Text>

        //         </Pressable>
        //     )
        // }
        // if (suggestion && suggestion.length == 0) {
        //     return (
        //         <Pressable style={[styles.Jobbtn, { marginBottom: -10 }]} onPress={() => {
        //             navigation.navigate('AllRequests', {
        //                 token: token, navigation: navigation
        //             })
        //         }


        //         }>
        //             <Text style={styles.jobbtntext}><Text style={{ color: "#00de62", borderWidth: 1 }}>{length}</Text>  Connection Requests </Text>

        //         </Pressable>
        //     )
        // }
        return (
            <>


                {/* <Pressable style={[styles.Jobbtn, { marginBottom: 10 }]} onPress={() => {
                    navigation.navigate('AllRequests', {
                        token: token, navigation: navigation
                    })
                }

                }>
                    <Text style={styles.jobbtntext}><Text style={{ color: "#00de62", borderColor: "red", borderWidth: 1 }}>{length}</Text>  Connection Requests  </Text>

                </Pressable> */}

                <View style={styles.divider}></View>
                {decode.role != "Investor" && <Text style={styles.t11}>Investor Suggestions</Text>}
                <FlatList
                    horizontal={true}
                    style={{ display: "flex", flexDirection: "row", gap: 10 }}
                    data={suggestion}
                    renderItem={rendersub}
                // renderItem={() => <Text style={{ fontSize: 100 }}>okkk</Text>}
                />
                {decode.role != "Investor" && <View style={[styles.divider, { marginBottom: -10 }]}></View>}





                {skeleton && <View style={styles.listItem1}>

                    {[1, 2, 3, 4, 5, 6, 7, 8 , 9 , 10].map(e =>

                        <View style={{ display: "flex", flexDirection: "row", gap: 5, marginBottom: 20 }}>
                            <Skeleton
                                // colorMode="dark"
                                width={50}
                                colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

                                // backgroundColor="red" // Changed to red

                                height={50}
                                radius={"round"}
                                // backgroundColor="black"
                                highlightColor="#000"  // Set highlight color
                            />
                            {/* <Spacer height={8} /> */}
                            <View style={{ justifyContent: "center" }}>
                                <Skeleton
                                    colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

                                    colorMode="dark"
                                    width={'87%'}
                                    height={12}
                                    highlightColor="#333"  // Set highlight color
                                />
                                <Spacer height={8} />

                                <Skeleton
                                    colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

                                    colorMode="dark"
                                    width={'80%'}
                                    height={12}
                                    highlightColor="#333"  // Set highlight color
                                />
                            </View>



                        </View>

                    )}
                </View>}
            </>
        )
    }
    var decode;


    // useEffect(()=>{
    //     nor
    // },[])

    function Suggestions() {

        decode = jwtDecode(token)

        return (
            <FlatList
                // contentContainerStyle={{ height: 300, backgroundColor: "red" }}
                data={null}
                renderItem={() => null}
                ListHeaderComponent={top100}
                style={{ marginBottom: 20 }}
            />
        )
    }

    const emptyListText = () => {
        return (
            <>
                {
                    (suggestion.length == 0 && normal.length == 0) ?
                        <View style={[styles.emptyListContainer]}>
                            <Pressable style={styles.Jobbtn} onPress={() => {
                                navigation.navigate('AllRequests', {
                                    token: token, navigation: navigation
                                })
                            }
                            }>
                                <Text style={styles.jobbtntext}><Text style={{ color: "#00de62", borderColor: "red", borderWidth: 1 }}>{length}</Text>   Connection Requests</Text>

                            </Pressable>
                            <Text style={[styles.emptyListText, {}]}>No new notifications</Text>
                        </View>
                        :
                        (suggestion.length != 0 && normal.length == 0) ?
                            <View>
                                <Pressable style={styles.Jobbtn} onPress={() => {
                                    navigation.navigate('AllRequests', {
                                        token: token, navigation: navigation
                                    })
                                }
                                }>
                                    <Text style={styles.jobbtntext}><Text style={{ color: "#00de62", borderColor: "red", borderWidth: 1 }}>{length}</Text>   Connection Requests</Text>

                                </Pressable>
                                <Suggestions />




                                <View style={[styles.emptyListContainer]}>
                                    <Text style={[styles.emptyListText, { paddingTop: 150 }]}>No new notifications</Text>
                                </View>
                            </View>
                            :
                            <>

                                <Pressable style={styles.Jobbtn} onPress={() => {
                                    navigation.navigate('AllRequests', {
                                        token: token, navigation: navigation
                                    })
                                }
                                }>
                                    <Text style={styles.jobbtntext}><Text style={{ color: "#00de62", borderColor: "red", borderWidth: 1 }}>{length}</Text>   Connection Requests</Text>

                                </Pressable>
                                <Suggestions />


                            </>

                }

            </>
        )
    }






    const Spacer = ({ height = 16 }) => <View style={{ height }} />;


    return (
        <View style={{ flex: 1, backgroundColor: "#16181a" }}>


            <CustomAlert visible={visible} onClose={() => setVisible(false)} />






            {/* {normal.length == 0 && <Text>no new notification found</Text>} */}
            <FlatList
                // style={{marginTop : 300}}
                // style={{flex:1 , height : 100}}
                ListHeaderComponent={emptyListText}
                scrollEnabled={true}
                refreshControl={<RefreshControl progressViewOffset={0} refreshing={refreshing}
                    progressBackgroundColor="#16181a"
                    colors={['#00de62']}
                    onRefresh={() => {
                        setRefreshing(true)
                        Vibration.vibrate(200)
                        getData1()
                        setTimeout(() => {
                            setRefreshing(false);
                        }, 2000);
                    }} />}

                // ListHeaderComponent={top3data}
                data={normal}
                // rendersub
                renderItem={rendersub}
                contentContainerStyle={{ paddingBottom: 100, elevation: 0, backgroundColor: "#16181a", marginTop: 10 }}

            />



        </View>

    )
}


export default Upvotedata





const { height, width } = Dimensions.get("window");
var a = width / 360;
var b = height / 800;

const scalingfactor = Math.sqrt(a * b)







const styles = StyleSheet.create({


    Jobbtn: {
        backgroundColor: "#16181a",
        borderRadius: 30,
        margin: "auto",
        width: "93%",
        paddingHorizontal: 10,
        // height: 40,
        // paddingVertical: 10,
        marginBottom: 8,
        paddingTop: 8,
        paddingBottom: 8,
        marginTop: 0,
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        justifyContent: "flex-start",
    },
    jobbtntext: {
        textAlign: "center",
        color: "#ccc",
        fontFamily: "Alata",
        fontSize: 18,
        verticalAlign: "top",
        paddingBottom: 5,
    },
    card: {
        backgroundColor: '#1a1a1a',
        borderRadius: 20,
        padding: 16,
        margin: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    role: {
        fontSize: 24,
        color: '#E9E9E9',
        flex: 1,
        fontFamily: "Alata"
    },
    date: {
        fontSize: 12,
        color: '#B8B8B8',
        fontFamily: "Roboto"
    },
    name: {
        fontSize: 32,
        color: '#B8B8B8',
        // fontWeight: 'bold',
        marginBottom: 8,
        fontFamily: "Alata"
    },
    info: {
        fontSize: 16,
        color: '#D9D9D9',
        marginBottom: 4,
        fontFamily: "Roboto"
    },
    info1: {
        fontSize: 16,
        color: '#00DE62',
        marginBottom: 4,
        fontFamily: "Roboto"
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 30,
        marginTop: 16,
    },
    buttonAccept: {
        backgroundColor: 'transparent',
        borderRadius: 30,
        paddingVertical: 0,
        paddingHorizontal: 20,
        height: 41,
        width: 117,
        borderWidth: 2,
        borderColor: "#B8B8B8",
        justifyContent: "center",
        alignItems: "center",

    },
    buttonReject: {
        backgroundColor: '#ff0000',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        fontSize: 18,
        color: '#00DE62',
        // fontWeight: 'bold',
        fontFamily: "Alata",
        textAlign: "center",
        textAlignVertical: "center",
        marginTop: -5
    },
    divider: {
        width: width,
        height: 1,
        marginTop: 5,
        // marginBottom:10,
        backgroundColor: "#24272A"
    },
    tabbarpill: {
        borderWidth: 1,
        borderRadius: 30,
        textAlign: "center",
        textAlignVertical: "center",
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        width: width * 0.44,
        fontFamily: "Alata",
        fontSize: 20,
        textAlign: "center",
        textAlignVertical: "center",
        textTransform: "capitalize",
        borderWidth: 2,
        borderRadius: 30,
        paddingLeft: 20,

        marginTop: -1

    },
    container1: {
        display: "flex",
        width: "100%",
        marginVertical: 20,
        marginHorizontal: "auto",
        // backgroundColor : "red",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    textbox: {
        alignSelf: "center",
        justifyContent: "center"
    },
    t1: {
        fontFamily: "Roboto",
        color: "#00DE62",
        fontSize: 40
    },
    t2: {
        fontFamily: "Roboto",
        color: "#B8B8B8",
        fontSize: 12,
        textAlign: "center",
        alignSelf: "center",
        justifyContent: "flex-end",
    },
    headerText: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#00DE62",
        // marginBottom: 20,
        color: "#00DE62",
        fontFamily: "myanmar",
        paddingHorizontal: 20,
        marginVertical: 12

    },
    box1: {
        height: 70,
        borderRadius: 15,
        width: "97%",
        marginHorizontal: "auto",
        marginVertical: 7,
        backgroundColor: "#24272A",
        // marginBottom : 20,
        paddingHorizontal: 10,
        marginHorizontal: "auto",
        display: "flex",
        flexDirection: "row",
        zIndex: 0,
        elevation: 0


    },
    box2: {
        height: 70,
        borderRadius: 15,
        width: "70%",
        // marginHorizontal: "auto",
        marginVertical: 7,
        backgroundColor: "#24272A",
        // backgroundColor: "red",
        // marginBottom : 20,
        paddingHorizontal: 10,
        // marginHorizontal: 6,
        display: "flex",
        // marginLeft : ,
        flexDirection: "row",
        zIndex: 0,
        elevation: 0


    },
    left: {
        width: "90%",
        // justifyContent: "space-between",
        display: "flex",
        flexDirection: "row"
    },
    listItem1: {
        padding: 10,
        paddingTop: 20,
        marginTop: 10
    },
    text: {
        fontSize: 12,
        fontFamily: "Roboto",
        color: "#B8B8B8",
        lineHeight: 16,
        width: "90%"
    },
    bottominfo1: {
        display: "flex",
        flexDirection: "row",
        // justifyContent : "center",
        alignContent: "flex-start",
        // alignSelf : "flex-end",
        justifyContent: "flex-start",
        marginTop: 5,
        textAlignVertical: "center",
        // marginBottom : 0,
        // bottom : -10,
        // backgroundColor: "red",
        // width: "100%",
        // flexWrap : "wrap",
        display: "flex",
        flexDirection: "column",


    },
    bottominfo101: {
        display: "flex",
        flexDirection: "row",
        // justifyContent : "center",
        alignContent: "flex-start",
        // alignSelf : "flex-end",
        justifyContent: "flex-start",
        marginTop: -2,
        textAlignVertical: "center",
        // marginBottom : 0,
        // bottom : -10,
        // backgroundColor: "red",
        // width: "100%",
        // flexWrap : "wrap",
        display: "flex",
        flexDirection: "column",


    },
    des: {
        fontFamily: "Roboto",
        fontSize: scalingfactor * 12,
        fontWeight: "bold",
        color: "#D9D9D9",
        width: "80%"

    },

    topimage: {
        width: 40,
        height: 40,
        borderRadius: 50,
        // marginVertical : "auto",
        paddingTop: 4,
        alignSelf: "center",
        justifyContent: "center",
    },
    topimage101: {
        width: 25,
        height: 25,
        borderRadius: 50,
        alignSelf: "center",
        justifyContent: "center",
    },
    topu1: {
        fontFamily: "Alata",
        color: "#E9E9E9",
        fontSize: 18,
        marginLeft: 10,
        // backgroundColor : "red",
        // maxWidth : width * 0.8
        // marginTop : -2,
        // alignSelf: "center",


    },
    topu101: {
        fontFamily: "Alata",
        color: "#E9E9E9",
        fontSize: 16,
        marginLeft: 10,
        // backgroundColor : "red",
        // maxWidth : width * 0.8
        // marginTop : -2,
        // alignSelf: "center",


    },
    topu2: {
        fontFamily: "Roboto",
        color: "#00DE62",
        fontSize: 11,
        // alignSelf: "center",
        // justifyContent: "center",
        // textAlignVertical: "center",
        marginLeft: 5

    },

    time: {
        fontFamily: "Roboto",
        color: "#828282",
        fontSize: 10,
        // alignSelf: "center",
        marginLeft: 30,
        paddingLeft: 30,
        width: 40,
        // backgroundColor : "red"
    },
    circle: {
        width: 5,
        height: 5,
        backgroundColor: "#B8B8B8",
        borderRadius: 50,
        // alignSelf: "flex-start",
        marginLeft: 5,
        marginTop: 5
    },
    circle1: {
        width: 5,
        height: 5,
        backgroundColor: "#B8B8B8",
        borderRadius: 50,
        // alignSelf: "flex-start",
        marginLeft: 10,
        marginTop: 15
    },
    right: {
        width: "10%",
        // backgroundColor : "red",
        justifyContent: "flex-center",
        alignItems: "flex-end",
        alignContent: "flex-end"

    },
    image1: {
        borderRadius: 6,
        alignSelf: "center",
        justifyContent: "center",
        alignSelf: "center",
        width: 30,
        height: 30,
        aspectRatio: 1 / 1,
        overflow: "hidden",
        marginTop: 20,

        objectFit: "cover",
        maxHeight: "90%",

    },

    sub2: {
        fontSize: 16,
        // paddingLeft: 10,
        marginTop: 5,
        // width : "30%",
        color: "#bbbbbb",
        // fontFamily: "Roboto",
        // backgroundColor : "red"
    },
    noSuggestion: {
        textAlign: "center",
        color: "#B8B8B8",
        // fontFamily: "Roboto",
        fontSize: 22,
        margin: "auto",
        marginVertical: 20,
        justifyContent: "center",
        alignSelf: "center",
    },
    t11: {
        textAlign: "left",
        color: "#B8B8B8",
        fontFamily: "Alata",
        fontSize: 22,
        paddingLeft: 20,
        // margin: "auto",
        marginVertical: 10,
        marginTop: 5,
        marginBottom: 5,
        // justifyContent: "center",
        // alignSelf: "center",
    },
    emptyListContainer: {

        flex: 1,
        // height:height,


    },
    emptyListText: {
        textAlign: "center",
        color: "#666",
        alignSelf: "center",
        justifyContent: "center",
        // position : "absolute",
        elevation: 100,
        bottom: 0,
        // fontFamily: "Roboto",
        fontSize: 16,
        paddingTop: 300,

    }

});