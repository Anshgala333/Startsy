import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Pressable, ScrollView } from 'react-native';
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

    const handleSubmit = async () => {
        
        if(rating==0){
            Alert.alert("Please select a rating");
            return;
        }
        console.log(rating);
        
        try {
            
            const response = await  fetch(`${url}test/ratingsController`, {
                method: 'POST',
                body: JSON.stringify({ ratingText: description,ratingStars:rating }),
                headers: {
        
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
         
            
            console.log(data);

        }
        catch (err) {
            console.log(err);

        }
       
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#16181A" }}>
            <View style={styles.container}>
                <Pressable onPress={() => navigation.goBack()}>
                    <FontAwesome6 name="chevron-left" size={28} style={{ alignSelf: 'flex-start', marginLeft: 6 }} color="#00DF60" />
                </Pressable>
                <View style={styles.box}>


                    <Text style={styles.heading}>Rate Us</Text>

                    {/* ⭐ Star Rating */}
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

                    {/* ✍ Description Box */}
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


                    {/* 🚀 Submit Button */}
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitText}>Submit</Text>
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