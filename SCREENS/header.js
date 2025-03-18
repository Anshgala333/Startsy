import React from "react";
import { FlatList } from "react-native";

import { Text, View, TextInput, StyleSheet } from "react-native"


const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.headertext}>hello</Text>
        </View>
    )
}


export default Header

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 300,
        backgroundColor: "black",
        // position : "absolute" , top : 0,marginTop : 0
    },
     headertext: {
        color: "#fff",
        fontSize : 30
    }
})