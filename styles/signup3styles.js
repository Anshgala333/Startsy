import React from "react";
import { Dimensions, StyleSheet, PixelRatio } from "react-native"


const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;


const scalingfactor = Math.sqrt(a * b)



const signup3styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow :1,
        // minHeight : 1000,
        // justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: "#16181a",
        // backgroundColor: "red",
        zIndex : 100,
        // maxHeight  : 1000
    },
    row: {
        flex: 1,
        // minHeight : 2000,
        // paddingBottom : 300,
        flexGrow  : 1
    }
    , top: {
        width: "100%",
        height: height * 0.15,
        display: "flex",
        flexDirection: "row",
        marginBottom : 0,
        backgroundColor: "#16181a",

    },
    left: {
        height: "100%",
        width: width * 0.3,
        justifyContent: "center",
        alignContent: "center"

    },
    right: {
        height: "100%",
        width: width * 0.7,
        // backgroundColor : "red",
        justifyContent: "center",
        alignContent: "center",
        overflow : "hidden"
    },
    logo: {
        flex: 0.8,
        // margin : "auto",
        resizeMode: "contain",
        alignSelf: "center",
    },
    bottom: {
        width: "100%",
        height: height * 0.85,
        backgroundColor: "#24272A",
        // backgroundColor: "red",
        borderTopLeftRadius: 70,
        padding: height * 0.03,
        paddingTop: height * 0.06,
        // justifyContent: "center",
        alignContent: "center",
        padding : scalingfactor*20,
        paddingTop : scalingfactor*50,
        paddingBottom : 0
    },
    line: {
        width: "85%",
        alignSelf: "flex-start",
        marginLeft: 10,
        height: 5,
        borderRadius: 10,
        backgroundColor: "#00DE62"
        , position: "relative",
    },
    c: {
        width: 12,
        height: 12,
        borderRadius: 50,
        backgroundColor: "#00DE62",
        position: "absolute",
        top: -3

    },
    c1: {
        left: 0,
        marginLeft: -3
    },
    c2: {
        left: "25%",
        marginLeft: -3
    },
    c3: {
        left: "50%",
        marginLeft: -3
    },
    c4: {
        left: "75%",
        marginLeft: -3
    },
    c5: {
        left: "100%",
        marginLeft: -3
    },
    n1: {
        left: "25%",
    },
    n2: {
        left: "50%",
    },
    n3: {
        left: "75%",
    },
    n4: {
        left: "100%",
    },
    n: {
        position: "absolute",
        top: 15,
        marginLeft : -5
    },
    ntext: {
        color: "#00DE62",
        marginLeft: 5,
        // fontFamily : "montserat",
        fontSize : 15
    },
    progress : {
        position : "absolute",
        left : 0,
        borderWidth: 0.2,
        width: "31.5%",
        backgroundColor: "transparent",
        left: 0,
        height: 14,
        top: -5,
        opacity : 1,
        borderStyle: "solid",
        marginLeft : -5,
        borderRadius : 20
    },
    t1 : {
        color : "#D9D9D9",
        fontFamily : "Alata",
        lineHeight : scalingfactor*30,
        fontSize : scalingfactor*20,
        textAlign : "center",
    },
    t2 : {
        color : "#D9D9D9",
        fontFamily : "Alata",
        lineHeight : scalingfactor*30,
        fontSize : 20,
        textAlign : "center",
        marginTop : scalingfactor*20,
        marginBottom : scalingfactor* 20
    },
    errorText : {
        marginVertical :15,
        marginTop  :0,
        textAlign : "left",
        // backgroundColor : "red",
        width  : "92%",
        marginHorizontal : "auto",
        color : "#E65858",
        fontSize : 12,
        fontFamily : "Roboto",
        marginTop : 5
    }
})


export default signup3styles