import React from 'react';
import ContentLoader from 'react-content-loader/native';
import { View } from 'react-native';
import {Rect} from 'react-native-svg';

const Skeleton2 = (props) => {
    return (
        <ContentLoader
            speed={1}
            width={300}
            height={150}
            viewBox="0 0 300 150"
            backgroundColor="#16181a"
            foregroundColor="#ecebeb"
            {...props}
        >
            <Rect x="15" color={"#16181a"} y="10" rx="4" ry="4" width="200" height="100" />
            <Rect x="15" y="30" rx="4" ry="4" width="250" height="10" />
            <Rect x="15" y="50" rx="4" ry="4" width="200" height="10" />
            <Rect x="15" y="70" rx="4" ry="4" width="150" height="10" />
        </ContentLoader>
    )
}

export default Skeleton2;