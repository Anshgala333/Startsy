import { useFocusEffect } from "expo-router";
import React, { useState, useContext, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, RefreshControl, Vibration } from "react-native";
import { url } from "../../config.js"
import { GlobalContext } from "@/Global/globalcontext.js";
import { ActivityIndicator } from "react-native";
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';


const RequestsScreen = () => {
    console.log("request screen");

    const [token, setToken] = useState("");
    const [data, setData] = useState(null);
    const [loading, setloading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const { globaldata } = useContext(GlobalContext);
    const [dataFetched, setDataFetched] = useState(false);

    useFocusEffect(
        useCallback(() => {
            // console.log(globaldata, "global data");
            setToken(globaldata.token);
        }, [globaldata])
    );


    function time(time) {
        // console.log('====================================');
        // console.log(time);
        var data1 = new Date(time)
        // console.log('====================================');
        // console.log(data1);
        // console.log('====================================');
        // console.log('====================================');
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
            return Math.floor(interval) + " mins ago";
        }
        return Math.floor(seconds) + " seconds ago";
    }
    async function getData() {
        console.log(token, "second use focus eefct ");
        setloading(true);

        try {
            const response = await fetch(
                `${url}investor/getPendingRequestsByInvestor`,
                {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const result = await response.json();
            console.log(result, "investor");

            if (response.status == 200) {
                var datatobesaved = Object.entries(result.requestedFounders.requestedFounders)
                setData(datatobesaved)
                setDataFetched(true);
            }


        } catch (err) {
            console.log(err);
        }
        finally {
            setloading(false);
        }
    }


    useEffect(() => {
        if (token && !dataFetched) {

            getData();
        }
    }, [token, dataFetched])

    var data1 = [1, 2, 3]
    const onRefresh = () => {
        console.log('====================================');
        console.log("refrshing");
         Vibration.vibrate(200)
        console.log('====================================');
        // setRefreshing(true);
        getData();
        //  Vibration.vibrate(200)

        // Simulate a network request or data update
        // setTimeout(() => {
        //   setData((prevData) => [...prevData, `Item ${prevData.length + 1}`]); // Add a new item
        //   setRefreshing(false); // End refreshing state
        // }, 2000);

    };

    function getfund(fund) {
        if (fund == 69) {
            return 0
        }
        fund = fund - 57
        return (fund * 10000000).toLocaleString("en-IN")
    }

    return (

        <ScrollView
            contentContainerStyle={{
                paddingBottom: 100
            }}
            style={{ flex: 1, backgroundColor: "#16181a", paddingBottom: 0 }}
            refreshControl={
                <RefreshControl
                progressBackgroundColor="#16181a"
                colors={['#00de62']}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                     // Android loading spinner color
                    tintColor="#00DE62" // iOS loading spinner color
                />
            }
        >


            {!loading && data != null && data.map((item, index) => {

                // console.log('====================================');
                // console.log(item[1].founder.roleId.nameOfStartup);
                // console.log(item[1].founder.roleId.goal);
                // console.log(item[1].founder.roleId.hiddenInfo.stageOfStartup);
                // console.log(item[1].founder.roleId.hiddenInfo.fundingStatus);
                // console.log(item[1].founder.userName);
                // console.log(item[1].requestDate);
                // console.log('====================================');
                return (
                    <View View style={styles.c1} key={index} >
                        <View style={styles.card}>
                            {/* Header Section */}
                            <View style={styles.header1}>
                                <Image
                                    source={{ uri: item[1].founder.profilePhoto }}
                                    style={styles.profileImage}
                                />
                                <View style={styles.headerText}>
                                    {/* <Text allowFontScaling={false} style={styles.username}>
                                        {item[1].founder.userName}
                                    </Text> */}
                                    <AutoSizeText
                                        numberOfLines={1}
                                        fontSize={24}
                                        mode={ResizeTextMode.max_lines}
                                        ellipsizeMode='tail'
                                        style={styles.username}> {item[1].founder.userName}
                                    </AutoSizeText>
                                    <Text allowFontScaling={false} style={styles.date}>
                                        {time(item[1].requestDate)}
                                    </Text>
                                </View>
                            </View>

                            {/* Title Section */}
                            <Text allowFontScaling={false} style={styles.title}>
                                {item[1].founder.roleId.nameOfStartup}
                            </Text>
                            <Text allowFontScaling={false} style={styles.description}>
                                Goal : {item[1].founder.roleId.goal}
                            </Text>

                            {/* Status Section */}
                            <Text allowFontScaling={false} style={styles.status}>
                                {item[1].founder.roleId.hiddenInfo.stageOfStartup} - {getfund(item[1].founder.roleId.hiddenInfo.fundingStatus)}
                            </Text>
                            <Text allowFontScaling={false} style={styles.pending}>
                                Pending...
                            </Text>
                        </View>
                    </View>
                )



            })}

            {/* {!loading && data == null &&
                <Text>no request yet</Text>
            }
 */}

            {loading && <ActivityIndicator size={24} color="#fff" />}
        </ScrollView >

    );
};

export default RequestsScreen;

const { height, width } = Dimensions.get("window");

var a = width / 360;
var b = height / 800;
const scalingfactor = Math.sqrt(a * b);
const styles = StyleSheet.create({
    c1: {
        flex: 1,
        // height  : 200,
        backgroundColor: "#16181a",

    },
    card: {
        width: width * 0.92,
        marginHorizontal: "auto",
        padding: 16,
        // height : 200,
        backgroundColor: "#1A1C1E",
        marginTop: 20,
        borderRadius: 12,
        shadowColor: "rgba(0,0,0, 0.8)",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 10,
        shadowRadius: 1,
        elevation: 5,
    },
    header1: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    headerText: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
    },
    username: {
        // backgroundColor: "red",
        flex: 1,
        marginRight: 10,
        color: "#E9E9E9",
        fontWeight: "600",
        fontSize: 24,
        fontFamily: "Alata",
    },
    date: {
        color: "#a1a1a1",
        fontSize: 14,
        alignSelf: "center",
    },
    title: {
        color: "#B8B8B8",
        fontSize: 36,
        marginBottom: 6,
        fontFamily: "Alata",
    },
    description: {
        color: "#D9D9D9",
        fontSize: 13,
        fontFamily: "Roboto",
        marginBottom: 10
    },
    status: {
        color: "#00DE62",
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 4,
        fontFamily: "Roboto",
    },
    pending: {
        fontFamily: "Roboto",
        color: "#B8B8B8",
        fontSize: 14,
        textAlign: "center",
        marginVertical: 5,
    },
});
