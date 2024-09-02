import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth, useUser } from '@clerk/clerk-expo'
import * as Haptics from 'expo-haptics'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import * as LocalAuthentication from 'expo-local-authentication'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated'

const Page = () => {

    // Get the router hook object
    const router = useRouter();

    // Get the user and auth object from the ClerkProvider
    const { user } = useUser();
    const auth = useAuth();

    // Array of length 6 to display the code input
    const codeLength = Array(6).fill(0);

    // Get the user's first name
    const [firstName, setFirstName] = useState(user?.firstName);

    // State to store the code
    const [code, setCode] = useState<number[]>([]);

    // Shared value for the offset of the code input
    const offset = useSharedValue(0);

    const style = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: offset.value }],
        };
    });

    // Constants for the offset and time of the animation - from the reanimated library
    const OFFSET = 20;
    const TIME = 80;

    // useEffect hook to check if the code is complete and valid. If it is, clear the code. 
    useEffect(() => {
        console.log('Code:', code);
        if (code.length === 6) {
            if (code.join('') === '123456') {
                router.replace('(authenticated)/(tabs)/home');
                setCode(prevCode => []);
            }
            else {
                offset.value = withSequence(
                    withTiming(-OFFSET, { duration: TIME / 2 }),
                    withRepeat(withTiming(OFFSET, { duration: TIME }), 4, true),
                    withTiming(0, { duration: TIME / 2 }),
                )

                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                setCode(prevCode => []);
            }
        }
    }, [code]);

    // Function to handle the keypad press
    const handleNumberPress = (number: number) => {
        // If the code is less than 6 digits, add the number to the code
        if (code.length < 6) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setCode([...code, number]);
        }
        // If the code is 6 digits, clear the code and add the number
        else {
            setCode([number]);
        }
        // If the code is 6 digits, check if it is correct
    };

    // Function to handle the backspace press
    const handleNumberBackspacePress = (number: number) => {
        // If the code is less than 6 digits, add the number to the code
        if (code.length < 6) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setCode(code.slice(0, -1));
        }
    };

    // Function to handle the biometric authentication press - Face ID or Touch ID depending on the device
    const onBiometricAuthPress = async () => {
        console.log('Biometric Auth Pressed');
        const { success } = await LocalAuthentication.authenticateAsync();
        if (success) {
            console.log('Biometric Auth Success');
            router.replace('(authenticated)/(tabs)/home');
        }
        else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            console.log('Biometric Auth Failed');
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: 10 }} />
            <Text style={styles.greeting}>Welcome Back, {firstName}</Text>
            <Text style={styles.subGreeting}>Enter your code to unlock the app</Text>

            {/* Displays the code input */}
            <Animated.View style={[styles.codeView, style]}>
                {codeLength.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.codeEmpty,
                            { backgroundColor: code[index] || code[index] === 0 ? 'black' : 'lightgray' }, // account's for pressing 0
                        ]}
                    />
                ))}
            </Animated.View>

            {/* Displays the keypad */}
            <View>
                <View style={styles.keypad}>
                    {[1, 2, 3].map((number) => (
                        <TouchableOpacity key={number} style={styles.key} onPress={() => handleNumberPress(number)}>
                            <Text style={styles.keyText}>{number}</Text>
                        </TouchableOpacity>
                    ))}
                    {[4, 5, 6].map((number) => (
                        <TouchableOpacity key={number} style={styles.key} onPress={() => handleNumberPress(number)}>
                            <Text style={styles.keyText}>{number}</Text>
                        </TouchableOpacity>
                    ))}
                    {[7, 8, 9].map((number) => (
                        <TouchableOpacity key={number} style={styles.key} onPress={() => handleNumberPress(number)}>
                            <Text style={styles.keyText}>{number}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={styles.key} onPress={() => onBiometricAuthPress()}>
                        {/* {code.length === 0 ? (
                        <Text style={styles.keyText}>
                            <Ionicons name='finger-print' size={32} color='black' />
                        </Text>
                    ) : (
                        <MaterialCommunityIcons name='face-recognition' size={32} color='black' />
                    )} */}
                        {code.length === 0 ? (
                            <Text style={styles.keyText}>
                                <MaterialCommunityIcons name='face-recognition' size={32} color='black' />
                            </Text>
                        ) : (
                            <></>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.key} onPress={() => handleNumberPress(0)}>
                        <Text style={styles.keyText}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.key} onPress={() => handleNumberBackspacePress(code[-1])}>
                        {/* <Text style={styles.keyText}>&lt;--</Text> */}
                        <Text style={styles.keyText}>
                            <Ionicons name='backspace' size={28} color='black' />
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.forgotPassword}>
                    <Text style={[defaultStyles.header, styles.forgotPasswordText]}>Forgot your password?</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Page;

// const styles = StyleSheet.create({
//     greeting: {
//         fontSize: 26,
//         fontWeight: 'bold',
//         marginBottom: 10,
//         marginTop: 40,
//         alignSelf: 'center',
//     },
//     subGreeting: {
//         fontSize: 18,
//         color: 'gray',
//         marginBottom: 20,
//         alignSelf: 'center',
//     },
//     codeView: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         marginVertical: 10,
//     },
//     codeEmpty: {
//         width: 25,
//         height: 25,
//         borderRadius: 20,
//     },
//     keypad: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'space-between',
//         width: '85%',
//         alignSelf: 'center',

//     },
//     key: {
//         width: '28%',
//         height: 80,
//         aspectRatio: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginVertical: 5,
//     },
//     keyText: {
//         fontSize: 32,
//         fontWeight: 'bold',
//     },
//     emptyKey: {
//         width: '30%',
//         aspectRatio: 1,
//         marginVertical: 10,
//     },
//     forgotPassword: {
//         marginBottom: 20,
//         paddingBottom: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
//         textAlign: 'center',
//     },
//     forgotPasswordText: {
//         color: Colors.primary,
//         fontSize: 20,
//     }
// });

// Adjusted styles to better fit lock screen design. 
const styles = StyleSheet.create({
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 30,
        alignSelf: 'center',
    },
    subGreeting: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 15,
        alignSelf: 'center',
    },
    codeView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 15,
    },
    codeEmpty: {
        width: 22,
        height: 22,
        borderRadius: 14,
    },
    keypad: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '85%',
        alignSelf: 'center',
        marginTop: 10,
    },
    key: {
        width: '28%',
        height: 80,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    keyText: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    forgotPassword: {
        marginTop: 10,
        marginBottom: 15,
        paddingBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    forgotPasswordText: {
        color: Colors.primary,
        fontSize: 18,
    }
});

