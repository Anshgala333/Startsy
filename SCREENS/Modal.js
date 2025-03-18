import React, { useState, useEffect, useRef } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Animated, TouchableWithoutFeedback } from "react-native";

const CustomAlert = ({ visible, onClose }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Persistent animated value

    useEffect(() => {
        if (visible) {
            Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
        } else {
            Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => {
                if (typeof onClose === "function") {
                    onClose(); // Ensure onClose exists before calling
                }
            });
        }
    }, [visible]);

    if (!visible) return null; // Prevent rendering when not visible

    return (
        <Modal transparent visible={visible} animationType="none" onRequestClose={() => onClose?.()}>
            <TouchableWithoutFeedback onPress={() => onClose?.()}>
                <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
                    <TouchableWithoutFeedback>
                        <View style={styles.alertBox}>
                            <Text style={styles.title}>Delete Post</Text>
                            <Text style={styles.message}>Click confirm to delete.</Text>
                            <View style={{display : "flex" , flexDirection : "row", gap : 10}}>

                                <TouchableOpacity onPress={() => onClose?.()} style={styles.button}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => onClose?.()} style={styles.button}>
                                    <Text style={styles.buttonText}>Confirm</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const Modal1 = () => {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setVisible(true)} style={styles.showButton}>
                <Text style={styles.showButtonText}>Show Alert</Text>
            </TouchableOpacity>
            <CustomAlert visible={visible} onClose={() => setVisible(false)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
    alertBox: { width: 300, backgroundColor: "#1A1D1F", padding: 20, borderRadius: 20, alignItems: "center" },
    title: { fontSize: 20, fontWeight: "bold" , color : "#ccc" , fontFamily : "Alata" },
    message: { fontSize: 16, marginVertical: 10, textAlign: "center",color : "#fff", fontFamily : "Roboto"   },
    button: { marginTop: 10, backgroundColor: "#00de62", padding: 6, paddingHorizontal : 37, borderRadius: 10 },
    buttonText: { color: "#1A1D1F", fontSize: 16 , fontFamily : "Roboto"  , fontWeight : "bold" },
    showButton: { backgroundColor: "#28a745", padding: 10, borderRadius: 5 },
    showButtonText: { color: "#fff", fontSize: 16 },
});

export default Modal1;
