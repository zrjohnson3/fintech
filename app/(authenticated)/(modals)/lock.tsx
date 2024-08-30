import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth, useUser } from '@clerk/clerk-expo'
import * as Haptics from 'expo-haptics'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

const Page = () => {

    // Get the user and auth object from the ClerkProvider
    const { user } = useUser();
    const auth = useAuth();

    // Array of length 6 to display the code input
    const codeLength = Array(6).fill(0);

    // Get the user's first name
    const [firstName, setFirstName] = useState(user?.firstName);

    // State to store the code
    const [code, setCode] = useState<number[]>([]);

    // useEffect hook to check if the code is complete and valid. If it is, clear the code. 
    useEffect(() => {
        console.log('Code:', code);
        if (code.length === 6) {
            setCode(prevCode => []);
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

    const onBiometricAuthPress = async () => {
        console.log('Biometric Auth Pressed');
    }

    return (
        <SafeAreaView>
            <Text style={styles.greeting}>Welcome Back, {firstName}</Text>
            <Text style={styles.subGreeting}>Enter your code to unlock the app</Text>

            {/* Displays the code input */}
            <View style={[styles.codeView]}>
                {codeLength.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.codeEmpty,
                            { backgroundColor: code[index] || code[index] === 0 ? 'black' : 'lightgray' }, // account's for pressing 0
                        ]}
                    />
                ))}
            </View>

            {/* Displays the keypad */}
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
                <TouchableOpacity style={styles.key} onPress={() => console.log("Biometric Login")}>

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
        </SafeAreaView>
    );
}

export default Page;

const styles = StyleSheet.create({
    greeting: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 80,
        alignSelf: 'center',
    },
    subGreeting: {
        fontSize: 18,
        color: 'gray',
        marginBottom: 20,
        alignSelf: 'center',
    },
    codeView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    codeEmpty: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    keypad: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '80%',
        alignSelf: 'center',
    },
    key: {
        width: '30%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    keyText: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    emptyKey: {
        width: '30%',
        aspectRatio: 1,
        marginVertical: 10,
    },
});
