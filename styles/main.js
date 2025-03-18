import React from "react";
import { Dimensions, StyleSheet, PixelRatio } from "react-native"


const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;


const scalingfactor = Math.sqrt(a * b)
const main = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#16181A"
        backgroundColor: "red"
    },
    header: {
        height: 55,
        textAlign: "left",
        backgroundColor: "#16181a",
        // backgroundColor : "transparent",
        // position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1,
        // backgroundColor : "red",


    },
    header1: {
        height: 55,
        textAlign: "left",
        backgroundColor: "#16181a",
        // backgroundColor : "transparent",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1,
        // backgroundColor : "red",


    },

    headertext: {
        // color: "#00DE62",
        // fontSize:  30,
        // fontFamily: "myanmar",
        // fontWeight: "bold",
        // paddingTop: 5,
        // backgroundColor : "#16181a",
        // paddingHorizontal: 20,
        // zIndex: 100,

        fontSize: 35,
        fontWeight: "bold",
        color: "#00DE62",
        marginBottom: 12,
        fontFamily: "myanmar",
        backgroundColor: "#16181a",

        color: "#00DE62",
        paddingLeft: 15

    },
    scroll: {
        paddingTop: 60,
        // position : "absolute",
        // top : 60,
        maxHeight: 1 * height,
        overflow: "scroll",
        backgroundColor: "#16181A",
        // zIndex : 100,
        // backgroundColor : "red"
        // elevation : 1000
    },
    // scroll1: {


    //     maxHeight: 1 * height,
    //     zIndex : 1,
    //     overflow: "scroll",
    //     backgroundColor: "#16181A",
    // },
    scroll1: {


        maxHeight: 1 * height,
        zIndex: 2,
        position: "relative",
        top: 0,
        left: 0,
        overflow: "scroll",
        backgroundColor: "#16181A",
    }
})


export default main