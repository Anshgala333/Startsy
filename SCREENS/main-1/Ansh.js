// import { useFocusEffect } from 'expo-router';
import { useFilterScreenChildren } from 'expo-router/build/layouts/withLayoutContext';
import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, Animated } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";

const Ansh = () => {
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);
    const [keyboardOffset, setKeyboardOffset] = useState(new Animated.Value(0));

    const sendMessage = () => {
        // Add the new message to the messages array
        setMessages([...messages, { id: Date.now().toString(), text: inputText }]);
        setInputText(''); // Clear the input field
    };

    useEffect(() => {

    }, []);


    useFocusEffect(
        useCallback(() => {
            const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
                Animated.timing(keyboardOffset, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            });

            const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
                Animated.timing(keyboardOffset, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            });

            return () => {
                keyboardDidShowListener.remove();
                keyboardDidHideListener.remove();
            };
        }, [keyboardOffset])
    )

    return (
        // <KeyboardAvoidingView  style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 20}>
            <Animated.View style={{ flex: 1, }}>
                <View style={styles.container}>
                    {/* Message List */}
                    <FlatList
                        data={messages}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <Text style={styles.message}>{item.text}</Text>}
                        contentContainerStyle={styles.messagesContainer}
                    />

                    {/* Input Field */}
                    <Animated.View style={[styles.inputContainer , {marginBottom:keyboardOffset}]}>
                        <TextInput
                            // onFocus={()=>setk(true)}
                            style={styles.input}
                            value={inputText}
                            onChangeText={setInputText}
                            placeholder="Type a message..."
                        />
                        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                            <Text style={styles.sendButtonText}>Send</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </Animated.View>
        // </KeyboardAvoidingView>
    );
};

export default Ansh;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000" , zIndex : 100000 , elevation : 1000},
    header: { height: 60, backgroundColor: "#007AFF", justifyContent: "center", alignItems: "center" },
    headerText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
    messagesContainer: { flexGrow: 1, padding: 10, },
    message: { backgroundColor: "#e3e3e3", padding: 10, marginVertical: 5, borderRadius: 5 },
    inputContainer: { flexDirection: "row", padding: 10, borderTopWidth: 1, borderColor: "#ddd", bottom: 50 },
    input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10 },
    sendButton: { backgroundColor: "#007AFF", padding: 10, borderRadius: 5, marginLeft: 10 },
    sendButtonText: { color: "#fff", fontWeight: "bold" },
});