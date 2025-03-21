import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import Back from "@/components/back.js";
import { url } from "@/config";
import { GlobalContext } from "@/Global/globalcontext";


const {width} = Dimensions.get("window")


const numColumns = 3; // 3-column grid

const AllPostsScreen = ({ navigation , route }) => {
  const [data, setData] = useState([]);

  const{tabnavigation} = route.params

  const { globaldata, updateField } = useContext(GlobalContext);
  const token = globaldata.token;

  useEffect(() => {
    getSavedPost(1)
  }, []);


  const samplePosts = [
    { id: "1", image: "https://via.placeholder.com/150" },
    { id: "2", image: "https://via.placeholder.com/150" },
    { id: "3", image: "https://via.placeholder.com/150" },
    { id: "4", image: "https://via.placeholder.com/150" },
    { id: "5", image: "https://via.placeholder.com/150" },
    { id: "6", image: "https://via.placeholder.com/150" },
    { id: "7", image: "https://via.placeholder.com/150" },
    { id: "8", image: "https://via.placeholder.com/150" },
    { id: "9", image: "https://via.placeholder.com/150" },
  ];




  const getSavedPost = async () => {
    try {



      const response = await fetch(`${url}test/getSavedPost/`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const { data } = await response.json();
      // console.log(data[0].saveId);
      // setData(data[0].saveId);

      const filteredData = data[0].saveId.filter(item=>item.type == "photo");

      setData(filteredData);



    } catch (err) {
      console.log(err);
    }
  }


  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <Pressable
          style={styles.back}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Back />
        </Pressable>


        <Text style={styles.title}>Saved Posts</Text>
      </View>


      <FlatList
        data={data}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (item.type == "textBlog") {
            return<></>
          }
          else {
            return (
              <Pressable
               onPress={()=>{tabnavigation.navigate("ViewSendedPost") , {id : item.id}}} style={styles.gridItem} >
                <View >
                  <Image source={{ uri: item.mediaUrl }} style={styles.image} />
                </View>
              </Pressable>
            )
          }
        }}
      />
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
    justifyContent: "center", // Centers the title horizontally
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#24272A",
  },
  back: {
    position: "absolute",
    left: 0, // Keeps the back button on the left
    padding: 10,
  },
  title: {
    fontSize: 20,
    color: "#E9E9E9",
    fontFamily: "Alata",
    textAlign: "center",
  },
  gridItem: {
    flex: 1/3, // Distributes space equally in the row
    aspectRatio: 1, // Ensures perfect squares
    // justifyContent: "center",
    // alignItems: "center",
    borderWidth: 1,
    borderColor: "#24272A",
    alignItems : "center",
    //justifyContent: "center",
    width : "33.33%",
    overflow: 'hidden',
   // flex:1/3,
    //flexWrap:'wrap',
    // margin:2
    // width : "10%"
  },
  image: {
    width: width/3,
    height: width/3,
    // flex:1,
    objectFit : "cover",
    resizeMode:"cover"
  },
});

export default AllPostsScreen;
