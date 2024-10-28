import { View, Text, Modal } from 'react-native'
import { Stack, useRouter, useSegments } from 'expo-router';
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { BlurView } from 'expo-blur'

import { FontAwesome, Ionicons } from '@expo/vector-icons'
import CustomHeader from '@/components/custom/CustomHeader'

{/* Lock Screen - without any animation  */ }
const UserLayout = () => {

    const router = useRouter();

    return (
        <Stack
            screenOptions={{
                // header: CustomHeader,
                // header: () => null,
                headerLeft: () => (
                    <TouchableOpacity onPress={router.back}>
                        <Ionicons name='arrow-back' size={42} color={'black'} style={{ padding: 2 }} />
                    </TouchableOpacity>
                ),
                animation: 'fade',
                headerBackButtonMenuEnabled: true,

            }}
        >
            <Stack.Screen name='forgotPassword' options={{ headerShown: true, animation: 'none' }} />
            <Stack.Screen name='resetPasscode' options={{ headerShown: false, animation: 'none' }} />
        </Stack>
    )
}

export default UserLayout;