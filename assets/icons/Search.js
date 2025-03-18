import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width ? props.width : 24}
    height={props.width ? props.width : 24}
    // height={24}
    fill="none"
    {...props}
  >
    <Circle cx={11} cy={11} r={7} stroke="#828282" strokeWidth={2} />
    <Path
      stroke="#828282"
      strokeLinecap="round"
      strokeWidth={2}
      d="M11 8a3 3 0 0 0-3 3M20 20l-3-3"
    />
  </Svg>
)
export default SvgComponent
