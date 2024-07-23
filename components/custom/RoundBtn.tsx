import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

// Props for RoundBtn that allow for text, icon, and onPress function
type RoundBtnProps = {
    text: string;
    icon: typeof Ionicons.defaultProps;
    onPress: () => void;
}

const RoundBtn = ({ icon, text, onPress }: RoundBtnProps) => {
    return (
        <View>
            <TouchableOpacity style={[styles.container]} onPress={onPress}>
                <View style={styles.avatar}>
                    <Ionicons name={icon} size={24} color={Colors.dark.background} />
                </View>
                <Text style={styles.label}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default RoundBtn

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        // margin: 5,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        backgroundColor: Colors.lightGray,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
    },
    label: {
        fontSize: 14,
        fontWeight: '400',
    },

})