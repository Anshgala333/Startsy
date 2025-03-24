
// 3.4 second last of freelancer
import React, { useState, useRef, useEffect, useContext } from "react";
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
    Platform,
    FlatList,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    ActivityIndicator
} from "react-native";
// import { FlatList, ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Asset } from "expo-asset";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { LinearGradient } from "expo-linear-gradient";
import signup3styles from "../styles/signup3styles.js";
import Drop from "./dropdown.js";
import Line2 from "./line2.js";
import Line from "./line.js"
import Line3 from "./line3.js"
import Entypo from '@expo/vector-icons/Entypo';
import { useFocusEffect } from "expo-router";
import { GlobalContext } from "@/Global/globalcontext.js";

import { url } from "../config.js"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { FlatList } from "react-native-gesture-handler";



const Signup7 = ({ navigation, route }) => {

    const [token, settoken] = useState("")
    const [loading, setloading] = useState(false)
    const { globaldata, updateField } = useContext(GlobalContext);

    useEffect(() => {
        console.log(globaldata, "global data");
        settoken(globaldata.token)
    }, [])

    const [tagline, settagline] = useState("")
    const [skills, setskills] = useState("")
    const [education1, seteducation] = useState("")
    const [open, setOpen] = useState(false)

    const { type } = route.params || "Founder";

    const { form, image } = route.params;
    console.log('====================================');
    console.log(form);
    console.log('====================================');

    const [InstagramUrl, setInstagramUrl] = useState("")
    const [YTURL, setYTURL] = useState("")
    const [LinkedinURl, setLinkedinURl] = useState("")


    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181A")
        StatusBar.setBarStyle("light-content")
    })



    const loadDefaultImage = async () => {
        const asset = Asset.fromModule(require("../assets/images/logofinal.png"));
        await asset.downloadAsync(); // Ensure it is available
        return asset.localUri
        // setDefaultImageUri(asset.localUri);
    };


    function nextpage(navigation, type) {

        const final = new FormData();
        for (var items of form["_parts"]) {

            if (items[0] == "fullname" || items[0] == "password") continue;
            final.append(items[0], items[1]);
        }


        var certification = certificate.map(({ id, cname, curl }) => {
            var obj = { name: cname, url: curl }
            return obj

        })
        var portfolio = portfolio1.map(({ id, url }) => {
            return url

        })
        console.log(portfolio);
        final.append("tagline", tagline)
        final.append("skills", skills)
        final.append("education", education1);
        final.append("certification", JSON.stringify(certification));
        final.append("portfolio", JSON.stringify(portfolio));


        console.log(final, "page 7 wala");


        navigation.navigate("Signup8", { form: final, image: image });
    }



    function renderline() {
        if (type === "Investor" || type === "Founder") {
            return <Line progresswidth={"31.5%"} />;
        } else if (type === "Freelancer") {
            return <Line3 progresswidth={"72.5%"} />;
        } else {
            return <Line2 progresswidth={"55.5%"} />;
        }
    }


    var education = [
        { label: "10th", value: "10TH" },
        { label: "12th", value: "12th" },
        { label: "Graduate", value: "Graduate" },
        { label: "Post-Graduate", value: "Post-Graduate" },
        { label: "P.H.D", value: "P.H.D" },


    ]

    const handleOutsideTouch = () => {
        if (open) {
            setOpen(false);
        }
    };
    // multiple certificate 
    const [certificate, setcertificate] = useState([{ id: Date.now(), cname: '', curl: '' }]);
    const [portfolio1, setportfolio] = useState([{ id: Date.now(), url: '', name: "" }]);


    function addcertificate() {
        setcertificate(
            [...certificate, { id: Date.now(), cname: '', curl: '' }]
        )
    }
    function deletecertificate(index) {
        console.log(index);
        var new1 = [...certificate]
        new1.splice(index, 1)
        setcertificate(new1);
    }

    function addportfolio() {
        setportfolio(
            [...portfolio1, { id: Date.now(), url: "", name: "" }]
        )
    }
    function deleteportfolio(index) {
        // setportfolio(
        //     [...portfolio1, { id: Date.now(), url: "", name: "" }]
        // )

        var array = portfolio1.splice(index, 1)
        setportfolio(array);
    }


    function handlecertificatechange(id, field, value) {
        var array = certificate.map((e) => {
            if (e.id === id) {
                return { ...e, [field]: value, firsterror: false, seconderror: false }

            }
            else return { ...e, firsterror: false, seconderror: false }
        })
        setcertificate(array);
    }


    function handleurlchange(id, field, value) {
        var array = portfolio1.map((e) => {
            if (e.id === id) {
                return { ...e, [field]: value, firsterror: false, seconderror: false }

            }
            else return { ...e, firsterror: false, seconderror: false }
        })
        setportfolio(array);
    }



    async function finalsubmit() {

        console.log("route called");
        

        for (var i = 0; i < certificate.length; i++) {

            console.log(i);

            var items = certificate[i];
            console.log(items);
            if (items.cname == "" && items.curl == "") {

            }
            else if ((items.cname != "" && items.curl == "")) {
                var array = certificate.map((c, index) => {
                    if (i == index) {
                        return { ...c, seconderror: true }
                    }
                    else return c
                })
                console.log(array, "sajkhd");
                setcertificate(array);
                return
            }
            else if ((items.cname == "" && items.curl != "")) {
                var array = certificate.map((c, index) => {
                    if (i == index) {
                        return { ...c, firsterror: true }
                    }
                    else return c
                })
                setcertificate(array)
                return

            }
        }

        for (var i = 0; i < portfolio1.length; i++) {

            console.log(i);

            var items = portfolio1[i];
            console.log(items, "portfolio");
            if (items.url == "" && items.name == "") {

            }
            else if ((items.name != "" && items.url == "")) {
                var array = portfolio1.map((c, index) => {
                    if (i == index) {
                        return { ...c, seconderror: true }
                    }
                    else return c
                })
                console.log(array, "sajkhd");

                setportfolio(array)
                return
            }
            else if ((items.name == "" && items.url != "")) {
                var array = portfolio1.map((c, index) => {
                    if (i == index) {
                        return { ...c, firsterror: true }
                    }
                    else return c
                })
                setportfolio(array)
                return

            }
        }

        console.log(certificate, "ok");


        // console.log(image);


        const final = new FormData();
        for (var items of form["_parts"]) {

            if (items[0] == "fullname" || items[0] == "password") continue;
            final.append(items[0], items[1]);
        }

        if (image != "xyz") {
            final.append("profilePhoto", {
                uri: image,
                type: "image/jpeg",
                name: `image_${Date.now()}.jpg`,

            })
        }
        else{
           
            
            console.log("no image");
            var defaulImage = await loadDefaultImage();
            console.log(defaulImage , "okkkkkkkkkkkkk");
            

            final.append("profilePhoto", {
                uri: defaulImage,
                type: "image/jpeg",
                name: `image_${Date.now()}.jpg`,

            })

            // return
            
        }


        var certification = certificate.map(({ id, cname, curl }) => {
            var obj = { name: cname, url: curl }
            return obj

        })
        setloading(true);
        var portfolio = portfolio1.map(({ id, url, name }) => {
            return { url, name }
        })
        final.append("tagline", tagline)
        final.append("skills", skills)
        final.append("education", education1);
        final.append("certification", JSON.stringify(certification));
        final.append("portfolio", JSON.stringify(portfolio));
        console.log("will make final submit");
        console.log("reached here");
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



        console.log(final);
        

        try {
            const response = await fetch(`${url}api/communityMemberInfo`, {
                method: 'POST',
                body: final,
                headers: {
                    accept: "application/json",
                    "Authorization": token,
                },
            });
            const data = await response.json();
            console.log(data);
            if (response.status === 200) {
                try {
                    await AsyncStorage.setItem('accessToken', data.newToken);
                    console.log('Data saved successfully!');
                } catch (error) {
                    console.error('Error saving data:', error);
                }
                updateField("token", data.newToken);
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Main2" }],
                });
                // navigation.navigate("Main2")
            }
            else if (response.status === 400) {
                console.log("internal error");
                setmessage("some error occurred")
            }
        }
        catch (err) {

        }
        finally {
            setloading(false);
        }

        // console.log(final);


        // setloading(false)

    }

    function addurl() {

    }
    return (

        <SafeAreaView style={signup3styles.container}>
            <KeyboardAwareScrollView enableAutomaticScroll={true} keyboardOpeningTime={250} enableOnAndroid={true}
                nestedScrollEnabled={true}>
                <TouchableWithoutFeedback onPress={handleOutsideTouch}>
                    <View style={signup3styles.row}>
                        {/* top */}

                        <View style={signup3styles.top}>
                            <View style={signup3styles.left}>
                                <Image style={signup3styles.logo} source={require("../assets/images/logo.png")} />
                            </View>
                            <View style={signup3styles.right}>
                                <Line3 progresswidth={"106%"} />
                            </View>
                        </View>



                        {/* bottom */}

                        {/* <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" keyboardVerticalOffset={100}> */}
                        <View style={styles.bottom}>
                            <Text style={styles.t1}>Bio</Text>
                            <Text style={styles.t2}>A brief introduction where you can describe yourself, your background, interests, and what you’re looking for on Startsy.</Text>
                            <TextInput
                                allowFontScaling={false}
                                placeholder="Type"
                                placeholderTextColor="#B8B8B8"
                                style={styles.input}
                                value={tagline}
                                onChangeText={(text) => { settagline(text) }}
                            />
                            <Text style={[styles.t1, { marginBottom: 5 }]}>Skills</Text>
                            <Text style={styles.t2}>Showcase key abilities and expertise, helping other users highlight what you bring to the startup ecosystem.</Text>

                            <TextInput
                                allowFontScaling={false}
                                placeholder="Write any Top 3"
                                placeholderTextColor="#B8B8B8"
                                style={styles.input}
                                value={skills}
                                onChangeText={(text) => { setskills(text) }}
                            />

                            <Text style={styles.t1}>Education</Text>
                            <Text style={[styles.t2, { marginBottom: 20 }]}>List your highest degree achieved, which helps to establish your academic background and qualifications.</Text>

                            {/* <ScrollView style={{height : 200} }> */}
                            <Drop borderwidth={3} borderColor={"#16181a"} items={education} open={open} setOpen={setOpen} onValueChange={(value) => { seteducation(value) }} nestedScrollEnabled={true} />
                            {/* </ScrollView> */}

                            <Text style={[styles.t1, { marginTop: 30 }]}>Certification</Text>


                            {certificate.map((certificate, index) => (
                                <View key={certificate.id} style={styles.certificate}>
                                    <Pressable onPress={addcertificate}>
                                        <Entypo style={styles.plus} name="plus" size={24} color="#00DE62" />
                                    </Pressable>
                                    {index > 0 && <Pressable onPress={() => { deletecertificate(index) }}>
                                        <FontAwesome6 name="trash" style={styles.minus} size={15} color="#00DE62" />
                                    </Pressable>}

                                    <TextInput
                                        allowFontScaling={false}
                                        placeholder="Certification name"
                                        placeholderTextColor="#B8B8B8"
                                        style={[styles.input, { marginTop: 20, backgroundColor: "transparent" }]}
                                        value={certificate.cname}
                                        onChangeText={(text) => { handlecertificatechange(certificate.id, "cname", text) }}
                                    />
                                    {certificate.firsterror && <Text style={styles.err}>* please enter this field</Text>}
                                    <TextInput
                                        allowFontScaling={false}
                                        placeholder="URL"
                                        placeholderTextColor="#B8B8B8"
                                        style={styles.input}
                                        value={certificate.curl}
                                        onChangeText={(text) => { handlecertificatechange(certificate.id, "curl", text) }}
                                    />
                                    {certificate.seconderror && <Text style={styles.err}>* please enter this field</Text>}


                                </View>
                            ))}


                            <Text style={[styles.t1, { marginTop: 30 }]}>Portfolio</Text>
                            {portfolio1.map((items, index) => (
                                <View style={styles.certificate} key={items.id}>
                                    <Pressable onPress={addportfolio}>
                                        <Entypo style={styles.plus} name="plus" size={24} color="#00DE62" />
                                    </Pressable>
                                    {index > 0 && <Pressable onPress={() => { deleteportfolio(index) }}>
                                        <FontAwesome6 name="trash" style={styles.minus} size={15} color="#00DE62" />
                                    </Pressable>}
                                    <TextInput
                                        allowFontScaling={false}
                                        placeholder="URL"
                                        placeholderTextColor="#B8B8B8"
                                        style={[styles.input, { marginTop: 20, backgroundColor: "transparent" }]}
                                        onChangeText={(text) => { handleurlchange(items.id, "url", text) }}

                                    />
                                    {items.seconderror && <Text style={styles.err}>* please enter this field</Text>}
                                    <TextInput
                                        allowFontScaling={false}
                                        placeholder="Portfolio name"
                                        placeholderTextColor="#B8B8B8"
                                        style={styles.input}
                                        onChangeText={(text) => { handleurlchange(items.id, "name", text) }}

                                    />
                                    {items.firsterror && <Text style={styles.err}>* please enter this field</Text>}

                                </View>
                            ))}

                            <Text allowFontScaling={false} style={[styles.t1, { marginBottom: 0 }]}>Instagram</Text>



                            <View style={styles.v2} >
                                <Pressable onPress={addurl}>
                                    <AntDesign name="instagram" style={styles.plus2} size={24} color="#bbbbbb" />
                                    {/* <Entypo style={styles.plus1} name="plus" size={24} color="#00DE62" /> */}
                                </Pressable>

                                <TextInput

                                    allowFontScaling={false}
                                    placeholder="URL"
                                    numberOfLines={1}
                                    placeholderTextColor="#B8B8B8"
                                    style={styles.inputss}
                                    value={InstagramUrl}
                                    onChangeText={(text) => { setInstagramUrl(text) }}
                                />
                            </View>
                            <Text allowFontScaling={false} style={[styles.t1, { marginBottom: 0 }]}>YouTube</Text>

                            <View style={styles.v2} >
                                <Pressable onPress={addurl}>
                                    {/* <Feather name="youtube" style={styles.plus1} size={24} color="#bbbbbb" /> */}
                                    <AntDesign name="youtube" style={styles.plus2} size={24} color="#bbbbbb" />
                                    {/* <Entypo style={styles.plus1} name="plus" size={24} color="#00DE62" /> */}
                                </Pressable>

                                <TextInput

                                    allowFontScaling={false}
                                    placeholder="URL"
                                    numberOfLines={1}
                                    placeholderTextColor="#B8B8B8"
                                    style={styles.inputss}
                                    value={YTURL}
                                    onChangeText={(text) => { setYTURL(text) }}
                                />
                            </View>
                            <Text allowFontScaling={false} style={[styles.t1, { marginBottom: 0 }]}>LinkedIn</Text>

                            <View style={styles.v2} >
                                <Pressable onPress={addurl}>
                                    <AntDesign name="linkedin-square" style={styles.plus2} size={24} color="#bbbbbb" />
                                    {/* <Entypo style={styles.plus1} name="plus" size={24} color="#00DE62" /> */}
                                </Pressable>

                                <TextInput

                                    allowFontScaling={false}
                                    placeholder="URL"
                                    numberOfLines={1}
                                    placeholderTextColor="#B8B8B8"
                                    style={styles.inputss}
                                    value={LinkedinURl}
                                    onChangeText={(text) => { setLinkedinURl(text) }}
                                />
                            </View>
                            <View style={styles.icons} nestedScrollEnabled={true}>
                                <Pressable onPress={() => {
                                    navigation.goBack()
                                    // console.log(certificate);
                                }}><FontAwesome6 name="chevron-left" size={40} color="#00DF60" /></Pressable>

                                <Pressable style={styles.btn} onPress={() => { finalsubmit() }}>
                                    {loading && <ActivityIndicator size={24} color="#16181a" />}
                                    {!loading && <Text allowFontScaling={false} style={styles.nexttext}>Submit</Text>}
                                </Pressable>

                                {/* <Pressable onPress={() => { nextpage(navigation, type) }}><FontAwesome6 name="chevron-right" size={40} color="#00DF60" /></Pressable> */}
                            </View>





                        </View>
                        {/* </KeyboardAvoidingView> */}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
        </SafeAreaView>

    )
}

export default Signup7;

const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;


const scalingfactor = Math.sqrt(a * b)
const styles = StyleSheet.create({
    t1: {
        textAlign: 'Left',
        marginLeft: 10,
        color: "#D9D9D9",
        fontFamily: 'Alata',
        fontSize: scalingfactor * 27,
        marginBottom: scalingfactor * 3,
        zIndex: 100,
        // pointerEvents: "none",
        // backgroundColor: 'red',
        width: "auto"
    },
    t2: {
        textAlign: 'Left',
        color: "#94A3B8",
        fontFamily: 'Roboto',
        fontSize: scalingfactor * 14,
        // zIndex: -1,
        marginBottom: scalingfactor * 8,
        width: "85%",
        // fontweight : 0,
        alignSelf: "center",
        lineHeight: scalingfactor * 20
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


    btn: {
        width: 168,
        height: 48,
        // height : scalingfactor*48,
        backgroundColor: "#00DF60",
        // padding: scalingfactor * 12,
        // marginVertical: height * 0.018,
        borderRadius: 20,
        // margin: "auto",
        // marginTop: scalingfactor * 20,
        shadowColor: 'rgba(0,0,0, 0.5)', // Shadow color
        shadowOffset: {
            width: 0, // x offset
            height: 5, // y offset
        },
        shadowOpacity: 1, // Full opacity for shadow effect
        shadowRadius: 1, // Blur radius
        elevation: 5,
        justifyContent: 'center',

    }, nexttext: {
        color: "#24272A",
        fontFamily: "Alata",
        fontSize: scalingfactor * 22,
        textAlign: "center",
        // lineHeight : 16
        marginTop: -4

    },
    input: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        marginTop: 0,
        borderBottomWidth: 3,
        paddingLeft: scalingfactor * 10,
        borderBottomColor: "#16181A",
        fontSize: scalingfactor * 20,
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 5,
        width: "92%",
        // fontFamily: "Roboto",
        // lineHeight: scalingfactor * 18,
        marginBottom: scalingfactor * 25
    },
    inputss: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        marginTop: 0,
        // borderBottomWidth: 3,
        paddingLeft: scalingfactor * 30,
        // borderBottomColor: "#16181A",
        fontSize: scalingfactor * 20,
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 5,
        width: "92%",
        // fontFamily: "Roboto",
        // lineHeight: scalingfactor * 18,
        marginBottom: scalingfactor * 2
    },
    v1: {
        borderBottomWidth: 3,
        borderBottomColor: "#16181A",
        width: "90%",
        margin: "auto",
        //    backgroundColor :"red",
        paddingBottom: 0,
        marginTop: 10
    },
    v2: {
        borderBottomWidth: 3,
        borderBottomColor: "#16181A",
        width: "90%",
        margin: "auto",
        //    backgroundColor :"red",
        paddingBottom: 0,
        marginTop: 10,
        marginBottom: 20
    },
    input1: {
        // backgroundColor: "yellow",
        margin: height * 0.016,
        marginTop: 0,

        fontSize: scalingfactor * 20,
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 0,
        width: "90%",
        marginLeft: 0,
        paddingLeft: 10,
        fontFamily: "Roboto",
        // lineHeight: scalingfactor * 18,
        // marginBottom: scalingfactor * 25
    }
    , icons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "92%",
        margin: "auto",
        marginTop: 30,
        marginBottom: 30
    },
    certificate: {
        padding: 4,
        paddingTop: 15,
        marginTop: 10,
        margin: "auto",
        width: "92%",
        backgroundColor: "transparent",
        borderWidth: 3,
        borderColor: "#16181A",
        borderRadius: 10,
        position: "relative"
    },
    plus: {
        position: "absolute",
        right: 5,
        top: -5,
        zIndex: 100
    },
    plus1: {
        position: "absolute",
        right: 10,
        top: 2,
        zIndex: 100
    },
     plus2: {
        position: "absolute",
        left: 0,
        top: 12,
        zIndex: 100
    },
    
    
    minus: {
        position: "absolute",
        right: 45,
        top: -3,
        zIndex: 100
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
        fontSize: 12,
        fontFamily: "Roboto",
    }

})