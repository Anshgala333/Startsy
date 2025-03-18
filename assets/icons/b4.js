import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { View, StyleSheet } from "react-native";
const B4 = (props) => (
  <View style={styles.container}>

  <Svg xmlns="http://www.w3.org/2000/svg" fill="none"  width="60" height="60" viewBox="0 0 60 60">
    <Path
      fill="#00DE62"
      fillRule="evenodd"
      d="M25.206 41.247c8.86 0 16.041-7.182 16.041-16.041 0-8.86-7.182-16.042-16.041-16.042-8.86 0-16.042 7.182-16.042 16.042 0 8.86 7.182 16.041 16.042 16.041Zm0-26.208a10.165 10.165 0 0 0-10.167 10.167 1 1 0 1 0 2 0 8.167 8.167 0 0 1 8.167-8.167 1 1 0 0 0 0-2Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#00DE62"
      strokeLinecap="round"
      strokeWidth={2}
      d="M45.833 45.833 41.25 41.25"
    />
  </Svg>
  </View>

)
export default B4

const styles = StyleSheet.create({
  container: {
    flex: 1,                  // Take up available space
    justifyContent: "center", // Center vertically
    alignItems: "center",     // Center horizontally
  }
});

