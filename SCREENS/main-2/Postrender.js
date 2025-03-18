// Postrender.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const RenderItem = ({ item, index, setallpost }) => {


     async function upvotepost(id, index) {
          
    
            // setallpost(allpost.map((e, i) => {
            //     if (i == index) {
            //         var object = { ...e, isliked: !e.isliked, itemlikedcount: e.itemlikedcount + increment }
            //         return object
            //     }
            //     else return e
            // }))
    
            setallpost(prevPosts =>
                prevPosts.map((e, i) => {
                    if (i === index) {
                        return { ...e, isliked: 1, itemlikedcount: e.itemlikedcount + 1 };
                    }
                    return e;
                })
            );
    
            
        }
    
    return (
        <View style={{ padding: 16 }}>
            <Text style={{ color: 'white' }}>{item.title}</Text>
            <TouchableOpacity onPress={() => upvotepost(item.id, index)}>
                <Text style={{ color: 'green' }}>Upvote</Text>
            </TouchableOpacity>
        </View>
    );
};

export const getRenderItem = ({ setallpost }) => ({ item, index }) => (
    <RenderItem item={item} index={index} setallpost={setallpost}/>
);
