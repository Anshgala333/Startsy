import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#16181a",
        padding: 20,
        alignItems: 'stretch',
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: "center",
        marginVertical: 10,
    },
    label: {
        color: "gray",
        fontSize: 18,
        marginLeft : 10,
        marginBottom: 5,
        fontFamily:'Roboto'
    },
    textArea: {
        height: 250,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 20,
        color: "#ccc",
        padding: 10,
        paddingBottom:25,
        textAlignVertical: "top",
        fontFamily:'Roboto',
        fontSize:18
    },
    button: {
        backgroundColor: "#00DE62",
        borderRadius: 25,
        height: 42,
        width: 180,
        justifyContent: "center",
        // margin: "auto",
        alignSelf: "center",
        marginVertical: 25,
        textAlign: "center",
        fontFamily:'Roboto',
    },
    buttonText: {
        textAlign: "center",
        color: "#16181A",
        fontFamily: "Alata",
        fontSize: 20,
        marginTop: -5
    },
    descriptionLength: {
        color: "#666",
        textAlign: 'right',
        position: 'relative',
        bottom: 25,
        right: 10
    },

    errorStyle: {
        color: "#E65858",
        fontSize: 12,
        marginTop : -10,
        marginLeft : 10
    }
});




export default styles