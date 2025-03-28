import React, { useRef, useState, useEffect, useMemo } from 'react';
import {
    View,
    Button,
    Text,
    TextInput,
    StyleSheet,
    FlatList,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Pressable,
    Image,
    Dimensions, Keyboard, ActivityIndicator, Animated
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Ionicons from '@expo/vector-icons/Ionicons';
import { InteractionManager } from "react-native";
import BottomSheet, { BottomSheetView, BottomSheetScrollView, BottomSheetTextInput, BottomSheetFlatList, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
// import Animated from 'react-native-reanimated';
// import Ionicons from '@expo/vector-icons/Ionicons';





export default function RB({ allcomments, open, setOpen, comments, renderBackdrop, backgroundStyle, bottomSheetRef5, docomment, uploadingcomment, setcommenttext, setallcomments, commenttext }) {
    const refRBSheet = useRef();
    const [max, setmax] = useState(500)
    const [sheetHeight, setSheetHeight] = useState(screenHeight * 0.7);
    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setTimeout(() => {
                setSheetHeight(screenHeight * 0.7);
            }, 500); // 80% when keyboard appears
        });

        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setSheetHeight(screenHeight * 0.7); // Reset to 50% when keyboard hides
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const snapPoints5 = useMemo(() => ["70%"], []);
    const screenHeight = Dimensions.get('window').height; // Get screen height

    const inputRef = useRef(null);
    const [focusedOnce, setFocusedOnce] = useState(false);

    // useEffect(() => {
    //     if (open) {
    //         InteractionManager.runAfterInteractions(() => {
    //             inputRef.current?.focus();
    //         });
    //     }
    // }, [open]);

    return (

        <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
>
    <Animated.View

        style={[styles.container, { flex: open ? 1 : 0 , zIndex : 100000 , elevation:10000 }]}
        >
        {/* <Button title="OPEN BOTTOM SHEET" onPress={() => bottomSheetRef5.current.open()} /> */}

        {/* <KeyboardAvoidingView style={{ flex: 1, }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 10}> */}

        {/* <Animated.View> */}
        <RBSheet

            ref={bottomSheetRef5}
            style={{ backgroundColor: "#16181a" }}
            height={sheetHeight}
            // height={200}
            openDuration={300}
            closeDuration={200}
            closeOnDragDown={true}
            closeOnPressMask={true}
            draggable={true}
            onClose={() => setOpen(false)}
            closeOnPressBack={true}
            customModalProps={{
                animationType: 'fade',
                statusBarTranslucent: true,
            }}
            customStyles={{
                // wrapper: {
                //     backgroundColor: 'rgba(0,0,0,0.5)',
                // },
                container: {
                    backgroundColor: '#16181a',
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    padding: 10,
                    paddingHorizontal: 0,
                    paddingVertical: 10,
                    paddingBottom: 0,
                    margin: 0
                },
            }}
        >

            <Pressable onPress={() => {
                // console.log("openin");
                inputRef.current?.focus()

            }}>
                <Text style={styles.title}>Comments</Text>

            </Pressable>
            {allcomments.length == 0 && <Text style={styles.no}>No comments yet</Text>}

            <FlatList
                style={{ flexGrow: 0.98, backgroundColor: "#16181a" }}
                data={allcomments}
                renderItem={comments}
                scrollEnabled={true}
                contentContainerStyle={{ flexGrow: 1, padding: 10, }}
            />


            <Animated.View style={{ position: "relative" }}>
                <TextInput
                    ref={inputRef}
                    onFocus={() => {

                        InteractionManager.runAfterInteractions(() => {
                            inputRef.current?.focus();
                        });
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
        </RBSheet >
        {/* </Animated.View> */}
        {/* </KeyboardAvoidingView> */}
    </Animated.View>

</KeyboardAvoidingView >

       
    );
}



const styles = StyleSheet.create({
    container: {

        // position : "absolute",
        justifyContent: 'center',
        alignItems: 'center',
        // paddingBottom : 30,
        backgroundColor: '#16181a',
    },
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
    no: {
        textAlign: "center",
        color: "#B8B8B8",
        // fontFamily: "Roboto",
        fontSize: 22,
        margin: "auto",
        justifyContent: "center",
        marginTop: 150,
        alignSelf: "center",
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
});




