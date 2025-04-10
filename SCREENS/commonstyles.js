import * as React from "react";

import {Dimensions , StyleSheet, Text} from "react-native"

const { height, width } = Dimensions.get("window")
var a = width / 360;
var b = height / 800;

const scalingfactor = Math.sqrt(a * b)

export default styles = StyleSheet.create({
    t1: {
        textAlign: 'Left',
        marginLeft: 10,
        color: "#ccc",
        fontFamily: 'Alata',
        fontSize: 24,
        // backgroundColor : "red",
        width: "97%",
        marginBottom: scalingfactor * 3,
        pointerEvents: "none",
        zIndex : -1
    },
    thumb: {
        width: 30,
        height: 30
    },
    t2: {
        textAlign: 'Left',
        color: "#828282",
        fontFamily: 'Roboto',
        fontSize: scalingfactor * 12,

        marginBottom: scalingfactor * 8,
        width: "85%",
        alignSelf: "center",
        lineHeight: scalingfactor * 16
    },
    bottom: {
        width: "100%",
        // height: height*0.85,
        backgroundColor: "#24272A",
        // backgroundColor: "red",
        borderTopLeftRadius: 70,
        padding: height * 0.03,
        paddingTop: height * 0.06,
        // justifyContent: "center",
        alignContent: "center",
        padding: scalingfactor * 20,
        paddingTop: scalingfactor * 40,
        // overflow : "hidden",

    },

    input: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        marginTop: 0,
        borderWidth: 3,
        borderRadius: 20,
        borderColor: "#16181A",
        fontSize: scalingfactor * 20,
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 5,
        width: "92%",
        fontFamily: "Roboto",
        lineHeight: scalingfactor * 18,
        marginBottom: scalingfactor * 25,
        height: 190,
        marginTop: 10,
        padding: 10,
        textAlignVertical: "top",
        paddingBottom: 30,

    }
    , icons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "92%",
        margin: "auto",
        marginTop: 30,
        marginBottom: 30
    },

    btn: {
        width: "92%",
        height: 48,
        margin: "auto",
        backgroundColor: "transparent",
        borderRadius: 20,
        borderWidth: 3,
        borderColor: "#16181A",
        borderRadius: 10,
        marginBottom: 10,
        justifyContent: 'center',

    },
    btn1 : {
        width: 173,
        height: 40,
        margin: "auto",
        backgroundColor: "transparent",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 20,
        marginBottom: 0,
        marginTop: 10,
        justifyContent: 'center',
    },
     nexttext: {
        color: "#00DE62",
        fontFamily: "Alata",
        fontSize: 20,
        textAlign: "center",
        marginTop: -4

    },

    count: {
        fontSize: 14,
        position: "absolute",
        bottom: 25,
        right: 25,
        // backgroundColor: "red",
        width: "auto"
    },
    modal: {
        width: width,
        height: height,
        backgroundColor: "yellow",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,

    }
    , input1: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        marginTop: 0,
        borderBottomWidth: 3,
        // borderRadius : 20,
        paddingLeft: scalingfactor * 10,
        borderBottomColor: "#16181A",
        fontSize: scalingfactor * 20, // Responsive font size
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 5,
        width: "92%",
        fontFamily: "Roboto",
        lineHeight: scalingfactor * 18,
        marginBottom: scalingfactor * 25
    },
    des: {
        width: "92%",
        paddingLeft: scalingfactor * 10,
        fontFamily: "Roboto",
        textAlign: "left",
        fontSize: scalingfactor * 20,
        color: "#B8B8B8",
        alignSelf: "center",
    }, box: {
        // position: "absolute",
        width: 14,
        height: 14,
        borderRadius: 3,
        backgroundColor: "#00DE62",
        // top: -3,
        top: 22,
        elevation : 10
    },
    box1: {
        width: 14,
        elevation : 10,
        height: 14,
        borderRadius: 3,
        backgroundColor: "#00DE62",
        // top: -3,
        top: 8,
        backfaceVisibility: "hidden",

        left: "98%",
        marginLeft: -scalingfactor * 20
    }
    , sliderbox: {
        width: "90%",
        marginTop: -1,
        height: 5,
        margin: "auto",
        // borderWidth: 2,
        borderColor: "#00DE62",
        borderColor: "#00DE62",
        zIndex: 101,
        backgroundColor: "#00DE62",
        borderRadius: 20,
        pointerEvents: "auto",
        // elevation : 10
    }

})