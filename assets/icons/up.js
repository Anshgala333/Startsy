import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"
import { View, StyleSheet, Dimensions, Pressable } from "react-native"
import readmorestyles from "@/styles/readmorestyles"
// import styles from "@/styles/l"
const Up = ({ style , scrollViewRef }) => (

  <Pressable onPress={() => {
    scrollViewRef.current.scrollTo({
      y: height - 80, // Change this value to scroll by different heights
      animated: true, // Smooth scrolling
    });
  }} style={[styles.container, style]}>
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" >
      <Path
        fill="url(#a)"
        d="M28.276 5.68c6.24 6.24 6.24 16.356 0 22.596-6.24 6.24-16.357 6.24-22.596 0-6.24-6.24-6.24-16.357 0-22.596 6.24-6.24 16.356-6.24 22.596 0Z"
      />
      <Path
        fill="#00DE62"
        d="M9.276 15.033a1 1 0 0 0 1.28 1.536l-1.28-1.536Zm7.702-5.117.64-.768a1 1 0 0 0-1.28 0l.64.768Zm6.42 6.653a1 1 0 0 0 1.281-1.536l-1.28 1.536Zm-7.42 7.47a1 1 0 1 0 2 0h-2Zm-5.421-7.47 7.06-5.884-1.28-1.537-7.06 5.885 1.28 1.536Zm5.78-5.884 7.062 5.884 1.28-1.536-7.061-5.885-1.28 1.537Zm-.36-.769V24.04h2V9.916h-2Zm11.592-3.53c5.849 5.85 5.849 15.333 0 21.183l1.414 1.414c6.63-6.63 6.63-17.38 0-24.01l-1.414 1.414Zm0 21.183c-5.85 5.849-15.333 5.849-21.182 0l-1.414 1.414c6.63 6.63 17.38 6.63 24.01 0l-1.414-1.414Zm-21.182 0c-5.85-5.85-5.85-15.333 0-21.182L4.973 4.973c-6.63 6.63-6.63 17.38 0 24.01l1.414-1.414Zm0-21.182c5.85-5.85 15.332-5.85 21.182 0l1.414-1.414c-6.63-6.63-17.38-6.63-24.01 0l1.414 1.414Z"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={16.978}
          x2={16.978}
          y1={1}
          y2={32.956}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#00DE62" stopOpacity={0.6} />
          <Stop offset={0} stopColor="#00AF4D" stopOpacity={0.507} />
          <Stop offset={1} stopColor="#007835" stopOpacity={0.4} />
        </LinearGradient>
      </Defs>
    </Svg>
  </Pressable>

)
export default Up
const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    // flex: 1, 
    width: 40,
    height: 40,
    top: height - 170,
    alignSelf: "center",

  }
});
