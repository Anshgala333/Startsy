import { View, Text, Vibration, ToastAndroid, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
// import { Button, Image } from 'react-native-web'
import { Pressable, Image, TextInput, StyleSheet, Dimensions, ActivityIndicator, BackHandler } from 'react-native'
// import styles from '../styles/MediaStyle'
const { height, width } = Dimensions.get("window");
import B3 from "../assets/icons/b3.js"
import { GlobalContext } from "@/Global/globalcontext.js";
import { url } from '../config.js'
import { useNavigation } from 'expo-router';
import { Checkbox } from "react-native-paper";


const MediaPost = ({ route }) => {

    const data = useContext(GlobalContext);
    const token = data.globaldata.token;
    const navigation = useNavigation();


    const [isPrivate, setIsPrivate] = useState(false);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack()

            return true;
        });

        return () => backHandler.remove();
    }, []);


    const post3 = async () => {
        setp3u(true);
        let hasError = false;

        // if (c2 == "") {
        //     seterr7(true);
        //     setp3u(false);

        //     hasError = true;
        // }

        if (hasError) {
            setp3u(false);
            return;
        }
        if (p3u) {
            setp3u(false);
            return;
        }

        const finaldata = new FormData();
        // Alert.alert(JSON.stringify(uri))
        if (uri) {
            finaldata.append("media", {
                uri: uri,
                type: "image/jpeg",
                name: `image_${Date.now()}.jpg`,
            });
        }
        finaldata.append("caption", c2);
        finaldata.append("aspectRatio", aspectRatio);
        finaldata.append("isPrivate", isPrivate);
        // Alert.alert(JSON.stringify(finaldata))

        try {
            if (type == "images") {
                type = "photo";
            }
            const response = await fetch(`${url}posts/createPost/${type}`, {
                method: 'POST',
                body: finaldata,
                timeout : 120000,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            // Alert.alert(response)
            if (response.status == 412) {
                ToastAndroid.showWithGravityAndOffset(
                    `Server Error`,
                    ToastAndroid.LONG,
                    ToastAndroid.TOP,
                    100, 100
                );
            }

           
            if (response.status === 200) {
                Vibration.vibrate(100)
                navigation.goBack()
            }


            const data = await response.json();
            setp3text("Posted");
        } 
        catch (err) {
            console.error("Error:", err);
            // Alert.alert(err)

        } finally {
            setp3u(false);
            seterr7(false);
            setc2("");
            setp3text("Post");
        }
    }

    var { aspectRatio, type, uri } = route.params

    const [p3u, setp3u] = useState(false);
    const [c2, setc2] = useState("");
    const [p3text, setp3text] = useState("Post");
    const [err7, seterr7] = useState(false);

    // console.log(aspectRatio, type, uri);


    return (
        <View style={{ flex: 1, backgroundColor: "#16181a" }}>
            <View style={{ flex: 1, maxHeight: 100 }}>
                <B3 />
            </View>
            <View style={{ position: "relative" }}>
                {type == "photo" && <Image style={[styles.img, { aspectRatio: aspectRatio }]} source={{ uri: uri }} />}

            </View>
            {/* {err6 && <Text style={styles.error}> *please enter this field</Text>} */}

            <TextInput
                allowFontScaling={false}
                placeholder="Caption"
                placeholderTextColor="gray"
                style={styles.input}
                value={c2}
                onChangeText={(text) => { setc2(text) }}
            />

            {err7 && <Text style={styles.error}> *please enter this field</Text>}


            <View style={{ color: 'red', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, }}>
                <Checkbox
                    status={isPrivate ? "checked" : "unchecked"}
                    onPress={() => {
                        setIsPrivate(!isPrivate)
                        if (!isPrivate) {
                            ToastAndroid.showWithGravityAndOffset(
                                `Your post will only be visible to your connections`,
                                ToastAndroid.LONG,
                                ToastAndroid.TOP,
                                100, 100
                            );
                        }
                    }}
                    uncheckedColor='#ccc'
                    color='#00de62'
                />
                <Text style={{ color: 'gray', fontFamily: 'Roboto' }}>Private</Text>
            </View>

            <Pressable onPress={post3} style={styles.button}>
                {p3u ?

                    <ActivityIndicator size={24} color="#16181a" />

                    : <Text style={styles.buttonText}>Post</Text>
                }
            </Pressable>
        </View>
    )
}

export default MediaPost


const styles = StyleSheet.create({
    img: {
        margin: "auto",
        width: width * 0.9,
        aspectRatio: 1 / 1,
        // borderRadius: 100,
        marginBottom: 50,
        borderRadius: 16
    }

    , input: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        marginTop: 0,
        borderBottomWidth: 1,
        // borderRadius : 20,
        paddingLeft: 10,
        borderBottomColor: "#ccc",
        fontSize: 18, // Responsive font size
        color: "#B8B8B8",
        paddingBottom: 5,
        width: "92%",
        marginHorizontal: "auto",
        marginBottom: 20,
        fontFamily: "Roboto",

    },

    post: {
        backgroundColor: "#00DE62",
        borderRadius: 20,
        height: 40,
        width: 110,
        justifyContent: "center",
        margin: "auto",
        alignSelf: "center",
        marginVertical: 40,
        textAlign: "center",
    },

    button: {
        backgroundColor: "#00DE62",
        borderRadius: 25,
        height: 42,
        width: 180,
        justifyContent: "center",
        // margin: "auto",
        alignSelf: "center",
        // marginVertical: 30,
        textAlign: "center",
        marginVertical: 25,

    },
    buttonText: {
        textAlign: "center",
        color: "#16181A",
        fontFamily: "Alata",
        fontSize: 20,
        marginTop: -5
    },
    error: {
        color: "#E65858",
        fontSize: 12,
        marginTop: -10,
        marginLeft: 10
    }
})