import React, { useEffect, useState, useContext, useCallback } from "react";
import { View, Text, StyleSheet, TextInput, Keyboard, FlatList, Image, RefreshControl, Dimensions, TouchableOpacity, Vibration } from "react-native";
import { useFocusEffect, useNavigation } from "expo-router";

import { url } from "../../config.js"


import { jwtDecode } from "jwt-decode";
import { Skeleton } from 'moti/skeleton';
import { MotiView } from 'moti';


// const data1 = Array(5).fill({
//     user: {
//         userName: "raz.shhh",
//         message: "text...",
//         time: "Today",
//         profilePhoto: "https://res.cloudinary.com/dldbd8zhs/image/upload/v1734618122/wn6f65kia1xlzsn8ygnd.jpg"
//     }// Replace with your image path
// });








const ConnectionsScreen = ({ search, token, setk, inputref }) => {



    const navigation = useNavigation()
    const [skeleton, setskeletonloading] = useState(false)

    const [filtereddata, setfiltereddata] = useState([])
    const [loggedinuserid, setLoggedInUserId] = useState([])

    useEffect(() => {

        if (data && data.length > 0) {
            setfiltereddata(data.filter(item =>
                search === "" || item.user.userName.toLowerCase().startsWith(search.toLowerCase())
            ))
        }
    }, [search, data])
    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
        if (token) {
            var decode = jwtDecode(token)
        
            setLoggedInUserId(decode._id)
        }
    }, [token])









    const [data, setData] = useState(null)
    const [loading, setloading] = useState(false)

    useFocusEffect(
        useCallback(() => {
            fetchData()
        }, [])
    )

    const fetchData = async () => {
        var route = ""
        const decoded = jwtDecode(token);



        if (decoded.role == "Founder") {
            route = "founder/getFounderChatUserList"
        }
        else if (decoded.role == "Investor") {
            route = "investor/getInvestorChatUserList"
        }
        else {
            // console.log("fuck");

            route = "founder/getFounderChatUserList"

        }

   


        setloading(true); // Start loading before fetching data
        if (token) {
            try {
                setskeletonloading(true)
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

                if (decoded.role == "Founder") {
                    var rec1 = result.filter(e => e.user.role != "Investor")
                }
                else {
                    var rec1 = result
                }




                const uniqueData = rec1.filter((item, index, self) =>
                    self.findIndex(innerItem => innerItem.user.userName === item.user.userName) === index
                );


                const sortedData = uniqueData.sort((a, b) => {
                    if (a.lastMessage === null && b.lastMessage === null) return 0;
                    if (a.lastMessage === null) return 1;
                    if (b.lastMessage === null) return -1;

                    const dateA = new Date(a.lastMessage.createdAt);
                    const dateB = new Date(b.lastMessage.createdAt);
                    return dateB - dateA; // Sort in descending order of time
                });

                // console.log(sortedData);



                if (response.status === 200) {
                    setData(sortedData)
                    setfiltereddata(sortedData)
                }
            } catch (err) {
                console.log(err);
            } finally {
                setskeletonloading(false)
                setloading(false); // Set loading to false when done
            }
        }
    };


    useEffect(() => {

        fetchData();


    }, [])





    function gotochatscreen(item) {


        const id = item.user._id;

        async function getData() {
            try {
           

                const response = await fetch(
                    `${url}chats/getMessage/individual/${id}`,
                    {
                        method: "GET",
                        headers: {
                            accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const result = await response.json();






                navigation.push("Chat", { item, messages: result.data?.messages || [], token, navigation, photo1: result.senderProfilePhoto, photo2: result.recieverProfilePhoto, tabnavigation: navigation });
            


            } catch (err) {
                console.log(err, "eror");
            }
            finally {
            }
        }
        getData();
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

    return (
        <View style={styles.listContainer}>

            {filtereddata && !skeleton && <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}

                ListHeaderComponent={
                    <>

                        {
                            filtereddata.length == 0 ?
                                <View style={styles.emptyListContainer}>
                                    <Text style={[{ color: 'gray' }, styles.emptyListText]}>No conversations yet</Text>
                                </View>
                                : null
                        }


                    </>
                }
                data={filtereddata}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={<RefreshControl refreshing={refreshing}
                    progressBackgroundColor="#16181a"
                    colors={['#00de62']}
                    onRefresh={() => {
                        Vibration.vibrate(200)
                        fetchData()
                    }}

                />}
                renderItem={({ item }) => {
                    // console.log(item.lastMessage, "ooo");


                    return (
                        <TouchableOpacity onPress={() => {
                            gotochatscreen(item)
                        }}>
                            <View style={styles.listItem}>
                                <Image
                                    source={{ uri: item.user.profilePhoto || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8slgZXgqnSIXDS8wF2uDT_SmsYlBe-W1soQ&s" }}
                                    style={styles.avatar} />
                                <View style={styles.textContainer}>
                                    <Text numberOfLines={1}
                                        ellipsizeMode="tail" allowFontScaling={false} style={styles.username}>{item.user.userName}</Text>


                                    {item.lastMessage && typeof item.lastMessage.message == "string" &&
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            allowFontScaling={false}
                                            style={!item.lastMessage.isRead && item.lastMessage.senderId != loggedinuserid ? styles.bold : styles.message}>
                                            {item.lastMessage?.message || "No chats yet"}
                                        </Text>
                                    }
                                    {item.lastMessage == null && <Text
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                        allowFontScaling={false}
                                        style={styles.message}>
                                        No chats yet
                                    </Text>}


                                    {item.lastMessage && typeof item.lastMessage.message == "object" &&
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            allowFontScaling={false} style={styles.message}>Shared a post</Text>
                                    }
                                </View>
                                <Text
                                    allowFontScaling={false}
                                    style={item.lastMessage && !item.lastMessage.isRead && item.lastMessage.senderId != loggedinuserid ? styles.boldtime : styles.time}>
                                    {item.lastMessage ? time(item.lastMessage.createdAt) : "today"}</Text>

                                {item.lastMessage && item.lastMessage.isRead == false && item.lastMessage.senderId != loggedinuserid && <Text style={{ marginTop: 25, marginRight: 10, width: 8, height: 8, backgroundColor: "#00de62", borderRadius: 30 }}></Text>}
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />}

            {skeleton && <View style={styles.listItem1}>

                {[1, 2, 3, 4, 5, 6, 7, 8].map(e =>

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



        </View>
    )
}
const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;
const scalingfactor = Math.sqrt(a * b)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#16181a",
    },
    c1: {
        flex: 1,
        backgroundColor: "#16181a",
    },
    header: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#00DE62",
        marginVertical: 20,
        marginLeft: 20,
        fontFamily: "myanmar",
    },
    searchContainer: {
        marginHorizontal: 20,
        marginBottom: 10,
    },
    searchInput: {
        height: 50,
        borderColor: "#00DE62",
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 15,
        color: "#828282",
        fontFamily: "Roboto",
        fontSize: 18,
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#16181a",
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        // borderBottomWidth: 1,
        marginBottom: 2,
        borderBottomColor: "#333",
        alignSelf: "flex-start",
        width: "100%"
    },
    listItem1: {
        // flexDirection: "row",
        alignItems: "center",
        // paddingVertical: 10,
        // borderBottomWidth: 1,
        marginBottom: 2,
        borderBottomColor: "#333",
        alignSelf: "flex-start",
        width: "100%"
    },
    avatar: {
        width: 45,
        height: 45,
        marginTop: 5,

        borderRadius: 25,
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
        alignSelf: "flex-start",
        // backgroundColor : "red",
        // width : 100
    },
    // username: {
    //     fontSize: 18,
    //     color: "#00DE62",
    //     fontFamily: "Alata",
    //     alignSelf: "flex-start",
    //     marginTop: -5,
    //     marginBottom: 5
    // },
    message: {
        fontSize: 14,
        color: "gray",
        marginTop: -3,
        fontFamily: 'Roboto',
        paddingRight: 60
    },
    bold: {
        fontSize: 14,
        color: "white",
        fontWeight: "bold",
        marginTop: -3,
    },
    time: {
        fontSize: 11,
        width: 100,
        position: "absolute",
        right: 0,
        top: 15,
        textAlign: "right",
        // backgroundColor : "red",
        color: "#666",
        fontFamily: "Roboto",
    },
    boldtime: {
        fontSize: 11,
        width: 100,
        position: "absolute",
        right: 0,
        top: 15,
        textAlign: "right",
        // backgroundColor : "red",
        color: "#00de62",
        fontFamily: "Roboto",
    },
    placeholderText: {
        color: "#B8B8B8",
        textAlign: "center",
        marginTop: 50,
        fontSize: 16,
    },
    card: {
        width: width * 0.92,
        marginHorizontal: "auto",
        padding: 16,
        backgroundColor: '#1A1C1E',
        marginTop: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: 'rgba(0,0,0, 0.8)', // Shadow color
        shadowOffset: {
            width: 0, // x offset
            height: 5, // y offset
        },
        shadowOpacity: 10, // Full opacity for shadow effect
        shadowRadius: 1, // Blur radius
        elevation: 5,
    },
    header1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    headerText: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: "space-between"
    },
    username: {
        color: '#E9E9E9',
        fontWeight: '600',
        fontSize: 18,
        fontFamily: "Alata",
        marginBottom: 3,
        marginTop: -2,
        width: "75%",
        // backgroundColor : "red"

    },
    date: {
        color: '#a1a1a1',
        fontSize: 14,
        alignSelf: "center",
        fontFamily: 'Roboto'
    },
    title: {
        color: '#B8B8B8',
        // fontWeight: 'bold',
        fontSize: 36,
        marginBottom: 6,
        fontFamily: "Alata"
    },
    description: {
        color: '#D9D9D9',
        fontSize: 13,
        // marginBottom: 12,
        fontFamily: "Roboto"
    },
    status: {
        color: '#00DE62',
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 4,
        fontFamily: "Roboto"

    },
    pending: {
        fontFamily: "Roboto",

        color: '#B8B8B8',
        fontSize: 14,
        textAlign: "center",
        marginVertical: 5
    },

    emptyListText: {
        textAlign: "center",
        color: "#666",
        alignSelf: "center",
        justifyContent: "center",
        // position : "absolute",
        elevation: 100,
        bottom: 0,

        fontSize: 16,
        paddingTop: 250,
    },

    emptyListContainer: {

        flex: 1,
        // height:height,


    },


    tabbarpill: {
        borderWidth: 1,
        borderRadius: 30,
        textAlign: "center",
        height: 48,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        width: width * 0.44,
        // zIndex: 100,
        fontFamily: "Alata",
        fontSize: 20,
        textAlign: "center",
        textAlignVertical: "center",
        textTransform: "capitalize",
        borderWidth: 1,
        borderRadius: 30,
    }
});


export default ConnectionsScreen