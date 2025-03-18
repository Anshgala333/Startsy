import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#16181a",
        padding: 20,
        paddingTop:10,
        flexGrow : 1
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#00FF00",
    },

    t1: {
        textAlign: 'center',
        color: "#ccc",
        fontFamily: "Roboto",
        fontSize:   16,
        marginTop: 5,
        // zIndex : 100,
        // backgroundColor : "red"
    },

    img: {
        margin: "auto",
        width: 113,
        height: 113,
        borderRadius: 100,
        marginBottom : 10
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: "center",
        marginVertical: 10,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        color: "#ccc",
        fontSize: 16,
        paddingVertical: 5,
        marginBottom: 10,
    },
    label: {
        color: "#ccc",
        fontSize: 16,
        marginBottom: 5,
    },
    textArea: {
        height: 150,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 12,
        color: "white",
        padding: 10,
        textAlignVertical: "top",
    },
    picker: {
        backgroundColor: "#333",
        borderColor: "gray",
        marginBottom: 10,
    },

    tittle : {
        fontSize: 25,
        fontWeight: "bold",
        color: "#00DE62",
        marginBottom: 20,
        fontFamily: "myanmar",
        color: "#00DE62",
    } , 
    button: {
        backgroundColor: "#00DE62",
        borderRadius: 20,
        height: 40,
        width: 110,
        justifyContent: "center",
        margin: "auto",
        alignSelf: "center",
        marginVertical: 40,
        textAlign: "center",
        marginBottom : 300
    },
    buttonText: {
        textAlign: "center",
        color: "#16181A",
        fontFamily: "Alata",
        fontSize: 20,
        marginTop: -5
    },

    descriptionLength: {
        color: "#ccc",
        textAlign: 'right',
        position: 'relative',
        bottom: 25,
        right: 10
    },

    errorStyle: {
        color: "#E65858",
        fontSize: 12
    }
});



export default styles;