import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";

const { height, width } = Dimensions.get("window")

const DeletedPost = () => {
    return (
        <View >
            <Text style={{ color: '#00de62', fontSize: 40, paddingLeft: 20, marginBottom: 10, fontFamily: "Roboto" }}>Startsy</Text>
            <LinearGradient
                colors={["rgba(33, 34, 35, 0.4)", "rgba(25, 26, 27, 0.6)"]}
                locations={[0, 1]}
                // style={styles.box}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }} // Define your colors in the parent component
                style={{
                    width: width * 0.96,
                    backgroundColor: '#1A1D1F',
                    aspectRatio: 1, // Keeps it square like an Instagram post
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginVertical: 10,
                    borderRadius: 20
                }}
            >
                <Text style={{
                    color: '#ccc',
                    fontSize: 20,
                    fontWeight: '400',
                    textAlign: 'center',
                }}>
                    This post has been deleted.
                </Text>
            </LinearGradient>
        </View>
    )
}

export default DeletedPost