import React from "react";
import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;


const scalingfactor = Math.sqrt(a * b)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: "#16181a"

    },
    divider: {
        width: "110%",
        marginLeft: -20,
        height: 3,
        marginTop: 5,
        marginBottom: 20,
        backgroundColor: "#24272A"
    },
    box: {
        width: width * 0.96,
        height: "auto",
        // height: 100,
        margin: 10,
        backgroundColor: "#1A1D1F",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        margin: "auto",
        marginBottom: 25,
        paddingVertical: 10,
        // opacity : 0.5

    },
    boxText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    template: {
        width: width * 0.9,
        // aspectRatio : 1/1,
        objectFit: "cover",
        marginTop: 5,

        borderRadius: 10,
        // height: 182,
        // maxHeight: 182
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
        paddingLeft: 5,
        // marginTop :
    },
    u1: {
        fontFamily: "Alata",
        fontSize: 20,
        color: "#E9E9E9"
    },
    temp: {
        fontFamily: "Alata",
        fontSize: 20,
        color: "#E9E9E9"
    },
    u2: {
        fontFamily: "Roboto",
        fontSize: 11,
        color: "#00DE62"
    },
    u3: {
        fontFamily: "Roboto",
        fontSize: 14,
        color: "#B8B8B8"
    },
    u4: {
        fontFamily: "Roboto",
        fontSize: 11,
        color: "#777",
        marginTop: 3
    },
    upvote: {
        marginRight: -3
    },
    upvote1: {
        marginRight: -3,
        width: 28,
        height: 36

    },
    count: {
        alignSelf: "flex-end",
        fontFamily: "Roboto",
        fontSize: 13,
        color: "#00DE62",
        marginLeft: -2
    },
    lower: {
        display: "flex",
        // flexDirection: "row",
        width: "95%",
        marginHorizontal: "auto",
        marginTop: 10,
        paddingLeft: 5,
        // justifyContent: "space-between"
    },
    iconcontainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "95%",
        marginHorizontal: "auto",
        marginTop: 10
    }
    , icon2: {
        display: "flex",
        flexDirection: "row",
        // justifyContent : "space-between",
        // width : "90%",
        // marginHorizontal : "auto"
        gap: 5
    },
    com1: {
        fontFamily: "Alata",
        color: "#B8B8B8",
        fontSize: 36,
        marginBottom: 12
    },
    com2: {
        // fontFamily: "Roboto",
        color: "#999",
        fontSize: 14,
        marginBottom: 10
    },
    u7: {
        fontFamily: "Roboto",
        color: "#00de62",
        fontSize: 14,
        marginVertical: 16
    },
    u8: {
        fontFamily: "Roboto",
        color: "#00DE62",
        fontSize: 13,
        marginVertical: 2
    },
    desc1: {
        fontFamily: "Roboto",
        color: "#D9D9D9",
        fontWeight: "bold",
        fontSize: 14,
        marginTop : -10
        // marginBottom : -10
    }, u6: {
        fontFamily: "Roboto",
        color: "#999",
        fontSize: 14,
        marginTop : -10,
        marginBottom : 5
    },
    next: {
        backgroundColor: "#ccc",
        borderRadius: 30,
        margin: "auto",
        width: 130,
        // padding : 10,
        paddingHorizontal: 10,
        height: 40,
        // marginRight  : 20,
        marginBottom: 8,
        marginTop: 10,
        // width : 100,
        // alignSelf: "flex-end",
        justifyContent: "center",
        // backgroundColor : "red"
    },
    job: {
        backgroundColor: "#ccc",
        borderRadius: 30,
        margin: "auto",
        // width  : 180,
        // padding : 10,
        paddingHorizontal: 10,
        height: 40,
        // marginRight  : 20,
        marginBottom: 8,
        marginTop: 10,
        width: 100,
        // alignSelf: "flex-end",
        justifyContent: "center",
        // backgroundColor : "red"
    },
    next11: {
        backgroundColor: "#ccc",
        borderRadius: 30,
        margin: "auto",
        // padding : 10,
        paddingHorizontal: 20,
        height: 35,
        width: 100,
        // marginRight  : 20,
        marginBottom: 12,
        alignSelf: "flex-start",
        marginTop: 10,

        justifyContent: "center",
    },
    next1: {
        // width: 180,
        // // padding : 10,
        // // paddingHorizontal: 10,
        // backgroundColor: "#ccc",
        // // backgroundColor: "red",
        // borderRadius: 30,
        // margin: "auto",
        // // padding : 10,
        // // paddingHorizontal: 20,
        // height: 40,
        // // marginRight  : 20,
        // marginBottom: 10,
        // alignSelf: "flex-start",
        // justifyContent: "center",
        backgroundColor: "#ccc",
        borderRadius: 30,
        margin: "auto",
        width: 130,
        // padding : 10,
        paddingHorizontal: 10,
        height: 40,
        // marginRight  : 20,
        marginBottom: 8,
        marginTop: 10,
        // width : 100,
        // alignSelf: "flex-end",
        justifyContent: "center",
    },
    nexttext: {
        color: "#24272A",
        fontFamily: "Alata",
        fontSize: scalingfactor * 16,
        textAlign: "center",
        marginTop: -4,
        justifyContent:'center',
        flexDirection:'row',
        alignSelf: "center",
       

    },
   
    nexttext1: {
        color: "#000",
        fontFamily: "Alata",
        fontSize: scalingfactor * 16,
        textAlign: "center",
        alignSelf: "center",
        justifyContent: "center",
        width: 150,                
        height: 50,                 
        lineHeight: 50, 
        

    },

    // add: {
    //     // position: "absolute",
    //     bottom: 80,
    //     width : 50,
    //     elevation: 19,
    //     right: 20,
    //     alignSelf : "flex-end",
    //     backgroundColor: "#16181a",
    //     borderRadius: 100,
    //     // zIndex  : 100,

    // },
    add: {
        position: "absolute",
        bottom: 70,
        width: 50,
        elevation: 19,
        right: 20,
        alignSelf: "flex-end",
        backgroundColor: "#16181a",
        borderRadius: 100,
        zIndex: 1000,

    },
    bottomSheetContent: {
        display: "flex",
        flexDirection: "row",
        width: "94%",
        // height : "50%",
        marginHorizontal: "auto",
        justifyContent: "space-around",
        // backgroundColor  :"red",
        marginTop: 20
    }, iconButton: {
        display: "flex",
        width: "20%",
        height: "98%",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        alignContent: "center",
        // backgroundColor: "red",
        minWidth: "24%",
        // backgroundColor : "red",

    }, bottomsheettext: {
        textAlign: "center",
        fontSize: 12,
        color: "#B8B8B8",
        fontFamily: "Roboto",
        marginTop: 12
    },
    ic: {
        // flex : 1,
        // width : "100%",
        // // height : "100%",
        // backgroundColor : "red",
        marginHorizontal: "auto",
        justifyContent: "center",
        alignSelf: "center",
    }
    , input: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        marginTop: 0,
        borderBottomWidth: 1,
        // borderRadius : 20,
        paddingLeft: scalingfactor * 10,
        borderBottomColor: "#ccc",
        fontSize: scalingfactor * 20, // Responsive font size
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 5,
        width: "92%",
        marginHorizontal: "auto",
        // fontFamily: "Roboto",
        // lineHeight: scalingfactor * 18,
        marginBottom: scalingfactor * 25,
    },
    t2: {
        textAlign: 'Left',
        color: "#94A3B8",
        fontFamily: 'Roboto',
        fontSize: scalingfactor * 13,

        marginBottom: scalingfactor * 8,
        width: "85%",
        alignSelf: "center",
        lineHeight: scalingfactor * 16
    },
    count: {
        fontSize: 14,
        position: "absolute",
        bottom: 25,
        right: 25,
        // backgroundColor: "red",
        width: "auto"
    },
    input1: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        marginTop: 0,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#bbbbbb",
        fontSize: scalingfactor * 20,
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 5,
        width: "92%",
        fontFamily: "Roboto",
        lineHeight: scalingfactor * 18,
        marginBottom: scalingfactor * 25,
        height: 150,
        marginTop: 10,
        padding: 10,
        textAlignVertical: "top",
        paddingBottom: 30,

    },
    post: {
        backgroundColor: "#00DE62",
        borderRadius: 20,
        height: 40,
        width: 110,
        justifyContent: "center",
        margin: "auto",
        alignSelf: "center",
        marginVertical: 40,
        textAlign: "center",
    },
    posttext: {
        textAlign: "center",
        color: "#16181A",
        fontFamily: "Alata",
        fontSize: 20,
        marginTop: -5

    },
    dropdownbox: {
        height: "auto",
        // backgroundColor : "red",
        paddingBottom: 10,
        margin: "auto",
        width: "92%",
        paddingLeft: 10,
        borderBottomWidth: 3,
        borderColor: '#16181A',
    }
    , icon: {
        position: "absolute",
        top: 20,
        right: 20
    },
    bottomsheettext1: {
        fontSize: 20,
        width: "92%",
        paddingLeft: 10,
        marginHorizontal: "auto",
        color: "#B8B8B8"
    },
    img: {
        margin: "auto",
        width: width * 0.9,
        aspectRatio: 1 / 1,
        // borderRadius: 100,
        marginBottom: 50,
        borderRadius: 16
    }
    , error: {
        color: "#E65858",
        textAlign: "left",
        marginLeft: 20,
        marginTop: -20,
        marginBottom: 20
    }
    , error1: {
        color: "#E65858",
        textAlign: "left",
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 20
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#333",
        alignSelf: "flex-start",
        width: "92%",
        marginHorizontal: "auto"
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
        alignSelf: "flex-start"
    },
    textContainer: {
        flex: 1,
        alignSelf: "flex-start",
    },
    username: {
        fontSize: 18,
        color: "#fff",
        fontFamily: "Alata",
        alignSelf: "flex-start",
        marginTop: 0,
        marginBottom: 5
    },
    message: {
        fontSize: 14,
        color: "#B8B8B8",
        marginTop: -3,
        width: "92%",
        // backgroundColor : "red"
    },
    time: {
        fontSize: 12,
        color: "#B8B8B8",
        fontFamily: "Roboto",
        position: "absolute",
        top: 20,
        right: 0
    },

    searchContainer: {
        height: 100,
        // backgroundColor: "yellow",
        // bottom : 0
        // position: "absolute",
        top: 10,
        width: "100%",





    },

    input111: {
        borderRadius: 5, padding: 10,
        borderColor: "#00DE62",
        borderWidth: 2,
        width: "100%",
        height: 50,
        paddingRight: 45,
        color: "#bbbbbb",
        borderRadius: 30
    },

    sc1: {
        height: 50,
        // marginBottom: 20,
        // backgroundColor: "#16181a",
        // backgroundColor: "red",
        position: "relative",
        // bottom: 50,




    },
    searchInput: {
        width: width * 0.99,
        minHeight: 45,
        paddingTop: 10,
        color: "#828282",
        borderColor: "#00DE62",
        borderWidth: 1,
        borderRadius: 30,
        // paddingHorizontal : 20,
        paddingLeft: 20,
        fontFamily: "Roboto",
        marginBottom: 20,
        fontSize: 18,
        paddingBottom: 10,
        alignSelf: "flex-start",
        backgroundColor: "transparent",
        maxHeight: 200,
        // backgroundColor : "red"

    },
    send: {
        // width: 20,
        // height: 20,
        position: "absolute",
        top: 20,
        right: 25,
        transform: [{ scale: 1 }],
        alignSelf: "center",
        verticalAlign: "center",
        bottom: 0,
    },
    send1: {
        // width: 20,
        // height: 20,
        position: "absolute",
        top: 10,
        right: 25,
        transform: [{ scale: 1 }],
        alignSelf: "center",
        verticalAlign: "center",
        bottom: 0,
    },
    comment: {
        fontFamily: "Roboto",
        color: "#bbbbbb",
        fontSize: 24,
        marginVertical: 10,
        textAlign: "center",

    },
    blogtext: {
        textAlign: "left",
        width: "92%",
        paddingHorizontal: 5,
        marginVertical: 10,
        color: "#ccc",
        fontSize: 16,
        // fontFamily: "Roboto",

    },

    no: {
        textAlign: "center",
        color: "#B8B8B8",
        fontFamily: "Roboto",
        fontSize: 22,
        margin: "auto",
        justifyContent: "center",
        marginTop: 200,
        alignSelf: "center",
    },
    divider: {
        width: "100%",
        // marginLeft: -20,
        height: 1,
        marginTop: 5,
        marginHorizontal: "auto",
        // marginBottom: 20,
        backgroundColor: "#24272A"
    },

    jobBtn: {

        backgroundColor: "#ccc",
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 40,
        borderRadius: 20,
        marginHorizontal: 7,
        marginTop: 10
    },

    jobtext: {
        fontFamily: "Alata",
        textAlign: "center",
        fontSize: 16,
        marginTop: -5,
        color: "#000"
    },
    hubsSelected: {
        fontFamily: "Alata",
        textAlign: "center",
        fontSize: 16,
        marginTop: -5,
        color: "#000"
    }
    ,
    Jobbtn: {
        backgroundColor: "#16181a",
        borderRadius: 30,
        margin: "auto",
        width: "93%",
        paddingHorizontal: 10,
        // height: 40,
        paddingVertical : 10,
        marginBottom: 20,
        paddingTop : 8,
        paddingBottom : 8,
        marginTop: -10,
        justifyContent: "center",
        borderWidth : 1,
        borderColor : "#ccc",
        justifyContent : "flex-start",
    },
    jobbtntext : {
        textAlign : "center",
        color : "#ccc",
        fontFamily : "Alata",
        fontSize : 18,
        verticalAlign : "top",
        paddingBottom : 5,
    }

});


export default styles