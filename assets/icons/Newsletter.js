import * as React from "react"
import Svg, { Path } from "react-native-svg"
const NewsLettericon = ({color = "#828282" , ...props}) => (
  <Svg width={28} height={36} xmlns="http://www.w3.org/2000/svg" fill="none" >
    <Path
      stroke={color}
      strokeLinejoin="round"
      strokeWidth={2}
      d="M23 34V1l-5.5 3.667L12 1 6.5 4.667 1 1v33l5.5-2.75L12 34l5.5-2.75L23 34Z"
    />
    <Path stroke={color} d="M4 11.5h13M4 23.5h13M4 19.5h10M4 15.5h10" />
  </Svg>
)
export default NewsLettericon
