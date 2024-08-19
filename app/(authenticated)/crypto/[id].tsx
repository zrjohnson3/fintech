import { View, Text, SectionList, StyleSheet, Image, ScrollView, TouchableOpacity, Platform } from 'react-native';
import React, { useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { formatNumber } from '@/utils/currency';
import { CartesianChart, Line } from 'victory-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = ['Overview', 'News', 'Orders', 'Transactions'];

// Test data for the chart
const DATA = Array.from({ length: 31 }, (_, i) => ({
    day: i,
    highTmp: 40 + 30 * Math.random(),
}));

const Page = () => {
    const { id, name, symbol, description, image, latestPrice, marketCap, percentChange, volume24h } = useLocalSearchParams();
    const headerHeight = useHeaderHeight(); // Get the height of the header to offset the content
    const [activeIndex, setActiveIndex] = useState(0);

    const { data: tickers } = useQuery({
        queryKey: ['tickers'],
        queryFn: async () => {
            const tickers = await fetch('/api/tickers').then((res) => res.json());
            return tickers;
        },
    })

    const { data: listings } = useQuery({
        queryKey: ['listings'],
        queryFn: async () => {
            const listings = await fetch('/api/listings').then((res) => res.json());
            return listings;
        },
    })


    // I am haivng issues getting this working, but mostly due to API's being differnet then I excpted. 
    // Also easier to just use the useLocalSearchParams hook to get the data.
    // const { id } = useLocalSearchParams();

    // const data = useQuery({
    //     queryKey: ['info', id],
    //     queryFn: async () => {
    //         const info = await fetch(`/api/info?ids=${id}`).then((res) => res.json());
    //         return info[+id!] ?? 'No data';
    //     },
    // }).data ?? null;

    const sections = [
        { title: 'Overview', data: [{ key: 'description', value: description }] },
        { title: 'Market Cap', data: [{ key: 'marketCap', value: marketCap }] },
        { title: 'Latest Price', data: [{ key: 'latestPrice', value: latestPrice }] },
        { title: 'Percent Change', data: [{ key: 'percentChange', value: percentChange }] },
        { title: '24h Volume', data: [{ key: 'volume24h', value: volume24h }] },
    ];


    console.log('~ Page ~ id:', id, name);
    return (
        <SafeAreaView>
            <Stack.Screen options={{ title: name?.toString() }} />
            <SectionList
                style={{ marginTop: 20 }}
                contentInsetAdjustmentBehavior='automatic'
                keyExtractor={(item, index) => index.toString()}
                sections={[{ data: [{ title: 'Chart' }] }]}
                // sections={sections}
                renderSectionHeader={() => (
                    <ScrollView
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            paddingBottom: 8,
                            paddingTop: 8,
                            paddingHorizontal: 16,
                            backgroundColor: Colors.background,
                            borderBottomColor: Colors.lightGray,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}

                    >
                        {categories.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}
                                onPress={() => setActiveIndex(index)}
                            >
                                <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>{item}</Text>
                            </TouchableOpacity>
                        )
                        )}
                    </ScrollView >
                )}
                ListHeaderComponent={() => (
                    <>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginHorizontal: 20,
                            marginVertical: 10,
                            paddingBottom: 10,
                        }}>
                            <View style={styles.symbolContainer}>
                                <Text style={styles.title}>{name}</Text>
                                <Text style={styles.symbol}>{symbol}</Text>
                            </View>
                            {image && (
                                <Image source={{ uri: image.toString() }} style={styles.image} />
                            )}
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, padding: 10 }}>
                            <TouchableOpacity style={[defaultStyles.pillButtonSmall, { backgroundColor: Colors.primary, flexDirection: 'row', gap: 16 }]}>
                                <Ionicons name='add' size={24} color='#fff' />
                                <Text style={defaultStyles.buttonText}>Buy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[defaultStyles.pillButtonSmall, { backgroundColor: Colors.primaryMuted, flexDirection: 'row', gap: 16 }]}>
                                <Ionicons name='add' size={24} color='#fff' />
                                <Text style={defaultStyles.buttonText}>Recieve</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}


                renderItem={({ item }) => (
                    <>
                        <View style={{ height: 300 }}>
                            <CartesianChart data={DATA} xKey="day" yKeys={["highTmp"]}>
                                {/* 👇 render function exposes various data, such as points. */}
                                {({ points }) => (
                                    // 👇 and we'll use the Line component to render a line path.
                                    <Line points={points.highTmp} color="red" strokeWidth={3} />
                                )}
                            </CartesianChart>
                        </View>
                        <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }]}>
                            <Text style={styles.subtitle}>Latest Price</Text>
                            <Text style={styles.description}>${latestPrice}</Text>
                        </View>
                        <View style={[styles.container, { flexDirection: 'column', justifyContent: 'space-between', marginHorizontal: 10 }]}>
                            <Text style={styles.subtitle}>Overview</Text>
                            <Text style={styles.description}>{description}</Text>
                        </View >
                        <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, padding: 10 }]}>
                            <Text style={styles.description}>Market Cap:</Text>
                            <Text style={styles.description}>{formatNumber(Number(marketCap))}</Text>
                        </View>
                        <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }]}>
                            <Text style={styles.subtitle}>Percent Change</Text>
                            <Text style={styles.description}>{formatNumber(Number((percentChange)))}%</Text>

                        </View>
                    </>
                )}
            />
        </SafeAreaView>
    );
}


export default Page;

// header: {
//     fontSize: Platform.OS === 'ios' ? 24 : 20,
//         fontWeight: 'bold',
//             marginTop: Platform.OS === 'ios' ? 0 : 10, // Adjust top margin based on platform
//   },
// container: {
//     paddingTop: Platform.OS === 'ios' ? 20 : 10,
//   },

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        backgroundColor: 'white',
        margin: Platform.OS === 'ios' ? 10 : 10,
        borderRadius: 10,
    },
    pageId: {
        fontSize: 14,
        color: Colors.gray,
        marginBottom: 10,
    },
    image: {
        width: 75,
        height: 75,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: 'black',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.gray,
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        color: 'black',
        lineHeight: 24,
    },
    symbol: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.gray,
    },
    symbolContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    categoryText: {
        color: Colors.gray,
        fontSize: 14,
    },
    categoryTextActive: {
        fontSize: 16,
        color: '#000',
        fontWeight: "600",
    },
    categoriesBtn: {
        padding: 10,
        paddingHorizontal: 14,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoriesBtnActive: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
    }
});
