import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { defaultStyles } from '@/constants/Styles';
import React, { useState } from 'react';
import Colors from '@/constants/Colors';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSignUp } from '@clerk/clerk-expo';

const SignupPage = () => {

    // User Information
    const [countryCode, setCountryCode] = useState('+1');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    // Keyboard offset for iOS
    const keybordVerticalOffset = Platform.OS === 'ios' ? 80 : 0;

    // Router
    const router = useRouter();

    // Signup
    const { signUp } = useSignUp();


    // Signup function using phone number with Clerk
    const onSignup = async () => {
        console.log('Signup', countryCode, phoneNumber, firstName, lastName);
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;
        const fullName = `${firstName} ${lastName}`;

        // For testing purposes, we will skip the phone verification
        // router.push({ pathname: '/verify/[phone]', params: { phone: `${countryCode}${phoneNumber}` } });

        try {
            // Create a new user using the phone number
            await signUp!.create({
                phoneNumber: `${countryCode}${phoneNumber}`,
                firstName: firstName,
                lastName: lastName,
            });
            // This is needed to prepare the phone number verification
            signUp!.preparePhoneNumberVerification();
            // Redirect to the verification page
            router.push({ pathname: '/verify/[phone]', params: { phone: fullPhoneNumber } });
        }
        catch (err: any) {
            console.error('Failed to sign up', err);
            return;
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={keybordVerticalOffset}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={defaultStyles.container}>
                    <Text style={defaultStyles.header}>Let's get started!</Text>
                    <Text style={defaultStyles.descriptionText}>Enter your phone number. Then, we will send you a confirmation code.</Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Country Code'
                            style={[styles.input, { flex: 0.2, marginRight: 10 }]}
                            value={countryCode}
                            onChangeText={setCountryCode}
                        />
                        <TextInput
                            placeholder='Phone number'
                            style={[styles.input, { flex: 0.8 }]}
                            keyboardType='numeric'
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='First Name'
                            style={[styles.input, { flex: 0.5, marginTop: 20, marginRight: 10 }]}
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                        <TextInput
                            placeholder='Last Name'
                            style={[styles.input, { flex: 0.5, marginTop: 20 }]}
                            value={lastName}
                            onChangeText={setLastName}
                        />
                    </View>

                    <Link href={'/login'} replace asChild>
                        <TouchableOpacity>
                            <Text style={styles.textLink}>Already have an account? Log in.</Text>
                        </TouchableOpacity>
                    </Link>

                    <TouchableOpacity
                        style={[
                            defaultStyles.pillButton,
                            phoneNumber !== '' ? styles.enabled : styles.disabled,
                            { marginTop: 20 }
                        ]}
                        onPress={onSignup}
                        disabled={phoneNumber === ''}
                    >
                        <Text style={defaultStyles.buttonText}>Signup</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default SignupPage;

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 20,
        flexDirection: 'row',
    },
    input: {
        borderColor: 'black',
        borderRadius: 16,
        padding: 15,
        fontSize: 18,
        backgroundColor: Colors.lightGray,
    },
    textLink: {
        color: Colors.primary,
        borderRadius: 10,
        fontSize: 16,
    },
    enabled: {
        backgroundColor: Colors.primary,
    },
    disabled: {
        backgroundColor: Colors.primaryMuted,
    },
});
