import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { useAssets } from 'expo-asset';
import { Video } from 'expo-av';
import { ResizeMode } from 'expo-av';
import { Link } from 'expo-router';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';

export default function Page() {

    const [assets] = useAssets([require('../assets/videos/intro.mp4')]); // Load the video asset using `useAssets`. (This is a hook provided by Expo that helps you load assets.)
    return (
        <View style={styles.container}>
            {assets && (
                <Video isMuted isLooping shouldPlay resizeMode={ResizeMode.COVER} source={{ uri: assets[0].uri }} style={styles.video} />// Use the `uri` property of the first asset in the `assets` array as the `uri` prop of the `Video` component.
            )}
            <View style={{ marginTop: 60, padding: 20 }}>
                <Text style={styles.header}>Ready to change the way you make money!?</Text>
            </View>

            <View style={styles.buttons}>
                <Link
                    href={'/login'}
                    style={[defaultStyles.pillButton, { flex: 1, backgroundColor: Colors.dark.background }]}
                    asChild>
                    <TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 22, fontWeight: '500' }}>Log in</Text>
                    </TouchableOpacity>
                </Link>
                <Link
                    href={'/signup'}
                    style={[defaultStyles.pillButton, { flex: 1, backgroundColor: '#fff' }]}
                    asChild>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 22, fontWeight: '500' }}>Sign up</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'space-between',
    },
    video: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    header: {
        fontSize: 36,
        fontWeight: '900',
        textTransform: 'uppercase',
        color: 'white',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 60,
        gap: 20,
    }
})