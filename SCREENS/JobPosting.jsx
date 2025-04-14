
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, Text, TextInput, Pressable, ActivityIndicator, Vibration, Image, StyleSheet, Platform, ScrollView } from "react-native";
import { GlobalContext } from "@/Global/globalcontext.js";
import { url } from '../config.js'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import Drop from "@/SCREENS/dropdown.js";
import styles from '../styles/JobStyles.jsx'
import B1 from "@/assets/icons/b1.js";
import B4 from "@/assets/icons/b4.js";

const JobPostingPage = () => {

  const data = useContext(GlobalContext);
  const token = data.globaldata.token;
  const navigation = useNavigation();

  const [roleName, setRoleName] = useState("");  //controller for community name
  const [description, setdescription] = useState("");      //controller for descripton
  const [roleError, setRoleError] = useState(false);             //error for community name
  const [descriptionError, setDescriptionError] = useState(false);             //error for description
  const [durationError, setDurationError] = useState(false);
  const [paymentError, setPaymentError] = useState(false);            //error for rule section
  const [loading, setLoading] = useState(false);           //loading field
  const [buttonText, setButtonText] = useState("Post");    //submit button text
  const [onDurationValueChange, setOnDurationValueChange] = useState("")   ///controller for rule section
  const [onPaymentMethodChange, setOnPaymentMethodChange] = useState("")   ///controller for rule section
  const maxLength = 1000;                                  ///length count for description
  const [openDurationDrop, setOpenDurationDrop] = useState(false);                 ///state for rule section
  const [openPayValuesDrop, setOpenPayValuesDrop] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0)                ///state for rule section


  //items for drop down
  var durationValues = [
    { label: "Full time", value: "Full time" },
    { label: "Part time", value: "Part time" },


  ]

  var payValues = [
    { label: "Stock Pay", value: "Stock Pay" },
    { label: "Cash Pay", value: "Cash Pay" },
    { label: "Flexi Pay", value: "Flexi Pay" },


  ]



  const post = async function () {

    let jobError = false;

    // console.log("here");






    setLoading(true);
    if (roleName == "") {
      setRoleError(true);
      jobError = true;
    }
    if (description == "") {
      setDescriptionError(true);
      jobError = true;
    }

    // if (onDurationValueChange == "") {
    //   setDurationError(true)
    //   jobError = true;
    // }


    // if (onPaymentMethodChange == "") {
    //   console.log(onPaymentMethodChange);

    //   setPaymentError(true);
    //   jobError = true;
    // }

    if (jobError == true) {


      setLoading(false);
      return;
    }


    const postType = "jobPost";
    const finaldata = {
      "role": roleName,
      "description": description,
      // "duration": onDurationValueChange,
      // "pay": onPaymentMethodChange,
      "amount": paymentAmount
    };



    try {
      const response = await fetch(`${url}posts/createJobPost/${postType}`, {
        method: 'POST',
        body: JSON.stringify(finaldata),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();


      if (response.status === 201) {
        setButtonText("Posted");
        Vibration.vibrate(100);
        navigation.goBack();

      }
      // mainpagebottomsheet.current?.close();
      setRoleError(false);
      setDescriptionError(false);
      // setDurationError(false);
      setPaymentError(false);
      // setOnDurationValueChange("")
      // setOnPaymentMethodChange(" ")
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };



  useLayoutEffect(() => {
    navigation.setOptions(

    )
  }, [])




  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#16181a' }}>

      <ScrollView keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
        contentContainerStyle={{ flexGrow: 1 }}>

        <View style={styles.container} >

          {/* image for community */}
          <B4 />


          {/* Community name field */}
          <View style={{ flex: 3 }}>
            <TextInput
              placeholderTextColor="gray"
              style={styles.input}
              placeholder="Role"
              value={roleName}
              onChangeText={setRoleName}
            />


            {/* show error is community name field is empty */}
            {roleError && <Text style={styles.errorStyle}>*Community name is required</Text>}


            {/* Description field */}
            <View style={{ marginTop: 10 }}>
              <Text style={styles.label}>Job Description :</Text>
              <TextInput
                style={styles.textArea}
                value={description}
                multiline
                numberOfLines={6}
                maxLength={maxLength}
                onChangeText={setdescription}
              />
              <Text style={styles.descriptionLength}>{description.length}/{maxLength} </Text>


              {/* show error is description field is empty */}
              {descriptionError && <Text style={styles.errorStyle}>*Description is required</Text>}


            </View>


            <View >
              <TextInput
                style={styles.input}
                maxLength={15}
                placeholder="Offering (₹ or %)"
                placeholderTextColor={"gray"}
                value={paymentAmount}
                onChangeText={setPaymentAmount}
              />
            </View>


            <Pressable onPress={post} style={styles.button}>

              {/* show loading if pressed on post button */}

              {loading ?

                <ActivityIndicator size={24} color="#16181a" />

                : <Text style={styles.buttonText}>{buttonText}</Text>
              }

            </Pressable>

          </View>
        </View>
      </ScrollView>

    </GestureHandlerRootView>

  );
};

export default JobPostingPage;





// <View style={{ marginTop: 10 }}>
//               <Text style={styles.label}>Duration</Text>
//               <Drop
//                 borderwidth={1}
//                 items={durationValues}
//                 edit={true}
//                 onValueChange={setOnDurationValueChange}
//                 open={openDurationDrop} setOpen={setOpenDurationDrop}
//                 width="100%" search={false}
//                 placeholder={"Select a duration"}
//               />

//               {/* show error when duration field is empty */}
//               {durationError && <Text style={styles.errorStyle}>*Rule is required</Text>}

//             </View>
//             <View style={{ marginTop: 20 }}>
//               <Text style={styles.label}>Payment method</Text>
//               <Drop
//                 borderwidth={1}

//                 items={payValues}
//                 onValueChange={setOnPaymentMethodChange}
//                 open={openPayValuesDrop} setOpen={setOpenPayValuesDrop}
//                 width="100%" search={false}
//                 placeholder={"Select a payment method"}
//               />

//               {/* show error when payment method field is empty */}
//               {paymentError && <Text style={styles.errorStyle}>*Rule is required</Text>}

//             </View>