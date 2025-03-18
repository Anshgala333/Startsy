import { Dimensions, StyleSheet } from "react-native";
const { height, width } = Dimensions.get("window");


var a = width/360;
var b = height/800;
// console.log(a,b);

const scalingfactor = Math.sqrt(a*b)

const readmorestyles = StyleSheet.create({
  para: {
    fontSize: scalingfactor * 17,
    textAlign: "center",
    // padding: 4,
    color: "#7A7B7C",
    lineHeight: 35,
    // paddingVertical : 10,
    width: "95%",
    height : height,
    marginHorizontal: "auto",
    letterSpacing: 1.2,
     fontFamily : "Alata",
     
  },
  para1: {
    fontSize: scalingfactor * 25,
    textAlign: "center",
    marginTop : 50,
    alignSelf : "center",
    // padding: 4,
    color: "#7A7B7C",
    lineHeight: 35,
    width: "95%",
    marginHorizontal: "auto",
    letterSpacing: 1.2,
     fontFamily : "Alata",
     
  },

  logo: {

    // aspectRatio: 1,
    // resizeMode: "cover",
    // margin: "auto",
    // alignSelf: "center",
    flex: 0.7,
    aspectRatio: 1
    // width : "90%"
    // ,height : "90%"

  },
  backicon: {
    zIndex: -1
  },

  top: {
    height: height * 0.35,
    justifyContent: "center",
    alignItems: "center", // Center the content horizontally
  },
  bottom: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
    paddingHorizontal: 20,
  },
  container: {

    flex: 1,
    // marginTop : height,
    display: "flex",
    backgroundColor: "#16181a",
    position: "relative",
    height: height,
    width: "100%",
    // padding : 20,
    margin: "auto",
    position: "absolute",
    alignItems: "center",

    top: "50%",
    paddingBottom: 100
    // ,backgroundColor  : "red",
    // zIndex : 100000


  },
  block: {
    backgroundColor: "#16181a",
    // backgroundColor: "red",
    width: "100%",
    paddingVertical: 10,
    alignItems: "center",
    position: "absolute",
    top: 0,
    flex: 1,
    height: "102%",

    // paddingBottom : 20
    // zIndex : -1
    // pointerEvents : "none", 
    // Centers content horizontally
  },
  line1: {
    textAlign: "center",
    fontSize: scalingfactor * 24,
    color: "white",
     fontFamily : "Alata"
  },
  line2: {
    textAlign: "center",
    color: "#00DE60",
    // lineHeight: 35,
    fontWeight: "bold",
    fontSize: scalingfactor * 36,
    marginVertical: scalingfactor*12,
    marginTop : scalingfactor * 6,
     fontFamily : "Alata"
  },
  sblock: {
    width: "90%",
    paddingVertical  :20,
    paddingHorizontal : 25,
    backgroundColor: "rgba(190,190,190,0.2)", 
    backgroundColor : "#16181a30",


    // opacity : 0.6,

    borderRadius: 30,
    // backfaceVisibility: "hidden",
    overflow: "hidden",
    alignSelf: "center", // Centers the block horizontally
    marginTop: height-150, // Creates space between the elements
    zIndex: 100,

  },
  sblock1: {
    width: "90%",
    paddingVertical  :20,
    paddingHorizontal : 25,
    backgroundColor: "rgba(0,0,0,0.8)",
    backgroundColor: "rgba(190,190,190,0.2)",
    backgroundColor : "#16181a30",
    borderRadius: 30,
    // backfaceVisibility: "hidden",
    overflow: "hidden",
    alignSelf: "center", // Centers the block horizontally
    marginTop: 30, // Creates space between the elements
    zIndex: 100,
    position : "relative"

  },
  last: {
    marginBottom: "285%" ,
    // backgroundColor : "red",

  },
  main: {
    lineHeight: scalingfactor*35,
    color: "#B2B2B2",
    fontSize: scalingfactor * 20,
    // letterSpacing: 1.2,
    textAlign: "left",
    padding: 0,
     fontFamily : "montserat_medium",
    //  fontWeight : "600"
  },
  scrollparent: {
    // flex: 1, // Ensures ScrollView takes up available space
    width: "100%",
    backgroundColor: "transparent",
    // backgroundColor: "red",
    borderRadius: 30,
    // zIndex : 100,
    // alignItems: "center",
    zIndex: 100,
    marginTop :60,
    // pointerEvents: "none",
    overflow : "visible",
    pointerEvents: "auto",

  },
  logo: {
    flex: 0.8,
    aspectRatio: 1,
    alignContent: "center",
    margin: "auto",
    alignSelf: "center",
  }
  , back: {
    top: 20,
    left: 20,
    position: "absolute",
    zIndex: 20,
    // backgroundColor : "red"
  }
  , back1: {
    top: 20,
    left: 0,
    // position: "absolute",
    zIndex: 10,
    // backgroundColor : "red"
  }
  , uplogo: {
    position: "absolute",
    top: height - 120,
    alignSelf: "center",
    zIndex: -1
  },
  proceedbutton : {
    paddingHorizontal : 20,
    alignSelf : "center",
    backgroundColor : "#00de62",
    borderRadius : 30,
    paddingVertical : 10,
    marginVertical : 10,
    marginTop : 15 ,
    alignContent: "flex-start"
  },
  proceedText : {
    fontFamily : "Alata",
    fontSize : 16,
    alignSelf  :"flex-start",
  }
});

export default readmorestyles;
