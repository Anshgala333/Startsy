import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { View, Text, Image, Linking, FlatList, StatusBar, ActivityIndicator, RefreshControl, StyleSheet, BackHandler, SafeAreaView, ScrollView, Pressable, TextInput, Vibration, TouchableOpacity } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import EvilIcons from '@expo/vector-icons/EvilIcons'; import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Banner from "../assets/icons/banner.js"
import Upvote from '@/assets/icons/upvote';
import { Skeleton } from 'moti/skeleton'
import { MotiView } from 'moti';
import AntDesign from '@expo/vector-icons/AntDesign';

import * as ImagePicker from 'expo-image-picker';
import Post from "../components/Post.js"
import { useRoute } from '@react-navigation/native';
import { url } from "../config.js"
import { Video } from 'expo-av';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Share from "@/assets/icons/share.js";
import styles from "../styles/post.js"
import { useFocusEffect, useNavigation } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import BottomSheet, { BottomSheetView, BottomSheetScrollView, BottomSheetTextInput, BottomSheetDraggableView, BottomSheetFlatList, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import Ionicons from '@expo/vector-icons/Ionicons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useStoreRootState } from 'expo-router/build/global-state/router-store.js';

const Singleprofilepage = ({ props, openshare }) => {





  const navigation = useNavigation()

  const route = useRoute();
  const id = route.params.id
  const token = route.params.token
  const page = route.params.page
  const item = route.params.item
  const messages = route.params.messages
  const mypage = route.params.mypage

  const snapPoints5 = useMemo(() => ["50%", "100%"], []);


  // console.log(id);
  // console.log(token);
  // console.log(page);
  // console.log(item);
  // console.log(messages);
  // console.log(mypage);




  // useEffect(()=>{

  //   console.log("newww single proile called");

  //   setuserdata(null)
  //   setposts(null)
  // } , [token , props])

  const Spacer = ({ height = 16 }) => <View style={{ height }} />;





  async function docomment() {
    console.log("doing comment");
    console.log(postid);
    console.log(commenttext);
    setuploadingcomment(true)


    try {

      const response = await fetch(`${url}posts/createComment/${postid}`, {
        method: 'POST',
        body: JSON.stringify({ comment: commenttext }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setemptycomment(false)

      console.log(response.status);
      setcommenttext("");

      var object = {
        comment: commenttext,
        createdAt: new Date(),
        userId: {
          profilePhoto: data.profilePhoto,
          userName: data.userName,
        }
      }
      var newarray = [...allcomments]
      newarray.unshift(object)
      setallcomments(newarray)


      const scrollToTop = () => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
      };
      scrollToTop();
      scrollToTop();

    }
    catch (err) {
      console.log(err);

    }
    finally {
      setuploadingcomment(false)
      // Keyboard.dismiss();
    }

  }


  useFocusEffect(
    React.useCallback(() => {
      setuserdata(null)
      setposts([])
    }, [])
  );

  const comments = ({ item, index }) => {

    function time(time) {

      var data1 = new Date(time)

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
        return Math.floor(interval) + " minutes ago";
      }
      return Math.floor(seconds) + " seconds ago";
    }
    return (
      <View key={index} style={styles.listItem}>
        <Image
          source={{ uri: item.userId.profilePhoto }}
          style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text allowFontScaling={false} style={styles.username}>{item.userId.userName}</Text>
          <Text allowFontScaling={false} style={styles.message}>{item.comment.trim()}</Text>
        </View>
        <Text allowFontScaling={false} style={styles.time}>{time(item.createdAt)}</Text>
      </View>
    )
  }

  const [investor, setinvestorarray] = useState([]);
  const [noninvestor, setnoninvestor] = useState([]);
  const [refreshing, setRefreshing] = useState(false)
  const [connecteddata, setconnecteddata] = useState("")
  const [connectionCount,setconnectionCount] = useState(0);


  ///remove duplicate userif from non investion ids
  useEffect(()=>{
    const filteredData = noninvestor.map(item => (item._id));
    const f2 = new Set(filteredData);
    const array = Array.from(f2);

    setconnectionCount(array.length)

  },[noninvestor])




const filterData = async() => {


  const filteredData = noninvestor.map(item => (item._id))
// console.log(filteredData)

  try {
    const response = await fetch(`${url}test/getAllUsersWithStatus`, {
      method: 'POST',
      body: JSON.stringify({ userIdsArray: filteredData }),
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },

    });
    // console.log(await response.json())

    const {data} = await response.json();
    // console.log('dataaaayfwyfdywf',data);
    navigation.navigate("Followerpage", { people: data ,token:token})
    
  } catch (error) {
console.log(error);

  }


  // console.log('filtered data', filteredData,);

}





const [userdata, setuserdata] = useState(null)
const [posts, setposts] = useState([])


// const Tab = createMaterialTopTabNavigator();

// console.log(id , "id");
var decode = jwtDecode(token)


async function getdata(params) {
  try {
    // console.log(`${url}api/getUsersProfiles/${id}`);

    const response = await fetch(`${url}api/getUsersProfiles/${id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data.data.chatUsers, "datadatdatdatdtadtad");




    const f2 = new Set()
    const rec1 = data.data.chatUsers.filter((e)=>{
      if(f2.has(e._id)){
        return false
      }
      else{
        f2.add(e._id)
        return true
      }
    })
    console.log(rec1);
    // return
    

    setinvestorarray(rec1.filter((e) => e.role == "Investor"))
    setnoninvestor(rec1.filter((e) => e.role != "Investor"))




    var decode = jwtDecode(token)
    var data1 = data.data.posts.map(e => {

      // console.log(e);

      var object = { ...e, isliked: e.likedBy ? e.likedBy.includes(decode._id) : false, Applied: e.communityPost ? e.communityPost.communityMembers.includes(decode._id) : false, Jobapplied: e.jobPosts ? e.jobPosts.jobApplicants.includes(decode._id) : false }
      return object
    })

    // console.log(data1);





    if (data1) {
      setposts(data1)
    }
    else {
      setposts([])

    }

    setuserdata(data.data)


    setinstaurl(data.data.hiddenInfo.socialProof[0]?.url)
    setlinkedInUrl(data.data.hiddenInfo.socialProof[1]?.url)
    setyturl(data.data.hiddenInfo.socialProof[2]?.url)


    setImage(data.data.user_id.bannerImage)

    console.log(data.status, "oiuy");
    // setImage(data.data.user_id.bannerImage)
    setconnecteddata(data.status)

  }
  catch (err) {
    console.log(err);

  }
}

useEffect(() => {

  getdata()
}, [id, token])



// console.log(route.params);


useEffect(() => {
  StatusBar.setBackgroundColor("#16181A");
  StatusBar.setBarStyle("light-content")
}, [])

useEffect(() => {
  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    // console.log(page);

    if (page == "Chat") {
      navigation.pop();
      navigation.navigate(page, { item, messages, token });
    }
    else {
      navigation.navigate(page);
      // navigation.goBack()
    }

    return true; // This prevents the default back action
  });

  return () => backHandler.remove();
}, [page]);

const [image, setImage] = useState("")
const [followstatus, setfollowstatus] = useState("Connect")

async function applyjob(id, index) {


  if (allpost[index].Jobapplied) {
    return
  }
  Vibration.vibrate(100)



  setallpost(allpost.map((e, i) => {
    if (i == index) {
      var object = { ...e, Applied: true }
      return object
    }
    else return e
  }))

  try {
    const response = await fetch(`${url}posts/applyJobPost/${id}`, {
      method: 'POST',
      body: "",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (response.status === 200) {
      setallpost(allpost.map((e, i) => {
        if (i == index) {
          var object = { ...e, Jobapplied: true }
          return object
        }
        else return e
      }))
    }
    if (response.status === 400) {
      showToastWithGravity("you have already applied")
    }

  }
  catch (err) {
    console.log(err);

  }
}



const renderItem = ({ item, index }) => {



  const isVideoPlaying = videoStates[item._id] || false;

  function currency(pay) {
    // console.log(pay);
    // console.log(typeof pay);
    pay = Number(pay);
    return pay.toLocaleString("en-IN")
  }
  if (item.type == "photo" || item.type == "textBlog" || item.type == "video") {
    return (
      <View style={styles.box}>
        <View style={styles.top} >
          <Pressable
            onPress={() => { navigation.navigate("Singleuserpage", { token: token, id: item.user_id._id, page: "Startsy" }) }}
            style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <Image style={styles.userimg} source={{ uri: userdata.user_id.profilePhoto }} />
            <View style={styles.userdetail}>
              <Text allowFontScaling={false} style={styles.u1}>{userdata.user_id.userName}</Text>
              <Text allowFontScaling={false} style={styles.u2}>{userdata.user_id.role == "CommunityMember" ? "Member" : userdata.user_id.role}</Text>
            </View>
          </Pressable>
        </View>
        {item.type == "photo" && <Image style={[styles.template, { aspectRatio: item.aspectRatio ? item.aspectRatio : 1 / 1 }]} source={{ uri: item.mediaUrl }} />}
        {item.type == "video" &&
          <Video
            ref={ref => videoRefs.current[item._id] = ref}
            style={styles.template}
            source={{ uri: item.mediaUrl }}
            useNativeControls // Enables native playback controls
            resizeMode="contain" // Adjusts video to fit within the view
            isLooping // Loops the video
            shouldPlay={isVideoPlaying}
          />

        }
        {item.type == "textBlog" && <Text style={styles.blogtext}>{item.content}</Text>}

        <View style={styles.iconcontainer}>
          <View style={styles.icon2}>
            <Pressable onPress={() => { upvotepost(item._id, index) }}>
              {!item.isliked && <Upvote width={36} height={36} style={{ marginHorizontal: 5 }} />}
              {item.isliked && <Upvote width={36} height={36} style={{ marginHorizontal: 5 }} selected={true} />}
            </Pressable>
            <Text style={{ left: -10, top: 13, color: "#ccc" }}>{item.likedBy?.length}</Text>
            <Pressable onPress={() => { opencomment(item._id) }}><FontAwesome name="comment-o" size={30} color="#ccc" /></Pressable>
          </View>
          <TouchableOpacity
            onPress={() => {
              Vibration.vibrate(20)
              openshare(item._id)
            }}
          >
            <Share style={{ marginTop: 5, marginRight: 10, right: 0 }} />
          </TouchableOpacity>


        </View>
        <View style={styles.lower}>
          <Text allowFontScaling={false} style={styles.u3}>{item.caption != undefined ? item.caption : "caption"} </Text>
          <Pressable onPress={() => { opencomment(item._id) }} allowFontScaling={false} style={styles.u4}>
            <Text style={styles.u4}>View {item.postComments?.length} comments</Text>
          </Pressable>

        </View>

      </View>
    )
  }
  else if (item.type == "communityPost") {
    return (
      <View style={styles.box}>
        {/* <Text>{JSON.stringify(item)}</Text> */}

        <View style={styles.top} >
          <Pressable

            onPress={() => { navigation.navigate("Singleuserpage", { token: token, id: item.user_id._id, page: "Startsy" }) }}
            style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
              <Image style={styles.userimg} source={{ uri: userdata.user_id.profilePhoto }} />
              <View style={styles.userdetail}>
                <Text allowFontScaling={false} style={styles.u1}>{userdata.user_id.userName}</Text>
                <Text allowFontScaling={false} style={styles.u2}>Community Member</Text>
              </View>
            </View>
          </Pressable>
        </View>
        <View style={styles.lower}>
          <Text style={styles.com1}>{item.communityPost.communityName}</Text>
          <Text style={styles.com2}><Text style={styles.desc1}>Community description: </Text>{item.communityPost.communityDescription}</Text>
          <Text allowFontScaling={false} style={styles.u6}><Text style={styles.desc1}>Members Count :</Text> {item.communityPost.communityMembers.length}</Text>
          <Text allowFontScaling={false} style={styles.u7}>Rules & Guidelines: {item.communityPost.communityRules}</Text>

          <Pressable style={[styles.next]} >
            <Text allowFontScaling={false} style={styles.nexttext}>Join Forum</Text>
          </Pressable>
        </View>

      </View>
    )
  }
  else if (item.type == "jobPost") {
    return (
      <View style={styles.box}>
        <View style={styles.top} >

          <Pressable
            onPress={() => { navigation.navigate("Singleuserpage", { token: token, id: item.user_id._id, page: "Startsy" }) }}
            style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
              <Image style={styles.userimg} source={{ uri: userdata.user_id.profilePhoto }} />
              <View style={styles.userdetail}>
                <Text allowFontScaling={false} style={styles.u1}>{userdata.user_id.userName}</Text>
                <Text allowFontScaling={false} style={styles.u2}>{userdata.user_id.role == "CommunityMember" ? "Community Member" : userdata.user_id.userName}</Text>
              </View>
            </View>

          </Pressable>
        </View>
        <View style={styles.lower}>
          <Text style={styles.com1}>Role: {item.jobPosts.role}</Text>
          <Text style={styles.com2}><Text style={styles.desc1}>Job description: </Text>{item.jobPosts.description}</Text>


          <Text allowFontScaling={false} style={styles.u8}><Text style={{ color: "#828282" }}>Duration: {item.jobPosts.duration}</Text></Text>
          <Text allowFontScaling={false} style={styles.u8}><Text style={{ color: "#828282" }}>Payment mode: {item.jobPosts.pay} </Text> </Text>
          {item.jobPosts.amount != "" && <Text allowFontScaling={false} style={styles.u8}><Text style={{ color: "#00de62" }}>Amount: {item.jobPosts.amount} </Text></Text>}

          {/* {item.jobPosts.amount != "" && <Text allowFontScaling={false} style={styles.u8}><Text style={{ color: "#828282" }}>Pay:  ₹ {currency(item.jobPosts.amount)} </Text></Text>} */}


          <Pressable onPress={() => { applyjob(item._id) }} style={[styles.job]} >
            <Text allowFontScaling={false} style={styles.nexttext}>Apply</Text>
          </Pressable>
        </View>

      </View>
    )
  }
};



const fileupload = async () => {



  if (true) {
    return
  }
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }

  // Launch the image picker
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All, // Allow all media types
    allowsEditing: true, // Allows cropping the image
    aspect: [16, 9], // Aspect ratio of the image
    quality: 1, // Image quality (0 to 1)

  });


  if (!result.canceled) {
    var final = new FormData();
    const imageUri = result.assets[0].uri;
    setImage(imageUri);

    final.append("coverImage", {
      uri: imageUri,
      type: "image/jpeg",
      name: `image_${Date.now()}.jpg`,

    })

    const response = await fetch(`${url}api/uploadCoverImage`, {
      method: 'POST',
      body: final,
      headers: {
        accept: 'application/json',
        "Authorization": token
      },
    });

    const data = await response.json();

    console.log(data);

  }

}


async function sendfollowrequest(id) {

  // console.log(connecteddata);
  // console.log(connecteddata);
  // console.log(connecteddata);
  // console.log(connecteddata);
  // console.log(connecteddata);


  if (connecteddata == "Followed" || connecteddata == "Pending Request") {
    // console.log("ok");

    // console.log("connect");
    setconnecteddata("Follow")


    async function makesubmit() {

      try {
        const response = await fetch(`${url}founder/rejectRequest/${id}`, {
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
    }
    makesubmit()
    return
  }

  // console.log(id);
  try {

    const response = await fetch(`${url}connections/followUser/${id}`, {
      method: 'POST',
      body: "",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await response.json();
    // setloading(false)
    console.log(data);
    // console.log(response.status);

    // setfollowstatus("request sent")
    setconnecteddata("Pending Request")


  }
  catch (err) {
    console.log(err);

  }

}


function getfund(fund) {

  if (fund == 69) {
    return 0
  }
  fund = fund - 57
  return (fund * 1000000).toLocaleString("en-IN")


  // (+userdata.hiddenInfo.fundingStatus).toLocaleString("en-IN")

}


function tellConnection(data) {
  if (data == "Pending Request") return "Request sent"
  else if (data == "Followed") return "Connected"
  else if (data == "Follow") return "Connect"

}

const [instaurl, setinstaurl] = useState("")
const [LinkedinURl, setlinkedInUrl] = useState("")
const [yturl, setyturl] = useState("")

const header = function () {
  return (
    <>
      <View style={styles1.header}>
        <Pressable style={{ paddingLeft: 0, paddingTop: 7 }} onPress={() => {
          if (page == "Chat") {

            // console.log(page);
            navigation.navigate(page, { item, messages, token });
          }
          else {
            // console.log(page);


            navigation.navigate(page)
          }

          // navigation.goBack()


        }}><FontAwesome6 name="chevron-left" size={24} color="#00de62" /></Pressable>

        <Text numberOfLines={1} style={styles1.username}>{userdata.user_id.userName}</Text>
      </View>
      <View>
        <Pressable onPress={fileupload} style={styles1.top}>
          {(image == "" || image == undefined) &&
            <View style={styles1.img1}>
              <Banner />
            </View>}

          {(image != "" && image != undefined) && <Image style={styles1.bimg} source={{ uri: image }} />}
        </Pressable>
        <View style={styles1.bottom}>

          <View style={styles1.profilephoto}>
            <Image style={styles1.img2} source={{ uri: userdata.user_id.profilePhoto }} />
          </View>
          <View style={styles1.upvote}>
            {(decode.role == "CommunityMember"  || decode.role == "Job seeker") &&
              <View style={styles1.ss}>
                {/* <MaterialCommunityIcons name="certificate-outline" size={24} color="#ccc" /> */}

                {instaurl != "" && <Pressable onPress={() => Linking.openURL(instaurl)} >
                  <AntDesign name="instagram" style={styles.plus1} size={20} color="#bbbbbb" />
                </Pressable>}
                {yturl != "" && <Pressable onPress={() => { Linking.openURL(yturl) }} >
                  <AntDesign name="youtube" style={styles.plus1} size={20} color="#bbbbbb" />
                </Pressable>
                }
                {LinkedinURl != "" && <Pressable onPress={() => Linking.openURL(LinkedinURl)} >
                  <AntDesign name="linkedin-square" style={styles.plus1} size={20} color="#bbbbbb" />
                </Pressable>}


              </View>
            }

            {/* <View style={{ transform: [{ scale: 1.1 }], marginRight: 0 }} ><Upvote width={50} height={44} /></View>
              <Text style={styles1.followers}>{userdata.totalUpvotes || 10}</Text> */}
          </View>

          <Text style={styles1.u1}>
            {userdata.fullName}  <Text style={styles1.role}>{userdata.user_id.role == "CommunityMember" ? "Member" : userdata.user_id.role}</Text>
          </Text>

          {!mypage &&
            <Pressable onPress={() => { sendfollowrequest(userdata.user_id._id) }}
              style={connecteddata == "Follow" ? styles1.f1 : styles1.f2}
            >
              {/* <Text style={connecteddata != "Follow" ? styles1.ft1 : styles1.ft}>{tellConnection(connecteddata)}</Text>
                <Text style={connecteddata != "Follow" ? styles1.ft1 : styles1.ft}>{tellConnection(connecteddata)}</Text>
                <Text style={connecteddata != "Follow" ? styles1.ft1 : styles1.ft}>{tellConnection(connecteddata)}</Text> */}
              {connecteddata == "Follow" && <Text style={{ color: "#16181a", fontFamily: "Alata", alignItems: "center", marginTop: 1, fontSize: 16, }}>{tellConnection(connecteddata)}</Text>}
              {connecteddata == "Pending Request" && <Text style={{ color: "#ccc", fontFamily: "Alata", alignItems: "center", marginTop: 1, fontSize: 16, }}>{tellConnection(connecteddata)}</Text>}
              {connecteddata == "Followed" && <Text style={{ color: "#ccc", fontFamily: "Alata", alignItems: "center", marginTop: 1, fontSize: 16, }}>{tellConnection(connecteddata)}</Text>}
            </Pressable>}

          {mypage && <Pressable onPress={() => { sendfollowrequest(userdata.user_id._id) }} style={styles1.f1}><Text style={styles1.ft}>{tellConnection(connecteddata)}</Text></Pressable>}
          {/* <Text style={styles1.goal}>{userdata.goal}</Text> */}





          {userdata.user_id.role == "Founder" &&
            <Text style={styles1.goal}>{userdata.goal}</Text>
          }

          {userdata.user_id.role == "Founder" &&
            <Text style={styles1.fund}>{userdata.hiddenInfo.stageOfStartup} :₹ {getfund(userdata.hiddenInfo.fundingStatus)}</Text>
          }

          {userdata.user_id.role == "Investor" &&
            <Text style={styles1.goal}>Investment experience : {userdata.previousExperience} years</Text>
          }

          {userdata.user_id.role == "Investor" &&
            <Text style={styles1.fund}>Investment capacity : ₹ {userdata.investmentRange.toLocaleString("en-IN")}</Text>
          }


          {(userdata.user_id.role == "CommunityMember" || userdata.user_id.role == "Job seeker" ) && userdata.tagline != "" &&
            <Text style={styles1.goal}>{userdata.tagline}</Text>
          }

          {(userdata.user_id.role == "CommunityMember" || userdata.user_id.role == "Job seeker") && userdata.skills != "" &&
            <Text style={styles1.fund}>{userdata.skills}</Text>
          }






          <View style={styles1.main}>
            {userdata.user_id.role != "Investor" && userdata.user_id.role != "CommunityMember" && <View style={styles1.connectionContainer}>


              {Array(3).fill(null).map((_, index) => (
                <View style={styles1.circle}>
                  <Image
                    key={index}
                    style={styles1.profileImage1}
                    source={
                      investor[index]
                        ? { uri: investor[index].profilePhoto } // Profile photo if available
                        : require("../assets/images/blank1.png")   // Dummy image if not
                    }
                  />
                </View>
              ))}


              <Text style={styles1.t6}>{investor.length} investor connections</Text>
            </View>}
            <TouchableOpacity

              // onPress={()=>navgation.navigate("Followerpage", { people: noninvestor ,token:token})}
              onPress={() => filterData()}



            >
              <View style={styles1.connectionContainer}>

                {Array(3).fill(null).map((_, index) => (
                  <View style={styles1.circle}>
                    <Image
                      key={index}
                      style={styles1.profileImage1}
                      source={
                        noninvestor[index]
                          ? { uri: noninvestor[index].profilePhoto } // Profile photo if available
                          : require("../assets/images/blank1.png")   // Dummy image if not
                      }
                    />
                  </View>
                ))}

                <Text style={styles1.t6}>{noninvestor.length} connections</Text>
              </View>
            </TouchableOpacity>
          </View>



          <View style={styles1.alagdivider}></View>



        </View>
      </View>
    </>
  )
}


async function upvotepost(id, index) {
  // console.log(id);
  // console.log(index);

  var toset = !posts[index].isliked
  console.log(toset);

  var status = toset ? "like" : "unlike"

  setposts(posts.map((e, i) => {
    if (i == index) {
      var object = { ...e, isliked: !e.isliked }
      return object
    }
    else return e
  }))

  try {

    const response = await fetch(`${url}posts/upvotePost/${id}/${status}`, {
      method: 'POST',
      body: "",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    console.log(response.status);

  }
  catch (err) {
    // setloading(false)
    console.log(err);

  }


}


const [comment, setcomment] = useState(false)
const [co, setiscommentopen] = useState(false)
const [allcomments, setallcomments] = useState([])
const [postid, setpostid] = useState(null)
const bottomSheetRef5 = useRef(null);
const [emptycomment, setemptycomment] = useState(false)




async function opencomment(id) {
  setcomment(true)
  bottomSheetRef5.current?.expand();
  setpostid(id);
  setiscommentopen(true)

  // console.log("open comment");


  try {
    console.log(token);
    const response = await fetch(`${url}posts/getComments/${id}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await response.json();
    // console.log(response.status);
    console.log(data.data);
    setallcomments(data.data)
    if (data.data.length == 0) {
      setemptycomment(true)
    }
    else {
      setemptycomment(false)

    }

  }
  catch (err) {
    console.log(err);
  }



}



const [viewableItems, setViewableItems] = useState([]);
const [videoStates, setVideoStates] = useState({});
const videoRefs = useRef({});
const onViewableItemsChanged = useCallback(({ viewableItems }) => {
  setViewableItems(viewableItems);

  // Update play state for videos based on visibility
  const updatedVideoStates = {};
  viewableItems.forEach(viewableItem => {
    if (viewableItem.isViewable) {
      updatedVideoStates[viewableItem.item._id] = true; // Video should play when in view
    } else {
      updatedVideoStates[viewableItem.item._id] = false; // Video should stop when out of view
    }
  });

  setVideoStates(updatedVideoStates);
  viewableItems.forEach(item => {
    if (!item.isViewable && videoRefs.current[item.item._id]) {
      videoRefs.current[item.item._id].pauseAsync(); // Pause the video
    }
  });
}, []);



const viewabilityConfig = {
  viewAreaCoveragePercentThreshold: 80, // Item is considered viewable if 50% is visible
};

const [status1, setstatus] = useState(false)
const renderBackdrop = (props) => (
  <BottomSheetBackdrop
    {...props}
    disappearsOnIndex={-1} // Backdrop disappears when BottomSheet is closed
    appearsOnIndex={0} // Backdrop appears when BottomSheet is open
    opacity={0.7} // Set opacity for the backdrop
  />
);

const flatListRef = useRef(null);
const [commenttext, setcommenttext] = useState("")
const [uploadingcomment, setuploadingcomment] = useState(false)



return (


  <GestureHandlerRootView>
    <SafeAreaView style={{ flex: 1, backgroundColor: "#16181a" }}>
      {/* {!userdata && <ActivityIndicator size="large" color="#fff" />} */}






      {!userdata &&
        <MotiView
          transition={{ type: 'timing', duration: 1000, repeatReverse: true }}
          // style={[styles.container, styles.padded]}
          animate={{ backgroundColor: "#16181a" }}
        >

          <Skeleton
            transition={{
              // repeat: Infinity,
              duration: 10000
            }}
            colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

            colorMode='dark'
            // opacity={0.1}
            // backgroundColor="#595857"
            highlightColor="#ccc"
            radius={0}
            height={100}
            width={"100%"}
          />
          <View style={{ marginTop: -30, marginLeft: 10 }}>
            <Skeleton
              transition={{
                // repeat: Infinity,
                duration: 10000
              }}
              colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

              colorMode='dark'
              // opacity={0.1}
              // backgroundColor="#595857"
              highlightColor="#ccc"
              radius={130}
              height={130}
              width={130}
            />
          </View>
          <Spacer />

          <Spacer height={8} />
          <View style={{ display: "flex", flexDirection: "column", gap: 5, paddingLeft: 10 }}>

            <Skeleton
              transition={{
                // repeat: Infinity,
                duration: 4000
              }}
              colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

              colorMode='dark'
              // opacity={0.1}
              // backgroundColor="#595857"
              highlightColor="#ccc"
              radius={20}
              height={30}
              width={250}
            />

            <Spacer height={0} />
            <Skeleton
              colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

              colorMode="dark"
              width={170}
              height={18}
              // backgroundColor="black"
              highlightColor="#333"  // Set highlight color
            />
            <Spacer height={0} />

            <Skeleton
              colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

              colorMode="dark"
              width={250}
              height={18}
              // backgroundColor="black"
              highlightColor="#333"  // Set highlight color
            />
            <Spacer height={0} />

            <Skeleton
              colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

              colorMode="dark"
              width={200}
              height={18}
              // backgroundColor="black"
              highlightColor="#333"  // Set highlight color
            />
          </View>


          <View style={{ display: "flex", flexDirection: "row", gap: 40, justifyContent: "center", marginTop: 40 }}>

            <Skeleton
              transition={{
                // repeat: Infinity,
                duration: 10000
              }}
              colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

              colorMode='dark'
              // opacity={0.1}
              // backgroundColor="#595857"
              highlightColor="#ccc"
              radius={10}
              height={15}
              width={140}
            />

            <Skeleton
              transition={{
                // repeat: Infinity,
                duration: 10000
              }}
              colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

              colorMode='dark'
              // opacity={0.1}
              // backgroundColor="#595857"
              highlightColor="#ccc"
              radius={10}
              height={15}
              width={140}
            />

          </View>


          <View style={styles1.divider1}></View>


          <View style={{ display: "flex", flexDirection: "row", gap: 5, width: "90%", marginLeft: 20, marginTop: 20, alignItems: "center" }}>
            <Skeleton
              // colorMode="dark"
              width={30}
              colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

              // backgroundColor="red" // Changed to red

              height={30}
              radius={"round"}
              // backgroundColor="black"
              highlightColor="#000"  // Set highlight color
            />
            <Spacer height={8} />
            <Skeleton
              colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}
              colorMode="dark"
              width={'60%'}
              height={10}
              // backgroundColor="black"
              highlightColor="#333"  // Set highlight color
            />
          </View>
          <Spacer height={8} />



          <View style={{ marginLeft: 20 }}>
            <Skeleton
              style={{ marginTop: 10, marginLeft: 10 }}
              colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}

              transition={{
                opacity: 1,
                duration: 1000,

                // repeat: true,
              }}
              colorMode='dark'
              opacity={1}
              // highlightColor="red"   // Set highlight color here
              radius={20}

              height={300}

              width={"94%"}
            // style={styles.box}
            >
            </Skeleton>
          </View>
          <Spacer height={8} />
        </MotiView>

      }






      {userdata && <FlatList
        refreshControl={
          <RefreshControl progressViewOffset={0} refreshing={refreshing}
            progressBackgroundColor="#16181a"
            colors={['#00de62']}
            onRefresh={() => {
              setRefreshing(true);
              getdata()
              Vibration.vibrate(200)
              setTimeout(() => {
                setRefreshing(false); // Stop refreshing after fetching data
              }, 2000); // Adjust the delay as needed
            }} />}

        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        ListHeaderComponent={header}
        data={posts}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 50 }}
      />}


      <BottomSheet


        overlayColor="rgba(0, 0, 0, 0.9)"
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: '#1A1D1F', borderRadius: 30 }} // Changes the background of the sheet itself
        handleIndicatorStyle={{ backgroundColor: '#00de62' }}

        ref={bottomSheetRef5}
        snapPoints={snapPoints5}
        onClose={() => {
          setcomment(false)
          setstatus(false)
          setiscommentopen(false);
        }}
        index={-1} // Initially closed
        contentContainerStyle={{ zIndex: 100, elevation: 20, }}


      >
        <View style={{ flex: 0.92 }}>

          <Text style={styles.comment}>Comments</Text>
          {/* <KeyboardAvoidingView behavior="" keyboardVerticalOffset={-100} style={{ flex: 1 }}> */}
          {emptycomment && <Text style={styles.no}>No comments yet</Text>}
          <BottomSheetFlatList
            ref={flatListRef}
            data={allcomments}
            renderItem={comments}
            scrollEnabled={true}
            style={{ flex: 0.7, height: "100", overflow: "hidden" }}
          // contentContainerStyle={  }}

          />
          {/* </KeyboardAvoidingView> */}
          <View
            style={styles.sc1}>
            <TextInput
              placeholder=""

              placeholderTextColor="#828282"
              style={styles.searchInput}
              value={commenttext}
              multiline={true}
              onChangeText={text => setcommenttext(text)}
            />
            <Pressable onPress={docomment} style={styles.send1} >

              {uploadingcomment && <ActivityIndicator size={24} color="#00de62" />}
              {!uploadingcomment && <Ionicons name="send" size={24} color="#00DE62" />}
            </Pressable>
          </View>




        </View>

      </BottomSheet>


    </SafeAreaView>
  </GestureHandlerRootView>
)

}

export default Singleprofilepage

const styles1 = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    height: 55,
    backgroundColor: "#16181A",
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  username: {
    fontFamily: "myanmar",
    fontSize: 24,
    color: "#00DE62",
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 2,
    width: "80%",
    // backgroundColor: "red",
  },
  top: {
    width: "100%",
    height: 140,
    backgroundColor: "#7A7B7C",
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
  },
  img1: {
    // backgroundColor : "red",
    width: 50,
    height: 50,
    margin: "auto",
    marginTop: 45,
    paddingLeft: 10,
    alignSelf: "center",

  },
  bottom: {
    width: "100%",
    backgroundColor: "#16181a",
    padding: 10
  },
  upvote: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    width: 80,
    // backgroundColor: "red",
    height: "auto",
    marginVertical: 20,
    display: "flex",
    flexDirection: "row"
  },
  followers: {
    color: '#00de62',
    fontFamily: "Roboto",
    alignSelf: "flex-end",
    marginLeft: -10

  },
  u1: {
    fontFamily: "Alata",
    fontSize: 24,
    color: "#E9E9E9",
    paddingHorizontal: 5,
    width: "100%",
    marginTop: 20,
    marginVertical: 0
  },
  role: {
    fontFamily: "Roboto",
    fontSize: 14,
    color: "#00de62",
    marginLeft: 10,
    top: -2

  },

  f1: {
    width: 180,
    height: 34,
    backgroundColor: "#ccc",
    borderRadius: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 0,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    marginTop: 10,


  },
  f2: {
    width: 180,
    height: 34,
    backgroundColor: "#16181a",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",


    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 0,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    marginTop: 10

  },
  ft: {
    fontFamily: "Alata",
    fontSize: 16,
    color: "#16181A",
    marginTop: 3

  },
  ft1: {
    fontFamily: "Alata",
    fontSize: 16,
    color: "#ccc",
    marginTop: 3

  },
  goal: {
    fontFamily: "Roboto",
    fontSize: 18,
    color: "#D9D9D9",
    paddingHorizontal: 5,
    marginVertical: 12,
    marginBottom: 5

  },
  fund: {
    fontFamily: "Roboto",
    fontSize: 15,
    color: "#00DE62",
    paddingHorizontal: 5,
    marginVertical: 0

  },
  connectionContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 15
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 50,
    marginRight: -6,
    overflowY: "hidden",
  },

  profileImage1: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    marginBottom: 0,
    borderWidth: 2,
    borderColor: "#16181a"
  },
  t6: {
    fontFamily: "Alata",
    fontSize: 12,
    color: "#AEAFAF",
    marginLeft: 15,
    marginTop: -2
  },

  main: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly"

  },
  divider: {
    width: "110%",
    marginLeft: -20,
    height: 3,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "#24272A"
  },

  profilephoto: {
    width: 130,
    aspectRatio: 1 / 1,
    position: "absolute",
    left: 10,
    top: -55,
    // backgroundColor : "red",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#000",
    borderRadius: 100


  },
  img2: {
    objectFit: "cover",
    width: "100%",
    height: "100%", borderRadius: 100
  },
  bimg: {
    width: "100%",
    height: "100%",


  },
  divider1: {
    width: "120%",
    // marginLeft: -20,
    height: 1,
    marginHorizontal: "auto",
    marginTop: 20,
    // marginBottom: 20,
    backgroundColor: "#24272A"
  },
  alagdivider: {
    width: "130%",
    marginLeft: -20,
    height: 1,
    marginHorizontal: "auto",
    marginTop: 0,
    marginBottom: 10,
    backgroundColor: "#24272A"
  },

  ss: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    paddingLeft: 10,
    marginRight: 18,
    marginTop: -10
  },


})