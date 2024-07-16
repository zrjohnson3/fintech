import { View, Text, StyleSheet } from 'react-native'
import { useAssets } from 'expo-asset';
import { Video } from 'expo-av';

export default function Page() {

    const [assets] = useAssets([require('../assets/videos/intro.mp4')]); // Load the video asset using `useAssets`. (This is a hook provided by Expo that helps you load assets.)
    return (
        <View style={styles.container}>
            {assets && (
                <Video isMuted isLooping shouldPlay source={{ uri: assets[0].uri }} style={styles.video} />// Use the `uri` property of the first asset in the `assets` array as the `uri` prop of the `Video` component.
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    video: {
        width: '100%',
        height: '100%',
    }
})