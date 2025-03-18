import { useFocusEffect, useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Pressable, BackHandler, RefreshControl } from 'react-native';
import { CircularProgress } from 'react-native-circular-progress';
import AntDesign from '@expo/vector-icons/AntDesign';
import { url } from "../../config.js"

const JobsPostedScreen = ({ route, navigation }) => {
  // const navigation = useNavigation();
  const { token } = route.params
  console.log(token);

  useFocusEffect(
    useCallback(() => {
      f1()
    }, [])
  )

  // var data = [];
  const [data, setdata] = useState([])
  async function f1() {
    try {
      const response = await fetch(
        `${url}posts/getPostedJobs`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      // console.log(result.data);
      console.log(result.data[0]);
      setdata(result.data)

    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {

    f1()
  }, [])

  useFocusEffect(() => {
    console.log("job");

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate("Startsy")
      return true

    });

    return () => backHandler.remove();
  })





  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: () => <Text style={styles.headerTitle}>Manage Posts</Text>,
  //     // headerStyle: styles.headerStyle,
  //   });
  // }, [navigation]);

  const Button = ({ onPress, isDisabled, title }) => (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: isDisabled ? 'transparent' : 'transparent' }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: isDisabled ? '#ddd' : '#ccc' }]}>{title}</Text>
    </TouchableOpacity>
  );
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

  const renderItem = ({ item }) => (
    <View style={styles.post}>
      <Text style={styles.jobTitle}>{item.jobPosts.role}</Text>
      <Text style={styles.company}>{item.jobPosts.duration}</Text>

      <Text style={styles.status}>
        {time(item.jobPosts.updatedAt)}
      </Text>
      {/* <Text style={styles.stats}>{item.jobPosts.jobApplicants.length} applicants</Text> */}
      <Text style={styles.jobType}>{item.jobPosts.pay}</Text>

      {/* <View>
        <Text style={styles.descriptionTitle}>Job Description</Text>
        <Text style={styles.descriptionText} numberOfLines={2} ellipsizeMode="tail">
          {item.jobPosts.description}
        </Text>
      </View> */}

      <View style={styles.buttonContainer}>
        <Button onPress={() => navigation.navigate('ApplicantsList', { Applicants: item.jobPosts?.jobApplicants, token: token, navigation: navigation })} isDisabled={false} title={`${item.jobPosts.jobApplicants.length} Applicants`} />
        {/* <Button onPress={() => console.log('Disable Job Clicked')} isDisabled={true} title={'Disable Job'} /> */}
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, minHeight: 700 }}>
      <View><Text allowFontScaling={false} style={styles.headerText}>Your Jobs</Text></View>

      {data.length == 0 &&
        <Pressable onPress={() => { navigation.navigate("Jobpost") }} style={styles.noparent}>
          <AntDesign style={styles.plus} name="pluscircleo" size={77} color="#ccc" />
          <Text style={styles.noJobtext1}>No active jobs</Text>
        </Pressable>
      }

      {data.length > 0 && <FlatList

        style={styles.container}
        data={data}
        contentContainerStyle={{paddingBottom : 100}}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />}
    </View>
  );
};

const styles = StyleSheet.create({
  // headerStyle: {
  //   backgroundColor: '#00de62',
  // },
  headerTitle: {
    fontSize: 20,
    // fontWeight: 'bold',
    // color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#16181a',
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom : 50,
  },
  post: {
    // backgroundColor: '#1e1e1e',
    backgroundColor: "rgba(33, 34, 35, 0.5)",

    marginVertical: 12,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
  },
  jobTitle: {
    color: "#999",
    fontSize: 28,
    marginBottom: 10,
    marginTop : 10,
    // color: '#fff',
    marginBottom: 4,
  },
  company: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 4,
  },
  status: {
    fontSize: 11,
    color: '#ccc',
    marginBottom: 4,
    position: "absolute",
    right: 10,
    top: 15
  },
  active: {
    color: '#00de62',
    fontWeight: 'bold',

  },
  stats: {
    fontSize: 12,
    color: '#bbb',
    marginBottom: 4,
  },
  jobType: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: '#ddd',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 25,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 6,
    elevation: 3,
    borderWidth : 1,
    borderColor : "#ccc"
  },
  buttonText: {
    fontSize: 14,
    // fontWeight: 'bold',
    color : "#ccc"
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#00DE62",
    // marginBottom: -12,
    backgroundColor: "#16181a",
    fontFamily: "myanmar",
    color: "#00DE62",
    paddingLeft: 25
  },
  noparent: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#16181a", width: "100%",

  },
  noJobtext1: {
    textAlign: "center",
    color: "#ccc",
    fontSize: 30
  },
  plus: {
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 20,
    marginTop: -100
  }
});

export default JobsPostedScreen;
