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
