import * as React from "react"
import Svg, { Rect } from "react-native-svg"
const Box = ({color = "#828282" , ...props}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Rect
      width={28}
      height={18}
      x={2.219}
      y={6}
      stroke={color}
      strokeWidth={2}
      rx={1}
    />
    <Rect
      width={28}
      height={18}
      x={14.219}
      y={16}
      stroke={color}
      strokeWidth={2}
      rx={1}
    />
  </Svg>
)
export default Box
