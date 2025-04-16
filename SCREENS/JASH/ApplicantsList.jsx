import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, BackHandler, Pressable, Linking } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Ionicons from '@expo/vector-icons/Ionicons';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import BottomSheetContent from '../JASH/BottomSheetContent.jsx'
import { url } from "../../config.js"
import { useFocusEffect } from 'expo-router';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';




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
        console.log(data.data);


        setdata(data.data)

      }
      catch (err) {
        console.log(err);

      }
    }
    getdata()

  }, [])

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
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      opacity={0.7}
    />
  );







  const snapPoints7 = useMemo(() => ['30%'], []);
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

              <Text style={{ color: "#00de62", fontSize: 11, fontFamily: 'Roboto' }}>
                {item.item.user_id.role === "CommunityMember"
                  ? "Member"
                  : item.item.user_id.role}
              </Text>
            </View>

          </Pressable>
          <Text style={styles.time}>{time(item.item.createdAt)}</Text>

        </View>


        {/* <View style={styles.divider}></View> */}

        <Text
          style={styles.info}
          numberOfLines={null}
          ellipsizeMode="tail"
        >
          {/* <Text>Applicant Description</Text> */}
          {item.item.userDescription}
        </Text>


        {/* <View style={{ marginTop: 16, paddingHorizontal: 16, }}>
          <MaterialCommunityIcons name="certificate" size={32} color="gray" />
        </View> */}

        <View style={styles.contactView}>
          <MaterialCommunityIcons name="certificate" size={30} color="#828282" />
          <TouchableOpacity
            onPress={() => open(item.item.user_id.userName, item.item.user_id.email, item.item.user_id.contactInfo)}
            // style={styles.contact}
            style={{ display: "flex" }}
          >

            <FontAwesome6 name="contact-card" size={24} color="#828282" />
            {/* <Text style={{ color: "#16181a", fontFamily: "Alata", fontSize: 14 }}>
              Contact
            </Text> */}
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
        {/* <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <FontAwesome6 name="chevron-left" size={25} style={{ alignSelf: 'flex-start', marginLeft: 6, marginTop: -6 }} color="#00DF60" />
          </Pressable>
          <View style={styles.headerCenter}>
            <Text style={styles.title}>Applicants</Text>
          </View>
        </View> */}

        <View style={styles.header}>
          <View style={styles.headerSide}>
            <Pressable onPress={() => navigation.goBack()}>
              <FontAwesome6 name="chevron-left" size={25} style={styles.backIcon} color="#00DF60" />
            </Pressable>
          </View>

          <View style={styles.headerCenter}>
            <Text style={styles.title}>Applicants</Text>
          </View>

          <View style={styles.headerSide} />
        </View>
        {data && data.length == 0 &&

          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: -50, }}>
            <Text style={styles.noConnection}>No Applicants</Text>
          </View>

        }
        {data && data.length > 0 && <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            // <View></View>
            <RenderItem item={item} />
          )} />}

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
    borderBottomColor: "#666",
    borderBottomWidth: 1

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
    textAlign: "center",
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
    width: '100%',
    marginBottom: 10

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 16,


  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 12,
  },
  role: {
    fontFamily: "Roboto",
    fontSize: 11,
    color: "#00DE62"
  },
  date: {
    fontSize: 12,
    color: '#666',
    fontFamily: "Roboto",
    marginTop: -10,
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
    // marginTop: 16,
    lineHeight: 20,
    marginHorizontal: 16,
    color: "#ccc",
    fontSize: 16,
    // textAlign: 'justify'
  },

  contactView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
    display: "flex",
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

    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#ccc'
  },
  noConnection: {
    textAlign: "center",
    color: "#666",
    alignSelf: "center",
    justifyContent: "center",
    elevation: 100,
    bottom: 0,
    fontSize: 16,
    marginTop: -50
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    color: "#E9E9E9",
    fontFamily: "Alata",
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    marginBottom: 20,
    borderBottomColor: "#24272A",
  },

  headerSide: {
    width: 40, // same width as the icon button area
    alignItems: "flex-start",
    justifyContent: "center",
  },
  time: {
    width: 100,
    textAlign: "right",
    color: "#666",
    fontSize: 10,
    fontFamily: "Roboto",
  }


});



export default ApplicantsList



