import React from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Upvote from "../assets/icons/upvote.js";
import Share from "../assets/icons/share.js";
import Feather from '@expo/vector-icons/Feather';

function Post() {
    return (
        <View style={styles.box}>
            <View style={styles.top} >
                <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                    <Image style={styles.userimg} source={require("../assets/images/p1.png")} />
                    <View style={styles.userdetail}>
                        <Text allowFontScaling={false} style={styles.u1}>raz.shhh</Text>
                        <Text allowFontScaling={false} style={styles.u2}>Founder</Text>
                    </View>
                </View>
            </View>
            <Image style={styles.template} source={require("../assets/images/template.png")} />

            <View style={styles.iconcontainer}>
                <View style={styles.icon2}>
                    <Upvote width={36} height={36} style={{ marginHorizontal: 22 }} />
                    <FontAwesome name="comment-o" size={30} color="#00DE62" />
                </View>

              
                <Feather name="bookmark" size={24} color="#00DE62" style={{ marginLeft: 10 }} />

                <Share style={{ marginTop: 5, marginRight: 10, right: 0 }} />
            </View>

            {/* <View style={styles.lower}>
                <Text allowFontScaling={false} style={styles.u3}>caption caption caption caption caption.</Text>
                <Pressable allowFontScaling={false} style={styles.u4}>
                    <Text style={styles.u4}>View 16 comments</Text>
                </Pressable>
            </View> */}
        </View>
    )
}

export default Post;

const styles = StyleSheet.create({
    box: {
        width: "100%",
        height: "auto",
        margin: 10,
        backgroundColor: "#1A1D1F",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        margin: "auto",
        marginBottom: 25,
        paddingVertical: 20,
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
    u2: {
        fontFamily: "Roboto",
        fontSize: 11,
        color: "#00DE62"
    },
    template: {
        width: "96%",
        borderRadius: 10,
        height: 182,
        maxHeight: 182
    },
    iconcontainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "95%",
        marginHorizontal: "auto",
        marginTop: 10
    },
    icon2: {
        display: "flex",
        flexDirection: "row",
        gap: 5
    },
    lower: {
        display: "flex",
        width: "95%",
        marginHorizontal: "auto",
        marginTop: 10,
        paddingLeft: 5,
    },
    u3: {
        fontFamily: "Roboto",
        fontSize: 14,
        color: "#B8B8B8"
    },
    u4: {
        fontFamily: "Roboto",
        fontSize: 10,
        color: "#00DE62",
        marginTop: 3
    },
})
