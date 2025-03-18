import { useFocusEffect } from "expo-router"
import { useState, useEffect, useRef, useContext, useCallback } from "react";
import * as React from "react"
import { SafeAreaView, ScrollView, ActivityIndicator, StatusBar, Animated, Dimensions, Pressable, TextInput, TouchableWithoutFeedback, Image } from "react-native"
import { View, Text, StyleSheet } from "react-native"
import Profile from "../../assets/icons/profile.js"
import Drop from "../../SCREENS/dropdown.js"
import Slider from "@react-native-community/slider";
import styles from "../commonstyles.js"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from '@expo/vector-icons/Entypo';
import { url as url1 } from "../../config.js"

import AntDesign from '@expo/vector-icons/AntDesign';


import * as ImagePicker from 'expo-image-picker';
import { GlobalContext } from "@/Global/globalcontext.js";


const Founder2 = ({ navigation, route }) => {

    const [token, settoken] = useState("")


    console.log(url1, "route ka url");

    const { globaldata, updateField } = useContext(GlobalContext);

    useEffect(() => {
        console.log(globaldata, "global data");
        settoken(globaldata.token)
    }, [])

    const { form, image, existingdata } = route.params;
    const final = new FormData();


    for (var items of form["_parts"]) {
        if (items[0] == "fullname" || items[0] == "password") continue;
        final.append(items[0], items[1]);
    }


    const [sliderrange, setsliderrange] = useState(5000000)
    const [nameOfStartup, setNameOfStartup] = useState('');
    const [goal, setGoal] = useState('');
    const [description, setDescription] = useState('');
    const [teamInfo, setTeamInfo] = useState('');
    const [sector, setSector] = useState('');
    const [fundingStatus, setFundingStatus] = useState('');
    const [stageOfStartup, setStageOfStartup] = useState('');
    const [socialProof, setSocialProof] = useState('');


    const [open1, setOpen1] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [open3, setOpen3] = React.useState(false)
    const [open4, setOpen4] = React.useState(false)




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

    var country1 = [
        { label: "10th", value: "10TH" },
        { label: "12th", value: "12th" },
        { label: "Graduate", value: "Graduate" },
        { label: "Post-Graduate", value: "Post-Graduate" },
        { label: "P.H.D", value: "P.H.D" },


    ]

    function deletecertificate(index) {

        console.log(index);

        var new1 = [...teammember];
        new1.splice(index, 1)
        setteammember(new1)
    }

    function deletecertificate1(index) {

        console.log(index);

        var new1 = [...url];
        new1.splice(index, 1)
        seturl(new1)
    }

    const handleOutsideTouch = () => {
        if (open1) setOpen1(false);
        if (open2) setOpen2(false);
        if (open3) setOpen3(false);
        if (open4) setOpen3(false);
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


    const [loading, setloading] = useState(false)

    // multiple certificate 
    const [teammember, setteammember] = useState([{ id: Date.now(), username: '', name: '', role: "" }]);


    function addteammember() {
        setteammember(
            [...teammember, { id: Date.now(), username: '', name: '', role: '' }]
        )
    }


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


    const [errors, setErrors] = useState({}); // Error state


    async function savedata() {



        const newErrors = {};
        let cangoahead = true


        if (nameOfStartup == "") {
            newErrors.fullName = "* Startup name is required.";
            cangoahead = false
        }

        if (goal == "") {
            newErrors.goal = "*please enter goal";
            cangoahead = false
        }
        if (sector == "") {
            newErrors.sector = "*please select a value";
            cangoahead = false
        }
        if (stageOfStartup == "") {
            newErrors.stage = "*please select a value";
            cangoahead = false
        }




        setErrors(newErrors);

        if (cangoahead == false) {
            console.log("some error");

            setloading(false)
            return

        }


        for (var i = 0; i < teammember.length; i++) {
            console.log(i);

            var member = teammember[i];
            console.log(member);

            // Check if all fields are empty
            if (member.username === "" && member.name === "" && member.role === "") {
                // Do nothing or handle as needed
                console.log("All fields are empty for member at index", i);
                continue;
            }

            // Check if only `username` is filled
            if (member.username !== "" && member.name === "" && member.role === "") {
                var updatedTeam = teammember.map((t, index) => {
                    if (i === index) {
                        return { ...t, nameError: true, roleError: true };
                    } else return t;
                });
                console.log(updatedTeam, "Name and Role are missing");
                setteammember(updatedTeam);
                return;
            }

            // Check if only `name` is filled
            if (member.username === "" && member.name !== "" && member.role === "") {
                var updatedTeam = teammember.map((t, index) => {
                    if (i === index) {
                        return { ...t, usernameError: true, roleError: true };
                    } else return t;
                });
                console.log(updatedTeam, "Username and Role are missing");
                setteammember(updatedTeam);
                return;
            }

            // Check if only `role` is filled
            if (member.username === "" && member.name === "" && member.role !== "") {
                var updatedTeam = teammember.map((t, index) => {
                    if (i === index) {
                        return { ...t, usernameError: true, nameError: true };
                    } else return t;
                });
                console.log(updatedTeam, "Username and Name are missing");
                setteammember(updatedTeam);
                return;
            }

            // Check if any single field is missing
            if (member.username === "" || member.name === "" || member.role === "") {
                var updatedTeam = teammember.map((t, index) => {
                    if (i === index) {
                        return {
                            ...t,
                            usernameError: member.username === "",
                            nameError: member.name === "",
                            roleError: member.role === "",
                        };
                    } else return t;
                });
                console.log(updatedTeam, "Some fields are missing");
                setteammember(updatedTeam);
                return;
            }
        }



        var tosend;
        if (sliderrange > 1000000) {
            tosend = sliderrange.toString().substring(0, 2)
        }
        else if (sliderrange < 1000000) {
            tosend = sliderrange.toString()[0]

        }

        tosend = +tosend + 58;
        if (sliderrange == 0) {
            tosend = 69
        }
        console.log(tosend.toString(), "to send");
        final.append("fundingStatus", tosend)
        final.append("nameOfStartup", nameOfStartup)
        final.append("goal", goal)
        final.append("description", description)
        final.append("sector", sector)
        final.append("stageOfStartup", stageOfStartup)
        // final.append("fundingStatus", sliderrange)

        console.log('====================================');
        console.log(sliderrange , "tarrif");
        console.log('====================================');




        var array = teammember.map(({ id, username, ...rest }) => {
            return {
                ...rest,
                tag: username
            }

        })

        final.append("teamInfo", JSON.stringify(array));

        // var array = url.map(e => e.url)
        // final.append("socialProof", JSON.stringify(array));
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
        final.append("socialProof", JSON.stringify(array));
        if (image && image != "") {
            final.append("profilePhoto", {
                uri: image,
                type: "image/jpeg",
                name: `image_${Date.now()}.jpg`,
            });
        }


        console.log('====================================');
        console.log(final);
        console.log('====================================');
        setloading(true);


        console.log(`${url}founder/editFounderAccountProfileDetails`);
        try {


            const response = await fetch(`${url1}founder/editFounderAccountProfileDetails`, {
                method: 'POST',
                body: final,
                headers: {
                    accept: "application/json",
                    "Authorization": token,
                },
            });
            const data = await response.json();
            if (response.status == 200) {
                navigation.navigate("Main2")
            }
            else if (response.status == 555) {
                for (items of data.invalidTeamMates) {
                    teammember[items].tagerror = true;
                    setteammember(teammember)
                }

            }
            console.log('====================================');
            console.log(data);
            console.log('====================================');

        }
        catch (err) {
            console.log(err);

        }
        finally {
            setloading(false)
        }

    }


    function handleworkchange(id, field, value) {
        var array = teammember.map((e) => {
            if (e.id === id) {
                return { ...e, [field]: value }

            }
            else return e
        })
        setteammember(array);
    }
    const [textlength, settextlength] = useState(0);
    function counttext(text) {

        settextlength(text.length)

    }


    var stage = [
        { label: "Ideation Stage", value: "Ideation Stage" },
        { label: "Pre-Seed Stage", value: "Pre-Seed Stage" },
        { label: "Seed Stage ", value: "Seed Stage" },
        { label: "Early Stage", value: "Early Stage" },
        { label: "Growth Stage", value: "Growth Stage" },
        { label: "Expansion Stage", value: "Mature Stage" },

    ]


    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181A")
        StatusBar.setBarStyle("light-content")
    })
    const [InstagramUrl, setInstagramUrl] = useState("")
    const [YTURL, setYTURL] = useState("")
    const [LinkedinURl, setLinkedinURl] = useState("")

    // const h1 = useCallback((value) => {
    //     setsliderrange(value);
    // }, []);
    const sliderRef = useRef(null);

    const h1 = (value) => {
        if (sliderRef.current) {
            clearTimeout(sliderRef.current);
        }
        sliderRef.current = setTimeout(() => {
            setsliderrange(value);
        }, 100);
    };

    useEffect(() => {
        console.log("hiii");
        if (existingdata) {

            console.log(existingdata);
            console.log(existingdata.roleId.hiddenInfo.socialProof[0].url);
            console.log(existingdata.roleId.hiddenInfo.socialProof[1].url);
            console.log(existingdata.roleId.hiddenInfo.socialProof[2].url);
            

            // console.log(existingdata.roleId.hiddenInfo.sector);
            // console.log(existingdata.roleId.hiddenInfo.stageOfStartup);
            console.log(+existingdata.roleId.hiddenInfo.fundingStatus , "bllll");


            if (existingdata.roleId.hiddenInfo.socialProof) {
                // setLinkedinURl(existingdata.roleId.hiddenInfo.socialProof["name"] )
            }

            // setImage(existingdata.profilePhoto)

            setNameOfStartup(existingdata.roleId.nameOfStartup)
            setGoal(existingdata.roleId.goal)
            setDescription(existingdata.roleId.description)
            counttext(existingdata.roleId.description)
            setSector(existingdata.roleId.hiddenInfo.sector)
            setStageOfStartup(existingdata.roleId.hiddenInfo.stageOfStartup)

            setInstagramUrl(existingdata.roleId.hiddenInfo.socialProof[0].url)
            setLinkedinURl(existingdata.roleId.hiddenInfo.socialProof[1].url)
            setYTURL(existingdata.roleId.hiddenInfo.socialProof[2].url)
            function getfund(fund) {
                fund = Number(fund);
                console.log(fund);
                

                if (fund == 69) {
                    return 0
                }
                fund = fund - 57
                // console.log(fund * 10000000);
                return (fund * 1000000)

                


                // (+userdata.hiddenInfo.fundingStatus).toLocaleString("en-IN")

            }
            // getfund(63)
            setsliderrange(getfund(existingdata.roleId.hiddenInfo.fundingStatus))
            // setskills(existingdata.roleId.skills)

            // setcertificate(modified)


            // setportfolio(m1)


        }
    }, [existingdata])
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: "#16181a" }}>
            <ScrollView style={{ flex: 1 }}>
                <Animated.View style={styles1.header}>
                    <Text allowFontScaling={false} style={styles1.headertext}>Profile</Text>
                </Animated.View>
                <View style={{ width: width * 0.98, margin: "auto" }}>
                    {/* <Text style={styles1.edit}>Edit Profile</Text> */}

                    <Text allowFontScaling={false} style={[styles.t1, { marginTop: 15, marginBottom: 0, paddingLeft: 12 }]}>About Startup/Organisation</Text>



                    <TextInput
                        onTouchStart={handleOutsideTouch}
                        allowFontScaling={false}
                        placeholder="Name"
                        placeholderTextColor="#B8B8B8"
                        style={styles1.input}
                        value={nameOfStartup}
                        onChangeText={(text) => { setNameOfStartup(text) }}
                    />
                    {errors.fullName && <Text style={styles1.err}>{errors.fullName}</Text>}

                    <TextInput
                        allowFontScaling={false}
                        placeholder="Goal"
                        placeholderTextColor="#B8B8B8"
                        style={[styles1.input, { marginBottom: 20 }]}
                        value={goal}
                        onChangeText={(text) => { setGoal(text) }}
                    />
                    {errors.goal && <Text style={styles1.err}>{errors.goal}</Text>}


                    <Text allowFontScaling={false} style={styles1.des}>Description:</Text>

                    <View style={{ position: "relative" }}>
                        <Text style={[styles1.t22, styles1.count]}>{textlength}/1000</Text>
                        <TextInput
                            allowFontScaling={false}
                            placeholder=""
                            placeholderTextColor="#B8B8B8"
                            style={styles1.input11}
                            maxLength={1000}
                            multiline={true}
                            value={description}
                            onFocus={handleOutsideTouch}
                            onPress={handleOutsideTouch}
                            // value={username}
                            onChangeText={(text) => {
                                setDescription(text)
                                counttext(text)
                            }}
                        />
                    </View>











                    <View style={{ width: width * 0.95, margin: "auto" }}>


                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t1, { marginTop: 25, marginBottom: 10, paddingLeft: 7 }]}>Startup sector  </Text>
                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t2, { marginBottom: 15 }]}>List your highest degree achieved, which helps to establish your academic background and qualifications. </Text>
                        <Drop borderwidth={0} bb={1} pccolor={"#B8B8B8"}  width={"88%"} placeholder={sector} width1={"86%"} items={areaofinterestlist} onValueChange={(value) => { setSector(value) }} setOpen={t2} open={open2} nestedScrollEnabled={true} />
                        {errors.sector && <Text style={styles1.errnew}>{errors.sector}</Text>}


                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t1, { marginBottom: 10, marginTop: 25, paddingLeft: 7 }]}>Startup stage  </Text>
                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t2, { marginBottom: 15 }]}>Detail any relevant industry experience, particularly if you’ve worked in a specific company or held roles that have prepared you for your current venture.</Text>
                        <Drop borderwidth={0} bb={1} pccolor={"#B8B8B8"}  width={"88%"} placeholder={stageOfStartup} width1={"86%"} items={stage} onValueChange={(value) => setStageOfStartup(value)} open={open1} setOpen={t1} />
                        {errors.stage && <Text style={styles1.errnew}>{errors.stage}</Text>}


                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t1, { marginBottom: 10, marginTop: 25, paddingLeft: 7 }]}>Funding Status</Text>
                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t2, { marginBottom: 15 }]}>Indicate the amount of funding your startup has received so far. This information will only be visible to verified investors and helps them assess your startup's financial backing and growth potential.</Text>

                        <Pressable onPress={() => { handleOutsideTouch() }} style={[styles.btn1, { backgroundColor: "#24272A", marginBottom: 10, width: 220, height: 52 }]}>
                            <Text allowFontScaling={false} style={styles.nexttext}>{sliderrange.toLocaleString("en-IN")}</Text>
                        </Pressable>

                        {/* slider */}
                        <View style={[styles.box, { left: 20 }]}></View>
                        <View style={[styles.box1, { left: "95%" }]}></View>
                        <Slider onTouchStart={handleOutsideTouch} s
                            // style={styles.sliderbox}
                            style={{ marginTop: -7, width: "90%", margin: "auto" }}
                            minimumValue={0}
                            maximumValue={10000000}
                            value={sliderrange}
                            step={1000}
                            minimumTrackTintColor="#00DE62"
                            maximumTrackTintColor="#00DE62"
                            // step={100}
                            // thumbTintColor="#737373" // Color of the slider thumb
                            // trackImage={require("../assets/images/slider.png")}
                            // trackImage={require("../assets/images/slider3.png")}
                            thumbImage={require("../../assets/images/slider3.png")}
                            // onValueChange={(value) => { setsliderrange(value) }}
                            onValueChange={h1}
                            hitSlop={{ top: 50, left: 50, right: 50, bottom: 50 }}
                            thumbTouchSize={{ width: 100, height: 100 }}
                        />

                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t1, { marginBottom: 10, marginTop: 35, paddingLeft: 0 }]}>Social proof</Text>
                        {/* {url.map((items, index) =>

                            <View style={styles1.v1} key={items.id}>
                                <Pressable onPress={addurl}>
                                    <Entypo style={styles1.plus1} name="plus" size={24} color="#00DE62" />
                                </Pressable>


                                {index > 0 && <Pressable onPress={() => { deletecertificate1(index) }}>
                                    <FontAwesome6 name="trash" style={styles1.minus1} size={15} color="#00DE62" />
                                </Pressable>}
                                <TextInput

                                    allowFontScaling={false}
                                    placeholder="URL"
                                    placeholderTextColor="#B8B8B8"
                                    style={styles1.input101}
                                    value={items.url}
                                    onChangeText={(text) => { handleurlchange(items.id, "url", text) }}
                                />
                            </View>

                        )} */}


                        <Text allowFontScaling={false} style={[styles.t1, { marginBottom: 0 }]}>Instagram</Text>

                        <View style={styles1.v1} >
                            <Pressable onPress={addurl}>
                                <AntDesign name="instagram" style={styles1.plus1} size={24} color="#bbbbbb" />
                                {/* <Entypo style={styles.plus1} name="plus" size={24} color="#00DE62" /> */}
                            </Pressable>

                            <TextInput

                                allowFontScaling={false}
                                placeholder="URL"
                                numberOfLines={1}
                                placeholderTextColor="#B8B8B8"
                                style={styles1.inputf}
                                value={InstagramUrl}
                                onChangeText={(text) => { setInstagramUrl(text) }}
                            />
                        </View>
                        <Text allowFontScaling={false} style={[styles.t1, { marginBottom: 0 }]}>YouTube</Text>

                        <View style={styles1.v1} >
                            <Pressable onPress={addurl}>
                                {/* <Feather name="youtube" style={styles.plus1} size={24} color="#bbbbbb" /> */}
                                <AntDesign name="youtube" style={styles1.plus1} size={24} color="#bbbbbb" />
                                {/* <Entypo style={styles.plus1} name="plus" size={24} color="#00DE62" /> */}
                            </Pressable>

                            <TextInput

                                allowFontScaling={false}
                                placeholder="URL"
                                numberOfLines={1}
                                placeholderTextColor="#B8B8B8"
                                style={styles1.inputf}
                                value={YTURL}
                                onChangeText={(text) => { setYTURL(text) }}
                            />
                        </View>
                        <Text allowFontScaling={false} style={[styles.t1, { marginBottom: 0 }]}>LinkedIn</Text>

                        <View style={styles1.v1} >
                            <Pressable onPress={addurl}>
                                <AntDesign name="linkedin-square" style={styles1.plus1} size={24} color="#bbbbbb" />
                                {/* <Entypo style={styles.plus1} name="plus" size={24} color="#00DE62" /> */}
                            </Pressable>

                            <TextInput

                                allowFontScaling={false}
                                placeholder="URL"
                                numberOfLines={1}
                                placeholderTextColor="#B8B8B8"
                                style={styles1.inputf}
                                value={LinkedinURl}
                                onChangeText={(text) => { setLinkedinURl(text) }}
                            />
                        </View>

                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t1, { marginBottom: 10, marginTop: 35, paddingLeft: 10 }]}>Team Information</Text>


                        {teammember.map((we, index) => (
                            <View key={we.id} style={styles1.certificate}>
                                <Pressable onPress={addteammember}>
                                    <Entypo style={styles1.plus} name="plus" size={24} color="#00DE62" />
                                </Pressable>

                                {index > 0 && <Pressable onPress={() => { deletecertificate(index) }}>
                                    <FontAwesome6 name="trash" style={styles1.minus} size={15} color="#00DE62" />
                                </Pressable>}

                                <TextInput
                                    allowFontScaling={false}
                                    placeholder="@Username"
                                    placeholderTextColor="#B8B8B8"
                                    style={[styles1.input1, { marginTop: 20, backgroundColor: "transparent" }]}
                                    value={we.username}
                                    onChangeText={(text) => { handleworkchange(we.id, "username", text) }}
                                />
                                {we.usernameError && <Text style={styles1.err}>please enter a valid username</Text>}
                                {we.tagerror && <Text style={styles1.err}>* user not found</Text>}
                                <TextInput
                                    allowFontScaling={false}
                                    placeholder="Name"
                                    placeholderTextColor="#B8B8B8"
                                    style={styles1.input1}
                                    value={we.name}
                                    onChangeText={(text) => { handleworkchange(we.id, "name", text) }}
                                />
                                {we.nameError && <Text style={styles1.err}>* please enter name</Text>}

                                <TextInput
                                    allowFontScaling={false}
                                    placeholder="Role"
                                    placeholderTextColor="#B8B8B8"
                                    style={styles1.input1}
                                    value={we.role}
                                    onChangeText={(text) => { handleworkchange(we.id, "role", text) }}
                                />
                                {we.roleError && <Text style={styles1.err}>* please enter role</Text>}


                            </View>
                        ))}










                    </View>


                    <View onTouchStart={handleOutsideTouch} s style={styles1.icons}>
                        <Pressable onPress={() => navigation.goBack()} style={{ alignSelf: "center" }}><FontAwesome6 name="chevron-left" size={40} color="#00DF60" /></Pressable>
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

export default Founder2


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
        fontFamily: "Roboto",
        textAlign: "center",
        fontSize: 14,
        marginBottom: 20,
        marginTop: 10
    },
    input: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        // marginTop: 40,
        borderBottomWidth: 1,
        // borderRadius : 20,
        paddingLeft: scalingfactor * 10,
        borderBottomColor: "#AEAFAF",
        fontSize: scalingfactor * 20, // Responsive font size
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 7,
        width: "90%",
        marginHorizontal: "auto",
        fontFamily: "Roboto",
        lineHeight: scalingfactor * 18,
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
    certificate: {
        padding: 4,
        paddingTop: 15,
        marginTop: 10,
        margin: "auto",
        width: "92%",
        backgroundColor: "#24272A",
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
    input1: {
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
    t22: {
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
        bottom: 12,
        right: 30,
        // backgroundColor: "red",
        width: "auto"
    },
    input11: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        marginTop: -2,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: "#828282",
        fontSize: scalingfactor * 20,
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 5,
        width: "90%",
        margin: "auto",
        // fontFamily: "Roboto",
        // lineHeight: scalingfactor * 18,
        marginBottom: scalingfactor * 10,
        height: 220,
        marginTop: 10,
        padding: 12,
        textAlignVertical: "top",
        paddingBottom: 30,

    },
    des: {
        fontFamily: "Roboto",
        fontSize: 20,
        color: "#B8B8B8",
        paddingLeft: 22,
        marginVertical: 8
    }
    , plus1: {
        position: "absolute",
        right: 10,
        top: 2,
        zIndex: 100
    },
    v1: {
        borderBottomWidth: 2,
        borderBottomColor: "#94A3B8",
        width: "90%",

        margin: "auto",
        //    backgroundColor :"red",
        paddingBottom: 0,
        marginTop: 10,
        margin: "auto",
        //     //    backgroundColor :"red",
        paddingBottom: 0,
        marginTop: 10,
        marginBottom: 20
    },
    input101: {

        margin: height * 0.016,
        marginTop: 0,

        fontSize: scalingfactor * 20,
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 0,
        width: "80%",
        marginLeft: 0,
        // backgroundColor : "red",
        paddingLeft: 10,
        // fontFamily: "Roboto",
        // lineHeight: scalingfactor * 18,


    },
    minus: {
        position: "absolute",
        right: 45,
        top: -3,
        zIndex: 100
    },
    minus1: {
        position: "absolute",
        right: 45,
        top: 6,
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
    }
    , plus1: {
        position: "absolute",
        left: 0,
        top: 10,
        zIndex: 100
    },
    // v1: {
    //     borderBottomWidth: 3,
    //     borderBottomColor: "#bbbbbb",
    //     width: "90%",
    //     margin: "auto",
    //     //    backgroundColor :"red",
    //     paddingBottom: 0,
    //     marginTop: 10,
    //     marginBottom: 20
    // },

    t1: {
        textAlign: 'Left',
        marginLeft: 10,
        color: "#D9D9D9",
        fontFamily: 'Alata',
        fontSize: scalingfactor * 24,
        // backgroundColor : "red",
        width: "97%",
        marginBottom: scalingfactor * 3,
    },
    inputf: {
        margin: height * 0.016,
        marginTop: 0,

        fontSize: scalingfactor * 20,
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 0,
        width: "90%",
        marginLeft: 0,
        paddingLeft: 40,
        // marginBottom : 30,
        // fontFamily: "Roboto",
        // lineHeight: scalingfactor * 18,

    }
,
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