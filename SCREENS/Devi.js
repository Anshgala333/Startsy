import React, { useState } from 'react';
import { View, Button, Platform, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Devi = ({ show, setShow, date, setDate, filtereddate, setfiltereddate }) => {
  // const [date, setDate] = useState(new Date());
  // const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === 'ios'); // For iOS, keep picker open
    if (selectedDate) {
      // console.log("this is component cosoel");

      setDate(selectedDate);
      const messageDate1 = selectedDate.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      // console.log(messageDate1);
      setfiltereddate(messageDate1);
      // console.log(date);


    }
  };
  const today = new Date();
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(today.getFullYear() - 18);




  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Text>Selected Date: {date.toDateString()}</Text> */}
      {/* <Button title="Pick a Date" onPress={() => setShow(true)} /> */}


      {show && (
        <DateTimePicker
          value={date}
          minimumDate={new Date(1920, 0, 1)}
          maximumDate={eighteenYearsAgo}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default Devi;
