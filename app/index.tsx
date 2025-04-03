import React, { useState, useRef } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Green from "../SCREENS/greenscreen.js"; //page 1
import Login1 from "../SCREENS/logintrial.js"; // login page
import ReadMore1 from "../SCREENS/trial-1.js"; // read more page
import { Alert, Button, Pressable, SafeAreaView } from "react-native";
import Signup1 from "../SCREENS/signup-1.js";
import Signup2 from "../SCREENS/signup2.js";
import Signup3 from "../SCREENS/signup3.js";
import Signup4 from "../SCREENS/signup4.js";
import Signup5 from "../SCREENS/signup5.js";
import Signup6 from "../SCREENS/signup6.js";
import Signup7 from "../SCREENS/signup7.js";
import Signup8 from "../SCREENS/signup8.js";
import Signup9 from "../SCREENS/Signup9.js";
import Signup10 from "../SCREENS/Signup10.js";
import Signup11 from "../SCREENS/Signup11.js";
import Signup12 from "../SCREENS/signup12.js";
import Signup13 from "../SCREENS/Signup13.js";
import SelectInvestor from "../SCREENS/SelectInvestorType.js";
import Main1 from "../SCREENS/Main1.js";
import Main2 from "../SCREENS/Main2.js";
import Chat from "../SCREENS/main-1/CHATSCREEN.js";
import Chat1 from "../SCREENS/main-1/GROUPCHATSCREEN.js";
import Card from "../SCREENS/main-1/Card.js";
import Ct from "../SCREENS/main-1/Ct.js";
import OK from "../SCREENS/bottom.js";
import ChangePassword1 from "../SCREENS/changePassword1.js";
import ChangePassword2 from "../SCREENS/changePassword2.js";
import EditInvestorInfo from "../SCREENS/edit profile pages/investor.js";
import Founder1 from "../SCREENS/edit profile pages/founder-1.js";
import Founder2 from "../SCREENS/edit profile pages/founder-2.js";
import Singleprofilepage from "../SCREENS/singleprofilepage.js";
import Logout from "../SCREENS/Logout.js";
import Login2 from "../SCREENS/login2.js";
import Test1 from "../SCREENS/test1.js";
import FP1 from "../SCREENS/FP1.js";
import FP2 from "../SCREENS/FP2.js";
import PricePage from "../SCREENS/JASH/PricePage.js";
import Skeleton1 from "../SCREENS/main-2/skeleton.js";
import GroudDetailsScreen from "../SCREENS/JASH/GroupDetailsScreen.js";
import ApplicantsList from "../SCREENS/JASH/ApplicantsList.jsx";
import JobsPostedScreen from "../SCREENS/JASH/JobsPostedScreen.jsx";
import Startsy from "../SCREENS/main-1/Startsy.js";
import Email from "../SCREENS/email.js";
import InvestorWaitingPage from "../SCREENS/main-2/InvestorWaitingPage.js";
import Modal1 from "../SCREENS/Modal.js";
import Wait from "../SCREENS/Wait.js";
import Editcommunity from "../SCREENS/edit profile pages/Editcommunity.js";
import F1 from "../SCREENS/test.js";
import KeyboardAvoidingComponent from "../SCREENS/Keyboard.js";
import Blur from "../SCREENS/blur.js"; // trial blur page
import { useEffect, createContext } from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
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
import AllPostsScreen from "../SCREENS/SavedPost.js";
import VerificationPendingScreen from "../SCREENS/InvestorVerify.js";
import InvestorNotVerifiedScreen from "../SCREENS/NotVerified.js";
import CertificatePortfolioPage from "../SCREENS/Certificates.js";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { url } from "@/config.js";

const Stack = createNativeStackNavigator();
SystemUI.setBackgroundColorAsync("#16181a");


Notifications.addNotificationReceivedListener(notification => {
  // Handle the notification when received
  console.log('Notification received:', notification);
});

Notifications.addNotificationResponseReceivedListener(response => {
  // Handle response when the user taps on the notification
  console.log('Notification tapped:', response);
});
import { enableFreeze } from "react-native-screens";
import { enableScreens } from "react-native-screens";
import QuestionReply from "@/SCREENS/main-2/QuestionReply.js";
import Settings from "../SCREENS/Settings.js";

enableScreens();

enableFreeze(true);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

LogBox.ignoreLogs([
  // "VirtualizedLists should never be nested", // Example warning
  'Warning: Each child in a list should have a unique "key" prop.',
  "VirtualizedList: Encountered an error while measuring a list's offset from its containing VirtualizedList.",
]);

const originalConsoleWarn = console.warn;
console.warn = (message, ...args) => {
  if (
    // message.includes("VirtualizedLists should never be nested") || // Suppress specific warning
    message.includes('Each child in a list should have a unique "key" prop.') ||
    message.includes("Non-serializable") ||
    message.includes(
      "Encountered an error while measuring a list's offset from its containing VirtualizedList."
    ) // Another specific warning
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
  const notificationListener = useRef<Notifications.EventSubscription>();
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
        console.log(response);
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
      {/* <Pressable
        style={{ position: "absolute", top: 100, left: 100 , zIndex : 10000000 }}
        onPress={async () => {
          await schedulePushNotification();
        }}
      /> */}
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
          {/* <Stack.Screen name="ReadMore1" component={ReadMore1} /> */}

          <Stack.Screen name="Signup1" component={Signup1} />
          <Stack.Screen name="Signup2" component={Signup2} />
          <Stack.Screen name="Signup3" component={Signup3} />
          <Stack.Screen name="Signup4" component={Signup4} />
          <Stack.Screen name="Signup5" component={Signup5} />
          <Stack.Screen name="Signup6" component={Signup6} />
          <Stack.Screen name="Signup7" component={Signup7} />
          <Stack.Screen name="Signup8" component={Signup8} />
          <Stack.Screen name="Signup9" component={Signup9} />
          <Stack.Screen name="Signup10" component={Signup10} />
          <Stack.Screen name="Signup11" component={Signup11} />
          <Stack.Screen name="Signup12" component={Signup12} />
          <Stack.Screen name="Signup13" component={Signup13} />
          <Stack.Screen name="SelectInvestor" component={SelectInvestor} />
          <Stack.Screen name="Wait" component={Wait} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Chat1" component={Chat1} />
          <Stack.Screen name="Modal1" component={Modal1} />
          <Stack.Screen name="Skeleton1" component={Skeleton1} />
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

          <Stack.Screen name="FP1" component={FP1} />
          <Stack.Screen name="FP2" component={FP2} />
          <Stack.Screen name="F1" component={F1} />
          <Stack.Screen name="Ct" component={Ct} />
          <Stack.Screen name="OK" component={OK} />
          <Stack.Screen name="ChangePassword1" component={ChangePassword1} />
          <Stack.Screen name="ChangePassword2" component={ChangePassword2} />
          <Stack.Screen name="EditInvestorInfo" component={EditInvestorInfo} />
          <Stack.Screen name="Founder1" component={Founder1} />
          <Stack.Screen name="Founder2" component={Founder2} />
          <Stack.Screen name="Logout" component={Logout} />
          <Stack.Screen name="Test1" component={Test1} />
          <Stack.Screen name="Editcommunity" component={Editcommunity} />
          <Stack.Screen
            name="GroupDescriptionPage"
            component={GroudDetailsScreen}
          />
          <Stack.Screen name="StartsyCard" component={Startsy} />
          <Stack.Screen name="QuestionReply" component={QuestionReply} />
          <Stack.Screen name="PricePage" component={PricePage} />
          <Stack.Screen name="Settings" component={Settings} />

          <Stack.Screen
            name="KeyboardAvoidingComponent"
            component={KeyboardAvoidingComponent}
            options={{
              headerTitle: "Your Custom Title", // Custom title for the header
              headerStyle: {
                backgroundColor: "blue", // Custom background color
              },
              headerTintColor: "white", // Custom color for the title text
              headerTitleStyle: {
                fontWeight: "bold", // Make the title text bold
              },
            }}
          />

          <Stack.Screen
            name="Singleprofilepage"
            component={Singleprofilepage}
          />

          {/* <Stack.Screen name="ViewSendedPost" component={ViewSendedPost}/> */}

          {/* <Stack.Screen name="settings" component={Settings}/> */}

          <Stack.Screen name="SavedPost" component={AllPostsScreen} />
          <Stack.Screen
            name="VerificationPendingScreen"
            component={VerificationPendingScreen}
          />
          <Stack.Screen
            name="InvestorNotVerifiedScreen"
            component={InvestorNotVerifiedScreen}
          />
          <Stack.Screen
            name="CertificatePortfolioPage"
            component={CertificatePortfolioPage}
          />
        </Stack.Navigator>
      )}
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
  console.log("hello ");

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
    .then((data) => console.log(data))
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
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    console.log("first");
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    console.log("second");

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    console.log("third");

    try {
      var notificationToken = await AsyncStorage.getItem("notificationToken");
      console.log(notificationToken, "notificationToken from async storage");

      if (!notificationToken) {
        try {
          console.log("forth");

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
          console.log(token);

          var ifUserIsLoggedIn = await AsyncStorage.getItem("accessToken")
          if(ifUserIsLoggedIn) {
            try{
              var response = await fetch(`${url}api/updateNotificationToken` , {
                method: "POST",
                body: JSON.stringify({
                  notificationToken: token,
                }),
                headers: {
                  "Content-Type": "application/json",
                  accept: "application/json",
                  "Authorization": `Bearer ${ifUserIsLoggedIn}`,
              },
              })
              var data = await response.json()

              console.log(data.json());
              
            }
            catch(e){
              console.log(e);   
            }

          }
          try {

            await AsyncStorage.setItem("notificationToken", token);
            console.log("Notification token saved to AsyncStorage:");
          } catch (e) {
            console.log(e);
          }
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
