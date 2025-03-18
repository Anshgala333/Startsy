
import { useFocusEffect, useNavigation } from "expo-router";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Text, StatusBar, View, Image, TouchableOpacity, SafeAreaView, StyleSheet, RefreshControl, Dimensions, ScrollView, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Upvote from "../../assets/icons/upvote.js"
import Useradd from "../../assets/icons/useradd.js"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { url } from "../../config.js"
import { FlatList } from "react-native-gesture-handler";
import InvestorCard from "./InvestorCard.js"
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import B2 from "@/assets/icons/b2.js";
import { jwtDecode } from "jwt-decode";
import Upvotedata from "./Upvotedata.js"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Notification = ({ token, mainpagebottomsheet, closeall }) => {
    const navigation = useNavigation()



    console.log("notfication re render");

    var decode = jwtDecode(token)

    const [data, setdata] = useState(null)
    const [subnotification, setsubnotification] = useState([])
    const [loading, setloading] = useState(true)
    const [statistic, setstatistic] = useState({
        totalUpvotes: 0,
        upvotesPerDay: 0,
        investorUpvotes: 0

    })

    useFocusEffect(
        useCallback(() => { closeall() }, [])
    )


    const Tab = createMaterialTopTabNavigator();
    function showJobPage() {
        navigation.navigate("Jobposted", { token: token })
    }




    return (



        <View style={{
            flex: 1,
            // minHeight : 700,
            backgroundColor: "#16181a"
        }}>
            <Text allowFontScaling={false} style={styles.headerText}>Notification</Text>
            
            {/* {decode.role != "Investor" && <Pressable
                onPress={() => { showJobPage() }}

                style={styles.job}>
                <Text style={styles.jobtext}>job</Text>
            </Pressable>} */}

            <Tab.Navigator
                initialRouteName="Requests"
                screenOptions={({ route }) => ({
                    animationEnabled: true,



                    tabBarStyle: {
                        backgroundColor: "#16181a",
                        justifyContent: "space-between",
                        display: "flex",
                        width: width ,
                        margin: "auto",
                        borderBlockColor: "transparent",
                        elevation: 0
                    },


                    tabBarIndicatorStyle: {
                        backgroundColor: "#00DE62",
                        height: 1,
                    },

                })}
            >

                <Tab.Screen

                    name="Requests"
                    component={Upvotedata}
                    initialParams={{ token: token, navigation: navigation }}
                    // children={() => <Upvotedata token={token} navigation={navigation} />}
                    options={{
                        freezeOnBlur: true,

                        tabBarLabel: ({ focused }) => (
                            <View >
                                <View style={{ position: "absolute", left: -25, top: -2 }}>
                                    {focused && <Upvote color="#00de62" />}
                                    {!focused && <Upvote color="#B8B8B8" />}
                                </View>
                                <Text allowFontScaling={false} style={[
                                    styles.tabbarpill, {
                                        color: focused ? "#00DE62" : "#B8B8B8",
                                        borderColor: focused ? "#00DE62" : "#24272A",
                                        // backgroundColor: focused ? "#00DE62" : "transparent",
                                    }
                                ]}>
                                    Upvote

                                </Text>
                            </View>
                        ),

                    }}
                />
                <Tab.Screen
                    name="Connections"
                    component={InvestorCard}
                    initialParams={{ token: token, navigation: navigation }}
                    // children={() => <InvestorCard token={token} navigation={navigation} />}

                    options={{
                        freezeOnBlur: true,

                        tabBarLabel: ({ focused }) => (


                            <View >
                                <View style={{ position: "absolute", left: -25, top: -2 }}>
                                    {focused && <Useradd />}
                                    {!focused && <Useradd color="#B8B8B8" />}
                                </View>
                                <Text allowFontScaling={false} style={[
                                    styles.tabbarpill, {
                                        color: focused ? "#00DE62" : "#B8B8B8",
                                        borderColor: focused ? "#00DE62" : "#24272A",
                                        // backgroundColor: focused ? "#00DE62" : "transparent",
                                    }
                                ]}>
                                    Request

                                </Text>
                            </View>
                        ),

                    }}
                />
            </Tab.Navigator>
        </View>
    )
}



export default Notification

const { height, width } = Dimensions.get("window");
var a = width / 360;
var b = height / 800;
// console.log(a,b);

const scalingfactor = Math.sqrt(a * b)



const styles = StyleSheet.create({
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
        height: 3,
        marginTop: 5,
        backgroundColor: "#24272A"
    },
    tabbarpill: {
        // borderWidth: 1,
        // borderRadius: 30,
        // textAlign: "center",
        // textAlignVertical: "center",
        // height: 50,
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        // alignSelf: "center",
        // width: width * 0.44,
        // fontFamily: "Alata",
        // fontSize: 20,
        // textAlign: "center",
        // textAlignVertical: "center",
        // textTransform: "capitalize",
        // borderWidth: 2,
        // borderRadius: 30,
        // paddingLeft: 20,

        // marginTop: -1

        fontSize: 16,
        marginLeft : 10,
        fontFamily: "Alata",

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
        // fontSize: 35,
        // fontWeight: "bold",
        // color: "#00DE62",
        // // marginBottom: 20,
        // color: "#00DE62",
        // fontFamily: "myanmar",
        // paddingHorizontal: 20,
        // marginVertical: 12,

        fontSize: 35,
        fontWeight: "bold",
        color: "#00DE62",
        marginBottom: 12,
        fontFamily: "myanmar",
        color: "#00DE62",
        paddingLeft: 15


    },
    box1: {
        height: 70,
        borderRadius: 15,
        width: "98%",
        marginHorizontal: "auto",
        marginVertical: 7,
        backgroundColor: "#24272A",
        // marginBottom : 20,
        paddingHorizontal: 10,
        marginHorizontal: 6,
        display: "flex",
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
        width: "100%",
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
        width: 50,
        height: 50,
        borderRadius: 50,
        alignSelf: "center",
        justifyContent: "center",
    },
    topu1: {
        fontFamily: "Alata",
        color: "#E9E9E9",
        fontSize: 18,
        marginLeft: 10,
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
        marginLeft: 5,
        width: 60,
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
        paddingLeft: 10,
        marginTop: 5,
        color: "#bbbbbb",
        fontFamily: "Roboto",
    },
    job: {
        position: "absolute", right: 20, top: 20,
        backgroundColor: "#ccc",
        paddingVertical: 8,
        paddingHorizontal: 40,
        borderRadius: 20
    },
    jobtext: {
        fontFamily: "Alata",
        fontSize: 16,
        marginTop: -5,
        color: "#000"
    }

});