import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Keyboard
} from "react-native";
import Header from "../header.js";
import { useReducedMotion } from "framer-motion";

const PL = ({ navigation }) => {
  navigation.setOptions({
    headerStyle: {
      backgroundColor: "#3a6ee8", // Set your desired background color
      elevation: 0, // Remove shadow on Android
      shadowOpacity: 0, // Remove shadow on iOS
    },
    headerTitleAlign: "center", // Center the title
  });

  const [tree, settree] = useState(0)
  const inputref = useRef()

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      settree(0)
      inputref.current.blur()
      console.log("keyboard under ayya");


    });
    return () => {
      keyboardDidHideListener.remove();
    };

  }, [])

  return (
    <View style={styles.container}>
      {/* FlatList with Sticky Header */}
      <FlatList
        ListHeaderComponent={<Header />} // Header is inside the list
        stickyHeaderIndices={[1]} // Keeps the header fixed while scrolling
        data={Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`)} // Dummy data
        renderItem={({ item }) => (
          <Text style={styles.item}>{item}</Text>
        )}
        contentContainerStyle={styles.flatListContent} // Ensures input is visible
      />

      {/* KeyboardAvoidingView wrapped only around TextInput */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Adjusts for iOS header
        style={styles.keyboardAvoidingView} // Prevents overlap
      >
        <TextInput
          ref={inputref}
          onFocus={() => settree(300)}
          onblur={() => settree(0)}
          style={[styles.textInput, { marginBottom: tree }]}
          placeholder="Type here..."
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 100, // Ensures input is visible
  },
  item: {
    padding: 20,
    backgroundColor: "lightgray",
    marginBottom: 5,
  },
  keyboardAvoidingView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingBottom: 10, // Prevents overlap
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    margin: 10,
    width: "90%",
    backgroundColor: "white",
    alignSelf: "center", // Center the input
  },
});

export default PL;