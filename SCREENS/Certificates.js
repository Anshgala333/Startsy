import React, { useState, useRef, useCallback, useMemo } from "react";
import { FlatList, Pressable, Text, View, SafeAreaView, Linking, Animated, TouchableOpacity, RefreshControl } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../styles/post.js";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const CertificatePortfolioPage = () => {
    console.log("Certificate/Portfolio Page Re-render");

    const scrollY = useRef(new Animated.Value(0)).current;
    const [refreshing, setRefreshing] = useState(false);

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

    const renderItem = ({ item }) => {
        return (
            <LinearGradient
                colors={["rgba(33, 34, 35, 0.4)", "rgba(25, 26, 27, 0.6)"]}
                locations={[0, 1]}
                style={[styles.box, { paddingVertical: 15, paddingHorizontal: 20, borderRadius: 12 }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{ flex: 1, alignItems: "flex-start", paddingRight: 10 }}>
                        <Text style={[styles.u1, { marginBottom: 6 }]}>{item.name}</Text>
                        <TouchableOpacity
                            onPress={() => Linking.openURL(item.url)}
                            style={{
                                backgroundColor: "#ccc",
                                borderRadius: 25,
                                paddingVertical: 8,
                                paddingHorizontal: 12,
                                height: 42,
                                width: 100,
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 5
                            }}
                            accessibilityLabel={`View ${item.name}`}>
                            <Text style={{ color: "#000", fontSize: 16, fontWeight: "500", fontFamily: "Alata" }}>View</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: "center", justifyContent: "center", paddingLeft: 10 }}>
                        {item.type === "certificate" ? (
                            <MaterialCommunityIcons name="certificate" size={32} color="#ccc" />
                        ) : (
                            <MaterialCommunityIcons name="briefcase" size={32} color="#ccc" />
                        )}
                    </View>
                </View>
            </LinearGradient>



        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#16181a", minHeight: 700 }}>
            <Pressable onPress={() => navigation.goBack()}>
                <FontAwesome6 name="chevron-left" size={34} style={{ alignSelf: 'flex-start', marginLeft: 16,marginTop:10 }} color="#00DF60" />
            </Pressable>
            <FlatList
                showsVerticalScrollIndicator={false}
                initialNumToRender={5}
                windowSize={10}
                maxToRenderPerBatch={5}
                keyExtractor={(item, index) => index.toString()}
                data={dummyData}
                renderItem={renderItem}
                contentContainerStyle={{ paddingTop: 40, paddingBottom: 100 }}
                onScroll={(e) => {
                    if (scrollY && typeof scrollY.setValue === "function") {
                        scrollY.setValue(e.nativeEvent.contentOffset.y);
                    }
                }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                getItemLayout={(data, index) => ({ length: 100, offset: 100 * index, index })}
            />
        </SafeAreaView>
    );
};

export default CertificatePortfolioPage;
