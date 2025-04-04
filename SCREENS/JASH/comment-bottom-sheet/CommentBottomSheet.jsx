import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native'
import React, { useMemo, useRef } from 'react'

import BottomSheet, { BottomSheetView, BottomSheetScrollView, BottomSheetTextInput, BottomSheetFlatList, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ActivityIndicator } from 'react-native-paper';
// import {  } from 'react-native-gesture-handler';

const CommentBottomSheet = ({ commentRef, backdropComponent, allcomments, comments , docomment, uploadingcomment, setcommenttext, commenttext,backgroundStyle }) => {

    const snapPoints5 = useMemo(() => ["70%",], []);

    // console.log(allcomments);



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
        // initialSnapIndex={0}
        // handleStyle={{display : "none"}}
        // contentContainerStyle={{ zIndex: 1000000, elevation: 20000000, height: 100 }}
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
                onFocus={() => {

                    // snapPoints5 = ['100']
                    inputRef.current?.focus();

                }}
                // onblur={() => setmax(500)}
                style={styles.input}
                placeholder="Type here..."
                placeholderTextColor="#bbb"
                value={commenttext}
                onChangeText={text => setcommenttext(text)}
            />
            <Pressable onPress={docomment} style={styles.send}>
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
        // borderColor: "#828282",
        // // padding: 10,
        // color: '#fff',
        // width: "94%",
        // marginHorizontal: "auto",
        // fontSize: 16,
        // paddingLeft: 10,
        // // marginTop: 20,
        // marginBottom: 25
        height: 50,
        width: "96%",
        marginHorizontal: "auto",
        borderColor: "#828282",
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 15,
        color: "#828282",
        fontSize: 18,
        marginBottom: 25

    },
    send: {
        position: "absolute",
        top: 12,
        right: 30,
        transform: [{ scale: 1.1 }],
        alignSelf: "center",
        verticalAlign: "center",
        bottom: 0,
    },
})


export default CommentBottomSheet