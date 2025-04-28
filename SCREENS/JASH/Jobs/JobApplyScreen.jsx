import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, Vibration } from 'react-native'
import React, { useState } from 'react'
import { GestureHandlerRootView, } from 'react-native-gesture-handler'
import B4 from '@/assets/icons/b4'
import { useRoute } from '@react-navigation/native'
import { url } from '@/config'
import { ActivityIndicator } from 'react-native-paper'
import { useNavigation } from 'expo-router'


const JobApplyScreen = () => {


    const [loading, setLoading] = useState(false);
    const route = useRoute();

    const navigation = useNavigation();

    const [description, setdescription] = useState("")
    const [portfolioUrl, setPortfolioUrl] = useState("")


    const item = route.params.item;

    const paramsData = route.params


    async function applyjob(id, index) {


        setLoading(true);

        Vibration.vibrate(100)



        route.params.setallpost(route.params.allpost.map((e, i) => {
            if (i == index) {
                var object = { ...e, Applied: true }
                return object
            }
            else return e
        }))

        try {
            const object = {
                description: description,
                resume : portfolioUrl
            }
            const response = await fetch(`${url}posts/applyJobPost/${id}`, {
                method: 'POST',
                body: JSON.stringify(object),
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                    "Authorization": `Bearer ${paramsData.token}`,
                },
            });
            const data = await response.json();
            console.log(data);
            // console.log(response.status);
            if (response.status === 200) {
                route.params.setallpost(route.params.allpost.map((e, i) => {
                    if (i == index) {
                        var object = { ...e, Jobapplied: true }
                        return object
                    }
                    else return e
                }))
            }

            console.log(response.status);

            if (response.status === 400) {
                paramsData.showToastWithGravity("you have already applied")
            }



        }
        catch (err) {
            console.log(err);

        }
        finally {
            paramsData.showToastWithGravity('Job applied successfully')
            setLoading(false);
            navigation.goBack();
        }
    }



    return (

        <GestureHandlerRootView style={styles.container}>

            <ScrollView keyboardShouldPersistTaps="handled"
                nestedScrollEnabled={true}
                contentContainerStyle={{ flexGrow: 1 }}>

                <View style={styles.container} >

                    {/* image for community */}
                    <B4 />


                    {/* Community name field */}
                    <View style={{ flex: 3 }}>



                        {/* Description field */}
                        <View style={{ marginTop: 8 }}>
                            <Text style={styles.label}>Your Description :</Text>
                            <TextInput
                                style={styles.textArea}
                                value={description}
                                multiline
                                numberOfLines={6}
                                maxLength={1000}
                                onChangeText={setdescription}
                            />
                            <Text style={styles.descriptionLength}>{description.length}/1000 </Text>





                        </View>


                        <View >
                            <TextInput
                                style={styles.input}
                                maxLength={100}
                                placeholder="Resume / Portfolio url"
                                placeholderTextColor={"gray"}
                                value={portfolioUrl}
                                onChangeText={setPortfolioUrl}
                            />
                        </View>


                        <Pressable onPress={() => {



                            applyjob(item._id, paramsData.id);

                        }} style={styles.button}>

                            {/* show loading if pressed on post button */}

                            {loading ?

                                <ActivityIndicator size={24} color="#16181a" />

                                : <Text style={styles.buttonText}>Apply</Text>
                            }

                        </Pressable>

                    </View>
                </View>
            </ScrollView>

        </GestureHandlerRootView>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#16181a",
        padding: 10,
        alignItems: 'stretch',
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#00FF00",
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: "center",
        marginVertical: 10,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#888",
        color: "#ccc",
        fontSize: 18,
        paddingVertical: 5,
        marginBottom: 10,
        fontFamily: 'Roboto'

    },
    label: {
        color: "gray",
        fontSize: 18,
        marginBottom: 5,
        marginLeft: 5,
        fontFamily: 'Roboto'
    },
    textArea: {
        height: 150,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 20,
        color: "#ccc",
        fontSize: 18,
        padding: 10,
        textAlignVertical: "top",
        fontFamily: 'Roboto',
    },
    picker: {
        backgroundColor: "#333",
        borderColor: "gray",
        marginBottom: 10,
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

    descriptionLength: {
        color: "#666",
        textAlign: 'right',
        position: 'relative',
        bottom: 25,
        right: 10
    },

    errorStyle: {
        color: "#E65858",
        fontSize: 12
    }
})

export default JobApplyScreen