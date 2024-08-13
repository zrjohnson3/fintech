import axios from "axios";

const API_KEY = process.env.CRYPTO_API_KEY;

export async function GET(request: Request): Promise<Response> {
    console.log('GET /listing+api.ts');

    // const url = 'https://api.coinbase.com/v2/assets/search';

    // try {
    //     const response = await axios.get(url, {
    //         params: {
    //             limit: 5,
    //             sort: 'market_cap',
    //             order: 'desc'
    //         },
    //         headers: {
    //             'Authorization': `Bearer ${API_KEY}`
    //         }
    //     });

    //     console.log('Top 5 Cryptocurrencies:', response.data);
    //     return new Response(JSON.stringify(response.data));
    // } catch (error) {
    //     console.error('Error:', error);
    //     return new Response('Error fetching top 5 cryptocurrencies', { status: 500 });
    // }

    return new Response(JSON.stringify(data));
}

const data =
    [
        {
            "id": "5b71fc48-3dd3-540c-809b-f8c94d0e68b5",
            "symbol": "BTC",
            "name": "Bitcoin",
            "slug": "bitcoin",
            "color": "#F7931A",
            "image_url": "https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png",
            "listed": true,
            "description": "The world’s first cryptocurrency, Bitcoin is stored and exchanged securely on the internet through a digital ledger known as a blockchain. Bitcoins are divisible into smaller units known as satoshis — each satoshi is worth 0.00000001 bitcoin.",
            "exponent": 8,
            "unit_price_scale": 2,
            "transaction_unit_price_scale": 2,
            "address_regex": "^([13][a-km-zA-HJ-NP-Z1-9]{25,34})|^(bc1[qzry9x8gf2tvdw0s3jn54khce6mua7l]([qpzry9x8gf2tvdw0s3jn54khce6mua7l]{38}|[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{58}))$",
            "resource_urls": [
                {
                    "type": "white_paper",
                    "icon_url": "https://www.coinbase.com/assets/resource_types/white_paper-1129060acdfdb91628bf872c279435c9ce93245a40f0227d98f0aa0a93548cb4.png",
                    "title": "Whitepaper",
                    "link": "https://bitcoin.org/bitcoin.pdf"
                },
                {
                    "type": "website",
                    "icon_url": "https://www.coinbase.com/assets/resource_types/globe-58759be91aea7a349aff0799b2cba4e93028c83ebb77ca73fd18aba31050fc33.png",
                    "title": "Official website",
                    "link": "https://bitcoin.org"
                }
            ],
            "base": "BTC",
            "currency": "USD",
            "rank": 1,
            "market_cap": "1347244415385.02262117636",
            "percent_change": 0.008177591,
            "launched_at": "11 years ago",
            "latest": "68248.955",
            "latest_price": {
                "amount": {
                    "amount": "68248.955",
                    "currency": "USD",
                    "scale": "2"
                },
                "timestamp": "2024-07-29T15:05:00Z",
                "percent_change": {
                    "hour": -0.009594312,
                    "day": 0.008177591,
                    "week": 0.022876132,
                    "month": 0.118520856,
                    "year": 1.324821,
                    "all": 649.8827
                }
            },
            "circulating_supply": "19732818",
            "volume_24h": "29929984552.859344"
        },
        // {
        //     "id": "3bec5bf3-507a-51ba-8e41-dc953b1a5c4d",
        //     "symbol": "ETH2",
        //     "name": "Ethereum 2",
        //     "slug": "ethereum-2",
        //     "color": "#8E76FF",
        //     "image_url": "https://dynamic-assets.coinbase.com/9f3242d7cd65e806cc3a12b3d5c2ba3a6a1140dee43f7d1eafaad8747855065aff50fe2bda4d897076cbdada8b9b971015cb2d19c04e67b20a8145d506283287/asset_icons/4e321a458d36c0c6467b346f85e88caddde59fcc0f03444e374de32cc3def4d6.png",
        //     "description": "Ethereum 2.0 is an upcoming set of upgrades to Ethereum that's intended to make it significantly faster, less expensive, and more scalable. As part of the upgrade, participants may stake ETH tokens to help secure the network. In exchange for staking, participants then receive rewards on their staked ETH. Staked ETH (and rewards) can't be unstaked until Ethereum 2.0 fully launches, which most experts estimate will happen sometime in 2023. If participants want to sell, send, or use their staked ETH they can do so by converting it to cbETH, Coinbase’s Wrapped Staked ETH token. \n\n\nPlease note: the price chart and market stats for ETH2 are simply a copy of the ETH price chart and market stats. Coinbase plans to support ETH staking throughout the Ethereum 2.0 upgrade. Eligible customers can stake their ETH on Coinbase and receive rewards. While staked ETH and rewards are locked in the network during the upgrade, customers can wrap their ETH2 and rewards into cbETH in order to sell or use the funds.",
        //     "exponent": 8,
        //     "unit_price_scale": 2,
        //     "transaction_unit_price_scale": 2,
        //     "address_regex": "^(?:0x)?[0-9a-fA-F]{40}$",
        //     "base": "ETH2",
        //     "currency": "USD",
        //     "rank": 2,
        //     "market_cap": "400084567796.40853136217762784488",
        //     "percent_change": 0.02135569,
        //     "latest": "3331.315",
        //     "latest_price": {
        //         "amount": {
        //             "amount": "3331.315",
        //             "currency": "USD",
        //             "scale": "2"
        //         },
        //         "timestamp": "2024-07-29T15:05:00Z",
        //         "percent_change": {
        //             "hour": -0.0011828163,
        //             "day": 0.02135569,
        //             "week": -0.034253087,
        //             "month": -0.017186547,
        //             "year": 0.771147,
        //             "all": 940.9515
        //         }
        //     },
        //     "circulating_supply": "120228315.01960197",
        //     "volume_24h": "13650292617.14269"
        // },
        {
            "id": "d85dce9b-5b73-5c3c-8978-522ce1d1c1b4",
            "symbol": "ETH",
            "name": "Ethereum",
            "slug": "ethereum",
            "color": "#627EEA",
            "image_url": "https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png",
            "listed": true,
            "description": "Ethereum is a decentralized computing platform that uses ETH (also called Ether) to pay transaction fees (or “gas”). Developers can use Ethereum to run decentralized applications (dApps) and issue new crypto assets, known as Ethereum tokens.",
            "exponent": 8,
            "unit_price_scale": 2,
            "transaction_unit_price_scale": 2,
            "address_regex": "^(?:0x)?[0-9a-fA-F]{40}$",
            "resource_urls": [
                {
                    "type": "white_paper",
                    "icon_url": "https://www.coinbase.com/assets/resource_types/white_paper-1129060acdfdb91628bf872c279435c9ce93245a40f0227d98f0aa0a93548cb4.png",
                    "title": "Whitepaper",
                    "link": "https://github.com/ethereum/wiki/wiki/White-Paper"
                },
                {
                    "type": "website",
                    "icon_url": "https://www.coinbase.com/assets/resource_types/globe-58759be91aea7a349aff0799b2cba4e93028c83ebb77ca73fd18aba31050fc33.png",
                    "title": "Official website",
                    "link": "https://ethereum.org/"
                }
            ],
            "base": "ETH",
            "currency": "USD",
            "rank": 2,
            "market_cap": "400084567796.40853136217762784488",
            "percent_change": 0.02135569,
            "launched_at": "8 years ago",
            "latest": "3331.315",
            "latest_price": {
                "amount": {
                    "amount": "3331.315",
                    "currency": "USD",
                    "scale": "2"
                },
                "timestamp": "2024-07-29T15:05:00Z",
                "percent_change": {
                    "hour": -0.0011828163,
                    "day": 0.02135569,
                    "week": -0.034253087,
                    "month": -0.017186547,
                    "year": 0.771147,
                    "all": 940.9515
                }
            },
            "circulating_supply": "120228315.01960197",
            "volume_24h": "13650292617.14269"
        },
        {
            "id": "b26327c1-9a34-51d9-b982-9b29e6012648",
            "symbol": "USDT",
            "name": "Tether",
            "slug": "tether",
            "color": "#22A079",
            "image_url": "https://dynamic-assets.coinbase.com/41f6a93a3a222078c939115fc304a67c384886b7a9e6c15dcbfa6519dc45f6bb4a586e9c48535d099efa596dbf8a9dd72b05815bcd32ac650c50abb5391a5bd0/asset_icons/1f8489bb280fb0a0fd643c1161312ba49655040e9aaaced5f9ad3eeaf868eadc.png",
            "listed": true,
            "description": "Tether (USDT) is an Ethereum token that is pegged to the value of a U.S. dollar (also known as a stablecoin). Tether’s issuer claims that USDT is backed by bank reserves and loans which match or exceed the value of USDT in circulation. Important note: at this time, Coinbase only supports USDT on the Ethereum blockchain (ERC-20). Do not send USDT on any other blockchain to Coinbase.",
            "exponent": 6,
            "unit_price_scale": 2,
            "transaction_unit_price_scale": 2,
            "address_regex": "^(?:0x)?[0-9a-fA-F]{40}$",
            "resource_urls": [
                {
                    "type": "white_paper",
                    "icon_url": "https://www.coinbase.com/assets/resource_types/white_paper-1129060acdfdb91628bf872c279435c9ce93245a40f0227d98f0aa0a93548cb4.png",
                    "title": "Whitepaper",
                    "link": "https://tether.to/wp-content/uploads/2016/06/TetherWhitePaper.pdf"
                },
                {
                    "type": "website",
                    "icon_url": "https://www.coinbase.com/assets/resource_types/globe-58759be91aea7a349aff0799b2cba4e93028c83ebb77ca73fd18aba31050fc33.png",
                    "title": "Official website",
                    "link": "https://tether.to"
                }
            ],
            "base": "USDT",
            "currency": "USD",
            "rank": 3,
            "market_cap": "114391967723.172325425787188901575",
            "percent_change": -0.00025500255,
            "launched_at": "3 years ago",
            "latest": "0.999735",
            "latest_price": {
                "amount": {
                    "amount": "0.999735",
                    "currency": "USD",
                    "scale": "2"
                },
                "timestamp": "2024-07-29T15:05:00Z",
                "percent_change": {
                    "hour": -0.0002450049,
                    "day": -0.00025500255,
                    "week": -0.0003649635,
                    "month": 0.0013070521,
                    "year": -0.00025500255,
                    "all": -0.17750454
                }
            },
            "circulating_supply": "114417852141.83315",
            "volume_24h": "50196739382.62895",
            "tradable_on_wallet": true
        },
        {
            "id": "4f039497-3af8-5bb3-951c-6df9afa9be1c",
            "symbol": "SOL",
            "name": "Solana",
            "slug": "solana",
            "color": "#9945FF",
            "image_url": "https://asset-metadata-service-production.s3.amazonaws.com/asset_icons/b658adaf7913c1513c8d120bcb41934a5a4bf09b6adbcb436085e2fbf6eb128c.png",
            "listed": true,
            "description": "Solana is a decentralized computing platform that uses SOL to pay for transactions. Solana aims to improve blockchain scalability by using a combination of proof of stake consensus and so-called proof of history. As a result, Solana claims to be able to support 50,000 transactions per second without sacrificing decentralization.",
            "exponent": 9,
            "unit_price_scale": 2,
            "transaction_unit_price_scale": 2,
            "address_regex": "^[1-9A-HJ-NP-Za-km-z]{32,44}",
            "resource_urls": [
                {
                    "type": "white_paper",
                    "icon_url": "https://www.coinbase.com/assets/resource_types/white_paper-1129060acdfdb91628bf872c279435c9ce93245a40f0227d98f0aa0a93548cb4.png",
                    "title": "Whitepaper",
                    "link": "https://solana.com/solana-whitepaper.pdf"
                },
                {
                    "type": "website",
                    "icon_url": "https://www.coinbase.com/assets/resource_types/globe-58759be91aea7a349aff0799b2cba4e93028c83ebb77ca73fd18aba31050fc33.png",
                    "title": "Official website",
                    "link": "https://solana.com/"
                }
            ],
            "base": "SOL",
            "currency": "USD",
            "rank": 4,
            "market_cap": "87229563397.3754994187371122649",
            "percent_change": 0.018475376,
            "launched_at": "3 years ago",
            "latest": "187.98",
            "latest_price": {
                "amount": {
                    "amount": "187.98",
                    "currency": "USD",
                    "scale": "2"
                },
                "timestamp": "2024-07-29T15:05:00Z",
                "percent_change": {
                    "hour": -0.008962463,
                    "day": 0.018475376,
                    "week": 0.05535594,
                    "month": 0.31980622,
                    "year": 6.471383,
                    "all": 142.11528
                }
            },
            "circulating_supply": "464708909.0863611",
            "volume_24h": "2910197274.890687"
        }
    ]