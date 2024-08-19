import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const CustomHeader = () => {
    const { top } = useSafeAreaInsets(); // Get the top inset to avoid the status bar and help the header to be below the status bar and not behind it
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    return (
        <BlurView intensity={100} tint='light' style={{ paddingTop: top }}>
            <View style={[styles.container]}>
                {!isSearchFocused && (
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Fintech</Text>
                )}
                <TouchableOpacity style={styles.roundBtn}>
                    <Text style={{ color: 'white', fontWeight: '500', fontSize: 16 }}>SC</Text>
                </TouchableOpacity>
                <View style={styles.searchSection}>
                    <Ionicons name='search' size={24} color='black' style={styles.icon} />
                    <TextInput
                        placeholder='Search'
                        style={styles.input}
                        placeholderTextColor={Colors.dark.background}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                    />
                </View>
                <View style={styles.circle}>
                    <Ionicons name={'stats-chart'} size={22} color={Colors.dark.background} />
                </View>
                <View style={styles.circle}>
                    <Ionicons name={'card'} size={22} color={Colors.dark.background} />
                </View>
            </View>
        </BlurView>
    );
}

export default CustomHeader;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        gap: 10,
        backgroundColor: 'rgba(211, 211, 211, 0.3)', // Set the background color to a nearly transparent color
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingHorizontal: 15,
    },
    roundBtn: {
        backgroundColor: Colors.gray,
        padding: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.lightGray,
        borderRadius: 20,
        paddingHorizontal: 10,
        flex: 1,
    },
    input: {
        height: 40,
        flex: 1,
        borderRadius: 20,
        paddingLeft: 0,
        paddingRight: 10,
        paddingBottom: 10,
        color: Colors.dark.background,
        paddingTop: 10,
        backgroundColor: Colors.lightGray,
    },
    icon: {
        paddingRight: 10,
    },
    circle: {
        width: 28,
        height: 28,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        backgroundColor: Colors.lightGray,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
    },
});
