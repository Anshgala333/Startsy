


import React, { useState, useRef, useEffect, useCallback } from "react";
import { Text, Animated, RefreshControl, StatusBar, View, Image, FlatList, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions, ScrollView, Pressable, Vibration } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { url } from "../../config.js"
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const InvestorCard = ({ route }) => {


    const { token, navigation } = route.params

    const [items, setItems] = useState([])
    const [animation, setanimation] = useState([]);
    const [loading, setloading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [refreshing11, setRefreshing11] = useState(false);
    // console.log("request screen of ofunder ");
    const animatedValues = useRef({})
    async function getData() {
        setloading(true);
        try {
            const response = await fetch(
                `${url}founder/getFounderNotifications`,
                {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const result = await response.json();
            const { data } = result

            const filteredData = data.filter((e) => e.investor != null)
            console.log(result, "okkkkkkkkkkkkkkk");


            if (response.status == 200) {


                var array = result.data.map((item, index) => {
                    // console.log(item, index);
                    // console.log(result.data.length, "shdkasuhdkshdkjshdkshkasjhfkhfkhfkasjfhksjfhk");

                    item["id"] = index + 1

                    // console.log(item["id"]);
                    return item
                })
                // console.log(array.length, "yeh hai arraya");


                const uniqueData = filteredData.filter((item, index, self) =>
                    self.findIndex(innerItem => innerItem.investor._id === item.investor._id) === index
                );

                // array = array.filter((item , index , array)=> array.indexOf(item) == index)
                setItems(uniqueData)
            }


        } catch (err) {
            console.log(err, "errr");
        }
        finally {
            setloading(false);
        }
    }

    // Update animationRefs whenever data changes
    useEffect(() => {


        getData();


    }, [])


    useEffect(() => {
        if (items && items.length > 0) {
            // items.forEach(item => console.log(item.id)
            // )

            // console.log("hiiiiiiiiiiiii");

            animatedValues.current = items.reduce((acc, item) => {
                acc[item.id] = {
                    translateX: new Animated.Value(0),
                    opacity: new Animated.Value(1),
                    scaleY: new Animated.Value(1),
                };
                return acc;
            }, {});

            // console.log(animatedValues);

        }
    }, [items]);

    function time(time) {
        // console.log('====================================');
        // console.log(time);
        var data1 = new Date(time)

        var seconds = Math.floor((new Date() - data1) / 1000);

        var interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " years ago";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months ago";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days ago";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours ago";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes ago";
        }
        return Math.floor(seconds) + " seconds ago";
    }




    function rendercard({ item, index }) {

        // console.log(item, "render card ka item");

        // if(item.)






        const moveItem = (id, direction) => {

            if (!animatedValues.current[id]) return;

            // console.log(direction);



            if (direction == "left") {
                const id = item.investor._id;
                // console.log(id);

                console.log(`${url}founder/acceptRequest/${id}`);


                async function makesubmit1() {

                    // console.log("left wala ");


                    try {
                        const response = await fetch(`${url}founder/acceptRequest/${id}`, {
                            method: 'POST',
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        })
                        const data = await response.json();
                        console.log(data);

                    }
                    catch (err) {
                        console.log(err);

                    }
                }
                makesubmit1()

            }

            else if (direction == "right") {

                // console.log("hutt");

                const id = item.investor._id;
                async function makesubmit() {

                    try {
                        const response = await fetch(`${url}founder/rejectRequest/${id}`, {
                            method: 'POST',
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        })
                        const data = await response.json();
                        // console.log(data);

                    }
                    catch (err) {
                        console.log(err);

                    }
                }
                makesubmit()
            }

            const translateValue = direction === "left" ? -width : width; // Left or right movement


            Animated.parallel([
                Animated.timing(animatedValues.current[id].translateX, {
                    toValue: translateValue, // Move the item
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedValues.current[id].opacity, {
                    toValue: 0, // Fade out
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedValues.current[id].scaleY, {
                    toValue: 0.7, // Shrink the item vertically
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                // Delete item after animation completes
                setItems((prevItems) => {
                    const updatedItems = prevItems.filter(item => item.id !== id);
                    // Animate remaining items to fill the gap
                    updatedItems.forEach((item) => {
                        Animated.timing(animatedValues.current[item.id].translateX, {
                            toValue: 0,
                            duration: 500,
                            useNativeDriver: true,
                        }).start();
                        Animated.timing(animatedValues.current[item.id].opacity, {
                            toValue: 1,
                            duration: 500,
                            useNativeDriver: true,
                        }).start();
                        Animated.timing(animatedValues.current[item.id].scaleY, {
                            toValue: 1,
                            duration: 500,
                            useNativeDriver: true,
                        }).start();
                    });
                    return updatedItems;
                });
            });
        };

        return (
            <Animated.View
            // style={[
            //     {
            //         transform: [
            //             { translateX: animatedValues.current[item.id]?.translateX },
            //             { scaleY: animatedValues.current[item.id]?.scaleY },
            //         ],
            //         opacity: animatedValues.current[item.id]?.opacity,
            //     },
            // ]}

            >
                <LinearGradient
                    style={styles.card}
                    colors={["rgba(36, 39, 42 , 0.4)", "rgba(22, 24, 26 , 0.6)"]}
                    locations={[0, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                >
                    <View style={styles.header}>

                        <Pressable
                            onPress={() => { navigation.navigate("Singleuserpage", { token: token, id: item.investor._id, page: "bell" }) }}
                            style={{ width: 'auto', display: 'flex', flexDirection: 'row', gap: 10 }}
                        >
                            <View style={{ justifyContent: 'center' }}>
                                <Image
                                    source={{ uri: item.investor.profilePhoto }}
                                    // source={require("../../assets/images/p2.png")}
                                    style={styles.image}
                                />
                            </View>
                            {/* <Text style={styles.role}>{item.investor.roleId.user_id.role} </Text> */}
                            <View style={{ alignItems: 'flex-start', }}>

                                <AutoSizeText
                                    numberOfLines={1}
                                    fontSize={20}
                                    mode={ResizeTextMode.max_lines}
                                    ellipsizeMode='tail'
                                    style={styles.name}>{item.investor.roleId.fullName}
                                </AutoSizeText>

                                <AutoSizeText
                                    numberOfLines={1}
                                    // fontSize={26}
                                    mode={ResizeTextMode.max_lines}
                                    ellipsizeMode='tail'
                                    style={styles.role}>{item.investor.roleId.user_id.role == "CommunityMember" ? "Member" : item.investor.roleId.user_id.role}
                                </AutoSizeText>
                            </View>

                        </Pressable>


                        <View style={{justifyContent:'center'}}>
                            <Text style={styles.date}>{time(item.requestDate)}</Text>
                            <Text style={styles.date}></Text>
                        </View>

                    </View>

                    <View style={styles.divider1}></View>

                    {/* <Text style={styles.name}>{item.investor.roleId.fullName}</Text> */}

                    {/* <Text style={styles.name}>Ansh Gala</Text> */}

                    {item.investor.role == "Investor" && <Text style={styles.info}>Investing experience - {item.investor.roleId.previousExperience} years</Text>}
                    {item.investor.role == "Investor" && <Text style={styles.info1}>Investing Capacity - {item.investor.roleId.investmentRange}</Text>}

                    {item.investor.role == "Founder" && <Text style={styles.info}>Stage of Startup - {item.investor.roleId.hiddenInfo.stageOfStartup} </Text>}
                    {item.investor.role == "Founder" && <Text style={styles.info1}>Startup Sector - {item.investor.roleId.hiddenInfo.sector}</Text>}

                    {(item.investor.role == "CommunityMember" && item.investor.roleId.skills != "") &&
                        <Text style={styles.info}>{item.investor.roleId.skills}</Text >}
                    {(item.investor.role == "CommunityMember" && item.investor.roleId.tagline != "") &&
                        <Text style={styles.info}>{item.investor.roleId.tagline}</Text >}






                    <View style={styles.actions}>
                        <Pressable onPress={() => { moveItem(item.id, "left", item) }} style={styles.buttonAccept}>
                            <Text style={styles.buttonText}>Accept</Text>
                        </Pressable>
                        <Pressable onPress={() => { moveItem(item.id, "right", item) }} style={styles.buttonAccept}>
                            <Text style={styles.buttonText}>Reject</Text>
                        </Pressable>
                    </View>
                </LinearGradient>
            </Animated.View >
        );
    }

    function Header1() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.no}>No new request found</Text>
            </View>
        )
    }

    function header1() {
        return (
            <>{items && items.length == 0 && <Header1 />}</>
        )
    }


    return (

        <View
            // refreshControl={<RefreshControl progressViewOffset={0} refreshing={refreshing}/>
            style={{ flex: 1, backgroundColor: "#16181a" }}>
            <View style={styles.topHeader}>
                <View style={styles.headerSide}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <FontAwesome6 name="chevron-left" size={25} style={styles.backIcon} color="#00DF60" />
                    </Pressable>
                </View>

                <View style={styles.headerCenter}>
                    <Text style={styles.title}>Requests</Text>
                </View>

                <View style={styles.headerSide} />
            </View>
            <FlatList
                ListHeaderComponent={header1}

                refreshControl={<RefreshControl progressViewOffset={0} refreshing={refreshing}
                    progressBackgroundColor="#16181a"
                    colors={['#00de62']}
                    onRefresh={() => {
                        // console.log("start");
                        // setRefreshing(true)
                        Vibration.vibrate(200)
                        getData();

                        setTimeout(() => {
                            setRefreshing(false); // Stop refreshing after fetching data
                        }, 2000); // Adjust the delay as needed
                    }} />}

                contentContainerStyle={{ paddingBottom: 100 }}
                style={{ flex: 1, backgroundColor: "#16181a", alignContent: "flex-start" }}
                data={items}
                renderItem={rendercard} // Correct integration
            // keyExtractor={(item, index) => index.toString()} // Ensure keys are unique
            />

            {/* <Text>hello</Text> */}
        </View>

    );
};


export default InvestorCard
const { height, width } = Dimensions.get("window");


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1a1a1a',
        borderRadius: 20,
        // padding: 16,
        margin: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,

    },
    divider1: {
        width: "100%",
        // marginLeft: -20,
        height: 1,
        marginHorizontal: "auto",
        // marginTop: 20,
        // marginBottom: 20,
        backgroundColor: "#24272A"
      },
    header: {
        flexDirection: 'row',
        width: '100%',

        padding: 8,

        justifyContent: 'space-between'
        // marginBottom: 8,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        // marginRight: 12,
    },
    role: {
        fontSize: 11,
        color: '#00de62',
        // flex: 1,
        fontFamily: "Roboto"
    },
    date: {
        fontSize: 10,
        color: '#666',
        // position: "absolute",
        right: 0,
        // top: 10,
        fontFamily: "Roboto",
        // alignSelf: "center",
        // marginTop: -10,
        // backgroundColor : "red"
    },
    name: {
        fontSize: 20,
        color: '#ccc',
        // width:'10%',
        // fontWeight: 'bold',
        // marginBottom: 8,
        fontFamily: "Alata",
        // backgroundColor: "red"
    },
    info: {
        fontSize: 16,
        color: '#D9D9D9',
        marginBottom: 4,
        marginTop: 4,
        fontFamily: "Roboto"
    },
    info1: {
        fontSize: 16,
        color: '#00DE62',
        marginBottom: 4,
        marginTop: 4,
        fontFamily: "Roboto"
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 30,
        marginTop: 16,
    },
    buttonAccept: {
        backgroundColor: 'transparent',
        borderRadius: 30,
        paddingVertical: 0,
        paddingHorizontal: 20,
        height: 41,
        width: 117,
        borderWidth: 2,
        borderColor: "#B8B8B8",
        justifyContent: "center",
        alignItems: "center",

    },
    buttonReject: {
        backgroundColor: '#ff0000',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
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
    title: {
        fontSize: 20,
        color: "#E9E9E9",
        fontFamily: "Alata",
        textAlign: "center",
    },
    topHeader: {
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


});