import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { View, StyleSheet } from "react-native";
const B2 = (props) => (
  <View style={styles.container}>

  <Svg xmlns="http://www.w3.org/2000/svg" fill="none"  width={props.width || 50} height={props.width || 50} viewBox="0 0 60 60">
    <Path
      fill="#00DE62"
      fillRule="evenodd"
      d="M50.15 9.796c.27 1.165.27 2.768.27 5.079v10.333H34.085V11.375a2.5 2.5 0 0 1 2.5-2.5H48.21c.782 0 1.48.36 1.939.921ZM32.086 25.208V11.375a4.5 4.5 0 0 1 4.495-4.5H8.586c-1.886 0-2.828 0-3.414.586-.586.586-.586 1.528-.586 3.414v37.25l6.875-2.292 6.875 2.292 6.875-2.292 6.649 2.217.226-22.842ZM10.46 16.042a1 1 0 0 1 1-1h13.75a1 1 0 1 1 0 2H11.46a1 1 0 0 1-1-1Zm0 9.166a1 1 0 0 1 1-1h4.583a1 1 0 1 1 0 2h-4.583a1 1 0 0 1-1-1Zm0 9.167a1 1 0 0 1 1-1h9.167a1 1 0 1 1 0 2H11.46a1 1 0 0 1-1-1Z"
      clipRule="evenodd"
    />
  </Svg>
  </View>

)


const styles = StyleSheet.create({
  container: {
    flex: 1,                  // Take up available space
    justifyContent: "center", // Center vertically
    alignItems: "center",     // Center horizontally
  }
});
export default B2
