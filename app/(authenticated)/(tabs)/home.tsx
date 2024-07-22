import { View, Text, ScrollView, StyleSheet, Button } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import RoundBtn from '@/components/custom/RoundBtn';
import Dropdown from '@/components/custom/Dropdown';
import { useBalanceStore } from '@/store/balanceStore';

const Page = () => {

    // const balance = 1420;

    // Get the balance, runTransaction, transactions, clearTransactions from the balanceStore to use in this component
    // This allows us to persiste the balance and transactions across the app
    const { balance, runTransaction, transactions, clearTransactions } = useBalanceStore();

    const onAddMoney = () => {
        console.log('Add Money');

        runTransaction({
            id: Math.random(),
            // date: new Date().toDateString(),
            date: new Date().toLocaleDateString('en-US', {
                weekday: 'long', // "Monday"
                month: 'long',   // "July"
                day: 'numeric'   // "22"
            }),
            title: 'Deposit',
            type: 'deposit',
            amount: 100,
            description: 'Added $100 to account'
        })
    }

    const viewTransactions = () => {
        console.log('View Transactions');

        transactions.forEach((transaction) => {
            console.log(transaction.title, transaction.amount
            );
        })
    }

    return (
        <ScrollView style={{ backgroundColor: Colors.background }}>
            <View style={styles.account}>
                <View style={styles.row}>
                    <Text style={styles.balance}>Account Balance: </Text>
                    <Text style={styles.currency}>${balance()}</Text>
                </View>
            </View>

            <View style={styles.actionRow}>
                <RoundBtn icon={'add'} text='Add Money' onPress={onAddMoney} />
                <RoundBtn icon={'refresh'} text='Exchange' onPress={() => {
                    console.log("Exchange");
                    viewTransactions();
                }} />
                <RoundBtn icon={'list'} text='Details' onPress={() => console.log("Details")} />
                <Dropdown />
            </View>

            <View style={styles.transactions}>
                <Text style={styles.transactionHeader}>Transactions</Text>
                {transactions.length === 0 ? (
                    <Text style={{ padding: 10 }}>No transactions</Text>
                ) : (
                    <>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 10 }}>
                            <View style={styles.transactionSubheaderView}>
                                <Text style={styles.transactionSubheaderText}>Type</Text>
                            </View>
                            <View style={styles.transactionSubheaderView}>
                                <Text style={styles.transactionSubheaderText}>Date</Text>
                            </View>
                            <View style={styles.transactionSubheaderView}>
                                <Text style={styles.transactionSubheaderText}>Amount</Text>
                            </View>
                        </View>
                        {transactions.map((transaction) => (
                            <View key={transaction.id} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                <Text style={styles.transactionText}>{transaction.title}</Text>
                                <Text style={styles.transactionText}>{transaction.date}</Text>
                                <Text style={styles.transactionText}>{transaction.type === 'deposit' ? '+ ' : '- '}${transaction.amount}</Text>
                                {/* <Text style={styles.transactionText}>{transaction.amount}</Text> */}
                            </View>
                        ))}
                        <Button title='Clear Transactions' onPress={clearTransactions} />
                    </>

                )}

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
    transactions: {
        margin: 10,
        padding: 10,
        backgroundColor: Colors.lightGray,
        borderRadius: 10,
    },
    transactionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 5,
    },
    transactionText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
    },
    // transactionSubheader: {
    //     fontWeight: 'bold',
    //     fontSize: 14,
    //     borderBottomColor: 'black',
    //     borderBottomWidth: 1,
    //     zIndex: 50,
    // }
    transactionSubheaderView: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    transactionSubheaderText: {
        fontWeight: 'bold',
        fontSize: 14,
    }
})