import React, { useCallback, useState , useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import Upvote from "@/assets/icons/upvote.js";
import Share from "@/assets/icons/share.js";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from '@expo/vector-icons/FontAwesome';




const Test1 = () => {
  const [posts, setPosts] = useState(Array.from({ length: 20 }, (_, i) => `Post ${i + 1}`));
  const [minHeight, setMinHeight] = useState(1900);
  const [tabIndex, setTabIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const Tab = createMaterialTopTabNavigator();

  
const AboutTab = () => {

  useFocusEffect(
    useCallback(() => {
      handleTabChange(1)
    })
  )
  return (



    <View style={styles.tabContent}>
      <Text style={styles.contentText}>This is the About section with scrollable content.</Text>
      <Text style={styles.contentText}>Add more content here as needed.</Text>
    </View>
  )
}


  const PostsTab = ({ posts, isLoading }) => {

    useFocusEffect(
      useCallback(() => {
        handleTabChange(1)
      })
    )


    return (
      <View>
        {posts.map((item) => {
          return (
            <Text style={{
              height: 50,
              fontSize: 20
            }}>{item}</Text>
          )

        })}
      </View>
    );
  };


  useEffect(() => {
    console.log(minHeight); // Log after state updates
  }, [minHeight]);

  
  const loadMorePosts = () => {
    console.log(tabIndex);
    
    if (isLoading) return;
    if (tabIndex == 0) return;
    console.log('====================================');
    console.log("new post will come qlwijwei ");
    console.log('====================================');

    setIsLoading(true);
    setTimeout(() => {
      const newPosts = Array.from(
        { length: 10 },
        (_, i) => `Post ${posts.length + i + 1}`
      );
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setIsLoading(false);
      setMinHeight(minHeight + 500)

      console.log('====================================');
      console.log(posts);
      console.log(minHeight);
      
      console.log('====================================');
      // setMinHeight(minHeight + 500); // Adjust minHeight for new posts
    }, 2000); // Simulate API delay
  };

  const routes = [
    { key: 'about', title: 'About' },
    { key: 'posts', title: 'Posts' },
  ];

  const renderScene = SceneMap({
    about: AboutTab,
    posts: () => <PostsTab isLoading={isLoading} posts={posts} setPosts={setPosts} />,
  });

  const handleTabChange = (index) => {
    setTabIndex(index);
    // Update minHeight based on the active tab
    // if (index === 0) {
    //   setMinHeight(200); // About tab active, set minHeight to 200
    // } else if (index === 1) {
    //   setMinHeight(1400); // Posts tab active, set minHeight to 1000
    // }
  };

  const render = () => (

    < View style={{ flex: 1, minHeight: minHeight, backgroundColor: "#fff" }} >
      {/* Header Section */}
      < View style={styles.header} >
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.bio}>Software Engineer | Tech Enthusiast</Text>
      </ View>

      {/* Tab Navigation */}
      < View style={styles.tabContainer} >
        {/* <TabView
          navigationState={{ index: tabIndex, routes }}
          renderScene={renderScene}
          onIndexChange={(index) => handleTabChange(index)} 
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={styles.tabIndicator}
              style={styles.tabBar}
              labelStyle={styles.tabLabel}
            />
          )}
        /> */}
        <Tab.Navigator

          screenOptions={({ route }) => ({

            tabBarStyle: {
              backgroundColor: "#16181a",
              // backgroundColor: "red",
              justifyContent: "space-between",
              display: "flex",
              // height  : 200,


              width: width * 0.92,
              margin: "auto"
            },


            tabBarIndicatorStyle: {
              backgroundColor: "#00DE62",
              height: 0,
            },

          })}
        >
          <Tab.Screen
            name="Connections"
            component={AboutTab}


            options={{
              tabBarLabel: ({ focused }) => (
                <Text allowFontScaling={false} style={[
                  styles.tabbarpill, {

                    color: focused ? "#16181A" : "#00de62",
                    borderColor: focused ? "#00DE62" : "#808080",
                    backgroundColor: focused ? "#00DE62" : "transparent",
                  }
                ]}> Buy Plan
                </Text>
              ),

            }}
          />
          <Tab.Screen

            name="Requests"


            children={() => <PostsTab isLoading={isLoading} posts={posts} setPosts={setPosts} />}
            options={{
              tabBarLabel: ({ focused }) => (
                <Text allowFontScaling={false} style={[
                  styles.tabbarpill, {
                    color: focused ? "#16181A" : "#00de62",
                    borderColor: focused ? "#00DE62" : "#808080",
                    backgroundColor: focused ? "#00DE62" : "transparent",
                  }
                ]}> Your Posts
                </Text>
              ),

            }}
          />
        </Tab.Navigator>
      </ View>
    </View >

  )
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={[1]}
        style={{ backgroundColor: "#fff" }}
        renderItem={render}
        onEndReached={() => {
          loadMorePosts()

        }}
        onEndReachedThreshold={0.1}

      />
    </View>
  );
};

export default Test1;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    minHeight: 1000,
  },
  header: {
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    padding: 20,
    height: 250,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
  tabContainer: {
    flex: 1,
    height: Dimensions.get('window').height - 250,
  },
  tabContent: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 16,
    marginVertical: 10,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tabBar: {
    backgroundColor: '#f8f8f8',
  },
  tabIndicator: {
    backgroundColor: '#007bff',
  },
  tabLabel: {
    color: '#007bff',
    fontSize: 16,
  },


  container: {
    flex: 1,
    // flexGrow : 1,
    // width: width,
    // height: height,
    backgroundColor: "#16181a",
    // backgroundColor: "red",
    minHeight: 100,
    maxHeight: height
    // padding: 20,
  },
  headerText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#00DE62",
    // marginBottom: 20,
    color: "#00DE62",
    fontFamily: "myanmar",
    paddingHorizontal: 20

  },
  profileSection: {
    alignItems: "center",
    marginBottom: 10,
    // display: "flex",
    // flexDirection: "row",
    paddingHorizontal: 20,
    // backgroundColor : "red"
  },
  profileImage: {
    width: 124,
    height: 124,
    borderRadius: 100,
    marginBottom: 10,
  },
  profileImage1: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E9E9E9",
    fontFamily: "Alata",
    textAlign: "center",
    marginVertical: 5
  },
  userRole: {
    fontSize: 16,
    color: "#00DE62",
    marginBottom: 10,
    fontFamily: "Roboto",
    // paddingLeft: 2,
    textAlign: "center",
    marginVertical: -5


  },
  editButton: {
    backgroundColor: "#00DE62",
    borderRadius: 20,
    alignItems: "center",
    verticalAlign: "middle",
    justifyContent: "center",
    width: 182,
    height: 40,
    alignSelf: "center",
    // paddingHorizontal : 10,


  },
  editButton1: {
    backgroundColor: "#00DE62",
    // paddingHorizontal: 20,
    // paddingVertical: 8,
    borderRadius: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#00DE62",
    alignItems: "center",
    verticalAlign: "middle",
    justifyContent: "center",
    width: 182,
    height: 40,
    alignSelf: "center",
    marginVertical: 12


  },
  editButtonText: {
    color: "#16181A",
    fontSize: 16,
    fontFamily: "Alata",
    textAlign: "center",
    marginLeft: -1,
    marginTop: -3
  },

  buyPlanSection: {
    borderWidth: 2,
    borderColor: "#00DE62",
    borderRadius: 10,
    // minHeight: 400,
    width: width * 0.89,
    height: 400,
    // height: 200,
    // justifyContent: "center",
    // alignItems: "center",
    alignSelf: "center",
    // flex: 0.9,
    backgroundColor: "#16181a",
    marginTop: 10
  },
  buyPlanText: {
    fontSize: 32,
    fontFamily: "Alata",
    color: "#B8B8B8",
    textAlign: "center"
  },
  userinfo: {
    paddingLeft: 10,
    justifyContent: "center",
    // backgroundColor : "red",
    width: "100%",


  },
  btncont: {
    // flex :1,
    // display: "flex",
    // flexDirection: "row",
    // gap: 10
  },
  tabbarpill: {
    borderWidth: 2,
    borderRadius: 30,
    textAlign: "center",
    textAlignVertical: "center",
    height: 46,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: width * 0.42,
    fontFamily: "Alata",
    fontSize: 18,
    textAlign: "center",
    verticalAlign: "top",
    paddingTop: 7,
    textAlignVertical: "center",
    textTransform: "capitalize",
    borderWidth: 1,
    borderRadius: 30,

  },
  box: {
    width: width * 0.96,
    height: 316,
    margin: 10,
    backgroundColor: "#1A1D1F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    margin: "auto",
    marginBottom: 25

  },
  boxText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  template: {
    width: "96%",
    borderRadius: 10,
    height: 182,
    maxHeight: 182
  },
  userimg: {
    borderRadius: 100,
    width: 36,
    aspectRatio: 1,
    margin: 10,
    marginLeft: 15,
    alignSelf: "flex-start",
    justifyContent: "flex-start"
  },
  userdetail: {
    flex: 1,
    alignSelf: "flex-start",
    paddingLeft: 5
  },
  u1: {
    fontFamily: "Alata",
    fontSize: 20,
    color: "#E9E9E9"
  },
  t6: {
    fontFamily: "Alata",
    fontSize: 14,
    color: "#AEAFAF",
    marginLeft: 20
  },
  u2: {
    fontFamily: "Roboto",
    fontSize: 11,
    color: "#00DE62"
  },
  u3: {
    fontFamily: "Roboto",
    fontSize: 20,
    color: "#B8B8B8"
  },
  upvote: {
    marginRight: -3
  },
  count: {
    alignSelf: "flex-end",
    fontFamily: "Roboto",
    fontSize: 13,
    color: "#00DE62",
    marginLeft: -2
  },
  lower: {
    display: "flex",
    flexDirection: "row",
    width: "95%",
    marginHorizontal: "auto",
    marginTop: 10,
    paddingLeft: 5,
    justifyContent: "space-between"
  },
  connectionContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: -12,
    overflowY: "hidden",
  },
  divider: {
    width: width,
    height: 3,
    marginTop: 20,
    backgroundColor: "#24272A"
  },
  iconcontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    marginHorizontal: "auto",
    marginTop: 10
  }
  , icon2: {
    display: "flex",
    flexDirection: "row",
    // justifyContent : "space-between",
    // width : "90%",
    // marginHorizontal : "auto"
    gap: 5
  },

});
