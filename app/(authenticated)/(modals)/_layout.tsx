import { View, Text, Modal, TouchableOpacity } from 'react-native'
import { Stack, useRouter, useSegments } from 'expo-router';
import React from 'react'
import { BlurView } from 'expo-blur'

import { FontAwesome, Ionicons } from '@expo/vector-icons'
import CustomHeader from '@/components/custom/CustomHeader'
import Colors from '@/constants/Colors';

{/* Lock Screen - without any animation  */ }
const ModalsLayout = () => {

    const router = useRouter();

    return (
        <Stack
            screenOptions={{
                animation: 'fade',
                presentation: 'transparentModal',
                headerStyle: { backgroundColor: 'transparent' },
                headerTransparent: true,
                title: '',
                headerLeft: () => (
                    <TouchableOpacity onPress={router.back}>
                        <Ionicons name='close-outline' size={42} color={'#fff'} style={{ marginTop: 20 }} />
                    </TouchableOpacity>
                ),

            }}
        >
            <Stack.Screen name='lock' options={{ headerShown: false, animation: 'none' }} />
        </Stack >
    )
}

export default ModalsLayout;