import React, { useContext, useState } from 'react';
import { View, Text, ToastAndroid, TextInput, TouchableOpacity, Alert, StyleSheet, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Importing star icons
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { GlobalContext } from '@/Global/globalcontext';
import { url } from '@/config';


const RatingPage = ({ navigation }) => {

    const data = useContext(GlobalContext);
    const token = data.globaldata.token;


    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleStarPress = (star) => {
        setRating(prevRating => (prevRating === star ? 0 : star));
    };

    const showToastWithGravity = (message) => {
        ToastAndroid.showWithGravityAndOffset(
            `${message}`,
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
            100, 100
        );
    };

    const handleSubmit = async () => {

        if (rating == 0) {
            Alert.alert("Please select a rating");
            return;
        }
        console.log(rating);
        var object = {
            ratingText: description,
            ratingStars: rating,
            version: "v7"
        }
        setLoading(true)

        try {

            const response = await fetch(`${url}test/ratingsController`, {
                method: 'POST',
                body: JSON.stringify(object),
                headers: {

                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            showToastWithGravity(`Thank You ! `)

            console.log(data);

        }
        catch (err) {
            console.log(err);

        }
        finally {
            setLoading(false);
            setTimeout(() => {
                navigation.goBack()
            }, 1000);
        }

    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#16181A" }}>
            <View style={styles.header}>
                <View style={styles.headerSide}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <FontAwesome6 name="chevron-left" size={25} style={styles.backIcon} color="#00DF60" />
                    </Pressable>
                </View>

                <View style={styles.headerCenter}>
                    <Text style={styles.title}>Feedback</Text>
                </View>

                <View style={styles.headerSide} />
            </View>
            <View style={styles.container}>

                <View style={styles.box}>


                    <Text style={styles.heading}>Rate Us</Text>


                    <View style={styles.starContainer}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
                                <FontAwesome
                                    name={star <= rating ? "star" : "star-o"}
                                    size={32}
                                    color={star <= rating ? "#00de62" : "#ccc"}
                                    style={styles.star}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>


                    <View style={{ marginTop: 10, width: '90%' }}>
                        <TextInput
                            style={styles.textArea}
                            value={description}
                            multiline
                            placeholder='Write Your Feedback'
                            placeholderTextColor={"#ccc"}

                            numberOfLines={6}
                            maxLength={1000}
                            onChangeText={setDescription}
                        />
                        <Text style={styles.descriptionLength}> </Text>

                    </View>


                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
                        {
                            loading ? (
                                <ActivityIndicator color="#16181a" />
                            ) : (
                                <Text style={styles.submitText}>Submit</Text>
                            )
                        }
                    </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#16181A',
        padding: 20,
    },
    title: {
        fontSize: 20,
        color: "#E9E9E9",
        fontFamily: "Alata",
        textAlign: "center",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#24272A",
    },

    headerSide: {
        width: 40, // same width as the icon button area
        alignItems: "flex-start",
        justifyContent: "center",
    },

    headerCenter: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    box: {
        marginTop: "50%",
        // justifyContent : "center",
        alignContent: "center",
        alignItems: "center",
    },
    heading: {
        fontSize: 24,
        marginBottom: 20,
        fontFamily: "Alata",
        color: "#ccc",
    },
    starContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    star: {
        marginHorizontal: 5,
    },
    input: {
        width: "90%",
        height: 200,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 10,
        textAlign: 'auto',
        fontSize: 16,
        fontFamily: "Alata",
        backgroundColor: "#16181A",
        color: "#ccc"

    },
    submitButton: {
        width: 150,
        height: 42,
        backgroundColor: "#00de62",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        marginTop: 20,
    },
    submitText: {
        color: "#16181a",
        fontSize: 20,
        fontFamily: "Alata",
        marginTop: -5,
    },
    textArea: {
        height: 150,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 20,
        color: "#ccc",
        fontSize: 16,
        // width:'90%',
        padding: 10,
        fontFamily: 'Alata',
        textAlignVertical: "top",
    },
});

export default RatingPage;