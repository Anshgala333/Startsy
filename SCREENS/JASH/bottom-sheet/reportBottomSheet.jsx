import { View, Text, TextInput, TouchableOpacity, Vibration, ToastAndroid, Keyboard, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import BottomSheet from '@gorhom/bottom-sheet'
import { ActivityIndicator } from 'react-native-paper'
import { url } from '@/config'


const { width, height } = Dimensions.get("window");
var a = width / 360;
var b = height / 800;
// console.log(a,b);

const scalingfactor = Math.sqrt(a * b)

const ReportBottomSheet = ({ reportBottomSheetRef, renderBackdrop, reportId, reportPost, token }) => {

    const [loading, setLoading] = useState(false)
    const [reportReason, setReportReason] = useState('')




    const submitReport = async () => {
        setLoading(true)
        try {
            let type = "Post"
            if (reportPost == false) {
                type = "User"
            }

            var object = { reason: reportReason, type: type }
            console.log(object);
            console.log('report id', reportId);

            // return

            const response = await fetch(`${url}test/reportContent/${reportId}`, {
                method: 'POST',
                body: JSON.stringify(object),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data);
            console.log(response.status);

            if (response.status == 200) {
                Vibration.vibrate(200)
                ToastAndroid.showWithGravity(
                    `Report submitted successfully`,
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER
                )

            }
            else if (response.status == 401) {
                ToastAndroid.showWithGravity(
                    `You have already reported this content.`,
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER
                )
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false);
            reportBottomSheetRef.current.close()
            Keyboard.dismiss()
            setReportReason("")

        }
    }


    return (
        <BottomSheet
            ref={reportBottomSheetRef}
            backdropComponent={renderBackdrop}
            index={-1}
            snapPoints={['70%']}
            enablePanDownToClose
            backgroundStyle={{ backgroundColor: '#16181a', borderRadius: 30 }}
            handleIndicatorStyle={{ backgroundColor: '#00de62' }}
            style={{ zIndex: 1000000, elevation: 1000 }}
            enableDynamicSizing={false}
        >
            <View style={{ paddingHorizontal: 20, }}>

                <View style={{ marginBottom: 10, }}>
                    <Text style={{ textAlign: 'center', color: '#ccc', fontFamily: 'Alata', fontSize: 16 }}>Report</Text>
                </View>

                <TextInput
                    style={styles.input}
                    value={reportReason}
                    placeholderTextColor="#666"

                    placeholder='Enter your reason'
                    onChangeText={(text) => setReportReason(text)}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setLoading(prev => !prev)
                        submitReport()

                        // console.log('report id',reportId)
                        // console.log('is report',reportPost);


                    }}
                >
                    {loading ?

                        <ActivityIndicator size={24} color="#16181a" />

                        : <Text style={styles.buttonText}>Submit</Text>
                    }

                </TouchableOpacity>
            </View>
        </BottomSheet>
    )




}



const styles = StyleSheet.create({
    submitButtonStyle: {
        margin: "auto",
        // height: height * 0.07, // Responsive height
        width: "100%",
        height: scalingfactor * 45,
        // paddingVertical: height * 0.018, // Responsive height
        backgroundColor: "#00de62",
        marginVertical: height * 0.014,
        borderRadius: 20,
        shadowColor: "black",
        shadowOpacity: 0.6,
        textAlign: "center",
        marginTop: height * 0.02,
        justifyContent: "center",
        alignItems: "center",
        // borderColor: "black",
        // borderWidth: 1,
        fontFamily: "Alata"
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        color: "#ccc",
        fontSize: 18,
        paddingVertical: 5,
        marginBottom: 10,
        fontFamily: "Roboto"
    },
    button: {
        backgroundColor: "#00DE62",
        borderRadius: 25,
        height: 42,
        width: 180,
        justifyContent: "center",
        // margin: "auto",
        alignSelf: "center",
        marginVertical: 25,
        textAlign: "center",
    },
    buttonText: {
        textAlign: "center",
        color: "#16181A",
        fontFamily: "Alata",
        fontSize: 20,
        marginTop: -5
    },
})


// { color: 'black', textAlign: 'center', fontFamily: 'Alata', fontSize: 16, marginTop: -2 }

export default ReportBottomSheet