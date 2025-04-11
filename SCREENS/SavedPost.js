import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from "react-native";
import Back from "@/components/back.js";
import { url } from "@/config";
import { GlobalContext } from "@/Global/globalcontext";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";


const { width } = Dimensions.get("window")


const numColumns = 3; // 3-column grid

const AllPostsScreen = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { tabnavigation } = route.params

  const { globaldata, updateField } = useContext(GlobalContext);
  const token = globaldata.token;

  useEffect(() => {
    getSavedPost(1)
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
      if (data.length > 0) {
        // console.log(data);
        // setData(data[0].saveId);

        const filteredData = data[0].saveId.filter(item => item.type == "photo");

        setData(filteredData);
      }



    } catch (err) {
      console.log(err);
    }
    finally {
      setTimeout(() => {
        setLoading(false);
      }, 0);
    }
  }


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
      {


        loading ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color="#00de62" />
          </View>
          :
          data.length > 0 ?
            <FlatList
              data={data}
              numColumns={3}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                if (item.type == "textBlog") {
                  return null
                }
                else {
                  // console.log(item._id);
                  return (
                    <Pressable
                      onPress={() => { tabnavigation.navigate("ViewSendedPost", { id: item._id }) }} style={styles.gridItem} >
                      <View >
                        <Image source={{ uri: item.mediaUrl }} style={styles.image} />
                      </View>
                    </Pressable>
                  )
                }
              }}
            />
            :
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#ccc' }}>No post saved</Text>
            </View>

      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16181A",
  },
  // header: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "center", // Centers the title horizontally
  //   paddingVertical: 15,
  //   paddingHorizontal: 20,
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#24272A",
  // },
  // back: {
  //   position: "absolute",
  //   left: 0, // Keeps the back button on the left
  //   padding: 10,
  // },
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
    borderBottomColor: "#24272A",
  },

  headerSide: {
    width: 40, // same width as the icon button area
    alignItems: "flex-start",
    justifyContent: "center",
  },

  headerCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },



  gridItem: {
    flex: 1 / 3, // Distributes space equally in the row
    aspectRatio: 1, // Ensures perfect squares
    // justifyContent: "center",
    // alignItems: "center",
    borderWidth: 1,
    borderColor: "#24272A",
    alignItems: "center",
    //justifyContent: "center",
    width: "33.33%",
    overflow: 'hidden',
    // flex:1/3,
    //flexWrap:'wrap',
    // margin:2
    // width : "10%"
  },
  image: {
    width: width / 3,
    height: width / 3,
    // flex:1,
    objectFit: "cover",
    resizeMode: "cover"
  },
});

export default AllPostsScreen;






