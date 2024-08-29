import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Currency } from '@/interfaces/crypto';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { router } from 'expo-router';
import { formatNumber } from '@/utils/currency';


const Page = () => {
    const { data: currencies, isLoading, isError, refetch } = useQuery({
        queryKey: ['currencies'],
        queryFn: async () => {
            const res = await fetch('/api/listing');
            return res.json();
        }
    });

    // Function to handle currency press
    const handleCurrencyPress = (currency: Currency) => {
        router.push({
            pathname: '/crypto/[id]',
            params: {
                id: currency.id,
                image: currency.image_url,
                name: currency.name,
                symbol: currency.symbol,
                description: currency.description,
                latestPrice: currency.latest_price.amount.amount,
                marketCap: currency.market_cap,
                percentChange: currency.percent_change,
                volume24h: currency.volume_24h
            }
        });
    };

    const renderCurrencyItem = ({ item: currency }: { item: Currency }) => (
        <TouchableOpacity
            style={[defaultStyles.block, styles.currencyContainer]}
            onPress={() => handleCurrencyPress(currency)}
        >
            <View style={styles.headerContainer}>
                <View style={styles.leftContainer}>
                    <Image source={{ uri: currency.image_url }} style={styles.image} />
                    <Text style={styles.header}>{currency.name}</Text>
                </View>
                <Text style={[styles.propertyLabel, styles.blueText]}>{currency.symbol}</Text>
            </View>
            <View style={styles.propertyContainer}>
                <Text style={[styles.propertyLabel, styles.boldText]}>Latest Price:</Text>
                <Text style={[styles.propertyValue, styles.boldText]}>${(Number(currency.latest_price.amount.amount))}</Text>
            </View>
            <View style={styles.propertyContainer}>
                <Text style={styles.propertyLabel}>Market Cap:</Text>
                <Text style={styles.propertyValue}>${formatNumber(Number(currency.market_cap))}</Text>
            </View>
            <View style={styles.propertyContainer}>
                <Text style={styles.propertyLabel}>Percent Change:</Text>
                <Text style={[styles.propertyValue, currency.percent_change > 0 ? styles.greenText : styles.redText]}>
                    {currency.percent_change > 0 ? '+' : ''}{currency.percent_change.toFixed(2)}%
                </Text>
            </View>
        </TouchableOpacity>
    );

    if (isLoading) {
        return <View style={styles.centered}><Text>Loading...</Text></View>;
    }

    if (isError) {
        return <View style={styles.centered}><Text>Error loading data. Please try again.</Text></View>;
    }

    return (
        <>
            <Text style={[styles.header, { textAlign: 'center', fontStyle: 'italic' }]}>Latest Cryptocurrencies</Text>
            <FlatList
                data={currencies}
                renderItem={renderCurrencyItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={refetch} />
                }
                ListEmptyComponent={<Text style={styles.text}>No data available</Text>}
            />
        </>
    );
}

export default Page;

const styles = StyleSheet.create({
    listContainer: {
        padding: 10,
        paddingBottom: 60,
        backgroundColor: Colors.background,
    },
    currencyContainer: {
        marginBottom: 5,
        marginHorizontal: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 20,
        backgroundColor: 'white',
    },
    header: {
        fontSize: 18,
        fontWeight: '700',
        color: 'black',
    },
    propertyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    propertyLabel: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#333',
    },
    propertyValue: {
        fontSize: 14,
        color: '#333',
    },
    text: {
        fontSize: 14,
        color: 'black',
    },
    boldText: {
        fontSize: 14,
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});