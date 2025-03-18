

import * as React from "react";
import Svg, { G, Path ,Circle} from "react-native-svg";
import { View, StyleSheet } from "react-native";

const Useradd = ({ width = 32, height = 32, color = "#00DE62", style, ...props }) => (
  <View style={[styles.container, style]} >
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      fill="none"
      {...props}
    >
      <Path
        fill={color}
        fillRule="evenodd"
        d="M17.616 18a13.214 13.214 0 0 0-3.618-.5c-2.311 0-4.558.593-6.392 1.688-1.458.87-2.59 2.02-3.294 3.327-.285.53.066 1.147.655 1.27l.87.18A40 40 0 0 0 18 24.608V24h-1.667a3 3 0 1 1 0-6h1.284Z"
        clipRule="evenodd"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeWidth={2.5}
        d="M21 16.336v9.333M25.664 21h-9.333"
      />
      <Circle cx={13.997} cy={9.333} r={5.833} fill={color} />
    </Svg>
  </View>
);




const styles = StyleSheet.create({
  container: {
    flex: 1,                  // Take up available space
    justifyContent: "center", // Center vertically
    alignItems: "center",     // Center horizontally
  }
});
export default Useradd;

