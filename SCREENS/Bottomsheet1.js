
import B1 from "../assets/icons/b1.js";
import B2 from "../assets/icons/b2.js";
import B3 from "../assets/icons/b3.js";
import B4 from "../assets/icons/b4.js";
import BottomSheet, { BottomSheetView, BottomSheetScrollView, BottomSheetTextInput, BottomSheetFlatList, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import styles from "../styles/post.js";
import { memo, useMemo, useRef } from "react";
import { Pressable , View  ,Text} from "react-native";


const BottomSheet1 = ({navigation , mainpagebottomsheet}) => {

    const openBottomSheet1 = () => {
        navigation.navigate("CommunityPage")     
    };

    const openBottomSheet2 = () => {
        navigation.navigate("Blogpage")
    };

    const openBottomSheet3 = () => {
        setfour(true);
        // console.log(uri, "main page se hu");

        // bottomSheetRef3.current?.expand();
        setstatus(true);
        // setImage("")
        setc2("")
        seterr7(false);
        seterr6(false);
        setVisible(false);
    };

    const openBottomSheet4 = () => {
        navigation.navigate("Jobpost")
    };

    // const mainpagebottomsheet = useRef();
    const snapPoints = useMemo(() => ['20%'], []);

      const renderBackdrop = (props) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1} // Backdrop disappears when BottomSheet is closed
                appearsOnIndex={0} // Backdrop appears when BottomSheet is open
                opacity={0.7} // Set opacity for the backdrop
            />
        );



    const BottomSheetContent = memo(() => {
        return (
            <BottomSheetView style={styles.bottomSheetContent}>
                <Pressable style={styles.iconButton} onPress={openBottomSheet1}>
                    <View style={[styles.ic, { flex: 1, width: "100%", alignSelf: "center" }]}>
                        <B1 />
                    </View>
                    <Text style={styles.bottomsheettext}>Community</Text>
                </Pressable>
                <Pressable style={styles.iconButton} onPress={openBottomSheet2}>
                    <View style={[styles.ic, { flex: 1, width: "100%", alignSelf: "center" }]}>
                        <B2 />
                    </View>
                    <Text style={styles.bottomsheettext}>Blog</Text>
                </Pressable>
                <Pressable style={styles.iconButton} onPress={() => askAspectRatio()}>
                    <View style={[styles.ic, { flex: 1, width: "100%", alignSelf: "center" }]}>
                        <B3 />
                    </View>
                    <Text style={styles.bottomsheettext}>Media</Text>
                </Pressable>
                  <Pressable style={styles.iconButton} onPress={openBottomSheet4}>
                    <View style={[styles.ic, { flex: 1, width: "100%", alignSelf: "center" }]}>
                        <B4 />
                    </View>
                    <Text style={styles.bottomsheettext}>Job Posting</Text>
                </Pressable>
            </BottomSheetView>
        )
    });
    return (

        <BottomSheet
            enablePanDownToClose
            backgroundStyle={{ backgroundColor: '#16181a', borderRadius: 30 }}
            handleIndicatorStyle={{ backgroundColor: '#00de62' }}
            style={{ zIndex: 1000000, elevation: 1000 }}
            enableDynamicSizing={false}
            ref={mainpagebottomsheet}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            index={-1}
        >
            <BottomSheetContent />
        </BottomSheet>
    )
}


export default BottomSheet1