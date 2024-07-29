import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Currency } from '@/interfaces/crypto'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'

const Page = () => {

    const currencies = useQuery({
        queryKey: ['currencies'],
        queryFn: async () => {
            const res = await fetch('/api/listing');
            //console.log(res);
            return res.json();
        }

        // queryFn: async () => {
        //     const response = await fetch('api/listing');
        //     const data = await response.json();
        //     console.log('Currencies:', data);
        //     return data;
        // }
    })

    // useEffect(() => {
    //     const fetchCrypto = async () => {
    //         const response = await fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot');
    //         const data = await response.json();
    //         console.log('Current BTC-USD Price:', data);
    //     }

    //     fetchCrypto();
    // }, [])


    return (
        <ScrollView>
            <Text>Crypto</Text>

            {currencies?.data ? (
                currencies.data.map((currency: Currency) => (
                    <View key={currency.id} style={defaultStyles.block}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Image source={{ uri: currencies.data.logoUrl }} style={{ width: 50, height: 50 }} />
                        </View>
                        <Text style={defaultStyles.header}>{currency.name}</Text>
                        <Text style={defaultStyles.sectionHeader}>{currency.symbol}</Text>
                        <Text>{currency.market_cap}</Text>
                        <Text>{currency.percent_change}%</Text>
                        <Text>${currency.latest_price.amount.amount}</Text>
                    </View>
                ))
            ) : (
                <Text>No data available</Text>
            )}
        </ScrollView>
    )
}

export default Page

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'space-between',
    },
});