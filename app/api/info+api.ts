import axios from "axios";

const API_KEY = process.env.CRYPTO_API_KEY;

// // // Description: Get the current exchange rates for BTC.
// export async function GET(request: Request): Promise<Response> {
//     console.log('GET /info+api.ts');

//     const options = {
//         method: 'GET',
//         url: 'https://api.coinbase.com/v2/prices/BTC-USD/spot',
//         headers: {
//             'Authorization': `Bearer ${API_KEY}`,
//             'Content-Type': 'application/json'
//         }
//     };

//     return axios(options)
//         .then(response => {
//             console.log('Current BTC-USD Price:', response.data);
//             return new Response(JSON.stringify(response.data));
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             return new Response('Error:', { status: 500 });
//         });

// }

/*
has this response
{
  "data": {
    "amount": "68291.535",
    "base": "BTC",
    "currency": "USD"
  }
}
*/


// Description: Get the current exchange rates for BTC.
export async function GET(request: Request): Promise<Response> {
    console.log('GET /info+api.ts');

    // return axios.get('https://api.exchange.coinbase.com/products/BTC-USD/ticker')
    //     .then(response => {
    //         console.log('Current BTC-USD Price:', response.data);
    //         return new Response(JSON.stringify(response.data));
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //         return new Response('Error:', error);
    //     });

    return new Response(JSON.stringify(data));
}


const data =
{
    "ask": "67082.78",
    "bid": "67081.44",
    "volume": "12038.84081443",
    "trade_id": 671039423,
    "price": "67082.78",
    "size": "0.00070861",
    "time": "2024-07-29T17:47:46.743125Z",
    "rfq_volume": "10.241713"
}

/*
has this response
{
  "ask": "68316.47",
  "bid": "68316.46",
  "volume": "8477.64375105",
  "trade_id": 670837899,
  "price": "68316.47",
  "size": "0.00000117",
  "time": "2024-07-29T14:54:04.872154Z",
  "rfq_volume": "6.804658"
}
*/


// export async function GET(request: Request): Promise<Response> {
//     console.log('GET /info+api.ts');

//     return axios.get('https://api.exchange.coinbase.com/products/BTC-USD/ticker')
//         .then(response => {
//             console.log('Current BTC-USD Price:', response.data);
//             return new Response(JSON.stringify(response.data));
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             return new Response('Error:', error);
//         });
// }

/*
has this response
{
  "id": "BTC-USD",
  "base_currency": "BTC",
  "quote_currency": "USD",
  "quote_increment": "0.01",
  "base_increment": "0.00000001",
  "display_name": "BTC-USD",
  "min_market_funds": "1",
  "margin_enabled": false,
  "post_only": false,
  "limit_only": false,
  "cancel_only": false,
  "status": "online",
  "status_message": "",
  "trading_disabled": false,
  "fx_stablecoin": false,
  "max_slippage_percentage": "0.02000000",
  "auction_mode": false,
  "high_bid_limit_percentage": ""
}
*/