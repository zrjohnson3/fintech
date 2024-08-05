import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider, } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { View, TouchableOpacity, Text } from 'react-native';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
import * as SecureStore from 'expo-secure-store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // Import the QueryClient and QueryClientProvider from the react-query library
const queryClient = new QueryClient() // Create a new instance of the QueryClient

// Check for the Clerk Publishable Key
console.log('Clerk Publishable Key:', CLERK_PUBLISHABLE_KEY);
if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
}

// Cache the Clerk JWT
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    }
    catch (err: any) {
      console.error('Failed to fetch the auth token', err);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    }
    catch (err: any) {
      console.error('Failed to save the auth token', err);
      return;
    }
  }
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {

  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Use the `useRouter` hook to access the router object.
  const router = useRouter();
  // Use the 'useAuth' hook to access the isLoaded and isSignedIn object.
  const { isLoaded, isSignedIn } = useAuth();
  // Use 'segments' to access the segments object.
  // Helps you manage the segments of the user and understand the user's journey.
  const segments = useSegments();


  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    console.log('isSignedIn:', isSignedIn);
    if (!isLoaded) return;

    const isAuthGroup = segments[0] === '(authenticated)'

    if (isSignedIn && !isAuthGroup) {
      router.replace('/(authenticated)/(tabs)/home');
    }
    else if (!isSignedIn) {
      router.replace('/');
    }
  }, [isSignedIn]);

  if (!loaded || !isLoaded) {
    return (
      <Text>Loading...</Text>
    )
  }

  return (

    <Stack>
      {/* Index Screen */}
      <Stack.Screen name='index' options={{ headerShown: false }} />
      {/* SignUp Screen */}
      <Stack.Screen name='signup' options={{
        title: '',
        headerBackTitle: '',
        headerShadowVisible: false,
        // headerStyle: {
        //   backgroundColor: colorScheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background,
        // },
        headerStyle: { backgroundColor: Colors.background },
        headerLeft: () => (
          <TouchableOpacity onPress={router.back}>
            <Ionicons name='arrow-back' size={34} color='black' />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => router.navigate('help')}>
            <FontAwesome name='user' size={34} color='black' />
          </TouchableOpacity>
        )
        // < TouchableOpacity onPress={() => router.navigate('help')}>
        // <FontAwesome name='user' size={34} color='black' />
        // </TouchableOpacity>
      }}
      />

      {/* Login Screen */}
      <Stack.Screen name='login' options={{
        title: '',
        headerBackTitle: '',
        headerShadowVisible: false,
        // headerStyle: {
        //   backgroundColor: colorScheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background,
        // },
        headerStyle: { backgroundColor: Colors.background },
        headerLeft: () => (
          <TouchableOpacity onPress={router.back}>
            <Ionicons name='arrow-back' size={34} color='black' />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => router.navigate('help')}>
            <FontAwesome name='user' size={34} color='black' />
          </TouchableOpacity>
        )
        // < TouchableOpacity onPress={() => router.navigate('help')}>
        // <FontAwesome name='user' size={34} color='black' />
        // </TouchableOpacity>
      }}
      />


      {/* Verify Screen */}
      <Stack.Screen name='verify/[phone]' options={{
        title: '',
        headerBackTitle: '',
        headerShadowVisible: false,
        // headerStyle: {
        //   backgroundColor: colorScheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background,
        // },
        headerStyle: { backgroundColor: Colors.background },
        headerLeft: () => (
          <TouchableOpacity onPress={router.back}>
            <Ionicons name='arrow-back' size={34} color='black' />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => router.navigate('help')}>
            <FontAwesome name='user' size={34} color='black' />
          </TouchableOpacity>
        )

        // < TouchableOpacity onPress={() => router.navigate('help')}>
        // <FontAwesome name='user' size={34} color='black' />
        // </TouchableOpacity>
      }}
      />
      <Stack.Screen name='help' options={{ title: 'Help', presentation: 'modal' }} />
      <Stack.Screen name='(authenticated)/(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='(authenticated)/crypto/[id]' options={({
        title: '',
        headerLeft: () => (
          <TouchableOpacity onPress={router.back}>
            <Ionicons name='arrow-back' size={34} color='black' />
          </TouchableOpacity>
        ),
        // headerLargeTitle: true,
        headerTransparent: true,
        headerRight: () => (
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <TouchableOpacity onPress={() => router.navigate('help')}>
              <Ionicons name='notifications-outline' size={34} color='black' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.navigate('help')}>
              <Ionicons name='star-outline' size={34} color='black' />
            </TouchableOpacity>
          </View>
        )
      })}
      />
    </Stack>

  );
}
const RootLayoutNav = () => {

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar style='light' />
          <InitialLayout />
        </GestureHandlerRootView>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default RootLayoutNav;