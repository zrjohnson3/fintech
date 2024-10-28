import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth, useSignIn } from '@clerk/clerk-expo';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';

const Page = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [successfulCreation, setSuccessfulCreation] = useState(false);
    const [secondFactor, setSecondFactor] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter();
    const { isSignedIn } = useAuth();
    const { isLoaded, signIn, setActive } = useSignIn();

    const keybordVerticalOffset = Platform.OS === 'ios' ? 80 : 0;

    if (!isLoaded) {
        return null;
    }

    useEffect(() => {
        if (isSignedIn) {
            router.push('/(user)/resetPasscode');
        }
    }, [isSignedIn]);


    // Send the password reset code to the user's phone
    async function create() {
        try {
            if (signIn) {
                await signIn.create({
                    strategy: 'reset_password_phone_code', //ResetPasswordPhoneCodeStrategy
                    identifier: phone,
                });
                setSuccessfulCreation(true);
                setError('');
            }
        } catch (err: any) {
            const errorMessage = err?.errors?.[0]?.longMessage || 'Something went wrong';
            console.error('error', errorMessage);
            setError(errorMessage);
        }
    }

    // Reset the user's password
    async function reset() {
        try {
            if (signIn) {
                const result = await signIn.attemptFirstFactor({
                    strategy: 'reset_password_phone_code',
                    code,
                    password,
                });

                if (result?.status === 'needs_second_factor') {
                    setSecondFactor(true);
                    setError('');
                } else if (result?.status === 'complete') {
                    setActive({ session: result.createdSessionId });
                    setError('');
                    router.push('/');
                }
            }
        } catch (err: any) {
            const errorMessage = err?.errors?.[0]?.longMessage || 'Something went wrong';
            console.error('error', errorMessage);
            setError(errorMessage);
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={keybordVerticalOffset}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={defaultStyles.container}>
                    <Text style={defaultStyles.header}>Forgot Password?</Text>

                    {!successfulCreation && (
                        <>
                            <Text style={defaultStyles.descriptionText}>
                                Please provide your phone number
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Phone number"
                                value={phone}
                                onChangeText={(text) => setPhone(text)}
                                keyboardType="phone-pad"
                                autoCapitalize="none"
                            />

                            <TouchableOpacity
                                style={[defaultStyles.pillButton, phone ? styles.enabled : styles.disabled, { marginTop: 20 }]}
                                onPress={create}
                                disabled={!phone}
                            >
                                <Text style={defaultStyles.buttonText}>Send password reset code</Text>
                            </TouchableOpacity>

                            {error && <Text style={styles.errorText}>{error}</Text>}
                        </>
                    )}

                    {successfulCreation && (
                        <>
                            <Text style={defaultStyles.descriptionText}>
                                Enter your new password
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="New password"
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry
                            />

                            <Text style={defaultStyles.descriptionText}>
                                Enter the password reset code sent to your phone
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Reset code"
                                value={code}
                                onChangeText={(text) => setCode(text)}
                            />

                            <TouchableOpacity
                                style={[defaultStyles.pillButton, code && password ? styles.enabled : styles.disabled, { marginTop: 20 }]}
                                onPress={reset}
                                disabled={!code || !password}
                            >
                                <Text style={defaultStyles.buttonText}>Reset Password</Text>
                            </TouchableOpacity>

                            {error && <Text style={styles.errorText}>{error}</Text>}
                        </>
                    )}

                    {secondFactor && (
                        <Text style={defaultStyles.descriptionText}>
                            2FA is required, but this UI does not handle that.
                        </Text>
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    input: {
        borderColor: Colors.gray,
        borderRadius: 16,
        padding: 15,
        fontSize: 18,
        backgroundColor: Colors.lightGray,
        marginTop: 10,
    },
    enabled: {
        backgroundColor: Colors.primary,
    },
    disabled: {
        backgroundColor: Colors.primaryMuted,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});

export default Page;


// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
// import { useRouter } from 'expo-router';
// import { useAuth, useSignIn } from '@clerk/clerk-expo';
// import { defaultStyles } from '@/constants/Styles';
// import Colors from '@/constants/Colors';
// import * as SecureStore from 'expo-secure-store';

// const ForgotPasscodePage = () => {
//     const [phone, setPhone] = useState('');
//     const [newPasscode, setNewPasscode] = useState('');
//     const [verificationCode, setVerificationCode] = useState('');
//     const [isVerificationSent, setIsVerificationSent] = useState(false);
//     const [error, setError] = useState('');

//     const router = useRouter();
//     const { isSignedIn } = useAuth();
//     const { isLoaded, signIn } = useSignIn();

//     const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;

//     if (!isLoaded) {
//         return null;
//     }

//     useEffect(() => {
//         if (isSignedIn) {
//             // Keep this as it is, no navigation needed
//         }
//     }, [isSignedIn]);

//     // Step 1: Send verification code to confirm the user's identity
//     async function sendVerificationCode() {
//         try {
//             if (signIn) {
//                 await signIn.create({
//                     strategy: 'phone_code',
//                     identifier: phone,
//                 });
//                 setIsVerificationSent(true);
//                 setError('');
//             }
//         } catch (err) {
//             const errorMessage = (err as any)?.errors?.[0]?.longMessage || 'Something went wrong';
//             console.error('Error sending verification code:', errorMessage);
//             setError(errorMessage);
//         }
//     }

//     // Step 2: Verify the code and set a new lock screen passcode
//     async function resetPasscode() {
//         try {
//             if (signIn) {
//                 const result = await signIn.attemptFirstFactor({
//                     strategy: 'phone_code',
//                     code: verificationCode,
//                 });

//                 if (result?.status === 'complete') {
//                     // Store the new passcode securely
//                     await SecureStore.setItemAsync('userLockScreenPasscode', newPasscode);
//                     setError('');
//                     Alert.alert('Success', 'User is logged in, proceed to change passcode page.');
//                     router.push('/(user)/resetPasscode'); // Adjust this path as needed
//                 }
//             }
//         } catch (err) {
//             const errorMessage = (err as any)?.errors?.[0]?.longMessage || 'Something went wrong';
//             console.error('Error resetting passcode:', errorMessage);
//             setError(errorMessage);
//         }
//     }

//     return (
//         <KeyboardAvoidingView
//             style={{ flex: 1 }}
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//             keyboardVerticalOffset={keyboardVerticalOffset}
//         >
//             <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//                 <View style={defaultStyles.container}>
//                     <Text style={defaultStyles.header}>Forgot Passcode?</Text>

//                     {!isVerificationSent ? (
//                         <>
//                             <Text style={defaultStyles.descriptionText}>
//                                 Please enter your phone number to receive a verification code.
//                             </Text>
//                             <TextInput
//                                 style={styles.input}
//                                 placeholder="Phone number"
//                                 value={phone}
//                                 onChangeText={setPhone}
//                                 keyboardType="phone-pad"
//                                 autoCapitalize="none"
//                             />

//                             <TouchableOpacity
//                                 style={[defaultStyles.pillButton, phone ? styles.enabled : styles.disabled, { marginTop: 20 }]}
//                                 onPress={sendVerificationCode}
//                                 disabled={!phone}
//                             >
//                                 <Text style={defaultStyles.buttonText}>Send verification code</Text>
//                             </TouchableOpacity>

//                             {error && <Text style={styles.errorText}>{error}</Text>}
//                         </>
//                     ) : (
//                         <>
//                             <Text style={defaultStyles.descriptionText}>
//                                 Enter the new passcode you'd like to use.
//                             </Text>
//                             <TextInput
//                                 style={styles.input}
//                                 placeholder="New passcode"
//                                 value={newPasscode}
//                                 onChangeText={setNewPasscode}
//                                 secureTextEntry
//                             />

//                             <Text style={defaultStyles.descriptionText}>
//                                 Enter the verification code sent to your phone.
//                             </Text>
//                             <TextInput
//                                 style={styles.input}
//                                 placeholder="Verification code"
//                                 value={verificationCode}
//                                 onChangeText={setVerificationCode}
//                                 keyboardType="number-pad"
//                             />

//                             <TouchableOpacity
//                                 style={[defaultStyles.pillButton, verificationCode && newPasscode ? styles.enabled : styles.disabled, { marginTop: 20 }]}
//                                 onPress={resetPasscode}
//                                 disabled={!verificationCode || !newPasscode}
//                             >
//                                 <Text style={defaultStyles.buttonText}>Reset Passcode</Text>
//                             </TouchableOpacity>

//                             {error && <Text style={styles.errorText}>{error}</Text>}
//                         </>
//                     )}
//                 </View>
//             </ScrollView>
//         </KeyboardAvoidingView>
//     );
// };

// const styles = StyleSheet.create({
//     input: {
//         borderColor: Colors.gray,
//         borderRadius: 16,
//         padding: 15,
//         fontSize: 18,
//         backgroundColor: Colors.lightGray,
//         marginTop: 10,
//     },
//     enabled: {
//         backgroundColor: Colors.primary,
//     },
//     disabled: {
//         backgroundColor: Colors.primaryMuted,
//     },
//     errorText: {
//         color: 'red',
//         marginTop: 10,
//     },
// });

// export default ForgotPasscodePage;
