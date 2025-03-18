import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Banner = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      stroke="#16181A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m8.78 29.657 12.832-12.078 6.04 6.039M8.778 29.657h15.098a4.53 4.53 0 0 0 4.53-4.53V17.58M8.778 29.657a4.53 4.53 0 0 1-4.529-4.53V10.03A4.53 4.53 0 0 1 8.78 5.5h9.813m8.303 7.29V8.52m0 0V4.25m0 4.27h-4.27m4.27 0h4.27M13.31 12.295a2.265 2.265 0 1 1-4.53 0 2.265 2.265 0 0 1 4.53 0Z"
    />
  </Svg>
)
export default Banner
