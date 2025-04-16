import React, { useState, useRef } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Green from "../SCREENS/greenscreen.js"; //page 1
import Login1 from "../SCREENS/logintrial.js"; // login page

import LoginPage from "../SCREENS/LoginPage.js";

import Date1 from "../SCREENS/Date.js";

import Main1 from "../SCREENS/Main1.js";
import Main2 from "../SCREENS/Main2.js";

import Chat from "../SCREENS/main-1/CHATSCREEN.js";
import Chat1 from "../SCREENS/main-1/GROUPCHATSCREEN.js";
import Card from "../SCREENS/main-1/Card.js";


import Singleprofilepage from "../SCREENS/singleprofilepage.js";
import Login2 from "../SCREENS/login2.js";
import PricePage from "../SCREENS/JASH/PricePage.js";
import GroudDetailsScreen from "../SCREENS/JASH/GroupDetailsScreen.js";
import ApplicantsList from "../SCREENS/JASH/ApplicantsList.jsx";
import JobsPostedScreen from "../SCREENS/JASH/JobsPostedScreen.jsx";
import Startsy from "../SCREENS/main-1/Startsy.js";
import Email from "../SCREENS/email.js";
import InvestorWaitingPage from "../SCREENS/main-2/InvestorWaitingPage.js";
import Modal1 from "../SCREENS/Modal.js";
import { useEffect, createContext } from "react";
import { StyleSheet } from "react-native";
import useLoadFonts from "../hooks/useLoadFonts.js";
import { setBackgroundColorAsync } from "expo-system-ui";
import * as SystemUI from "expo-system-ui";
import { GlobalProvider } from "../Global/globalcontext.js";
import { LogBox } from "react-native";
import { StatusBar, Platform } from "react-native";
import { useFocusEffect } from "expo-router";
import CommunityPage from "../SCREENS/CommunityPage.jsx";
import BlogPage from "../SCREENS/BlogPage.jsx";
import MediaPost from "../SCREENS/MediaPost.js";
import JobPostingPage from "../SCREENS/JobPosting.jsx";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { url } from "@/config.js";
import InvestorCard from "@/SCREENS/main-2/InvestorCard.js";

import JobApplyScreen from "../SCREENS/JASH/Jobs/JobApplyScreen.jsx";
import JobApplicantCard from "../SCREENS/JASH/Jobs/JobApplicantCard.jsx";




const Stack = createNativeStackNavigator();
SystemUI.setBackgroundColorAsync("#16181a");

Notifications.addNotificationReceivedListener((notification) => {
});

Notifications.addNotificationResponseReceivedListener((response) => {
  // Handle response when the user taps on the notification
  // console.log("Notification tapped:", response);
});
import { enableFreeze } from "react-native-screens";
import { enableScreens } from "react-native-screens";
import QuestionReply from "@/SCREENS/main-2/QuestionReply.js";
import Settings from "../SCREENS/Settings.js";

// if (__DEV__) {
//   const whyDidYouRender = require('@welldone-software/why-did-you-render');
//   whyDidYouRender(React, {
//     trackAllPureComponents: true, // or fine-tune it
//   });
// }

enableScreens();

enableFreeze(true);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

LogBox.ignoreLogs([
  // "VirtualizedLists should never be nested", // Example warning
  'Warning: Each child in a list should have a unique "key" prop.',
  "VirtualizedList: Encountered an error while measuring a list's offset from its containing VirtualizedList.",
  "Encountered an error while measuring a list's offset from its containing VirtualizedList.",
  " Due to changes in Androids permission requirements, Expo Go can no longer provide full access to the media library. To test the full functionality of this module, you can create a development build. https://docs.expo.dev/develop/development-builds/create-a-build ",
]);

const originalConsoleWarn = console.warn;
console.warn = (message, ...args) => {
  if (
    // message.includes("VirtualizedLists should never be nested") || // Suppress specific warning
    message.includes('Each child in a list should have a unique "key" prop.') ||
    message.includes("Non-serializable") ||
    message.includes(
      "Encountered an error while measuring a list's offset from its containing VirtualizedList."
    ) ||
    message.includes("Due to changes in Androids permission requirements") ||
    message.includes("expo-notifications:")
  ) {
    return; // Block these warnings
  }
  originalConsoleWarn(message, ...args); // Allow other warnings
};

export const Global = createContext("ok");

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
    []
  );
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  // const notificationListener = useRef();
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.EventSubscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) => token && setExpoPushToken(token)
    );

    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? [])
      );
    }
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {

      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    StatusBar.setBackgroundColor("#16181a");
    StatusBar.setBarStyle("light-content");
  }, []);

  useFocusEffect(() => {
    StatusBar.setBackgroundColor("#16181a");
    StatusBar.setBarStyle("light-content");
  });

  const fontsLoaded = useLoadFonts();
  const [appisready, setappisready] = React.useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      setappisready(true);
    }
  }, [fontsLoaded]);

  return (
    <GlobalProvider>
      <StatusBar backgroundColor="#16181a" barStyle={"light-content"} />
      {appisready && (
        <Stack.Navigator
          initialRouteName="Green"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#16181a",
            },
            // cardStyle: {backgroundColor: "red"},
            keyboardHandlingEnabled: false,
            headerShown: false,
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="Green" component={Green} />
          <Stack.Screen
            name="LoginTrial"
            options={{
              animation: "slide_from_bottom",
            }}
            component={Login1}
          />
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen
            name="Signup1"
            getComponent={() => require("../SCREENS/signup-1.js").default}
          />
          <Stack.Screen
            name="Signup2"
            getComponent={() => require("../SCREENS/signup2.js").default}
          />
          <Stack.Screen
            name="Signup3"
            getComponent={() => require("../SCREENS/signup3.js").default}
          />
          <Stack.Screen
            name="Signup4"
            getComponent={() => require("../SCREENS/signup4.js").default}
          />
          <Stack.Screen
            name="Signup5"
            getComponent={() => require("../SCREENS/signup5.js").default}
          />
          <Stack.Screen
            name="Signup6"
            getComponent={() => require("../SCREENS/signup6.js").default}
          />
          <Stack.Screen
            name="Signup7"
            getComponent={() => require("../SCREENS/signup7.js").default}
          />
          <Stack.Screen
            name="Signup8"
            getComponent={() => require("../SCREENS/signup8.js").default}
          />
          <Stack.Screen
            name="Signup9"
            getComponent={() => require("../SCREENS/Signup9.js").default}
          />
          <Stack.Screen
            name="Signup10"
            getComponent={() => require("../SCREENS/Signup10.js").default}
          />
          <Stack.Screen
            name="Signup11"
            getComponent={() => require("../SCREENS/Signup11.js").default}
          />
          <Stack.Screen
            name="Signup12"
            getComponent={() => require("../SCREENS/signup12.js").default}
          />
          <Stack.Screen
            name="Signup13"
            getComponent={() => require("../SCREENS/Signup13.js").default}
          />
          <Stack.Screen
            name="SelectInvestor"
            getComponent={() =>
              require("../SCREENS/SelectInvestorType.js").default
            }
          />
          <Stack.Screen
            name="Wait"
            getComponent={() => require("../SCREENS/Wait.js").default}
          />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Chat1" component={Chat1} />
          <Stack.Screen name="Modal1" component={Modal1} />
          {/* <Stack.Screen name="Skeleton1" component={Skeleton1} /> */}
          <Stack.Screen name="CommunityPage" component={CommunityPage} />
          <Stack.Screen name="Blogpage" component={BlogPage} />
          <Stack.Screen name="Mediapage" component={MediaPost} />
          <Stack.Screen name="Jobpost" component={JobPostingPage} />
          <Stack.Screen name="ApplicantsList" component={ApplicantsList} />
          <Stack.Screen name="JobsPostedScreen" component={JobsPostedScreen} />
          <Stack.Screen name="Email" component={Email} />
          <Stack.Screen
            name="InvestorWaitingPage"
            component={InvestorWaitingPage}
          />
          <Stack.Screen name="Login2" component={Login2} />
          <Stack.Screen
            name="Card"
            options={{
              animation: "none",
            }}
            component={Card}
          />
          <Stack.Screen
            name="Main1"
            options={{
              animation: "none",
            }}
            component={Main1}
          />
          <Stack.Screen
            name="Main2"
            options={{
              animation: "none",
            }}
            component={Main2}
          />
        

          <Stack.Screen
            name="FP1"
            getComponent={() => require("../SCREENS/FP1.js").default}
          />
          <Stack.Screen
            name="FP2"
            getComponent={() => require("../SCREENS/FP2.js").default}
          />
          <Stack.Screen
            name="F1"
            getComponent={() => require("../SCREENS/FP1.js").default}
          />
          <Stack.Screen
            name="ChangePassword1"
            getComponent={() =>
              require("../SCREENS/changePassword1.js").default
            }
          />
          <Stack.Screen
            name="ChangePassword2"
            getComponent={() =>
              require("../SCREENS/changePassword2.js").default
            }
          />
          <Stack.Screen
            name="EditInvestorInfo"
            getComponent={() =>
              require("../SCREENS/edit profile pages/investor.js").default
            }
          />
          <Stack.Screen
            name="Founder1"
            getComponent={() =>
              require("../SCREENS/edit profile pages/founder-1.js").default
            }
          />
          <Stack.Screen
            name="Founder2"
            getComponent={() =>
              require("../SCREENS/edit profile pages/founder-2.js").default
            }
          />
          <Stack.Screen
            name="Logout"
            getComponent={() => require("../SCREENS/Logout.js").default}
          />
          <Stack.Screen
            name="Test1"
            getComponent={() => require("../SCREENS/test1.js").default}
          />
          <Stack.Screen
            name="Editcommunity"
            getComponent={() =>
              require("../SCREENS/edit profile pages/Editcommunity.js").default
            }
          />

          <Stack.Screen
            name="GroupDescriptionPage"
            component={GroudDetailsScreen}
          />
          <Stack.Screen name="StartsyCard" component={Startsy} />
          <Stack.Screen name="QuestionReply" component={QuestionReply} />
          <Stack.Screen name="PricePage" component={PricePage} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Date" component={Date1} />

          <Stack.Screen
            name="Singleprofilepage"
            component={Singleprofilepage}
          />

          <Stack.Screen
            name="SavedPost"
            getComponent={() => require("../SCREENS/SavedPost.js").default}
          />
          <Stack.Screen
            name="VerificationPendingScreen"
            getComponent={() =>
              require("../SCREENS/InvestorVerify.js").default
            }
          />
          <Stack.Screen
            name="InvestorNotVerifiedScreen"
            getComponent={() =>
              require("../SCREENS/NotVerified.js").default
            }
          />
          <Stack.Screen
            name="CertificatePortfolioPage"
            getComponent={() =>
              require("../SCREENS/Certificates.js").default
            }
          />
          <Stack.Screen
            name="TermsAndConditions"
            getComponent={() =>
              require("../SCREENS/JASH/terms-condition/TermsAndCondition.jsx").default
            }
          />
          <Stack.Screen
            name="RatingPage"
            getComponent={() => require("../SCREENS/BetaRating.js").default}
          />

          <Stack.Screen name="JobApply" component={JobApplyScreen} />
          <Stack.Screen name="JobApplicantCard" component={JobApplicantCard} />
          <Stack.Screen name="AllRequests" component={InvestorCard} />
        </Stack.Navigator>
      )}

      {/* </View> */}
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // zIndex : 1000000,
    backgroundColor: "#16181a", // Set your desired background color here
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#16181a", // Set your desired background color here
  },
});

async function schedulePushNotification() {


  fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      to: "ExponentPushToken[L8q1b6FpWnM27c_VPcVSBk]",
      sound: "default",
      title: "Yogesh sent you a message",
      body: "dummy text",
      data: { someData: "goes here" },
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log())
    .catch((error) => console.error("Error:", error));

  // await Notifications.scheduleNotificationAsync({
  //   content: {
  //     title: "You've got mail! 📬",
  //     body: 'hello world',
  //     data: { data: 'goes here', test: { test1: 'more data' } },
  //   },
  //   trigger: {
  //     seconds: 2,
  //     repeats : false,
  //   },
  // });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("myNotificationChannel", {
      name: "A channel is needed for the permissions prompt to appear",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "red",
    });
  }

  if (Device.isDevice) {
  
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
 
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    try {
      var notificationToken = await AsyncStorage.getItem("notificationToken");

      if (!notificationToken) {
        try {
          const projectId =
            Constants?.expoConfig?.extra?.eas?.projectId ??
            Constants?.easConfig?.projectId;
          if (!projectId) {
            throw new Error("Project ID not found");
          }
          token = (
            await Notifications.getExpoPushTokenAsync({
              projectId,
            })
          ).data;

          var ifUserIsLoggedIn = await AsyncStorage.getItem("accessToken");
          if (ifUserIsLoggedIn) {
            try {
              var response = await fetch(`${url}api/updateNotificationToken`, {
                method: "POST",
                body: JSON.stringify({
                  notificationToken: token,
                }),
                headers: {
                  "Content-Type": "application/json",
                  accept: "application/json",
                  Authorization: `Bearer ${ifUserIsLoggedIn}`,
                },
              });
              var data = await response.json();
            } catch (e) {
              console.log(e);
            }
          }
          try {
            await AsyncStorage.setItem("notificationToken", token);
          } catch (e) {}
        } catch (e) {
          token = `${e}`;
        }
      }
    } catch (e) {
      console.log(e);
    }

    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
