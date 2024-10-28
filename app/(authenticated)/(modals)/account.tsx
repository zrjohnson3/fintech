import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { defaultStyles } from '@/constants/Styles';
import { BlurView } from 'expo-blur';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { SignOutButton } from '@clerk/clerk-react'
import * as ImagePicker from 'expo-image-picker';

const Page = () => {
    const { user } = useUser(); // Clerk's user hook
    const { signOut } = useAuth();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        // Only update the state if the user object is available
        if (user) {
            setFirstName(user.firstName || '');
            setLastName(user.lastName || '');
        }
    }, [user]); // Effect runs when the user data changes

    const onSaveUser = async () => {
        // Save user logic (if needed)
        try {
            await user?.update({
                firstName: firstName!,
                lastName: lastName!,
            });
            setEdit(false);
        }
        catch (error: any) {

        }
    };

    const onCaptureImage = async () => {
        // Capture image logic (if needed)
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.75,
            base64: true,
        })
        if (!result.canceled) {
            const base64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
            user?.setProfileImage({ file: base64 });
        };
    }

    // Debugging user information
    console.log('Account Page', user?.fullName, user?.firstName, user?.lastName);

    return (
        <BlurView intensity={80} tint='dark' style={{ flex: 1, paddingTop: 100, backgroundColor: 'rgba(0,0,0,0.3)' }}>
            {/* <Text style={styles.header}>Account Page</Text> */}
            {user && (
                <>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={onCaptureImage} style={styles.captureButton}>
                            {user.imageUrl && <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />}
                        </TouchableOpacity>

                        {/* <View style={{ flexDirection: 'row', gap: 6 }} */}
                        {!edit && (
                            <View style={styles.editRow}>
                                <Text style={[styles.userName, { fontSize: 26, justifyContent: 'center' }]}>
                                    {firstName} {lastName}
                                </Text>
                                <TouchableOpacity style={{ flexDirection: 'row', gap: 6 }} onPress={() => setEdit(true)}>
                                    {/* <Text style={styles.editText}>Edit</Text> */}
                                    <Ionicons name='ellipsis-horizontal' size={24} color={Colors.primary} />
                                    {/* DROPDOWN MENU WHEN THE USER HITS THE ... (HAMBUGER MENU) */}
                                </TouchableOpacity>
                            </View>
                        )}
                        {edit && (
                            <View style={styles.editRow}>
                                <TextInput
                                    style={[styles.userNameEditField, { fontSize: 26, justifyContent: 'center' }]}
                                    value={firstName}
                                    onChangeText={setFirstName}
                                />
                                <TextInput
                                    style={[styles.userNameEditField, { fontSize: 26, justifyContent: 'center' }]}
                                    value={lastName}
                                    onChangeText={setLastName}
                                />
                                <TouchableOpacity style={{ flexDirection: 'row', gap: 6 }} onPress={onSaveUser}>
                                    {/* DROPDOWN MENU WHEN THE USER HITS THE ... (HAMBUGER MENU) */}
                                    <Ionicons name='checkmark' size={24} color={Colors.primary} />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    <View style={{ position: 'absolute', top: 80, right: 20 }}>
                        <TouchableOpacity onPress={() => signOut()} style={[styles.accountPillButton, { backgroundColor: Colors.lightGray, paddingHorizontal: 20, paddingVertical: 5 }]}>
                            <SignOutButton>
                                <Text>Sign Out</Text>
                            </SignOutButton>
                        </TouchableOpacity>
                    </View>
                </>
            )
            }
        </BlurView >
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        textAlign: 'center',
        color: Colors.primary,
        marginBottom: 20,
    },
    userName: {
        fontSize: 25,
        textAlign: 'center',
        color: Colors.primary,
        paddingRight: 10,
        paddingLeft: 5,
    },
    userNameEditField: {
        fontSize: 25,
        textAlign: 'center',
        color: Colors.primary,
        paddingRight: 10,
        paddingLeft: 5,
        height: 44,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'black',
        backgroundColor: Colors.lightGray,
        marginTop: 10,
        marginBottom: 10,
        padding: 8,
    },
    editRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: Colors.background,
        padding: 15,
        borderRadius: 30,
    },
    captureButton: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.gray,
        alignContent: 'center',
        justifyContent: 'center',
    },
    userImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    editText: {
        color: Colors.primary,
        marginLeft: 10,
    },
    accountPillButton: {
        padding: 20,
        height: 40,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default Page;