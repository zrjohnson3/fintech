import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { defaultStyles } from '@/constants/Styles';
import React from 'react';
import Colors from '@/constants/Colors';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo';

enum SignInType {
    Phone,
    Email,
    Google,
    Apple
}

const Page = () => {
    const [countryCode, setCountryCode] = React.useState('+1');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const keybordVerticalOffset = Platform.OS === 'ios' ? 80 : 0;
    const router = useRouter();
    const { signIn } = useSignIn();



    const onSignIn = async (type: SignInType) => {
        console.log('Login', countryCode, phoneNumber);
        if (type === SignInType.Phone) {
            console.log('Sign in with Phone');
            try {
                const fullPhoneNumber = `${countryCode}${phoneNumber}`;

                const { supportedFirstFactors } = await signIn!.create({
                    identifier: fullPhoneNumber,
                });

                const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => factor.strategy === 'phone_code');

                if (!firstPhoneFactor) {
                    throw new Error('No phone factor found');
                }

                const { phoneNumberId } = firstPhoneFactor;

                await signIn!.prepareFirstFactor({
                    strategy: 'phone_code',
                    phoneNumberId: phoneNumberId,
                });

                router.push({ pathname: '/verify/[phone]', params: { phone: fullPhoneNumber, signin: "true" } });
            }
            catch (err: any) {
                console.error('Failed to sign in', JSON.stringify(err, null, 2));
                if (isClerkAPIResponseError(err)) {
                    Alert.alert('Error', err.errors[0].message);
                }
                return;
            }



        } else if (type === SignInType.Email) {
            console.log('Sign in with Email');
        } else if (type === SignInType.Google) {
            console.log('Sign in with Google');
        } else if (type === SignInType.Apple) {
            console.log('Sign in with Apple');
        } else {
            console.log('Sign in with other');
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
                    <Text style={defaultStyles.header}>Welcome back!</Text>
                    <Text style={defaultStyles.descriptionText}>Enter your phone number associated with your account.</Text>

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

                    <TouchableOpacity
                        style={[
                            defaultStyles.pillButton,
                            phoneNumber !== '' ? styles.enabled : styles.disabled,
                            { marginTop: 20 }
                        ]}
                        onPress={() => onSignIn(SignInType.Phone)}
                        disabled={phoneNumber === ''}
                    >
                        <Text style={defaultStyles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: "row", alignItems: 'center', gap: 16, paddingTop: 20 }}>
                        <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray }} />
                        <Text style={{ color: Colors.gray, fontSize: 20 }}>OR</Text>
                        <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray }} />
                    </View>

                    <TouchableOpacity
                        style={[defaultStyles.pillButton, { backgroundColor: 'white', flexDirection: 'row', gap: 16, marginTop: 20 }]}
                        onPress={() => onSignIn(SignInType.Email)}
                    >
                        <Ionicons name='mail' size={24} color='black' />
                        <Text style={[defaultStyles.buttonText, { color: 'black' }]}>Login with Email</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[defaultStyles.pillButton, { backgroundColor: 'white', flexDirection: 'row', gap: 16, marginTop: 20 }]} onPress={() => onSignIn(SignInType.Google)}>
                        <Ionicons name='logo-google' size={24} color='black' />
                        <Text style={[defaultStyles.buttonText, { color: 'black' }]}>Login with Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[defaultStyles.pillButton, { backgroundColor: 'white', flexDirection: 'row', gap: 16, marginTop: 20 }]} onPress={() => onSignIn(SignInType.Apple)}>
                        <Ionicons name='logo-apple' size={24} color='black' />
                        <Text style={[defaultStyles.buttonText, { color: 'black' }]}>Login with Apple</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default Page;

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
