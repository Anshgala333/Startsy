import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, Keyboard, BackHandler, FlatList, Image, Dimensions, TouchableOpacity, StatusBar } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { Pressable } from "react-native";
import ConnectionsScreen from "../main-1/connection.js"
import Communities from "../main-2/Communities.js"
import { useNavigation } from "expo-router";
import Search from "../../assets/icons/Search.js";

const Tab = createMaterialTopTabNavigator();



const RequestsScreen = () => (
    <View style={styles.c1}>
        <View style={styles.card}>
            {/* Header Section */}
            <View style={styles.header1}>
                <Image
                    source={require("../../assets/images/p2.png")} // Replace with real profile picture URL
                    style={styles.profileImage}
                />
                <View style={styles.headerText}>
                    <Text allowFontScaling={false} style={styles.username}>raz.shhh</Text>
                    <Text allowFontScaling={false} style={styles.date}>Today</Text>
                </View>
            </View>

            {/* Title Section */}
            <Text allowFontScaling={false} style={styles.title}>Startsy</Text>
            <Text allowFontScaling={false} style={styles.description}>
                Revolutionizing startup ecosystem.
            </Text>

            {/* Status Section */}
            <Text allowFontScaling={false} style={styles.status}>Preseed stage - 200k</Text>
            <Text allowFontScaling={false} style={styles.pending}>Pending...</Text>
        </View>
    </View>
);


const ChatScreen = ({ token, mainpagebottomsheet, closeall, k, setk }) => {

    // console.log(token, "dskljkuyhfdsajjsd");

    const inputref = useRef(null)

    const navigation = useNavigation()



    useFocusEffect(
        useCallback(() => {
            // StatusBar.setBackgroundColor("#16181a")
            closeall()

            const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
                console.log('====================================');
                console.log("ok");
                console.log('====================================');
                setk(false);
                inputref.current?.blur()
            });
            const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {


                navigation.navigate("Startsy");
                // setk(false)
                // inputref.current?.blur()
                return true;
            });

            return () => {
                backHandler.remove()

                keyboardDidHideListener.remove();
            }

        }, [])
    )





    const [search, setsearch] = useState("")


    return (

        <View style={styles.container}>
            <Text allowFontScaling={false} style={styles.header}>Chat</Text>
            <View style={styles.searchContainer}>
                <Pressable onPress={() => setk(true)}>
                    <Search style={styles.search} />

                    <TextInput
                        ref={inputref}
                        // onFocus={() => setk(true)}
                        onBlur={() => setk(false)}
                        allowFontScaling={false}
                        style={styles.searchInput}
                        placeholder="Search"
                        placeholderTextColor="#828282"
                        onChangeText={(text) => {
                            // console.log(text);
                            setsearch(text)
                        }}
                    />
                </Pressable>
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
                    // component={ConnectionsScreen}
                    children={(props) => <ConnectionsScreen setk={setk} inputref={inputref} navigation={navigation} token={token} search={search} />}
                    options={{
                        
                        tabBarLabel: ({ focused }) => (
                            <View>
                                <Text allowFontScaling={false} style={[
                                    styles.tabbarpill, {
                                        color: focused ? "#00DE62" : "#808080",
                                        borderColor: focused ? "#00DE62" : "#808080",
                                    }
                                ]}> Personal
                                </Text>
                            </View>
                        ),

                    }}
                />
                <Tab.Screen

                    name="Requests"
                    // component={Communities}
                    children={(props) => <Communities navigation={navigation} token={token} />}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text allowFontScaling={false} style={[
                                styles.tabbarpill, {
                                    color: focused ? "#00DE62" : "#808080",
                                    borderColor: focused ? "#00DE62" : "#808080",
                                }
                            ]}> Communities
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
        marginVertical: 5,
        marginBottom: 10,
        marginLeft: 20,
        fontFamily: "myanmar",
    },
    searchContainer: {
        marginHorizontal: 15,
        marginBottom: 6,
    },
    searchInput: {
        height: 45,
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



    tabbarpill: {
        // borderWidth: 1,
        // borderRadius: 30,
        // textAlign: "center",
        // height: 50,
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "flex-start",
        // width: width * 0.44,
        // // zIndex: 100,
        // fontFamily: "Alata",
        // fontSize: 20,
        // textAlign: "center",
        // textAlignVertical: "center",
        // // paddingTop : 4,
        // textTransform: "capitalize",
        // borderWidth: 1,
        // borderRadius: 30,

        fontSize: 16,
        fontFamily: "Alata",
       
    },
    search: {
        position: "absolute",
        right: 12,
        top: 10,
        alignSelf: "center",
    },
});
