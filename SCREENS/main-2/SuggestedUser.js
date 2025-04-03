


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
import { useFocusEffect, useNavigation } from "expo-router";
import { url } from "../../config.js"
import { GlobalContext } from "@/Global/globalcontext.js";
import { jwtDecode } from "jwt-decode";


const User = memo(({ handleTabChange, token , navigation , suggestionarray , setsuggestionarray }) => {

    const scrollPosition = useRef(0);
    const listRef = useRef(null);
    const [loggedinuserid, setloggedin] = useState("");
    const handleScroll = (event) => {
        scrollPosition.current = event.nativeEvent.contentOffset.y;
    };
    // const [suggestionarray, setsuggestionarray] = useState([])
    const [refreshing1, setRefreshing1] = useState(false)

    var decode = jwtDecode(token)
    useEffect(() => {
        if (token) {
            console.log(decode);
            setloggedin(decode._id)
        }
    }, [token])


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

    async function searchUser() {

        // console.log("user search");
        // var final = `@${text1}`
        var final = `showAllUser`
        // var final = `@c`
        try {
            const response = await fetch(`${url}api/getUserNameSuggestions/${final}`, {
                method: 'GET',
                headers: {
                    accept: "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data);
            var filterUser = data.data.filter(e => e._id != loggedinuserid)

            setsuggestionarray(filterUser)

        }
        catch (err) {
            console.log(err);

        }
        finally {
            setRefreshing1(false)
        }
    }



    async function sendfollowrequest(stat, id) {

        // if (stat) return

        // console.log(stat);
        // console.log(stat);
        // console.log(stat);
        // console.log(stat);
        // console.log(stat);

        if (stat == "Connected" || stat == "Request Sent") {

            // setconnecteddata("Follow")


            async function makesubmit() {
                setsuggestionarray((prevArray) =>
                    prevArray.map((e) =>
                        e._id === id ? { ...e, status: "Connect" } : e
                    )
                );

                try {
                    const response = await fetch(`${url}founder/rejectRequest/${id}`, {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    })
                    const data = await response.json();
                    console.log(data);



                }
                catch (err) {
                    console.log(err);

                }
            }
            makesubmit()
            return
        }


        setsuggestionarray((prevArray) =>
            prevArray.map((e) =>
                e._id === id ? { ...e, status: "Request Sent" } : e
            )
        );



        // console.log(id);
        try {

            const response = await fetch(`${url}connections/followUser/${id}`, {
                method: 'POST',
                body: "",
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data);
            // console.log(response.status);

            // setfollowstatus("request sent")
            // setconnecteddata("Request sent")

        }
        catch (err) {
            console.log(err);

        }

    }



    function renderSuggestion({ item }) {


        if (item.role == "Admin") return
        if (item._id == loggedinuserid) return
        console.log(decode.role);
        
        // if(decode.role == "Investor" && item.role != "Investor") return
        return (
            // <Text style={{color : "#fff"}}>hello</Text>
            <TouchableOpacity onPress={() => {
                navigation.navigate("Singleuserpage", { token: token, id: item._id, page: "NewsLetter" })
            }}>
                <View style={[styles.listItem, {}]}>
                    {/* <Image
                        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8slgZXgqnSIXDS8wF2uDT_SmsYlBe-W1soQ&s" }}
                        style={styles.avatar} /> */}
                    {!item.profilePhoto && <Image style={styles.avatar} source={require("../../assets/images/blank.png")} />}
                    {item.profilePhoto && <Image style={styles.avatar} source={{ uri: item.profilePhoto }} />}




                    <View style={styles.textContainer}>
                        <Text numberOfLines={1}

                            allowFontScaling={false} style={styles.username}>{item.userName}</Text>
                        <Text allowFontScaling={false} style={styles.message}>{item.role == "CommunityMember" ? "Member" : item.role}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => { sendfollowrequest(item.status, item._id) }}
                        style={item.status != "Connect" ? styles.sendbtn1 : styles.sendbtn}>

                        {item.status == "Connect" && <Text style={{ color: "#16181a", fontFamily: "Alata", alignItems: "center", textAlign: "center", marginTop: -2, fontSize: 14, }}>{item.status}</Text>}

                        {item.status == "Request Sent" && <Text style={{ color: "#ccc", fontFamily: "Alata", alignItems: "center", textAlign: "center", marginTop: -2, fontSize: 14, }}>{item.status}</Text>}

                        {item.status == "Connected" && <Text style={{ color: "#ccc", fontFamily: "Alata", alignItems: "center", textAlign: "center", marginTop: -2, fontSize: 14, }}>{item.status}</Text>}
                    </TouchableOpacity>
                    {/* <Text allowFontScaling={false} style={styles.time}> "today"}</Text> */}
                </View>
            </TouchableOpacity>
        )
    }


    useFocusEffect(
        useCallback(() => {
            handleTabChange("users")
        })
    )

    useEffect(()=>{
        console.log("suggestion array changes");
        console.log(suggestionarray.length);
        
        
    } , [suggestionarray])
    return (


        <View style={{ flex: 1, backgroundColor: "#16181a" }}>


            <FlatList
                keyExtractor={(item, index) => index}
                data={suggestionarray}
                ref={listRef}
                renderItem={renderSuggestion}
                onScroll={handleScroll}
                style={[styles.suggestionbox]}
                contentContainerStyle={{ paddingBottom: 100 }}
                extraData={suggestionarray}
                getItemLayout={(data, index) => ({ length: 200, offset: 200 * index, index })}
                maintainVisibleContentPosition={{ minIndexForVisible: 20 }}
                onContentSizeChange={() => {
                    if (listRef.current) {
                        listRef.current.scrollToOffset({ offset: scrollPosition.current, animated: false });
                    }
                }}

                refreshControl={
                    <RefreshControl
                        progressBackgroundColor="#16181a"
                        colors={['#00de62']}
                        onRefresh={() => {
                            setRefreshing1(true)
                            // Vibration.vibrate(200)
                            searchUser()
                            setTimeout(() => {
                                setRefreshing1(false)
                            }, 2000);

                        }} refreshing={refreshing1} />
                }


            />
        </View>


    )
})


export default User


const styles = StyleSheet.create({
    
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
    textContainer: {
        flex: 1,
        alignSelf: "flex-start",
    },
})