import { Dimensions, StyleSheet } from "react-native";
const { height, width } = Dimensions.get("window");

const greenstyle = StyleSheet.create({
    green: {
        flex: 1,
        backgroundColor: "#16181a",
        justifyContent: "center",
        alignItems: "center",
    },
    login: {
        flex: 1,
        backgroundColor: "#16181a",
        height: height + 120,
        width: "100%",
        position: "absolute",
        top: height,
    },
    center: {
        overflow: "visible", // Allow text to overflow
        position: "absolute",
        top: "38%",
        left: "15%",
    },
    startsy: {
        fontWeight: "bold",
        fontSize: 60,
        textAlign: "left",
        color: "black", // Make sure text is visible on the background
    },
    animatedTextContainer: {
        overflow: 'hidden', // Hide overflow to ensure smooth reveal
    },
});

export default greenstyle;
