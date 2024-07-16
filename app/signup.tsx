import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { defaultStyles } from '@/constants/Styles'
import React from 'react'
import Colors from '@/constants/Colors'
import { Link } from 'expo-router'

const Page = () => {

    const [countryCode, setCountryCode] = React.useState('+1')
    const [phoneNumber, setPhoneNumber] = React.useState('')

    const onSignup = async () => {
        console.log('Signup', countryCode, phoneNumber)
    }

    return (
        <View style={defaultStyles.container}>
            <Text style={defaultStyles.header}>Let's get started!</Text>
            <Text style={defaultStyles.descriptionText}>Enter your phone number. Then, we will send you a confirmation code.</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Country Code'
                    style={[styles.input, { flex: 0.2, marginRight: 20 }]} // Adjusted flex value for country code
                    value={countryCode}
                    onChangeText={setCountryCode}
                />
                <TextInput
                    placeholder='Phone number'
                    style={[styles.input, { flex: 0.8 }]} // Added flex value for phone number
                    keyboardType='numeric'
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />
            </View>

            <Link href={'/login'} replace asChild>
                <TouchableOpacity>
                    <Text style={styles.textLink}>Already have an account? Log in.</Text>
                </TouchableOpacity>
            </Link>

            <TouchableOpacity
                style={[
                    defaultStyles.pillButton,
                    phoneNumber !== '' ? styles.enabled : styles.disabled,
                    { marginTop: 20 }
                ]}
                onPress={onSignup}
                disabled={phoneNumber === ''}
            >
                <Text style={defaultStyles.buttonText}>Signup</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Page

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 40,
        flexDirection: 'row',
    },
    input: {
        borderColor: 'black',
        borderRadius: 16,
        padding: 20,
        fontSize: 20,
        backgroundColor: Colors.lightGray,
    },
    textLink: {
        color: Colors.primary,
        borderRadius: 10,
        fontSize: 16,
    },
    enabled: {
        backgroundColor: Colors.primary,
    },
    disabled: {
        backgroundColor: Colors.primaryMuted,
    },
});
