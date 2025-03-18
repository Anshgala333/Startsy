import React, { useRef, useState } from 'react';
import {
    Button,
    DrawerLayoutAndroid,
    Text,
    StyleSheet,
    View
} from 'react-native';
import { BlurView } from "expo-blur";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const Skeleton1 = () => {
    const drawer = useRef(null);
    const [drawerPosition, setDrawerPosition] = useState('left');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const changeDrawerPosition = () => {
        setDrawerPosition(prev => (prev === 'left' ? 'right' : 'left'));
    };

    const navigationView = () => (
        <SafeAreaView style={[styles.container, styles.navigationContainer]}>
            <Text style={styles.paragraph}>I'm in the Drawer!</Text>
            <Button
                title="Close drawer"
                onPress={() => {
                    drawer.current.closeDrawer();
                    setIsDrawerOpen(false);
                }}
            />
        </SafeAreaView>
    );

    return (
        <SafeAreaProvider>
            <DrawerLayoutAndroid
                ref={drawer}
                drawerWidth={300}
                drawerPosition={drawerPosition}
                onDrawerOpen={() => setIsDrawerOpen(true)}
                onDrawerClose={() => setIsDrawerOpen(false)}
                renderNavigationView={navigationView}
            >
                <SafeAreaView style={styles.container}>
                    {isDrawerOpen && (
                        <BlurView style={styles.blurOverlay} blurType="light" blurAmount={32} experimentalBlurMethod="dimezisBlurView"
                        />
                    )}
                    <Text style={styles.paragraph}>Drawer on the {drawerPosition}!</Text>
                    <Text style={styles.paragraph}>
                        Swipe from the side or press button below to see it!
                    </Text>
                    <Button
                        title="Open drawer"
                        onPress={() => {
                            drawer.current.openDrawer();
                            setIsDrawerOpen(true);
                        }}
                    />
                </SafeAreaView>
            </DrawerLayoutAndroid>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    navigationContainer: {
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        padding: 16,
        fontSize: 15,
        textAlign: 'center',
    },
    blurOverlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },
});

export default Skeleton1;
