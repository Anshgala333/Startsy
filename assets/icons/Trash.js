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
const Trash = (props) => (
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
      strokeLinejoin="round"
      strokeWidth={3}
      d="M22.664 27.294h26.667M30.997 22h10m-8.333 22.941V34.353m6.667 10.588V34.353M41.83 52H30.164c-1.84 0-3.333-1.58-3.333-3.53l-.761-19.338c-.04-1.002.717-1.838 1.665-1.838H44.26c.948 0 1.705.836 1.665 1.838l-.76 19.339c0 1.949-1.493 3.529-3.334 3.529Z"
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
export default Trash
