import React, { useEffect } from "react";
import { Pressable, ScrollView, StatusBar } from "react-native";
import { View, Text, StyleSheet, Image, FlatList, TextInput, Dimensions, BackHandler, TouchableOpacity } from "react-native";
import Share from "../../assets/icons/share.js"
import Upvote from "../../assets/icons/upvote.js"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const NewsletterPage = ({ openshare }) => {




    const route = useRoute();
    const { item, navigation } = route.params

    console.log(item.taggedUser, "oo");
    console.log(item, "oo");


    useEffect(() => {
        // StatusBar.setBackgroundColor("")
        StatusBar.setBarStyle("light-content")
    }, [])

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
                {/* <Text style={styles.headerText}>Newsletter</Text> */}
                {/* <View style={styles.headerIcons}>
                    <View>
                        <Pressable>

                        </Pressable>
                    </View>
                    <View>

                    </View>
                </View> */}
            </View>
            <View style={styles.iconcontainer}>
                <View style={styles.i1}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <FontAwesome6 name="chevron-left" size={26} color="#00DF60" />
                    </Pressable>
                </View>
                <TouchableOpacity onPress={() => openshare(item._id)} style={styles.i2}>
                    {/* <Upvote width={36} height={36} style={{marginRight : 10}}/> */}
                    <Share style={{ marginTop: 3 }} />

                </TouchableOpacity>
            </View>
            <View style={styles.postContainer}>
                <View style={styles.ImageContainer}>
                    <Image source={{ uri: item.newsletterImage }} style={styles.postImage} />

                    <LinearGradient
                        colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.93)"]}
                        locations={[0, 1]}
                        style={styles.postTitle}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 0.8 }} >

                        <Text style={styles.tittleContent}>{item.title}</Text>
                    </LinearGradient>
                </View>
                <View style={styles.authorInfo}>
                    {/* {item.profilePhoto && <Image source={{ uri: item.profilePhoto }} style={styles.profileImage} />} */}
                    {item.taggedUser.profilePhoto && <Image source={{ uri: item.taggedUser.profilePhoto }} style={styles.profileImage} />}
                    <View style={styles.userinfo}>

                        <View style={{ display: "flex", flexDirection: "row", alignSelf: "center" }}>
                            <Text style={styles.authorName}>
                                {item.taggedUserName}
                            </Text>
                            <Text style={styles.role}>{item.taggedUser.role == "CommunityMember" ? "Member" : item.taggedUser.role}</Text>
                        </View>
                        <Text style={styles.time}>{time(item.createdAt)}</Text>
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
        paddingBottom: 50
    },
    postImage: {
        width: width,
        height: 250,
        objectFit: "cover",
        marginBottom: 10,
        left: -10

    },
    postTitle: {
        color: "#fff",
        fontSize: 23,
        // marginBottom: 10,
        lineHeight: 26,
        position: "absolute",
        bottom: 10,
        paddingHorizontal: 20,
        left: -10,
        height : 250,
        paddingTop : 0,
        justifyContent : "center",
        alignContent : "baseline",
        // backgroundColor: "red",
        width: "107%",

    },
    tittleContent :{
        position : "absolute",
        bottom : 10,
        left : 12,
        color: "#fff",
        fontSize: 24,
        lineHeight: 26,
        fontFamily: "Alata",
    },
    authorInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        marginTop : 0
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
        width: "93%",
        paddingHorizontal : 5,
        margin: "auto",
        marginVertical: 5,
        marginTop : -8

    },
    i2: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        gap: 10,
        // marginVertical : 20
    },
    ImageContainer: {
        // display : "flex",
        // flexDirection  : "row"
    }
});

export default NewsletterPage;
