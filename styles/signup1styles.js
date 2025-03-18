import React from "react";
import { Dimensions, StyleSheet, PixelRatio } from "react-native"

const ratio = PixelRatio.get();
const { height, width } = Dimensions.get("window")
console.log(ratio, "ratio");
var a = width / 360;
var b = height / 800;
// console.log(a, b);

const scalingfactor = Math.sqrt(a * b)

// console.log(width);
// console.log(height);
// console.log(scalingfactor);


const signupstyles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#16181a",
        justifyContent: "center",
        alignContent: "center",
    },
    row: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignContent: "center",
    },
    top: {
        width: "100%",
        height: height * 0.3,
        backgroundColor: "#16181a",
        justifyContent: "center",
        alignContent: "center",
    },
    logo: {
        // margin: "auto",
        resizeMode: "contain",
        flex: 0.8,
        // justifyContent: "center",
        // textAlign: "center",
        alignSelf: "center",
    },
    bottom: {
        height: height * 0.7,
        margin: "auto",
        width: "100%",
        backgroundColor: "#24272A",
        borderTopLeftRadius: 70,
        padding: height * 0.03,
        paddingTop: height * 0.05,
        alignSelf: "flex-end",
        // justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        backgroundColor : "rgba(33, 34, 35, 0.5)",

    },
    error : {
        marginVertical :15,
        marginTop  :0,
        textAlign : "center",
        // backgroundColor : "red",
        width  : "85%",
        marginHorizontal : "auto",
        color : "#E65858",
        fontSize : 15,
        fontFamily : "Roboto",

    },
    t1: {
        fontFamily: "Alata",
        fontSize: scalingfactor * 24,
        color: "white",
        textAlign: "center",
        marginBottom: scalingfactor * 8,

    },
    t2: {
        fontFamily: "Roboto",
        fontSize: scalingfactor * 15,
        color: "#94A3B8",
        textAlign: "center",
        marginBottom: scalingfactor * 30,


    },
    input: {
        // height: height * 0.045, // Responsive height
        backgroundColor: "transparent",
        margin: height * 0.016,
        marginTop: 0,
        borderBottomWidth: 3,
        // borderRadius : 20,
        paddingLeft: scalingfactor * 10,
        borderBottomColor: "#16181A",
        fontSize: scalingfactor * 20, // Responsive font size
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 10,
        width: "92%",
        fontFamily: "Alata",
        // lineHeight: scalingfactor * 18,
        
    },
    input2: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        marginTop: 0,
        borderBottomWidth: 3,
        // borderRadius : 20,
        paddingLeft: scalingfactor * 10,
        borderBottomColor: "#16181A",
        fontSize: scalingfactor * 20, // Responsive font size
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 10,
        width: "92%",
        marginTop : 15,
        fontFamily: "Alata",
    },
    next: {
        backgroundColor: "#00DF60",
        width: "92%",
        padding: 10,
        marginVertical: height * 0.018,
        borderRadius: 20,
        margin: "auto",
        marginTop: scalingfactor * 20,
        minHeight : 45
    },
    nexttext: {
        color: "#24272A",
        fontFamily: "Alata",
        fontSize: scalingfactor * 24,
        textAlign: "center",
        // lineHeight : 16
        marginTop: -4

    },
    back: {
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 20
    },
    backicon: {
        transform: [{ scale: 1.1 }],
        zIndex: 20
    }





})


export default signupstyles