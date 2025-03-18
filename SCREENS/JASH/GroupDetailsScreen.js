import { useEffect, useState, useRef, useMemo } from "react";
import participants from "./Data.jsx";
import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, Pressable } from "react-native";
import { url } from "@/config.js";
import Profile from "../../assets/icons/profile.js"
import { jwtDecode } from "jwt-decode";

import * as ImagePicker from 'expo-image-picker';

import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";


const GroudDetailsScreen = ({ route }) => {
    var { item, token } = route.params;


    var communityAdmin = item.communityAdmin;
    var communityID = item._id;
    

    const mainpagebottomsheet = useRef();
    const snapPoints = useMemo(() => ['20%'], []);


    const renderBackdrop = (props) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1} // Backdrop disappears when BottomSheet is closed
            appearsOnIndex={0} // Backdrop appears when BottomSheet is open
            opacity={0.7} // Set opacity for the backdrop
        />
    );


    useEffect(() => {

        var decode = jwtDecode(token)
        async function getData() {
            try {
                const response = await fetch(`${url}api/getCommunityMemberProfile`, {
                    method: 'POST',
                    body: JSON.stringify({ array: item.communityMembers }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                console.log(data);
                setData(data.data)
            } catch (err) {
                console.log(err);
            }
        }


        getData()
    }, [])





    const [data, setData] = useState([]);
    const [targetid, settargetid] = useState(null);
    const [Deletebtn, setDeletebtn] = useState(false);


    const toggleFollow = (id) => {
        setData((prev) =>
            prev.map((user) =>
                user.id === id ? { ...user, followed: !user.followed } : user
            )
        );
    };

    function deleteuser(userid) {
        console.log(userid);

        settargetid(userid)
        var decode = jwtDecode(token)
        // if (communityAdmin != decode._id) return
        // if (userid == decode._id) return

        mainpagebottomsheet.current.expand()
        setDeletebtn(true)
    }


    async function finalDelete() {

        console.log(targetid);
        // return

        var obj = {
            communityId: communityID,
            userId: targetid
        }

        try {

            const response = await fetch(`${url}api/deleteMemberFromCommunity`, {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data1 = await response.json();
            console.log(data1);
            setData(data.filter((e) => e.id != targetid))
            mainpagebottomsheet.current.close()
        }
        catch (err) {
            console.log(err);

        }
        finally {
            mainpagebottomsheet.current.close()
        }
    }



    async function sendfollowrequest(stat, id) {

        if (stat) return

        setData(data.map((e) => {
            if (e._id == id) {
                return { ...e, status: "Request Sent" }
            }
            else return e

        }))


        console.log(id);
        try {

            const response = await fetch(`${url}connections/followUser/${id}`, {
                method: 'POST',
                body: "",
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data);
            // console.log(response.status);

            // setfollowstatus("request sent")
            // setconnecteddata("Request sent")

        }
        catch (err) {
            console.log(err);

        }

    }

    // var [image  , setImage] = useState("")
    var [groupImage  , setgroupImage] = useState("")

    if(item.groupPhoto){
        setgroupImage(item.groupPhoto)
    }

    const uploadImage = async () => {
        console.log("file upload");


        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Allow all media types
            allowsEditing: true, // Allows cropping the image
            aspect: [4, 3], // Aspect ratio of the image
            quality: 1, // Image quality (0 to 1)

        });


        if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            console.log(imageUri);
            var final = new FormData()

            if (imageUri) {
                final.append("media", {
                    uri: imageUri,
                    type: "image/jpeg",
                    name: `image_${Date.now()}.jpg`,
    
                })
            }
    
            try {

                const response = await fetch(`${url}posts/groupPhoto/${communityID}`, {
                    method: 'POST',
                    body :  final,
                    headers: {
                        accept: "application/json",
                        "Authorization": token,
                    },
                });
                const data = await response.json();
              
            }
            catch (err) {
                console.log(err);
            }

            setgroupImage(imageUri);


        }

    }


    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onLongPress={() => deleteuser(item.id)}>
                <View
                    style={styles.listContainer}
                >
                    <View style={styles.userInfoStyle}>
                        <Image width={20} height={20} source={{ uri: item.profilePhoto }} style={{ width: 50, height: 50, borderRadius: 30, borderWidth: 1, borderColor: "#999" }} />
                        <View style={{ display: "flex", flexDirection: "column", maxWidth: 140, height: 40 }}>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={styles.unmae}>{item.userName}
                            </Text>
                            <Text style={{ fontSize: 12, color: "#888" }}>{item.role == "CommunityMember" ? "Member" : item.role}

                                <Text style={{ color: "#00de62" }}> {item.id == communityAdmin ? " | Admin" : ""}</Text>

                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        // onPress={() => { sendfollowrequest(item.status, item._id) }}
                        style={item.status != "Connect" ? styles.sendbtn1 : styles.sendbtn}>
                        <Text style={item.status != "Connect" ? styles.sendbtnText1 : styles.sendbtnText}>
                            {item.status}</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    const ListHeader = () => (<View style={{ alignItems: "center", marginBottom: 10 }}>


        <Pressable onPress={uploadImage}>
            {groupImage && <Image
                source={{ uri: groupImage }}
                style={{ width: 120, height: 120, borderRadius: 100 }}
            />}
        </Pressable>
        <Pressable onPress={uploadImage} style={{ maxHeight: 120 }}>
            {!groupImage &&
                <Profile />
            }
        </Pressable>
        <Text style={styles.groupName}>
            {item.communityName}
        </Text>
        <Text
            numberOfLines={3}
            ellipsizeMode="tail"
            style={styles.description}>
            {item.communityDescription}
        </Text>
    </View>
    )

    return (

        <GestureHandlerRootView>
            <View style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.tittle}>Group Details</Text>

                </View>
                <FlatList
                    contentContainerStyle={{ padding: 5 }}
                    ListHeaderComponent={
                        <ListHeader />
                    }
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}

                />

                <BottomSheet
                    overlayColor="rgba(0, 0, 0, 0.9)"
                    enablePanDownToClose
                    backgroundStyle={{ backgroundColor: '#16181a', borderRadius: 30 }}
                    handleIndicatorStyle={{ backgroundColor: '#00de62' }}
                    style={{ zIndex: 100000, elevation: 1000 }}
                    enableDynamicSizing={false}
                    ref={mainpagebottomsheet}
                    snapPoints={snapPoints}

                    backdropComponent={renderBackdrop}
                    index={-1}
                >

                    <Pressable onPress={finalDelete} style={styles.deletebtn}>
                        <Text style={styles.delete}>delete</Text>
                    </Pressable>

                </BottomSheet>
            </View>
        </GestureHandlerRootView>


    )
}



const styles = StyleSheet.create({
    page: {
        backgroundColor: '#16181a',
        flex: 1
    },
    groupName: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,
        color: "#ccc"
    },
    description: {
        fontSize: 14,
        textAlign: "center",
        color: "gray",
    },
    listContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: 15,
        // backgroundColor: "gray",
        borderBottomColor: "#666",
        borderBottomWidth: 1,
        marginVertical: 5,
        // borderRadius: 10,
    },
    toggleFollow: {

        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    userInfoStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    header: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 0,
        paddingHorizontal: 20,
        marginTop: 10
    },
    tittle: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#00DE62",
        marginBottom: 12,
        fontFamily: "myanmar",
        color: "#00DE62",
    },
    delete: {
        color: "#fff"
        // padding : 10
    },
    deletebtn: {
        backgroundColor: "red",
        borderRadius: 20,
        paddingHorizontal: 20,
        justifyContent: "center",
        height: 35,
        width: 100,
        marginHorizontal: 20
    },


    sendbtn1: {
        backgroundColor: "#16181a",
        borderWidth: 2,
        borderColor: "#ccc",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,

        width: 120


    },

    sendbtnText1: {
        fontSize: 14,
        color: "#ccc",
        fontFamily: "Alata",
        textAlign: "center",


    },

    sendbtn: {
        backgroundColor: "#ccc",
        paddingHorizontal: 18,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#ccc",
        width: 120,
        textAlign: "center",



    },

    sendbtnText: {
        fontSize: 14,
        color: "#333",
        fontFamily: "Alata",
        textAlign: "center",



    },

    unmae: {
        fontSize: 16,
        flex: 1,
        //  maxWidth : 200,
        color: "#bbbbbb",
        marginBottom: -10
    }
});

export default GroudDetailsScreen;