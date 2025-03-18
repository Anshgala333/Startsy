import React from 'react';
import { Text, View, Image , StatusBar } from "react-native"
import readmorestyles from "../styles/readmorestyles.js";
import { useFocusEffect } from "expo-router";
const Wait = () => {
     useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181a")
        StatusBar.setBarStyle("light-content")
      })
    
    return (
        <View style={{ flex: 1, backgroundColor: "#16181a" , justifyContent : "center" , alignContent : "center" }}>
            <View style={readmorestyles.block}>
                <View style={readmorestyles.top}>
                    <Image
                        style={readmorestyles.logo}
                        source={require("../assets/images/logo.png")}
                    />
                </View>
                <View style={readmorestyles.bottom}>
                    <Text allowFontScaling={false} style={readmorestyles.para1}>
                        Your account is being verified , when it is verified you will receive a mail from Team Startsy , 
                        the Verification period is between 1 hour to 24 hours.
                    </Text>
                </View>
            </View>
        </View>
    )

}


export default Wait