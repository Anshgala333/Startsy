import React from 'react';
import { View, Text, Image, Pressable, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ResizeTextMode, AutoSizeText } from 'react-native-auto-size-text'; // Make sure you have this
import { MaterialCommunityIcons } from '@expo/vector-icons';


const time = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

const dummyData = [
    {
        id: 1,
        investor: {
            _id: "user1",
            profilePhoto: "https://randomuser.me/api/portraits/men/32.jpg",
            role: "Founder",
            roleId: {
                fullName: "Aryan Patel",
                user_id: { role: "Founder" },
                hiddenInfo: {
                    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra.`
                }
            }
        },
        requestDate: "2025-04-05T12:00:00Z"
    }

];

const token = "dummy_token";

export default function CardsList({ navigation }) {
    
    const renderCard = ({ item }) => (
        <LinearGradient
            style={styles.card}
            colors={["rgba(36, 39, 42 , 0.4)", "rgba(22, 24, 26 , 0.6)"]}
            locations={[0, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <View style={styles.header}>
                <Pressable
                    // onPress={() => {
                    //     navigation.navigate("Singleuserpage", {
                    //         token: token,
                    //         id: item.investor._id,
                    //         page: "bell",
                    //     });
                    // }}
                    style={{ display: "flex", flexDirection: "row", }}
                >
                    <Image
                        source={{ uri: item.investor.profilePhoto }}
                        style={styles.image}
                    />

                    <View style={{ justifyContent: "center", }}>
                        <AutoSizeText
                            numberOfLines={1}
                            fontSize={20}
                            mode={ResizeTextMode.max_lines}
                            ellipsizeMode="tail"
                            style={styles.name}
                        >
                            {item.investor.roleId.fullName}
                        </AutoSizeText>

                        <Text style={{ color: "#00de62", fontSize: 12,fontFamily:'Roboto' }}>
                            {item.investor.roleId.user_id.role === "CommunityMember"
                                ? "Member"
                                : item.investor.roleId.user_id.role}
                        </Text>
                    </View>

                </Pressable>

                <Text style={styles.date}>{time(item.requestDate)}</Text>
            </View>


            <View style={styles.divider}></View>

          




            <Text
                style={styles.info}
                numberOfLines={null}
                ellipsizeMode="tail"

            >
                {item.investor.roleId.hiddenInfo.description}
            </Text>


            <View style={{ marginTop: 16, paddingHorizontal: 16,}}>
                <MaterialCommunityIcons name="certificate" size={32} color="gray" />
            </View>





            <View style={styles.contactView}>
                <TouchableOpacity
                    // onPress={() => open(item.userName, item.email, item.contactInfo)}
                   
                    style={styles.contact}
                >
                    <Text style={{ color: "#16181a", fontFamily: "Alata" }}>
                        Contact
                    </Text>
                </TouchableOpacity>
            </View>

        </LinearGradient>
    );

    return (
        <View style={{ backgroundColor: '#16181a', flex: 1 }}>
            <FlatList
                data={dummyData}
                keyExtractor={(item) => item.id}
                renderItem={renderCard}
                contentContainerStyle={{ padding: 16 }}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1a1a1a',
        borderRadius: 20,
        // padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
        width: '100%'

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // marginBottom: 8,
        marginHorizontal:16,
        marginTop:16,
        
    
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    role: {
        fontSize: 24,
        color: '#E9E9E9',
        flex: 1,
        fontFamily: "Roboto"
    },
    date: {
        fontSize: 12,
        color: '#666',
        // position: "absolute",
        // right: 0,
        // top: 20,
        fontFamily: "Roboto",
        // alignSelf: "center",
        marginTop: -10,
        // backgroundColor : "red"
    },
    name: {
        fontSize: 32,
        color: '#B8B8B8',
        // fontWeight: 'bold',
        // marginBottom: 8,
        fontFamily: "Roboto",
        // backgroundColor: "red"
    },
    info: {
        color: "gray",
        // backgroundColor:'red',
        fontSize: 14,
        marginTop: 16,
        lineHeight: 20,
        marginHorizontal: 16,
        fontFamily:'Roboto'
        // textAlign: 'justify'
    },

    contactView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 30,
        marginTop: 16,
        marginBottom: 16,
        paddingHorizontal: 16
    },
    buttonAccept: {
        backgroundColor: 'transparent',
        borderRadius: 30,
        paddingVertical: 0,
        paddingHorizontal: 20,
        height: 41,
        width: 150,
        borderWidth: 2,
        borderColor: "#B8B8B8",
        justifyContent: "center",
        alignItems: "center",

    },
  
    buttonText: {
        fontSize: 18,
        color: '#00DE62',
        // fontWeight: 'bold',
        fontFamily: "Alata",
        textAlign: "center",
        textAlignVertical: "center",
        marginTop: -5
    },
    no: {
        textAlign: "center",
        color: "#666",
        alignSelf: "center",
        justifyContent: "center",
        // position : "absolute",
        elevation: 100,
        bottom: 0,
        // fontFamily: "Roboto",
        fontSize: 16,
        paddingTop: 300,
        alignSelf: "center",
    },
    divider: {
        width: "100%",
     
        height: 1,
     
        marginTop: 16,
        backgroundColor: "#24272A"
    },

    contact: {

        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
        backgroundColor:'#ccc'
    },


});
