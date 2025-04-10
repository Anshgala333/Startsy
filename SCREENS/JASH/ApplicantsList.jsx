import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, BackHandler, Pressable, Linking } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Ionicons from '@expo/vector-icons/Ionicons';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import BottomSheetContent from '../JASH/BottomSheetContent.jsx'
import { url } from "../../config.js"

import { useFocusEffect } from 'expo-router';
// import { LinearGradient } from 'react-native-svg';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';
// import { navigate } from 'expo-router/build/global-state/routing.js';
const ApplicantsList = ({ route, navigation }) => {

  const { Applicants, token, jobId } = route.params

  const [data, setdata] = useState()


  useEffect(() => {
    async function getdata() {
      try {
        const response = await fetch(`${url}posts/getAppliedJobApplicants`, {
          method: 'POST',
          body: JSON.stringify({ jobPostIds: Applicants, jobId: jobId }),
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await response.json();
        

        console.log("daaaaaaaaaaaaaattttaaaa",data.data);
        


        setdata(data.data)

      }
      catch (err) {
        console.log(err);

      }
    }
    getdata()

  }, [])

  // const snapPoints = useMemo(() => ['20%'], []);
  const bottomSheetRefApplicant = useRef(null);
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [onthispage, setonthispage] = useState(false)


  useFocusEffect(useCallback(() => {
    setonthispage(true)
  }, []))

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      setonthispage(false)
    });

    return () => backHandler.remove();
  }, []);
  // let selectedRef = useRef("")
  const open = (name, email, phone) => {

    setName(name)
    setEmail(email)
    setPhone(phone)

    setTimeout(() => {
      bottomSheetRefApplicant.current?.expand();
    }, 250)


  };
  const renderBackdrop = (props) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1} // Backdrop disappears when BottomSheet is closed
      appearsOnIndex={0} // Backdrop appears when BottomSheet is open
      opacity={0.7} // Set opacity for the backdrop
    />
  );
  const openDialer = (phoneNumber) => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = `telprompt:${phoneNumber}`;
    } else {
      number = `tel:${phoneNumber}`;
    }
    Linking.openURL(number);
  };




  const openEmail = (email) => {
    Linking.openURL(`mailto:${email}`);
  }
  const snapPoints7 = useMemo(() => ['30%'], []);


  const RenderItem = (item) => {

    return (


      <LinearGradient
        style={styles.card}
        colors={["rgba(36, 39, 42 , 0.4)", "rgba(22, 24, 26 , 0.6)"]}
        locations={[0, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.header}>
          <Pressable
            onPress={() => {
                navigation.navigate("Singleprofilepage", {
                    token: token,
                    id: item.item.user_id._id,
                    page: "bell",
                });
            }}
            style={{ display: "flex", flexDirection: "row", }}
          >
            <Image
              source={{ uri: item.item.user_id.profilePhoto }}
              style={styles.image}
            />

            <View style={{ justifyContent: "center", }}>
              <AutoSizeText
                numberOfLines={1}
                fontSize={20}
                mode={ResizeTextMode.max_lines}
                ellipsizeMode="tail"
                style={styles.name}
              >
                {item.item.user_id.userName}
              </AutoSizeText>

              <Text style={{ color: "#00de62", fontSize: 12, fontFamily: 'Roboto' }}>
                {item.item.user_id.role === "CommunityMember"
                  ? "Member"
                  : item.item.user_id.role}
              </Text>
            </View>

          </Pressable>

          {/* <Text style={styles.date}>{time(item.requestDate)}</Text> */}
        </View>


        <View style={styles.divider}></View>



        <Text
          style={styles.info}
          numberOfLines={null}
          ellipsizeMode="tail"

        >
          {item.item.userDescription}
        </Text>


        <View style={{ marginTop: 16, paddingHorizontal: 16, }}>
          <MaterialCommunityIcons name="certificate" size={32} color="gray" />
        </View>





        <View style={styles.contactView}>
          <TouchableOpacity
            onPress={() => open(item.item.user_id.userName, item.item.user_id.email, item.item.user_id.contactInfo)}

            style={styles.contact}
          >
            <Text style={{ color: "#16181a", fontFamily: "Alata" }}>
              Contact
            </Text>
          </TouchableOpacity>
        </View>

      </LinearGradient>
    );
  }



  const OpenBottomSheet = () => (
    <BottomSheet
      overlayColor="rgba(0, 0, 0, 0.9)"
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: '#16181a', borderRadius: 30 }}
      handleIndicatorStyle={{ backgroundColor: '#00de62' }}
      // style={{ zIndex: 100000, elevation: 1000 }}
      enableDynamicSizing={false}
      ref={bottomSheetRefApplicant}
      snapPoints={snapPoints7}

      index={-1}
    >
      <Text style={{ textAlign: 'center', color: 'white' }}>Connect to {name}</Text>

      <BottomSheetContent name={name} email={email} phone={phone} />
    </BottomSheet>
  );


  return (
    <GestureHandlerRootView>
      <View style={{ backgroundColor: "#16181a", flex: 1, paddingHorizontal: 10 }}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <FontAwesome6 name="chevron-left" size={25} style={{ alignSelf: 'flex-start', marginLeft: 6, marginTop: -6 }} color="#00DF60" />
          </Pressable>
          <Text allowFontScaling={false} style={styles.headerText}>Applicants</Text>
        </View>
        <FlatList

          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            // <View></View>
            <RenderItem item={item} />
          )} />

      </View>
      {onthispage && <OpenBottomSheet />}
    </GestureHandlerRootView>
  )
}





const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
    //paddingVertical: 15,
  },
  page: {
    backgroundColor: 'black'
  },
  groupName: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "white"
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    color: "gray",
  },
  listContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    // backgroundColor: "#666",
    borderBottomColor: "#666",
    borderBottomWidth: 1
    // marginVertical: 5,
    // borderRadius: 10,
  },
  toggleFollow: {

    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  userInfoStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#00DE62",
    marginBottom: 12,
    backgroundColor: "#16181a",
    fontFamily: "myanmar",
    color: "#00DE62",
    paddingLeft: 15
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    // padding: 16,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.3,
    // shadowRadius: 5,
    // elevation: 8,
    width: '100%',
    // marginHorizontal:10,
    marginBottom: 10

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginBottom: 8,
    marginHorizontal: 16,
    marginTop: 16,


  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  role: {
    fontSize: 24,
    color: '#E9E9E9',
    flex: 1,
    fontFamily: "Roboto"
  },
  date: {
    fontSize: 12,
    color: '#666',
    // position: "absolute",
    // right: 0,
    // top: 20,
    fontFamily: "Roboto",
    // alignSelf: "center",
    marginTop: -10,
    // backgroundColor : "red"
  },
  name: {
    fontSize: 32,
    color: '#B8B8B8',
    // fontWeight: 'bold',
    // marginBottom: 8,
    fontFamily: "Roboto",
    // backgroundColor: "red"
  },
  info: {
    color: "gray",
    // backgroundColor:'red',
    fontSize: 14,
    marginTop: 16,
    lineHeight: 20,
    marginHorizontal: 16,
    fontFamily: 'Roboto'
    // textAlign: 'justify'
  },

  contactView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 30,
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 16
  },
  buttonAccept: {
    backgroundColor: 'transparent',
    borderRadius: 30,
    paddingVertical: 0,
    paddingHorizontal: 20,
    height: 41,
    width: 150,
    borderWidth: 2,
    borderColor: "#B8B8B8",
    justifyContent: "center",
    alignItems: "center",

  },

  buttonText: {
    fontSize: 18,
    color: '#00DE62',
    // fontWeight: 'bold',
    fontFamily: "Alata",
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: -5
  },
  no: {
    textAlign: "center",
    color: "#666",
    alignSelf: "center",
    justifyContent: "center",
    // position : "absolute",
    elevation: 100,
    bottom: 0,
    // fontFamily: "Roboto",
    fontSize: 16,
    paddingTop: 300,
    alignSelf: "center",
  },
  divider: {
    width: "100%",

    height: 1,

    marginTop: 16,
    backgroundColor: "#24272A"
  },

  contact: {

    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#ccc'
  },

});



export default ApplicantsList




