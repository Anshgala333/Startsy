import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Green from "../SCREENS/greenscreen.js"; //page 1
import Login1 from "../SCREENS/logintrial.js"; // login page
import ReadMore1 from "../SCREENS/trial-1.js"; // read more page
import { SafeAreaView } from "react-native";
import Signup1 from "../SCREENS/signup-1.js";
import Signup2 from "../SCREENS/signup2.js";
import Signup3 from "../SCREENS/signup3.js";
import Signup4 from "../SCREENS/signup4.js";
import Signup5 from "../SCREENS/signup5.js";
import Line from "../SCREENS/line.js";
import Line2 from "../SCREENS/line2.js";
import Line3 from "../SCREENS/line3.js";
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
import ChatScreen from "../SCREENS/main-1/Message.js";
import ConnectionsScreen from "../SCREENS/main-1/connection.js";
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
import InvestorWaitingPage from "../SCREENS/main-2/InvestorWaitingPage.js"

import Modal1 from "../SCREENS/Modal.js";
import Wait from "../SCREENS/Wait.js";
import Editcommunity from "../SCREENS/edit profile pages/Editcommunity.js";
// import drop from "../../SCREENS/dropdown.js"
// import Login1 from "../../SCREENS/logintrial.js";
import F1 from "../SCREENS/test.js";
// import F2 from "../SCREENS/F2.js";
import KeyboardAvoidingComponent from "../SCREENS/Keyboard.js";
import Blur from "../SCREENS/blur.js"; // trial blur page
import { useEffect, createContext } from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
// import { setNavigationBarColorAsync } from 'expo-navigation-bar';
import useLoadFonts from "../hooks/useLoadFonts.js";
import { setBackgroundColorAsync } from "expo-system-ui";
import * as SystemUI from "expo-system-ui";
// import { StatusBar } from 'expo-status-bar';
import { GlobalProvider } from "../Global/globalcontext.js";
// import style from "../"
import { LogBox } from "react-native";
import { StatusBar, Platform } from "react-native";
import { useFocusEffect } from "expo-router";
import CommunityPage from "../SCREENS/CommunityPage.jsx";
import BlogPage from "../SCREENS/BlogPage.jsx";
import MediaPost from "../SCREENS/MediaPost.js";
import JobPostingPage from "../SCREENS/JobPosting.jsx";
// import ReadMore1 from "../../SCREENS/trial-1.js";

import AllPostsScreen from '../SCREENS/SavedPost.js'
import VerificationPendingScreen from '../SCREENS/InvestorVerify.js'
import InvestorNotVerifiedScreen from '../SCREENS/NotVerified.js'
import CertificatePortfolioPage from '../SCREENS/Certificates.js'
import ViewSendedPost from '../SCREENS/JASH/View post/ViewSendedPost.jsx'



const Stack = createNativeStackNavigator();
SystemUI.setBackgroundColorAsync("#16181a");

import { enableFreeze } from "react-native-screens";
import { enableScreens } from "react-native-screens";
import QuestionReply from "@/SCREENS/main-2/QuestionReply.js";
import Settings from "../SCREENS/Settings.js";
enableScreens();

enableFreeze(true);

// LogBox.ignoreLogs([
//   // "VirtualizedLists should never be nested", // Example warning
//   'Warning: Each child in a list should have a unique "key" prop.',
//   "VirtualizedList: Encountered an error while measuring a list's offset from its containing VirtualizedList.",
// ]);

// const originalConsoleWarn = console.warn;
// console.warn = (message, ...args) => {
//   if (
//     // message.includes("VirtualizedLists should never be nested") || // Suppress specific warning
//     message.includes('Each child in a list should have a unique "key" prop.') ||
//     message.includes('Non-serializable') ||
//     message.includes(
//       "Encountered an error while measuring a list's offset from its containing VirtualizedList."
//     ) // Another specific warning
//   ) {
//     return; // Block these warnings
//   }
//   originalConsoleWarn(message, ...args); // Allow other warnings
// };
// export const Global = createContext("ok");

export default function App() {

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

  // if (!fontsLoaded) {
  // }
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      setappisready(true);
    }
  }, [fontsLoaded]);

  return (
    // <NavigationContainer theme={DarkTheme} >
    <GlobalProvider>
      {/* <View style={styles.container}> */}
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
          {/* <Stack.Screen name="Connectionscreen" component={ConnectionsScreen} /> */}
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
          <Stack.Screen name="InvestorWaitingPage" component={InvestorWaitingPage} />

          {/* <Stack.Screen name="Main1" component={Main1} /> */}
          {/* <Stack.Screen name="Main2" component={Main2} /> */}
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
          <Stack.Screen name="VerificationPendingScreen" component={VerificationPendingScreen}/>
          <Stack.Screen name="InvestorNotVerifiedScreen" component={InvestorNotVerifiedScreen} />
          <Stack.Screen name="CertificatePortfolioPage" component={CertificatePortfolioPage} />
          </Stack.Navigator >
      )
      }

      {/* </View> */}
    </GlobalProvider>
    // </NavigationContainer>
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
