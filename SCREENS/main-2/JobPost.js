import React, { useContext, useState, useRef, memo, useCallback } from "react";
import { FlatList, Text, Touchable, TouchableOpacity, Pressable, View, Vibration, Image, SafeAreaView, RefreshControl } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import styles from "../../styles/post.js"
import { Video } from 'expo-av';
import Upvote from "@/assets/icons/upvote.js";
import Share from "@/assets/icons/share.js";
import { url } from "@/config.js";
import { GlobalContext } from "@/Global/globalcontext.js";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from "expo-router";


const JobpostPage = memo(({ allpost, setallpost, getpost, scrollY, navigation }) => {

    console.log("job re render");



    useFocusEffect(useCallback(() => {
        console.log("focused ");
        scrollY.setValue(0)

    }, []))


    const [refreshing11, setRefreshing11] = useState(false)

    const data = useContext(GlobalContext)
    var token = data.globaldata.token



    async function applyjob(id, index) {


        if (allpost[index].Jobapplied) {
            return
        }
        Vibration.vibrate(100)



        setallpost(allpost.map((e, i) => {
            if (i == index) {
                var object = { ...e, Applied: true }
                return object
            }
            else return e
        }))

        try {
            const response = await fetch(`${url}posts/applyJobPost/${id}`, {
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
            console.log(response.status);
            if (response.status === 200) {
                setallpost(allpost.map((e, i) => {
                    if (i == index) {
                        var object = { ...e, Jobapplied: true }
                        return object
                    }
                    else return e
                }))
            }
            if (response.status === 400) {
                showToastWithGravity("you have already applied")
            }

        }
        catch (err) {
            console.log(err);

        }
    }


    const renderItem =
        ({ item, index }) => {


            if (item.user_id == null) {
                return
            }
            else {
                console.log(item.jobPosts?.amount );
                

                if (item.type == "jobPost") {
                    return (
                        <LinearGradient
                            colors={["rgba(33, 34, 35, 0.4)", "rgba(25, 26, 27, 0.6)"]}
                            locations={[0, 1]}
                            style={styles.box}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }} >
                            <View style={styles.top} >
                                <TouchableOpacity
                                    onPress={() => { navigation.navigate("Singleuserpage", { token: token, id: item.user_id._id, page: "Startsy" }) }}
                                    style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                    <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                        <Image style={styles.userimg} source={{ uri: item.user_id.profilePhoto }} />
                                        <View style={styles.userdetail}>
                                            <Text allowFontScaling={false} style={styles.u1}>{item.user_id.userName}</Text>
                                            <Text allowFontScaling={false} style={styles.u2}>{item.user_id.role == "CommunityMember" ? "Member" : item.user_id.role}</Text>
                                        </View>
                                    </View>

                                </TouchableOpacity>
                            </View>
                            <View style={styles.divider}></View>
                            <View style={styles.lower}>
                                <Text style={styles.com1}>Role: {item.jobPosts.role}</Text>
                                {/* <Text>{JSON.stringify(item.jobPosts)}</Text> */}
                                <Text style={styles.com2}><Text style={styles.desc1}>Job description: </Text>{item.jobPosts.description}</Text>
                                <Text allowFontScaling={false} style={styles.u8}><Text style={{ color: "#828282" }}>Duration: {item.jobPosts.duration}</Text></Text>
                                <Text allowFontScaling={false} style={styles.u8}><Text style={{ color: "#828282" }}>Payment mode: {item.jobPosts.pay} </Text> </Text>
                                {  item.jobPosts.amount != "" && <Text allowFontScaling={false} style={styles.u8}><Text style={{ color: "#828282" }}></Text>Amount: {item.jobPosts.amount} </Text>}

                                <TouchableOpacity onPress={() => { applyjob(item._id, index) }} style={[!item.Jobapplied ? styles.job : styles.next11,]} >
                                    <Text allowFontScaling={false} style={!item.Jobapplied ? styles.nexttext : styles.nexttext11}>{item.Jobapplied ? 'Applied' : "Apply"}</Text>
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                    )
                }

            }

        }




    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#16181a", minHeight: 500 }}>

            <FlatList
                ListHeaderComponent={() => {
                    return (
                        <Pressable onPress={()=>navigation.navigate("Jobposted", { token: token })} style={styles.Jobbtn}>
                            <Text style={styles.jobbtntext}>View your job posts</Text>
                        </Pressable>
                    )
                }}
                showsVerticalScrollIndicator={false}
                // style={main.scroll1}
                initialNumToRender={5}
                windowSize={10}
                maxToRenderPerBatch={5}
                scrollEventThrottle={0}
                keyExtractor={(item, index) => { return index }}
                removeClippedSubview={false}
                data={allpost}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingTop: 130,
                    paddingBottom: 100
                }}

                onScroll={(e) => {
                    scrollY.setValue(e.nativeEvent.contentOffset.y)
                }}




                refreshControl={

                    <RefreshControl
                        progressBackgroundColor="#16181a"
                        colors={['#00de62']}
                        progressViewOffset={100}
                        refreshing={refreshing11}

                        onRefresh={() => {
                            setRefreshing11(true);
                            getpost()
                            Vibration.vibrate(100)
                            setTimeout(() => {
                                setRefreshing11(false); // Stop refreshing after fetching data
                            }, 2000); // Adjust the delay as needed
                        }}
                    />
                }

            />
        </SafeAreaView>
    )
})


export default JobpostPage
