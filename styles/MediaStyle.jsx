import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
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
        borderBottomColor: "gray",
        color: "white",
        fontSize: 16,
        paddingVertical: 5,
        marginBottom: 10,
    },
    label: {
        color: "white",
        fontSize: 16,
        marginBottom: 5,
    },
    textArea: {
        height: 150,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        color: "white",
        padding: 10,
        textAlignVertical: "top",
    },
    picker: {
        backgroundColor: "#333",
        borderColor: "gray",
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#00FF00",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
    },

    descriptionLength: {
        color: "white",
        textAlign: 'right',
        position: 'relative',
        bottom: 25,
        right: 10
    },

    errorStyle: {
        color: "red",
        fontSize: 12
    }
});



export default styles;