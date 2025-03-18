import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Delete = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}  // Fixed width
    height={26} // Fixed height
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      stroke="#ccc"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12.25 8.875v7.875m-4.5-7.875v7.875M3.25 4.375V17.65c0 1.26 0 1.89.245 2.371.216.423.56.768.983.984.481.245 1.11.245 2.369.245h6.306c1.258 0 1.887 0 2.368-.245.423-.216.768-.56.984-.984.245-.48.245-1.11.245-2.367V4.375m-13.5 0H5.5m-2.25 0H1m4.5 0h9m-9 0c0-1.048 0-1.572.171-1.986A2.25 2.25 0 0 1 6.89 1.171C7.302 1 7.827 1 8.875 1h2.25c1.048 0 1.573 0 1.986.171.551.229.99.667 1.218 1.218.17.414.171.938.171 1.986m0 0h2.25m0 0H19"
    />
  </Svg>
);

export default Delete;
