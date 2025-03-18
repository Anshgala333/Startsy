import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
import { View, StyleSheet } from "react-native";

const B1 = (props) => (
  <View style={styles.container}>
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" width="50" height="50" viewBox="0 0 60 60">
      <Circle cx={27.503} cy={20.628} r={9.167} fill={props.color ? props.color : "#00de62"}
      />
      <Circle cx={38.961} cy={20.625} r={6.875} fill={props.color ? props.color : "#00de62"}
      />
      <Circle cx={16.039} cy={20.625} r={6.875} fill={props.color ? props.color : "#00de62"}
      />
      <Path
        fill={props.color ? props.color : "#00de62"}
        fillRule="evenodd"
        d="M40.26 41.247h6.758c.592 0 1.047-.508.94-1.09-.521-2.862-2.51-10.368-9.001-10.368-2.031 0-3.621.734-4.863 1.831 3.455 2.242 5.242 6.168 6.165 9.627ZM20.904 31.62c-1.242-1.097-2.832-1.83-4.863-1.83-6.492 0-8.48 7.505-9.002 10.367-.106.582.349 1.09.94 1.09h6.76c.923-3.46 2.71-7.385 6.165-9.627Z"
        clipRule="evenodd"
      />
      <Path
        fill={props.color ? props.color : "#00de62"}
        d="M27.497 32.086c9.574 0 11.149 9.6 11.408 12.757.045.55-.397.993-.95.993H17.04c-.552 0-.994-.443-.949-.993.259-3.158 1.833-12.757 11.407-12.757Z"
      />
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

export default B1;
