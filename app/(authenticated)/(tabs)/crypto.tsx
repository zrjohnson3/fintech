import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Currency } from '@/interfaces/crypto';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';

const Page = () => {
    const currencies = useQuery({
        queryKey: ['currencies'],
        queryFn: async () => {
            const res = await fetch('/api/listing');
            return res.json();
        }
    });

    const ids = currencies.data?.map((currency: Currency) => currency.id).join(',');

    const { data } = useQuery({
        queryKey: ['info', ids],
        queryFn: async () => {
            const res = await fetch(`/api/info?ids=${ids}`);
            return res.json();
        }
    });

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {currencies?.data ? (
                currencies.data.map((currency: Currency) => (
                    <View key={currency.id} style={[defaultStyles.block, styles.currencyContainer]}>
                        <View style={styles.headerContainer}>
                            <Image source={{ uri: currency.image_url }} style={styles.image} />
                            <Text style={styles.header}>{currency.name}</Text>
                        </View>
                        <View style={styles.propertyContainer}>
                            <Text style={[styles.propertyLabel, styles.boldText]}>Latest Price:</Text>
                            <Text style={[styles.propertyValue, styles.boldText]}>${currency.latest_price.amount.amount}</Text>
                        </View>
                        <View style={styles.propertyContainer}>
                            <Text style={[styles.propertyLabel, styles.blueText]}>Symbol:</Text>
                            <Text style={[styles.propertyValue, styles.blueText]}>{currency.symbol}</Text>
                        </View>
                        <View style={styles.propertyContainer}>
                            <Text style={styles.propertyLabel}>Market Cap:</Text>
                            <Text style={styles.propertyValue}>{currency.market_cap}</Text>
                        </View>
                        <View style={styles.propertyContainer}>
                            <Text style={styles.propertyLabel}>Percent Change:</Text>
                            <Text style={[styles.propertyValue, currency.percent_change > 0 ? styles.greenText : styles.redText]}>
                                {currency.percent_change}%
                            </Text>
                        </View>
                    </View>
                ))
            ) : (
                <Text style={styles.text}>No data available</Text>
            )}
        </ScrollView>
    );
}

export default Page;

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 10,
        paddingBottom: 20, // added padding to the bottom to ensure the last item is visible
        backgroundColor: Colors.background,
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        color: 'black',
        marginBottom: 16,
    },
    currencyContainer: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
        backgroundColor: 'white',
    },
    propertyContainer: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    propertyLabel: {
        fontWeight: 'bold',
        marginRight: 5,
        color: '#333', // changed color to slightly darker
    },
    propertyValue: {
        flex: 1,
        color: '#333',
    },
    text: {
        fontSize: 16,
        color: 'black',
    },
    boldText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    blueText: {
        color: 'blue',
    },
    greenText: {
        color: 'green',
    },
    redText: {
        color: 'red',
    },
});
