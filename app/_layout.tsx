import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider, } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ClerkProvider } from '@clerk/clerk-expo';
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
import * as SecureStore from 'expo-secure-store';

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

  const router = useRouter();


  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (

    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
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
      <Stack.Screen name='help' options={{ title: 'Help', presentation: 'modal' }} />
    </Stack>

  );
}
const RootLayoutNav = () => {

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style='light' />
        <InitialLayout />
      </GestureHandlerRootView>
    </ClerkProvider>
  );
}

export default RootLayoutNav;