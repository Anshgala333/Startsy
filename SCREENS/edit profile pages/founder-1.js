import { useFocusEffect } from "expo-router"
import { useState, useEffect, useRef, useContext } from "react";
import * as React from "react"
import { SafeAreaView, ScrollView, StatusBar, Animated, TouchableOpacity, Dimensions, BackHandler, Pressable, TextInput, TouchableWithoutFeedback, Image } from "react-native"
import { View, Text, StyleSheet } from "react-native"
import Profile from "../../assets/icons/profile.js"
import Drop from "../../SCREENS/dropdown.js"
import Slider from "@react-native-community/slider";
import styles from "../commonstyles.js"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from '@expo/vector-icons/Entypo';

import * as ImagePicker from 'expo-image-picker';
import { url } from "../../config.js"
import { GlobalContext } from "@/Global/globalcontext.js";



const Founder1 = ({ navigation }) => {

    function gotochangepassowrd() {

        navigation.navigate("ChangePassword1")
    }
    const [sliderrange, setsliderrange] = useState(5000000)

    const [token, settoken] = useState("")



    const { globaldata, updateField } = useContext(GlobalContext);

    useEffect(() => {
        console.log(globaldata, "global data from founde rpage");
        settoken(globaldata.token)
    }, [])



    const [areaofinterest, setareafofinterest] = useState("")

    const [fullName, setfullname] = useState("");
    const [email, setemail] = useState("");
    const [country, setcountry] = React.useState("");
    const [phone, setphone] = useState("");
    const [skills, setskills] = useState("");
    const [education, seteducation] = useState("");
    const [image, setImage] = useState("");


    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack();


            return true; // This prevents the default back action
        });

        return () => backHandler.remove();
    }, []);

    // const [existingdata, setexistingdata] = useState()

    const [existingdata, setexistingdata] = useState()

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


        }
        catch (err) {
            // setloading(false)
            console.log(err);

        }
    }


    useEffect(() => {
        console.log("hiii");
        if (existingdata) {

            console.log(existingdata.roleId.previousWorkExperience);
            console.log(existingdata.roleId.country);
            var First = existingdata.roleId.country[0];
            var Second = existingdata.roleId.country.substring(1,);
            // console.log(First);
            // console.log(Second);
            // var Country1 = First+  Second;
            // console.log(Country1);
            
            

            setImage(existingdata.profilePhoto)

            setfullname(existingdata.roleId.fullName)
            setcountry(existingdata.roleId.country)
            setphone(existingdata.roleId.contactInfo)
            setskills(existingdata.roleId.skills)

            var m1 = existingdata.roleId.previousWorkExperience.filter((e) => e.year != null)
            console.log(m1);

            if (m1.length > 0) {
                setworkexperience(m1)
            }
            seteducation(existingdata.roleId.education)
            // setsliderrange(existingdata.roleId.investmentRange)
            // setsetstartupstage(existingdata.roleId.startupStage)
            // setsector(existingdata.roleId.preferredSector)
            // settagline(existingdata.roleId.tagline)
            // setskills(existingdata.roleId.skills)
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



    useEffect(() => {
        getdata()
    }, [token])




    useEffect(() => {
        getdata()
    }, [token])



    const [open1, setOpen1] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [open3, setOpen3] = React.useState(false)
    const [open4, setOpen4] = React.useState(false)

    const [workexperience, setworkexperience] = useState([{ id: Date.now(), name: '', role: '', year: "" }]);


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

    const [errors, setErrors] = useState({}); // Error state

    function nextpage() {

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

        if (!phone.trim()) {
            newErrors.number = "* Phone number is required.";
            cangoahead = false

        } else if (!numberRegex.test(phone)) {
            newErrors.number = "* Phone number must be 10 digits.";
            cangoahead = false

        }

        if (education == "") {
            newErrors.education = "*please select a value";
            cangoahead = false
        }

        setErrors(newErrors);

        if (cangoahead == false) {
            // setloading(false)
            return
        }



        for (var i = 0; i < workexperience.length; i++) {
            console.log(i);

            var items = workexperience[i];
            console.log(items);

            // Check if all fields are empty
            if (items.name == "" && items.role == "" && items.year == "") {
                // Do nothing or handle if needed
            }
            // Check if only `name` is filled
            else if (items.name != "" && items.role == "" && items.year == "") {
                var array = workexperience.map((w, index) => {
                    if (i == index) {
                        return { ...w, roleError: true, yearError: true };
                    } else return w;
                });
                console.log(array, "Role and Year missing");
                setworkexperience(array);
                return;
            }
            // Check if only `role` is filled
            else if (items.name == "" && items.role != "" && items.year == "") {
                var array = workexperience.map((w, index) => {
                    if (i == index) {
                        return { ...w, nameError: true, yearError: true };
                    } else return w;
                });
                console.log(array, "Name and Year missing");
                setworkexperience(array);
                return;
            }
            // Check if only `year` is filled
            else if (items.name == "" && items.role == "" && items.year != "") {
                if (isNaN(items.year) || items.year < 1950 || items.year > 2025) {
                    var array = workexperience.map((w, index) => {
                        if (i == index) {
                            return { ...w, yearError: true, yearInvalid: true };
                        } else return w;
                    });
                    console.log(array, "Year must be a number between 1950 and 2025");
                    setworkexperience(array);
                    return;
                }
                var array = workexperience.map((w, index) => {
                    if (i == index) {
                        return { ...w, nameError: true, roleError: true };
                    } else return w;
                });
                console.log(array, "Name and Role missing");
                setworkexperience(array);
                return;
            }
            // Check if any single field is missing or year is invalid
            else if (
                items.name == "" ||
                items.role == "" ||
                items.year == "" ||
                isNaN(items.year) ||
                items.year < 1950 ||
                items.year > 2025
            ) {
                var array = workexperience.map((w, index) => {
                    if (i == index) {
                        return {
                            ...w,
                            nameError: items.name == "",
                            roleError: items.role == "",
                            yearError: items.year == "",
                            yearInvalid: isNaN(items.year) || items.year < 1950 || items.year > 2025,
                        };
                    } else return w;
                });
                console.log(array, "Some fields missing or year invalid");
                setworkexperience(array);
                return;
            }
        }




        var formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("email", email);
        formData.append("country", country);
        formData.append("contactInfo", phone);
        formData.append("education", education);

        formData.append("skills", skills);

        var array = workexperience.map(({ id, name, ...items }) => {
            return {
                company: name,
                ...items
            }
        })

        formData.append("previousWorkExperience", JSON.stringify(array));


        navigation.navigate("Founder2", { form: formData, image: image, existingdata: existingdata });



    }


    var areaofinterestlist = [
        { label: "Technology", value: "Technology" },
        { label: "Healthcare", value: "Healthcare" },
        { label: "Finance", value: "Finance" },
        { label: "Consumer Goods", value: "Consumer Goods" },
        { label: "Education", value: "Education" },
        { label: "Energy", value: "Energy" },
        { label: "Real Estate", value: "Real Estate" },
        { label: "Logistics", value: "Logistics" },

    ]
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

    };
    const handlerole = (value1) => {

        seteducation(value1); // Update state with the selected value
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

    var edulist = [
        { label: "10th", value: "10TH" },
        { label: "12th", value: "12th" },
        { label: "Graduate", value: "Graduate" },
        { label: "Post-Graduate", value: "Post-Graduate" },
        { label: "P.H.D", value: "P.H.D" },


    ]



    function addworkexperience() {
        setworkexperience(
            [...workexperience, { id: Date.now(), name: '', role: '', year: '' }]
        )
    }


    function handleworkchange(id, field, value) {
        var array = workexperience.map((e) => {


            if (e.id === id) {
                return { ...e, [field]: value, yearError: false, roleError: false, nameError: false, yearInvalid: false }

            }
            else return { ...e, yearError: false, roleError: false, nameError: false, yearInvalid: false }
        })
        setworkexperience(array);
    }

    function deletecertificate(index) {
        var new1 = [...workexperience];
        new1.splice(index, 1)
        setworkexperience(new1)
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
                        {image != "" ? (
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
                        style={[styles1.input, {width:"89%"}]}
                        value={fullName}
                        onChangeText={(text) => { setfullname(text) }}
                    />
                    {errors.fullName && <Text style={styles1.err}>{errors.fullName}</Text>}

                    {/* <TextInput
                        allowFontScaling={false}
                        placeholder="Email address"
                        placeholderTextColor="#828282"
                        style={[styles1.input, { marginBottom: 18 }]}
                        value={email}
                        onChangeText={(text) => { setemail(text) }}
                    /> */}
                    <Drop   borderwidth={0} bb={1} borderColor={"#ccc"}  pccolor={"#828282"}  items={country1} placeholder={"India"} width={"93%"} onValueChange={(value) => setcountry(value)} open={open1} setOpen={t1} extra={true} edit />
                    {errors.country && <Text style={styles1.errnew}>{errors.country}</Text>}

                    <TextInput
                        allowFontScaling={false}
                        placeholder="Phone number"
                        placeholderTextColor="#828282"
                        style={[styles1.input, { marginTop: 16 , width:"89%"} ]}
                        value={phone}
                        onChangeText={(text) => { setphone(text) }}
                    />
                    {errors.number && <Text style={styles1.err}>{errors.number}</Text>}











                    <View style={{ width: width * 0.95, margin: "auto" }}>

                        <Text allowFontScaling={false} style={[styles.t1, { marginTop: 15, marginBottom: 0, paddingLeft: 7 }]}>Area of Expertise / Interest</Text>
                        <TextInput
                            allowFontScaling={false}
                            placeholder="Write any Top 3"
                            placeholderTextColor="#828282"
                            style={[styles1.input, { marginTop: 15 }]}
                            value={skills}
                            onChangeText={(text) => { setskills(text) }}
                        />
                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t1, { marginTop: 15, marginBottom: 10, paddingLeft: 7 }]}>Education </Text>
                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t2, { marginBottom: 15 }]}>List your highest degree achieved, which helps to establish your academic background and qualifications. </Text>
                        <Drop bl={0} bt={0} borderwidth={0} bb={1} borderColor={"#ccc"} pccolor={"#828282"} width={"95%"} items={edulist} placeholder={education} onValueChange={(value) => { seteducation(value) }} setOpen={t2} open={open2} nestedScrollEnabled={true} />
                        {errors.education && <Text style={styles1.errnew}>{errors.education}</Text>}


                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t1, { marginBottom: 10, marginTop: 25, paddingLeft: 7 }]}>Previous Work Experience </Text>
                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t2, { marginBottom: 15 }]}>Detail any relevant industry experience, particularly if you’ve worked in a specific company or held roles that have prepared you for your current venture.</Text>
                        {/* <Text>{JSON.stringify(workexperience)}</Text> */}

                        {workexperience.map((we, index) => (
                            <View onTouchStart={handleOutsideTouch} key={we.id} style={styles1.certificate}>
                                <Pressable onPress={addworkexperience}>
                                    <Entypo style={styles1.plus} name="plus" size={24} color="#ccc" />
                                </Pressable>
                                {/* <Text>{JSON.stringify(we.company)}</Text>
                            <Text>{JSON.stringify(we.role)}</Text>
                            <Text>{JSON.stringify(we.year)}</Text> */}


                                {index > 0 && <Pressable onPress={() => { deletecertificate(index) }}>
                                    <FontAwesome6 name="trash" style={styles1.minus} size={15} color="#ccc" />
                                </Pressable>}

                                <TextInput
                                    allowFontScaling={false}
                                    placeholder="Company / Organisation"
                                    placeholderTextColor="#828282"
                                    style={[styles1.input1, { marginTop: 20, backgroundColor: "transparent" }]}
                                    value={we.company}
                                    onChangeText={(text) => { handleworkchange(we.id, "name", text) }}
                                />
                                {we.nameError && <Text style={styles1.err101}>* please enter company name</Text>}

                                <TextInput
                                    allowFontScaling={false}
                                    placeholder="Role"
                                    placeholderTextColor="#828282"
                                    style={styles1.input1}
                                    value={we.role}
                                    onChangeText={(text) => { handleworkchange(we.id, "role", text) }}
                                />
                                {we.roleError && <Text style={styles1.err101}>* please enter your role</Text>}

                                <TextInput
                                    allowFontScaling={false}
                                    placeholder="Year"
                                    placeholderTextColor="#828282"
                                    style={styles1.input1}
                                    value={we.year?.toString()}
                                    onChangeText={(text) => { handleworkchange(we.id, "year", text) }}
                                />
                                {we.yearError && <Text style={styles1.err101}>* please enter year</Text>}
                                {we.yearInvalid && <Text style={styles1.err101}>* please enter valid year</Text>}

                            </View>
                        ))}






                    </View>


                    <View onTouchStart={handleOutsideTouch} style={styles1.icons}>
                        <Pressable onPress={() => { navigation.goBack() }} style={{ alignSelf: "center" }}><FontAwesome6 name="chevron-left" size={25} color="#00DF60" /></Pressable>
                        <Pressable onPress={nextpage} style={{ alignSelf: "center" }}><FontAwesome6 name="chevron-right" size={25} color="#00DF60" /></Pressable>

                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>

    )
}

export default Founder1


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
        color: "#828282",
        fontFamily: "Alata",
        textAlign: "center",
        fontSize: 20,
        marginBottom: 20


    },
    t2: {
        color: "#828282",
        fontFamily: "Roboto",
        textAlign: "center",
        fontSize: 14,
        marginBottom: 20,
        marginTop: 10
    },
    input: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        borderBottomWidth: 1,
        // borderRadius : 20,
        paddingLeft: scalingfactor * 3,
        borderBottomColor: "#ccc",
        fontSize: scalingfactor * 20, // Responsive font size
        color: "#ccc",
        paddingBottom: scalingfactor * 7,
        width: "92%",
        marginHorizontal: "auto",
        fontFamily: "Alata",
        // lineHeight: scalingfactor * 18,
        marginBottom: scalingfactor * 15,
        // borderRadius : 20
    },
    icons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "85%",
        margin: "auto",
        // marginTop: scalingfactor * 30,
        // position: "absolute",
        // bottom: 40,
        marginTop: 60,
        marginBottom: 40,
        alignSelf: "center",
    }
    ,

    img: {
        margin: "auto",
        width: 113,
        height: 113,
        borderRadius: 100
    },
    certificate: {
        padding: 4,
        paddingTop: 15,
        marginTop: 10,
        margin: "auto",
        width: "92%",
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        position: "relative"
    },
    plus: {
        position: "absolute",
        right: 5,
        top: -5,
        zIndex: 100
    },
    input1: {
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
        marginVertical: 2


    },
    editButtonText: {
        color: "#16181A",
        fontSize: 16,
        fontFamily: "Alata",
        textAlign: "center",
        marginLeft: -1,
        marginTop: -3
    },
    minus: {
        position: "absolute",
        right: 45,
        top: -3,
        zIndex: 100
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
    err101: {
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
    },



})