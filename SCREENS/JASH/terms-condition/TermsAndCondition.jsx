import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity ,Linking} from 'react-native';
import { useFonts } from 'expo-font';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const TermsAndConditions = () => {

    const navigation = useNavigation()


    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, left: 0 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesome6 name="chevron-left" size={25} style={{ alignSelf: 'flex-start', marginTop: 4 }} color="#00DF60" />
                    </TouchableOpacity>
                    <Text style={styles.header}>Terms & Conditions</Text>
                </View>

                <Text style={{ color: '#ccc', fontFamily: 'alata', marginTop: 20, fontSize: 16 }}>Last Updated: 2nd April 2025</Text>

                <Text style={styles.sectionTitle}>1. INTRODUCTION</Text>
                <Text style={styles.text}>1.1)  These Terms and Conditions ("T&C") govern the use of Startsy ("Platform"), owned and operated by RSPY Tech Private Limited, by its users, including but not limited to Investors, Founders, Job Seekers, and Community Members (collectively referred to as "Users").</Text>

                <Text style={styles.text}>1.2) By accessing or using Startsy, Users acknowledge and agree to be bound by these T&C, along with any additional policies, terms, or agreements as applicable. If Users do not agree, they must discontinue the use of the Platform immediately.</Text>

                <Text style={styles.sectionTitle}>2. ELIGIBILITY AND ACCOUNT REGISTRATION</Text>
                <Text style={styles.text}>2.1) Users must be at least 18 years of age to create an account on Startsy. By registering, Users represent and warrant that they have the legal capacity to enter into binding contracts under applicable law.</Text>

                <Text style={styles.text}>2.2) Users are required to provide accurate, current, and complete information during registration and must keep their account information updated at all times.</Text>

                <Text style={styles.text}>2.3) The Company reserves the right to suspend or terminate accounts that contain false or misleading information, engage in fraudulent activities, or violate these T&C.</Text>

                <Text style={styles.sectionTitle}>3. PLATFORM USAGE AND USER RESPONSIBILITIES</Text>
                <Text style={styles.text}>Startsy is a networking platform that facilitates interactions between Founders, Investors, Job Seekers, and Community Members. The Company does not guarantee funding, employment, or business success.</Text>

                <Text style={styles.text}>Users agree to:</Text>
                <Text style={styles.text}>a) Abide by all applicable laws and regulations while using the Platform.</Text>
                <Text style={styles.text}>b) Refrain from sharing false, misleading, or defamatory content.</Text>
                <Text style={styles.text}>c) Respect the confidentiality of other Users and not disclose proprietary information without appropriate consent.</Text>
                <Text style={styles.text}>d) Not engage in spamming, phishing, harassment, or any other form of abusive conduct.</Text>
                <Text style={styles.text}>e) Take full responsibility for interactions and engagements made on the Platform.</Text>

                <Text style={styles.sectionTitle}>4. INVESTOR TERMS</Text>
                <Text style={styles.text}>Investors must undergo verification to access certain features, including detailed startup profiles.</Text>

                <Text style={styles.text}>Startsy does not verify the legitimacy of any investment opportunity. Investors are solely responsible for conducting their own due diligence before making investment decisions.</Text>

                <Text style={styles.text}>Investors must not use the Platform to solicit, advertise, or misrepresent their financial position.</Text>

                <Text style={styles.sectionTitle}>5. FOUNDER TERMS</Text>
                <Text style={styles.text}>Founders seeking investment must provide accurate and verifiable business details.</Text>

                <Text style={styles.text}>The Company does not provide any warranties or guarantees regarding funding. Founders agree that they will not hold Startsy liable for any investment losses or rejections.</Text>

                <Text style={styles.text}>Founders are responsible for the confidentiality and protection of their startup’s intellectual property. It is strongly advised that they implement Non-Disclosure Agreements (NDAs) when discussing business opportunities with third parties.</Text>

                <Text style={styles.sectionTitle}>6. JOB SEEKERS AND COMMUNITY MEMBERS</Text>
                <Text style={styles.text}>The Platform provides networking opportunities for job seekers but does not guarantee employment.</Text>

                <Text style={styles.text}>Users must ensure that their resumes, credentials, and work experiences are accurate and not misrepresented.</Text>

                <Text style={styles.text}>Startsy shall not be held responsible for disputes between job seekers and employers, including but not limited to unpaid salaries, contractual disagreements, or hiring processes.</Text>

                <Text style={styles.sectionTitle}>7. INTELLECTUAL PROPERTY RIGHTS</Text>
                <Text style={styles.text}>7.1) All content, including trademarks, logos, software, and proprietary information on the Platform, is the exclusive property of RSPY Tech Private Limited. Unauthorized reproduction, modification, or distribution is strictly prohibited.</Text>
                <Text style={styles.text}>7.2) Users may not use Startsy’s intellectual property without prior written consent from the Company.</Text>

                <Text style={styles.sectionTitle}>8. CONFIDENTIALITY AND DATA PRIVACY</Text>
                <Text style={styles.text}>Users acknowledge that certain information shared on the Platform may be confidential. Users shall not disclose or misuse such information for any purpose other than intended networking.</Text>

                <Text style={styles.text}>The Company processes User data in compliance with applicable data protection laws, including but not limited to the Information Technology Act, 2000, and the General Data Protection Regulation (GDPR), where applicable.</Text>

                <Text style={styles.text}>Users consent to the collection, processing, and use of their personal information as outlined in Startsy’s Privacy Policy.</Text>

                <Text style={styles.sectionTitle}>9. PAYMENT, SUBSCRIPTIONS, AND REFUNDS</Text>
                <Text style={styles.text}>Some features of Startsy may require a paid subscription. The pricing, duration, and benefits of each subscription tier will be outlined separately.</Text>

                <Text style={styles.text}>Payments are processed through secure third-party payment gateways. The Company does not store Users’ financial information.</Text>

                <Text style={styles.text}>All payments made for subscriptions or premium services are non-refundable unless otherwise stated.</Text>

                <Text style={styles.sectionTitle}>10. LIMITATION OF LIABILITY</Text>
                <Text style={styles.text}>Startsy provides its services on an “as-is” and “as-available” basis. The Company disclaims all warranties.</Text>
                <Text style={styles.text}>
                    10.2 Under no circumstances shall the Company be liable for:

                </Text>
                <Text style={styles.text}>
                    a) Any indirect, incidental, or consequential damages arising from the use of the Platform.
                </Text>
                <Text style={styles.text}>b) Loss of data, profits, or business opportunities due to platform errors, downtime, or security breaches.

                </Text>
                <Text style={styles.text}>
                    c) Misconduct, fraud, or misrepresentation by any User on the Platform.
                </Text>

                <Text style={styles.sectionTitle}>11. TERMINATION AND ACCOUNT SUSPENSION</Text>
                <Text style={styles.text}>11.1) The Company reserves the right to suspend or terminate any account found in violation of these T&C.</Text>
                <Text style={styles.text}>11.2) Users may voluntarily delete their accounts; however, no refunds shall be issued for any unused subscription period.</Text>

                <Text style={styles.sectionTitle}>12. DISPUTE RESOLUTION AND GOVERNING LAW</Text>
                <Text style={styles.text}>12.1) Any disputes arising from these T&C shall be resolved through arbitration in Mumbai, India.</Text>
                <Text style={styles.text}>12.2) These T&C shall be governed by and construed in accordance with the laws of India. Any disputes not settled through arbitration shall be subject to the jurisdiction of the courts in Mumbai.</Text>

                <Text style={styles.sectionTitle}>13. AMENDMENTS TO TERMS & CONDITIONS</Text>
                <Text style={styles.text}>The Company reserves the right to modify, update, or revise these T&C at any time.</Text>

                <Text style={styles.sectionTitle}>14. CONTACT INFORMATION</Text>
               
                <Text style={styles.text}>For any questions, contact Startsy at Email:</Text>
                <View style={{flexDirection:'row',gap:5}}>
                <Text style={styles.text}>Email :</Text>
                    <TouchableOpacity onPress={()=>{
                        Linking.openURL(`mailto:teamstartsy@gmail.com`);
                    }}>
                        <Text style={styles.emailText}>teamstartsy@gmail.com</Text>
                    </TouchableOpacity>
                </View>
               
                <Text style={styles.text}>By using Startsy, Users acknowledge that they have read, understood, and agreed to abide by these Terms and Conditions.</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#16181a',
        padding: 20,
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#00de62',
        textAlign: 'center',
        // marginBottom: 20,
        fontFamily: 'myanmar',
    },
    sectionTitle: {
        fontSize: 20,
        // fontWeight: 'bold',
        color: '#ccc',
        marginTop: 18,
        fontFamily: 'Roboto',
        marginBottom: 10,
        // letterSpacing:2
    },
    text: {
        fontSize: 15,
        color: '#c0c0c0',
        marginTop: 5,
        lineHeight: 20,

        // fontFamily: 'Roboto',
    },
    emailText: {
        fontSize: 16,
        color: '#00de62',
        fontFamily: 'Alata',
        textAlign: 'center',
      }
    
});

export default TermsAndConditions;
