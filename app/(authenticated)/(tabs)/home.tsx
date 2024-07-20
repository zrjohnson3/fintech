import { View, Text, ScrollView, StyleSheet, Button } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import RoundBtn from '@/components/custom/RoundBtn';
import Dropdown from '@/components/custom/Dropdown';

const Page = () => {

    const balance = 1420;

    const onAddMoney = () => {
        console.log('Add Money');
    }

    return (
        <ScrollView style={{ backgroundColor: Colors.background }}>
            <View style={styles.account}>
                <View style={styles.row}>
                    <Text style={styles.balance}>Account Balance: </Text>
                    <Text style={styles.currency}>${balance}</Text>
                </View>
            </View>

            <View style={styles.actionRow}>
                <RoundBtn icon={'add'} text='Add Money' onPress={onAddMoney} />
                <RoundBtn icon={'refresh'} text='Exchange' onPress={onAddMoney} />
                <RoundBtn icon={'list'} text='Details' onPress={onAddMoney} />
                <Dropdown />
            </View>
        </ScrollView>
    )
}

export default Page

const styles = StyleSheet.create({
    account: {
        margin: 80,
        alignItems: 'center',
    },
    row: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    balance: {
        color: 'black',
        fontSize: 26,
        // padding: 5,
    },
    currency: {
        color: 'black',
        fontSize: 30,
        marginLeft: 5,
        fontWeight: 'bold',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: 10,

    },
})