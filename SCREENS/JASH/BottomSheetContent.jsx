import { View, Text, StyleSheet, Platform, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
// import Entypo from '@expo/vector-icons/Entypo';

const BottomSheetContent = ({name , email , phone}) => {

    const openDialer = (phoneNumber) => {
        let number = '';
        if (Platform.OS === 'ios') {
            number = `telprompt:${phone}`;
        } else {
            number = `tel:${phone}`;
        }
        Linking.openURL(number);
    };

    


    const openEmail = (email) => {
        Linking.openURL(`mailto:${email}`);
    }

    return (
        <View style={styles.container}>
        
             <View style={styles.listContainer} >
                <AntDesign name="mobile1" size={30} color="white" />
                <TouchableOpacity onPress={() => openDialer(phone)}>
                    <Text style={styles.textStyle}>{phone}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.listContainer} >
                <Entypo name="email" size={30} color="white" />
                <TouchableOpacity onPress={() => openEmail(email)}>
                    <Text style={styles.textStyle}>{email}</Text>
                </TouchableOpacity>
            </View> 

            {/* <View style={styles.listContainer} >
                <Entypo name="chat" size={30} color="white" />
            </View> */}


        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        // alignItems:'center'
    },
    listContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    textStyle: {
        color: 'white',
        fontSize: 16,
    },
})

export default BottomSheetContent