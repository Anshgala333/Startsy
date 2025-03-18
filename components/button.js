
import React from 'react';
import { Pressable, TouchableOpacity, Text, StyleSheet ,Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");


var a = width/360;
var b = height/800;
const scalingfactor = Math.sqrt(a*b)



const CustomButton = ({ title, onpress,props }) => {
    return (
        <Pressable style={[styles.next ,{...props}]} onPress={onpress}>
            <Text allowFontScaling={false} style={styles.nexttext}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    next: {
        backgroundColor: "#00DF60",
        padding: scalingfactor * 10,
        marginVertical: height * 0.018,
        borderRadius: 20,
        margin: "auto",
        marginTop: scalingfactor * 20
    },
    nexttext: {
        color: "#24272A",
        fontFamily: "Alata",
        fontSize: scalingfactor * 24,
        textAlign: "center",
        // lineHeight : 16
        marginTop: -4

    },
});


export default CustomButton