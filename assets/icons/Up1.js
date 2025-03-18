import * as React from "react"
import Svg, {
  G,
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const Up1 = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G filter="url(#a)">
      <Circle cx={33.5} cy={33.5} r={33.5} fill="red" />
      <Circle
        cx={33.5}
        cy={33.5}
        r={32.5}
        stroke="#00DE62"
        strokeOpacity={0.4}
        strokeWidth={2}
      />
    </G>
    <G filter="url(#c)">
      <Path
        fill= {props.selected == true ? "#00de6280" : "transparent"}
        stroke="#00DE62"
        strokeWidth={2}
        d="M25.857 46V30.5h-8.374a.2.2 0 0 1-.142-.341L32.5 15l15.159 15.159a.2.2 0 0 1-.142.341h-8.374V46"
      />
    </G>
    <Path
      stroke="#00DE62"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m35.516 49.341 1.722-1.614m0 0 1.722 1.614m-1.722-1.614v3.875M30.773 45.888l1.723-1.615m0 0 1.722 1.615m-1.722-1.615v3.875M26.047 49.341l1.722-1.614m0 0 1.722 1.614m-1.722-1.614v3.875"
    />
    <Defs>
      <LinearGradient
        id="b"
        x1={33.5}
        x2={33.5}
        y1={0}
        y2={67}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#24272A" stopOpacity={0.6} />
        <Stop offset={1} stopColor="#16181A" stopOpacity={0.4} />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default Up1
