
import { useFocusEffect, useNavigation } from "expo-router";
import React, { useCallback , memo } from "react";
import { Text, View, StyleSheet } from "react-native";
// import { jwtDecode } from "jwt-decode";
import Upvotedata from "./Upvotedata.js"

const Notification = ({ navigation , token , closeall}) => {
    // const navigation = useNavigation()
    console.log("notfication re render");
    // var decode = jwtDecode(token)
    useFocusEffect(
        useCallback(() => { closeall() }, [])
    )
    return (
        <View style={{
            flex: 1, backgroundColor: "#16181a"
        }}>
            <Text allowFontScaling={false} style={styles.headerText}>Notification</Text>
            <Upvotedata token={token}  />
        </View>
    )
}

export default memo(Notification)

const styles = StyleSheet.create({
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#00DE62",
        marginBottom: 0,
        fontFamily: "myanmar",
        color: "#00DE62",
        paddingLeft: 15
    },
});