import React, { useState, useRef, useCallback, useMemo, useEffect, useContext } from "react";
import { FlatList, Pressable, Text, View, SafeAreaView, Linking, Animated,StyleSheet, TouchableOpacity, RefreshControl } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../styles/post.js";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { GlobalContext } from "@/Global/globalcontext.js";
import { useNavigation } from "expo-router";
import { url } from "@/config.js";

const CertificatePortfolioPage = () => {
    // console.log("Certificate/Portfolio Page Re-render");

    const scrollY = useRef(new Animated.Value(0)).current;
    const [refreshing, setRefreshing] = useState(false);
    // const [data, setData] = useState([]);

    const [allUrls, setAllUrls] = useState([]);

    const navigation = useNavigation();

    const { globaldata, updateField } = useContext(GlobalContext);

    const token = globaldata.token;


    useEffect(() => {
        fetchUrl()
    }, [])

    const fetchUrl = async () => {
        console.log('fetching');
        try {

            const response = await fetch(`${url}test/getPortfolioAndCertifications`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const responsedData = await response.json();
            console.log(responsedData);
            const { certification, portfolio } = responsedData;
            console.log(portfolio);

            var rec1 = certification.filter((e) => e.url != "")
            var rec2 = portfolio.filter((e) => e.url != "")


            console.log(rec2, "poortfolioo");


            const finalData = [...rec1, ...rec2];

            // console.log(finalData);
            setAllUrls(finalData);



            // setData(responsedData);
        }
        catch (error) {

        }
    }

    const dummyData = useMemo(() => [
        {
            type: "certificate",
            name: "React Native Certification",
            url: "https://example.com/certificate"
        },
        {
            type: "portfolio",
            name: "My Portfolio",
            url: "https://example.com/portfolio"
        },
        {
            type: "certificate",
            name: "UI/UX Design Certification",
            url: "https://example.com/certificate2"
        },
        {
            type: "portfolio",
            name: "Creative Works",
            url: "https://example.com/portfolio2"
        }
    ], []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    const RenderItem = ({ item }) => {
        console.log("renderitem item", item)
        return (
            <TouchableOpacity

                onPress={() => Linking.openURL(item.url)}

            >

                <View
                    style={[styles.box, { paddingVertical: 15, paddingHorizontal: 20, borderRadius: 12 , backgroundColor : "transparent" , borderColor : "#ccc" , borderWidth : 1 , width : "92%" }]}
                >

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ flex: 1, alignItems: "flex-start", paddingRight: 10 }}>
                            <Text style={[styles.u1, { marginBottom: 6 }]}>{item.name}</Text>

                        </View>

                        <View style={{ alignItems: "center", justifyContent: "center", paddingLeft: 10 }}>
                            {item.type === "certificate" ? (
                                <MaterialCommunityIcons name="certificate" size={32} color="#ccc" />
                            ) : (
                                null
                                // <MaterialCommunityIcons name="" size={32} color="#ccc" />
                            )}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>



        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#16181a", minHeight: 700 }}>
              <View style={styles1.header}>
                <View style={styles1.headerSide}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <FontAwesome6 name="chevron-left" size={25} style={styles1.backIcon} color="#00DF60" />
                    </Pressable>
                </View>

                <View style={styles1.headerCenter}>
                    <Text style={styles1.title}>Certifications</Text>
                </View>

                <View style={styles1.headerSide} />
            </View>
            {allUrls.length == 0 && <Text style={{ textAlign: "center", marginTop: 300, color: "gray", fontSize: 18 }}>No certifications Yet</Text>}
            <FlatList
                showsVerticalScrollIndicator={false}
                initialNumToRender={5}
                windowSize={10}
                maxToRenderPerBatch={5}
                keyExtractor={(item, index) => item._id}
                data={allUrls}
                renderItem={({ item }) => <RenderItem item={item} />}
                contentContainerStyle={{ paddingTop: 40, paddingBottom: 100 }}
                onScroll={(e) => {
                    if (scrollY && typeof scrollY.setValue === "function") {
                        scrollY.setValue(e.nativeEvent.contentOffset.y);
                    }
                }}
                // onRefresh={()=>fetchUrl()}c
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                getItemLayout={(data, index) => ({ length: 100, offset: 100 * index, index })}
            />
        </SafeAreaView>
    );
};
const styles1 = StyleSheet.create({
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
});
export default CertificatePortfolioPage;
