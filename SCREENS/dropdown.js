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
            searchPlaceholderTextColor='#828282'
            searchTextInputProps={{
                color: "#828282",
                fontFamily: "Alata",
                fontSize: 16,
            }}
            searchTextInputStyle={{
                borderColor: "transparent",
                color: "#AEAFAF",
                width : "100%",
                // borderwidth : 0,
                // backgroundColor: "red",
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
                fontFamily: 'Alata',
                fontSize: 20,
                fontWeight : "0",
                fontWeight : 0,
                marginTop: 0,
            }}
            ArrowDownIconComponent={({ style }) => (
                <FontAwesome6 name="chevron-down" size={25} color="#828282" />
            )}
            ArrowUpIconComponent={({ style }) => (
                <FontAwesome6 name="chevron-up" size={25} color="#828282" />
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
                color: '#828282',
                textAlign: 'left',
                fontSize: 20,
                fontFamily: "Alata",
                includeFontPadding: false,
            }}
            labelStyle={{
                // color : "red",
                fontFamily: 'Alata',
                fontSize: 20,
                color: '#ccc',
                paddingBottom: 0,
                marginBottom: -5,
                includeFontPadding: false,
            }}
            nestedScrollEnabled={true}
        />





    );
}
