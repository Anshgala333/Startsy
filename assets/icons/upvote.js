import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import { View, StyleSheet } from "react-native";

const Upvote = ({ dt, selected, width = 32, height = 34, color = "#ccc", style, ...props }) => {

  // if(dt){
  //   color = "#00de62"
  // }
  // else if(selected){
  //   color == "#ccc"
  // }
  // else {
  //   color = "#00de62"
  // }

  if(selected){
    color = "#ccc"
  }
  return (
    <View style={[styles.container, style]} >

      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 40 40"
        fill="none"
        {...props}
      >
        <G>
          <Path
            fill={selected == true ? "#ccc" : "transparent"}
            // stroke={selected == true ? "#00de62" : "#ccc"}
            stroke={color}

            strokeWidth={2}
            d="M13.011 30.04V16.02H5.483a.2.2 0 0 1-.142-.342L19.02 2l13.678 13.678a.2.2 0 0 1-.142.341h-7.528v14.02"
          />
          {!selected && <Path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21.742 33.054 1.557-1.46m0 0 1.558 1.46m-1.558-1.46v3.504M17.46 29.936l1.558-1.46m0 0 1.558 1.46m-1.558-1.46v3.505M13.188 33.054l1.557-1.46m0 0 1.557 1.46m-1.557-1.46v3.504"
          />}
        </G>
      </Svg>
    </View>
  )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,                  // Take up available space
    justifyContent: "center", // Center vertically
    alignItems: "center",     // Center horizontally
  }
});
export default Upvote;
