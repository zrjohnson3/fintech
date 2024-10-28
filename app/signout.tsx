import { View, Text } from 'react-native'
import { SignOutButton } from '@clerk/clerk-react'

const SignoutPage = () => {
    return (
        <SignOutButton>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ff0000', padding: 10 }}>
                Sign Out
            </Text>
        </SignOutButton>
    )
}

export default SignoutPage;