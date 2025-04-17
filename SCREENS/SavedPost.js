import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  SimpleLineIcons,
  messagetime,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient'; 

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { GlobalContext } from "@/Global/globalcontext";
import { url } from "@/config";
import Post from "@/components/Post";

const { width } = Dimensions.get("window");

const AllPostsScreen = ({ navigation, route }) => {
  const [photoPosts, setPhotoPosts] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("posts"); // posts | blogs

  const { tabnavigation } = route.params;
  const { globaldata } = useContext(GlobalContext);
  const token = globaldata.token;

  useEffect(() => {
    getSavedPost();
  }, []);

  const getSavedPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url}test/getSavedPost/`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const { data } = await response.json();
      console.log(data);
      if (data.length > 0) {
        const filteredPhotos = data[0].saveId.filter(item => item.type === "photo");
        const filteredBlogs = data[0].saveId.filter(item => item.type === "textBlog");

        setPhotoPosts(filteredPhotos);
        setBlogPosts(filteredBlogs);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // function messagetime(date) {
  //   var date1 = new Date(date);
  //   const messageDate1 = date1.toLocaleDateString("en-US", {
  //     day: "2-digit",
  //     month: "long",
  //     year: "numeric",
  //   });
  //   return messageDate1
  // }

  const RenderBlogPost = ({ item }) => {
    if (!item) return null;
    return (
      <Pressable  onPress={() => tabnavigation.navigate("ViewSendedPost", { id: item._id })}>
        <LinearGradient
          colors={["rgba(33, 34, 35, 0.4)", "rgba(25, 26, 27, 0.6)"]}
          locations={[0, 1]}
          style={styles.box}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <Text style={styles.blogtext}>{item.content}</Text>
        </LinearGradient>
      </Pressable>
    );
  };
  
  const allPosts = [...photoPosts, ...blogPosts];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerSide}>
          <Pressable onPress={() => navigation.goBack()}>
            <FontAwesome6 name="chevron-left" size={25} style={styles.backIcon} color="#00DF60" />
          </Pressable>
        </View>
        <View style={styles.headerCenter}>
          <Text style={styles.title}>Saved Posts</Text>
        </View>
        <View style={styles.headerSide} />
      </View>

      {/* Tab Switcher */}
      {/* <View style={styles.tabContainer}>
        <Pressable onPress={() => setActiveTab("posts")}>
          <View>
            <Text style={[styles.tabText, activeTab === "posts" && styles.activeTabText]}>
              Posts
            </Text>
          </View>
        </Pressable>
        <Pressable onPress={() => setActiveTab("blogs")}>
          <View>
            <Text style={[styles.tabText, activeTab === "blogs" && styles.activeTabText]}>
              Blogs
            </Text>
          </View>
        </Pressable>
      </View> */}


      {loading ? (
        <View style={styles.emptyContainer}>
          <ActivityIndicator color="#00de62" />
          <Text style={{ color: '#999', marginTop: 10 }}>Loading posts...</Text>
        </View>
      ) : (
        <>
          {allPosts.length > 0 ? (
  <FlatList
    data={allPosts}
    numColumns={3}
    key={'all'}
    keyExtractor={(item) => item._id}
    renderItem={({ item }) => {
      if (item.type === "photo") {
        return (
          <Pressable
            onPress={() => tabnavigation.navigate("ViewSendedPost", { id: item._id })}
            style={styles.gridItem}
          >
            <Image source={{ uri: item.mediaUrl }} style={styles.image} />
          </Pressable>
        );
      } else if (item.type === "textBlog") {
        return (
          <Pressable
            onPress={() => tabnavigation.navigate("ViewSendedPost", { id: item._id })}
            style={[styles.gridItem, styles.blogItem]}
          >
            <Text numberOfLines={5} style={styles.blogPreviewText}>
              {item.content}
            </Text>
          </Pressable>
        );
      }
    }}
  />
) : (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>No posts saved</Text>
  </View>
)}


        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16181A",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#24272A",
  },
  box: {
    width: width * 0.96,
    height: "auto",
    // height: 100,
    margin: 10,
    backgroundColor: "#16181a",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    margin: "auto",
    //marginBottom: 25,
    marginTop: 20,
    paddingVertical: 10,
    // opacity : 0.5

},
  headerSide: {
    width: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  blogtext: {
    textAlign: "left",
    width: "92%",
    paddingHorizontal: 5,
    marginVertical: 10,
    color: "#ccc",
    fontSize: 16,
    fontFamily: "Roboto",

},
  title: {
    fontSize: 20,
    color: "#E9E9E9",
    fontFamily: "Alata",
    textAlign: "center",
  },
  backIcon: {
    padding: 5,
  },
  activeTab: {
    color: "#00de62"
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#16181A',
    // borderWidth:1,
    borderBottomWidth: 1,
    borderBottomColor: "#24272A",
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#2A2D30',
  },
  blogItem: {
    backgroundColor: "#",
    //padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  blogPreviewText: {
    color: "#ccc",
    fontSize: 9,
    fontFamily: "Alata",
    //textAlign: "center",
    width: "100%",
    padding:10,
  },
  
  tabText: {
    fontFamily: 'Alata',
    fontSize: 18,
    color: '#fff',
  },
  activeTabText: {
    color: '#00DE62',
  },
  gridItem: {
    flex: 1 / 3,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: "#24272A",
    alignItems: "center",
    width: "33.33%",
    overflow: 'hidden',
  },
  image: {
    width: width / 3,
    height: width / 3,
    resizeMode: "cover",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#828282',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
});

export default AllPostsScreen;
