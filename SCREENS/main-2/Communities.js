

import React, { useEffect, useState } from "react";
import { url } from "../../config.js"
import { Skeleton } from 'moti/skeleton';

import B1 from "../../assets/icons/b1.js"
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ActivityIndicator, RefreshControl, FlatList, StatusBar, Vibration } from "react-native";
const Communities = ({ token, navigation }) => {
    const [filteredData, setFilteredData] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [skeleton, setSkeletonLoading] = useState(true)

    // const [jisuserkosendkarnahaiuskiid, setjisuserkosendkarnahaiuskiid] = useState("")

    var [messages, setmessage] = useState(null)
    async function getdata() {
        setLoading(true)
        try {
            setSkeletonLoading(true)

            const response = await fetch(`${url}groupChat/getCommunityGroupChatList`, {
                method: 'GET',
                headers: {
                    accept: "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await response.json();


            if (response.status != 404) {


                const uniqueData = data.data.filter((item, index, self) =>
                    self.findIndex(innerItem => innerItem.community.community.communityName === item.community.community.communityName) === index

                );
                uniqueData.sort((a, b) => new Date(a.conversation.updatedAt) - new Date(b.conversation.updatedAt));


                const sortedData = uniqueData.sort((a, b) => {
                    if (a.conversation.lastMessage === null && b.conversation.lastMessage === null) return 0;
                    if (a.conversation.lastMessage === null) return 1;
                    if (b.conversation.lastMessage === null) return -1;

                    const dateA = new Date(a.conversation.lastMessage.createdAt);
                    const dateB = new Date(b.conversation.lastMessage.createdAt);
                    return dateB - dateA; // Sort in descending order of time
                });


                console.log(uniqueData.length);
                setFilteredData(sortedData)
            }



        }
        catch (err) {
            console.log(err);

        }
        finally {
            setSkeletonLoading(false)
            setLoading(false);
        }
    }






    useEffect(() => {


        getdata();


    }, [])

    async function gotochatscreen(item) {






        if (token) {
            try {
                const response = await fetch(
                    `${url}groupChat/getGroupChatMessage/${item.community.community._id}`,
                    {
                        method: "GET",
                        headers: {
                            accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const result = await response.json();


                setmessage(result.data)
                navigation.navigate("Chat1", { item: item.community.community, messages: result.data, token, navigation })
            } catch (err) {
                console.log(err);
            } finally {

            }
        }



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
            return Math.floor(interval) + " hrs ago";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " mins ago";
        }
        return Math.floor(seconds) + " seconds ago";
    }
    const Spacer = ({ height = 16 }) => <View style={{ height }} />;





    return (
        <View style={{ flex: 1, backgroundColor: "#16181a" }}>
            <View style={styles.listContainer}>



                {skeleton && <View style={styles.listItem1}>

                    {[1, 2, 3, 4, 5, 6, 7, 8].map(e =>

                        <View key={e} style={{ display: "flex", flexDirection: "row", gap: 5, marginBottom: 20 }}>
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
                {filteredData && !skeleton && <FlatList
                    refreshControl={<RefreshControl refreshing={refreshing}
                        progressBackgroundColor="#16181a"
                        colors={['#00de62']}
                        onRefresh={() => {
                            Vibration.vibrate(100)
                            getdata()
                        }}

                    />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    ListHeaderComponent={

                        <>
                            {
                                filteredData.length == 0 ?
                                    <View style={styles.emptyListContainer}>
                                        <Text style={[{ color: 'gray' }, styles.emptyListText]}>No conversations yet</Text>
                                    </View>
                                    : null
                            }

                        </>
                    }
                    data={filteredData}
                    keyExtractor={(item, index) => item.community._id?.toString() || Math.random()}
                    renderItem={({ item }) => {

                        return (
                            <TouchableOpacity key={item._id} onPress={() => {
                                gotochatscreen(item)
                            }}>
                                <View style={styles.listItem}>


                                    <View style={styles.avatar}>
                                        {(item.community.community.groupPhoto == undefined || item.community.community.groupPhoto == "") && <B1 color={"#ccc"} />}
                                        {item.community.community.groupPhoto && <Image style={{ width: 44, height: 44, borderRadius: 30 }} source={{ uri: item.community.community.groupPhoto }} />}
                                    </View>
                                    <View style={styles.textContainer}>
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            allowFontScaling={false} style={styles.username}>{item.community.community.communityName}</Text>
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"

                                            allowFontScaling={false} style={styles.message}>{item.conversation.lastMessage ? item.conversation.lastMessage.message : "No chats yet"}</Text>
                                    </View>

                                    <Text
                                        allowFontScaling={false} style={styles.time}>{item.conversation.lastMessage ? time(item.conversation.lastMessage.createdAt) : "today"}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />}

                {loading && <ActivityIndicator size="large" color="#fff" />}
            </View>
        </View>
    )


}


export default Communities

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

    listContainer: {
        flex: 1,
        minHeight: 500,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#16181a",
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        // borderBottomWidth: 1,
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
    },

    message: {
        fontSize: 14,
        color: "gray",
        marginTop: -3,
        fontFamily: 'Roboto',
        paddingRight: 60
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





    username: {
        color: '#E9E9E9',
        fontWeight: '600',
        fontSize: 18,
        width: "70%",
        fontFamily: "Alata",
        marginBottom: 3,
        marginTop: -2,
        // backgroundColor: "red"


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

    listItem1: {
        minHeight: 400,
        backgroundColor: "#16181a"
    },
    emptyListText: {
        flex: 1,
        marginHorizontal: "auto",
        alignSelf: "center",
        justifyContent: 'center',
        marginTop: 100,
        top: '8%',
        height: height
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



});
