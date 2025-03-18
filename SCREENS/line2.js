import React, { useState, useRef, useEffect } from "react";
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

} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from 'expo-linear-gradient';

const Line2 = ({progresswidth})=>{
    return (

        <View style={styles.line}>
            <View style={[styles.c, styles.c1]}></View>
            <View style={[styles.c, styles.c2]}></View>
            <View style={[styles.c, styles.c3]}></View>
          
            <View style={[styles.n, styles.n1]}><Text style={styles.ntext}>1</Text></View>
            <View style={[styles.n, styles.n2]}><Text style={styles.ntext}>2</Text></View>
          
            <LinearGradient
                style={[styles.progress, {width : progresswidth}]}
                locations={[0, 0.8]}
                colors={['#8CBEA2', '#79b896']}
                start={{ x: 0, y: 0 }} // Starting point of the gradient
                end={{ x: 1, y: 0 }}
            />
        </View>

    )
}

export default Line2

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
    line: {
        width: "85%",
        alignSelf: "flex-start",
        marginLeft: 10,
        height: 5,
        // borderRadius: 10,
        backgroundColor: "#00DE62"
        , position: "relative",
    },
    c: {
        width: 10,
        height: 10,
        borderRadius: 50,
        backgroundColor: "#00DE62",
        // backgroundColor: "red",
        position: "absolute",
        top: -3

    },
    c1: {
        left: 0,
    },
    c2: {
        left: "50%",
    },
    c3: {
        left: "100%",
        marginLeft : -3
    },
   
    n1: {
        left: "50%",
    },
    n2: {
        left: "100%",
        marginLeft: -7

    },
    n3: {
        left: "75%",
    },
    
    n: {
        position: "absolute",
        top: 15,
        marginLeft: -4
    },
    ntext: {
        color: "#00DE62",
        marginLeft: 5,
        // fontFamily : "montserat",
        fontSize: 15
    },
    progress: {
        position: "absolute",
        left: 0,
        borderWidth: 0.2,
        backgroundColor: "transparent",
        left: 0,
        height: 14,
        top: -5,
        opacity: 1,
        borderStyle: "solid",
        marginLeft : -3,
        borderRadius: 20
    },
})