import React from "react";
import { Dimensions, StyleSheet, PixelRatio } from "react-native"


const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;


const scalingfactor = Math.sqrt(a * b)



const s5 = StyleSheet.create({
    t1: {
        textAlign: 'center',
        color: "#828282",
        fontFamily: "Roboto",
        fontSize: 12,
        marginTop: 70,
        // zIndex : 100,
        // backgroundColor : "red"
    }

    , input: {
        backgroundColor: "transparent",
        // backgroundColor: "red",
        margin: height * 0.016,
        marginTop: 0,
        borderBottomWidth: 1,
        // borderRadius : 20,
        paddingLeft: scalingfactor * 10,
        borderBottomColor: "#ccc",
        fontSize:  20, // Responsive font size
        color: "#ccc",
        // paddingBottom: scalingfactor * 5,
        width: "92%",
        paddingBottom : 8,
        fontFamily: "Alata",
        fontWeight: '0',
        marginTop: scalingfactor * 10,
    },

    bottom: {
        width: "100%",
        // height: height * 0.85,
        flex: 1,
        backgroundColor: "#24272A",
        backgroundColor : "rgba(33, 34, 35, 0.5)",
        // backgroundColor: "yellow",
        borderTopLeftRadius: 70,
        height : height * 0.85,
        alignContent: "center",
        padding: scalingfactor * 20,
        paddingBottom : 0,
        paddingTop: scalingfactor * 25,

        
    }, icons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        margin: "auto",
        paddingHorizontal : "4%",
        position: "absolute",
        margin : "auto",
        bottom: 30,
        // backgroundColor : "#24272A",
        // paddingBottom : 50,
        // marginTop : 80

    }, dropdown: {
        position: "absolute",
        right: 20,
        top: 3,
        // transform: [{ rotate: '180deg' }]
    },
    dropdownbox: {
        position: "absolute",
        backgroundColor: "gray",
        width: "82%",
        borderRadius: 10,
        // margin : "auto",
        alignSelf: "center",
        zIndex: 3,
        height: 200,
        opacity: 0.98,
        elevation: 3,
        overflow: "hidden"

    },

    dropdownItem: {
        padding: 10,
        borderBottomColor: "black",
        borderBottomWidth: 1
    },
    dropdownText: {
        color: '#B8B8B8',
        fontFamily: "abeeze",
        fontSize: scalingfactor * 20
    },
    nexttext: {
        color: "#24272A",
        fontFamily: "Alata",
        fontSize: scalingfactor * 18,
        textAlign: "center",
        // lineHeight : 16
        marginTop: -4

    },

    btn : {
        width: 90,
        marginRight : 0,
        height: 42,
        backgroundColor: "#00DF60",
        borderRadius: 20,
        shadowColor: 'rgba(0,0,0, 0.5)',
        shadowOffset: {
            width: 0, // x offset
            height: 5, // y offset
        },
        shadowOpacity: 1, // Full opacity for shadow effect
        shadowRadius: 1, // Blur radius
        elevation: 5,
        justifyContent: 'center',
    }
})


export default s5