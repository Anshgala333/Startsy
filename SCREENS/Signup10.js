
// 2.5 second last  of startup founder
import React, { useState, useRef, useEffect } from "react";
import {

    SafeAreaView,
    View,
    Text,
    TextInput,
    Image,
    Animated,
    Pressable,
    StyleSheet,
    Dimensions,
    ScrollView,
    StatusBar,
    FlatList,
    TouchableWithoutFeedback,
    Keyboard

} from "react-native";
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
// import Slider from '@react-native-community/slider';
import Slider from "@react-native-community/slider";
import Entypo from '@expo/vector-icons/Entypo';

import signup3styles from "../styles/signup3styles.js";
import Drop from "./dropdown.js";
import Line3 from "./line3.js"
import Line from "./line.js";
import { useFocusEffect } from "expo-router";

const Signup10 = ({ navigation, route }) => {


    const [startupsector, setstartupsector] = useState("")
    const [stage1, setsetstartupstage] = useState("")
    const [name, setname] = useState("")
    const [goal, setgoal] = useState("")
    const [description, setdescription] = useState("")
    const [sliderrange, setsliderrange] = useState(0)

    const [InstagramUrl, setInstagramUrl] = useState("")
    const [YTURL, setYTURL] = useState("")
    const [LinkedinURl, setLinkedinURl] = useState("")

    const [error, seterror] = useState(false)
    const [nameerror, setnameerror] = useState(false)
    const [goalerror, setgoalerror] = useState(false)
    const [sserror, setsserror] = useState(false)
    const [stageerror, setstageerror] = useState(false)
    const [fundingstatuserror, setfunderror] = useState(false)
    const [descriptionError, setdescriptionError] = useState(false)



    const { type } = route.params || "Freelancer"
    const { form, image } = route.params;
    // console.log(form);




    function nextpage(navigation, type) {

        let error;
        if (name == "") {
            setnameerror(true)
            error = true
        }
        if (goal == "") {
            setgoalerror(true)
            error = true

        }
        if (startupsector == "") {
            setsserror(true)
            error = true

        }
        if (stage1 == "") {
            setstageerror(true)
            error = true

        }
        if (description == "") {
            setdescriptionError(true)
            error = true
        }
        // if (sliderrange = ) {
        //     setfunderror(true)
        //     error = true

        // }

        if (error) return

        const final = new FormData();
        for (var items of form["_parts"]) {

            if (items[0] == "fullname" || items[0] == "password") continue;
            final.append(items[0], items[1]);

        }

        final.append("nameOfStartup", name)
        final.append("goal", goal)
        final.append("description", description)
        final.append("sector", startupsector)
        final.append("stageOfStartup", stage1)

        var tosend;
        if (sliderrange > 10000000) {
            tosend = sliderrange.toString().substring(0, 2)
        }
        else if (sliderrange < 10000000) {
            tosend = sliderrange.toString()[0]

        }




        tosend = +tosend + 58;
        if (sliderrange == 0) {
            tosend = 69
        }

        final.append("fundingStatus", tosend)
        console.log(tosend.toString(), "to send");


        // var array = url.map(e => e.url)
        var array = [
            {
                name: "instagram",
                url: InstagramUrl
            },
            {
                name: "linkedin",
                url: LinkedinURl
            },
            {
                name: "youtube",
                url: YTURL
            }
        ]
        final.append("socialProof", JSON.stringify(array))

        console.log(array);


        console.log(final);
        navigation.navigate("Signup11", { form: final, image: image })
    }


    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#1e1e1e")
        StatusBar.setBarStyle("light-content")
    })

    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const handleOutsideTouch = () => {
        if (open1) { setOpen1(false) }
        if (open2) { setOpen2(false) }
    };
    function setAvailability() {
        console.log("education");

    }
    const [textlength, settextlength] = useState(0);
    var ss = [
        { label: "AI", value: "AI" },
        { label: "AR/VR", value: "AR/VR" },
        { label: "Blockchain", value: "Blockchain" },
        { label: "Social Media", value: "Social Media" },
        { label: "Marketing", value: "Marketing" },
        { label: "Social Media Marketing", value: "Social Media Marketing" },
        { label: "SaaS", value: "SaaS" },
        { label: "IoT", value: "IoT" },
        { label: "Cybersecurity", value: "Cybersecurity" },
        { label: "Cloud Computing", value: "Cloud Computing" },
        { label: "Biotech", value: "Biotech" },
        { label: "MedTech", value: "MedTech" },
        { label: "Digital Health", value: "Digital Health" },
        { label: "Pharma", value: "Pharma" },
        { label: "HealthTech", value: "HealthTech" },
        { label: "D2C", value: "D2C" },
        { label: "B2C", value: "B2C" },
        { label: "B2B", value: "B2B" },
        { label: "Marketplaces", value: "Marketplaces" },
        { label: "Logistics", value: "Logistics" },
        { label: "FinTech", value: "FinTech" },
        { label: "InsurTech", value: "InsurTech" },
        { label: "Decentralized Finance", value: "Decentralized Finance" },
        { label: "EdTech", value: "EdTech" },
        { label: "Online Learning Platforms", value: "Online Learning Platforms" },
        { label: "Cleantech", value: "Cleantech" },
        { label: "Renewable Energy", value: "Renewable Energy" },
        { label: "Sustainability", value: "Sustainability" },
        { label: "Media", value: "Media" },
        { label: "Gaming", value: "Gaming" },
        { label: "Content Platforms", value: "Content Platforms" },
        { label: "EVs", value: "EVs" },
        { label: "Autonomous Vehicles", value: "Autonomous Vehicles" },
        { label: "Ride-Sharing", value: "Ride-Sharing" },
        { label: "AgriTech", value: "AgriTech" },
        { label: "FoodTech", value: "FoodTech" },
        { label: "Non-profits", value: "Non-profits" },
        { label: "Impact Investing", value: "Impact Investing" },
        { label: "Social Entrepreneurship", value: "Social Entrepreneurship" },
        { label: "Others", value: "Others" }
    ];

    var stage = [
        { label: "Ideation Stage", value: "Ideation Stage" },
        { label: "Pre-Seed Stage", value: "Pre-Seed Stage" },
        { label: "Seed Stage ", value: "Seed Stage" },
        { label: "Early Stage", value: "Early Stage" },
        { label: "Growth Stage", value: "Growth Stage" },
        { label: "Expansion Stage", value: "Mature Stage" },

    ]


    const [url, seturl] = useState([{ id: Date.now(), url: '' }]);
    function addurl() {
        seturl(
            [...url, { id: Date.now(), url: "" }]
        )
    }
    function handleurlchange(id, field, value) {
        var array = url.map((e) => {
            if (e.id === id) {
                return { ...e, [field]: value }

            }
            else return e
        })
        seturl(array);
    }



    function counttext(text) {

        settextlength(text.length)

    }

    function deletecertificate(index) {
        console.log(index);
        var new1 = [...url]
        new1.splice(index, 1)
        seturl(new1);
    }
    const sliderImage = require("../assets/images/slider.png");
    const sliderRef = useRef(null);

    const h1 = (value) => {
        if (sliderRef.current) {
            clearTimeout(sliderRef.current);
        }
        sliderRef.current = setTimeout(() => {
            setsliderrange(value);
        }, 100);
    };
    return (

        < SafeAreaView style={[signup3styles.container, { position: "relative" }]} >
            <ScrollView nestedScrollEnabled={true}
            >
                <TouchableWithoutFeedback onPress={handleOutsideTouch}>
                    <View
                        style={[signup3styles.row, { position: "relative" }]}>
                        {/* <View style={[styles.modal]}></View> */}
                        {/* top */}
                        <View style={signup3styles.top}>
                            <View style={signup3styles.left}>
                                <Image style={signup3styles.logo} source={require("../assets/images/logo.png")} />
                            </View>
                            <View style={signup3styles.right}>
                                <Line progresswidth={"81%"} />
                            </View>
                        </View>



                        {/* bottom */}

                        <View style={styles.bottom}>
                            <Text allowFontScaling={false} style={[styles.t1, { marginBottom: 15 }]}>About Startup <Text style={{fontSize : 20}}>*</Text></Text>
                            
                            <TextInput
                                allowFontScaling={false}
                                placeholder="Name"
                                placeholderTextColor="#828282"
                                style={styles.input11}
                                value={name}
                                onChangeText={(text) => { setname(text) }}
                            />
                            {nameerror && <Text style={styles.err}>* please write a startup name</Text>}
                            <TextInput
                                allowFontScaling={false}
                                placeholder="One liner for your startup"
                                placeholderTextColor="#828282"
                                style={styles.input11}
                                value={goal}
                                onChangeText={(text) => { setgoal(text) }}
                            />
                            {goalerror && <Text style={styles.err}>* please write your goal </Text>}


                            <Text allowFontScaling={false} style={styles.des}>Description:</Text>
                            <View allowFontScaling={false} style={{ position: "relative" }}>
                                <Text allowFontScaling={false} style={[styles.t2, styles.count]}>{textlength}/1000</Text>

                                <TextInput
                                    allowFontScaling={false}
                                    placeholder=""
                                    placeholderTextColor="#828282"
                                    style={styles.input}
                                    maxLength={1000}
                                    multiline={true}
                                    onFocus={handleOutsideTouch}
                                    onPress={handleOutsideTouch}
                                    // value={username}
                                    onChangeText={(text) => {
                                        setdescription(text)
                                        counttext(text)
                                    }}
                                />
                            </View>
                            {descriptionError && <Text style={[styles.err1, { marginTop: -15 }]}>* please enter a description </Text>}

                            <Text allowFontScaling={false} style={[styles.t1, { marginBottom: 10 }]}>Startup sector
                                {/* <Text style={{ fontSize: 15, color: "#94A3B8" }}>*</Text> */}
                            </Text>
                            <Text allowFontScaling={false} style={[styles.t2, { marginBottom: 10 }]}>Define your startup’s focus: horizontal sectors serve multiple industries, while vertical sectors target a specific niche.</Text>
                            <Drop borderwidth={0} bb={1} borderColor={"#ccc"} width={"97%"} items={ss} onValueChange={(value) => { setstartupsector(value) }} setOpen={setOpen1} open={open1} nestedScrollEnabled={true} />
                            {sserror && <Text style={styles.err1}>* please select a sector </Text>}


                            <Text allowFontScaling={false} style={[styles.t1, { marginBottom: 10, marginTop: 25 }]}>Startup stage
                                {/* <Text style={{ fontSize: 15, color: "#94A3B8" }}>*</Text> */}
                            </Text>
                            <Text allowFontScaling={false} style={[styles.t2, { marginBottom: 15 }]}>Identify where your startup is in its journey—whether you’re in ideation, have a prototype, or are generating revenue.</Text>
                            <Drop borderwidth={0} bb={1} borderColor={"#ccc"} width={"97%"} items={stage} onValueChange={(value) => { setsetstartupstage(value) }} setOpen={setOpen2} open={open2} nestedScrollEnabled={true} />
                            {stageerror && <Text style={styles.err1}>* please select your startup stage </Text>}



                            <Text allowFontScaling={false} style={[styles.t1, { marginTop: 15, marginBottom: 12 }]}>Funding Status</Text>
                            <Text allowFontScaling={false} style={[styles.t2, { marginBottom: 15 }]}>Indicate the amount of funding your startup has received so far. This information will only be visible to verified investors and helps them assess your startup's financial backing and growth potential.</Text>
                            <Pressable onPress={() => { handleOutsideTouch() }} style={styles.btn}>
                                <Text allowFontScaling={false} style={styles.nexttext}>₹ {sliderrange.toLocaleString("en-IN")}</Text>
                            </Pressable>

                            {/* slider */}
                            {/* <View style={[styles.box, { left: 10 }]}></View> */}
                            {/* <View style={[styles.box1, { right: 10 }]}></View> */}
                            <Slider
                                // style={styles.sliderbox}
                                style={{ marginTop: 15 }}
                                minimumValue={0}
                                maximumValue={10000000}
                                value={sliderrange}
                                step={200000}
                                minimumTrackTintColor="#00DE62"
                                maximumTrackTintColor="#00DE62"
                                thumbTintColor="#ccc"

                                // step={100}
                                // thumbTintColor="#737373" // Color of the slider thumb
                                // trackImage={require("../assets/images/slider.png")}
                                // trackImage={require("../assets/images/slider3.png")}
                                // thumbImage={require("../assets/images/slider3.png")}
                                onValueChange={h1}

                                hitSlop={{ top: 50, left: 50, right: 50, bottom: 50 }}
                                thumbTouchSize={{ width: 100, height: 100 }}
                            />
                            {/* <Slider
                                style={{ marginTop: 100 }}
                            /> */}
                            {fundingstatuserror && <Text style={styles.err}>* please select your funding status </Text>}



                            <Text allowFontScaling={false} style={[styles.t1, { marginTop: 20, marginBottom: 10 }]}>Social proof</Text>
                            {/* {url.map((items, index) =>
                                <View style={styles.v1} key={items.id}>
                                    <Pressable onPress={addurl}>
                                        <Entypo style={styles.plus1} name="plus" size={24} color="#00DE62" />
                                    </Pressable>

                                    {index > 0 && <Pressable onPress={() => { deletecertificate(index) }}>
                                        <FontAwesome6 name="trash" style={styles.minus} size={15} color="#00DE62" />
                                    </Pressable>}


                                    <TextInput

                                        allowFontScaling={false}
                                        placeholder="URL"
                                        placeholderTextColor="#828282"
                                        style={styles.input1}
                                        value={items.url}
                                        onChangeText={(text) => { handleurlchange(items.id, "url", text) }}
                                    />
                                </View>

                            )} */}

                            <Text allowFontScaling={false} style={[styles.t1, { marginBottom: 0 }]}>Instagram</Text>

                            <View style={styles.v1} >
                                <Pressable onPress={addurl}>
                                    <AntDesign name="instagram" style={styles.plus1} size={24} color="#828282" />
                                    {/* <Entypo style={styles.plus1} name="plus" size={24} color="#00DE62" /> */}
                                </Pressable>

                                <TextInput

                                    allowFontScaling={false}
                                    placeholder="URL"
                                    numberOfLines={1}
                                    placeholderTextColor="#828282"
                                    style={styles.input1}
                                    value={InstagramUrl}
                                    onChangeText={(text) => { setInstagramUrl(text) }}
                                />
                            </View>
                            <Text allowFontScaling={false} style={[styles.t1, { marginBottom: 0 }]}>YouTube</Text>

                            <View style={styles.v1} >
                                <Pressable onPress={addurl}>
                                    {/* <Feather name="youtube" style={styles.plus1} size={24} color="#bbbbbb" /> */}
                                    <AntDesign name="youtube" style={styles.plus1} size={24} color="#828282" />
                                    {/* <Entypo style={styles.plus1} name="plus" size={24} color="#00DE62" /> */}
                                </Pressable>

                                <TextInput
                                    allowFontScaling={false}
                                    placeholder="URL"
                                    numberOfLines={1}
                                    placeholderTextColor="#828282"
                                    style={styles.input1}
                                    value={YTURL}
                                    onChangeText={(text) => { setYTURL(text) }}
                                />
                            </View>
                            <Text allowFontScaling={false} style={[styles.t1, { marginBottom: 0 }]}>LinkedIn</Text>

                            <View style={styles.v1} >
                                <Pressable onPress={addurl}>
                                    <AntDesign name="linkedin-square" style={styles.plus1} size={24} color="#828282" />
                                    {/* <Entypo style={styles.plus1} name="plus" size={24} color="#00DE62" /> */}
                                </Pressable>

                                <TextInput

                                    allowFontScaling={false}
                                    placeholder="URL"
                                    numberOfLines={1}
                                    placeholderTextColor="#828282"
                                    style={styles.input1}
                                    value={LinkedinURl}
                                    onChangeText={(text) => { setLinkedinURl(text) }}
                                />
                            </View>






                            <View style={styles.icons}>
                                <Pressable style={{ marginTop: 5 }} onPress={() => { navigation.goBack() }}><FontAwesome6 name="chevron-left" size={30} color="#00DF60" /></Pressable>
                                <Pressable onPress={() => { nextpage(navigation, type) }}><FontAwesome6 name="chevron-right" size={30} color="#00DF60" /></Pressable>

                            </View>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </ SafeAreaView>
    )
}

export default Signup10


const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;


const scalingfactor = Math.sqrt(a * b)
const styles = StyleSheet.create({
    t1: {
        textAlign: 'Left',
        marginLeft: 10,
        color: "#ccc",
        fontFamily: 'Alata',
        fontSize: 24,
        // backgroundColor : "red",
        width: "97%",
        marginBottom: scalingfactor * 3,
    },
    thumb: {
        width: 30,
        height: 30
    },
    t2: {
        textAlign: 'Left',
        color: "#828282",
        fontFamily: 'Roboto',
        fontSize: scalingfactor * 12,
        marginBottom: scalingfactor * 8,
        width: "85%",
        alignSelf: "center",
        lineHeight: scalingfactor * 16
    },
    bottom: {
        width: "100%",
        // height: height*0.85,
        backgroundColor: "rgba(33, 34, 35, 0.5)",
        // backgroundColor: "red",
        borderTopLeftRadius: 70,
        padding: height * 0.03,
        paddingTop: height * 0.06,
        // justifyContent: "center",
        alignContent: "center",
        padding: scalingfactor * 20,
        paddingTop: scalingfactor * 40,
        // overflow : "hidden",

    },

    input: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        marginTop: 0,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#ccc",
        fontSize: scalingfactor * 20,
        color: "#828282",
        paddingBottom: scalingfactor * 5,
        width: "92%",
        fontFamily: "Roboto",
        lineHeight: scalingfactor * 18,
        marginBottom: scalingfactor * 25,
        height: 190,
        marginTop: 10,
        padding: 10,
        textAlignVertical: "top",
        paddingBottom: 30,

    }
    , icons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "92%",
        margin: "auto",
        marginTop: 20,
        marginBottom: 30
    },

    btn: {
        width: "60%",
        height: 48,
        margin: "auto",
        backgroundColor: "transparent",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 20,
        marginBottom: 15,

        // elevation: 5,
        justifyContent: 'center',

    }, nexttext: {
        color: "#00DE62",
        fontFamily: "Alata",
        fontSize: scalingfactor * 22,
        textAlign: "center",
        marginTop: -4

    },

    count: {
        fontSize: 14,
        position: "absolute",
        bottom: 25,
        right: 25,
        // backgroundColor: "red",
        width: "auto"
    },
    modal: {
        width: width,
        height: height,
        backgroundColor: "yellow",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,

    }
    , input1: {
        margin: height * 0.016,
        marginTop: 0,
        fontSize: scalingfactor * 20,
        color: "#ccc",
        paddingBottom: scalingfactor * 0,
        width: "90%",
        marginLeft: 0,
        paddingLeft: 40,
        // marginBottom : 30,
        // fontFamily: "Roboto",
        // lineHeight: scalingfactor * 18,

    }
    , input11: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        marginTop: 0,
        borderBottomWidth: 1,
        paddingLeft: scalingfactor * 10,
        borderBottomColor: "#ccc",
        fontSize: scalingfactor * 20,
        color: "#ccc",
        paddingBottom: scalingfactor * 5,
        width: "92%",
        fontFamily: "Alata",
        // lineHeight: scalingfactor * 18,
        marginBottom: scalingfactor * 25

    },
    des: {
        width: "92%",
        paddingLeft: scalingfactor * 10,
        fontFamily: "Alata",
        textAlign: "left",
        fontSize: 20,
        color: "#828282",
        alignSelf: "center",
    }, box: {
        // position: "absolute",
        width: 14,
        height: 14,
        borderRadius: 3,
        backgroundColor: "#00DE62",
        // top: -3,
        top: 23,
        elevation: 10
    },
    box1: {
        width: 14,
        elevation: 10,
        height: 14,
        borderRadius: 3,
        backgroundColor: "#00DE62",
        // top: -3,
        top: 8,
        backfaceVisibility: "hidden",

        left: "98%",
        marginLeft: -scalingfactor * 20
    }
    , sliderbox: {
        width: "90%",
        marginTop: -1,
        height: 5,
        margin: "auto",
        // borderWidth: 2,
        borderColor: "#00DE62",
        borderColor: "#00DE62",
        zIndex: 101,
        backgroundColor: "#00DE62",
        borderRadius: 20,
        pointerEvents: "auto",
        // elevation : 10
    }, plus1: {
        position: "absolute",
        left: 0,
        top: 10,
        zIndex: 100
    },
    v1: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        width: "90%",
        margin: "auto",
        //    backgroundColor :"red",
        paddingBottom: 0,
        marginTop: 10,
        marginBottom: 20
    },
    err: {
        marginVertical: 0,
        marginTop: -20,
        marginBottom: 10,
        textAlign: "left",
        // backgroundColor : "red",
        width: "90%",
        marginHorizontal: "auto",
        color: "#E65858",
        fontSize: 10,
        fontFamily: "Roboto",
    },
    err1: {
        marginVertical: 0,
        marginTop: 0,
        marginBottom: 10,
        textAlign: "left",
        // backgroundColor : "red",
        width: "90%",
        marginHorizontal: "auto",
        color: "#E65858",
        fontSize: 12,
        fontFamily: "Roboto",
    },
    minus: {
        position: "absolute",
        right: 45,
        top: -3,
        zIndex: 100
    },


})