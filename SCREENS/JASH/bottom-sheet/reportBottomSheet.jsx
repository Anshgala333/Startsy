import { View, Text, TextInput, TouchableOpacity, Vibration, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import BottomSheet from '@gorhom/bottom-sheet'
import { ActivityIndicator } from 'react-native-paper'

const ReportBottomSheet = ({ reportBottomSheetRef, renderBackdrop, reportId, reportPost }) => {

    const [loading, setLoading] = useState(false)
    const [reportReason, setReportReason] = useState('Enter your Report Text')


    const submitReport = async () => {
        setLoading(true)
        try {
            let type = "post"
            if (reportPost == false) {
                type = "account"
            }
            const response = await fetch(`${url}`, {
                method: 'POST',
                body: JSON.stringify({ reportId: reportId, reportReason: reportReason, type: type }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.status == 200) {
                Vibration.vibrate(200)
                ToastAndroid.showWithGravity(

                    `Report submitted successfully`,
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER
                )
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false);
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
                    onChangeText={(text) => setReportReason(text)}
                />

                <TouchableOpacity style={{ backgroundColor: '#00de62', padding: 6, borderRadius: 20 }}
                    onPress={() => {
                        setLoading(prev => !prev)

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