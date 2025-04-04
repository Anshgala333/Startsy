import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { View, StyleSheet } from "react-native";

const Share = ({ width = 30, height = 30, color = "#ccc", ...props }) => (
  <View style={styles.container}>
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 32 32"
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinejoin="round"
      strokeWidth={2}
      d="M30 11.598 14.534 1v6C1 10 1 24 1 24s5.8-8 13.534-7v6.2L30 11.598Z"
    />
  </Svg>
  </View>
);

const styles = StyleSheet.create({
  container: {
    // flex: 1,                  // Take up available space
    justifyContent: "center", // Center vertically
    alignItems: "center",     // Center horizontally
  }
});
export default Share;
