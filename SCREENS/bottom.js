import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { BottomSheet } from '@gorhom/bottom-sheet';  // Ensure this is from 'gorhom/bottom-sheet'

export default function OK() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const items = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
    { label: 'Option 5', value: 'option5' },
    { label: 'Option 6', value: 'option6' },
    { label: 'Option 7', value: 'option7' },
    { label: 'Option 8', value: 'option8' },
    { label: 'Option 9', value: 'option9' },
    { label: 'Option 10', value: 'option10' },
    { label: 'Option 11', value: 'option11' },
    { label: 'Option 12', value: 'option12' },
  ];

  const handleValueChange = (value1) => {
    setValue(value1);
  };

  return (
    <View style={{ flex: 1 }}>
      <BottomSheet
        index={0}
        snapPoints={['50%']}
        enablePanDownToClose={true}
        style={{ flex: 1 }}
      >
        <ScrollView nestedScrollEnabled={true}>
          <DropDownPicker
            listMode="SCROLLVIEW"
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={handleValueChange}
            maxHeight={200}
            dropDownDirection="BOTTOM"
            placeholder="Select Option"
            placeholderTextColor="green"
            placeholderStyle={{
              color: '#AEAFAF',
              fontFamily: 'Alata',
              fontSize: 16,
              marginTop: -3,
            }}
            ArrowDownIconComponent={({ style }) => (
              <FontAwesome6 name="chevron-down" size={25} color="#00DE62" />
            )}
            ArrowUpIconComponent={({ style }) => (
              <FontAwesome6 name="chevron-up" size={25} color="#00DE62" />
            )}
            style={{
              width: '94%',
              alignSelf: 'center',
              backgroundColor: '#24272A',
              borderRadius: 10,
              borderWidth: 3,
              borderColor: '#16181A',
              zIndex: 200,
              maxHeight: 200,
            }}
            dropDownContainerStyle={{
              backgroundColor: '#363A3E',
              opacity: 0.99,
              maxHeight: 200,
              width: '93%',
              alignSelf: 'center',
              borderColor: 'transparent',
              elevation: 10,
              zIndex: 1100,
              overflow: 'scroll',
            }}
            listItemContainerStyle={{
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              height: 50,
            }}
            listItemLabelStyle={{
              color: '#AEAFAF',
              textAlign: 'left',
              fontSize: 20,
              fontFamily: 'abeeze',
            }}
            labelStyle={{
              fontFamily: 'abeeze',
              fontSize: 20,
              color: '#AEAFAF',
            }}
            nestedScrollEnabled={true}
          />
        </ScrollView>
      </BottomSheet>
    </View>
  );
}
