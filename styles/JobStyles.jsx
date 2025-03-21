import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#16181a",
        padding: 20,
        alignItems: 'stretch',
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#00FF00",
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: "center",
        marginVertical: 10,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#888",
        color: "#ccc",
        fontSize: 20,
        paddingVertical: 5,
        marginBottom: 10,
        
    },
    label: {
        color: "#ccc",
        fontSize: 16,
        marginBottom: 5,
        marginLeft : 5,
    },
    textArea: {
        height: 150,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 20,
        color: "#ccc",
        fontSize : 20,
        padding: 10,
        textAlignVertical: "top",
    },
    picker: {
        backgroundColor: "#333",
        borderColor: "gray",
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#00DE62",
        borderRadius: 25,
        height: 42,
        width: 180,
        justifyContent: "center",
        margin: "auto",
        alignSelf: "center",
        marginVertical: 40,
        textAlign: "center",
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