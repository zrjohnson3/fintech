
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withSequence, withRepeat } from 'react-native-reanimated';
import Colors from '@/constants/Colors';

const ResetPasscodePage = () => {
    const router = useRouter();
    const [code, setCode] = useState<number[]>([]);
    const offset = useSharedValue(0);

    const codeLength = Array(6).fill(0);
    const OFFSET = 20;
    const TIME = 80;

    // Animated style for error feedback
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: offset.value }],
    }));

    const handleNumberPress = (number: number) => {
        if (code.length < 6) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setCode([...code, number]);
        }
    };

    const handleBackspacePress = () => {
        if (code.length > 0) {
            setCode(code.slice(0, -1));
        }
    };

    const handleSavePasscode = async () => {
        if (code.length === 6) {
            await SecureStore.setItemAsync('userLockScreenPasscode', code.join(''));
            alert('Passcode reset successfully!');
            router.replace('(authenticated)/(tabs)/home');
        } else {
            offset.value = withSequence(
                withTiming(-OFFSET, { duration: TIME / 2 }),
                withRepeat(withTiming(OFFSET, { duration: TIME }), 4, true),
                withTiming(0, { duration: TIME / 2 })
            );
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text style={styles.header}>Reset Your Passcode</Text>
            <Text style={styles.subHeader}>Enter a new 6-digit passcode</Text>

            <Animated.View style={[styles.codeView, animatedStyle]}>
                {codeLength.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.codeDot,
                            { backgroundColor: code[index] !== undefined ? 'black' : 'lightgray' },
                        ]}
                    />
                ))}
            </Animated.View>

            <View style={styles.keypad}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                    <TouchableOpacity key={number} style={styles.key} onPress={() => handleNumberPress(number)}>
                        <Text style={styles.keyText}>{number}</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.key} onPress={handleBackspacePress}>
                    <Ionicons name='backspace' size={28} color='black' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.key} onPress={() => handleNumberPress(0)}>
                    <Text style={styles.keyText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.key} onPress={handleSavePasscode}>
                    <Ionicons name='checkmark' size={28} color='black' />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ResetPasscodePage;

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 30,
        alignSelf: 'center',
    },
    subHeader: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 20,
        alignSelf: 'center',
    },
    codeView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 20,
    },
    codeDot: {
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
        marginTop: 20,
    },
    key: {
        width: '28%',
        height: 80,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    keyText: {
        fontSize: 28,
        fontWeight: 'bold',
    },
});

