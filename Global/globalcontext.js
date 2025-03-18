// GlobalContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Animated } from "react-native";

// Create the global context
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globaldata, setGlobalData] = useState({
    token: "",
    // scrollY : new Animated.Value(0)
  });


  // const scrollY = new Animated.Value(0);

  const updateField = async(field, value) => {
    setGlobalData((prevData) => ({
      ...prevData,
      [field]: value,
    }));




    // console.log(value, "value hai yeh");
    // console.log(value, "value hai yeh");
    // console.log(value, "value hai yeh");
    // console.log(value, "value hai yeh");
    // console.log(value, "value hai yeh");
    // console.log(value, "value hai yeh");
    
    // try {
    //   await AsyncStorage.setItem('accessToken', value);
    //   console.log('Data saved successfully!');
    // } catch (error) {
    //   console.error('Error saving data:', error);
    // }
  };

  useEffect(() => {
    async function getToken() {
      const temp = await AsyncStorage.getItem("accessToken");
      updateField("token", temp);
    }
    getToken();
  }, []);

  return (
    <GlobalContext.Provider value={{ globaldata, updateField }}>
      {children}
    </GlobalContext.Provider>
  );
};
