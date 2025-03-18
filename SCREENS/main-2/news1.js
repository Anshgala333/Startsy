import React, { useEffect } from "react";
import { Pressable, ScrollView, StatusBar } from "react-native";
import { View, Text, StyleSheet, Image, FlatList, TextInput, Dimensions,BackHandler, TouchableOpacity } from "react-native";
import Share from "../../assets/icons/share.js"
import Upvote from "../../assets/icons/upvote.js"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const NewsletterPage = ({ navigation, route }) => {

    // const {item} = route.params

    console.log(route.params);

    const { item } = route.params



    // const item =
    // {
    //     id: "1",
    //     title: "We fight for climate change, says a new startup called climatex.",
    //     author: "raz.shhh",
    //     role: "Founder",
    //     time: "4 mins ago",
    //     content:
    //         "lorem ipsum dolor sit amet, con orem ipsum dolor sit amet, con orem ipsum dolor sit amet, con orem ipsum dolor sit amet, con orem ipsum dolor sit amet, con orem ipsum dolor sit amet, con orem ipsum dolor sit amet, con",
    //     image: require("../../assets/images/template.png"), // Replace with your image asset
    //     profile: require("../../assets/images/p2.png"), // Replace with your profile asset
    // }


    useEffect(() => {
        // StatusBar.setBackgroundColor("")
        StatusBar.setBarStyle("light-content")
    }, [])

    function time(time) {
        // console.log('====================================');
        // console.log(time);
        var data1 = new Date(time)
        // console.log('====================================');
        // console.log(data1);
        // console.log('====================================');
        // console.log('====================================');
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

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack();
            return true; // This prevents the default back action
        });

        return () => backHandler.remove();
    }, [item]);



    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Newsletter</Text>
                <View style={styles.headerIcons}>
                    <View>
                        <Pressable>

                        </Pressable>
                    </View>
                    <View>

                    </View>
                </View>
            </View>
            <View style={styles.iconcontainer}>
                <View style={styles.i1}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <FontAwesome6 name="chevron-left" size={32} color="#00DF60" />
                    </Pressable>
                </View>
                <View style={styles.i2}>
                    {/* <Upvote width={36} height={36} style={{marginRight : 10}}/> */}
                    <Share style={{ marginTop: 3 }} />

                </View>
            </View>
            <View style={styles.postContainer}>
                <Image source={{ uri: item.newsletterImage }} style={styles.postImage} />
                <Text style={styles.postTitle}>{item.title}</Text>
                <View style={styles.authorInfo}>
                    <Image source={{ uri: item.taggedUser.profilePhoto }} style={styles.profileImage} />
                    <View style={styles.userinfo}>

                        <View style={{ display: "flex", flexDirection: "row", alignSelf: "center" }}>
                            <Text style={styles.authorName}>
                                {item.taggedUserName}
                            </Text>
                            <Text style={styles.role}>{item.taggedUser.role}</Text>
                        </View>
                        <Text style={styles.time}>{time(item.taggedUser.createdAt)}</Text>
                    </View>
                </View>
                <Text style={styles.postContent}>{item.content}</Text>
            </View>


        </ScrollView>
    );
};
const { height, width } = Dimensions.get("window");


var a = width / 360;
var b = height / 800;
// console.log(a,b);

const scalingfactor = Math.sqrt(a * b)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: height,
        backgroundColor: "#16181a",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#16181a",
    },
    headerText: {
        color: "#00de62",
        fontSize: 28,
        paddingLeft: 10,
        fontWeight: "bold",
    },
    headerIcons: {
        flexDirection: "row",
        display: "flex",
        gap: 10,
    },
    icon: {
        color: "#00FF00",
        fontSize: 20,
    },
    contentContainer: {
        padding: 10,
    },
    postContainer: {
        backgroundColor: "#16181a",
        borderRadius: 10,
        marginBottom: 20,
        padding: 10,
        flex: 1,
        minHeight: height,
        paddingBottom : 50
    },
    postImage: {
        width: width,
        height: 200,
        // borderRadius: 10,
        marginBottom: 20,
        left: -10

    },
    postTitle: {
        color: "#B8B8B8",
        fontSize: 23,
        marginBottom: 10,
        lineHeight: 26,
        fontFamily: "Alata"
    },
    authorInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
        marginTop: 5
    },
    authorName: {
        color: "#E9E9E9",
        fontSize: 20,
        fontFamily: "Alata",
        alignSelf: "flex-start",

    },
    role: {
        color: "#00DE62",
        fontSize: 10,
        fontFamily: "Roboto",
        paddingLeft: 10,
        alignSelf: "center",
        marginTop: 8,
        //    top : -10,
        textAlignVertical: "center"

    },
    time: {
        color: "#828282",
        fontSize: 11,
        fontFamily: "Roboto",
        alignSelf: "center",
        marginTop: 2

    },
    postContent: {
        color: "#B8B8B8",
        fontSize: 16,
        // fontFamily: "Roboto",
    },
    bottomNav: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        backgroundColor: "#1C1C1C",
    },
    navIcon: {
        color: "#00FF00",
        fontSize: 24,
    },
    userinfo: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 0.98,
        alignSelf: "center",
        alignItems: "center",
        // backgroundColor : "red"

    },
    iconcontainer: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        width: "92%",
        margin: "auto",
        marginVertical: 5

    },
    i2: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        gap: 10,
        // marginVertical : 20
    }
});

export default NewsletterPage;
