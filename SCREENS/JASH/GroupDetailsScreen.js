import { useEffect, useState, useRef, useMemo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, ToastAndroid, Pressable, KeyboardAvoidingView } from "react-native";
import { url } from "@/config.js";
import Profile from "../../assets/icons/profile.js"
import Entypo from '@expo/vector-icons/Entypo';

import { jwtDecode } from "jwt-decode";

import * as ImagePicker from 'expo-image-picker';

import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";


// import Entypo from '@expo/vector-icons/Entypo';



const GroudDetailsScreen = ({ route }) => {
    var { item, token } = route.params;


    const [isCommunityLocked, setIsCommunityLocked] = useState(false);
    const [editIsEnabled, setEditIsEnabled] = useState(false);
    const [groupName, setGroupName] = useState(item.communityName)
    const [groupDescription, setGroupDescription] = useState(item.communityDescription);
    var [groupImage, setgroupImage] = useState("")
    const [data, setData] = useState([]);
    const [targetid, settargetid] = useState(null);
    const [Deletebtn, setDeletebtn] = useState(false);

    var rec1 = useRef(null)
    var rec2 = useRef(null)

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


    const updateGroupDetail = async () => {


        
        const data = {
            communityName: typeof rec1.current === "string"? rec1.current : groupName,
            communityDescription: typeof rec2.current === "string"? rec2.current : groupDescription ,
        }


        try {
            const response = await fetch(`${url}posts/updateCommunity/${communityID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            

            if (response.status == 200) {
                showToastWithGravity(`Group detail updated successfully`)
                const data1 = await response.json();
                console.log(data1);
            }
        } catch (error) {
            console.log(error);
        }
        finally {

            setGroupName(data.communityName);
            setGroupDescription(data.communityDescription);
        }


    }

    const showToastWithGravity = (message) => {
        ToastAndroid.showWithGravityAndOffset(
            `${message}`,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            100, 100
        );
    };




    const lockCommunity = async () => {
        let status = "";


        if (isCommunityLocked) {
            status = "unlocked"
        }

        else {
            status = "locked"


        }
        try {

            const response = await fetch(`${url}posts/lockCommunity/${communityID}/${status}`, {
                method: 'POST',
                // body: "",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },

            });
            const data = await response.json();

            console.log(response.status);
            console.log(data);
            if (response.status == 200) {
                showToastWithGravity(`Group ${status} successfully`)
            }


        }
        catch (error) {
            console.log(error)
        }

    }


    var decode = jwtDecode(token)
    useEffect(() => {

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

                var admin = data.data.filter((item) => item.id == communityAdmin)
                var otherUsers = data.data.filter((item) => item.id != communityAdmin)

                var allUsers = [...admin, ...otherUsers];


                setData(allUsers)
            } catch (err) {
                console.log(err);
            }
        }


        getData()
    }, [])








    const toggleFollow = (id) => {
        setData((prev) =>
            prev.map((user) =>
                user.id === id ? { ...user, followed: !user.followed } : user
            )
        );
    };
    var decode = jwtDecode(token)

    function deleteuser(userid) {
        console.log(userid);

        settargetid(userid)
        var decode = jwtDecode(token)
        if (communityAdmin != decode._id) return
        if (userid == decode._id) return

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


        }
        catch (err) {
            console.log(err);

        }

    }

    // var [image  , setImage] = useState("")


    useEffect(() => {
        if (item.groupPhoto) {
            setgroupImage(item.groupPhoto)
        }
    }, [item])

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
            aspect: [1, 1], // Aspect ratio of the image
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
                    body: final,
                    headers: {
                        accept: "application/json",
                        "Authorization": token,
                    },
                });
                const data = await response.json();
                console.log(data);


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

                    {item.id != decode._id && <TouchableOpacity
                        // onPress={() => { sendfollowrequest(item.status, item._id) }}
                        style={item.status != "Connect" ? styles.sendbtn1 : styles.sendbtn}>
                        <Text style={item.status != "Connect" ? styles.sendbtnText1 : styles.sendbtnText}>
                            {item.status}</Text>
                    </TouchableOpacity>}
                </View>
            </TouchableOpacity>
        )
    }





    const ListHeader = () => (
        <View style={{ alignItems: "center", marginBottom: 10 }}>


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



            {
                editIsEnabled ?
                    <>

                        <TextInput

                            ref={rec1}
                            placeholderTextColor='white'
                            defaultValue={groupName}
                            // value={grcoupName}

                            // defaultValue={groupName}
                            // value={groupName}
                            // onChangeText={(text) => gName = text}
                            // onChangeText={(text) => setGroupName(text)}
                            // onEndEditing={() => setGroupName(gName)}
                            onChangeText={(text) => (rec1.current = text)}
                            style={styles.input}
                        />

                        <TextInput
                            ref={rec2}
                            // value={groupDescription}

                            placeholderTextColor='white'
                            defaultValue={groupDescription}
                            onChangeText={(text) => (rec2.current = text)}
                            // onEndEditing={() => setGroupDescription(des)}
                            style={styles.desInput}
                            multiline={true}
                            numberOfLines={4}
                        />


                    </>
                    :
                    <>

                        <>
                            <Text style={styles.groupName}>
                                {groupName}
                            </Text>
                            <Text
                                numberOfLines={3}
                                ellipsizeMode="tail"
                                style={styles.description}>
                                {groupDescription}
                            </Text>
                        </>

                    </>
            }





        </View>
    )

    return (


        <GestureHandlerRootView>
            <View style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.tittle}>Group Details</Text>

                    {decode._id == communityAdmin && <View style={{ display: 'flex', flexDirection: 'row', gap: 20, justifyContent: 'flex-end', alignItems: 'flex-end' }}>

                        <TouchableOpacity onPress={() => {
                            setIsCommunityLocked(prev => !prev)
                            lockCommunity()
                        }}>

                            {
                                isCommunityLocked ?
                                    <Entypo name="lock" size={24} color="#00de62" />
                                    :
                                    <Entypo name="lock-open" size={24} color="#ccc" />
                            }
                        </TouchableOpacity>
                        {/* <Entypo name="edit" size={24} color="#ccc" /> */}
                        {
                            !editIsEnabled ?
                                <TouchableOpacity onPress={() => setEditIsEnabled(prev => !prev)}>
                                    <Text style={{ color: "#ccc", fontSize: 16 }}>Edit</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => {
                                    // console.log(groupDescription);




                                    setEditIsEnabled(prev => !prev)

                                    updateGroupDetail();
                                }}>
                                    <Text style={{ color: "#ccc", fontSize: 16 }}>Save</Text>
                                </TouchableOpacity>
                        }
                    </View>}

                </View>
                <FlatList
                    // keyboardShouldPersistTaps="handled"
                    removeClippedSubviews={false}
                    contentContainerStyle={{ padding: 5 }}
                    ListHeaderComponent={
                        <ListHeader />
                    }
                    keyboardShouldPersistTaps={true}
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}

                />

                {/* <Text style={{color:"white"}}>{groupName}</Text> */}

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

                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <TouchableOpacity onPress={finalDelete} style={styles.deletebtn}>
                            <Text style={styles.delete}>Remove</Text>
                        </TouchableOpacity>
                    </View>

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
        // backgroundColor:'red',
        alignItems: 'center',
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 0,
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 20
    },
    tittle: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#00DE62",
        // marginBottom: 12,
        fontFamily: "myanmar",
        color: "#00DE62",
    },
    delete: {
        color: "#fff",
        // textAlign:'left',

        // padding : 10
    },
    deletebtn: {
        marginTop: 20,
        backgroundColor: "red ",
        borderRadius: 20,
        paddingHorizontal: 20,
        justifyContent: "center",
        // paddingBottom:5,
        // textAlign:'left',
        alignItems: 'center',
        height: 35,
        width: "30%",
        marginHorizontal: 20,
        // borderBottomColor:"#ccc",
        // borderBottomWidth:1
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
    },

    input: {
        color: 'white',
        borderRadius: 10,
        borderBottomWidth: 2,
        borderColor: 'grey',
        paddingHorizontal: 10,
        marginBottom: 10,
        fontFamily: "Alata",
        width: '80%'
    },
    desInput: {
        height: 150,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 12,
        color: "white",
        width: '80%',
        padding: 10,
        textAlignVertical: "top",
    }
});

export default GroudDetailsScreen;




// (
// <>
//     <Text style={styles.groupName}>
//         {item.communityName}
//     </Text>
//     <Text
//         numberOfLines={3}
//         ellipsizeMode="tail"
//         style={styles.description}>
//         {item.communityDescription}
//     </Text>
// </>
// )