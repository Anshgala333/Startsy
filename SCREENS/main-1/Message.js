import React from "react";
import { View, Text, StyleSheet, StatusBar, TextInput, FlatList, Image, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Pressable } from "react-native";
import ConnectionsScreen from "../main-1/connection.js"
import Search from "../../assets/icons/Search.js";


import RequestsScreen from "../main-1/Request.js"
import { useFocusEffect } from "expo-router";
// Sample data for lists
const DATA = Array(5).fill({
    username: "raz.shhh",
    message: "text...",
    time: "Today",
    avatar: require("../../assets/images/p2.png"), // Replace with your image path
});

const Tab = createMaterialTopTabNavigator();


const ChatScreen = ({ navigation, token }) => {

    // console.log(navigation);



  


    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181a")
    })
    // console.log(navigation , "message")

    return (

        <View  style={styles.container}>
            <Text allowFontScaling={false} style={styles.header}>Chat</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    allowFontScaling={false}
                    style={styles.searchInput}
                    placeholder="Search"
                    placeholderTextColor="#828282"
                />
                <Search style={styles.search} />

            </View>


            {/* <NavigationContainer> */}
            <Tab.Navigator

                screenOptions={({ route }) => ({

                    tabBarStyle: {
                        backgroundColor: "#16181a",
                        justifyContent: "space-between",
                        display: "flex",
                        width: width * 0.92,
                        margin: "auto",
                        elevation: 0

                    },


                    tabBarIndicatorStyle: {
                        backgroundColor: "#00DE62",
                        height: 0,
                    },

                })}
            >
                <Tab.Screen
                    name="Connections"
                    // component={ConnectionsScreen}
                    children={(props) => <ConnectionsScreen navigation={navigation} token={token} search={"true"} />}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text allowFontScaling={false} style={[
                                styles.tabbarpill, {
                                    color: focused ? "#00DE62" : "#808080",
                                    borderColor: focused ? "#00DE62" : "#808080",
                                },

                            ]}> Connections
                            </Text>
                        ),

                    }}
                />
                <Tab.Screen

                    name="Requests"
                    component={RequestsScreen}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text allowFontScaling={false} style={[
                                styles.tabbarpill, {
                                    color: focused ? "#00DE62" : "#808080",
                                    borderColor: focused ? "#00DE62" : "#808080",
                                }
                            ]}> Requests
                            </Text>
                        ),

                    }}
                />

            </Tab.Navigator>
            {/* </NavigationContainer> */}
        </View>
    )
}
export default ChatScreen;



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
        marginVertical: 10,
        marginTop: 0,
        marginLeft: 20,
        fontFamily: "myanmar",
    },
    searchContainer: {
        marginHorizontal: 20,
        marginBottom: 5,
    },
    searchInput: {
        height: 48,
        borderColor: "#828282",
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
        borderBottomWidth: 1,
        borderBottomColor: "#333",
        alignSelf: "flex-start",
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
        alignSelf: "flex-start",
    },
    username: {
        fontSize: 22,
        color: "#00DE62",
        fontFamily: "Alata",
        alignSelf: "flex-start",
        marginTop: -3,
    },
    message: {
        fontSize: 14,
        color: "#B8B8B8",
        marginTop: -3,
    },
    time: {
        fontSize: 12,
        color: "#B8B8B8",
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
        fontSize: 24,
        fontFamily: "Alata"

    },
    date: {
        color: '#a1a1a1',
        fontSize: 14,
        alignSelf: "center"
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
        fontSize: 18,
        textAlign: "center",
        textAlignVertical: "center",
        textTransform: "capitalize",
        borderWidth: 1,
        borderRadius: 30,
        // marginTop : -10
    },
    search: {
        position: "absolute",
        right: 12,
        top: 10,
        alignSelf: "center",
    },
});
