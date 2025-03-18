import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { BorderlessButton } from 'react-native-gesture-handler';

export default function Drop({ items,search, bleft,bright,btop,bbottom, backgroundColor, onValueChange, job, placeholder, open, setOpen, extra, bottomsheet, edit, width, width1, up, gender , bl , br , bt , bb , borderColor , borderwidth , pccolor , bradius }) {
    // const [open, setOpen] = useState(false);
    // console.log(search);
    // console.log(onValueChange , "drop ");
    // onValueChange("tp")
    
    
    const [value, setValue] = useState(null);
    var placeholdertext;
    if(placeholder){
        placeholdertext = placeholder
    }
    else if (extra) {
        if (bottomsheet) {
            placeholdertext = "Rules"
        }
        else if (gender) {

            placeholdertext = "Gender"
        }
        else placeholdertext = "Country"

    }

    else placeholdertext = "Select"

    // const [items, setItems] = useState([
    //     { label: 'Option 1', value: 'option1' },
    //     { label: 'Option 2', value: 'option2' },
    //     { label: 'Option 3', value: 'option3' },
    //     { label: 'Option 4', value: 'option4' },
    //     { label: 'Option 5', value: 'option5' },
    //     { label: 'Option 6', value: 'option6' },
    //     { label: 'Option 7', value: 'option7' },
    //     { label: 'Option 8', value: 'option8' },
    //     { label: 'Option 9', value: 'option9' },
    //     { label: 'Option 10', value: 'option10' },
    //     { label: 'Option 11', value: 'option11' },
    //     { label: 'Option 12', value: 'option12' },
    //     { label: 'Option 13', value: 'option13' },
    //     { label: 'Option 14', value: 'option14' },
    //     { label: 'Option 15', value: 'option15' },
    // ]);
    const handleValueChange = (value1) => {
        // console.log(value1, "main");
        setValue(value1);

        if (onValueChange) {
            // console.log("value");
            
            onValueChange(value1); // Call the function passed from the parent
            setValue(value1); // Call the function passed from the parent
        }
    };
    var tree
    if(search == false){
        tree = false
    }
    else tree = true

    return (




        <DropDownPicker
            searchable={tree}
            // searchable={false}

            searchPlaceholder='Search'
            searchPlaceholderTextColor='#AEAFAF'
            searchTextInputStyle={{
                borderColor: "transparent",
                color: "#AEAFAF",
                backgroundColor: "#24272A",
                // fontFamily: "Roboto",
                fontSize: 16,
                // padding : 20
            }}



            listMode='SCROLLVIEW'
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={handleValueChange}
            maxHeight={300}
            dropDownDirection={up ? "TOP" : "BOTTOM"}
            placeholder={placeholdertext}
            placeholderTextColor="green"
            placeholderStyle={{
                color: pccolor ? pccolor : "#666",
                // fontFamily: 'Roboto',
                fontSize: 18,
                fontWeight : "0",
                fontWeight : 0,
                marginTop: 0,
            }}
            ArrowDownIconComponent={({ style }) => (
                <FontAwesome6 name="chevron-down" size={20} color="#00DE62" />
            )}
            ArrowUpIconComponent={({ style }) => (
                <FontAwesome6 name="chevron-up" size={20} color="#00DE62" />
            )}
            style={{
                width: extra ? "91%" : "94%",
                width: edit ? "89%" : extra ? "91%" : "94%",
                width: width ? width : "94%",

                alignSelf: "center",
                backgroundColor: '#24272A',
                backgroundColor: bottomsheet ? "transparent" : "#24272A",
                backgroundColor: edit ? "transparent" : "#24272A",
                backgroundColor : job ? "transparent" : "#24272A",
                backgroundColor : "rgba(33, 34, 35, 0.5)",
                backgroundColor : "transparent",
                // rgba(33, 34, 35, 0.5)
                // backgroundColor : backgroundColor  ? backgroundColor : "#24272A",
                borderRadius: bradius ? bradius : 12,
                borderWidth : 0,
                // borderWidth: 3,


                borderTopWidth: bt ? bt : borderwidth,
                borderLeftWidth: bl ? bl : borderwidth,
                borderRightWidth: br ? br : borderwidth,
                borderBottomWidth: bb ? bb : borderwidth,

                borderColor: borderColor ? borderColor : 'gray',
                // borderColor: job ? "#666" : '#666',
                zIndex: 200,
                maxHeight: 200,
                includeFontPadding: false,
                // overflow : "hidden",
            }}
            dropDownContainerStyle={{
                // backgroundColor: '#363A3E',
                // backgroundColor: '#16181a',
                backgroundColor: "#24272A",
                opacity: 0.99,
                maxHeight: 200,
                width: extra ? "90.5%" : "93%",
                width: width1 ? width1 : extra ? "90.5%" : "93%",
                // width: '90.5%',
                width : width ? width : "93%",
                maxHeight: 300,
                alignSelf: 'center',
                borderColor: 'transparent',
                elevation: 10,
                display: "flex",
                zIndex: 1100,
                overflow: "scroll",
                includeFontPadding: false,

            }}
            TickIconComponent={() => (
                <FontAwesome6 name="check" size={20} color="#00DF60" />
            )}
            listItemContainerStyle={{
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderBottomColor: '#24272A',
                borderBottomWidth: 1,
                height: 50,
                includeFontPadding: false,
            }}
            listItemLabelStyle={{
                color: '#AEAFAF',
                textAlign: 'left',
                fontSize: 20,
                // fontFamily: "Roboto",
                includeFontPadding: false,
            }}
            labelStyle={{
                // color : "red",
                // fontFamily: 'Roboto',
                fontSize: 20,
                color: '#AEAFAF',
                paddingBottom: 0,
                marginBottom: -5,
                includeFontPadding: false,
            }}
            nestedScrollEnabled={true}
        />





    );
}
