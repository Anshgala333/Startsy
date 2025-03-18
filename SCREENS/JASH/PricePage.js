import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Back from "@/components/back.js";

const PricePage = ({ route, navigation }) => {
    const { type, id, useremail } = route.params

    return (
        <View style={styles.container}>

            <ScrollView
                showsVerticalScrollIndicator={false}
            >

                {/* <PlanCard
                    title="Free Plan"
                    features={[
                        "Access to basic startup profiles.",
                        "Ability to swipe through founders (limited swipes per day).",
                        "Limited insights into startup traction and market fit",
                    ]}
                    isFirst={true}
                    type={type}
                    id={id}
                    useremail={useremail}
                    navigation={navigation}
                /> */}
                {/* <PlanCard
                    title="Step up Plan"
                    features={[
                        "Access to advanced founder profiles. (Step up Founders)",
                        "Unlimited swipes and advanced filters for startups.",
                        "Early access to new startups launching on the platform.",
                    ]}
                    type={type}
                    id={id}
                    useremail={useremail}
                    navigation={navigation}
                /> */}
                {/* <PlanCard
                    title="Booster Plan"
                    features={[
                        "Everything in the Pro Plan.",
                        "First access to Investor readiness evaluated founder profiles. (Boosted founders)",
                        "Risk Evaluator function",
                    ]}
                    type={type}
                    id={id}
                    useremail={useremail}
                    navigation={navigation}
                /> */}
            </ScrollView>
        </View>
    )
}


const PlanCard = ({ title, features, isFirst , type , id , useremail  , navigation}) => {
    return (
        <View style={styles.card}>
            {isFirst &&
                <TouchableOpacity style={styles.okayButton}>
                    <Text style={styles.okayText}>
                           <Back />
                    </Text>
                </TouchableOpacity>
            }
            <Text style={styles.planTitle}>{title}</Text>

            {features.map((feature, index) => (
                <View style={styles.featuresContainer} >
                    <Text style={styles.featureStartText}>•</Text>
                    <Text key={index} style={styles.featureText}>{feature}</Text>
                </View>
            ))}

           {isFirst &&  <TouchableOpacity onPress={() => {
                navigation.navigate("Signup5", { type, id, useremail: useremail });
            }} style={styles.proceedButton}>
                <Text style={styles.proceedText}>Proceed</Text>
            </TouchableOpacity>}

            {!isFirst &&  <TouchableOpacity onPress={() => {
            }} style={styles.proceedButton}>
                <Text style={styles.proceedText}>coming soon</Text>
            </TouchableOpacity>}
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#16181a",
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    okayButton: {
        alignSelf: "flex-start",
        marginBottom: 10,
    },
    okayText: {
        color: "#00de62",
        fontSize: 18,
        fontWeight: "bold",
    },
    card: {
        backgroundColor: "#1e1e1e",
        padding: 16, 
        borderBottomColor: 'gray',
        borderBottomWidth: 1

    },
    planTitle: {
        color: "#00de62",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    featuresContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
        // backgroundColor:'red',
        gap: 10,

    },
    featureStartText: {
        color: "#ccc",
        fontSize: 14,
        lineHeight: 30

    },
    featureText: {
        color: "#ccc",
        fontSize: 14,
        // marginBottom: 6,
        textAlign: 'justify',
        lineHeight: 30,
        marginRight: 10,
        // letterSpacing: 1

    },
    proceedButton: {
        backgroundColor: "#ffffff",
        paddingVertical: 5,
        paddingHorizontal: 16,
        borderRadius: 20,
        alignSelf: "flex-end",
        marginTop: 10,
    },
    proceedText: {
        color: "#000",
        fontSize :14,
        // fontWeight: "bold",
        fontFamily : "Alata"
    },
});



export default PricePage



