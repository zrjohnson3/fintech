import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'

const Layout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name='home'
                options={{
                    title: 'Home',
                    tabBarIcon: ({ size, color }) => (
                        <FontAwesome name='registered' size={size} color={color} />
                    ),
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