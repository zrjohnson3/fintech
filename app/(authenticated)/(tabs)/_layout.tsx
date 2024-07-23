import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { BlurView } from 'expo-blur'

import { FontAwesome } from '@expo/vector-icons'
import CustomHeader from '@/components/custom/CustomHeader'

const Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarBackground: () => (
                    <BlurView intensity={100} style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.05)' }} />

                ),
                tabBarStyle: {
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    borderTopWidth: 0,
                },
                header: () => (<CustomHeader />),
            }}
        >
            <Tabs.Screen
                name='home'
                options={{
                    title: 'Home',
                    tabBarIcon: ({ size, color }) => (
                        <FontAwesome name='registered' size={size} color={color} />
                    ),
                    header: () => (<CustomHeader />),
                    headerTransparent: true,
                }}
            />
            <Tabs.Screen
                name='invest'
                options={{
                    title: 'Invest',
                    tabBarIcon: ({ size, color }) => (
                        <FontAwesome name='line-chart' size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name='transfers'
                options={{
                    title: 'Transfers',
                    tabBarIcon: ({ size, color }) => (
                        <FontAwesome name='exchange' size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name='crypto'
                options={{
                    title: 'Crypto',
                    tabBarIcon: ({ size, color }) => (
                        <FontAwesome name='bitcoin' size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name='lifestyle'
                options={{
                    title: 'Lifestyle',
                    tabBarIcon: ({ size, color }) => (
                        <FontAwesome name='th' size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    )
}

export default Layout