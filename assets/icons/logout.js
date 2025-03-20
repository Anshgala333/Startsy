import * as React from "react"
import Svg, { Path } from "react-native-svg"
import {View} from "react-native"
const Logout = (props) => (
  <Svg
  width="80"
  height="80"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 60 60"
  fill="none"
  {...props}
>
  <Path
    fill="#ccc"
    d="M30 20a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 16a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z"
  />
  <Path
    fill="#ccc"
    d="M45.6 26.6l3.6-3.6-3.6-3.6-3.6 3.6a14.6 14.6 0 0 0-4.8-2L40 15h-8l.8 4a14.6 14.6 0 0 0-4.8 2l-3.6-3.6-3.6 3.6 3.6 3.6a14.6 14.6 0 0 0-2 4.8L15 30v8l4-.8a14.6 14.6 0 0 0 2 4.8l-3.6 3.6 3.6 3.6 3.6-3.6a14.6 14.6 0 0 0 4.8 2L30 45h8l-.8-4a14.6 14.6 0 0 0 4.8-2l3.6 3.6 3.6-3.6-3.6-3.6a14.6 14.6 0 0 0 2-4.8L45.6 30v-8Z"
  />
</Svg>
)
export default Logout
