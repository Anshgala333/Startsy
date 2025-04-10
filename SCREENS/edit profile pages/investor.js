import { useFocusEffect } from "expo-router"
import { useState, useEffect, useRef, useContext } from "react";
import * as React from "react"
import { SafeAreaView, BackHandler, ScrollView, StatusBar, TouchableOpacity, ActivityIndicator, Animated, Dimensions, Pressable, TextInput, TouchableWithoutFeedback, Image } from "react-native"
import { View, Text, StyleSheet } from "react-native"
import Profile from "../../assets/icons/profile.js"
import Drop from "../../SCREENS/dropdown.js"
import Slider from "@react-native-community/slider";
import styles from "../commonstyles.js"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { url } from "../../config.js"
import * as ImagePicker from 'expo-image-picker';
import { GlobalContext } from "../../Global/globalcontext.js";




const EditInvestorInfo = ({ navigation }) => {

    useFocusEffect(() => {
        // StatusBar.setBackgroundColor("red")
        // StatusBar.setBarStyle("light-content")
    })
    const [sliderrange1, setsliderrange1] = useState(0)
    const [sliderrange, setsliderrange] = useState(0)
    const [fullName, setfullname] = useState("")
    const [contactInfo, setcontactInfo] = useState("")
    const [country, setcountry] = React.useState("")
    const [areaOfInterest, setareafofinterest] = useState("")
    const [startupStage, setsetstartupstage] = useState("")
    const [preferredSector, setsector] = useState("")
    const [investmentvalue, setinvestmentvalue] = useState(0)
    const [loading, setloading] = useState(false)
    const [token, settoken] = useState("")
    const sliderRef = useRef(null);

    const h1 = (value) => {
        if (sliderRef.current) {
            clearTimeout(sliderRef.current);
        }
        sliderRef.current = setTimeout(() => {
            setsliderrange(value);
        }, 100);
    };

    const [image, setImage] = useState(null);

    const [open1, setOpen1] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [open3, setOpen3] = React.useState(false)
    const [open4, setOpen4] = React.useState(false)

    const { globaldata, updateField } = useContext(GlobalContext);

    useEffect(() => {
        console.log(globaldata, "global data");
        settoken(globaldata.token)
    }, [globaldata])
    function gotochangepassowrd() {

        navigation.navigate("ChangePassword1")
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack();


            return true; // This prevents the default back action
        });

        return () => backHandler.remove();
    }, []);

    const fileupload = async () => {

        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        // Launch the image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,

        });


        if (!result.canceled) {

            const imageUri = result.assets[0].uri;
            setImage(imageUri);


        }

    }


    var areaofinterestlist = [
        { label: "AI", value: "AI" },
        { label: "AR/VR", value: "AR/VR" },
        { label: "Blockchain", value: "Blockchain" },
        { label: "Social Media", value: "Social Media" },
        { label: "Marketing", value: "Marketing" },
        { label: "Social media marketing", value: "Social media marketing" },
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
        { label: "Philanthropy", value: "Philanthropy" }
    ];


    var stage = [
        { label: "Ideation Stage", value: "Ideation Stage" },
        { label: "Pre-Seed Stage", value: "Pre-Seed Stage" },
        { label: "Seed Stage ", value: "Seed Stage" },
        { label: "Early Stage", value: "Early Stage" },
        { label: "Growth Stage", value: "Growth Stage" },
        { label: "Expansion Stage", value: "Mature Stage" },

    ]
    var sectorlist = [
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
        { label: "Philanthropy", value: "Philanthropy" }
    ];
    var country1 = [
        { label: "India", value: "INDIA" },
        { label: "United States", value: "UNITED_STATES" },
        { label: "Canada", value: "CANADA" },
        { label: "United Kingdom", value: "UNITED_KINGDOM" },
        { label: "Australia", value: "AUSTRALIA" },
        { label: "Singapore", value: "SINGAPORE" },
        { label: "Indonesia", value: "INDONESIA" },
        { label: "Vietnam", value: "VIETNAM" },
        { label: "Malaysia", value: "MALAYSIA" },
        { label: "UAE", value: "UAE" },
        { label: "Saudi Arabia", value: "SAUDI_ARABIA" },
        { label: "Israel", value: "ISRAEL" },
        { label: "Nigeria", value: "NIGERIA" },
        { label: "South Africa", value: "SOUTH_AFRICA" },
        { label: "Brazil", value: "BRAZIL" },
        { label: "Mexico", value: "MEXICO" },
        { label: "Others (Type)", value: "OTHERS" },

    ]



    const handleOutsideTouch = () => {
        if (open1) setOpen1(false);
        if (open2) setOpen2(false);
        if (open3) setOpen3(false);
        if (open4) setOpen3(false);
    };
    const handlerole = (value1) => {
        setcountry(value1); // Update state with the selected value
    };
    const t1 = () => {
        setOpen1(!open1);
        if (open2) setOpen2(false);
        if (open3) setOpen3(false);
        if (open4) setOpen4(false);
    }
    const t2 = () => {
        if (open1) setOpen1(false);
        setOpen2(!open2);
        if (open3) setOpen3(false);
        if (open4) setOpen4(false);
    }
    const t3 = () => {
        if (open1) setOpen1(false);
        if (open2) setOpen2(false);
        setOpen3(!open3);
        if (open4) setOpen4(false);
    }
    const t4 = () => {
        if (open2) setOpen2(false);
        if (open3) setOpen3(false);
        if (open1) setOpen1(false);
        setOpen4(!open4);
    }
    const [errors, setErrors] = useState({}); // Error state

    async function getdata() {
        try {
            const response = await fetch(`${url}api/getProfileDetailsForEditProfile`, {
                method: 'GET',
                headers: {
                    accept: "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();

            setexistingdata(data.data)

            console.log(response.status);

        }
        catch (err) {
            // setloading(false)
            console.log(err);

        }
    }
    const [existingdata, setexistingdata] = useState()



    useEffect(() => {
        getdata()
    }, [token])

    useEffect(() => {
        console.log("hiii");
        if (existingdata) {

            console.log(existingdata.roleId.fullName);
            console.log(existingdata.roleId.country);

            setImage(existingdata.profilePhoto)

            setfullname(existingdata.roleId.fullName)
            setcountry(existingdata.roleId.country)
            setcontactInfo(existingdata.roleId.contactInfo)
            setsliderrange1(existingdata.roleId.previousExperience)
            setsliderrange(existingdata.roleId.investmentRange)
            setsetstartupstage(existingdata.roleId.startupStage)
            setsector(existingdata.roleId.preferredSector)
            // settagline(existingdata.roleId.tagline)
            // setskills(existingdata.roleId.skills)
            // seteducation(existingdata.roleId.education)
            // var modified = existingdata.roleId.certification.map((e)=>
            // {
            //     return {
            //         id : e._id,
            //         cname : e.name,
            //         curl : e.url
            //     }
            // })
            // setcertificate(modified)

            // var m1 = existingdata.roleId.portfolio.map((e)=>{
            //     return {
            //         id : e._id,
            //         url : e.url

            //     }
            // })
            // setportfolio(m1)


        }
    }, [existingdata])


    async function savedata() {

        setloading(true);



        const newErrors = {};

        let cangoahead = true


        if (fullName == "") {
            console.log("full name nai hai");
            newErrors.fullName = "* Full name is required.";
            cangoahead = false
        }
        if (country == "") {
            console.log("country nai hai");

            newErrors.country = "* Please select a country.";
            cangoahead = false
        }
        const numberRegex = /^\d{10}$/;

        if (!contactInfo.trim()) {
            newErrors.number = "* Phone number is required.";
        } else if (!numberRegex.test(contactInfo)) {
            newErrors.number = "* Phone number must be 10 digits.";
        }



        if (sliderrange1 == "" && sliderrange1 != 0) {
            newErrors.role1 = "*please enter your experience";
            cangoahead = false
        }
        if (startupStage == "") {
            newErrors.role2 = "*please select a value";
            cangoahead = false
        }
        if (preferredSector == "") {
            newErrors.role3 = "*please select a value";
            cangoahead = false
        }
        // if (sliderrange == "") {
        //     newErrors.role4 = "*please select a value";
        //     cangoahead = false
        // }

        setErrors(newErrors);

        if (cangoahead == false) {
            setloading(false)
            return

        }


        var formData = new FormData()
        formData.append("fullName", fullName);
        formData.append("country", country);
        formData.append("contactInfo", contactInfo);
        formData.append("previousExperience", parseInt(sliderrange1) || 0);
        formData.append("areaOfInterest", areaOfInterest);
        formData.append("startupStage", startupStage);
        formData.append("preferredSector", preferredSector);
        formData.append("investmentRange", parseInt(sliderrange) || 0);
        if (image && image != "") {
            formData.append("profilePhoto", {
                uri: image,
                type: "image/jpeg",
                name: `image_${Date.now()}.jpg`,
            });
        }





        // console.log(formData["_parts"][6]);


        try {
            const response = await fetch(`${url}investor/editInvestorAccountProfileDetails`, {
                method: 'POST',
                body: formData,
                headers: {
                    accept: "application/json",
                    "Authorization": token,
                },
            });
            const data = await response.json();
            setloading(false)
            console.log(data);
            if (response.status == 200) {
                navigation.goBack()
            }
        }
        catch (err) {
            setloading(false)
            console.log(err);

        }
        finally {
            setloading(false)
        }

    }


    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181A")
        StatusBar.setBarStyle("light-content")
    })
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: "#16181a" }}>
            <View style={styles1.header}>
                    <View style={styles1.headerSide}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <FontAwesome6 name="chevron-left" size={25} style={styles1.backIcon} color="#00DF60" />
                        </Pressable>
                    </View>

                    <View style={styles1.headerCenter}>
                        <Text style={styles1.title}>Edit Profile</Text>
                    </View>

                    <View style={styles1.headerSide} />
                </View>
            <ScrollView style={{ flex: 1,paddingTop:20 }}>
                
                <View style={{ width: width * 0.98, margin: "auto" }}>
                    {/* <Text style={styles1.edit}>Edit Profile</Text> */}
                    {/* <Profile /> */}
                    <Pressable onPress={fileupload}>
                        {image != null ? (
                            <Image style={styles1.img} source={{ uri: image }} />
                        ) : (
                            // <Image style={styles.img1} source={require("../assets/images/User_light.png")} />
                            <Profile />
                        )}
                    </Pressable>
                    <Text style={styles1.t2}>Change profile picture</Text>

                    <TouchableOpacity onPress={gotochangepassowrd} style={styles1.editButton1}>
                        <Text allowFontScaling={false} style={styles1.editButtonText}>Change Password</Text>
                    </TouchableOpacity>

                    <TextInput
                        onTouchStart={handleOutsideTouch}
                        allowFontScaling={false}
                        placeholder="Full Name"
                        placeholderTextColor="#828282"
                        style={styles1.input}
                        value={fullName}
                        onChangeText={(text) => { setfullname(text) }}
                    />
                    {errors.fullName && <Text style={styles1.err}>{errors.fullName}</Text>}

                    {/* <TextInput
                        allowFontScaling={false}
                        placeholder="Email address"
                        placeholderTextColor="#B8B8B8"
                        style={[styles1.input, { marginBottom: 18 }]}
                    // value={username}
                    // onChangeText={(text) => { setusername(text) }}
                    /> */}
                    <Drop width={"97%"} borderColor={"#ccc"} bb={1} bradius={0} bottomsheet={true} items={country1} placeholder={country} width={"93.5%"} onValueChange={handlerole} open={open1} setOpen={t1} extra={true} />

                    {/* <Drop items={country1} width={"95%"} open={open1} setOpen={t1} onValueChange={handlerole} nestedScrollEnabled={true} extra={true} /> */}
                    {errors.country && <Text style={styles1.errnew}>{errors.country}</Text>}

                    <TextInput
                        allowFontScaling={false}
                        placeholder="Phone number"
                        placeholderTextColor="#828282"
                        style={[styles1.input, { marginTop: 15 }]}
                        value={contactInfo}
                        onChangeText={(text) => { setcontactInfo(text) }}
                    />
                    {errors.number && <Text style={styles1.err}>{errors.number}</Text>}




                    <Text allowFontScaling={false} style={[styles.t1, { marginTop: 15, marginBottom: 20, paddingLeft: 7 }]}>Investing experience</Text>
                    <Pressable onPress={() => { handleOutsideTouch() }} style={[styles.btn1, { marginTop: 0 }]}>
                        <Text allowFontScaling={false} style={styles.nexttext}>{sliderrange1.toLocaleString("en-IN")} {sliderrange1 > 1 ? "years" : "year"}</Text>
                    </Pressable>
                    <View style={[styles.box, { left: 20 }]}></View>
                    <View style={[styles.box1, { left: "95%" }]}></View>

                    <Slider
                        // style={styles.sliderbox}
                        style={{ marginTop: -7, width: "90%", margin: "auto" }}
                        minimumValue={0}
                        maximumValue={20}
                        value={2}
                        step={1}
                        minimumTrackTintColor="#00DE62"
                        maximumTrackTintColor="#00DE62"
                        // step={100}

                        thumbImage={require("../../assets/images/slider3.png")}
                        onValueChange={(value) => { setsliderrange1(parseInt(value)) }}
                        hitSlop={{ top: 50, left: 50, right: 50, bottom: 50 }}
                        thumbTouchSize={{ width: 100, height: 100 }}
                    />
                    {errors.role1 && <Text style={styles1.err}>{errors.role1}</Text>}



                    <View style={{ width: width * 0.95, margin: "auto" }}>
                        {/* <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t1, { marginTop: 25, marginBottom: 10, paddingLeft: 7 }]}>Area of interest </Text>
                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t2, { marginBottom: 15 }]}>In this section, specify the fields and industries that capture your investment interest. </Text>
                        <Drop items={areaofinterestlist} onValueChange={(value) => { setareafofinterest(value) }} setOpen={t2} open={open2} nestedScrollEnabled={true} />
 */}

                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t1, { marginBottom: 10, marginTop: 25, paddingLeft: 7 }]}>Preferred startup stage </Text>
                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t2, { marginBottom: 15 }]}>Indicate the stages of development at which you prefer to invest.</Text>
                        <Drop bb={1} bradius={0} items={stage} placeholder={startupStage} onValueChange={(value) => { setsetstartupstage(value) }} setOpen={t3} open={open3} nestedScrollEnabled={true} />
                        {errors.role2 && <Text style={styles1.errnew}>{errors.role2}</Text>}

                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t1, { marginBottom: 10, marginTop: 25, paddingLeft: 7 }]}>Preferred startup sector  </Text>
                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t2, { marginBottom: 15 }]}>This distinction helps founders understand the scope and nature of your investment interests, ensuring that you receive opportunities that align with your strategic preferences and expertise.
                        </Text>
                        <Drop bb={1} bradius={0} items={sectorlist} placeholder={preferredSector} onValueChange={(value) => { setsector(value) }} setOpen={t4} open={open4} nestedScrollEnabled={true} />
                        {errors.role3 && <Text style={styles1.errnew}>{errors.role3}</Text>}


                        <Text allowFontScaling={false} style={[styles.t1, { marginTop: 20, marginBottom: 10, paddingLeft: 7 }]}>Investment capacity</Text>
                        <Pressable onPress={() => { handleOutsideTouch() }} style={[styles.btn1, {  marginBottom: 10 }]}>
                            <Text allowFontScaling={false} style={styles.nexttext}>{sliderrange.toLocaleString("en-IN")}</Text>
                        </Pressable>

                        {/* slider */}
                        <View style={[styles.box, { left: 20 }]}></View>
                        <View style={[styles.box1, { left: "95%" }]}></View>
                        <Slider onTouchStart={handleOutsideTouch}
                            // style={styles.sliderbox}
                            style={{ marginTop: -7, width: "90%", margin: "auto" }}
                            minimumValue={0}
                            maximumValue={10000000}

                            value={sliderrange}
                            step={200000}
                            minimumTrackTintColor="#00DE62"
                            maximumTrackTintColor="#00DE62"
                            thumbTintColor="#737373"

                            // step={100}
                            // thumbTintColor="#737373" // Color of the slider thumb
                            // trackImage={require("../assets/images/slider.png")}
                            // trackImage={require("../assets/images/slider3.png")}
                            // thumbImage={require("../../assets/images/slider3.png")}
                            onValueChange={h1}
                        // hitSlop={{ top: 50, left: 50, right: 50, bottom: 50 }}
                        // thumbTouchSize={{ width: 100, height: 100 }}
                        />

                    </View>


                    <View onTouchStart={handleOutsideTouch} s style={styles1.icons}>
                        <Pressable onPress={() => { navigation.goBack() }} style={{ alignSelf: "center" }}><FontAwesome6 name="chevron-left" size={30} color="#00DF60" /></Pressable>
                        <Pressable onPress={savedata} style={styles1.btn}>
                            {loading && <ActivityIndicator size={24} color="#16181a" />}
                            {!loading && <Text allowFontScaling={false} style={styles1.nexttext}>Save</Text>}
                        </Pressable>
                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>

    )
}

export default EditInvestorInfo


const { height, width } = Dimensions.get("window");


var a = width / 360;
var b = height / 800;
// console.log(a,b);

const scalingfactor = Math.sqrt(a * b)
const styles1 = StyleSheet.create({
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
    edit: {
        color: "#B8B8B8",
        fontFamily: "Alata",
        textAlign: "center",
        fontSize: 20,
        marginBottom: 20


    },
    t2: {
        color: "#94A3B8",
        fontFamily: "Roboto",
        textAlign: "center",
        fontSize: 14,
        marginBottom: 5,
        marginTop: 10
    },
    input: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        // marginTop: 40,
        borderBottomWidth: 1,
        // borderRadius : 20,
        paddingLeft: scalingfactor * 8,
        borderBottomColor: "#AEAFAF",
        fontSize: scalingfactor * 20, // Responsive font size
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 7,
        width: "89%",
        marginHorizontal: "auto",
        // fontFamily: "Roboto",
        // lineHeight: scalingfactor * 18,
        marginBottom: scalingfactor * 15,
        // borderRadius : 20
    },
    icons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        margin: "auto",
        // marginTop: scalingfactor * 30,
        // position: "absolute",
        // bottom: 40,
        marginTop: 60,
        marginBottom: 40,
        alignSelf: "center",
    }
    ,
    btn: {
        width: 120,
        height: 40,
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
        fontSize: 20,
        textAlign: "center",
        // lineHeight : 16
        marginTop: -4

    },
    img: {
        margin: "auto",
        width: 113,
        height: 113,
        borderRadius: 100
    },
    editButton1: {
        backgroundColor: "#00DE62",
        // paddingHorizontal: 20,
        // paddingVertical: 8,
        borderRadius: 20,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#00DE62",
        alignItems: "center",
        verticalAlign: "middle",
        justifyContent: "center",
        width: 182,
        height: 40,
        alignSelf: "center",
        marginVertical: 12


    },
    editButtonText: {
        color: "#16181A",
        fontSize: 16,
        fontFamily: "Alata",
        textAlign: "center",
        marginLeft: -1,
        marginTop: -3
    },

    err: {
        color: "#E65858",
        marginTop: -5,
        width: "89%",
        fontSize: 12,
        marginHorizontal: "auto",
        // marginBottom : 2
    },
    errnew: {
        color: "#E65858",
        marginTop: 5,
        width: "89%",
        fontSize: 12,
        marginBottom: -10,
        marginHorizontal: "auto",
    },


})