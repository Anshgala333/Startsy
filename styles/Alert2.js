import React from "react";
import { StyleSheet } from "react-native";



const styles1 = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" , },
    alertBox: { width: 300, backgroundColor: "#1A1D1F", padding: 20, borderRadius: 20, paddingTop : 15, alignItems: "center" , height : "auto" , marginTop : 0 , position : "absolute" },
    title: { fontSize: 20, fontWeight: "bold", color: "#D9D9D9", marginBottom : 5, fontFamily: "Alata" },
    message: { fontSize: 16, marginVertical: 10, textAlign: "center", color: "#ccc",  },
    button: { marginTop: 10, backgroundColor: "#00de62", padding: 6, paddingHorizontal: 37, borderRadius: 10 },
    buttonText: { color: "#1A1D1F", fontSize: 16, fontFamily: "Roboto", fontWeight: "bold" },
    showButton: { backgroundColor: "#28a745", padding: 10, borderRadius: 5 },
    showButtonText: { color: "#fff", fontSize: 16 },
})


export default styles1