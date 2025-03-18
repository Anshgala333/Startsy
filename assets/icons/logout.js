import * as React from "react"
import Svg, { Path } from "react-native-svg"
import {View} from "react-native"
const Logout = (props) => (
    <Svg  width="80" height="80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" fill="none" {...props}>
      <Path
        fill="#ccc"
        d="m2 12-.78-.625-.5.625.5.625L2 12Zm9 1a1 1 0 1 0 0-2v2ZM5.22 6.375l-4 5 1.56 1.25 4-5-1.56-1.25Zm-4 6.25 4 5 1.56-1.25-4-5-1.56 1.25ZM2 13h9v-2H2v2Z"
      />
      <Path
        stroke="#ccc"
        strokeWidth={2}
        d="M10 8.132v-.743c0-1.619 0-2.428.474-2.987.474-.56 1.272-.693 2.868-.96l1.672-.278c3.243-.54 4.864-.81 5.925.088C22 4.151 22 5.795 22 9.082v5.835c0 3.288 0 4.932-1.06 5.83-1.062.9-2.683.63-5.926.089l-1.672-.279c-1.596-.266-2.394-.399-2.868-.958C10 19.039 10 18.229 10 16.61v-.545"
      />
    </Svg>
)
export default Logout
