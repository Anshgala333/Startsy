import { useFocusEffect } from "expo-router"
import { useState, useEffect, useRef, useContext } from "react";
import * as React from "react"
import { SafeAreaView, BackHandler, ScrollView, StatusBar, TouchableOpacity, ActivityIndicator, Animated, Dimensions, Pressable, TextInput, TouchableWithoutFeedback, Image } from "react-native"
import { View, Text, StyleSheet } from "react-native"
import Profile from "../../assets/icons/profile.js"
import Drop from "../dropdown.js"
import Slider from "@react-native-community/slider";
import styles from "../commonstyles.js"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from '@expo/vector-icons/Entypo';
import * as ImagePicker from 'expo-image-picker';
import { GlobalContext } from "../../Global/globalcontext.js";
import { url } from "../../config.js"
import AntDesign from '@expo/vector-icons/AntDesign';




const Editcommunity = ({ navigation }) => {

    useFocusEffect(() => {
        // StatusBar.setBackgroundColor("red")
        // StatusBar.setBarStyle("light-content")
    })
    const [sliderrange1, setsliderrange1] = useState(5)
    const [existingdata, setexistingdata] = useState()
    const [sliderrange, setsliderrange] = useState(5000000)
    const [InstagramUrl, setInstagramUrl] = useState("")
    const [YTURL, setYTURL] = useState("")
    const [LinkedinURl, setLinkedinURl] = useState("")



    const [loading, setloading] = useState(false)
    const [token, settoken] = useState("")



    const [err1, seterr1] = useState(false)
    const [err2, seterr2] = useState(false)
    const [err3, seterr3] = useState(false)
    const [err4, seterr4] = useState(false)
    const [err5, seterr5] = useState(false)
    const [err6, seterr6] = useState(false)
    const [err7, seterr7] = useState(false)


    const [fullName, setfullname] = useState("")
    const [country, setcountry] = React.useState("")
    const [contactInfo, setcontactInfo] = useState("")
    const [role1, setrole] = useState("")
    const [interest, setinterest] = useState("")
    const [preferences, setprefference] = useState("")

    const [tagline, settagline] = useState("")
    const [skills, setskills] = useState("")

    const [education1, seteducation] = useState("")
    const [image, setImage] = useState(null);
    const [certificate, setcertificate] = useState([{ id: Date.now(), cname: '', curl: '' }]);
    const [portfolio1, setportfolio] = useState([{ id: Date.now(), url: '' }]);




    function deletecertificate1(index) {

        console.log(index);

        var new1 = [...certificate];
        new1.splice(index, 1)
        setcertificate(new1)
    }
    function deletecertificate(index) {

        console.log(index);

        var new1 = [...portfolio1];
        new1.splice(index, 1)
        setportfolio(new1)
    }



    const [open1, setOpen1] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [open3, setOpen3] = React.useState(false)
    const [open4, setOpen4] = React.useState(false)
    const [open5, setOpen5] = React.useState(false)

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
            aspect: [4, 3],
            quality: 1,

        });


        if (!result.canceled) {

            const imageUri = result.assets[0].uri;
            setImage(imageUri);


        }

    }



    var stage = [
        { label: "Ideation Stage", value: "Ideation Stage" },
        { label: "Pre-Seed Stage", value: "Pre-Seed Stage" },
        { label: "Seed Stage ", value: "Seed Stage" },
        { label: "Early Stage", value: "Early Stage" },
        { label: "Growth Stage", value: "Growth Stage" },
        { label: "Mature Stage", value: "Mature Stage" },

    ]

    var sectorlist = [
        { label: "Vertical Sector", value: "Vertical Sector" },
        { label: "Horizontal Sector", value: "Horizontal Sector" }
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
            console.log(data);


            setexistingdata(data.data)

            console.log(response.status);

        }
        catch (err) {
            // setloading(false)
            console.log(err);

        }
    }


    useEffect(() => {
        getdata()
    }, [token])



    const handleOutsideTouch = () => {
        if (open1) setOpen1(false);
        if (open2) setOpen2(false);
        if (open3) setOpen3(false);
        if (open4) setOpen3(false);
        if (open5) setOpen5(false);
    };
    const handlerole = (value1) => {
        console.log(value1, "ok");
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


    useEffect(() => {
        console.log("hiii");
        if (existingdata) {

            var socialMediaLinks = existingdata.roleId.hiddenInfo.socialProof
            // console.log(socialMediaLinks);

            // console.log(socialMediaLinks[0]);
            // console.log(socialMediaLinks[1]);
            // console.log(socialMediaLinks[2]);
            console.log(existingdata.roleId.portfolio);
            

            if (socialMediaLinks[0]) {
                setInstagramUrl(socialMediaLinks[0].url);

            }
            if (socialMediaLinks[1]) {
                setLinkedinURl(socialMediaLinks[1].url)

            }
            if (socialMediaLinks[2]) {
                setYTURL(socialMediaLinks[2].url);

            }



            console.log(existingdata.roleId.country);

            setImage(existingdata.profilePhoto)

            setfullname(existingdata.roleId.fullName)
            setcountry(existingdata.roleId.country)
            setcontactInfo(existingdata.roleId.contactInfo)
            setinterest(existingdata.roleId.areaOfInterest)
            setprefference(existingdata.roleId.contentPrefrence)
            setrole(existingdata.roleId.communityMemberRole)
            settagline(existingdata.roleId.tagline)
            setskills(existingdata.roleId.skills)
            seteducation(existingdata.roleId.education)
            var modified = existingdata.roleId.certification.map((e) => {
                return {
                    id: e._id,
                    cname: e.name,
                    curl: e.url
                }
            })
            setcertificate(modified)


            var m1 = existingdata.roleId.portfolio.map((e) => {
                return {
                    id: e._id,
                    url: e.url,
                    name : e.name

                }
            })
            console.log(m1);
            
            setportfolio(m1)


        }
    }, [existingdata])



    async function savedata() {

        setloading(true);
        console.log("save data function");

        const newErrors = {};

        console.log(country, "country");

        let cangoahead = true


        if (fullName == "") {
            console.log("full name nai hai");
            newErrors.fullName = "* Full name is required.";
            cangoahead = false
        }
        // if (country == "") {
        //     console.log("country nai hai");

        //     newErrors.country = "* Please select a country.";
        //     cangoahead = false
        // }
        const numberRegex = /^\d{10}$/;

        if (!contactInfo.trim()) {
            newErrors.number = "* Phone number is required.";
        } else if (!numberRegex.test(contactInfo)) {
            newErrors.number = "* Phone number must be 10 digits.";
        }

        // if (role1 == "") {
        //     newErrors.role1 = "*please select a value";
        //     cangoahead = false
        // }
        // if (interest == "") {
        //     newErrors.role2 = "*please select a value";
        //     cangoahead = false
        // }
        // if (preferences == "") {
        //     newErrors.role3 = "*please select a value";
        //     cangoahead = false
        // }
        // if (education1 == "") {
        //     newErrors.role4 = "*please select a value";
        //     cangoahead = false
        // }

        setErrors(newErrors);

        if (cangoahead == false) {
            console.log("some error");

            setloading(false)
            return

        }



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
                setloading(false)

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
                setloading(false)

                return

            }
        }




        var formData = new FormData()


        var certification = certificate.map(({ id, cname, curl }) => {
            var obj = { name: cname, url: curl }
            return obj

        })


        // var portfolio = portfolio1.map(({ id, url }) => {
        //     return {
        //         name: "",
        //         url: url
        //     }

        // })

        var portfolio = portfolio1.map(({ id, url, name }) => {
            return { url, name }
        })




        formData.append("certification", JSON.stringify(certification));
        formData.append("portfolio", JSON.stringify(portfolio));
        formData.append("fullName", fullName);
        formData.append("country", country);
        formData.append("contactInfo", contactInfo);
        formData.append("communityMemberRole", role1);
        formData.append("areaOfInterest", interest);
        formData.append("contentPrefrence", preferences);
        formData.append("tagline", tagline);
        formData.append("skills", skills);
        formData.append("education", education1);



        if (image && image != "") {
            formData.append("profilePhoto", {
                uri: image,
                type: "image/jpeg",
                name: `image_${Date.now()}.jpg`,
            });
        }



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


        formData.append("socialProof", JSON.stringify(array))

        console.log("okkkkkkkkkkkkkkkkkkkhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");


        console.log(formData);
        console.log(formData);
        console.log(formData);
        console.log(formData);
        console.log(formData);
        console.log(formData);
        console.log(formData);
        console.log(formData);
        try {
            console.log("hi");

            const response = await fetch(`${url}communityMember/editCommunityMemberAccountProfileDetails`, {
                method: 'POST',
                body: formData,
                headers: {
                    accept: "application/json",
                    "Authorization": token,
                },
            });
            const data = await response.json();
            setloading(false)
            console.log(data, "okkkkk");
            if (response.status == 200) {
                navigation.goBack();
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

    var role = [
        { label: "Learner", value: "Learner" },
        { label: "Job seeker", value: "Job seeker" },
        { label: "Startup Enthusiast", value: "Startup Enthusiast" },
        { label: "Mentor", value: "Mentor" },
        { label: "Networker", value: "Networker" },
        { label: "Contributor", value: "Contributor" },

    ]

    var a1 = [
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


    var contentPreferences = [
        { label: "Startup News", value: "Startup News" },
        { label: "Job Postings", value: "Job Postings" },
        { label: "Educational Content", value: "Educational Content" },
    ]

    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181A")
        StatusBar.setBarStyle("light-content")
    })

    const handlerole1 = (value1) => {
        // console.log("Selected Value:", value1); // Optional: Log the selected value
        setrole(value1); // Update state with the selected value
    };
    const handleinterest = (value1) => {
        console.log("Selected Value:", value1); // Optional: Log the selected value
        setinterest(value1); // Update state with the selected value
    };
    const handleprefference = (value1) => {
        // console.log("Selected Value:", value1); // Optional: Log the selected value
        setprefference(value1); // Update state with the selected value
    };


    function addcertificate() {
        setcertificate(
            [...certificate, { id: Date.now(), cname: '', curl: '' }]
        )
    }

    function addportfolio() {
        setportfolio(
            [...portfolio1, { id: Date.now(), url: "" }]
        )
    }


    function handlecertificatechange(id, field, value) {
        var array = certificate.map((e) => {

            if (e.id === id) {
                return { ...e, [field]: value, firsterror: false, seconderror: false }

            }
            else return e
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




    var education = [
        { label: "10th", value: "10TH" },
        { label: "12th", value: "12th" },
        { label: "Graduate", value: "Graduate" },
        { label: "Post-Graduate", value: "Post-Graduate" },
        { label: "P.H.D", value: "P.H.D" },


    ]

    function deleteportfolio(index) {
        // setportfolio(
        //     [...portfolio1, { id: Date.now(), url: "", name: "" }]
        // )

        var array = portfolio1.splice(index, 1)
        setportfolio(array);
    }
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: "#16181a" }}>
            <ScrollView style={{ flex: 1 }}>
                <Animated.View style={styles1.header}>
                    <Text allowFontScaling={false} style={styles1.headertext}>Profile</Text>
                </Animated.View>

                <TouchableWithoutFeedback onPress={handleOutsideTouch}>
                    <View style={{ width: width * 0.98, margin: "auto" }}>
                        <Text style={styles1.edit}>Edit Profile</Text>
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
                            placeholderTextColor="#B8B8B8"
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

                        <Drop bl={0} bt={0} borderwidth={0} bb={1} pccolor={"#B8B8B8"}
                            items={country1} placeholder={country} width={"94%"} onValueChange={handlerole} open={open1} setOpen={t1} extra={true} edit />
                        {errors.country && <Text style={styles1.errnew}>{errors.country}</Text>}

                        <TextInput
                            allowFontScaling={false}
                            placeholder="Phone number"
                            placeholderTextColor="#B8B8B8"
                            style={[styles1.input, { marginTop: 28 }]}
                            value={contactInfo}
                            onChangeText={(text) => { setcontactInfo(text) }}
                        />
                        {/* {err3 && <Text style={styles1.err}>* please enter valid number</Text>} */}
                        {errors.number && <Text style={styles1.err}>{errors.number}</Text>}





                        <View style={{ width: width * 0.95, margin: "auto" }}>

                            {/* <Text allowFontScaling={false} style={styles.t1}>Community Participation</Text> */}
                            {/* <Text allowFontScaling={false} style={styles.t2}>Specify your role within the community to help tailor your experience.</Text> */}
                            {/* <TouchableWithoutFeedback onPress={handleOutsideTouch}>  */}
                            {/* <Drop width={"96%"}   borderwidth={0} bb={1} pccolor={"#B8B8B8"}
                             items={role} placeholder={role1} onValueChange={handlerole1} open={open4} setOpen={t4} /> */}
                            {/* </TouchableWithoutFeedback> */}
                            {errors.role1 && <Text style={styles1.errnew}>{errors.role1}</Text>}



                            <Text allowFontScaling={false} style={[styles.t1, { marginTop: scalingfactor * 18 }]}>Area of Interest</Text>
                            <Text allowFontScaling={false} style={styles.t2}>Indicate the specific fields or topics you are passionate about within the startup ecosystem.</Text>
                            <Drop width={"96%"} borderwidth={0} bb={1} pccolor={"#B8B8B8"}
                                items={a1} placeholder={interest} onValueChange={handleinterest} open={open2} setOpen={t2} />
                            {errors.role2 && <Text style={styles1.errnew}>{errors.role2}</Text>}


                            {/* <Text allowFontScaling={false} style={[styles.t1, { marginTop: scalingfactor * 18 }]}>Content Preference</Text> */}
                            {/* <Text allowFontScaling={false} style={styles.t2}>Choose the types of content you want to see most in your feed.</Text> */}
                            {/* <Drop width={"96%"}   borderwidth={0} bb={1} pccolor={"#B8B8B8"}
                             items={contentPreferences} placeholder={preferences} onValueChange={handleprefference} open={open3} setOpen={t3} /> */}
                            {errors.role3 && <Text style={styles1.errnew}>{errors.role3}</Text>}



                            <Text style={[styles.t1, { marginTop: 20 }]}>Bio</Text>
                            <Text style={styles.t2}>A brief introduction where you can describe yourself, your background, interests, and what you’re looking for on Startsy</Text>
                            <TextInput
                                allowFontScaling={false}
                                placeholder="Bio"
                                placeholderTextColor="#B8B8B8"
                                style={styles1.input}
                                value={tagline}
                                onChangeText={(text) => { settagline(text) }}
                            />
                            <Text style={[styles.t1, { marginBottom: 5 }]}>Skills</Text>
                            <Text style={styles.t2}>Showcase key abilities and expertise, helping other users highlight what you bring to the startup ecosystem—whether it's technical skills, business acumen, or industry knowledge.</Text>

                            <TextInput
                                allowFontScaling={false}
                                placeholder="Write any Top 3"
                                placeholderTextColor="#B8B8B8"
                                style={styles1.input}
                                value={skills}
                                onChangeText={(text) => { setskills(text) }}
                            />

                            <Text style={styles.t1}>Education</Text>
                            <Text style={[styles.t2, { marginBottom: 20 }]}>List your highest degree achieved, which helps to establish your academic background and qualifications.</Text>
                            <Drop width={"96%"} borderwidth={0} bb={1} pccolor={"#B8B8B8"}
                                items={education} placeholder={education1} open={open5} setOpen={setOpen5} onValueChange={(value) => { seteducation(value) }} nestedScrollEnabled={true} />
                            {/* </ScrollView> */}
                            {errors.role4 && <Text style={styles1.errnew}>{errors.role4}</Text>}


                            <Text style={[styles.t1, { marginTop: 15 }]}>Certification</Text>
                            {certificate.map((certificate, index) => (
                                <View key={certificate.id} style={styles1.certificate}>
                                    <Pressable onPress={addcertificate}>
                                        <Entypo style={styles1.plus} name="plus" size={24} color="#00DE62" />
                                    </Pressable>

                                    {index > 0 && <Pressable onPress={() => { deletecertificate1(index) }}>
                                        <FontAwesome6 name="trash" style={styles1.minus} size={15} color="#00DE62" />
                                    </Pressable>}

                                    <TextInput
                                        allowFontScaling={false}
                                        placeholder="Certification name"
                                        placeholderTextColor="#B8B8B8"
                                        style={[styles1.input, { marginTop: 20, backgroundColor: "transparent" }]}
                                        value={certificate.cname}
                                        onChangeText={(text) => { handlecertificatechange(certificate.id, "cname", text) }}
                                    />
                                    {certificate.firsterror && <Text style={styles1.cerror}>* please enter this field</Text>}

                                    <TextInput
                                        allowFontScaling={false}
                                        placeholder="URL"
                                        placeholderTextColor="#B8B8B8"
                                        style={styles1.input}
                                        value={certificate.curl}
                                        onChangeText={(text) => { handlecertificatechange(certificate.id, "curl", text) }}
                                    />
                                    {certificate.seconderror && <Text style={styles1.cerror}>* please enter this field</Text>}




                                </View>
                            ))}


                            <Text style={[styles.t1, { marginTop: 30 }]}>Portfolio</Text>
                            {/* {portfolio1.map((items, index) => (
                                <View style={styles1.v1} key={items.id}>
                                    <Pressable onPress={addportfolio}>
                                        <Entypo style={styles1.plus1} name="plus" size={24} color="#00DE62" />
                                    </Pressable>


                                    {index > 0 && <Pressable onPress={() => { deletecertificate(index) }}>
                                        <FontAwesome6 name="trash" style={styles1.minus} size={15} color="#00DE62" />
                                    </Pressable>}

                                    <TextInput
                                        allowFontScaling={false}
                                        placeholder="URL"
                                        value={items.url}
                                        placeholderTextColor="#B8B8B8"
                                        style={[styles1.input1, styles1.small]}
                                        onChangeText={(text) => { handleurlchange(items.id, "url", text) }}

                                    />

                                </View>
                            ))} */}


                            {portfolio1.map((items, index) => (
                                <View style={styles1.certificate} key={items.id}>
                                    <Pressable onPress={addportfolio}>
                                        <Entypo style={styles1.plus} name="plus" size={24} color="#00DE62" />
                                    </Pressable>
                                    {index > 0 && <Pressable onPress={() => { deleteportfolio(index) }}>
                                        <FontAwesome6 name="trash" style={styles1.minus} size={15} color="#00DE62" />
                                    </Pressable>}
                                    <TextInput
                                        allowFontScaling={false}
                                        placeholder="URL"
                                        value={items.url}
                                        // value={items.name}
                                        placeholderTextColor="#B8B8B8"
                                        style={[styles1.input, { marginTop: 20, backgroundColor: "transparent"  }]}
                                        onChangeText={(text) => { handleurlchange(items.id, "url", text) }}

                                    />
                                    {items.seconderror && <Text style={styles.err}>* please enter this field</Text>}
                                    <TextInput
                                        allowFontScaling={false}
                                        placeholder="Portfolio name"
                                        value={items.name}
                                        placeholderTextColor="#B8B8B8"
                                        style={styles1.input}
                                        onChangeText={(text) => { handleurlchange(items.id, "name", text) }}

                                    />
                                    {items.firsterror && <Text style={styles.err}>* please enter this field</Text>}

                                </View>
                            ))}


                            <Text allowFontScaling={false} style={[styles.t1, { marginTop: 10 }]}>Instagram</Text>

                            <View style={styles1.v1} >
                                {/* <Pressable onPress={addurl}> */}
                                <AntDesign name="instagram" style={styles1.plusss} size={24} color="#bbbbbb" />
                                {/* <Entypo style={styles.plus1} name="plus" size={24} color="#00DE62" /> */}
                                {/* </Pressable> */}

                                <TextInput

                                    allowFontScaling={false}
                                    placeholder="URL"
                                    numberOfLines={1}
                                    placeholderTextColor="#B8B8B8"
                                    style={styles1.inputss}
                                    value={InstagramUrl}
                                    onChangeText={(text) => { setInstagramUrl(text) }}
                                />
                            </View>
                            <Text allowFontScaling={false} style={[styles.t1, { marginTop: 15 }]}>YouTube</Text>

                            <View style={styles1.v1} >
                                {/* <Pressable onPress={addurl}> */}
                                {/* <Feather name="youtube" style={styles.plus1} size={24} color="#bbbbbb" /> */}
                                <AntDesign name="youtube" style={styles1.plusss} size={24} color="#bbbbbb" />
                                {/* <Entypo style={styles.plus1} name="plus" size={24} color="#00DE62" /> */}
                                {/* </Pressable> */}

                                <TextInput

                                    allowFontScaling={false}
                                    placeholder="URL"
                                    numberOfLines={1}
                                    placeholderTextColor="#B8B8B8"
                                    style={styles1.inputss}
                                    value={YTURL}
                                    onChangeText={(text) => { setYTURL(text) }}
                                />
                            </View>
                            <Text allowFontScaling={false} style={[styles.t1, { marginTop: 10 }]}>LinkedIn</Text>

                            <View style={styles1.v1} >
                                {/* <Pressable onPress={addurl}> */}
                                <AntDesign name="linkedin-square" style={styles1.plusss} size={24} color="#bbbbbb" />
                                {/* <Entypo style={styles.plus1} name="plus" size={24} color="#00DE62" /> */}
                                {/* </Pressable> */}

                                <TextInput

                                    allowFontScaling={false}
                                    placeholder="URL"
                                    numberOfLines={1}
                                    placeholderTextColor="#B8B8B8"
                                    style={styles1.inputss}
                                    value={LinkedinURl}
                                    onChangeText={(text) => { setLinkedinURl(text) }}
                                />
                            </View>




                        </View>






                        <View onTouchStart={handleOutsideTouch} s style={styles1.icons}>
                            <Pressable onPress={() => { navigation.goBack() }} style={{ alignSelf: "center" }}><FontAwesome6 name="chevron-left" size={40} color="#00DF60" /></Pressable>
                            <Pressable onPress={savedata} style={styles1.btn}>
                                {loading && <ActivityIndicator size={24} color="#16181a" />}
                                {!loading && <Text allowFontScaling={false} style={styles1.nexttext}>Save</Text>}
                            </Pressable>
                        </View>

                    </View>
                </TouchableWithoutFeedback>

            </ScrollView>
        </SafeAreaView>

    )
}

export default Editcommunity


const { height, width } = Dimensions.get("window");


var a = width / 360;
var b = height / 800;
// console.log(a,b);

const scalingfactor = Math.sqrt(a * b)
const styles1 = StyleSheet.create({
    header: {
        height: 55,
        textAlign: "left",
        backgroundColor: "#16181a",
        // backgroundColor : "transparent",
        // position : "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        // backgroundColor : "red",


    },
    headertext: {
        color: "#00DE62",
        fontSize: scalingfactor * 35,
        fontFamily: "myanmar",
        fontWeight: "bold",
        paddingTop: 5,
        paddingHorizontal: 20,
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
        // fontFamily: "Roboto",
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
        paddingLeft: scalingfactor * 0,
        borderBottomColor: "gray",
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
    input1: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        // marginTop: 40,
        // borderBottomWidth: 1,
        // borderRadius : 20,
        // paddingLeft: scalingfactor * 10,
        borderBottomColor: "#ccc",
        fontSize: scalingfactor * 20, // Responsive font size
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 7,
        width: "75%",
        // marginHorizontal: "auto",
        // fontFamily: "Roboto",
        // lineHeight: scalingfactor * 18,
        marginBottom: scalingfactor * 15,
        // backgroundColor : "red"
        // borderRadius : 20
    },

    small: {
        // backgroundColor : "red",
        width: "75%",
        marginLeft: 10

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
        fontSize: scalingfactor * 24,
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

    certificate: {
        padding: 4,
        paddingTop: 15,
        paddingBottom: 10,
        marginTop: 20,
        margin: "auto",
        width: "92%",
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#AEAFAF",
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
        top: 20,
        zIndex: 100
    },
    plusss: {
        position: "absolute",
        left: 10,
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
        marginTop: 10
    },

    minus1: {
        position: "absolute",
        right: 45,
        top: 6,
        zIndex: 100
    },

    minus: {
        position: "absolute",
        right: 45,
        top: 0,
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
    cerror: {
        marginVertical: 0,
        marginTop: -8,
        marginBottom: 10,
        textAlign: "left",
        // backgroundColor : "red",
        width: "90%",
        marginHorizontal: "auto",
        color: "#E65858",
        fontSize: 12,
        // fontFamily: "Roboto",
    },

    inputss: {
        margin: height * 0.016,
        marginTop: 0,
        paddingLeft: 20,


        fontSize: scalingfactor * 20,
        color: "#B8B8B8",
        // paddingBottom: scalingfactor * 0,
        width: "90%",
        marginLeft: 0,
        paddingLeft: 50,
        borderBottomColor: "red",
        borderwidth: 10

    },
    certificate : {
        padding: 4,
        paddingTop: 15,
        marginTop: 10,
        margin: "auto",
        width: "92%",
        backgroundColor: "transparent",
        borderWidth: 3,
        borderColor: "#666",
        borderRadius: 10,
        position: "relative"
    }



})