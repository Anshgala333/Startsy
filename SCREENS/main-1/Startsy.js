import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import { Animated, Pressable, Modal, TouchableOpacity, FlatList, RefreshControl, SafeAreaView, StatusBar, TouchableWithoutFeedback, TextInput, KeyboardAvoidingView, Vibration } from 'react-native';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import { Dimensions, PixelRatio } from "react-native"
import Swiper from 'react-native-deck-swiper';
import main from "../../styles/main.js"
import Cards from './Card.js';
// import Upvote from '@/assets/icons/upvote.js';
import { useFocusEffect } from 'expo-router';
import { GlobalContext } from '@/Global/globalcontext.js';
import { ActivityIndicator } from 'react-native';
import Addicon from "../../assets/icons/Addicon.js"
import Trash from "../../assets/icons/Trash.js"
import Upvote from "../../assets/icons/upvote.js"
import Up1 from "../../assets/icons/Up1.js"
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { url } from "../../config.js"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Idea from "../../assets/icons/idea1.js"
import styles1 from '@/styles/Alert.js';


const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;


const scalingfactor = Math.sqrt(a * b)


export default function Startsy({ navigation, route, token }) {
    const [cardIndex, setCardIndex] = React.useState(0);
    const [data, setData] = useState([])
    const [swipeInProgress, setSwipeInProgress] = useState(false);
    const [swipeDistance, setSwipeDistance] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    // const data=[1,2,3,4]
    const [loading, setloading] = useState(true);
    const [selected, setselected] = useState(false);


    // console.log(token, "iniitla");
    // const {token} = route.params

    // const token = "abs"




    async function getData() {
        try {
            console.log(`${url}investor/recommendation/getFounderProfile`);

            const response = await fetch(
                `${url}investor/recommendation/getFounderProfile`,
                {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const result = await response.json();
            // console.log("reached here");
            console.log(result.data);


           
            if (result.data && result.data?.length > 0) {
                var data1 = result.data.map((e) => {

                    var isThereTeam

                    if (e.teamInfo?.length == 0) {
                        isThereTeam = false
                    }
                    else {
                        isThereTeam = true
                    }

                    var obj = { ...e, isliked: false, isThereTeam: isThereTeam }
                    return obj
                })
                console.log(data1.length , "suoer");
                setData(data1);
            }

            // if (result.data.teamInfo && result.data.teamInfo[0]["name"] == "" && result.data.teamInfo[0]["name"] == "" && result.data.teamInfo[0]["role"] == "") {
            //     result.data.isThereTeam = false;

            // }
            // else {
            //     result.data.isThereTeam = true;

            // }
            setloading(false);
        } catch (err) {
            console.log(err, "eror");
        }
        finally {
        }
    }





    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181a")
    })

    const [dataFetched, setDataFetched] = useState(false);

    // useEffect(() => {
    //     console.log("Current Active Card Index:", cardIndex);
    // }, [cardIndex]);


    // async function getData() {
    //     try {
    //         console.log(`${url}investor/recommendation/getFounderProfile`);

    //         const response = await fetch(
    //             `${url}investor/recommendation/getFounderProfile`,
    //             {
    //                 method: "GET",
    //                 headers: {
    //                     accept: "application/json",
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }
    //         );
    //         const result = await response.json();
    //         console.log(result.length);

    //         console.log("reached here");
            


    //         if (result.data && result.data.length > 0) {
    //             var data1 = result.data.map((e) => {

    //                 var isThereTeam

    //                 if (e.teamInfo?.length == 0) {
    //                     isThereTeam = false
    //                 }
    //                 else {
    //                     isThereTeam = true
    //                 }

    //                 var obj = { ...e, isliked: false, isThereTeam: isThereTeam }
    //                 return obj
    //             })
    //             console.log(data1 , "data1 filtered team");
    //             setData(data1)

    //             // setData(result.data);
    //         }
    //         // setData(result.data);
    //         setloading(false);
    //         setDataFetched(true);


    //     } catch (err) {
    //         console.log(err, "eror");
    //     }
    //     finally {
    //     }
    // }

    useEffect(() => {
        if (token != null && token !== undefined && token != "") {
            setloading(true)
            getData();
        }
    }, [token, dataFetched])


    function showbigcard(item) {
        console.log(item, "yeh show bigg card wala function ka hai ");

        navigation.navigate("Card", { item: item, navigation })
        console.log("hi");

    }

    function getfund(fund) {
        if (fund == 69) {
            return 0
        }
        fund = fund - 57
        return (fund * 1000000).toLocaleString("en-IN")
    }

    function renderCard(item, index) {
        
        // console.log("render hu mai");
        // console.log('====================================');
        // console.log(item);
        // console.log('====================================');
        if (item == null) return


        // if (item.user_id == null || item.user_id == undefined) {
        //     return
        // }

        
        return (
            <Pressable onPress={() => {
                console.log("showing big");
                showbigcard(item)
            }} style={{ flex: 1, height: 100 }}>

                <LinearGradient
                    colors={["rgba(33, 34, 35, 1)", "rgba(25, 26, 27, 1)"]}
                    locations={[0, 1]}
                    style={[styles.container]} contentContainerStyle={styles.contentContainer}
                    // style={styles.box}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }} >

                    {/* <View nestedScrollEnabled={true} bounces={false} > */}
                        {/* Header Section */}
                        <View style={styles.header}>
                            <Image
                                source={{ uri: item?.user_id.profilePhoto }}
                                style={styles.profileImage}
                            />

                            <AutoSizeText
                                numberOfLines={1}
                                fontSize={24}
                                mode={ResizeTextMode.max_lines}
                                ellipsizeMode='tail'
                                style={styles.username}>{item.user_id.userName}
                            </AutoSizeText>
                            <View style={{
                                position: "absolute",
                                right: 10,
                                display: "flex",
                                flexDirection: "row",
                                gap: 0
                            }}>
                                {/* <View ><Upvote color='#00de62' width={40} height={40} /></View> */}
                                {/* <Text style={styles.followers}>{item.totalUpvotes}</Text> */}
                            </View>
                        </View>
                        <View style={styles.divider}></View>


                        {/* Startup Info */}
                        <Text style={styles.title}>{item.nameOfStartup}</Text>
                        <Text style={styles.subtitle}>Revolutionizing startup ecosystem.</Text>
                        <Text style={styles.status}>{item.hiddenInfo.stageOfStartup} - ₹ {getfund(item.hiddenInfo.fundingStatus)}</Text>


                        {/* Goal Section */}
                        <Text style={styles.sectionHeader}>Goal: <Text style={styles.text}>
                            {item.goal}
                        </Text></Text>


                        {/* Description Section */}
                        <Text style={styles.sectionHeader}>Description:</Text>
                        <Text style={styles.text}>
                            {item.description}
                        </Text>

                        {/* About Founder Section */}
                        <Text style={styles.sectionHeader1}>About Founder</Text>
                        <Text style={styles.text}><Text style={styles.keys}>Name :</Text> {item.fullName}</Text>
                        <Text style={styles.text}><Text style={styles.keys}>Education :</Text>  {item.education}</Text>
                        <Text style={styles.text}><Text style={styles.keys}>Skills :</Text> {item.skills}</Text>

                        {/* Work Experience */}
                        <Text style={styles.sectionHeader}> <Text style={styles.keys}>Work Experience :</Text> </Text>
                        <View style={styles.workexp}>
                            {item.previousWorkExperience && item.previousWorkExperience.map((work, index) => {
                                return (
                                    <View key={index} >
                                        <Text style={styles.text1}>Company : {work.company}</Text>
                                        <Text style={styles.text1}>Role : {work.role}</Text>
                                        <Text style={styles.text1}>Year : {work.year}</Text>
                                    </View>
                                )
                            })}
                            <View style={styles.s2}>
                                <Text style={styles.text1}>Company 2</Text>
                                <Text style={styles.text1}>Role</Text>
                                <Text style={styles.text1}>Year</Text>
                            </View>
                            <View style={styles.s2}>
                                <Text style={styles.text1}>Company 3</Text>
                                <Text style={styles.text1}>Role</Text>
                                <Text style={styles.text1}>Year</Text>
                            </View>
                        </View>


                        {/* About Team Section */}
                        <Text style={styles.sectionHeader1}>About Team</Text>



                        {item.teamInfo && item.teamInfo?.map((work, index) => {
                            return (
                                <View style={styles.teamCard}>
                                    <Text style={styles.username1}>{work.name}</Text>
                                    <Text style={styles.text2}>{work.name}</Text>
                                    <Text style={styles.text2}>{work.role}</Text>
                                </View>
                            )
                        })}

                        {/* Footer */}
                        <Text style={styles.footer}>startsy.com</Text>
                    {/* </View> */}


                </LinearGradient>

            </Pressable>
        )
    }


    function check() {
        if (swipeDistance < 50) {
            console.log("hi");
            return true
        }
        return false
    }
    const handleSwiping = (distance) => {
        setSwipeDistance(distance);
        console.log(swipeDistance);
        var stat = check()
        return stat

    };
    const swiperRef = useRef(null);

    const swipeLeft = () => {
        swiperRef.current.swipeLeft(); // Swipe left programmatically
    };

    const swipeRight = () => {
        swiperRef.current.swipeRight(); // Swipe right programmatically
    };

    async function handleleftswipe(index) {
        console.log(index, "left swiped function index wala");
    }
    async function handlerightswipe(index) {
        const id = data[index].user_id._id;
        console.log(id);

        try {
            const response = await fetch(`${url}investor/addFounderProfile/${id}`, {
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
        // console.log(index, "right swiped function index wala");
    }


    async function incrementupvote() {

        console.log("clikded");

        const currentIndex = swiperRef.current.state.firstCardIndex;
        const id = data[currentIndex].user_id._id


        


    }


    const [visible, setVisible] = useState(false);


    const CustomAlert = ({ visible, onClose }) => {

        const [textlength, settextlength] = useState(0);

        const [suggestion, setsuggestion] = useState("");
        const [ups, setpostingsuggestion] = useState(false);


        function counttext(text) {


            settextlength(text.length)

        }



        async function docomment() {
            // console.log(suggestion, "inn");
            const currentIndex = swiperRef.current.state.firstCardIndex;
            const id = data[currentIndex].user_id._id
            // console.log(id, "id");


            // setuploadingcomment(true);

            try {

                setpostingsuggestion(true)
                const response = await fetch(`${url}investor/postSuggestions/${id}`, {
                    method: 'POST',
                    body: JSON.stringify({ suggestion: suggestion }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                console.log(data);
                console.log(response);

                if (response.status === 200) {
                    setVisible(false)
                }

                // setemptycomment(false);
                // setcommenttext("");

                // var object = {
                //     comment: commenttext,
                //     createdAt: new Date(),
                //     userId: {
                //         profilePhoto: data.profilePhoto,
                //         userName: data.userName,
                //     }
                // };

                // console.log(object)
                // var newarray = [...allcomments];
                // newarray.unshift(object);
                // setallcomments(newarray);


            } catch (err) {
                console.log(err);
            } finally {
                setuploadingcomment(false);
                setpostingsuggestion(false)
            }
        }

        const fadeAnim = useRef(new Animated.Value(0)).current;
        // Persistent animated value

        useEffect(() => {
            if (visible) {
                Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
            } else {
                Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => {
                    if (typeof onClose === "function") {
                        onClose(); // Ensure onClose exists before calling
                    }
                });
            }
        }, [visible]);

        if (!visible) return null; // Prevent rendering when not visible

        async function deletepost1() {
            // console.log("Deleting post...");
            if (idofposttobedeleetd != null) {
                // setisdeleting(true)
                try {
                    const response = await fetch(`${url}posts/deletepost/${idofposttobedeleetd}`, {
                        method: 'POST',
                        body: "",
                        headers: {
                            accept: "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    });

                    const data = await response.json();
                    console.log(data);

                    // Remove the post from the local state
                    const updatedPosts = posts.filter((post) => post._id !== idofposttobedeleetd);
                    setPosts(updatedPosts);
                    setVisible(false)
                } catch (err) {
                    console.log(err);
                }
                finally {
                    // setisdeleting(false)
                }
            }
        }

        return (
            <Modal transparent visible={visible} animationType="none" onRequestClose={() => onClose?.()}>
                <TouchableWithoutFeedback onPress={() => onClose?.()}>
                    <Animated.View style={[styles1.overlay, { opacity: fadeAnim }]}>
                        <TouchableWithoutFeedback>
                            <View style={styles1.alertBox}>
                                <Text style={styles1.title}>Send a suggestion</Text>

                                <View style={{ position: "relative" }}>
                                    <Text style={[styles.t2, styles.count]}>{textlength}/300</Text>
                                    <TextInput
                                        allowFontScaling={false}
                                        placeholder=""
                                        placeholderTextColor="#B8B8B8"
                                        style={styles.input}
                                        maxLength={300}
                                        // value={suggestion}
                                        multiline={true}
                                        // onFocus={handleOutsideTouch}
                                        // onPress={handleOutsideTouch}
                                        // value={username}
                                        onChangeText={(text) => {
                                            setsuggestion(text)
                                            counttext(text)
                                        }}
                                    />
                                </View>

                                <TouchableOpacity onPress={docomment} style={styles.next}  >
                                    {/* <Text allowFontScaling={false} style={styles.nexttext}>Send</Text> */}

                                    {ups && <ActivityIndicator size={24} color="#16181a" />}
                                    {!ups && <Text allowFontScaling={false} style={styles.nexttext}>Send</Text>}
                                </TouchableOpacity>


                                {/* <Text style={styles1.message}>Click confirm to .</Text> */}
                                <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>


                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    };

    return (



        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#16181a" }} behavior='padding' keyboardVerticalOffset={-100}>

            <CustomAlert visible={visible} onClose={() => setVisible(false)} />
            <ScrollView
                keyboardShouldPersistTaps='handled'
                refreshControl={<RefreshControl progressViewOffset={100} refreshing={refreshing}
                    progressBackgroundColor="#16181a"
                    colors={['#00de62']}
                    onRefresh={async () => {
                        console.log("start");
                        Vibration.vibrate(200)
                        setRefreshing(true);
                        if (token) {
                            setloading(true)
                            
                            getData();
                        }
                        setTimeout(() => {
                            setRefreshing(false);
                        }, 2000);
                    }} />}
                style={{ flex: 1, width: width, paddingVertical: 0, backgroundColor: "#16181a" }}>
                <SafeAreaView style={{ flex: 1, width: width, height: height * 0.93, marginTop: 50, paddingVertical: 15, backgroundColor: "#16181a" }}>

                    {/* <Animated.View
                        style={main.header1}>
                        <Text allowFontScaling={false} style={main.headertext}>For you</Text>
                    </Animated.View> */}

                    {data && data.length == 0 && <Text></Text>}
                    <CustomAlert visible={visible} onClose={() => setVisible(false)} />


                    <Swiper
                        ref={swiperRef}
                        keyExtractor={(item, index) => { index }}
                        nestedScrollEnabled={true}
                        backgroundColor='#16181a'
                        horizontalThreshold={50}
                        secondCardZoom={1000}
                        infinite={true}

                        showSecondCard={true}
                        style={{
                            width: width,
                            // height : 100,
                            margin: "auto",
                        }}
                        // keyExtractor={(index) => {return index} }
                        // infinite={true}
                        stackSeparation={10}
                        animateCardOpacity={true}
                        swipeAnimationDuration={350}
                        cards={data}
                        // stackScale={2}
                        renderCard={renderCard}

                        onSwipedLeft={(index) => {
                            handleleftswipe(index)
                        }}
                        onSwipedRight={(index) => {
                            // setCardIndex(index)
                            handlerightswipe(index)
                        }}
                        cardIndex={cardIndex}
                        stackSize={3}
                        verticalSwipe={false}
                        onSwiped={(index) => {
                            setselected(false)
                            setCardIndex(index)
                        }}
                    />
                    {/* {loading && <ActivityIndicator color={"#fff"} size={'large'} />} */}

                    <View style={styles.iconcontainer}>

                        <Pressable onPress={swipeLeft} style={{ width: 80, height: 80, backgroundColor: "transparent" }}><Trash /></Pressable>
                        <Pressable onPress={() => {
                            setselected(true)
                            setVisible(true)
                            incrementupvote()
                        }}
                            style={{ width: 70, height: 70, marginLeft: 6 }}>
                            <Idea />



                        </Pressable>
                        {/* <LinearGradient
                        style={{ transform: [{ scale: 1 }], width: 60, height: 60, backgroundColor: "#16181a", borderRadius: 100, justifyContent: "center", alignItems: "center" , borderColor :  }}
                        locations={[0, 0.8]}
                        colors={['#24272A', '#16181a']}
                        start={{ x: 0, y: 0 }} // Starting point of the gradient
                        end={{ x: 1, y: 0 }}
                    > */}
                        {/* 
                    </LinearGradient> */}
                        <Pressable onPress={swipeRight} style={{ width: 80, height: 80, backgroundColor: "transparent", marginLeft: 10 }}><Addicon /></Pressable>
                    </View>

                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'rgba(33, 34, 35, 1)',
        // backgroundColor: "#16181a",
        paddingHorizontal: 16,
        maxWidth: width - 30,
        width: "99%",
        maxHeight: height * 0.7,

        // shadowColor: 'rgba(0, 0, 0, 0.2)', // Shadow color
        // shadowOffset: {
        //     width: 0, // x offset
        //     height: 50, // y offset
        // },
        // elevation : 30,

        // shadowOpacity: 1, // Full opacity for shadow effect
        // shadowRadius: 100, // Blur radius

        marginHorizontal: "auto",
        // marginHorizontal: 10,
        // maxHeight: height - 100,
        borderRadius: 10,
        // borderColor : "#666",
        // borderWidth: 1,
        paddingTop: 20,
        overflow: "scroll"
    },
    contentContainer: {
        paddingBottom: 80,
        // maxWidth: width,
        // height : height,
        backgroundColor: "#16181a"
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    username: {
        color: '#E9E9E9',
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: "Alata",
        width: 140,
        // backgroundColor : "red"


    },
    upvote: {
        marginLeft: "auto",
        marginRight: -2
    },
    followers: {
        color: '#00DE62',
        marginLeft: -6,
        fontSize: 14,
        top: 19,
        fontFamily: "Roboto",

    },
    title: {
        color: '#B8B8B8',
        fontSize: 48,
        // fontWeight: 'bold',
        marginBottom: 4,
        fontFamily: "Alata",


    },
    subtitle: {
        color: '#D9D9D9',
        fontSize: 14,
        marginBottom: 4,
        fontFamily: "Roboto"
    },
    status: {
        color: '#00DE62',
        fontSize: 15,
        marginBottom: 16,
        fontFamily: "Roboto"

    },
    sectionHeader: {
        color: '#D9D9D9',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 4,
        fontFamily: "Roboto"
    },
    sectionHeader1: {
        color: '#B8B8B8',
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 4,
        fontFamily: "Alata"
    },
    text: {
        color: '#BEBEBE',
        fontSize: 14,
        lineHeight: 20,
        fontFamily: "Roboto"

    },
    text1: {
        color: '#BEBEBE',
        fontSize: 14,
        lineHeight: 20,
        fontFamily: "Roboto",
        fontStyle: "italic",

    },
    teamCard: {
        // backgroundColor: '#2a2a2a',
        padding: 15,
        borderRadius: 8,
        marginTop: 8,
        borderWidth: 2,
        borderColor: "#B8B8B8"
        , maxWidth: "70%",
        borderRadius: 10,
        // padding : 10
    },
    footer: {
        color: '#00DE62',
        textAlign: 'center',
        marginTop: 16,
        fontSize: 16,
        fontStyle: "italic"
    },
    keys: {
        fontFamily: "Roboto",
        color: "#D9D9D9",
        fontSize: 14,
        fontWeight: "bold",
    },
    workexp: {
        borderLeftWidth: 2,
        borderLeftColor: "#00DE62",
        paddingLeft: 10,
        marginTop: 10,

    },
    s2: {
        marginTop: 20
    }
    , text2: {
        color: "#B8B8B8",
        borderBottomWidth: 1,
        borderBottomColor: "#B8B8B8",
        marginBottom: 15,
        paddingBottom: 5,
        fontSize: 14
    }
    , username1: {
        color: "#00DE62",
        borderBottomWidth: 1,
        borderBottomColor: "#B8B8B8",
        marginBottom: 15,
        paddingBottom: 5,
        fontSize: 14
    },
    iconcontainer: {
        position: "absolute",
        bottom: 60,
        zIndex: 1000,
        display: "flex",
        flexDirection: "row",
        width: width,
        backgroundColor: "transparent",
        paddingHorizontal: 10,
        marginLeft: 2,
        // backgroundColor : "red",

        justifyContent: "space-between"
        // zIndex : 100
    },
    t2: {
        textAlign: 'Left',
        color: "#94A3B8",
        fontFamily: 'Roboto',
        fontSize: scalingfactor * 13,

        marginBottom: scalingfactor * 8,
        width: "85%",
        alignSelf: "center",
        lineHeight: scalingfactor * 16
    },
    count: {
        fontSize: 14,
        position: "absolute",
        bottom: 25,
        right: 25,
        // backgroundColor: "red",
        width: "auto"
    },


    input: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        marginTop: 0,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#bbb",
        fontSize: scalingfactor * 20,
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 5,
        width: 260,
        // fontFamily: "Roboto",
        lineHeight: scalingfactor * 18,
        marginBottom: scalingfactor * 25,
        height: 190,
        marginTop: 10,
        padding: 10,
        textAlignVertical: "top",
        paddingBottom: 30,

    },


    next: {
        backgroundColor: "#00DF60",
        borderRadius: 30,
        margin: "auto",
        // padding : 10,
        paddingHorizontal: 20,
        height: 35,
        // marginRight  : 20,
        // marginBottom: 20,
        marginTop: -5,
        alignSelf: "flex-end",
        justifyContent: "center",
    },
    nexttext: {
        color: "#24272A",
        fontFamily: "Alata",
        fontSize: scalingfactor * 16,
        textAlign: "center",
        marginTop: -4,
        textAlign: "right",

    },

    divider: {
        width: "110%",
        marginLeft: -20,
        height: 1,
        marginTop: 5,
        marginBottom: 20,
        backgroundColor: "#24272A"
    },
});
