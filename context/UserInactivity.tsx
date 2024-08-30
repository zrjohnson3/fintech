import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React, { useState, useEffect, useRef } from 'react';
import { AppState, AppStateStatus, Text } from 'react-native';
import { Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MMKV } from 'react-native-mmkv'

const storage = new MMKV({
    id: 'inactivity-storage',
})

export const UserInactivityProvider = ({ children }: any) => {

    const [showLockScreen, setShowLockScreen] = useState(false);
    const [lastActive, setLastActive] = useState(new Date());
    const [isLocked, setIsLocked] = useState(false);
    const appState = useRef(AppState.currentState); // Create a reference to the current app state
    const router = useRouter();
    const isSignedIn = useAuth();

    // const handleAppStateChange = async (nextAppState: any) => {
    //     console.log('App State:', '\nCurrent State:', appState.current, '\nNext State:', nextAppState);
    //     if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
    //         const now = new Date();
    //         const diff = now.getTime() - lastActive.getTime();
    //         if (diff > 10000 && isSignedIn) {
    //             setShowLockScreen(true);
    //             setIsLocked(true);
    //         }
    //     }
    //     appState.current = nextAppState;
    //     await recordStartTime();
    // }
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
        console.log('App State:', '\nCurrent State:', appState.current, '\nNext State:', nextAppState);
        if (nextAppState === 'background') {
            recordStartTime();
        }
        else if (nextAppState === 'active' && appState.current.match(/background/)) {
            console.log("We are back!: ", storage.getNumber('startTime'));
            const elapsedTime = Date.now() - (storage.getNumber('startTime') || 0);
            console.log('Elapsed Time:', elapsedTime);
            if (elapsedTime > 3000 && isSignedIn) {
                setShowLockScreen(true);
                setIsLocked(true);
                router.replace('(authenticated)/(modals)/lock');
            }
        }
        appState.current = nextAppState;
    }

    const recordStartTime = async () => {
        const now = new Date();
        setLastActive(now);
        storage.set('lastActive', now.getTime());
        storage.set('startTime', Date.now());
    }

    useEffect(() => {
        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove();
        }
    }, []);

    return children;
}
