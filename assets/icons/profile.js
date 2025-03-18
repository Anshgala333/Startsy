import * as React from "react"
import Svg, { Path, Ellipse, Circle } from "react-native-svg"
import { View, StyleSheet } from "react-native";
const Profile = (props) => (
  <View style={[styles.container]} >
    <Svg xmlns="http://www.w3.org/2000/svg"   width={120} height={120} fill="none">
      <Path
        stroke="#00DE62"
        strokeLinecap="round"
        strokeWidth={3}
        d="M88.911 99.227c-1.912-5.278-6.126-9.942-11.987-13.27-5.862-3.326-13.044-5.129-20.432-5.129-7.388 0-14.57 1.803-20.431 5.13-5.862 3.327-10.076 7.99-11.988 13.27"
      />
      <Ellipse
        cx={56.492}
        cy={56.096}
        stroke="#00DE62"
        strokeLinecap="round"
        strokeWidth={3}
        rx={16.781}
        ry={16.549}
      />
      <Circle
        cx={57.051}
        cy={57.122}
        r={54.997}
        stroke="#00DE62"
        strokeWidth={3}
      />
    </Svg>
  </View>

)
export default Profile

const styles = StyleSheet.create({
  container: {
    
    flex: 1, 
    marginHorizontal : "auto",              

    justifyContent: "center", 
    alignItems: "center",     
  }
});
