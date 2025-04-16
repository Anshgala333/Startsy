import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'

import BottomSheet, { BottomSheetView, BottomSheetScrollView, BottomSheetTextInput, BottomSheetFlatList, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
// import {  } from 'react-native-gesture-handler';

const CommentBottomSheet = ({ commentRef, backdropComponent, allcomments, comments , docomment, uploadingcomment, setcommenttext, commenttext,backgroundStyle }) => {

    const snapPoints5 = useMemo(() => ["70%",], []);


    // console.log(allcomments);

    const [ inFocus,setInFocus]=useState(false)



    const inputRef = useRef(null);
    return (
        <BottomSheet
        overlayColor="rgba(0, 0, 0, 0.9)"
        enablePanDownToClose
        backgroundStyle={backgroundStyle}
        handleIndicatorStyle={{ backgroundColor: '#00de62' }}
        ref={commentRef}
        nestedScrollEnabled={true}
        backdropComponent={backdropComponent}
        enableDynamicSizing={false}
        snapPoints={snapPoints5}
      
        index={-1}
        
    >


       <Pressable onPress={() => {
            // console.log("openin");
            inputRef.current?.focus()
            // commentRef.current?.snapToIndex(1);

        }}>
            <Text style={{ textAlign: 'center', color: '#ccc', fontFamily: 'Alata', fontSize: 16 }}>Comments</Text>

        </Pressable>


        <BottomSheetFlatList
            style={{ flexGrow: 0.98, }}
            data={allcomments}
            renderItem={comments}
            scrollEnabled={true}
            contentContainerStyle={{ flexGrow: 1, padding: 10, }}

        />

        <Animated.View style={{ position: "relative" }}>
            <TextInput
                ref={inputRef}
               onPress={()=>{
                inputRef.current?.focus()
               }}
                onPressIn={()=>{
                    inputRef.current?.focus();
                }}
                onBlur={()=>{
                   
                    inputRef.current?.blur()
                    setInFocus(false)
                }}
                style={styles.input}
                placeholder="Type here..."
                placeholderTextColor="#828282"
                value={commenttext}
                onChangeText={text => setcommenttext(text)}
            />
            <Pressable onPress={docomment} style={[styles.send,{}]}>
                {uploadingcomment && <ActivityIndicator size={24} color="#828282" />}
                {!uploadingcomment && <Ionicons name="send" size={24} color="#828282" />}
            </Pressable>
        </Animated.View>
       
    </BottomSheet>
    )
}


const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        marginBottom: 10,
        color: "#bbbbbb",
        textAlign: 'center',
    },
    input: {
        backgroundColor: 'transparent',
        height: 50,
        width: "96%",
        marginHorizontal: "auto",
        borderColor: "#828282",
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 15,
        color: "#ccc",
        fontSize: 18,
        marginBottom: 10,
    

    },
    send: {
        position: "absolute",
        top: 14,
        right: 25,
        transform: [{ scale: 1.1 }],
        alignSelf: "center",
        verticalAlign: "center",
        bottom: 0,
    },
})


export default CommentBottomSheet