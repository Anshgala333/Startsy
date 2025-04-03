import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, BackHandler, Pressable,Linking } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
// import data from '../../GroupDetails/Data'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Ionicons from '@expo/vector-icons/Ionicons';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import BottomSheetContent from '../JASH/BottomSheetContent.jsx'
import { url } from "../../config.js"

import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { useFocusEffect } from 'expo-router';
// import { navigate } from 'expo-router/build/global-state/routing.js';
const ApplicantsList = ({ route , navigation }) => {

    const { Applicants, token } = route.params
    console.log(Applicants, "target 1");
    const [data, setdata] = useState()


    useEffect(() => {
        async function getdata() {
            try {
                const response = await fetch(`${url}posts/getAppliedJobApplicants`, {
                    method: 'POST',
                    body: JSON.stringify({ jobPostIds: Applicants }),
                    headers: {
                        "Content-Type": "application/json",
                        accept: "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                console.log(data, "target");
                console.log(response.status);
                setdata(data.data)

            }
            catch (err) {
                console.log(err);

            }
        }
        getdata()

    }, [])

    // const snapPoints = useMemo(() => ['20%'], []);
    const bottomSheetRefApplicant = useRef(null);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [onthispage, setonthispage] = useState(false)


    useFocusEffect(useCallback(() => {
        setonthispage(true)
    }, []))

    useEffect(() => {
           const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            setonthispage(false)
           });
   
           return () => backHandler.remove();
       }, []);
    // let selectedRef = useRef("")
    const open = (name, email, phone) => {

        setName(name)
        setEmail(email)
        setPhone(phone)

        setTimeout(() => {
            bottomSheetRefApplicant.current?.expand();
        }, 250)


    };
    const renderBackdrop = (props) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1} // Backdrop disappears when BottomSheet is closed
            appearsOnIndex={0} // Backdrop appears when BottomSheet is open
            opacity={0.7} // Set opacity for the backdrop
        />
    );
    const openDialer = (phoneNumber) => {
        let number = '';
        if (Platform.OS === 'ios') {
            number = `telprompt:${phoneNumber}`;
        } else {
            number = `tel:${phoneNumber}`;
        }
        Linking.openURL(number);
    };




    const openEmail = (email) => {
        Linking.openURL(`mailto:${email}`);
    }
    const snapPoints7 = useMemo(() => ['30%'], []);




    const OpenBottomSheet = () => (
        <BottomSheet
            overlayColor="rgba(0, 0, 0, 0.9)"
            enablePanDownToClose
            backdropComponent={renderBackdrop}
            backgroundStyle={{ backgroundColor: '#16181a', borderRadius: 30 }}
            handleIndicatorStyle={{ backgroundColor: '#00de62' }}
            // style={{ zIndex: 100000, elevation: 1000 }}
            enableDynamicSizing={false}
            ref={bottomSheetRefApplicant}
            snapPoints={snapPoints7}

            index={-1}
        >
            <Text style={{ textAlign: 'center', color: 'white' }}>Connect to {name}</Text>

            <BottomSheetContent name={name} email={email} phone={phone} />
        </BottomSheet>
    );


    return (
        <GestureHandlerRootView>
            <View style={{ backgroundColor: "#16181a", flex: 1 }}>
                <View><Text allowFontScaling={false} style={styles.headerText}>Applicants</Text></View>
                <FlatList

                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onLongPress={() => console.log('Long pressed')} >
                            <View
                                style={styles.listContainer}
                            >
                                <View style={styles.userInfoStyle}>
                                    <Image width={20} height={20} source={{ uri: item.profilePhoto }} style={{ width: 40, height: 40, borderRadius: 40 }} />
                                    <Text style={{ fontSize: 16, color: "#ccc" }}>{item.userName}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => open(item.userName, item.email, item.contactInfo)}
                                    style={[styles.toggleFollow, { backgroundColor: item.followed ? "#ff5c5c" : "#ccc", }]}
                                >
                                    <Text style={{ color: "#16181a", fontFamily: "Alata" }}>
                                        Contact
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </TouchableOpacity>
                    )} />

            </View>
            {onthispage && <OpenBottomSheet />}
        </GestureHandlerRootView>
    )
}




const styles = StyleSheet.create({
    page: {
        backgroundColor: 'black'
    },
    groupName: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,
        color: "white"
    },
    description: {
        fontSize: 14,
        textAlign: "center",
        color: "gray",
    },
    listContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        // backgroundColor: "#666",
        borderBottomColor: "#666",
        borderBottomWidth: 1
        // marginVertical: 5,
        // borderRadius: 10,
    },
    toggleFollow: {

        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    userInfoStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    headerText: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#00DE62",
        marginBottom: 12,
        backgroundColor: "#16181a",
        fontFamily: "myanmar",
        color: "#00DE62",
        paddingLeft: 15
    },
});



export default ApplicantsList




