import React from 'react';
import { Pressable } from 'react-native';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

const KeyboardAvoidingComponent = () => {

    function key1() {
        
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}
        >
            <View
                onPress={key1}
                style={styles.content}>
                <TextInput onFocus={key1} placeholder="Type here..." style={styles.input} />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 8,
    },
});

export default KeyboardAvoidingComponent;
