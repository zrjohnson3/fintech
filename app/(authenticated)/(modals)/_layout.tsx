import { View, Text, Modal } from 'react-native'
import { Stack, useRouter, useSegments } from 'expo-router';
import React from 'react'
import { BlurView } from 'expo-blur'

import { FontAwesome } from '@expo/vector-icons'
import CustomHeader from '@/components/custom/CustomHeader'

{/* Lock Screen - without any animation  */ }
const ModalsLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'none',
            }}
        >
            <Stack.Screen name='lock' options={{ headerShown: false, animation: 'none' }} />
        </Stack>
    )
}

export default ModalsLayout;