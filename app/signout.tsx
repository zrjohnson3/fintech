import { View, Text } from 'react-native'
import { SignOutButton } from '@clerk/clerk-react'

const SignoutPage = () => {
    return (
        <SignOutButton>
            <button>My custom button</button>
        </SignOutButton>
    )
}

export default SignoutPage;