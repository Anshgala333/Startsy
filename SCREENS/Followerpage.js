import React, { Component, useEffect, useState } from 'react'
import { FlatList, SafeAreaView, Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { url } from '../config.js'
const Followerpage = ({ route }) => {
    




    var { people,token } = route.params;


    console.log(people);


    const [suggestionarray, setsuggestionarray] = useState([])



    useEffect(()=>{
        setsuggestionarray(people);
    },[people])



    async function sendfollowrequest(stat, id) {
    
    
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

        // console.log(suggestionarray);
        



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


    // console.log(people);

    function renderSuggestion({ item }) {
        console.log(item);
        return (
            // <Text style={{color : "#fff"}}>hello</Text>
            <TouchableOpacity onPress={() => {
                // navigation.navigate("Singleuserpage", { token: token, id: item._id, page: "NewsLetter" })

            }}>
                <View style={[styles.listItem, {}]}>
                    {/* <Image
                                    source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8slgZXgqnSIXDS8wF2uDT_SmsYlBe-W1soQ&s" }}
                                    style={styles.avatar} /> */}
                    {!item.profilePhoto && <Image style={styles.avatar} source={require("../assets/images/blank.png")} />}
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

                        {item.status=="Connected" && <Text style={{ color: "#ccc", fontFamily: "Alata", alignItems: "center", textAlign: "center", marginTop: -2, fontSize: 14, }}>Connected</Text>}
                    </TouchableOpacity>
                    {/* <Text allowFontScaling={false} style={styles.time}> "today"}</Text> */}
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#16181a" }}>

            <View><Text allowFontScaling={false} style={styles.headerText}>Connections</Text></View>


            <FlatList
                data={suggestionarray}
                renderItem={renderSuggestion}
            />
        </SafeAreaView>
    )

}

export default Followerpage



const styles = StyleSheet.create({
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,

        borderBottomWidth: 1,
        borderBottomColor: "#333",
        alignSelf: "flex-start",
        width: "92%",
        width: "90%",
        marginVertical: 5,
        paddingHorizontal: 10,
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
    textContainer: {
        flex: 1,
        alignSelf: "flex-start",
    },
    username: {
        fontSize: 20,
        color: "#B8B8B8",
        fontFamily: "Alata",
        alignSelf: "flex-start",
        marginTop: 0,
        marginBottom: 0
    },
    headerText: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#00DE62",
        marginBottom: 12,
        fontFamily: "myanmar",
        color: "#00DE62",
        paddingLeft: 15
    },
    message: {
        color: '#00de62'
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
    connectedTextStyle: {
        color: "#16181a",
        fontFamily: "Alata",
        alignItems: "center",
        textAlign: "center",
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
})
