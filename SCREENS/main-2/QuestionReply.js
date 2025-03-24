import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Modal, Button, FlatList, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from '@expo/vector-icons/AntDesign';
import Svg, { Path } from 'react-native-svg';
import Ionicons from '@expo/vector-icons/Ionicons';
import { url } from '@/config.js';


const QuestionReply = ({ route }) => {
    const [name, setName] = useState("")
    const [question, setQuestion] = useState("");
    const [inputValue, setInputValue] = useState('');
    const [commenttext, setreply] = useState('');
    const [uploadingcomment, setuploadingcomment] = useState(false);
    const [allcomment, setallcomments] = useState([]);


    const { data, token } = route.params;

    // console.log(data);
    // useEffect(() => {
    //     console.log(params);
    //     setName(params.name);
    //     setQuestion(params.description);
    // }, []);


    useEffect(() => {
        var id = data._id
        console.log(id);
        // return

        async function getComment() {
            try {
                const response = await fetch(`${url}posts/getComments/${id}`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                console.log(data.data[0].userId);

                setallcomments(data.data);
                if (data.data.length == 0) {
                    // setemptycomment(true);
                } else {
                    // setemptycomment(false);
                }
            } catch (err) {
                console.log(err);
            }
        }
        getComment()

    }, [])


    const CurvedLine = () => (
        <Svg height="80" width="30" style={{ position: 'absolute', top: '20%', left: '2%', zIndex: -1, height: 100 }}>
            <Path d="M10 0 V30 Q10 40, 20 40" stroke="#ccc" strokeWidth="2" fill="none" />
        </Svg>
    );

    async function docomment() {

        let postid = data._id
        setuploadingcomment(true);
        if (commenttext.trim() == "") {
            setuploadingcomment(false);
            return
        }
        console.log(commenttext);
        // return
        try {
            const response = await fetch(`${url}posts/createComment/${postid}`, {
                method: 'POST',
                body: JSON.stringify({ comment: commenttext , message : 'Answered Your Question' }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            // data.newComment = {...data.newComment , }
            data.newComment = {
                ...data.newComment,
                userId: {
                    profilePhoto: data.profilePhoto, userName: data.userName
                }
            }
            console.log(data.newComment);

            setreply("")





            setallcomments([data.newComment, ...allcomment])

            // var object = {
            //     comment: commenttext,
            //     createdAt: new Date(),
            //     userId: {
            //         profilePhoto: data.profilePhoto,
            //         userName: data.userName,
            //     }
            // };

            // console.log(object)
            // var newarray = [...allcomments];
            // newarray.unshift(object);
            // setallcomments(newarray);

            // const scrollToTop = () => {
            //     flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
            // };
            // scrollToTop();
            // scrollToTop();
        } catch (err) {
            console.log(err);
        } finally {
            setuploadingcomment(false);
        }
    }



    return (
        <View style={{ flex: 1, backgroundColor: '#16181a' }} >
            <FlatList
                ListHeaderComponent={

                    <LinearGradient style={styles.item} colors={["rgba(33, 34, 35, 0.4)", "rgba(25, 26, 27, 0.6)"]}>
                        <View style={{ flexDirection: 'row', gap: 10, padding: 10 }}>
                            <Image source={require('../../assets/images/logo.png')} style={{ width: 40, height: 40, borderRadius: 30, borderWidth: 1, borderColor: "#333", padding: 5,  }} />
                            <Text style={styles.userNameStyle}>Anonymous</Text>
                        </View>

                        {/* question section */}
                        <View style={{ paddingHorizontal: 10, gap: 0 }}>
                            <Text style={styles.QuestionContent} ellipsizeMode='tail' >
                                {data.content}
                            </Text>
                        </View>


                        {/* <View style={styles.replyContainer}>
                            <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                                <AntDesign name="hearto" size={24} color="white" />

                            </View>
                            <TouchableOpacity >
                                <Text style={{ color: 'white' }}>send</Text>

                            </TouchableOpacity>
                        </View> */}


                    </LinearGradient>

                }
                data={allcomment}
                renderItem={({ item }) => {
                    function time(time) {

                        var data1 = new Date(time)

                        var seconds = Math.floor((new Date() - data1) / 1000);

                        var interval = seconds / 31536000;

                        if (interval > 1) {
                            return Math.floor(interval) + " years ago";
                        }
                        interval = seconds / 2592000;
                        if (interval > 1) {
                            return Math.floor(interval) + " months ago";
                        }
                        interval = seconds / 86400;
                        if (interval > 1) {
                            return Math.floor(interval) + " days ago";
                        }
                        interval = seconds / 3600;
                        if (interval > 1) {
                            return Math.floor(interval) + " hours ago";
                        }
                        interval = seconds / 60;
                        if (interval > 1) {
                            return Math.floor(interval) + " minutes ago";
                        }
                        return Math.floor(seconds) + " seconds ago";
                    }
                    return (
                        <View style={[styles.listItem, styles.commentContainer]} >

                            <View style={{ flexDirection: 'row', gap: 10, padding: 10 }}>
                                <Image source={{ uri: item.userId.profilePhoto }} style={{ width: 30, height: 30, borderRadius: 30 }} />
                                <Text style={styles.userNameStyle1}>{item.userId.userName}</Text>
                                <Text style={styles.time}>{time(item.createdAt)}</Text>
                            </View>
                            <View style={styles.replyLine} />
                            {/* reply section */}
                            <View style={{ paddingHorizontal: 50, paddingBottom: 10 }}>
                                <Text style={styles.replyText} ellipsizeMode='tail' >
                                    {item.comment}
                                </Text>
                            </View>
                        </View>

                    )
                }
                }
            />
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, borderColor: '#ccc' }}>
                <TextInput
                    style={{
                        borderColor: 'white', borderWidth: 1, height: 40, flex: 1, padding: 10, color
                            : "#ccc", borderRadius: 10
                    }}
                    placeholder='Reply'
                    placeholderTextColor={"#ccc"}
                    value={inputValue}
                    onChangeText={setInputValue}
                />
                <Pressable onPress={() => console.log("hello")
                } style={{ marginLeft: 10, padding: 10, backgroundColor: '#ccc', borderRadius: 5 }}>
                    <Text style={{ color: '#000' }}>Send</Text>
                </Pressable>
            </View> */}

            <View style={{ zIndex: 100000 }} >
                <View style={styles.searchContainer}>
                    <TextInput
                        allowFontScaling={false}
                        multiline={true}
                        style={styles.searchInput}
                        placeholder="Reply"
                        placeholderTextColor="#828282"
                        // onBlur={() => setkeyboardstatus(false)}
                        onChangeText={(val) => setreply(val)}
                        value={commenttext}


                    />



                </View>

                <TouchableOpacity
                    // onTouchStart={() => { inputRef.current.focus(); }}
                    style={styles.send}
                    onPress={docomment}
                >
                    {uploadingcomment && <ActivityIndicator size={24} color="#00de62" />}
                    {!uploadingcomment && <Ionicons name="send" size={24} color="#ccc" />}
                </TouchableOpacity>
            </View>

        </View>
    )




}






const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        // paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 10,
        gap: 10
    },
    item: {
        // padding: 15,
        gap: 10,
        // backgroundColor: '#f9f9f9',
        marginVertical: 5,
        borderRadius: 5,
        paddingBottom: 10,
        borderBottomColor: '#24272A',
        borderBottomWidth: 1,
        marginBottom: 10,
        // backgroundColor: "#24272A"
    },
    replyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 5,
        paddingTop: 8,
        paddingHorizontal: 10,
        borderTopColor: 'white',
        borderTopWidth: 1
    },
    listItem: {
        gap: 10,
        flex: 1,
        // backgroundColor: '#f9f9f9',
        marginVertical: 5,
        borderRadius: 5,

    },
    totalRepliesText: {
        alignItems: 'center',
        fontSize: 12,
        paddingTop: 5,
        color: 'gray'

    },
    userNameStyle: {
        // fontWeight: 'bold',
        color: '#ccc',
        fontSize: 16,
        verticalAlign: "middle"
        , fontFamily: "Alata"
    },
    userNameStyle1: {
        // fontWeight: 'bold',
        color: '#ccc',
        fontSize: 16,
        verticalAlign: "middle"
        , fontFamily: "Alata"
    },
    replyLine: {
        width: 1,
        backgroundColor: '#00de62',
        position: 'absolute',
        left: 24,
        top: 15,
        bottom: 5,
        zIndex: -1
    },
    QuestionContent: {
        textAlign: "left",
        width: "92%",
        paddingHorizontal: 5,
        marginVertical: 0,
        color: "#ccc",
        fontSize: 16,
    },
    replyText: {
        textAlign: "left",
        width: "92%",
        marginTop: -10,
        // paddingHorizontal: 5,
        // marginVertical: 10,
        color: "#ccc",
        fontSize: 13,
        // letterSpacing : 2
    },
    time: {
        position: "absolute",
        right: 20,
        top: 22,
        color: "#ccc",
        fontSize: 10
    },
    searchContainer: {
        marginHorizontal: "auto",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        display: "flex",
        // height: 100,
        width: "95%",
        backgroundColor: "#16181a",
        borderColor: "#ccc",
        borderWidth: 1,
        // position : "absolute",
        borderRadius: 30,
        // bottom: 0,
        justifyContent: "flex-start",

    },
    searchInput: {
        height: "auto",
        minHeight: 50,
        width: "85%",
        justifyContent: "flex-start",
        right: 0,
        alignSelf: "flex-start",

        // borderColor: "#00DE62",

        // borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 20,
        color: "#bbbbbb",
        fontFamily: "Roboto",
        fontSize: 18,
        maxHeight: 100,
    },
    send: {
        // width: 20,
        // height: 20,
        position: "absolute",
        elevation: 10000,
        zIndex: 100000,
        top: 14,
        right: 30,
        transform: [{ scale: 1.1 }],
        alignSelf: "center",
        verticalAlign: "center",
        bottom: 0,
    },
});

export default QuestionReply