
import React, { useEffect, useState, useCallback } from 'react';
import { BackHandler, StatusBar, Pressable, TouchableWithoutFeedback, Linking } from 'react-native';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import { Dimensions, PixelRatio } from "react-native"
import Swiper from 'react-native-deck-swiper';
import main from "../../styles/main.js"
import Upvote from '@/assets/icons/upvote.js';
import { useFocusEffect } from 'expo-router';
import { GlobalContext } from '@/Global/globalcontext.js';
import AntDesign from '@expo/vector-icons/AntDesign';


function Cards({ navigation, route }) {
  const { item } = route.params;
  console.log('====================================');
  console.log(item);
  console.log('====================================');
  var isThereTeam = false

  console.log('====================================');
  console.log(item.hiddenInfo.socialProof);
  console.log('====================================');


  var instaurl = item.hiddenInfo.socialProof[0].url
  var LinkedinURl = item.hiddenInfo.socialProof[1].url
  var yturl = item.hiddenInfo.socialProof[2].url

  console.log(instaurl, "a");
  console.log(LinkedinURl, "b");
  console.log(yturl, "c");


  var workarray = item.previousWorkExperience.filter((e) => e.year != null)
  console.log('====================================');
  // console.log(workarray);
  console.log('====================================');

  if (item.teamInfo.length == 0) {
    isThereTeam = false
  }
  else {
    isThereTeam = true
  }


  console.log(isThereTeam, "team stat");

  useFocusEffect(() => {
    StatusBar.setBackgroundColor("#16181a")
  })



  // console.log(item);
  useEffect(() => {

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true; // This prevents the default back action
    });

    return () => backHandler.remove();
  }, []);

  function getfund(fund) {
    if (fund == 69) {
      return 0
    }
    fund = fund - 57
    return (fund * 1000000).toLocaleString("en-IN")
  }



  return (


    // <TouchableWithoutFeedback onPress={() => { showbigcard(item) }} style={{ flex: 1, height: height }}>

    <ScrollView nestedScrollEnabled={true} bounces={false} style={[styles.container]} >
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={{ uri: item.user_id.profilePhoto }}
          style={styles.profileImage}
        />
        <Text
          numberOfLines={1}
          ellipsizeMode='tail'
          style={styles.username}>{item.user_id.userName}</Text>
        <View style={{
          position: "absolute",
          right: 10,
          display: "flex",
          flexDirection: "row",
          gap: 0
        }}>
          {/* <View ><Upvote width={42} height={42} /></View>
          <Text style={styles.followers}>{item.totalUpvotes}</Text> */}
        </View>
      </View>

      {/* Startup Info */}
      <Text style={styles.title}>{item.nameOfStartup}</Text>
      <Text style={styles.subtitle}>Revolutionizing startup ecosystem.</Text>
      <Text style={styles.status}>{item.hiddenInfo.stageOfStartup} - {getfund(item.hiddenInfo.fundingStatus)}</Text>

      {/* <Text style={styles.status}>{item.hiddenInfo.stageOfStartup} stage - {item.hiddenInfo.fundingStatus}</Text> */}

      {/* Goal Section */}
      <Text style={styles.sectionHeader}>Goal: <Text style={styles.text}>
        {item.goal}
      </Text></Text>


      {/* Description Section */}

      <Text style={styles.text}>
        <Text style={styles.sectionHeader}>Description:</Text> {item.description}

      </Text>

      {/* About Founder Section */}
      <Text style={styles.sectionHeader1}>About Founder</Text>
      <Text style={styles.text}><Text style={styles.keys}>Name :</Text> {item.fullName}</Text>
      <Text style={styles.text}><Text style={styles.keys}>Education :</Text>  {item.education}</Text>
      <Text style={styles.text}><Text style={styles.keys}>Skills :</Text> {item.skills}</Text>

      {/* Work Experience */}
      {workarray.length > 0 && <Text style={styles.sectionHeader}> <Text style={styles.keys}>Work Experience :</Text> </Text>}
      {workarray.length > 0 && <View style={styles.workexp}>
        {workarray && workarray.map((work) => {
          return (
            <View >
              <Text style={styles.text1}>Company : {work.company}</Text>
              <Text style={styles.text1}>Role : {work.role}</Text>
              <Text style={styles.text1}>Year : {work.year}</Text>
            </View>
          )
        })}

      </View>}


    

      {isThereTeam && <Text style={styles.sectionHeader1}>About Team</Text>}
      {/* <Text>{JSON.stringify(item.teamInfo)}</Text> */}

      {item.teamInfo && item.teamInfo.map((work, index) => {
        return (
          <View style={styles.teamCard}>
            <Text style={styles.username1}>{work.username ? work.username : work.name}</Text>
            <Text style={styles.text2}>{work.name}</Text>
            <Text style={styles.text2}>{work.role}</Text>
          </View>
        )
      })}


      <View style={{ marginVertical: 30, marginBottom: 80, display: "flex", flexDirection: "row", gap: 20, justifyContent: "center", width: "100%" }}>
        {instaurl != "" && <Pressable onPress={() => Linking.openURL(instaurl)} >
          <AntDesign name="instagram" style={styles.plus1} size={30} color="#bbbbbb" />
        </Pressable>}
        {yturl != "" && <Pressable onPress={() => {
          Linking.openURL(yturl)
        }} >
          <AntDesign name="youtube" style={styles.plus1} size={30} color="#bbbbbb" />
        </Pressable>
        }
        {LinkedinURl != "" && <Pressable onPress={() => Linking.openURL(LinkedinURl)} >
          <AntDesign name="linkedin-square" style={styles.plus1} size={28} color="#bbbbbb" />
        </Pressable>}
      </View>

      {/* Footer */}

      {/* <Text style={styles.footer}>startsy.com</Text> */}
    </ScrollView >
    // </TouchableWithoutFeedback>

  )
}

export default Cards

const { height, width } = Dimensions.get("window");


var a = width / 360;
var b = height / 800;
// console.log(a,b);

const scalingfactor = Math.sqrt(a * b)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(33, 34, 35, 1)',
    backgroundColor : "#16181a",
    paddingHorizontal: 16,
    // maxWidth: width - 30,
    width: "100%",
    margin: "auto",

    // borderRadius: 10,
    paddingTop: 20,
    overflow: "scroll"
  },
  contentContainer: {
    paddingBottom: 80,
    // maxWidth: width,
    // height : height,
    // backgroundColor: "red"
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    color: '#E9E9E9',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: "Alata"
  },
  upvote: {
    marginLeft: "auto",
    marginRight: -2
  },
  followers: {
    color: '#00DE62',
    marginLeft: -10,
    fontSize: 14,
    top: 20,
    fontFamily: "Roboto",

  },
  title: {
    color: '#B8B8B8',
    fontSize: 48,
    // fontWeight: 'bold',
    marginBottom: 4,
    fontFamily: "Alata",


  },
  subtitle: {
    color: '#D9D9D9',
    fontSize: 14,
    marginBottom: 4,
    fontFamily: "Roboto"
  },
  status: {
    color: '#00DE62',
    fontSize: 15,
    marginBottom: 16,
    fontFamily: "Roboto"

  },
  sectionHeader: {
    color: '#D9D9D9',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
    fontFamily: "Roboto"
  },
  sectionHeader1: {
    color: '#B8B8B8',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
    fontFamily: "Alata"
  },
  text: {
    color: '#BEBEBE',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Roboto"

  },
  text1: {
    color: '#BEBEBE',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Roboto",
    fontStyle: "italic",

  },
  teamCard: {
    // backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 2,
    borderColor: "#B8B8B8"
    , maxWidth: "70%",
    borderRadius: 10,
    // padding : 10
  },
  footer: {
    color: '#00DE62',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    fontStyle: "italic"
  },
  keys: {
    fontFamily: "Roboto",
    color: "#D9D9D9",
    fontSize: 14,
    fontWeight: "bold",
  },
  workexp: {
    borderLeftWidth: 2,
    borderLeftColor: "#00DE62",
    paddingLeft: 10,
    marginTop: 10,

  },
  s2: {
    marginTop: 20
  }
  , text2: {
    color: "#B8B8B8",
    borderBottomWidth: 1,
    borderBottomColor: "#B8B8B8",
    marginBottom: 15,
    paddingBottom: 5,
    fontSize: 14
  }
  , username1: {
    color: "#00DE62",
    borderBottomWidth: 1,
    borderBottomColor: "#B8B8B8",
    marginBottom: 15,
    paddingBottom: 5,
    fontSize: 14
  }
});