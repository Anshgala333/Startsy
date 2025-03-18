import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity, Dimensions, SafeAreaView, ScrollView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import Upvote from "@/assets/icons/upvote.js";
import Share from "@/assets/icons/share.js";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { url } from "../../config.js"
import { jwtDecode } from "jwt-decode";

const Profile = ({ navigation, token }) => {

    const decoded = jwtDecode(token);
    console.log(decoded);
    const [userdata, setuserdata] = useState(null)


    const Tab = createMaterialTopTabNavigator();

    useEffect(() => {
        async function getdata(params) {
            try {

                const response = await fetch(`${url}api/getUsersProfiles/${decoded._id}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        accept: "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                console.log(data.data);
                console.log(response.status);
                setuserdata(data.data)

            }
            catch (err) {
                console.log(err);

            }
        }
        getdata()
    }, [])


    const Buyplan = () => {
        console.log("hi");

        return (
            <ScrollView style={{ flex: 1, width: width, height: 10000, backgroundColor: "#16181a" }}>
                <View style={styles.buyPlanSection}>
                    <Text allowFontScaling={false} style={styles.buyPlanText}>Buy Plan</Text>
                </View>
            </ScrollView>
        )
    }



    function gotoeditprofile() {

        navigation.navigate("Founder1")
    }
    function gotochangepassowrd() {

        navigation.navigate("ChangePassword1")
    }
    const Yourpost = () => {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: "#16181a" }}>
                <View style={styles.box}>
                    <View style={styles.top} >
                        <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                            <Image style={styles.userimg} source={require("../../assets/images/p1.png")} />
                            <View style={styles.userdetail}>
                                <Text allowFontScaling={false} style={styles.u1}>raz.shhh</Text>
                                <Text allowFontScaling={false} style={styles.u2}>Founder</Text>
                            </View>
                        </View>
                    </View>
                    <Image style={styles.template} source={require("../../assets/images/template.png")} />
                    <View style={styles.iconcontainer}>
                        <View style={styles.icon2}>
                            <Upvote width={36} height={36} style={{ marginHorizontal: 22 }} />
                            <FontAwesome name="comment-o" size={30} color="#00DE62" />
                        </View>
                        <Share style={{ marginTop: 5, marginRight: 10, right: 0 }} />


                    </View>

                </View>
            </ScrollView>
        )
    }
    return (
        <ScrollView style={styles.container}>
            {/* Header Section */}
            {userdata && <View style={{ flex: 1, minHeight: 1000 }}>
                <Text allowFontScaling={false} style={styles.headerText}>Profile</Text>

                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <Image
                        style={styles.profileImage}
                        source={{ uri: userdata.user_id.profilePhoto }} // Replace with your image path
                    />
                    <View style={styles.userinfo}>
                        <Text allowFontScaling={false} style={styles.username}>{userdata.user_id.userName}</Text>
                        <Text allowFontScaling={false} style={styles.userRole}>{userdata.user_id.role}</Text>
                        <TouchableOpacity onPress={gotoeditprofile} style={styles.editButton}>
                            <Text allowFontScaling={false} style={styles.editButtonText}>Edit profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={gotochangepassowrd} style={styles.editButton1}>
                            <Text allowFontScaling={false} style={styles.editButtonText}>Change Password</Text>
                        </TouchableOpacity>
                        <View style={styles.connectionContainer}>
                            <View style={styles.circle}>
                                <Image
                                    style={styles.profileImage1}
                                    source={require("../../assets/images/p2.png")} // Replace with your image path
                                />
                            </View>
                            <View style={styles.circle}>
                                <Image
                                    style={styles.profileImage1}
                                    source={require("../../assets/images/p2.png")} // Replace with your image path
                                />
                            </View>
                            <View style={styles.circle}>
                                <Image
                                    style={styles.profileImage1}
                                    source={require("../../assets/images/p2.png")} // Replace with your image path
                                />
                            </View>
                            <Text style={styles.t6}>{userdata.chatUsers.length} connections</Text>
                        </View>
                    </View>

                    <View style={styles.divider}></View>
                </View>


                <Tab.Navigator

                    screenOptions={({ route }) => ({

                        tabBarStyle: {
                            backgroundColor: "#16181a",
                            // backgroundColor: "red",
                            justifyContent: "space-between",
                            display: "flex",
                            // height  : 200,


                            width: width * 0.92,
                            margin: "auto"
                        },


                        tabBarIndicatorStyle: {
                            backgroundColor: "#00DE62",
                            height: 0,
                        },

                    })}
                >
                    <Tab.Screen
                        name="Connections"
                        component={Buyplan}


                        options={{
                            tabBarLabel: ({ focused }) => (
                                <Text allowFontScaling={false} style={[
                                    styles.tabbarpill, {

                                        color: focused ? "#16181A" : "#00de62",
                                        borderColor: focused ? "#00DE62" : "#808080",
                                        backgroundColor: focused ? "#00DE62" : "transparent",
                                    }
                                ]}> Buy Plan
                                </Text>
                            ),

                        }}
                    />
                    <Tab.Screen

                        name="Requests"
                        component={Yourpost}
                        options={{
                            tabBarLabel: ({ focused }) => (
                                <Text allowFontScaling={false} style={[
                                    styles.tabbarpill, {
                                        color: focused ? "#16181A" : "#00de62",
                                        borderColor: focused ? "#00DE62" : "#808080",
                                        backgroundColor: focused ? "#00DE62" : "transparent",
                                    }
                                ]}> Your Posts
                                </Text>
                            ),

                        }}
                    />
                </Tab.Navigator>

            </View>}
            {/* Buy Plan Section */}

        </ ScrollView>
    );
};

export default Profile;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexGrow : 1,
        // width: width,
        // height: height,
        backgroundColor: "#16181a",
        // backgroundColor: "red",
        minHeight: 100,
        maxHeight: height
        // padding: 20,
    },
    headerText: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#00DE62",
        // marginBottom: 20,
        color: "#00DE62",
        fontFamily: "myanmar",
        paddingHorizontal: 20

    },
    profileSection: {
        alignItems: "center",
        marginBottom: 10,
        // display: "flex",
        // flexDirection: "row",
        paddingHorizontal: 20,
        // backgroundColor : "red"
    },
    profileImage: {
        width: 124,
        height: 124,
        borderRadius: 100,
        marginBottom: 10,
    },
    profileImage1: {
        width: "100%",
        height: "100%",
        borderRadius: 100,
        marginBottom: 10,
    },
    username: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#E9E9E9",
        fontFamily: "Alata",
        textAlign: "center",
        marginVertical: 5
    },
    userRole: {
        fontSize: 16,
        color: "#00DE62",
        marginBottom: 10,
        fontFamily: "Roboto",
        // paddingLeft: 2,
        textAlign: "center",
        marginVertical: -5


    },
    editButton: {
        backgroundColor: "#00DE62",
        borderRadius: 20,
        alignItems: "center",
        verticalAlign: "middle",
        justifyContent: "center",
        width: 182,
        height: 40,
        alignSelf: "center",
        // paddingHorizontal : 10,


    },
    editButton1: {
        backgroundColor: "#00DE62",
        // paddingHorizontal: 20,
        // paddingVertical: 8,
        borderRadius: 20,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#00DE62",
        alignItems: "center",
        verticalAlign: "middle",
        justifyContent: "center",
        width: 182,
        height: 40,
        alignSelf: "center",
        marginVertical: 12


    },
    editButtonText: {
        color: "#16181A",
        fontSize: 16,
        fontFamily: "Alata",
        textAlign: "center",
        marginLeft: -1,
        marginTop: -3
    },

    buyPlanSection: {
        borderWidth: 2,
        borderColor: "#00DE62",
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
    userinfo: {
        paddingLeft: 10,
        justifyContent: "center",
        // backgroundColor : "red",
        width: "100%",


    },
    btncont: {
        // flex :1,
        // display: "flex",
        // flexDirection: "row",
        // gap: 10
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
        width: width * 0.42,
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
    box: {
        width: width * 0.96,
        height: 316,
        margin: 10,
        backgroundColor: "#1A1D1F",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        margin: "auto",
        marginBottom: 25

    },
    boxText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    template: {
        width: "96%",
        borderRadius: 10,
        height: 182,
        maxHeight: 182
    },
    userimg: {
        borderRadius: 100,
        width: 36,
        aspectRatio: 1,
        margin: 10,
        marginLeft: 15,
        alignSelf: "flex-start",
        justifyContent: "flex-start"
    },
    userdetail: {
        flex: 1,
        alignSelf: "flex-start",
        paddingLeft: 5
    },
    u1: {
        fontFamily: "Alata",
        fontSize: 20,
        color: "#E9E9E9"
    },
    t6: {
        fontFamily: "Alata",
        fontSize: 14,
        color: "#AEAFAF",
        marginLeft: 20
    },
    u2: {
        fontFamily: "Roboto",
        fontSize: 11,
        color: "#00DE62"
    },
    u3: {
        fontFamily: "Roboto",
        fontSize: 20,
        color: "#B8B8B8"
    },
    upvote: {
        marginRight: -3
    },
    count: {
        alignSelf: "flex-end",
        fontFamily: "Roboto",
        fontSize: 13,
        color: "#00DE62",
        marginLeft: -2
    },
    lower: {
        display: "flex",
        flexDirection: "row",
        width: "95%",
        marginHorizontal: "auto",
        marginTop: 10,
        paddingLeft: 5,
        justifyContent: "space-between"
    },
    connectionContainer: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 50,
        marginRight: -12,
        overflowY: "hidden",
    },
    divider: {
        width: width,
        height: 3,
        marginTop: 20,
        backgroundColor: "#24272A"
    },
    iconcontainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "95%",
        marginHorizontal: "auto",
        marginTop: 10
    }
    , icon2: {
        display: "flex",
        flexDirection: "row",
        // justifyContent : "space-between",
        // width : "90%",
        // marginHorizontal : "auto"
        gap: 5
    },

});
