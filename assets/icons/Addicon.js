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
const Addicon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G filter="url(#a)">
      <Circle cx={37} cy={37} r={37} fill="url(#b)" />
      <Circle
        cx={37}
        cy={37}
        r={36}
        stroke="#ccc"
        strokeOpacity={0.4}
        strokeWidth={2}
      />
    </G>
    <Path
      stroke="#ccc"
      strokeLinecap="round"
      strokeWidth={4}
      d="M37 22v30m15-15H22"
    />
    <Defs>
      <LinearGradient
        id="b"
        x1={37}
        x2={37}
        y1={0}
        y2={74}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#16181a" stopOpacity={1} />
        <Stop offset={1} stopColor="#16181A" stopOpacity={1} />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default Addicon
