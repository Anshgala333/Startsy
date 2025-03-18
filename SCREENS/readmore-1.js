import React, { useEffect } from "react";
import { StyleSheet, Dimensions, View, ScrollView, Pressable, Text, Image, StatusBar } from "react-native";
import { BlurView } from "expo-blur";
import styles from "../styles/loginstyle.js";
import readmorestyles from "../styles/readmorestyles.js";
import Animated,{ useSharedValue , useAnimatedStyle,withTiming } from "react-native-reanimated";


const { height } = Dimensions.get("window");

const ReadMore = ({ navigation }) => {



  const blur = useSharedValue(0)
  useEffect(()=>{
    blur.value = withTiming(10,{ duration:1000})
  } , [])

  const animatedstyle = useAnimatedStyle(()=>{
    return {
      filter : `blur(${ blur.value}px`
    }
  })
  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor="#1E1E1E" barStyle={"light-content"} /> */}

      {/* Back button */}
      <Pressable style={readmorestyles.back}>
        <Image
          style={readmorestyles.backicon}
          source={require("../assets/images/backicon.png")}
        />
      </Pressable>

      {/* Scrollable content */}
      <View style={readmorestyles.scrollparent} contentContainerStyle={{ paddingBottom: 50 }}>
     
        {/* Fixed block container */}
        <View style={readmorestyles.block}>
          <View style={readmorestyles.top}>
            <Image
              style={readmorestyles.logo}
              source={require("../assets/images/logo.png")}
            />
          </View>
          <View style={readmorestyles.bottom}>
            <Text  allowFontScaling={false} style={readmorestyles.para}>
              Welcome to Startsy, your gateway to the dynamic world of startups, where founders, investors, freelancers, and community members come together to innovate and collaborate. Whether you’re here to launch your idea, invest in groundbreaking ventures, find freelance opportunities, or immerse yourself in the startup ecosystem, Startsy has the perfect role for you.
            </Text>
          </View>
        </View>
        

        <BlurView
          style={readmorestyles.sblock}
          intensity={30}
          blurType="extradark"
          blurAmount={32}
          reducedTransparencyFallbackColor="white"
        >
          <View>
          <Pressable styles={readmorestyles.up}>
          <Image style={readmorestyles.upi} source={require("../assets/images/up.png")}/>
        </Pressable>

            <Text style={readmorestyles.line1}>Why choose the role of</Text>
            <Text style={readmorestyles.line2}>Investor</Text>
            <Text style={readmorestyles.main}>
              Choose the role of Investor if you are a professional investor, such as a venture capitalist or an angel investor, looking to explore and invest in promising startups. Even if you have no prior experience in investing but have the interest and resources to support innovative ventures, this role is perfect for you! Connect with visionary founders and be part of their success stories.
            </Text>
          </View>
        </BlurView>
      </View>
    </View>
  );
};

export default ReadMore;
