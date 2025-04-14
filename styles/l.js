import React from "react";
// import {  Dimensions } from "react-native";
import { SafeAreaView, Text, Pressable, TextInput, View, Image, StyleSheet, Dimensions, StatusBar, Animated, PixelRatio } from "react-native";
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
const { width, height } = Dimensions.get("window");
const ratio = PixelRatio.get();

var a = width / 360;
var b = height / 800;
// console.log(a,b);

const scalingfactor = Math.sqrt(a * b)



const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // display: "flex",
        // backgroundColor: "#16181a",
        // position: "relative",
        // height: height,
        // width: "100%",
        // zIndex : 1,


        flex: 1,
        height: height,
        backgroundColor: "#16181a",
        backgroundColor: "red",
        justifyContent: "center",
        alignContent: "center",

    },
    animation: {
        position: "absolute",
        left: -20,
        top: -400,
        opacity: 1,
        width: width * 3,
        height: width * 3,
    },
    welcome: {
        color: "white",
        fontSize: width * 0.05, // Responsive font size (5% of screen width)
        margin: "auto",
    },
    top: {
        height: "100%",
        margin: "auto",
        padding: height * 0.0215,
        // backgroundColor: "#1E1E1E",
        justifyContent: "center",
        alignContent: "center",
        width: "100%",
        // height : height

    },

    scrollContainer: {
        marginTop: 200, // Adjust based on the height of your fixed block
    },
    bottom: {
        height: 0,
        // height : 0,
        margin: "auto",
        width: "100%",
        // backgroundColor: "#24272A",
        borderTopLeftRadius: 70,
        padding: height * 0.03,
        paddingTop: height * 0.06,
        alignSelf: "flex-end",
        backgroundColor: "rgba(33, 34, 35, 1)",
        height: 0,
        // display : "none"


    },
    logo: {
        // aspectRatio: 1,
        resizeMode: "contain",
        margin: "auto",
        alignSelf: "center",
        // paddingLeft : 20

    },
    initial: {
        width: width * 0.65,
        height: width * 0.65
    },
    updated: {
        // flex : 0.8,
        // height : Math.min(width*0.6 , 300),
        // aspectRatio: 1
        width: width * 0.65,
        height: width * 0.65
    },
    input: {
        // height: height * 0.045, // Responsive height
     
        // margin: height * 0.012,
   
        borderBottomWidth: 1,
        borderBottomColor: "white",
        fontSize: scalingfactor * 18, // Responsive font size
        color: "white",

        width: "95%",
        // paddingBottom : 10 ,
        // marginBottom : 30,
        fontFamily: "Alata",
        paddingBottom:8,
        paddingLeft:8
        // lineHeight : scalingfactor * 18
    },
    input2: {
        // height: 30, // Responsive height
        // backgroundColor: "transparent",
        // backgroundColor : "red",
        width : "75%",
       
        fontSize: scalingfactor*18, // Responsive font size
        // margin: height * 0.011,
        // marginTop: -2,
        color: "white",
        padding : 0 ,
        // paddingBottom: height * 0.012,
        fontFamily: "Alata",
        // lineHeight : scalingfactor * 20
        //marginBottom:40,
    },
    label: {
        margin: scalingfactor * -40,
        //marginTop: scalingfactor * 10,
        marginBottom: -4,
        color: "white",
        fontSize: scalingfactor * 16, // Responsive font size
        // marginBottom: height * 0.005,
        fontFamily: "Alata"
    },
    passwordcontainer: {
        // height : "30%",
        // marginTop: 20,
        position: "relative",
        padding:0,
        // backgroundColor : "red",
        borderBottomColor : "white",
        borderBottomWidth : 1,
        width : "95%",
        // marginHorizontal : "auto",
        // flexDirection:'row',
        // bottom:0
        paddingBottom:8,
        paddingStart:8,
        marginTop : 30,
    },
    forgot: {
        // position: "",
        // backgroundColor:'blue',
        width:'100%',
        // right: 10,
        // top: "20%",
        color: "white",
        fontFamily: "Alata",
        alignItems:'center',
        marginHorizontal:'auto',
        marginTop:16,


    },

    white: {
        color: "#C5C5C5",
        textAlign: "center",
        fontSize: width * 0.045, // Responsive font size
        fontFamily: "Alata"
    },
    forgotText: {
        fontSize: scalingfactor*15,
        fontFamily: "Alata",
        right:0,
        color:'#828282'
        // textAlign:'center'
        
    },
    loginbutton: {
        margin: "auto",
        // height: height * 0.07, // Responsive height
        width: "80%",
        height:  40,
        // paddingVertical: height * 0.018, // Responsive height
        backgroundColor: "#ccc",
        marginVertical: height * 0.014,
        borderRadius: 20,
        shadowColor: "black",
        shadowOpacity: 0.6,
        textAlign: "center",
        marginTop: height * 0.04,
        justifyContent: "center",
        alignItems: "center",
        // borderColor: "black",
        // borderWidth: 1,
        fontFamily: "Alata"

    },
    gray: {
        color: "#C5C5C5",
        fontSize: width * 0.042, // Responsive font size,
        fontFamily: "Alata"
    },
    green: {
        color: "#00DF60",
        fontSize: height * 0.022, // Responsive font size
        // marginBottom : 0
        fontFamily: "Alata"
    },
    login: {
        fontSize: scalingfactor * 18, // Responsive font size
        fontWeight: "500",
        fontFamily: "Alata",
        color: "#16181a",
        alignSelf: "center",
        marginTop: -4
        // lineHeight : 16.4

    },
    p: {
        textAlign: "center",
        // position:"absolute",
        // bottom:0,
        marginVertical: height * 0.016,
        fontSize: width * 0.042,
        fontFamily: "Alata"
    },
    googlebutton: {
        width: width * 0.4, // Responsive width
        flexDirection: "row",
        alignItems: "center",
        padding: height * 0.010,
        backgroundColor: "#fff",
        borderRadius: 20,
        margin: "auto",
        marginVertical: height * 0.0107,
        justifyContent: "center",
    },
    googleIcon: {
        width: height * 0.0258,
        height: height * 0.0258,
        marginRight: 10,
        marginTop: -2
    },
    google: {
        fontSize: width * 0.05, // Responsive font size
        fontWeight: "600",
        color: "gray",
        marginTop: -5

    },
    form1: {
        display: "none",
        overflowX: "hidden",
    },
    btn4: {
        backgroundColor: "#00DF60",
        width: "92%",
        height: scalingfactor * 58,
        // padding: height * 0.022,
        marginVertical: scalingfactor * 14,
        justifyContent: "center",
        alignContent: "center",
        borderRadius: 20,
        margin: "auto",
    },
    btn4text: {
        fontSize: scalingfactor * 24, // Responsive font size
        // fontSize : 30,
        color: "#24272A",
        textAlign: "center",
        fontWeight: "600",
        // letterSpacing: 1.5,
        fontFamily: "Alata"
        , marginTop: -5
    },
    newaccount: {
        fontSize: scalingfactor * 24, // Responsive font size
        color: "white",
        marginBottom: width * 0.04,
        fontFamily: "Alata",
        color: "#C5C5C5",
        textAlign: "center"
    },
    back: {
        position: "absolute",
        top: 20,
        left: 20,
        // backgroundColor  : "red",

    },
    backicon: {
        transform: [{ scale: 1.1 }],
        zIndex: 20
    },
    error : {
        marginVertical :0,
        marginTop  :6,
        textAlign : "left",
        // backgroundColor : "red",
        width: "92%",
        marginHorizontal: "auto",
        // color : "red",
        color: "#E65858",
        fontSize: 15,
        fontFamily: "Roboto",

    },
    error1: {
        marginVertical: 0,
        marginTop: 0,
        textAlign: "center",
        // backgroundColor : "red",
        width: "92%",
        marginHorizontal: "auto",
        // color : "red",
        color: "#E65858",
        fontSize: 15,
        fontFamily: "Roboto",

    },
    lastLine: {
        position: "absolute",
        bottom: 0,
        alignSelf: "center"
        // marginHorizontal : "auto"

    },
    divider : {
        width : "80%",
        marginHorizontal : "auto",
        marginVertical : 10,
        height : 0.5,
        backgroundColor : "gray",
        
    },
    or:{
        color : "#ccc",
        top : -10,
        fontFamily : "Roboto",
        paddingHorizontal : 8,
        borderRadius :20,
        backgroundColor : "rgba(33, 34, 35, 1)",
        alignSelf : "center",
        position : "absolute",
    },
});

export default styles;
