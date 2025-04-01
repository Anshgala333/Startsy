import { View, Text, TextInput, TouchableOpacity, Vibration, ToastAndroid , Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import BottomSheet from '@gorhom/bottom-sheet'
import { ActivityIndicator } from 'react-native-paper'
import { url } from '@/config'

const ReportBottomSheet = ({ reportBottomSheetRef, renderBackdrop, reportId, reportPost , token }) => {

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
            else if(response.status == 401) {
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
                    style={{ color: 'gray', borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 20 }}
                    value={reportReason}
                    placeholderTextColor="#666"
                    placeholder='Enter your reason for reporting'
                    onChangeText={(text) => setReportReason(text)}
                />

                <TouchableOpacity style={{ backgroundColor: '#00de62', padding: 6, borderRadius: 20 }}
                    onPress={() => {
                        setLoading(prev => !prev)
                        submitReport()

                        // console.log('report id',reportId)
                        // console.log('is report',reportPost);


                    }}
                >
                    {
                        loading ? (
                            <ActivityIndicator size={24} color="black" />
                        ) : (
                            <Text style={{ color: 'black', textAlign: 'center', fontFamily: 'Alata', fontSize: 16, marginTop: -2 }}>Submit</Text>
                        )
                    }
                </TouchableOpacity>
            </View>
        </BottomSheet>
    )
}

export default ReportBottomSheet