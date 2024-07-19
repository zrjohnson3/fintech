import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native'
import React, { Fragment, useEffect } from 'react'
import { Link, useLocalSearchParams } from 'expo-router'
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';
import { defaultStyles } from '@/constants/Styles';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Colors from '@/constants/Colors';

const Page = () => {

    const { phone, signin } = useLocalSearchParams<{ phone: string; signin: string }>();
    const [code, setCode] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const { signUp, setActive } = useSignUp();
    const { signIn } = useSignIn();


    const CELL_COUNT = 6;

    const ref = useBlurOnFulfill({ value: phone, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: code,
        setValue: setCode,
    });



    // Use the `useEffect` hook to verify the code when the `code` state changes.
    useEffect(() => {
        if (code.length === 6) {
            // Verify the code
            console.log('Code:', code);
            // Check if the user is signing in or signing up
            if (signin === 'true') {
                // Verify the sign in
                verifySignIn();
            }
            else {
                // Verify the sign up
                verifyCode();
            }
        }
    }, [code])

    // Verify the code
    const verifyCode = async () => {
        try {
            await signUp!.attemptPhoneNumberVerification({
                code: code,
                // code, Shorthand syntax that is equivalent to `code: code`
            });
            // Set the user as active
            // await setActive!({ session: signUp?.createdSessionId }); // Use optional chaining to access the `createdSessionId` property of the `signUp` object.
            await setActive!({ session: signUp!.createdSessionId });  // Use the `!` operator to assert that `signUp` is not `null` or `undefined`. (We should use this becuase we know that `signUp` is not `null` or `undefined` at this point.)
        }
        catch (err: any) {
            console.error('Failed to verify the code', JSON.stringify(err, null, 2));
            if (isClerkAPIResponseError(err)) {
                // Alert the user if there is an error
                Alert.alert('Error', err.errors[0].message);
            }
        }
    };


    // Verify the sign in
    const verifySignIn = async () => {
        try {
            await signIn!.attemptFirstFactor({
                strategy: 'phone_code',
                code: code,
            })
            // Set the user as active with the sign in session ID
            setActive!({ session: signIn!.createdSessionId });
        }
        catch (err: any) {
            console.error('Failed to verify the sign in', JSON.stringify(err, null, 2));
            if (isClerkAPIResponseError(err)) {
                // Alert the user if there is an error
                Alert.alert('Error', err.errors[0].message);
            }
        }
    };

    return (
        <View style={defaultStyles.container}>
            <Text style={defaultStyles.header}>6-digit code</Text>
            <Text style={defaultStyles.descriptionText}>Code sent to {phone} unless you already have an account.</Text>

            <CodeField
                ref={ref}
                {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={code}
                onChangeText={setCode}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                testID="my-code-input"
                renderCell={({ index, symbol, isFocused }) => (
                    <Fragment key={index}>
                        <View
                            onLayout={getCellOnLayoutHandler(index)}
                            key={index}
                            style={styles.cellRoot}>
                            <Text style={styles.cellText}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        </View>
                        {index === 2 ? <View key={`seperator-${index}`} style={styles.seperator} /> : null}
                    </Fragment>
                )}
            />

            <Link href={'/login'} replace asChild>
                <TouchableOpacity>
                    <Text style={defaultStyles.textLink}>Already have an account? Log in.</Text>
                </TouchableOpacity>
            </Link>
        </View>
    )
}

export default Page

const styles = StyleSheet.create({
    // root: { flex: 1, padding: 20 },
    // title: { textAlign: 'center', fontSize: 30 },
    // codeFieldRoot: { marginTop: 20 },
    // cell: {
    //     width: 40,
    //     height: 40,
    //     lineHeight: 38,
    //     fontSize: 24,
    //     borderWidth: 2,
    //     borderColor: '#00000030',
    //     textAlign: 'center',
    // },
    focusCell: {
        borderColor: '#000',
    },
    codeFieldRoot: {
        marginVertical: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        gap: 12,
    },
    cellRoot: {
        width: 45,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lightGray,
        borderRadius: 8,
    },
    cellText: {
        color: '#000',
        fontSize: 36,
        textAlign: 'center',
    },
    seperator: {
        height: 2,
        width: 10,
        backgroundColor: Colors.gray,
        alignSelf: 'center',
    }
});