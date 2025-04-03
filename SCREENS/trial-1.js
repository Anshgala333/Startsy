import React, { useState, useRef, useEffect, useContext } from "react";
import { Text, View, Dimensions, StatusBar, Pressable, Image, SafeAreaView, BackHandler, ScrollView, Animated } from "react-native";
import { BlurView } from "expo-blur";
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from "../styles/l.js";
import readmorestyles from "../styles/readmorestyles.js";
const { height } = Dimensions.get("window");
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useFocusEffect, useNavigation } from "expo-router";
import { url } from "@/config.js";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import Up from "../assets/icons/up.js"
import { GlobalContext } from "@/Global/globalcontext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";


const ReadMore1 = function ({ attop, setattop, animatedtop, animatedValue, GeneralModelId, email, token }) {
  const navigation = useNavigation()
  const elementRef = useRef(null);
  const [top, settop] = useState(0)

  useFocusEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      console.log(attop, "attop");
      console.log("hiiiiiiiiiii");
      scrolltozero()
      if (attop == false) {
        setattop(true)
        return true; // This prevents the default back action
      }


    });

    return () => backHandler.remove();
  });


  useEffect(() => {

    const getTopCoordinate = () => {
      elementRef.current.measure((fx, fy, width, height, px, py) => {
        // console.log("Top coordinate:", py);
        settop(py);
      });
    };

    // Call getTopCoordinate when the component mounts
    getTopCoordinate();
  }, [animatedtop]);
  useFocusEffect(() => {
    StatusBar.setBackgroundColor("#16181a")
    StatusBar.setBarStyle("light-content")
  })

  const scrollViewRef = useRef(null);

  const scrollDown = () => {
    scrollViewRef.current.scrollTo({
      y: height - 80, // Change this value to scroll by different heights
      animated: true, // Smooth scrolling
    });

  };

   const { globaldata, updateField } = useContext(GlobalContext);
  

  const scrolltozero = () => {
    console.log("fucntin called");

    scrollViewRef.current.scrollTo({
      y: 0, // Change this value to scroll by different heights
      animated: false, // Smooth scrolling
    });
  }

  async function typeChange(cat) {
    console.log("called");
    var type = cat
    var id = GeneralModelId;
    console.log(type);
    console.log(id);
    console.log(email);

    if (type == "JobSeeker") {
      console.log("okk job");
      
      try {

        const response = await fetch(`${url}api/updateToJobSeeker`, {
          method: 'GET',
          headers: {
            // accept: "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        if (response.status == 200) {
          scrolltozero()
          console.log(data.token);
          updateField("token", data.token);
          await AsyncStorage.setItem('accessToken', data.token);
          if (attop == false) {
            setattop(true)
            return true; // This prevents the default back action
          }
        }


      }
      catch (err) {
        console.log(err);

      }



    }
    else {
      navigation.navigate("Signup5", { type, id, useremail: email });
    }

    // navigation.navigate("PricePage" ,  { type, id, useremail: email })




  }






  return (


    // <SafeAreaView style={{ flex: 1 }}>
    <Animated.View style={[readmorestyles.container, animatedtop]}>


      <Pressable style={readmorestyles.back} onPress={() => {

        scrolltozero()
        setattop(true)
      }}>
        {/* <Ionicons name="arrow-back-circle-outline" size={50} color="#00DE62" /> */}
        <FontAwesome6 name="chevron-left" size={34}  color="#00DF60" />


      </Pressable>

      {/* startsy info which will be fixed  */}
      <Animated.View style={[readmorestyles.block]}>

        {/* back button */}

        {/* back button */}
        <View style={readmorestyles.top}>
          <Image
            style={readmorestyles.logo}
            source={require("../assets/images/logo.png")}
          />
        </View>
        <View style={readmorestyles.bottom}>
          <Text style={readmorestyles.para} allowFontScaling={false}>

            You can switch your profile to either Investor, Founder or Job seeker while keeping your community engagement intact. This one-time switch unlocks tailored features specific to your chosen role while preserving your existing interactions and connections.
          </Text>
          <Text ref={elementRef} ></Text>

        </View>
      </Animated.View>
      {/* startsy info which will be fixed  */}

      {/* 4 boxes */}

      <ScrollView ref={scrollViewRef} style={readmorestyles.scrollparent}
        bounces={true}

        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 10,
          // paddingHorizontal: 10,
        }}>

        {/* <Pressable style={{backgroundColor : "red"}} onPress={scrollDown}> */}
        <Up scrollViewRef={scrollViewRef} />
        {/* </Pressable> */}


        {/* <View style={{flex : 1 , borderRadius : 100 , backgroundColor : "red", height : height}}> */}

        <BlurView
          style={readmorestyles.sblock}
          intensity={90}
          blurAmount={32}
          experimentalBlurMethod="dimezisBlurView"
          blurReductionFactor={12}
          tint="systemChromeMaterialDark"


        >


          <Text allowFontScaling={false} style={readmorestyles.line1}>Why choose the role of</Text>
          <Text allowFontScaling={false} style={readmorestyles.line2}>Investor ?</Text>
          <Text allowFontScaling={false} style={readmorestyles.main} >
            Unlock exclusive access to  startups screening through our swipe feature, streamline deal sourcing, and connect with passionate founders. Whether you're new or experienced, get tailored insights and tools to make startup investing easier and more rewarding.
          </Text>

          <Pressable style={readmorestyles.proceedbutton} onPress={() => { typeChange("Investor") }}>
            <Text style={readmorestyles.proceedText}>Proceed</Text>
          </Pressable>
        </BlurView>

        {/* </View> */}

        <BlurView
          style={readmorestyles.sblock1}


          intensity={90}
          blurAmount={32}
          experimentalBlurMethod="dimezisBlurView"
          blurReductionFactor={12}
          tint="systemChromeMaterialDark"
        >
          <View>
            <Text allowFontScaling={false} style={readmorestyles.line1}>Why choose the role of</Text>
            <Text allowFontScaling={false} style={readmorestyles.line2}>Founder ?</Text>
            <Text allowFontScaling={false} style={readmorestyles.main}  >
              Founders can showcase their startups to the right investors through our swipe-based feature. Your startup gets in front of investors actively looking for opportunities—if they swipe right, you get a direct connection. This simplifies fundraising, increases visibility, and helps you secure capital faster.
            </Text>
            <Pressable style={readmorestyles.proceedbutton} onPress={() => { typeChange("Founder") }}>
              <Text style={readmorestyles.proceedText}>Proceed</Text>
            </Pressable>
          </View>
        </BlurView>




        <BlurView
          style={[readmorestyles.sblock1, readmorestyles.last]}



          intensity={90}
          blurAmount={32}
          experimentalBlurMethod="dimezisBlurView"
          blurReductionFactor={12}
          tint="systemChromeMaterialDark"
        >
          <View>
            <Text allowFontScaling={false} style={readmorestyles.line1}>Why choose the role of</Text>
            <Text allowFontScaling={false} style={readmorestyles.line2}>Job Seeker ?</Text>
            <Text allowFontScaling={false} style={readmorestyles.main}>
              Unlock startup opportunities, network, and grow your career. Find a job in any startup by connecting directly with founders who are looking for talent, making it easier to land your next role and thrive in the startup ecosystem.
            </Text>

            <Pressable style={readmorestyles.proceedbutton} onPress={() => { typeChange("JobSeeker") }}>
              <Text style={readmorestyles.proceedText}>Proceed</Text>
            </Pressable>
          </View>



        </BlurView>


        {/* <Pressable onPress={() => {
          console.log("okkk");

          setattop(true)
          setTimeout(() => {
            scrolltozero()
          }, 1);
        }

        } style={{ zIndex: 10000000, color: "white", position: "absolute", left: "84%", bottom: 0 }}>
          <Ionicons name="arrow-forward-circle" size={48} color="#00DE62" />
        </Pressable> */}





      </ScrollView>

      {/* 4 boxes */}




    </Animated.View>
    // </SafeAreaView>
  )

}


export default ReadMore1