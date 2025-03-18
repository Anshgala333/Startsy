import React, { Component } from 'react'
import { FlatList, SafeAreaView, Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'

const Followerpage = ({ route }) => {
    // console.log(people);

    var { people } = route.params;

    function renderSuggestion({ item }) {
        return (
            // <Text style={{color : "#fff"}}>hello</Text>
            <TouchableOpacity onPress={() => {
                // navigation.navigate("Singleuserpage", { token: token, id: item._id, page: "NewsLetter" })
            }}>
                <View style={styles.listItem}>
                    {/* <Image
                                source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8slgZXgqnSIXDS8wF2uDT_SmsYlBe-W1soQ&s" }}
                                style={styles.avatar} /> */}
                    {!item.profilePhoto && <Image style={styles.avatar} source={require("../assets/images/blank.png")} />}
                    {item.profilePhoto && <Image style={styles.avatar} source={{ uri: item.profilePhoto }} />}

                    <View style={styles.textContainer}>
                        {/* <Text>{JSON.stringify(item)}</Text> */}
                        <Text allowFontScaling={false} style={styles.username}>{item.userName}</Text>
                        <Text allowFontScaling={false} style={styles.message}>{item.role == "CommunityMember" ? "Member" : item.role}</Text>
                    </View>
                    
                    {/* <Text allowFontScaling={false} style={styles.time}> "today"}</Text> */}
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#16181a" }}>

            <View><Text allowFontScaling={false} style={styles.headerText}>Connections</Text></View>


            <FlatList
                data={people}
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
})
