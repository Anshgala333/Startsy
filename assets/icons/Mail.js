import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"
const Mail = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Rect
      width={35}
      height={26.25}
      x={1}
      y={1}
      stroke="#00DE62"
      strokeWidth={2}
      rx={2}
    />
    <Path
      stroke="#00DE62"
      strokeWidth={2}
      d="m1 7.563 16.606 8.302a2 2 0 0 0 1.788 0L36 7.562"
    />
  </Svg>
)
export default Mail
